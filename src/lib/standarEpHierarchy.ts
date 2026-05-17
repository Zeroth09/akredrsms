/**
 * Standar & EP dari hierarki folder Drive: … → Pokja → Standar → EP → (subfolder*) → file
 * Folder EP: "EP a", "EP 1", "EP 1.1", dll.
 */
export const EP_FOLDER_NAME_REGEX = /^EP\s*[a-z0-9.]+/i

export function isEPFolderName(name: string): boolean {
    return EP_FOLDER_NAME_REGEX.test(name.trim())
}

type MapNode = { name: string; parent_id?: string | null; parents?: string[] }

function getParentId(
    node: { parent_id?: string | null; parents?: string[] } | null | undefined
): string | null {
    if (!node) return null
    if (typeof node.parent_id === 'string' && node.parent_id) return node.parent_id
    const parents = node.parents
    if (Array.isArray(parents) && typeof parents[0] === 'string') return parents[0]
    return null
}

export type DriveLikeItem = {
    id: string
    name: string
    mimeType?: string
    mime_type?: string
    parent_id?: string | null
    parents?: string[]
}

/**
 * Ekstrak Standar & EP: naiki rantai parent hingga folder EP; Standar = parent dari folder EP.
 * Berlaku untuk file di subfolder dalam EP.
 */
export function extractStandarEPFromHierarchy(
    item: DriveLikeItem,
    nodeById: Map<string, MapNode>
): { standar: string | null; ep: string | null } {
    const mime = item.mimeType ?? item.mime_type ?? ''
    const isFolder = mime === 'application/vnd.google-apps.folder'

    if (isFolder && isEPFolderName(item.name)) {
        const pid = getParentId(item)
        const standarNode = pid ? nodeById.get(pid) : null
        return {
            standar: standarNode?.name ?? null,
            ep: item.name,
        }
    }

    let parentId = getParentId(item)
    let depth = 0
    while (parentId && depth < 40) {
        const node = nodeById.get(parentId)
        if (!node) break

        if (isEPFolderName(node.name)) {
            const epPid = getParentId(node)
            const standarNode = epPid ? nodeById.get(epPid) : null
            return {
                standar: standarNode?.name ?? null,
                ep: node.name,
            }
        }

        parentId = getParentId(node)
        depth++
    }

    return { standar: null, ep: null }
}

/** Bangun Map untuk extractStandarEP — dari bentuk flatten Drive API (parents[0]). */
export function mapFromDriveFileList(files: DriveLikeItem[]): Map<string, MapNode> {
    const m = new Map<string, MapNode>()
    for (const f of files) {
        m.set(f.id, {
            name: f.name,
            parent_id: getParentId(f),
            parents: f.parents,
        })
    }
    return m
}

/** Bangun Map dari item sync dengan parent_id tunggal. */
export function mapFromSyncedItems(items: { id: string; name: string; parent_id: string | null }[]): Map<string, MapNode> {
    const m = new Map<string, MapNode>()
    for (const it of items) {
        m.set(it.id, {
            name: it.name,
            parent_id: it.parent_id ?? null,
        })
    }
    return m
}

type DocMinimal = {
    id: string
    gdrive_id: string
    parent_id: string | null
    mime_type: string
}

/** Hitung file (non-folder) di bawah folder, rekursif. */
export function countFilesRecursiveUnderFolder(
    folderId: string,
    allDocs: { gdrive_id: string; parent_id: string | null; mime_type: string }[]
): number {
    const children = allDocs.filter((d) => d.parent_id === folderId)
    let n = 0
    for (const c of children) {
        if (c.mime_type !== 'application/vnd.google-apps.folder') {
            n += 1
        } else {
            n += countFilesRecursiveUnderFolder(c.gdrive_id, allDocs)
        }
    }
    return n
}

/** Isi langsung folder (rekurs satu level), folder dulu lalu urut nama. */
export function getSortedDirectChildrenOfFolder<
    T extends { gdrive_id: string; parent_id: string | null; mime_type: string; name: string },
>(folderId: string, allDocs: T[]): T[] {
    return allDocs
        .filter((d) => d.parent_id === folderId)
        .sort((a, b) => {
            const af = a.mime_type === 'application/vnd.google-apps.folder' ? 0 : 1
            const bf = b.mime_type === 'application/vnd.google-apps.folder' ? 0 : 1
            if (af !== bf) return af - bf
            return a.name.localeCompare(b.name, 'id', { numeric: true })
        })
}

/** Semua dokumen file (bukan folder) di bawah folder, rekursif. */
export function collectFilesRecursiveUnderFolder<T extends DocMinimal>(folderId: string, allDocs: T[]): T[] {
    const children = allDocs.filter((d) => d.parent_id === folderId)
    const out: T[] = []
    for (const c of children) {
        if (c.mime_type !== 'application/vnd.google-apps.folder') {
            out.push(c)
        } else {
            out.push(...collectFilesRecursiveUnderFolder(c.gdrive_id, allDocs))
        }
    }
    return out
}
