// Script V3: Ekstrak deskripsi Standar dan EP dari PDF dengan parsing lebih akurat
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const POKJA_DIR = join(process.cwd(), 'STANDAR DAN EP POKJA')

async function extractText(filePath) {
    const buffer = readFileSync(filePath)
    const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    const parser = new PDFParse(uint8)
    await parser.load()
    const result = await parser.getText()
    return result.text
}

function isNoise(line) {
    if (/^--\s*\d+\s+of\s+\d+\s*--$/.test(line)) return true
    if (/^(Pemerintah Provinsi|Nusa Tenggara Barat)/i.test(line)) return true
    if (line === '|' || line.length === 0) return true
    if (/^\d+$/.test(line)) return true
    return false
}

function extractPokja(text, pokjaCode) {
    const rawLines = text.split('\n').map(l => l.trim())
    // Bersihkan noise tapi keep line numbers
    const lines = rawLines.filter(Boolean)

    const standarRe = new RegExp(`^Standar\\s+${pokjaCode}\\s+(\\d[\\d.]*)$`, 'i')
    const epHeaderTableRe = /^Elemen Penilaian\s+Kelengkapan/i  // Header tabel EP
    const epHeaderTitleRe = new RegExp(`^Elemen Penilaian\\s+${pokjaCode}\\s+(\\d[\\d.]*)$`, 'i')
    const maksudRe = new RegExp(`^(Maksud dan Tujuan|MAKSUD DAN TUJUAN)\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')

    // ===== STANDAR DESCRIPTIONS =====
    const standarDesc = {}
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(standarRe)
        if (!m) continue
        const key = `${pokjaCode} ${m[1]}`

        let candidates = []
        for (let j = i - 1; j >= Math.max(0, i - 12); j--) {
            const line = lines[j]
            if (isNoise(line)) continue
            if (standarRe.test(line) || epHeaderTableRe.test(line) || epHeaderTitleRe.test(line) || maksudRe.test(line)) break
            if (/^(Elemen Penilaian\s+Kelengkapan|Skoring)/.test(line)) break
            if (/^[A-Z]{3,}\s+[A-Z]/.test(line) && line.length < 50) break
            candidates.unshift(line)
        }

        let descLines = []
        let startCapturing = false
        for (const c of candidates) {
            if (!startCapturing && /^[A-Z]/.test(c)) startCapturing = true
            if (startCapturing) descLines.push(c)
        }
        if (descLines.length === 0) descLines = candidates

        let desc = descLines.join(' ').replace(/\t+/g, ' ').replace(/\s{2,}/g, ' ').trim()
        if (desc.length > 400) desc = desc.substring(0, 400) + '...'
        standarDesc[key] = desc
    }

    // ===== EP DESCRIPTIONS =====
    // Cari zone EP: antara "Elemen Penilaian\tKelengkapan" DAN "Elemen Penilaian XXX N" (title)
    // atau antara "Elemen Penilaian\tKelengkapan" dan Standar/Maksud berikutnya
    const epDesc = {}

    // Temukan semua standar yang ada
    const standarPositions = []
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(standarRe)
        if (m) standarPositions.push({ idx: i, key: `${pokjaCode} ${m[1]}` })
    }

    // Untuk setiap standar, cari EP table-nya
    for (const sp of standarPositions) {
        // Cari "Elemen Penilaian\tKelengkapan" SETELAH posisi standar
        let tableStart = -1
        for (let i = sp.idx + 1; i < Math.min(sp.idx + 10, lines.length); i++) {
            if (epHeaderTableRe.test(lines[i])) {
                tableStart = i + 1
                break
            }
        }
        // Jika tidak ditemukan, cari juga sebelum standar (kadang urutan terbalik)
        if (tableStart === -1) {
            for (let i = sp.idx - 1; i >= Math.max(0, sp.idx - 5); i--) {
                if (epHeaderTableRe.test(lines[i])) {
                    tableStart = i + 1
                    break
                }
            }
        }
        if (tableStart === -1) continue

        // Cari batas akhir zone EP (sebelum standar/maksud berikutnya)
        let tableEnd = lines.length
        for (let i = tableStart; i < lines.length; i++) {
            if (maksudRe.test(lines[i]) || (standarRe.test(lines[i]) && i !== sp.idx)) {
                tableEnd = i
                break
            }
            if (epHeaderTitleRe.test(lines[i])) {
                tableEnd = i
                break
            }
        }

        // Parse EP items dalam zone ini
        for (let i = tableStart; i < tableEnd; i++) {
            const line = lines[i]
            if (isNoise(line)) continue

            let epLetter = null
            let firstPart = ''

            // Pattern 1: huruf tunggal di baris sendiri
            if (/^([a-z])$/.test(line)) {
                epLetter = line
            }
            // Pattern 2: "b Rumah sakit telah..." (huruf + spasi + teks)
            else if (/^([a-z])\s+([A-Z].+)/.test(line)) {
                const mm = line.match(/^([a-z])\s+(.+)/)
                epLetter = mm[1]
                firstPart = mm[2]
            }
            // Pattern 3: "a) Deskripsi..."
            else if (/^([a-z])\)\s*(.*)/.test(line)) {
                const mm = line.match(/^([a-z])\)\s*(.*)/)
                epLetter = mm[1]
                firstPart = mm[2] || ''
            }

            if (!epLetter) continue
            const epKey = `${sp.key}|EP ${epLetter}`
            if (epDesc[epKey]) continue

            // Kumpulkan deskripsi
            let parts = firstPart ? [firstPart] : []
            for (let j = i + 1; j < Math.min(i + 12, tableEnd); j++) {
                const nl = lines[j]
                if (isNoise(nl)) continue
                // Stop conditions: EP item berikutnya
                if (/^([a-z])$/.test(nl)) break
                if (/^([a-z])\s+[A-Z]/.test(nl) && nl.length > 5) break
                if (/^[a-z]\)/.test(nl)) break
                // Stop: section markers
                if (epHeaderTableRe.test(nl) || epHeaderTitleRe.test(nl)) break
                if (standarRe.test(nl) || maksudRe.test(nl)) break
                // Stop: standalone bukti type (D/W/S/O/R saja)
                if (/^(D|W|S|O|R)$/.test(nl)) break
                if (/^\d+$/.test(nl)) break
                if (nl === '-') break
                // Stop: bukti/referensi content
                if (/^(1\.\s*Bukti|2\.\s*Bukti|SPK\s|Panduan|Surat)/i.test(nl)) break
                if (/^- (Staf|Dokter|PPA|Petugas)/i.test(nl)) break
                if (/^Bukti\s+(rekam|pelaksanaan|hasil)/i.test(nl)) break
                // Baris yang mengandung R/D/W indicator inline — ambil bagian sebelumnya
                if (/\s+R\s+(Penetapan|Regulasi|Bukti|Kebijakan)/i.test(nl)) {
                    const cleaned = nl.replace(/\s+R\s+(Penetapan|Regulasi|Bukti|Kebijakan).*/i, '').trim()
                    if (cleaned.length > 3) parts.push(cleaned)
                    break
                }
                if (/\s+D\s+(Bukti|Hasil|Dokumen)/i.test(nl)) {
                    const cleaned = nl.replace(/\s+D\s+(Bukti|Hasil|Dokumen).*/i, '').trim()
                    if (cleaned.length > 3) parts.push(cleaned)
                    break
                }
                parts.push(nl)
                if (parts.join(' ').length > 350) break
            }

            let desc = parts.join(' ').replace(/\t+/g, ' ').replace(/\s{2,}/g, ' ')
            // Bersihkan trailing R/D/W bukti indicators
            desc = desc.replace(/\s+(R|D|W|S|O)\s+(Penetapan|Regulasi|Bukti|Kebijakan|Hasil|Dokumen).*$/i, '')
            desc = desc.trim()
            if (desc.length > 400) desc = desc.substring(0, 400) + '...'
            if (desc.length > 5) epDesc[epKey] = desc
        }
    }

    return { standarDesc, epDesc }
}

async function main() {
    const files = readdirSync(POKJA_DIR).filter(f => f.endsWith('.pdf'))
    const allStandarDesc = {}
    const allEpDesc = {}

    for (const file of files) {
        const pokjaCode = file.replace('.pdf', '')
        process.stdout.write(`${pokjaCode}... `)
        try {
            const text = await extractText(join(POKJA_DIR, file))
            const { standarDesc, epDesc } = extractPokja(text, pokjaCode)
            Object.assign(allStandarDesc, standarDesc)
            Object.assign(allEpDesc, epDesc)

            const sOk = Object.values(standarDesc).filter(v => v.length > 10).length
            const eTotal = Object.keys(epDesc).length
            console.log(`${sOk} standar, ${eTotal} EP`)
        } catch (err) {
            console.error(`ERR: ${err.message}`)
        }
    }

    writeFileSync(join(process.cwd(), 'scripts', 'standar_descriptions.json'),
        JSON.stringify(allStandarDesc, null, 2), 'utf-8')
    writeFileSync(join(process.cwd(), 'scripts', 'ep_descriptions.json'),
        JSON.stringify(allEpDesc, null, 2), 'utf-8')

    // Verifikasi
    console.log('\n--- Verifikasi ---')
    console.log('AKP 1:', (allStandarDesc['AKP 1'] || '').substring(0, 100))
    console.log('EP AKP 1|EP a:', allEpDesc['AKP 1|EP a'])
    console.log('EP AKP 1|EP b:', allEpDesc['AKP 1|EP b'])
    console.log('EP AKP 1|EP c:', allEpDesc['AKP 1|EP c'])
    console.log('EP AKP 1|EP d:', allEpDesc['AKP 1|EP d'])

    console.log(`\n✅ ${Object.keys(allStandarDesc).length} standar, ${Object.keys(allEpDesc).length} EP`)
}

main().catch(console.error)
