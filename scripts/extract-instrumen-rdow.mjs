// Script V6: Extract RDOW + deskripsi dari Instrumen Survei Akreditasi RS
// Sumber paling lengkap — setiap EP langsung diikuti marker R/D/O/W/S
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const PDF_PATH = join(process.cwd(), 'Kepdirjen Nomor 47104 tahun 2024 - Instrument Survei Akreditasi Rumah Sakit.pdf')

const POKJA_CODES = ['TKRS', 'AKP', 'HPK', 'KE', 'KPS', 'MFK', 'PAP', 'PAB', 'PKPO', 'PMKP', 'PP', 'PPI', 'PPK', 'PROGNAS', 'SKP', 'MRMIK']
const POKJA_PATTERN = POKJA_CODES.join('|')
const NUM_TO_LETTER = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f', '7': 'g', '8': 'h', '9': 'i', '10': 'j' }

function normalizePokja(raw) { return raw.toUpperCase() }

// Normalisasi key standar: "SKP.1" → "SKP 1", "Prognas 1" → "PROGNAS 1"
function normalizeStandarKey(pokja, num) {
    return `${normalizePokja(pokja)} ${num.replace('.', ' ').replace(/\s+/g, '.')}`
}

function isNoise(line) {
    if (/^--\s*\d+\s+of\s+\d+\s*--$/.test(line)) return true
    if (/^-\s*\d+\s*-$/.test(line)) return true
    return false
}

async function main() {
    console.log('📄 Parsing Instrumen Survei PDF...')
    const buffer = readFileSync(PDF_PATH)
    const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    const parser = new PDFParse(uint8)
    await parser.load()
    const result = await parser.getText()
    const rawLines = result.text.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !isNoise(l))
    console.log(`Total lines (cleaned): ${rawLines.length}`)

    // === Patterns ===
    // "Elemen Penilaian Kelengkapan Bukti Skoring" — table header
    const tableHeaderRe = /^Elemen Penilaian\s+Kelengkapan\s+Bukti\s+Skoring/i
    // Match: "3) Elemen Penilaian TKRS 1", "c. Elemen Penilaian SKP.1", "c) Elemen Penilaian PKPO 1"
    const epSectionRe = new RegExp(`^(?:\\d+\\)|[a-z][.)\\s])?\\s*Elemen Penilaian\\s+(?:Standar\\s+)?(${POKJA_PATTERN})[.\\s]+(\\d[\\d.]*)`, 'i')
    // EP item: "a) Deskripsi..." (huruf) atau "1) Deskripsi..." (angka, SKP/PROGNAS)
    const epLetterRe = /^([a-z])\)\s+(.*)/
    const epNumberRe = /^(\d{1,2})\)\s+(.*)/
    // RDOW marker: "R Penetapan..." atau "D Bukti..."
    const rdowMarkerRe = /^([RDOWS])\s+(.+)/
    const rdowStandaloneRe = /^[RDOWS]$/
    // Score lines (10, 5, 0, -)
    const scoreRe = /^(\d{1,2}|-)$/

    // === Find EP sections ===
    const epSections = []
    for (let i = 0; i < rawLines.length; i++) {
        const m = rawLines[i].match(epSectionRe)
        if (m) {
            const pokja = normalizePokja(m[1])
            const num = m[2]
            // Normalize: "SKP.1" → "SKP 1"
            const key = `${pokja} ${num}`
            epSections.push({ idx: i, pokja, key })
        }
    }
    console.log(`Found ${epSections.length} EP sections`)

    // === Parse each section ===
    const epDesc = {}
    const epBukti = {}

    for (let s = 0; s < epSections.length; s++) {
        const section = epSections[s]
        const nextIdx = s + 1 < epSections.length ? epSections[s + 1].idx : rawLines.length

        // Skip to table header
        let tableStart = section.idx + 1
        for (let i = section.idx + 1; i < Math.min(section.idx + 3, nextIdx); i++) {
            if (tableHeaderRe.test(rawLines[i])) { tableStart = i + 1; break }
        }

        // Detect format: huruf atau angka
        const usesNumbers = section.pokja === 'SKP' || section.pokja === 'PROGNAS'

        let currentLetter = null
        let currentDescParts = []
        let currentBuktiTypes = []
        let inBuktiZone = false  // Setelah RDOW marker, baris selanjutnya adalah detail bukti, bukan deskripsi

        function flush() {
            if (!currentLetter) return
            const epKey = `${section.key}|EP ${currentLetter}`

            // Save deskripsi
            if (currentDescParts.length > 0 && !epDesc[epKey]) {
                let desc = currentDescParts.join(' ')
                    .replace(/\t+/g, ' ')
                    .replace(/\s{2,}/g, ' ')
                    .trim()
                if (desc.length > 500) desc = desc.substring(0, 500) + '...'
                if (desc.length > 5) epDesc[epKey] = desc
            }

            // Save bukti
            if (currentBuktiTypes.length > 0) {
                epBukti[epKey] = [...new Set(currentBuktiTypes)]
            }
        }

        for (let i = tableStart; i < nextIdx; i++) {
            const line = rawLines[i]

            // Skip score lines
            if (scoreRe.test(line)) continue

            // Check EP marker (letter or number)
            let epMatch = null
            if (usesNumbers) {
                const nm = line.match(epNumberRe)
                if (nm) {
                    epMatch = { letter: NUM_TO_LETTER[nm[1]] || nm[1], desc: nm[2].trim() }
                }
            } else {
                const lm = line.match(epLetterRe)
                if (lm) {
                    epMatch = { letter: lm[1], desc: lm[2].trim() }
                }
            }

            if (epMatch) {
                flush()
                currentLetter = epMatch.letter
                currentDescParts = epMatch.desc ? [epMatch.desc] : []
                currentBuktiTypes = []
                inBuktiZone = false
                continue
            }

            if (!currentLetter) continue

            // RDOW marker: "R Penetapan..." or standalone "R"
            const rdowMatch = line.match(rdowMarkerRe)
            if (rdowMatch) {
                currentBuktiTypes.push(rdowMatch[1])
                inBuktiZone = true
                continue
            }
            if (rdowStandaloneRe.test(line)) {
                currentBuktiTypes.push(line)
                inBuktiZone = true
                continue
            }

            // Jika belum masuk bukti zone, ini adalah kelanjutan deskripsi EP
            if (!inBuktiZone) {
                currentDescParts.push(line)
            }
            // Jika sudah di bukti zone, skip (detail bukti, bukan deskripsi)
        }
        flush()
    }

    // === Load existing data dan merge ===
    // Prioritaskan data baru dari Instrumen Survei, tapi jangan overwrite data KEPMENKES yang sudah ada
    let existingDesc = {}
    let existingBukti = {}
    try {
        existingDesc = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'ep_descriptions.json'), 'utf-8'))
    } catch {}
    try {
        existingBukti = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'ep_bukti.json'), 'utf-8'))
    } catch {}

    // Merge: Instrumen Survei RDOW menggantikan data lama (lebih lengkap)
    const mergedBukti = { ...existingBukti, ...epBukti }
    // Deskripsi: prioritaskan KEPMENKES (v5) yang sudah ada, isi yang kosong dari Instrumen
    const mergedDesc = { ...existingDesc }
    let newDescCount = 0
    for (const [key, val] of Object.entries(epDesc)) {
        if (!mergedDesc[key] || mergedDesc[key].length < 10) {
            mergedDesc[key] = val
            newDescCount++
        }
    }

    // === Save ===
    writeFileSync(join(process.cwd(), 'scripts', 'ep_descriptions.json'),
        JSON.stringify(mergedDesc, null, 2), 'utf-8')
    writeFileSync(join(process.cwd(), 'scripts', 'ep_bukti.json'),
        JSON.stringify(mergedBukti, null, 2), 'utf-8')

    // === Stats ===
    console.log(`\n--- Instrumen Survei Results ---`)
    console.log(`EP descriptions extracted: ${Object.keys(epDesc).length}`)
    console.log(`EP RDOW extracted: ${Object.keys(epBukti).length}`)
    console.log(`New descriptions (filled gaps): ${newDescCount}`)

    console.log(`\n--- Merged Totals ---`)
    console.log(`Total EP descriptions: ${Object.keys(mergedDesc).length}`)
    console.log(`Total EP RDOW: ${Object.keys(mergedBukti).length}`)

    // Per pokja RDOW stats
    console.log('\n--- RDOW Per Pokja ---')
    const pokjaCounts = {}
    for (const key of Object.keys(mergedBukti)) {
        const pokja = key.split(' ')[0]
        pokjaCounts[pokja] = (pokjaCounts[pokja] || 0) + 1
    }
    for (const [code, count] of Object.entries(pokjaCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${code.padEnd(8)} ${String(count).padStart(3)} EP`)
    }

    // Verification
    console.log('\n--- Verifikasi RDOW ---')
    const checks = [
        'TKRS 1|EP a', 'TKRS 2|EP a',
        'AKP 1|EP a', 'AKP 1.1|EP a',
        'PKPO 1|EP a', 'PKPO 2|EP a',
        'SKP 1|EP a', 'SKP 2|EP a',
        'PROGNAS 1|EP a', 'PROGNAS 2|EP a',
        'MFK 1|EP a', 'KPS 1|EP a',
        'PAP 1|EP a', 'HPK 1|EP a',
    ]
    for (const c of checks) {
        const b = mergedBukti[c]
        console.log(`  ${c}: ${b ? '✅ [' + b.join(',') + ']' : '❌'}`)
    }
}

main().catch(console.error)
