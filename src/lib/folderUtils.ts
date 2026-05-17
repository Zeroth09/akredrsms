// Client-side utility functions for folder hierarchy analysis

import { countFilesRecursiveUnderFolder, isEPFolderName } from '@/lib/standarEpHierarchy'

export interface Doc {
    id: string
    gdrive_id: string
    name: string
    status: string
    category_id: string | null
    last_synced_at: string
    web_view_link: string | null
    categories: { name: string } | null
    parent_id: string | null
    mime_type: string
    document_type: string | null
}

// Get folder depth from root
export function getFolderDepth(folder: Doc, allDocs: Doc[], depth = 1): number {
    if (!folder.parent_id) return depth

    const parent = allDocs.find((d) => d.gdrive_id === folder.parent_id)
    if (!parent) return depth

    return getFolderDepth(parent, allDocs, depth + 1)
}

// Check if folder is an EP (Elemen Penilaian) folder
export function isEPFolder(folder: Doc, _allDocs: Doc[]): boolean {
    return folder.mime_type === 'application/vnd.google-apps.folder' && isEPFolderName(folder.name)
}

// Find Pokja parent of a document
export function findPokjaParent(doc: Doc, allDocs: Doc[]): Doc | null {
    // Pokja adalah level 3 dari root
    // Root (1) -> Dokumen Akreditasi (2) -> Kelompok (3) -> Pokja
    let current = doc
    let depth = getFolderDepth(doc, allDocs)

    while (depth > 3 && current.parent_id) {
        const parent = allDocs.find((d) => d.gdrive_id === current.parent_id)
        if (!parent) break
        current = parent
        depth--
    }

    return depth === 3 ? current : null
}

// Compute status for all EP folders
export function computeEPStatus(documents: Doc[]) {
    const statusMap = new Map<string, {
        isEmpty: boolean
        fileCount: number
        hasUnverified: boolean
    }>()

    documents.forEach(doc => {
        if (doc.mime_type !== 'application/vnd.google-apps.folder') return

        if (isEPFolder(doc, documents)) {
            const fileCount = countFilesRecursiveUnderFolder(doc.gdrive_id, documents)

            statusMap.set(doc.gdrive_id, {
                isEmpty: fileCount === 0,
                fileCount,
                hasUnverified: fileCount > 0 && doc.status === 'Pending'
            })
        }
    })

    return statusMap
}
