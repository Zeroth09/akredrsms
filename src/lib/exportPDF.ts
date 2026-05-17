import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { getTargetPokja, getBulanSekarang, getNamaBulan, getStandarKumulatif } from './targetBulanan'
import { countFilesRecursiveUnderFolder } from '@/lib/standarEpHierarchy'

// ─── Interface ────────────────────────────────────────────────────────────────

interface DocExport {
    id: string
    gdrive_id: string
    name: string
    status: string
    category_id: string | null
    last_synced_at?: string
    created_at?: string
    web_view_link: string | null
    categories?: { name: string } | null
    parent_id: string | null
    mime_type: string
    document_type: string | null
}

interface PokjaStats {
    code: string
    totalEP: number
    terisi: number
    kosong: number
    persentase: number
}

// ─── Konstanta Pokja ──────────────────────────────────────────────────────────

const POKJA_CODES = [
    { code: 'AKP', keywords: ['AKP'] },
    { code: 'HPK', keywords: ['HPK'] },
    { code: 'KE', keywords: [] },
    { code: 'KPS', keywords: ['KPS'] },
    { code: 'MFK', keywords: ['MFK'] },
    { code: 'MRMIK', keywords: ['MRMIK'] },
    { code: 'PAB', keywords: ['PAB'] },
    { code: 'PAP', keywords: ['PAP'] },
    { code: 'PKPO', keywords: ['PKPO'] },
    { code: 'PMKP', keywords: ['PMKP'] },
    { code: 'PP', keywords: ['PP'] },
    { code: 'PPK', keywords: ['PPK'] },
    { code: 'PPI', keywords: ['PPI'] },
    { code: 'PROGNAS', keywords: ['PROGRAM NASIONAL', 'PROGNAS'] },
    { code: 'SKP', keywords: ['SKP', 'SASARAN KESELAMATAN'] },
    { code: 'TKRS', keywords: ['TKRS'] },
]

// ─── Helper Functions ─────────────────────────────────────────────────────────

function isEPFolder(doc: DocExport): boolean {
    return /^EP\s+/i.test(doc.name.trim())
}

function isPokjaFolder(folderName: string): string | null {
    const upper = folderName.toUpperCase().trim()
    for (const pokja of POKJA_CODES) {
        if (upper === pokja.code) return pokja.code
        if (upper.startsWith(pokja.code + ' ') || upper.startsWith(pokja.code + '.')) return pokja.code
        for (const kw of pokja.keywords) {
            const kwUpper = kw.toUpperCase()
            // Exact match atau diikuti spasi/titik — hindari false match PP → PPI/PPK
            if (upper === kwUpper ||
                upper.startsWith(kwUpper + ' ') ||
                upper.startsWith(kwUpper + '.')) return pokja.code
        }
    }
    return null
}

function findPokjaCode(doc: DocExport, allDocs: DocExport[]): string {
    let current = doc
    let depth = 0
    while (current.parent_id && depth < 12) {
        const parent = allDocs.find(d => d.gdrive_id === current.parent_id)
        if (!parent) break
        const pokja = isPokjaFolder(parent.name)
        if (pokja) return pokja
        current = parent
        depth++
    }
    return ''
}

// ─── Hitung statistik per Pokja ───────────────────────────────────────────────

function hitungStatistikPokja(allDocs: DocExport[]): PokjaStats[] {
    const epFolders = allDocs.filter(
        d => d.mime_type === 'application/vnd.google-apps.folder' && isEPFolder(d)
    )

    // Kumpulkan data per pokja
    const statsMap: Record<string, { terisi: number; kosong: number }> = {}

    for (const ep of epFolders) {
        const pokjaCode = findPokjaCode(ep, allDocs)
        if (!pokjaCode) continue

        if (!statsMap[pokjaCode]) statsMap[pokjaCode] = { terisi: 0, kosong: 0 }

        const hasFiles = countFilesRecursiveUnderFolder(ep.gdrive_id, allDocs) > 0

        if (hasFiles) {
            statsMap[pokjaCode].terisi++
        } else {
            statsMap[pokjaCode].kosong++
        }
    }

    // Konversi ke array dan sort by persentase tertinggi ke terendah
    return Object.entries(statsMap)
        .map(([code, { terisi, kosong }]) => {
            const totalEP = terisi + kosong
            return {
                code,
                totalEP,
                terisi,
                kosong,
                persentase: totalEP > 0 ? Math.round((terisi / totalEP) * 100) : 0,
            }
        })
        .sort((a, b) => b.persentase - a.persentase || a.code.localeCompare(b.code))
}

// ─── Warna sesuai persentase ──────────────────────────────────────────────────

function warnaPersen(persen: number): [number, number, number] {
    if (persen >= 75) return [34, 197, 94]   // hijau
    if (persen >= 40) return [234, 179, 8]   // kuning
    return [239, 68, 68]                      // merah
}

// ─── Draw Bar Chart manual ────────────────────────────────────────────────────

function drawBarChart(
    doc: jsPDF,
    stats: PokjaStats[],
    startX: number,
    startY: number,
    chartWidth: number,
    chartHeight: number
): void {
    const maxVal = Math.max(...stats.map(s => s.totalEP), 1)
    const barGroupWidth = chartWidth / stats.length
    const barPadding = barGroupWidth * 0.15
    const barWidth = (barGroupWidth - barPadding * 2) / 2 - 1

    // Grid lines
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
        const y = startY + chartHeight - (i / gridLines) * chartHeight
        const val = Math.round((i / gridLines) * maxVal)
        doc.setDrawColor(220, 220, 220)
        doc.setLineWidth(0.2)
        doc.line(startX, y, startX + chartWidth, y)
        doc.setFontSize(6)
        doc.setTextColor(150, 150, 150)
        doc.text(String(val), startX - 4, y + 1, { align: 'right' })
    }

    // Bars
    stats.forEach((s, i) => {
        const groupX = startX + i * barGroupWidth + barPadding

        // Bar Terisi (hijau)
        const terisiH = (s.terisi / maxVal) * chartHeight
        const terisiY = startY + chartHeight - terisiH
        doc.setFillColor(34, 197, 94)
        doc.roundedRect(groupX, terisiY, barWidth, terisiH, 1, 1, 'F')

        // Bar Kosong (merah muda)
        const kosongH = (s.kosong / maxVal) * chartHeight
        const kosongY = startY + chartHeight - kosongH
        doc.setFillColor(252, 165, 165)
        doc.roundedRect(groupX + barWidth + 1, kosongY, barWidth, kosongH, 1, 1, 'F')

        // Label pokja di bawah
        doc.setFontSize(5.5)
        doc.setTextColor(60, 60, 60)
        doc.text(s.code, groupX + barWidth, startY + chartHeight + 4, { align: 'center' })

        // Nilai di atas bar terisi
        if (s.terisi > 0) {
            doc.setFontSize(5)
            doc.setTextColor(22, 163, 74)
            doc.text(String(s.terisi), groupX + barWidth / 2, terisiY - 1, { align: 'center' })
        }
    })

    // Legenda chart
    const legendX = startX + chartWidth - 50
    const legendY = startY + 5
    doc.setFillColor(34, 197, 94)
    doc.rect(legendX, legendY, 5, 3, 'F')
    doc.setFontSize(6.5)
    doc.setTextColor(60, 60, 60)
    doc.text('EP Terisi', legendX + 7, legendY + 2.5)

    doc.setFillColor(252, 165, 165)
    doc.rect(legendX, legendY + 6, 5, 3, 'F')
    doc.text('EP Kosong', legendX + 7, legendY + 8.5)
}

// ─── Main Export Function ─────────────────────────────────────────────────────

export function exportReportPDF(allDocs: DocExport[], selectedPokjas?: string[]): void {
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const pageW = 297
    const margin = 14
    const now = new Date()
    const tanggal = now.toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
    })

    // Filter stats by selectedPokjas jika ada
    const stats = hitungStatistikPokja(allDocs).filter(
        s => !selectedPokjas || selectedPokjas.length === 0 || selectedPokjas.includes(s.code)
    )
    const totalEPAll = stats.reduce((s, p) => s + p.totalEP, 0)
    const totalTerisi = stats.reduce((s, p) => s + p.terisi, 0)
    const totalKosong = stats.reduce((s, p) => s + p.kosong, 0)
    const totalPersen = totalEPAll > 0 ? Math.round((totalTerisi / totalEPAll) * 100) : 0

    // ── Header merah ──────────────────────────────────────────────────────────
    pdf.setFillColor(185, 28, 28) // red-700
    pdf.rect(0, 0, pageW, 28, 'F')

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('LAPORAN AKREDITASI', margin, 11)

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Sistem Pemantauan Dokumen Rumah Sakit', margin, 18)
    pdf.text(`Dicetak: ${tanggal}`, pageW - margin, 18, { align: 'right' })

    // watermark logo teks kanan atas
    pdf.setFontSize(8)
    pdf.setTextColor(255, 200, 200)
    pdf.text('webinstant.id', pageW - margin, 10, { align: 'right' })

    // ── Summary Cards ─────────────────────────────────────────────────────────
    let y = 34
    // cardW 50mm + gap 4mm → 4 card = 216mm, progressX = 230mm, progressW = 53mm
    const cardW = 50
    const cardH = 20
    const cardGap = 4
    const cards = [
        { label: 'Total Pokja', value: String(stats.length), color: [59, 130, 246] as [number, number, number], textColor: [255, 255, 255] as [number, number, number] },
        { label: 'Total EP', value: String(totalEPAll), color: [99, 102, 241] as [number, number, number], textColor: [255, 255, 255] as [number, number, number] },
        { label: 'EP Sudah Terisi', value: String(totalTerisi), color: [34, 197, 94] as [number, number, number], textColor: [255, 255, 255] as [number, number, number] },
        { label: 'EP Masih Kosong', value: String(totalKosong), color: [239, 68, 68] as [number, number, number], textColor: [255, 255, 255] as [number, number, number] },
    ]

    cards.forEach((card, i) => {
        const x = margin + i * (cardW + cardGap)
        pdf.setFillColor(...card.color)
        pdf.roundedRect(x, y, cardW, cardH, 3, 3, 'F')
        pdf.setTextColor(...card.textColor)
        pdf.setFontSize(18)
        pdf.setFont('helvetica', 'bold')
        pdf.text(card.value, x + cardW / 2, y + 12, { align: 'center' })
        pdf.setFontSize(7.5)
        pdf.setFont('helvetica', 'normal')
        pdf.text(card.label, x + cardW / 2, y + 18, { align: 'center' })
    })

    // Progress bar overall compliance
    const progressX = margin + 4 * (cardW + cardGap)
    const progressW = pageW - margin - progressX
    pdf.setFillColor(240, 240, 240)
    pdf.roundedRect(progressX, y, progressW, cardH, 3, 3, 'F')
    pdf.setFontSize(8)
    pdf.setTextColor(80, 80, 80)
    pdf.text('Compliance Keseluruhan', progressX + progressW / 2, y + 6, { align: 'center' })
    // Outer bar
    pdf.setFillColor(229, 229, 229)
    pdf.roundedRect(progressX + 5, y + 9, progressW - 10, 5, 2, 2, 'F')
    // Fill
    const fillW = ((progressW - 10) * totalPersen) / 100
    const [r2, g2, b2] = warnaPersen(totalPersen)
    pdf.setFillColor(r2, g2, b2)
    if (fillW > 0) pdf.roundedRect(progressX + 5, y + 9, fillW, 5, 2, 2, 'F')
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(r2, g2, b2)
    pdf.text(`${totalPersen}%`, progressX + progressW / 2, y + 18, { align: 'center' })

    // ── Tabel per Pokja ───────────────────────────────────────────────────────
    y += cardH + 8

    const tableData = stats.map(s => [
        s.code,
        String(s.totalEP),
        String(s.terisi),
        String(s.kosong),
        `${s.persentase}%`,
    ])

    autoTable(pdf, {
        startY: y,
        head: [['Pokja', 'Total EP', 'EP Terisi', 'EP Kosong', 'Kelengkapan']],
        body: tableData,
        margin: { left: margin, right: margin + 170 },  // hanya setengah kiri
        tableWidth: (pageW / 2) - margin - 5,
        styles: {
            fontSize: 8,
            cellPadding: 2.5,
            lineColor: [230, 230, 230],
            lineWidth: 0.2,
        },
        headStyles: {
            fillColor: [185, 28, 28],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center',
        },
        columnStyles: {
            0: { halign: 'left', fontStyle: 'bold' },
            1: { halign: 'center' },
            2: { halign: 'center', textColor: [22, 163, 74] as [number, number, number] },
            3: { halign: 'center', textColor: [220, 38, 38] as [number, number, number] },
            4: { halign: 'center', fontStyle: 'bold' },
        },
        didParseCell: (data) => {
            // Warna baris alternatif
            if (data.section === 'body' && data.row.index % 2 === 0) {
                data.cell.styles.fillColor = [252, 252, 252]
            }
            // Warna kolom kelengkapan berdasarkan nilai
            if (data.section === 'body' && data.column.index === 4) {
                const pct = stats[data.row.index]?.persentase ?? 0
                data.cell.styles.textColor = warnaPersen(pct)
            }
        },
    })

    // ── Bar Chart ─────────────────────────────────────────────────────────────
    const chartX = pageW / 2 + 3
    const chartAreaW = pageW - margin - chartX
    const chartTitle = 'Visualisasi EP per Pokja'
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(30, 30, 30)
    pdf.text(chartTitle, chartX, y)

    const chartTopY = y + 5
    const chartH = 90

    // Background chart
    pdf.setFillColor(250, 250, 250)
    pdf.setDrawColor(220, 220, 220)
    pdf.setLineWidth(0.3)
    pdf.roundedRect(chartX - 3, chartTopY - 3, chartAreaW + 6, chartH + 16, 2, 2, 'FD')

    drawBarChart(pdf, stats, chartX + 5, chartTopY + 3, chartAreaW - 10, chartH - 5)

    // ── Halaman 2: Analisa Keterlambatan Target ───────────────────────────────
    const pageH = 210  // tinggi halaman landscape A4 (mm)
    const bulan = getBulanSekarang()
    const namaBulan = getNamaBulan(bulan)
    const bulanSebelum = bulan > 1 ? bulan - 1 : null
    const namaBulanSebelum = bulanSebelum ? getNamaBulan(bulanSebelum) : null

    // Kumpulkan semua standar yang seharusnya sudah selesai (s/d bulan ini)
    interface KeterlambatanPokja {
        pokja: string
        standar: string
        epKosong: string[]
    }

    const keterlambatanList: KeterlambatanPokja[] = []

    for (const s of stats) {
        const kumulatifStandar = getStandarKumulatif(s.code, bulan)
            .filter(k => k !== 'Pembahasan Anggota Tim')
        if (kumulatifStandar.length === 0) continue

        // Untuk setiap standar kumulatif, cari EP yang masih kosong
        const standarGrouped: Record<string, string[]> = {}

        for (const standarTarget of kumulatifStandar) {
            // Cari folder standar yang match nama ini (e.g. "AKP 1", "AKP 1.1")
            const standarFolders = allDocs.filter(d =>
                d.mime_type === 'application/vnd.google-apps.folder' &&
                d.name.toUpperCase().trim() === standarTarget.toUpperCase()
            )

            for (const standarFolder of standarFolders) {
                // Cek apakah standar folder ini memang milik Pokja ini
                const parentPokja = findPokjaCode(standarFolder, allDocs)
                if (parentPokja !== s.code) continue

                // Ambil semua EP di dalam standar ini yang masih kosong
                const epFolders = allDocs.filter(d =>
                    d.parent_id === standarFolder.gdrive_id &&
                    d.mime_type === 'application/vnd.google-apps.folder' &&
                    isEPFolder(d)
                )

                const epKosong = epFolders
                    .filter(ep => countFilesRecursiveUnderFolder(ep.gdrive_id, allDocs) === 0)
                    .map(ep => ep.name)

                if (epKosong.length > 0) {
                    if (!standarGrouped[standarTarget]) standarGrouped[standarTarget] = []
                    standarGrouped[standarTarget].push(...epKosong)
                }
            }
        }

        for (const [standar, epList] of Object.entries(standarGrouped)) {
            keterlambatanList.push({ pokja: s.code, standar, epKosong: epList })
        }
    }

    if (keterlambatanList.length > 0) {
        pdf.addPage()

        // Header halaman 2
        pdf.setFillColor(185, 28, 28)
        pdf.rect(0, 0, pageW, 22, 'F')
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(13)
        pdf.setFont('helvetica', 'bold')
        pdf.text('ANALISA KETERLAMBATAN PEMENUHAN TARGET', margin, 10)
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'normal')
        const targetBulanLabel = namaBulanSebelum
            ? `Standar kumulatif s/d ${namaBulanSebelum} - ${namaBulan}`
            : `Standar target bulan ${namaBulan}`
        pdf.text(`${targetBulanLabel} yang EP-nya masih kosong`, margin, 17)
        pdf.text(tanggal, pageW - margin, 17, { align: 'right' })

        // Summary
        const pokjaTerlambat = [...new Set(keterlambatanList.map(k => k.pokja))]
        let y2 = 28

        pdf.setFillColor(254, 226, 226) // merah muda
        pdf.roundedRect(margin, y2, pageW - 2 * margin, 12, 2, 2, 'F')
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(185, 28, 28)
        pdf.text(
            `${pokjaTerlambat.length} Pokja belum memenuhi target: ${pokjaTerlambat.join(', ')}`,
            margin + 4, y2 + 8
        )

        y2 += 17

        // Tabel detail keterlambatan
        const tableRows2 = keterlambatanList.map(k => {
            // Tandai apakah ini target bulan ini atau sebelumnya
            const targetPokja = getTargetPokja(k.pokja)
            const tglBulanIni = targetPokja?.jadwal.find(j => j.bulan === namaBulan)?.standar
            const isBulanIni = tglBulanIni?.some(s => s.toUpperCase() === k.standar.toUpperCase()) ?? false
            const label = isBulanIni ? namaBulan : (namaBulanSebelum ?? '')
            return [
                k.pokja,
                k.standar,
                k.epKosong.join(', '),
                label,
            ]
        })

        autoTable(pdf, {
            startY: y2,
            head: [['Pokja', 'Standar Tertunggak', 'EP yang Belum Terisi', 'Target Bulan']],
            body: tableRows2,
            margin: { left: margin, right: margin },
            styles: { fontSize: 7.5, cellPadding: 2.5, lineColor: [230, 230, 230], lineWidth: 0.2 },
            headStyles: {
                fillColor: [185, 28, 28],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center',
            },
            columnStyles: {
                0: { halign: 'center', fontStyle: 'bold', cellWidth: 22 },
                1: { halign: 'left', fontStyle: 'bold', cellWidth: 40 },
                2: { halign: 'left', cellWidth: 160 },
                3: { halign: 'center', cellWidth: 35 },
            },
            didParseCell: (data) => {
                if (data.section === 'body') {
                    if (data.row.index % 2 === 0) {
                        data.cell.styles.fillColor = [255, 250, 250]
                    }
                    // Kolom "Target Bulan" — warna tergantung bulan ini vs sebelumnya
                    if (data.column.index === 3) {
                        const isBulanIniRow = data.cell.text[0] === namaBulan
                        data.cell.styles.textColor = isBulanIniRow ? [185, 28, 28] : [180, 100, 0]
                        data.cell.styles.fontStyle = 'bold'
                    }
                }
            },
        })

        // Footer halaman 2
        pdf.setFillColor(245, 245, 245)
        pdf.rect(0, pageH - 10, pageW, 10, 'F')
        pdf.setFontSize(6.5)
        pdf.setTextColor(150, 150, 150)
        pdf.setFont('helvetica', 'normal')
        pdf.text('Akreditasi Monitor — webinstant.id | Nusa Tenggara Barat, Kec. Mataram', margin, pageH - 4)
        pdf.text(`Halaman 2 dari 2  |  ${tanggal}`, pageW - margin, pageH - 4, { align: 'right' })
    }

    // Update footer halaman 1 (ubah jadi "1 dari 2" jika ada hal 2)
    const totalHal = keterlambatanList.length > 0 ? 2 : 1
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
    pdf.setPage(1)
    pdf.setFillColor(245, 245, 245)
    pdf.rect(0, pageH - 10, pageW, 10, 'F')
    pdf.setFontSize(6.5)
    pdf.setTextColor(150, 150, 150)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Akreditasi Monitor — webinstant.id | Nusa Tenggara Barat, Kec. Mataram', margin, pageH - 4)
    pdf.text(`Halaman 1 dari ${totalHal}  |  ${tanggal}`, pageW - margin, pageH - 4, { align: 'right' })

    pdf.save(`laporan-akreditasi-${dateStr}.pdf`)
}


// ─── Laporan Individu Per Pokja ───────────────────────────────────────────────

interface EPInfo {
    standarName: string  // Folder Standar (parent EP)
    epName: string       // Nama folder EP
    hasFiles: boolean
    fileCount: number
}

/**
 * Kumpulkan info EP (standar, nama EP, ada file?) per Pokja
 */
function kumpulkanEPInfo(pokjaCode: string, allDocs: DocExport[]): EPInfo[] {
    // Cari folder EP yang termasuk Pokja ini
    const epFolders = allDocs.filter(
        d => d.mime_type === 'application/vnd.google-apps.folder' && isEPFolder(d)
    )

    const result: EPInfo[] = []

    for (const ep of epFolders) {
        // Cari pokja ep ini
        const pCode = findPokjaCode(ep, allDocs)
        if (pCode !== pokjaCode) continue

        // Standar = parent langsung EP
        const standar = allDocs.find(d => d.gdrive_id === ep.parent_id)
        const standarName = standar?.name ?? '-'

        const fileCount = countFilesRecursiveUnderFolder(ep.gdrive_id, allDocs)

        result.push({
            standarName,
            epName: ep.name,
            hasFiles: fileCount > 0,
            fileCount,
        })
    }

    // Sort: standar → ep
    result.sort((a, b) => {
        if (a.standarName !== b.standarName) return a.standarName.localeCompare(b.standarName, 'id', { numeric: true })
        return a.epName.localeCompare(b.epName, 'id', { numeric: true })
    })

    return result
}

/**
 * Hasilkan analisa teks otomatis untuk satu Pokja
 */
function buatAnalisaTeks(
    pokjaCode: string,
    totalEP: number,
    terisi: number,
    kosong: number,
    persen: number
): string[] {
    const bulan = getBulanSekarang()
    const namaBulan = getNamaBulan(bulan)
    const target = getTargetPokja(pokjaCode)
    const targetBulanIni = target?.jadwal.find(j => j.bulan === namaBulan)
    const kumulatif = getStandarKumulatif(pokjaCode, bulan)

    const lines: string[] = []

    // Baris 1: status keseluruhan
    if (persen === 0) {
        lines.push(`Pokja ${pokjaCode} belum memiliki EP yang terisi. Dari ${totalEP} EP yang ada, seluruhnya masih kosong.`)
    } else if (persen === 100) {
        lines.push(`Pokja ${pokjaCode} telah memenuhi seluruh EP (${totalEP} EP) dengan dokumen yang diperlukan. Kinerja sangat baik!`)
    } else {
        lines.push(`Pokja ${pokjaCode} telah mengisi ${terisi} dari ${totalEP} EP (${persen}%). Masih terdapat ${kosong} EP yang belum terpenuhi.`)
    }

    // Baris 2: target bulan ini
    if (targetBulanIni && targetBulanIni.standar[0] !== 'Pembahasan Anggota Tim') {
        lines.push(`Target ${namaBulan}: Standar ${targetBulanIni.standar.join(', ')} harus sudah terpenuhi.`)
    } else if (targetBulanIni?.standar[0] === 'Pembahasan Anggota Tim') {
        lines.push(`Bulan ${namaBulan} merupakan bulan pembahasan dan pembentukan anggota tim Pokja ${pokjaCode}.`)
    }

    // Baris 3: rekomendasi
    if (persen < 40) {
        lines.push(`Rekomendasi: Perlu perhatian segera. Kelengkapan dokumen masih sangat rendah (< 40%). Fokus pada pengumpulan dokumen dasar terlebih dahulu.`)
    } else if (persen < 75) {
        lines.push(`Rekomendasi: Kelengkapan cukup, namun perlu ditingkatkan. Target mencapai ≥75% untuk persiapan akreditasi yang optimal.`)
    } else {
        lines.push(`Rekomendasi: Kelengkapan sudah baik (≥75%). Pertahankan dan pastikan dokumen yang ada selalu diperbaharui sesuai standar terbaru.`)
    }

    // Baris 4: kumulatif standar seharusnya
    if (kumulatif.length > 0 && kumulatif[0] !== 'Pembahasan Anggota Tim') {
        lines.push(`Kumulatif standar s/d ${namaBulan}: ${kumulatif.filter(k => k !== 'Pembahasan Anggota Tim').join(', ')}.`)
    }

    return lines
}

/**
 * Export laporan individu per Pokja — satu file PDF per Pokja
 * Format: A4 portrait, header berwarna, stats, analisa, tabel EP, jadwal target
 */
export function exportLaporanIndividuPDF(allDocs: DocExport[], pokjaCode: string): void {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageW = 210
    const pageH = 297
    const margin = 14
    const contentW = pageW - 2 * margin
    const now = new Date()
    const tanggal = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    const bulan = getBulanSekarang()
    const namaBulan = getNamaBulan(bulan)

    // Hitung statistik Pokja ini
    const statsAll = hitungStatistikPokja(allDocs)
    const stats = statsAll.find(s => s.code === pokjaCode)
    const totalEP = stats?.totalEP ?? 0
    const terisi = stats?.terisi ?? 0
    const kosong = stats?.kosong ?? 0
    const persen = stats?.persentase ?? 0
    const target = getTargetPokja(pokjaCode)
    const epInfoList = kumpulkanEPInfo(pokjaCode, allDocs)

    // ── Header ────────────────────────────────────────────────────────────────
    pdf.setFillColor(185, 28, 28)
    pdf.rect(0, 0, pageW, 30, 'F')

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`LAPORAN POKJA ${pokjaCode}`, margin, 12)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Laporan Individu Kelengkapan Dokumen Akreditasi', margin, 19)
    pdf.text(`Dicetak: ${tanggal}`, pageW - margin, 19, { align: 'right' })
    pdf.setFontSize(7)
    pdf.setTextColor(255, 200, 200)
    pdf.text('webinstant.id', pageW - margin, 9, { align: 'right' })

    // ── Summary Cards (2 baris × 2 kolom) ────────────────────────────────────
    let y = 36
    const cW = (contentW - 6) / 2
    const cH = 18

    const cards2x2 = [
        { label: 'Total EP', value: String(totalEP), color: [99, 102, 241] as [number, number, number] },
        { label: 'EP Sudah Terisi', value: String(terisi), color: [34, 197, 94] as [number, number, number] },
        { label: 'EP Masih Kosong', value: String(kosong), color: [239, 68, 68] as [number, number, number] },
        { label: 'Kelengkapan', value: `${persen}%`, color: warnaPersen(persen) },
    ]

    cards2x2.forEach((card, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const x = margin + col * (cW + 6)
        const cy = y + row * (cH + 4)
        pdf.setFillColor(...card.color)
        pdf.roundedRect(x, cy, cW, cH, 3, 3, 'F')
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text(card.value, x + cW / 2, cy + 10, { align: 'center' })
        pdf.setFontSize(7)
        pdf.setFont('helvetica', 'normal')
        pdf.text(card.label, x + cW / 2, cy + 16, { align: 'center' })
    })

    // Progress bar
    y += 2 * (cH + 4) + 2
    pdf.setFillColor(229, 229, 229)
    pdf.roundedRect(margin, y, contentW, 6, 2, 2, 'F')
    const [r, g, b] = warnaPersen(persen)
    const fillW = (contentW * persen) / 100
    if (fillW > 0) {
        pdf.setFillColor(r, g, b)
        pdf.roundedRect(margin, y, fillW, 6, 2, 2, 'F')
    }
    pdf.setFontSize(6.5)
    pdf.setTextColor(r, g, b)
    pdf.text(`${persen}% terpenuhi`, margin + contentW / 2, y + 4.5, { align: 'center' })

    // ── Analisa ───────────────────────────────────────────────────────────────
    y += 10
    pdf.setFillColor(254, 243, 199) // kuning muda
    const analisaLines = buatAnalisaTeks(pokjaCode, totalEP, terisi, kosong, persen)
    const totalAnalisaH = analisaLines.length * 6 + 6
    pdf.roundedRect(margin, y, contentW, totalAnalisaH, 2, 2, 'F')
    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(120, 80, 0)
    pdf.text('[!] Analisa & Rekomendasi', margin + 3, y + 5)
    pdf.setFont('helvetica', 'normal')
    analisaLines.forEach((line, i) => {
        const wrapped = pdf.splitTextToSize(line, contentW - 6)
        pdf.text(wrapped, margin + 3, y + 11 + i * 6)
    })

    // ── Tabel Daftar EP ───────────────────────────────────────────────────────
    y += totalAnalisaH + 5

    const tableRows = epInfoList.map(ep => [
        ep.standarName,
        ep.epName,
        ep.hasFiles ? `✓ ${ep.fileCount} file` : '✗ Kosong',
    ])

    autoTable(pdf, {
        startY: y,
        head: [['Standar', 'Elemen Penilaian (EP)', 'Status Dokumen']],
        body: tableRows,
        margin: { left: margin, right: margin },
        styles: { fontSize: 7.5, cellPadding: 2 },
        headStyles: {
            fillColor: [185, 28, 28],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center',
        },
        columnStyles: {
            0: { halign: 'left', fontStyle: 'bold', cellWidth: 45 },
            1: { halign: 'left', cellWidth: 85 },
            2: { halign: 'center', cellWidth: 42 },
        },
        didParseCell: (data) => {
            if (data.section === 'body' && data.column.index === 2) {
                const rowIdx = data.row.index
                const ep = epInfoList[rowIdx]
                if (ep) {
                    data.cell.styles.textColor = ep.hasFiles ? [22, 163, 74] : [220, 38, 38]
                    data.cell.styles.fontStyle = 'bold'
                }
            }
            if (data.section === 'body' && data.row.index % 2 === 0) {
                data.cell.styles.fillColor = [252, 250, 250]
            }
        },
    })

    // ── Jadwal Target Bulanan ─────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (pdf as any).lastAutoTable?.finalY ?? 200

    if (target && finalY + 30 < pageH - 15) {
        const jadwalY = finalY + 6
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(30, 30, 30)
        pdf.text('Jadwal Target Pemenuhan Standar per Bulan', margin, jadwalY)

        const jadwalRows = target.jadwal.map(j => {
            const isAktif = j.bulan === namaBulan
            return [
                j.bulan + (isAktif ? ' [*]' : ''),
                j.standar.join(', '),
            ]
        })

        autoTable(pdf, {
            startY: jadwalY + 3,
            head: [['Bulan', 'Standar Target']],
            body: jadwalRows,
            margin: { left: margin, right: margin },
            styles: { fontSize: 7, cellPadding: 2 },
            headStyles: { fillColor: [185, 28, 28], textColor: [255, 255, 255], fontStyle: 'bold' },
            columnStyles: {
                0: { cellWidth: 35, fontStyle: 'bold' },
                1: { cellWidth: 137 },
            },
            didParseCell: (data) => {
                if (data.section === 'body') {
                    const jadwal = target.jadwal[data.row.index]
                    if (jadwal?.bulan === namaBulan) {
                        data.cell.styles.fillColor = [254, 243, 199]
                        data.cell.styles.textColor = [120, 80, 0]
                        data.cell.styles.fontStyle = 'bold'
                    }
                }
            },
        })
    }

    // ── Footer ────────────────────────────────────────────────────────────────
    pdf.setFillColor(245, 245, 245)
    pdf.rect(0, pageH - 10, pageW, 10, 'F')
    pdf.setFontSize(6)
    pdf.setTextColor(150, 150, 150)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Akreditasi Monitor — webinstant.id | ${tanggal}`, margin, pageH - 4)
    pdf.text(`Pokja ${pokjaCode} | Bulan Aktif: ${namaBulan}`, pageW - margin, pageH - 4, { align: 'right' })

    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
    pdf.save(`laporan-individu-${pokjaCode}-${dateStr}.pdf`)
}

