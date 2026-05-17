import * as XLSX from 'xlsx'
import { collectFilesRecursiveUnderFolder } from '@/lib/standarEpHierarchy'
import { enumerateEPRowsForExport, aggregateDashboardEPStats, type Doc } from '@/lib/pokjaUtils'

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
    standar?: string | null
    ep?: string | null
}



const COLS = {
    pokja: 0,
    standar: 1,
    ep: 2,
    realisasi: 3,
    linkFiles: 4,
    verifikasi: 5,
    catatan: 6,
} as const

/**
 * Export EP ke Excel: data selaras dashboard2/modal Pokja — Pokja dari findPokjaRootFolder & traverse EP rekursif.
 * Ringkasan (Total EP, realisasi, kosong, persentase) di baris atas; detail dengan Realisasi (checkbox unicode),
 * Verifikasi dokumen & Catatan (kolom kosong untuk isi manual).
 */
export function exportEPDataToExcel(allDocs: DocExport[]): void {
    const docs = allDocs as unknown as Doc[]

    const stats = aggregateDashboardEPStats(docs)
    const epRows = enumerateEPRowsForExport(docs)

    interface FlatRowData {
        pokja: string
        standar: string
        ep: string
        realisasi: string
        linkFiles: string
        verifikasi: string
        catatan: string
    }

    interface EPFlatBlock {
        base: {
            pokja: string
            standar: string
            ep: string
            realisasi: string
            verifikasi: string
            catatan: string
        }
        linkRows: string[]
    }

    const blocks: EPFlatBlock[] = epRows.map((row) => {
        const files = collectFilesRecursiveUnderFolder(row.epFolder.gdrive_id, docs)
        const links = files.map((f) => f.web_view_link || f.name)
        const realisasi = row.terisi ? 'true' : 'false'

        return {
            base: {
                pokja: row.pokjaCode,
                standar: row.standarName,
                ep: row.epName,
                realisasi,
                verifikasi: '',
                catatan: '',
            },
            linkRows: links.length > 0 ? links : ['belum ada files/dokumen'],
        }
    })

    const flatRows: FlatRowData[] = []

    blocks.forEach((blk) => {
        blk.linkRows.forEach((link) => {
            flatRows.push({
                pokja: blk.base.pokja,
                standar: blk.base.standar,
                ep: blk.base.ep,
                realisasi: blk.base.realisasi,
                linkFiles: link,
                verifikasi: blk.base.verifikasi,
                catatan: blk.base.catatan,
            })
        })
    })

    // Prelude: grafis ringkasan (selaras TOTAL di dashboard) + spacer + header detail
    const summaryAoA: (string | number)[][] = [
        ['Grafis capaian EP (ringkasan)', '', ''],
        ['Total EP', stats.total],
        ['Realisasi (jumlah EP terisi)', stats.terisi],
        ['EP kosong', stats.kosong],
        ['Persentase (%)', `${stats.percentage}%`],
        [],
        [
            'Pokja',
            'Standar',
            'EP',
            'Realisasi',
            'Link Files',
            'Verifikasi dokumen',
            'Catatan',
        ],
    ]

    const dataAoA = flatRows.map((r) => [
        r.pokja,
        r.standar,
        r.ep,
        r.realisasi,
        r.linkFiles,
        r.verifikasi,
        r.catatan,
    ])

    const HEADER_ROW_IDX = summaryAoA.length - 1 // index baris header (0-based)
    const FIRST_DATA_ROW_IDX = HEADER_ROW_IDX + 1

    const aoa: (string | number)[][] = [...summaryAoA, ...dataAoA]

    const worksheet = XLSX.utils.aoa_to_sheet(aoa)

    const merges: XLSX.Range[] = []

    let epStartRel = 0
    blocks.forEach((blk) => {
        const rowsThisEp = blk.linkRows.length
        const ds = epStartRel
        const de = epStartRel + rowsThisEp - 1
        if (rowsThisEp > 1) {
            for (const c of [
                COLS.pokja,
                COLS.standar,
                COLS.ep,
                COLS.realisasi,
                COLS.verifikasi,
                COLS.catatan,
            ]) {
                merges.push({
                    s: { r: FIRST_DATA_ROW_IDX + ds, c },
                    e: { r: FIRST_DATA_ROW_IDX + de, c },
                })
            }
        }
        epStartRel += rowsThisEp
    })

    worksheet['!merges'] = merges

    worksheet['!cols'] = [
        { wch: 10 },
        { wch: 22 },
        { wch: 14 },
        { wch: 12 },
        { wch: 72 },
        { wch: 22 },
        { wch: 28 },
    ]

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data EP Akreditasi')

    XLSX.writeFile(workbook, 'laporan-akreditasi.xlsx')
}
