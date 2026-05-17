// Pokja utilities and data structures

import { countFilesRecursiveUnderFolder, isEPFolderName } from '@/lib/standarEpHierarchy'

export interface Pokja {
    code: string
    name: string
    color: string
    keywords: string[] // Keywords to match folder names
}

export const POKJA_LIST: Pokja[] = [
    {
        code: 'KPS',
        name: 'Kelompok Pelayanan Berfokus Pasien',
        color: 'blue',
        keywords: ['KPS']  // Exact match
    },
    {
        code: 'MFK',
        name: 'Manajemen Fasilitas dan Keselamatan',
        color: 'green',
        keywords: ['MFK']  // Exact match
    },
    {
        code: 'MRMIK',
        name: 'Manajemen Rekam Medis dan Informasi Kesehatan',
        color: 'purple',
        keywords: ['MRMIK']  // Exact match
    },
    {
        code: 'PMKP',
        name: 'Peningkatan Mutu dan Keselamatan Pasien',
        color: 'orange',
        keywords: ['PMKP']  // Exact match
    },
    {
        code: 'PPI',
        name: 'Pencegahan dan Pengendalian Infeksi',
        color: 'red',
        keywords: ['PPI']  // Exact match
    },
    {
        code: 'PPK',
        name: 'Pelayanan Pasien Klinis',
        color: 'indigo',
        keywords: ['PPK']  // Exact match
    },
    {
        code: 'TKRS',
        name: 'Tata Kelola Rumah Sakit',
        color: 'pink',
        keywords: ['TKRS']  // Only exact match to avoid matching parent folder
    },
    {
        code: 'AKP',
        name: 'Akses dan Kontinuitas Pelayanan',
        color: 'cyan',
        keywords: ['AKP']  // Exact match
    },
    {
        code: 'HPK',
        name: 'Hak Pasien dan Keluarga',
        color: 'teal',
        keywords: ['HPK']  // Exact match
    },
    {
        code: 'KE',
        name: 'Kompetensi dan Kewenangan',
        color: 'lime',
        keywords: []  // No keywords - only exact match to avoid matching "KELOMPOK", "KESELAMATAN", etc
    },
    {
        code: 'PAB',
        name: 'Pelayanan Anestesi dan Bedah',
        color: 'amber',
        keywords: ['PAB']  // Exact match
    },
    {
        code: 'PAP',
        name: 'Pelayanan Anak dan Pasien',
        color: 'rose',
        keywords: ['PAP']  // Exact match - this should work!
    },
    {
        code: 'PKPO',
        name: 'Pelayanan Kefarmasian dan Penggunaan Obat',
        color: 'violet',
        keywords: ['PKPO']  // Exact match
    },
    {
        code: 'PP',
        name: 'Pelayanan Pasien',
        color: 'fuchsia',
        keywords: ['PP']  // Exact match (might conflict with PPK, PPI, etc - need special handling)
    },
    {
        code: 'SKP',
        name: 'Sasaran Keselamatan Pasien',
        color: 'emerald',
        keywords: ['SKP', 'KELOMPOK SASARAN KESELAMATAN PASIEN', 'SASARAN KESELAMATAN']
    },
    {
        code: 'PROGNAS',
        name: 'Program Nasional',
        color: 'slate',
        keywords: ['PROGRAM NASIONAL', 'PROGNAS']
    }
]

export interface Doc {
    id: string
    gdrive_id: string
    name: string
    status: string
    category_id: string | null
    last_synced_at: string
    created_at: string
    web_view_link: string | null
    categories: { name: string } | null
    parent_id: string | null
    mime_type: string
    document_type: string | null
    standar: string | null
    ep: string | null
}

export interface PokjaStats {
    totalEP: number
    kosong: number
    terisi: number
    percentage: number
}

function escapeRegex(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** "TKRS 1", "PKPO 3" adalah folder standar bermomor (bukan root pokja). */
function isStandarNumberedFolderName(name: string, pokjaCode: string): boolean {
    const code = pokjaCode.trim()
    if (!code) return false
    return new RegExp(`^${escapeRegex(code)}\\s+\\d`, 'i').test(name.trim())
}

/**
 * Folder ROOT pokja di Drive: nama "TKRS" atau frasa keywords,
 * tetapi bukan folder standar bernomor seperti "TKRS 14" atau "PKPO 2".
 */
export function matchesPokjaRootFolder(doc: Doc, pokja: Pokja): boolean {
    if (doc.mime_type !== 'application/vnd.google-apps.folder') return false
    const raw = doc.name.trim()
    if (isStandarNumberedFolderName(raw, pokja.code)) return false

    const folderName = raw.toUpperCase()
    const code = pokja.code.toUpperCase()

    if (folderName === code) return true

    if (folderName.startsWith(code + ' ') || folderName.startsWith(code + '.')) {
        return true
    }

    for (const keyword of pokja.keywords) {
        if (!keyword.trim()) continue
        if (folderName.includes(keyword.toUpperCase())) return true
    }
    return false
}

/** Hapus duplikat berdasarkan gdrive_id (urutan array tetap seperti input). */
function dedupeByGdriveId(docs: Doc[]): Doc[] {
    const seen = new Set<string>()
    return docs.filter((d) => {
        if (seen.has(d.gdrive_id)) return false
        seen.add(d.gdrive_id)
        return true
    })
}

/** Cari satu folder pokja; nama persis sama kode diprioritaskan (misal "TKRS" sebelum nama ambigu). */
export function findPokjaRootFolder(allDocs: Doc[], pokja: Pokja): Doc | undefined {
    const candidates = allDocs.filter((d) => matchesPokjaRootFolder(d, pokja))
    if (candidates.length === 0) return undefined

    const codeUpper = pokja.code.toUpperCase()
    const exact = candidates.find((d) => d.name.toUpperCase().trim() === codeUpper)
    if (exact) return exact

    const sorted = [...candidates].sort((a, b) => {
        const byName = a.name.localeCompare(b.name, 'id', { sensitivity: 'base', numeric: true })
        if (byName !== 0) return byName
        return a.gdrive_id.localeCompare(b.gdrive_id)
    })
    return sorted[0]
}

// Find which Pokja a document belongs to
export function findDocumentPokja(doc: Doc, allDocs: Doc[]): Pokja | null {
    // Traverse up the tree to find a Pokja folder
    let current = doc
    let depth = 0
    const maxDepth = 10 // Prevent infinite loops

    while (current.parent_id && depth < maxDepth) {
        const parent = allDocs.find(d => d.gdrive_id === current.parent_id)
        if (!parent) break

        // Check if this parent is a Pokja folder
        const folderName = parent.name.toUpperCase().trim()

        // Try exact match first
        for (const pokja of POKJA_LIST) {
            // Check if folder name IS the code (exact match)
            if (folderName === pokja.code) {
                return pokja
            }

            // Check if folder name STARTS with the code (e.g., "PAP 1" starts with "PAP")
            if (folderName.startsWith(pokja.code + ' ') || folderName.startsWith(pokja.code + '.')) {
                return pokja
            }

            // Check keywords (only if keywords array is not empty)
            if (pokja.keywords.length > 0) {
                for (const keyword of pokja.keywords) {
                    if (folderName.includes(keyword.toUpperCase())) {
                        return pokja
                    }
                }
            }
        }

        // Move up to parent
        current = parent
        depth++
    }

    return null
}

// Find which Standar a document belongs to (parent langsung dari folder EP; termasuk file di subfolder)
export function findDocumentStandar(doc: Doc, allDocs: Doc[]): Doc | null {
    const ep = findDocumentEP(doc, allDocs)
    if (ep?.parent_id) {
        const standar = allDocs.find((d) => d.gdrive_id === ep.parent_id)
        if (standar) return standar
    }

    let current = doc
    let depth = 0
    const maxDepth = 10

    while (current.parent_id && depth < maxDepth) {
        const parent = allDocs.find((d) => d.gdrive_id === current.parent_id)
        if (!parent) break

        const children = allDocs.filter((d) => d.parent_id === parent.gdrive_id)
        const hasEPChildren = children.some((c) => isEPFolderName(c.name))

        if (hasEPChildren) {
            return parent
        }

        current = parent
        depth++
    }
    return null
}

// Find which EP a document belongs to (folder EP di rantai parent, termasuk file di subfolder)
export function findDocumentEP(doc: Doc, allDocs: Doc[]): Doc | null {
    let parentId = doc.parent_id
    let depth = 0
    while (parentId && depth < 40) {
        const parent = allDocs.find((d) => d.gdrive_id === parentId)
        if (!parent) break
        if (parent.mime_type === 'application/vnd.google-apps.folder' && isEPFolderName(parent.name)) {
            return parent
        }
        parentId = parent.parent_id
        depth++
    }
    return null
}

// Check if a folder is an EP folder (Elemen Penilaian)
// Matches: "EP 1", "EP a", "EP 1.1", "EP a.1", etc
export function isEPFolder(doc: Doc, _allDocs: Doc[]): boolean {
    return doc.mime_type === 'application/vnd.google-apps.folder' && isEPFolderName(doc.name)
}

// Check if folder is Standar
export function isStandarFolder(folder: Doc, allDocs: Doc[]): boolean {
    // Standar is level 4
    let depth = 1
    let current = folder
    while (current.parent_id && depth < 10) {
        const parent = allDocs.find(d => d.gdrive_id === current.parent_id)
        if (!parent) break
        current = parent
        depth++
    }

    return depth === 4
}

/** Semua folder EP di dalam subtree pokja (rekursif). Sama seperti statistik modal dashboard2. */
export function collectEPFoldersUnderPokjaSubtree(parentId: string, allDocs: Doc[]): Doc[] {
    const children = allDocs.filter((d) => d.parent_id === parentId)
    let epFolders: Doc[] = []

    children.forEach((child) => {
        if (child.mime_type !== 'application/vnd.google-apps.folder') return

        if (isEPFolder(child, allDocs)) {
            epFolders.push(child)
        } else {
            epFolders = epFolders.concat(collectEPFoldersUnderPokjaSubtree(child.gdrive_id, allDocs))
        }
    })

    return dedupeByGdriveId(epFolders)
}

export interface EpExportRow {
    pokjaCode: string
    epFolder: Doc
    standarName: string
    epName: string
    fileCount: number
    terisi: boolean
}

/** Baris per EP untuk export Excel — urutan Pokja sama POKJA_LIST, struktur pohon sama dashboard2. */
export function enumerateEPRowsForExport(allDocs: Doc[]): EpExportRow[] {
    const rows: EpExportRow[] = []

    for (const pokja of POKJA_LIST) {
        const pokjaFolder = findPokjaRootFolder(allDocs, pokja)
        if (!pokjaFolder) continue

        const epFolders = collectEPFoldersUnderPokjaSubtree(pokjaFolder.gdrive_id, allDocs)

        for (const ep of epFolders) {
            const standarName =
                ep.standar ??
                (ep.parent_id
                    ? allDocs.find((d) => d.gdrive_id === ep.parent_id)?.name ?? ''
                    : '')

            const fileCount = countFilesRecursiveUnderFolder(ep.gdrive_id, allDocs)
            rows.push({
                pokjaCode: pokja.code,
                epFolder: ep,
                standarName,
                epName: ep.ep ?? ep.name,
                fileCount,
                terisi: fileCount > 0,
            })
        }
    }

    rows.sort((a, b) => {
        if (a.pokjaCode !== b.pokjaCode) return a.pokjaCode.localeCompare(b.pokjaCode)
        if (a.standarName !== b.standarName) {
            return a.standarName.localeCompare(b.standarName, 'id', { numeric: true })
        }
        return a.epName.localeCompare(b.epName, 'id', { numeric: true })
    })

    return rows
}

/** Akumulasi angka seperti footer FILE SISTEM / ringkasan dashboard (semua pokja). */
export function aggregateDashboardEPStats(allDocs: Doc[]): {
    total: number
    terisi: number
    kosong: number
    percentage: number
} {
    let total = 0
    let terisi = 0
    let kosong = 0

    for (const pokja of POKJA_LIST) {
        const s = calculatePokjaStats(pokja, allDocs)
        total += s.totalEP
        terisi += s.terisi
        kosong += s.kosong
    }

    const percentage = total > 0 ? Math.round((terisi / total) * 100) : 0
    return { total, terisi, kosong, percentage }
}

// Calculate statistics for a Pokja
export function calculatePokjaStats(pokja: Pokja, allDocs: Doc[]): PokjaStats {
    const pokjaFolder = findPokjaRootFolder(allDocs, pokja)

    if (!pokjaFolder) {
        if (pokja.code === 'TKRS') {
            console.log('[TKRS] Pokja folder not found')
        }
        return { totalEP: 0, kosong: 0, terisi: 0, percentage: 0 }
    }

    if (pokja.code === 'TKRS') {
        console.log(`[TKRS] Found Pokja folder: "${pokjaFolder.name}" (${pokjaFolder.gdrive_id})`)
    }

    const epFolders = collectEPFoldersUnderPokjaSubtree(pokjaFolder.gdrive_id, allDocs)

    let kosong = 0
    let terisi = 0

    epFolders.forEach((ep) => {
        const n = countFilesRecursiveUnderFolder(ep.gdrive_id, allDocs)
        if (n === 0) {
            kosong++
        } else {
            terisi++
        }
    })

    const totalEP = epFolders.length
    const percentage = totalEP > 0 ? Math.round((terisi / totalEP) * 100) : 0

    return { totalEP, kosong, terisi, percentage }
}

// Get color classes for Tailwind
export function getColorClasses(color: string) {
    const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
        blue: {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            gradient: 'from-blue-500 to-blue-600'
        },
        green: {
            bg: 'bg-green-50',
            text: 'text-green-700',
            border: 'border-green-200',
            gradient: 'from-green-500 to-green-600'
        },
        purple: {
            bg: 'bg-purple-50',
            text: 'text-purple-700',
            border: 'border-purple-200',
            gradient: 'from-purple-500 to-purple-600'
        },
        orange: {
            bg: 'bg-orange-50',
            text: 'text-orange-700',
            border: 'border-orange-200',
            gradient: 'from-orange-500 to-orange-600'
        },
        red: {
            bg: 'bg-red-50',
            text: 'text-red-700',
            border: 'border-red-200',
            gradient: 'from-red-500 to-red-600'
        },
        indigo: {
            bg: 'bg-indigo-50',
            text: 'text-indigo-700',
            border: 'border-indigo-200',
            gradient: 'from-indigo-500 to-indigo-600'
        },
        pink: {
            bg: 'bg-pink-50',
            text: 'text-pink-700',
            border: 'border-pink-200',
            gradient: 'from-pink-500 to-pink-600'
        },
        cyan: {
            bg: 'bg-cyan-50',
            text: 'text-cyan-700',
            border: 'border-cyan-200',
            gradient: 'from-cyan-500 to-cyan-600'
        },
        teal: {
            bg: 'bg-teal-50',
            text: 'text-teal-700',
            border: 'border-teal-200',
            gradient: 'from-teal-500 to-teal-600'
        },
        lime: {
            bg: 'bg-lime-50',
            text: 'text-lime-700',
            border: 'border-lime-200',
            gradient: 'from-lime-500 to-lime-600'
        },
        amber: {
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            border: 'border-amber-200',
            gradient: 'from-amber-500 to-amber-600'
        },
        rose: {
            bg: 'bg-rose-50',
            text: 'text-rose-700',
            border: 'border-rose-200',
            gradient: 'from-rose-500 to-rose-600'
        },
        violet: {
            bg: 'bg-violet-50',
            text: 'text-violet-700',
            border: 'border-violet-200',
            gradient: 'from-violet-500 to-violet-600'
        },
        fuchsia: {
            bg: 'bg-fuchsia-50',
            text: 'text-fuchsia-700',
            border: 'border-fuchsia-200',
            gradient: 'from-fuchsia-500 to-fuchsia-600'
        },
        emerald: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            border: 'border-emerald-200',
            gradient: 'from-emerald-500 to-emerald-600'
        },
        slate: {
            bg: 'bg-slate-50',
            text: 'text-slate-700',
            border: 'border-slate-200',
            gradient: 'from-slate-500 to-slate-600'
        }
    }

    return colorMap[color] || colorMap.blue
}
