// Script V5: Extract EP descriptions dari KEPMENKES PDF (sumber tunggal, format konsisten)
// Menangani semua pokja termasuk SKP (EP nomor) dan PROGNAS (mixed case)
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const PDF_PATH = join(process.cwd(), 'KEPMENKES Nomor 1596 tahun 2024 - Standar Akreditasi Rumah Sakit (1).pdf')

const POKJA_CODES = ['TKRS', 'AKP', 'HPK', 'KE', 'KPS', 'MFK', 'PAP', 'PAB', 'PKPO', 'PMKP', 'PP', 'PPI', 'PPK', 'PROGNAS', 'SKP', 'MRMIK']
// Case-insensitive pokja pattern (termasuk Prognas, prognas, PROGNAS)
const POKJA_PATTERN = POKJA_CODES.join('|')

// Mapping nomor → huruf untuk EP yang pakai angka (SKP, PROGNAS)
const NUM_TO_LETTER = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f', '7': 'g', '8': 'h', '9': 'i', '10': 'j' }

// Normalisasi pokja code ke uppercase standar
function normalizePokja(raw) {
    return raw.toUpperCase()
}

function isNoise(line) {
    if (/^--\s*\d+\s+of\s+\d+\s*--$/.test(line)) return true
    if (/^-\s*\d+\s*-$/.test(line)) return true
    return false
}

async function main() {
    console.log('📄 Parsing KEPMENKES PDF...')
    const buffer = readFileSync(PDF_PATH)
    const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    const parser = new PDFParse(uint8)
    await parser.load()
    const result = await parser.getText()
    const rawLines = result.text.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !isNoise(l))
    console.log(`Total lines (cleaned): ${rawLines.length}`)

    // === Pattern definitions ===
    // Match: "3) Elemen Penilaian TKRS 1" atau "c. Elemen Penilaian SKP 1" atau "f. Elemen Penilaian Standar Prognas 1.1"
    const epSectionRe = new RegExp(`^(?:\\d+\\)|[a-z]\\.)?\\s*Elemen [Pp]enilaian\\s+(?:Standar\\s+)?(${POKJA_PATTERN})\\s+(\\d[\\d.]*)`, 'i')
    // Match: "1) Standar TKRS 1" atau "a. Standar SKP 1"  
    const standarRe = new RegExp(`^(?:\\d+\\)|[a-z]\\.)?\\s*Standar\\s+(${POKJA_PATTERN})\\s+(\\d[\\d.]*)`, 'i')
    const maksudRe = new RegExp(`^(?:\\d+\\)|[a-z]\\.)?\\s*Maksud dan Tujuan\\s+(${POKJA_PATTERN})`, 'i')
    
    // EP items: "a) Deskripsi..." (huruf) atau "1) Deskripsi..." (nomor, untuk SKP/PROGNAS)
    const epLetterRe = /^([a-z])\)\s+(.*)/
    const epNumberRe = /^(\d{1,2})\)\s+(.*)/

    // Section breaks
    const sectionBreakRe = new RegExp(
        `^(?:(?:\\d+\\)|[a-z]\\.)?\\s*(?:Standar|Elemen [Pp]enilaian|Maksud dan Tujuan)\\s+(?:Standar\\s+)?(?:${POKJA_PATTERN}))` +
        `|^[a-l]\\.\\s+[A-Z]` +
        `|^Gambaran Umum` +
        `|^\\d+\\.\\s+[A-Z]`,  // numbered section headers like "2. Meningkatkan Komunikasi"
        'i'
    )

    // === Find all EP sections ===
    const epSections = []
    for (let i = 0; i < rawLines.length; i++) {
        const m = rawLines[i].match(epSectionRe)
        if (m) {
            const pokja = normalizePokja(m[1])
            epSections.push({
                idx: i,
                pokja,
                standarNum: m[2],
                key: `${pokja} ${m[2]}`
            })
        }
    }
    console.log(`Found ${epSections.length} EP sections`)

    // === Find all Standar sections for description extraction ===
    const standarSections = []
    for (let i = 0; i < rawLines.length; i++) {
        const m = rawLines[i].match(standarRe)
        if (m) {
            const pokja = normalizePokja(m[1])
            standarSections.push({
                idx: i,
                key: `${pokja} ${m[2]}`
            })
        }
    }

    // === Extract Standar descriptions ===
    const standarDesc = {}
    for (const sec of standarSections) {
        let parts = []
        for (let j = sec.idx + 1; j < Math.min(sec.idx + 12, rawLines.length); j++) {
            const line = rawLines[j]
            if (maksudRe.test(line) || standarRe.test(line) || epSectionRe.test(line)) break
            if (/^(?:\d+\)|[a-z]\.)\s+/.test(line)) break
            parts.push(line)
        }
        let desc = parts.join(' ').replace(/\t+/g, ' ').replace(/\s{2,}/g, ' ').trim()
        if (desc.length > 500) desc = desc.substring(0, 500) + '...'
        if (desc.length > 10 && !standarDesc[sec.key]) standarDesc[sec.key] = desc
    }

    // === Extract EP descriptions ===
    const epDesc = {}

    for (let s = 0; s < epSections.length; s++) {
        const section = epSections[s]
        const nextSectionIdx = s + 1 < epSections.length ? epSections[s + 1].idx : rawLines.length

        // Deteksi format EP: huruf (a,b,c) atau nomor (1,2,3)
        // Peek ahead to check which format
        let useNumberFormat = false
        for (let peek = section.idx + 1; peek < Math.min(section.idx + 5, nextSectionIdx); peek++) {
            if (epNumberRe.test(rawLines[peek]) && !epLetterRe.test(rawLines[peek])) {
                useNumberFormat = true
                break
            }
            if (epLetterRe.test(rawLines[peek])) break
        }

        let currentLetter = null
        let currentParts = []

        function flushEP() {
            if (!currentLetter) return
            const epKey = `${section.key}|EP ${currentLetter}`

            let desc = currentParts.join(' ')
                .replace(/\t+/g, ' ')
                .replace(/\s{2,}/g, ' ')
                .trim()

            if (desc.length > 500) desc = desc.substring(0, 500) + '...'
            if (desc.length > 5 && !epDesc[epKey]) {
                epDesc[epKey] = desc
            }
        }

        for (let i = section.idx + 1; i < nextSectionIdx; i++) {
            const line = rawLines[i]

            // Stop jika ketemu section break
            if (sectionBreakRe.test(line)) break

            if (useNumberFormat) {
                // SKP/PROGNAS: EP pakai nomor "1) Deskripsi..."
                const numMatch = line.match(epNumberRe)
                if (numMatch) {
                    flushEP()
                    currentLetter = NUM_TO_LETTER[numMatch[1]] || numMatch[1]
                    currentParts = numMatch[2].trim() ? [numMatch[2].trim()] : []
                    continue
                }
            } else {
                // Standard: EP pakai huruf "a) Deskripsi..."
                const epMatch = line.match(epLetterRe)
                if (epMatch) {
                    flushEP()
                    currentLetter = epMatch[1]
                    currentParts = epMatch[2].trim() ? [epMatch[2].trim()] : []
                    continue
                }
            }

            // Continuation line
            if (currentLetter && !line.match(/^[a-l]\.\s+[A-Z]/) && !line.match(/^\d+\.\s+[A-Z]/)) {
                currentParts.push(line)
            }
        }
        flushEP()
    }

    // === Merge with V4 bukti data if available ===
    let epBuktiRaw = {}
    try {
        epBuktiRaw = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'ep_bukti.json'), 'utf-8'))
        console.log(`Loaded ${Object.keys(epBuktiRaw).length} EP bukti from V4`)
    } catch { /* skip */ }

    // === Save results ===
    writeFileSync(join(process.cwd(), 'scripts', 'standar_descriptions.json'),
        JSON.stringify(standarDesc, null, 2), 'utf-8')
    writeFileSync(join(process.cwd(), 'scripts', 'ep_descriptions.json'),
        JSON.stringify(epDesc, null, 2), 'utf-8')

    // === Statistics per pokja ===
    console.log('\n--- Per Pokja ---')
    const pokjaCounts = {}
    for (const key of Object.keys(epDesc)) {
        const pokja = key.split(' ')[0]
        pokjaCounts[pokja] = (pokjaCounts[pokja] || 0) + 1
    }
    const totalEP = Object.keys(epDesc).length
    for (const [code, count] of Object.entries(pokjaCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${code.padEnd(8)} ${String(count).padStart(3)} EP`)
    }

    // === Verifikasi ===
    console.log('\n--- Verifikasi ---')
    const checks = [
        'TKRS 1|EP a', 'TKRS 2|EP a', 'TKRS 13|EP a',
        'AKP 1|EP a', 'AKP 5|EP a',
        'PAP 1|EP a', 'PAP 2|EP a',
        'SKP 1|EP a', 'SKP 2|EP a', 'SKP 5|EP a',
        'MFK 1|EP a', 'MFK 8|EP a',
        'KPS 1|EP a', 'KPS 5|EP a',
        'HPK 1|EP a',
        'PPI 1|EP a',
        'PMKP 1|EP a',
        'PROGNAS 1|EP a', 'PROGNAS 2|EP a',
        'MRMIK 5|EP a',
        'PP 1|EP a',
        'PPK 1|EP a',
        'KE 1|EP a',
    ]
    for (const c of checks) {
        console.log(`  ${c}: ${epDesc[c] ? '✅' : '❌'}`)
    }

    console.log(`\n✅ Total: ${Object.keys(standarDesc).length} standar, ${totalEP} EP descriptions`)
}

main().catch(console.error)
