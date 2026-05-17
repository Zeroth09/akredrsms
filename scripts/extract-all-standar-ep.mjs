// Script untuk mengekstrak SEMUA standar dan EP dari PDF pokja
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
    
    // Pattern untuk menangkap "Elemen Penilaian AKP 1" atau "Elemen Penilaian AKP 1.1"
    const epHeaderPattern = new RegExp(`^Elemen Penilaian\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    // Pattern untuk menangkap "Standar AKP 1" 
    const standarPattern = new RegExp(`^Standar\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    
    const standarMap = {} // { "AKP 1": { nama: "...", epList: [{kode: "a", teks: "..."}, ...] } }
    let currentStandar = null
    let currentEPStandar = null  // standar dari section Elemen Penilaian
    let inEPSection = false
    let epItems = []
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        
        // Deteksi Standar baru
        const standarMatch = line.match(standarPattern)
        if (standarMatch) {
            const standarNum = standarMatch[1]
            const standarKey = `${pokjaCode} ${standarNum}`
            
            // Ambil judul standar (biasanya di baris berikutnya)
            let judul = ''
            for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
                const nextLine = lines[j]
                if (nextLine && !standarPattern.test(nextLine) && !epHeaderPattern.test(nextLine)) {
                    // Skip baris header tabel
                    if (nextLine.includes('Kelengkapan Bukti') || nextLine.includes('Skoring')) continue
                    judul = nextLine
                    break
                }
            }
            
            if (!standarMap[standarKey]) {
                standarMap[standarKey] = { judul, epList: [] }
            }
            currentStandar = standarKey
            inEPSection = false
            continue
        }
        
        // Deteksi "Elemen Penilaian AKP X"
        const epHeaderMatch = line.match(epHeaderPattern)
        if (epHeaderMatch) {
            const epNum = epHeaderMatch[1]
            currentEPStandar = `${pokjaCode} ${epNum}`
            
            // Pastikan standar ini terdaftar
            if (!standarMap[currentEPStandar]) {
                standarMap[currentEPStandar] = { judul: '', epList: [] }
            }
            
            inEPSection = true
            continue
        }
        
        // Jika di dalam EP section, cari butir EP (a), b), c)...)
        if (inEPSection && currentEPStandar) {
            const epItemMatch = line.match(/^([a-z])\)\s+(.+)/)
            if (epItemMatch) {
                const kode = epItemMatch[1]
                let teks = epItemMatch[2]
                
                // Bersihkan teks dari tab/whitespace berlebihan
                teks = teks.replace(/\t+/g, ' ').replace(/\s{2,}/g, ' ').trim()
                
                // Truncate jika terlalu panjang
                if (teks.length > 200) teks = teks.substring(0, 200) + '...'
                
                standarMap[currentEPStandar].epList.push({
                    kode: `EP ${kode}`,
                    teks
                })
            }
        }
    }
    
    return standarMap
}

async function main() {
    const files = readdirSync(POKJA_DIR).filter(f => f.endsWith('.pdf'))
    console.log(`Found ${files.length} PDF files`)
    
    const allData = {}
    
    for (const file of files) {
        const pokjaCode = file.replace('.pdf', '')
        console.log(`Processing ${pokjaCode}...`)
        try {
            const standarMap = await extractFromPDF(join(POKJA_DIR, file), pokjaCode)
            allData[pokjaCode] = standarMap
            
            const standarCount = Object.keys(standarMap).length
            let totalEP = 0
            for (const key of Object.keys(standarMap)) {
                totalEP += standarMap[key].epList.length
            }
            console.log(`  -> ${standarCount} standar, ${totalEP} EP items`)
        } catch (err) {
            console.error(`  ERROR: ${err.message}`)
        }
    }
    
    // Tulis ke file JSON
    writeFileSync(
        join(process.cwd(), 'scripts', 'standar_ep_data.json'),
        JSON.stringify(allData, null, 2),
        'utf-8'
    )
    console.log('\nData berhasil ditulis ke scripts/standar_ep_data.json')
}

main().catch(console.error)
