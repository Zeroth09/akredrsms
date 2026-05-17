// Script V4: Improved EP description extractor — handles table format from PDF
// Menangani format tabel SNARS yang gagal di V3
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
    // Skor baris: hanya angka seperti "10", "5", "0"
    if (/^\d+$/.test(line)) return true
    // Skor dash
    if (line === '-') return true
    return false
}

/**
 * Cek apakah baris ini adalah EP letter marker
 * Return: { letter, inlineDesc } atau null
 */
function matchEPLetter(line) {
    // Pattern 1: "a)" atau "a) Deskripsi..."
    let m = line.match(/^([a-z])\)\s*(.*)/)
    if (m) return { letter: m[1], inlineDesc: m[2].trim() }

    // Pattern 2: huruf tunggal standalone
    if (/^[a-z]$/.test(line)) return { letter: line, inlineDesc: '' }

    // Pattern 3: "a Deskripsi yang dimulai dengan huruf besar..."
    // Tapi bukan kata umum yang dimulai huruf kecil
    m = line.match(/^([a-z])\s+([A-Z].{5,})/)
    if (m) {
        const letter = m[1]
        // Pastikan bukan kata biasa — single letter yang merupakan EP marker
        if (letter.length === 1) {
            return { letter, inlineDesc: m[2].trim() }
        }
    }

    // Pattern 4: "a Deskripsi..." tanpa huruf besar di awal (format tabel PAP)
    m = line.match(/^([a-z])\s+(.{10,})/)
    if (m) {
        const letter = m[1]
        const rest = m[2].trim()
        // Pastikan ini EP marker, bukan kata biasa
        // Cek baris tidak dimulai dengan kata-kata yang bukan EP marker
        if (!rest.match(/^(dan|atau|yang|untuk|dari|pada|oleh|dengan|dalam|tidak|telah|akan|harus|dapat|sesuai|terhadap)/i)) {
            return { letter, inlineDesc: rest }
        }
    }

    return null
}

/**
 * Cek apakah baris ini adalah bukti/evidence marker (R, D, O, W, S)
 */
function isBuktiMarker(line) {
    // Standalone R/D/O/W/S
    if (/^[RDOWS]$/.test(line)) return true
    // "R Penetapan..." atau "D Bukti..."
    if (/^[RDOWS]\s+/.test(line) && line.length > 2) return true
    return false
}

/**
 * Cek apakah baris ini adalah bukti detail/content yang harus di-skip
 */
function isBuktiContent(line) {
    if (/^\d+\.\s*(Bukti|Penetapan|Surat|Panduan|Pedoman|Hasil|Dokumen|Laporan|Daftar|SK |SPK |MOU |Program )/i.test(line)) return true
    if (/^(Bukti|Hasil|Laporan|Daftar|SPK|Surat|SK|MOU|Program|Pedoman|Panduan)\s/i.test(line)) return true
    if (/^-\s*(Staf|Dokter|PPA|Petugas|Pasien|Tim|Kepala|Direktur|Perawat|Dietisien|IPCN)/i.test(line)) return true
    // Baris yang hanya berisi nama jabatan/role
    if (/^(PPA|DPJP|Staf|Perawat|Dokter|Tim|Kepala|Direktur|Petugas|Dietisien|IPCN)/i.test(line) && line.length < 60) return true
    return false
}

function extractPokja(text, pokjaCode) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

    // Pattern untuk header standar — case-insensitive
    const standarRe = new RegExp(`^(?:STANDAR|Standar)\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    // Pattern untuk header tabel EP — lebih fleksibel
    // Menangani: "NO ELEMEN PENILAIAN", "Elemen Penilaian\tKelengkapan", "O ELEMEN PENILAIAN" (TKRS: N di baris sebelumnya)
    const epTableHeaderRe = /^(?:N?\s*O\s+)?(?:ELEMEN PENILAIAN|Elemen Penilaian)\s+(?:KELENGKAPAN|Kelengkapan)/i
    // Pattern untuk judul section "Elemen Penilaian XXX N" (bukan tabel)
    const epTitleRe = new RegExp(`^Elemen Penilaian\\s+${pokjaCode}\\s+(\\d[\\d.]*)`, 'i')
    // Pattern untuk Maksud dan Tujuan
    const maksudRe = new RegExp(`^(?:MAKSUD DAN TUJUAN|Maksud dan Tujuan)\\s+${pokjaCode}`, 'i')

    // ===== STANDAR DESCRIPTIONS =====
    const standarDesc = {}
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(standarRe)
        if (!m) continue
        const key = `${pokjaCode} ${m[1]}`

        // Cari deskripsi di baris sebelumnya (berjalan mundur)
        let candidates = []
        for (let j = i - 1; j >= Math.max(0, i - 12); j--) {
            const line = lines[j]
            if (isNoise(line)) continue
            if (standarRe.test(line) || epTableHeaderRe.test(line) || epTitleRe.test(line) || maksudRe.test(line)) break
            if (/^(Elemen Penilaian\s+Kelengkapan|Skoring)/i.test(line)) break
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
        if (desc.length > 5) standarDesc[key] = desc
    }

    // ===== EP DESCRIPTIONS =====
    const epDesc = {}
    const epBukti = {} // Track RDOW per EP

    // Temukan semua EP table zones
    // Sebuah zone dimulai dari "Elemen Penilaian\tKelengkapan" atau "NO ELEMEN PENILAIAN KELENGKAPAN"
    // dan berakhir saat ketemu section berikutnya (Standar, Maksud, Elemen Penilaian title)

    // Pertama, temukan standar key untuk setiap tabel
    // Caranya: scan mundur dari header tabel ke "Elemen Penilaian XXX N" title atau "Standar XXX N"
    const tableZones = []
    for (let i = 0; i < lines.length; i++) {
        if (!epTableHeaderRe.test(lines[i])) continue

        // Cari standar key: scan mundur untuk "Elemen Penilaian XXX N" atau "Standar XXX N"
        let standarKey = null
        for (let j = i - 1; j >= Math.max(0, i - 15); j--) {
            const titleMatch = lines[j].match(epTitleRe)
            if (titleMatch) {
                standarKey = `${pokjaCode} ${titleMatch[1]}`
                break
            }
            const standarMatch = lines[j].match(standarRe)
            if (standarMatch) {
                standarKey = `${pokjaCode} ${standarMatch[1]}`
                break
            }
        }
        // Jika tidak ketemu mundur, coba maju (kadang title setelah header)
        if (!standarKey) {
            for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
                const titleMatch = lines[j].match(epTitleRe)
                if (titleMatch) {
                    standarKey = `${pokjaCode} ${titleMatch[1]}`
                    break
                }
            }
        }
        if (!standarKey) continue

        // Cari akhir zone
        let tableEnd = lines.length
        for (let j = i + 1; j < lines.length; j++) {
            if (standarRe.test(lines[j]) || maksudRe.test(lines[j])) {
                tableEnd = j
                break
            }
            // Tabel EP berikutnya — tapi pastikan bukan header yang sama
            if (epTitleRe.test(lines[j]) && j > i + 2) {
                tableEnd = j
                break
            }
        }

        tableZones.push({ standarKey, start: i + 1, end: tableEnd })
    }

    // Parse EP items dari setiap zone
    for (const zone of tableZones) {
        let currentLetter = null
        let currentParts = []
        let currentBuktiTypes = []

        function flushEP() {
            if (!currentLetter) return
            const epKey = `${zone.standarKey}|EP ${currentLetter}`
            if (epDesc[epKey]) return // Jangan overwrite

            let desc = currentParts.join(' ')
                .replace(/\t+/g, ' ')
                .replace(/\s{2,}/g, ' ')
                .trim()

            // Bersihkan trailing bukti markers
            desc = desc.replace(/\s+[RDOWS]\s*$/, '')
            desc = desc.replace(/\s+[RDOWS]\s+(Penetapan|Regulasi|Bukti|Kebijakan|Hasil|Dokumen).*$/i, '')

            if (desc.length > 400) desc = desc.substring(0, 400) + '...'
            if (desc.length > 5) {
                epDesc[epKey] = desc
            }
            if (currentBuktiTypes.length > 0) {
                epBukti[epKey] = [...new Set(currentBuktiTypes)]
            }
        }

        for (let i = zone.start; i < zone.end; i++) {
            const line = lines[i]
            if (isNoise(line)) continue

            // Cek apakah ini EP letter baru
            const epMatch = matchEPLetter(line)
            if (epMatch) {
                // Flush EP sebelumnya
                flushEP()
                currentLetter = epMatch.letter
                currentParts = epMatch.inlineDesc ? [epMatch.inlineDesc] : []
                currentBuktiTypes = []
                continue
            }

            if (!currentLetter) continue

            // Cek bukti marker
            if (isBuktiMarker(line)) {
                const buktiType = line.charAt(0)
                currentBuktiTypes.push(buktiType)
                // Jika ada teks setelah R/D/O/W/S, itu bukan deskripsi EP tapi bukti detail
                continue
            }

            // Cek bukti content — skip
            if (isBuktiContent(line)) continue

            // Cek apakah sudah melewati bagian bukti (setelah R/D/O/W/S)
            // Jika sudah ada bukti type, baris berikutnya kemungkinan bukan deskripsi EP lagi
            if (currentBuktiTypes.length > 0) continue

            // Baris deskripsi EP
            currentParts.push(line)

            // Safety: batasi panjang
            if (currentParts.join(' ').length > 400) break
        }
        // Flush EP terakhir
        flushEP()
    }

    // ===== FALLBACK: Scan for EP items outside table zones =====
    // Untuk pokja yang punya format berbeda (EP title section)
    const epTitlePositions = []
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(epTitleRe)
        if (m) epTitlePositions.push({ idx: i, key: `${pokjaCode} ${m[1]}` })
    }

    for (const ep of epTitlePositions) {
        // Scan setelah title untuk EP items
        for (let i = ep.idx + 1; i < Math.min(ep.idx + 80, lines.length); i++) {
            const line = lines[i]
            if (isNoise(line)) continue
            if (standarRe.test(line) || maksudRe.test(line)) break
            if (epTitleRe.test(line) && i !== ep.idx) break

            const epMatch = matchEPLetter(line)
            if (!epMatch) continue

            const epKey = `${ep.key}|EP ${epMatch.letter}`
            if (epDesc[epKey]) continue // Sudah ada dari table parsing

            let parts = epMatch.inlineDesc ? [epMatch.inlineDesc] : []
            let buktiTypes = []

            for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
                const nl = lines[j]
                if (isNoise(nl)) continue
                const nextEP = matchEPLetter(nl)
                if (nextEP) break
                if (standarRe.test(nl) || maksudRe.test(nl) || epTitleRe.test(nl)) break
                if (isBuktiMarker(nl)) {
                    buktiTypes.push(nl.charAt(0))
                    break // Stop collecting desc setelah bukti
                }
                if (isBuktiContent(nl)) break
                parts.push(nl)
                if (parts.join(' ').length > 350) break
            }

            let desc = parts.join(' ').replace(/\t+/g, ' ').replace(/\s{2,}/g, ' ')
            desc = desc.replace(/\s+[RDOWS]\s*$/, '')
            desc = desc.replace(/\s+[RDOWS]\s+(Penetapan|Regulasi|Bukti|Kebijakan|Hasil|Dokumen).*$/i, '')
            desc = desc.trim()
            if (desc.length > 400) desc = desc.substring(0, 400) + '...'
            if (desc.length > 5) epDesc[epKey] = desc
            if (buktiTypes.length > 0) epBukti[epKey] = [...new Set(buktiTypes)]
        }
    }

    return { standarDesc, epDesc, epBukti }
}

async function main() {
    const files = readdirSync(POKJA_DIR).filter(f => f.endsWith('.pdf'))
    const allStandarDesc = {}
    const allEpDesc = {}
    const allEpBukti = {}

    for (const file of files) {
        const pokjaCode = file.replace('.pdf', '')
        process.stdout.write(`${pokjaCode}... `)
        try {
            const text = await extractText(join(POKJA_DIR, file))
            const { standarDesc, epDesc, epBukti } = extractPokja(text, pokjaCode)
            Object.assign(allStandarDesc, standarDesc)
            Object.assign(allEpDesc, epDesc)
            Object.assign(allEpBukti, epBukti)

            const sOk = Object.values(standarDesc).filter(v => v.length > 10).length
            const eTotal = Object.keys(epDesc).length
            const bTotal = Object.keys(epBukti).length
            console.log(`${sOk} standar, ${eTotal} EP desc, ${bTotal} EP bukti`)
        } catch (err) {
            console.error(`ERR: ${err.message}`)
        }
    }

    writeFileSync(join(process.cwd(), 'scripts', 'standar_descriptions.json'),
        JSON.stringify(allStandarDesc, null, 2), 'utf-8')
    writeFileSync(join(process.cwd(), 'scripts', 'ep_descriptions.json'),
        JSON.stringify(allEpDesc, null, 2), 'utf-8')
    writeFileSync(join(process.cwd(), 'scripts', 'ep_bukti.json'),
        JSON.stringify(allEpBukti, null, 2), 'utf-8')

    // Verifikasi
    console.log('\n--- Verifikasi ---')
    console.log('AKP 1|EP a:', allEpDesc['AKP 1|EP a'] ? '✅' : '❌')
    console.log('TKRS 1|EP a:', allEpDesc['TKRS 1|EP a'] ? '✅' : '❌')
    console.log('PAP 1|EP a:', allEpDesc['PAP 1|EP a'] ? '✅' : '❌')
    console.log('SKP 1|EP a:', allEpDesc['SKP 1|EP a'] ? '✅' : '❌')
    console.log('MFK 1|EP a:', allEpDesc['MFK 1|EP a'] ? '✅' : '❌')
    console.log('KPS 1|EP a:', allEpDesc['KPS 1|EP a'] ? '✅' : '❌')

    console.log(`\n✅ Total: ${Object.keys(allStandarDesc).length} standar, ${Object.keys(allEpDesc).length} EP desc, ${Object.keys(allEpBukti).length} EP bukti`)
}

main().catch(console.error)
