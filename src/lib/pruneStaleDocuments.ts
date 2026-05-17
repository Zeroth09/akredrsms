import { supabase } from '@/lib/supabase'

const SELECT_PAGE = 1000
const DELETE_CHUNK = 100

/**
 * Hapus baris `documents` yang `gdrive_id`-nya tidak lagi muncul dalam hasil listing Drive
 * (mis. file dihapus / dipindah user). Membuat isi app selaras dengan subtree yang disinkronkan.
 */
export async function pruneDocumentsNotInDrive(validDriveIds: Set<string>): Promise<number> {
    const allRows: { gdrive_id: string }[] = []
    let offset = 0

    for (;;) {
        const { data, error } = await supabase
            .from('documents')
            .select('gdrive_id')
            .range(offset, offset + SELECT_PAGE - 1)

        if (error) {
            console.error('[pruneStaleDocuments] select error:', error)
            throw error
        }
        if (!data?.length) break
        allRows.push(...data)
        if (data.length < SELECT_PAGE) break
        offset += SELECT_PAGE
    }

    const staleIds = allRows.map((r) => r.gdrive_id).filter((id) => id && !validDriveIds.has(id))
    if (staleIds.length === 0) return 0

    let removed = 0
    for (let i = 0; i < staleIds.length; i += DELETE_CHUNK) {
        const chunk = staleIds.slice(i, i + DELETE_CHUNK)
        const { error } = await supabase.from('documents').delete().in('gdrive_id', chunk)
        if (error) {
            console.error('[pruneStaleDocuments] delete chunk error:', error)
            throw error
        }
        removed += chunk.length
    }

    if (removed > 0) {
        console.log(`[pruneStaleDocuments] Removed ${removed} row(s) not present on Drive`)
    }

    return removed
}
