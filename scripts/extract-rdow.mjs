// Script: Extract RDOW bukti data dari semua file pokja PDF
// Khusus untuk RDOW — deskripsi EP diambil dari KEPMENKES (v5)
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const POKJA_DIR = join(process.cwd(), 'STANDAR DAN EP POKJA')
const NUM_TO_LETTER = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f', '7': 'g', '8': 'h', '9': 'i', '10': 'j' }

function isNoise(line) {
    if (/^--\s*\d+\s+of\s+\d+\s*--$/.test(line)) return true
    if (/^(Pemerintah Provinsi|Nusa Tenggara Barat)/i.test(line)) return true
    if (line === '|' || line.length === 0) return true
    // JANGAN filter angka standalone di sini — SKP pakai angka sebagai EP marker
    if (line === '-') return true
    return false
}

async function extractText(filePath) {
    const buffer = readFileSync(filePath)
    const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    const parser = new PDFParse(uint8)
    await parser.load()
    const result = await parser.getText()
    return result.text
}

function extractRDOW(text, pokjaCode) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    const epBukti = {}

    // Detect table headers
    const epTableHeaderRe = /^(?:N?\s*O\s+)?(?:ELEMEN PENILAIAN|Elemen Penilaian)\s+(?:KELENGKAPAN|Kelengkapan)/i
    const standarRe = new RegExp(`^(?:STANDAR|Standar)\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    const epTitleRe = new RegExp(`^Elemen Penilaian\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    const maksudRe = new RegExp(`^(?:MAKSUD DAN TUJUAN|Maksud dan Tujuan)\\s+${pokjaCode}`, 'i')

    // Detect EP format: huruf (a/b/c) vs nomor (1/2/3)
    const useNumbers = pokjaCode === 'SKP'  // SKP pakai angka

    // Find all EP table zones
    const zones = []
    for (let i = 0; i < lines.length; i++) {
        if (!epTableHeaderRe.test(lines[i])) continue

        let standarKey = null
        for (let j = i - 1; j >= Math.max(0, i - 15); j--) {
            const titleMatch = lines[j].match(epTitleRe)
            if (titleMatch) { standarKey = `${pokjaCode} ${titleMatch[1]}`; break }
            const standarMatch = lines[j].match(standarRe)
            if (standarMatch) { standarKey = `${pokjaCode} ${standarMatch[1]}`; break }
        }
        if (!standarKey) {
            for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
                const titleMatch = lines[j].match(epTitleRe)
                if (titleMatch) { standarKey = `${pokjaCode} ${titleMatch[1]}`; break }
            }
        }
        if (!standarKey) continue

        let tableEnd = lines.length
        for (let j = i + 1; j < lines.length; j++) {
            if (standarRe.test(lines[j]) || maksudRe.test(lines[j])) { tableEnd = j; break }
            if (epTitleRe.test(lines[j]) && j > i + 2) { tableEnd = j; break }
        }
        zones.push({ standarKey, start: i + 1, end: tableEnd })
    }

    // Parse RDOW from each zone
    for (const zone of zones) {
        let currentLetter = null
        let currentBukti = []

        function flush() {
            if (!currentLetter || currentBukti.length === 0) return
            const key = `${zone.standarKey}|EP ${currentLetter}`
            if (!epBukti[key]) epBukti[key] = [...new Set(currentBukti)]
            else epBukti[key] = [...new Set([...epBukti[key], ...currentBukti])]
        }

        for (let i = zone.start; i < zone.end; i++) {
            const line = lines[i]
            if (isNoise(line)) continue

            // EP marker detection
            if (useNumbers) {
                // SKP: standalone number "1", "2", etc — EP marker
                const numMatch = line.match(/^(\d{1,2})$/)
                if (numMatch && NUM_TO_LETTER[numMatch[1]]) {
                    flush()
                    currentLetter = NUM_TO_LETTER[numMatch[1]]
                    currentBukti = []
                    continue
                }
                // Skip skor angka (10, 5, 0) yang bukan EP marker
                if (/^\d+$/.test(line)) continue
            } else {
                // Non-SKP: skip standalone numbers (skor)
                if (/^\d+$/.test(line)) continue
            }

            // Standard: letter EP markers
            const letterMatch = line.match(/^([a-z])\)\s*(.*)/) || line.match(/^([a-z])$/) || line.match(/^([a-z])\s+[A-Z]/)
            if (letterMatch && !useNumbers) {
                flush()
                currentLetter = letterMatch[1]
                currentBukti = []
                continue
            }

            if (!currentLetter) continue

            // RDOW marker: standalone R/D/O/W/S
            if (/^[RDOWS]$/.test(line)) {
                currentBukti.push(line)
                continue
            }
            // RDOW marker: "R Penetapan..." or "D Bukti..."
            if (/^[RDOWS]\s+/.test(line) && line.length > 2) {
                currentBukti.push(line.charAt(0))
                continue
            }
        }
        flush()
    }

    return epBukti
}

async function main() {
    const files = readdirSync(POKJA_DIR).filter(f => f.endsWith('.pdf'))
    const allBukti = {}

    for (const file of files) {
        const pokjaCode = file.replace('.pdf', '')
        process.stdout.write(`${pokjaCode}... `)
        try {
            const text = await extractText(join(POKJA_DIR, file))
            const bukti = extractRDOW(text, pokjaCode)
            Object.assign(allBukti, bukti)
            console.log(`${Object.keys(bukti).length} EP with RDOW`)
        } catch (err) {
            console.error(`ERR: ${err.message}`)
        }
    }

    writeFileSync(join(process.cwd(), 'scripts', 'ep_bukti.json'),
        JSON.stringify(allBukti, null, 2), 'utf-8')

    // Stats per pokja
    console.log('\n--- Per Pokja ---')
    const pokjaCounts = {}
    for (const key of Object.keys(allBukti)) {
        const pokja = key.split(' ')[0]
        pokjaCounts[pokja] = (pokjaCounts[pokja] || 0) + 1
    }
    for (const [code, count] of Object.entries(pokjaCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${code.padEnd(8)} ${String(count).padStart(3)} EP`)
    }
    console.log(`\n✅ Total: ${Object.keys(allBukti).length} EP with RDOW`)
}

main().catch(console.error)
