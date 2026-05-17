// Script untuk mengekstrak nama Standar dan EP dari PDF
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
    
    // Debug: tulis raw text ke file untuk analisis
    writeFileSync(
        join(process.cwd(), 'scripts', `raw_${pokjaCode}.txt`), 
        lines.join('\n'), 
        'utf-8'
    )

    console.log(`\n========== ${pokjaCode} ==========`)
    console.log(`Total lines: ${lines.length}`)
    
    // Cari baris yang mengandung pattern standar (e.g., "Standar TKRS 1" atau "TKRS 1")
    const standarPattern = new RegExp(`^(?:Standar\\s+)?${pokjaCode}\\s+\\d[\\d.]*`, 'i')
    const epPattern = /^(?:EP|Elemen Penilaian)\s*\d+/i
    
    const standarLines = lines.filter(l => standarPattern.test(l))
    console.log(`Standar matches: ${standarLines.length}`)
    standarLines.slice(0, 10).forEach(l => console.log(`  - ${l.substring(0, 120)}`))
    
    const epLines = lines.filter(l => epPattern.test(l))
    console.log(`EP matches: ${epLines.length}`)
    epLines.slice(0, 10).forEach(l => console.log(`  - ${l.substring(0, 120)}`))
}

async function main() {
    const files = readdirSync(POKJA_DIR).filter(f => f.endsWith('.pdf'))
    console.log(`Found ${files.length} PDF files:`, files)
    
    // Process just first 3 for now to see the pattern
    for (const file of files.slice(0, 3)) {
        const pokjaCode = file.replace('.pdf', '')
        await extractFromPDF(join(POKJA_DIR, file), pokjaCode)
    }
}

main().catch(console.error)
