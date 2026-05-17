// Generator: update masterStandarEP.ts dengan deskripsi dari JSON
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const standarDescRaw = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'standar_descriptions.json'), 'utf-8'))
const epDescRaw = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'ep_descriptions.json'), 'utf-8'))

// Load RDOW bukti data jika tersedia
let epBuktiRaw = {}
try {
    epBuktiRaw = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'ep_bukti.json'), 'utf-8'))
} catch { /* file belum ada = skip */ }

// Load existing masterStandarEP data for standar names dan EP lists
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Kita perlu data standar dari JSON yang sudah diekstrak sebelumnya
const standarEpData = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'standar_ep_data.json'), 'utf-8'))

const pokjaNameMap = {
    AKP: 'Akses dan Kontinuitas Pelayanan',
    HPK: 'Hak Pasien dan Keluarga',
    KE: 'Kompetensi dan Kewenangan',
    KPS: 'Kompetensi dan Kewenangan Staf',
    MFK: 'Manajemen Fasilitas dan Keselamatan',
    MRMIK: 'Manajemen Rekam Medis dan Informasi Kesehatan',
    PAB: 'Pelayanan Anestesi dan Bedah',
    PAP: 'Pelayanan dan Asuhan Pasien',
    PKPO: 'Pelayanan Kefarmasian dan Penggunaan Obat',
    PMKP: 'Peningkatan Mutu dan Keselamatan Pasien',
    PP: 'Pengkajian Pasien',
    PPI: 'Pencegahan dan Pengendalian Infeksi',
    PPK: 'Program Peningkatan Kepatuhan',
    PROGNAS: 'Program Nasional',
    SKP: 'Sasaran Keselamatan Pasien',
    TKRS: 'Tata Kelola Rumah Sakit',
}

const defaultEPLetters = ['a', 'b', 'c', 'd', 'e']

function esc(s) {
    return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')
}

let ts = `// MASTER DATA STANDAR DAN ELEMEN PENILAIAN (EP) AKREDITASI RUMAH SAKIT
// Diekstrak dari PDF di folder "STANDAR DAN EP POKJA"
// Auto-generated — JANGAN edit manual

export interface EPItem {
    kode: string       // "EP a", "EP b", dst.
    deskripsi: string  // Deskripsi elemen penilaian
    bukti?: string[]   // Jenis bukti: R(egulasi), D(okumen), O(bservasi), W(awancara), S(imulasi)
}

export interface StandarItem {
    kode: string        // "TKRS 1", "AKP 1.1", dst.
    deskripsi: string   // Deskripsi standar
    epList: EPItem[]     // Daftar EP dalam standar ini
}

export interface PokjaStandarData {
    pokjaCode: string
    pokjaName: string
    standarList: StandarItem[]
}

`

ts += `export const MASTER_STANDAR_EP: PokjaStandarData[] = [\n`

for (const [pokjaCode, standarData] of Object.entries(standarEpData)) {
    const standarKeys = Object.keys(standarData)
    ts += `    {\n`
    ts += `        pokjaCode: '${pokjaCode}',\n`
    ts += `        pokjaName: '${pokjaNameMap[pokjaCode] || pokjaCode}',\n`
    ts += `        standarList: [\n`

    for (const standarKey of standarKeys) {
        const standarInfo = standarData[standarKey]
        const desc = standarDescRaw[standarKey] || ''
        const epLetters = (standarInfo.epList && standarInfo.epList.length > 0)
            ? standarInfo.epList.map(e => e.kode.replace('EP ', ''))
            : (standarInfo.epLetters && standarInfo.epLetters.length > 0)
                ? standarInfo.epLetters
                : defaultEPLetters

        ts += `            {\n`
        ts += `                kode: '${standarKey}',\n`
        ts += `                deskripsi: '${esc(desc)}',\n`
        ts += `                epList: [\n`

        for (const letter of epLetters) {
            const epDescKey = `${standarKey}|EP ${letter}`
            const epDesc = epDescRaw[epDescKey] || ''
            const bukti = epBuktiRaw[epDescKey]
            const buktiStr = bukti && bukti.length > 0 ? `, bukti: [${bukti.map(b => `'${b}'`).join(', ')}]` : ''
            ts += `                    { kode: 'EP ${letter}', deskripsi: '${esc(epDesc)}'${buktiStr} },\n`
        }

        ts += `                ],\n`
        ts += `            },\n`
    }

    ts += `        ],\n`
    ts += `    },\n`
}

ts += `]\n\n`
ts += `/** Cari standar data berdasarkan kode pokja */
export function getStandarByPokja(pokjaCode: string): PokjaStandarData | undefined {
    return MASTER_STANDAR_EP.find(p => p.pokjaCode === pokjaCode)
}

/** Hitung total EP di seluruh pokja */
export function hitungTotalEPSemua(): number {
    return MASTER_STANDAR_EP.reduce((total, pokja) => {
        return total + pokja.standarList.reduce((t, s) => t + s.epList.length, 0)
    }, 0)
}
`

writeFileSync(join(process.cwd(), 'src', 'lib', 'masterStandarEP.ts'), ts, 'utf-8')
console.log('✅ masterStandarEP.ts berhasil diupdate dengan deskripsi dan bukti RDOW!')
console.log(`Total standar: ${Object.keys(standarDescRaw).length}`)
console.log(`Total EP descriptions: ${Object.keys(epDescRaw).length}`)
console.log(`Total EP bukti (RDOW): ${Object.keys(epBuktiRaw).length}`)
