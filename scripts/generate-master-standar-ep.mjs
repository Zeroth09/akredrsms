// Script untuk mengekstrak EP items — improved pattern
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const POKJA_DIR = join(process.cwd(), 'STANDAR DAN EP POKJA')

async function extractFromPDF(filePath, pokjaCode) {
    const buffer = readFileSync(filePath)
    const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    const parser = new PDFParse(uint8)
    await parser.load()
    const result = await parser.getText()
    const text = result.text
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    
    const epHeaderPattern = new RegExp(`^Elemen Penilaian\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    const standarPattern = new RegExp(`^Standar\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    const nextStandarOrSection = new RegExp(`^(Standar|Elemen Penilaian|Maksud dan Tujuan|MAKSUD DAN TUJUAN)\\s+`, 'i')
    
    // Pertama: ekstrak semua standar
    const standarNames = []
    for (const line of lines) {
        const m = line.match(standarPattern)
        if (m) {
            const key = `${pokjaCode} ${m[1]}`
            if (!standarNames.includes(key)) standarNames.push(key)
        }
    }
    
    // Kedua: untuk setiap "Elemen Penilaian XXX N", hitung berapa banyak butir a) b) c) ...
    const standarEPMap = {}
    for (const sn of standarNames) {
        standarEPMap[sn] = { epCount: 0, epLetters: [] }
    }
    
    let currentEPSection = null
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        
        const epMatch = line.match(epHeaderPattern)
        if (epMatch) {
            currentEPSection = `${pokjaCode} ${epMatch[1]}`
            if (!standarEPMap[currentEPSection]) {
                standarEPMap[currentEPSection] = { epCount: 0, epLetters: [] }
            }
            continue
        }
        
        // Reset if we hit next standar section
        if (currentEPSection && standarPattern.test(line)) {
            currentEPSection = null
            continue
        }
        
        // Count EP items in current EP section
        if (currentEPSection) {
            const epItemMatch = line.match(/^([a-z])\)/)
            if (epItemMatch) {
                const letter = epItemMatch[1]
                if (!standarEPMap[currentEPSection].epLetters.includes(letter)) {
                    standarEPMap[currentEPSection].epLetters.push(letter)
                    standarEPMap[currentEPSection].epCount++
                }
            }
        }
    }
    
    return { standarNames, standarEPMap }
}

async function main() {
    const files = readdirSync(POKJA_DIR).filter(f => f.endsWith('.pdf'))
    const allData = {}
    
    for (const file of files) {
        const pokjaCode = file.replace('.pdf', '')
        process.stdout.write(`Processing ${pokjaCode}... `)
        try {
            const { standarNames, standarEPMap } = await extractFromPDF(join(POKJA_DIR, file), pokjaCode)
            allData[pokjaCode] = { standarNames, standarEPMap }
            
            let totalEP = 0
            let zeroCount = 0
            for (const s of standarNames) {
                const ep = standarEPMap[s]
                if (ep.epCount === 0) zeroCount++
                totalEP += ep.epCount
            }
            console.log(`${standarNames.length} standar, total ${totalEP} EP items, ${zeroCount} standar tanpa EP`)
        } catch (err) {
            console.error(`ERROR: ${err.message}`)
        }
    }
    
    // Generate TypeScript master data
    let ts = `// MASTER DATA STANDAR DAN ELEMEN PENILAIAN (EP) AKREDITASI RUMAH SAKIT\n`
    ts += `// Diekstrak dari PDF di folder "STANDAR DAN EP POKJA"\n`
    ts += `// Auto-generated — JANGAN edit manual\n\n`
    ts += `export interface EPItem {\n`
    ts += `    kode: string  // "EP a", "EP b", dst.\n`
    ts += `}\n\n`
    ts += `export interface StandarItem {\n`
    ts += `    kode: string      // "TKRS 1", "AKP 1.1", dst.\n`
    ts += `    epList: EPItem[]   // Daftar EP dalam standar ini\n`
    ts += `}\n\n`
    ts += `export interface PokjaStandarData {\n`
    ts += `    pokjaCode: string\n`
    ts += `    pokjaName: string\n`
    ts += `    standarList: StandarItem[]\n`
    ts += `}\n\n`

    // Mapping pokja code to name
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

    ts += `export const MASTER_STANDAR_EP: PokjaStandarData[] = [\n`
    
    const defaultEPLetters = ['a','b','c','d','e']  // Default 5 EP jika tidak terdeteksi dari PDF

    for (const [pokjaCode, data] of Object.entries(allData)) {
        ts += `    {\n`
        ts += `        pokjaCode: '${pokjaCode}',\n`
        ts += `        pokjaName: '${pokjaNameMap[pokjaCode] || pokjaCode}',\n`
        ts += `        standarList: [\n`
        
        for (const standarName of data.standarNames) {
            const epData = data.standarEPMap[standarName]
            const letters = epData.epLetters.length > 0 ? epData.epLetters : defaultEPLetters
            
            ts += `            {\n`
            ts += `                kode: '${standarName}',\n`
            ts += `                epList: [\n`
            for (const letter of letters) {
                ts += `                    { kode: 'EP ${letter}' },\n`
            }
            ts += `                ],\n`
            ts += `            },\n`
        }
        
        ts += `        ],\n`
        ts += `    },\n`
    }
    
    ts += `]\n\n`
    ts += `/** Cari standar data berdasarkan kode pokja */\n`
    ts += `export function getStandarByPokja(pokjaCode: string): PokjaStandarData | undefined {\n`
    ts += `    return MASTER_STANDAR_EP.find(p => p.pokjaCode === pokjaCode)\n`
    ts += `}\n\n`
    ts += `/** Hitung total EP di seluruh pokja */\n`
    ts += `export function hitungTotalEPSemua(): number {\n`
    ts += `    return MASTER_STANDAR_EP.reduce((total, pokja) => {\n`
    ts += `        return total + pokja.standarList.reduce((t, s) => t + s.epList.length, 0)\n`
    ts += `    }, 0)\n`
    ts += `}\n`

    writeFileSync(join(process.cwd(), 'src', 'lib', 'masterStandarEP.ts'), ts, 'utf-8')
    console.log('\n✅ File berhasil ditulis ke src/lib/masterStandarEP.ts')
    
    // Summary
    let totalStandar = 0, totalEP = 0
    for (const [code, data] of Object.entries(allData)) {
        totalStandar += data.standarNames.length
        for (const s of data.standarNames) {
            const ep = data.standarEPMap[s]
            totalEP += (ep.epLetters.length > 0 ? ep.epLetters.length : defaultEPLetters.length)
        }
    }
    console.log(`Total: ${Object.keys(allData).length} pokja, ${totalStandar} standar, ${totalEP} EP items`)
}

main().catch(console.error)
