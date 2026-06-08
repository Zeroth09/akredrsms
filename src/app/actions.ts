'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { getGoogleDriveClient } from '@/lib/google-drive'
import { extractStandarEPFromHierarchy, mapFromDriveFileList, type DriveLikeItem } from '@/lib/standarEpHierarchy'
import { pruneDocumentsNotInDrive } from '@/lib/pruneStaleDocuments'
import { enumerateEPRowsForExport, POKJA_LIST, type Doc } from '@/lib/pokjaUtils'
import { parseEpKodeFromName } from '@/lib/standarEpHierarchy'
import { MASTER_STANDAR_EP } from '@/lib/masterStandarEP'

// --- Data Fetching ---

export async function getDocuments() {
    let allDocuments: any[] = []
    let from = 0
    const pageSize = 1000
    let hasMore = true

    // Fetch all documents with pagination
    while (hasMore) {
        const { data, error } = await supabase
            .from('documents')
            .select(`
                *,
                categories (
                    name
                )
            `)
            // Urutan tetap untuk pagination (tanpa pengurutan unik kedua, baris bernama sama bisa bergeser antar-request)
            .order('name', { ascending: true })
            .order('gdrive_id', { ascending: true })
            .range(from, from + pageSize - 1)

        if (error) {
            console.error('Error fetching documents:', error)
            break
        }

        if (data && data.length > 0) {
            allDocuments = [...allDocuments, ...data]
            from += pageSize
            hasMore = data.length === pageSize // Continue if we got a full page
        } else {
            hasMore = false
        }
    }

    // Satu baris per `gdrive_id` (hapus duplikat jika ada duplikasi data)
    const seenIds = new Set<string>()
    allDocuments = allDocuments.filter((d) => {
        const id = d.gdrive_id as string
        if (!id || seenIds.has(id)) return false
        seenIds.add(id)
        return true
    })

    console.log(`[getDocuments] Fetched ${allDocuments.length} documents from Supabase (with pagination)`)

    // Debug: Check if PROGRAM NASIONAL is in the fetched data
    const programNasional = allDocuments.find(d => d.name.includes('PROGRAM NASIONAL'))
    if (programNasional) {
        console.log('[getDocuments] PROGRAM NASIONAL found:', programNasional)
    } else {
        console.log('[getDocuments] PROGRAM NASIONAL NOT in fetched data')
    }

    return allDocuments
}

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data || []
}

export async function getStandarEPHierarchy() {
    const documents = await getDocuments() as Doc[]
    const epRows = enumerateEPRowsForExport(documents)

    // Bangun lookup dari master data untuk deskripsi (key: pokjaCode)
    const masterByPokja = new Map(MASTER_STANDAR_EP.map(p => [p.pokjaCode, p]))

    // Bangun lookup dokumen per standar+ep untuk lampirkan ke masing-masing EP
    // key: "STANDAR_NAME|EP_NAME" (lowercase) → array dokumen
    const docsByEP = new Map<string, { name: string; link: string }[]>()
    for (const doc of documents) {
        const d = doc as any
        if (!d.standar || !d.ep) continue
        // Hanya file, bukan folder
        if (d.mime_type === 'application/vnd.google-apps.folder') continue
        const dKey = `${d.standar.toLowerCase().trim()}|${d.ep.toLowerCase().trim()}`
        if (!docsByEP.has(dKey)) docsByEP.set(dKey, [])
        docsByEP.get(dKey)!.push({
            name: d.name ?? 'Tanpa nama',
            link: d.web_view_link ?? '',
        })
    }

    return POKJA_LIST.map((pokja) => {
        const rows = epRows.filter((row) => row.pokjaCode === pokja.code)
        const standarMap = new Map<string, {
            kode: string; deskripsi: string;
            epList: { kode: string; deskripsi: string; bukti: string[]; dokumen: { name: string; link: string }[] }[]
        }>()

        // Lookup master data untuk pokja ini (case-insensitive)
        const masterPokja = masterByPokja.get(pokja.code)
        const masterStandarMap = new Map(
            masterPokja?.standarList.map(s => [s.kode.toLowerCase().trim(), s]) ?? []
        )

        for (const row of rows) {
            const standarName = row.standarName?.trim()
            const epName = row.epName?.trim()
            if (!standarName || !epName) continue

            // Normalisasi key untuk lookup
            const standarKey = standarName.toLowerCase()
            const epKode = parseEpKodeFromName(epName)
            const epKey = epKode.toLowerCase()
            const epDeskripsiFromName = epName.slice(epKode.length).trim()

            if (!standarMap.has(standarName)) {
                // Cari deskripsi standar dari master data (case-insensitive)
                const masterStandar = masterStandarMap.get(standarKey)
                standarMap.set(standarName, {
                    kode: standarName,
                    deskripsi: masterStandar?.deskripsi ?? '',
                    epList: [],
                })
            }

            const standar = standarMap.get(standarName)
            if (standar && !standar.epList.some((ep) => ep.kode === epKode)) {
                // Cari deskripsi EP dan bukti RDOW dari master data (case-insensitive)
                const masterStandar = masterStandarMap.get(standarKey)
                const masterEP = masterStandar?.epList.find(e => e.kode.toLowerCase().trim() === epKey)

                // Ambil dokumen yang terkait EP ini (key pakai nama folder Drive asli)
                const docKey = `${standarName.toLowerCase()}|${epName.toLowerCase()}`
                const epDocs = docsByEP.get(docKey) ?? []

                standar.epList.push({
                    kode: epKode,
                    deskripsi: masterEP?.deskripsi ?? epDeskripsiFromName,
                    bukti: masterEP?.bukti ?? [],
                    dokumen: epDocs,
                })
            }
        }

        const standarList = Array.from(standarMap.values()).map((standar) => ({
            ...standar,
            epList: standar.epList.sort((a, b) => a.kode.localeCompare(b.kode, 'id', { numeric: true })),
        }))

        standarList.sort((a, b) => a.kode.localeCompare(b.kode, 'id', { numeric: true }))

        return {
            pokjaCode: pokja.code,
            pokjaName: pokja.name,
            standarList,
        }
    }).filter((pokja) => pokja.standarList.length > 0)
}

// --- Sync Logic ---

export async function syncDocuments() {
    try {
        const drive = await getGoogleDriveClient()
        const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID

        if (!rootFolderId) {
            return { success: false, message: 'Folder ID configuration missing.' }
        }

        let allFiles: any[] = []

        // Recursive function to fetch all files in a folder and its subfolders
        async function fetchFilesRecursively(folderId: string, folderName: string = '') {
            let pageToken: string | undefined = undefined
            let filesInThisFolder: any[] = []

            // First, fetch ALL files in this folder (with pagination)
            do {
                const res: any = await drive.files.list({
                    q: `'${folderId}' in parents and trashed = false`,
                    fields: 'nextPageToken, files(id, name, mimeType, webViewLink, parents)',
                    pageSize: 1000,
                    pageToken: pageToken,
                    supportsAllDrives: true,
                    includeItemsFromAllDrives: true
                })

                if (res.data.files) {
                    filesInThisFolder = [...filesInThisFolder, ...res.data.files]
                }
                pageToken = res.data.nextPageToken || undefined

            } while (pageToken)

            console.log(`[SYNC] Fetched ${filesInThisFolder.length} items from folder: ${folderName || folderId}`)

            // Add all files from this folder to the main list
            allFiles = [...allFiles, ...filesInThisFolder]

            // Then, recursively fetch contents of subfolders
            const subfolders = filesInThisFolder.filter(f => f.mimeType === 'application/vnd.google-apps.folder')
            for (const subfolder of subfolders) {
                await fetchFilesRecursively(subfolder.id, subfolder.name)
            }
        }

        // Start recursive fetch from root folder
        await fetchFilesRecursively(rootFolderId)

        // Also add the root folder itself
        const rootFolder: any = await drive.files.get({
            fileId: rootFolderId,
            fields: 'id, name, mimeType, webViewLink, parents',
            supportsAllDrives: true
        })

        if (rootFolder.data) {
            allFiles.unshift(rootFolder.data)
        }

        console.log(`[SYNC] Fetched ${allFiles.length} total items from Google Drive (recursive)`)
        console.log(`[SYNC] Sample of first 5 items:`, allFiles.slice(0, 5).map(f => ({
            name: f.name,
            id: f.id,
            parent: f.parents?.[0],
            mimeType: f.mimeType
        })))

        if (allFiles.length === 0) {
            return { success: true, message: 'No files found in Drive.' }
        }

        // Bangun map id → file untuk traversal hierarki yang cepat (sekali saja, di luar loop)
        const hierarchyMap = mapFromDriveFileList(allFiles as DriveLikeItem[])

        // Upsert to Supabase
        // Process in chunks to avoid payload limits if huge
        const CHUNK_SIZE = 100
        for (let i = 0; i < allFiles.length; i += CHUNK_SIZE) {
            const chunk = allFiles.slice(i, i + CHUNK_SIZE)

            const updates = chunk.map(file => {
                const { standar: extractedStandar, ep: extractedEP } = extractStandarEPFromHierarchy(
                    {
                        id: file.id,
                        name: file.name,
                        mimeType: file.mimeType,
                        parents: file.parents,
                    },
                    hierarchyMap
                )

                return {
                    gdrive_id: file.id,
                    name: file.name,
                    mime_type: file.mimeType,
                    web_view_link: file.webViewLink,
                    parent_id: file.parents?.[0] || null,
                    last_synced_at: new Date().toISOString(),
                    standar: extractedStandar,
                    ep: extractedEP
                }
            })

            // Debug: Check if PROGRAM NASIONAL is in this chunk
            const programNasional = updates.find(u => u.name.includes('PROGRAM NASIONAL'))
            if (programNasional) {
                console.log('[SYNC] Found PROGRAM NASIONAL in chunk, will insert:', programNasional)
            }

            const { error, data } = await supabase
                .from('documents')
                .upsert(updates, { onConflict: 'gdrive_id' })
                .select()

            if (error) {
                console.error(`[SYNC ERROR] Supabase Upsert Error (Chunk ${i}):`, error)
                console.error(`[SYNC ERROR] Error details:`, JSON.stringify(error, null, 2))

                // Check if PROGRAM NASIONAL was in this failed chunk
                if (programNasional) {
                    console.error(`[SYNC ERROR] PROGRAM NASIONAL was in this chunk but failed to insert!`)
                }
            } else {
                // Success - check if PROGRAM NASIONAL was inserted
                if (programNasional && data) {
                    const inserted = data.find((d: any) => d.name.includes('PROGRAM NASIONAL'))
                    if (inserted) {
                        console.log('[SYNC SUCCESS] PROGRAM NASIONAL successfully inserted:', inserted)
                    }
                }
            }
        }

        const validDriveIds = new Set(allFiles.map((f) => f.id as string))
        let removedStale = 0
        try {
            removedStale = await pruneDocumentsNotInDrive(validDriveIds)
        } catch (pruneErr) {
            console.error('[SYNC] Prune stale documents failed:', pruneErr)
        }

        revalidatePath('/')
        revalidatePath('/dokumen')
        revalidatePath('/dashboard2')
        const pruneMsg =
            removedStale > 0 ? ` ${removedStale} dokumen tidak lagi di Drive telah dihapus dari database.` : ''
        return {
            success: true,
            message: `Synced ${allFiles.length} items from Drive (recursive).${pruneMsg}`,
        }

    } catch (error) {
        console.error('Sync Error:', error)
        return { success: false, message: 'Sync failed. Check console.' }
    }
}

// --- Status Updates ---

export async function updateDocumentStatus(id: string, status: string) {
    const { error } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', id)

    if (error) console.error('Error updating status:', error)
    revalidatePath('/')
}

export async function updateDocumentCategory(id: string, categoryId: string) {
    // Handle "Uncategorized" (empty string) by sending null
    const val = categoryId === '' ? null : categoryId

    const { error } = await supabase
        .from('documents')
        .update({ category_id: val })
        .eq('id', id)

    if (error) console.error('Error updating category:', error)
    revalidatePath('/')
}

export async function updateDocumentType(id: string, docType: string) {
    // Handle empty selection
    const val = docType === '' ? null : docType

    const { error } = await supabase
        .from('documents')
        .update({ document_type: val })
        .eq('id', id)

    if (error) console.error('Error updating document type:', error)
    revalidatePath('/')
}

export async function updateDocumentStandar(id: string, standar: string | null) {
    const { error } = await supabase
        .from('documents')
        .update({ standar })
        .eq('id', id)

    if (error) console.error('Error updating standar:', error)
    revalidatePath('/')
}

export async function updateDocumentEP(id: string, ep: string | null) {
    const { error } = await supabase
        .from('documents')
        .update({ ep })
        .eq('id', id)

    if (error) console.error('Error updating EP:', error)
    revalidatePath('/')
}

// --- Asesor V2 ---

export async function getActiveSession() {
    const { data, error } = await supabase
        .from('assessment_sessions')
        .select('assessment_id, rumah_sakit, tahun_akreditasi, surveyor_name, surveyor_unit')
        .eq('is_aktif', true)
        .maybeSingle()

    if (error) {
        console.error('Gagal mengambil sesi aktif:', error)
        return null
    }
    return data
}

export async function getAssessmentsCatatan(sessionId: string) {
    const { data, error } = await supabase
        .from('assessments')
        .select('pokja_code, standar_kode, ep_kode, catatan')
        .eq('assessment_id', sessionId)

    if (error) {
        console.error('Gagal mengambil catatan asesmen:', error)
        return {}
    }

    const store: Record<string, string> = {}
    for (const row of data ?? []) {
        const key = `${row.pokja_code}|${row.standar_kode}|${row.ep_kode}`
        store[key] = row.catatan ?? ''
    }
    return store
}

export async function upsertCatatan(
    sessionId: string,
    pokjaCode: string,
    standarKode: string,
    epKode: string,
    catatan: string
) {
    const { error } = await supabase
        .from('assessments')
        .upsert(
            {
                assessment_id: sessionId,
                pokja_code: pokjaCode,
                standar_kode: standarKode,
                ep_kode: epKode,
                catatan,
                nilai: null,
                fakta_analisis: '',
                rekomendasi: '',
            },
            { onConflict: 'assessment_id,pokja_code,standar_kode,ep_kode' }
        )

    if (error) {
        console.error('Gagal menyimpan catatan:', error)
        return false
    }
    return true
}
