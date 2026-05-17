import { revalidatePath } from 'next/cache'
import { getGoogleDriveClient } from '@/lib/google-drive'
import { supabase } from '@/lib/supabase'
import { pruneDocumentsNotInDrive } from '@/lib/pruneStaleDocuments'
import { extractStandarEPFromHierarchy, mapFromSyncedItems } from '@/lib/standarEpHierarchy'

export async function syncDriveDocuments() {
    console.log('[Sync] Starting Google Drive sync...')

    try {
        const drive = await getGoogleDriveClient()

        // Get root folder ID from env or use default
        const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || '1qlQqvUujugMQwQwPOM5bYAs9S-_RstVA'

        // Fetch all files and folders recursively
        const allItems: any[] = []
        await fetchFolderContents(drive, rootFolderId, null, allItems)

        try {
            const rootRes = await drive.files.get({
                fileId: rootFolderId,
                fields: 'id, name, mimeType, webViewLink, parents, createdTime, modifiedTime',
                supportsAllDrives: true,
            })
            if (rootRes.data) {
                allItems.unshift({
                    ...rootRes.data,
                    parent_id: rootRes.data.parents?.[0] ?? null,
                })
            }
        } catch (e) {
            console.warn('[Sync] Could not fetch root folder row:', e)
        }

        console.log(`[Sync] Fetched ${allItems.length} items from Google Drive`)

        // Bangun map id → item untuk traversal hierarki yang cepat (O(1))
        const hierarchyMap = mapFromSyncedItems(
            allItems.map((i) => ({
                id: i.id as string,
                name: i.name as string,
                parent_id: (i.parent_id as string | null) ?? null,
            }))
        )

        // Bulk fetch existing records
        const { data: existingDocs } = await supabase
            .from('documents')
            .select('gdrive_id, created_at, status')
            
        const existingMap = new Map((existingDocs || []).map(d => [d.gdrive_id, d]))

        const upsertDataArray = allItems.map(item => {
            const driveCreatedAt = item.createdTime
                ? new Date(item.createdTime).toISOString()
                : new Date().toISOString()
                
            const existing = existingMap.get(item.id)

            const { standar, ep } = extractStandarEPFromHierarchy(
                {
                    id: item.id as string,
                    name: item.name as string,
                    mimeType: item.mimeType as string | undefined,
                    parent_id: item.parent_id as string | null,
                },
                hierarchyMap
            )

            return {
                gdrive_id: item.id,
                name: item.name,
                mime_type: item.mimeType,
                parent_id: item.parent_id,
                web_view_link: item.webViewLink,
                last_synced_at: new Date().toISOString(),
                standar,
                ep,
                created_at: existing ? existing.created_at : driveCreatedAt,
                status: existing ? existing.status : 'Pending'
            }
        })

        // Chunk bulk upsert
        const CHUNK_SIZE = 500;
        for (let i = 0; i < upsertDataArray.length; i += CHUNK_SIZE) {
            const chunk = upsertDataArray.slice(i, i + CHUNK_SIZE);
            const { error } = await supabase
                .from('documents')
                .upsert(chunk, { onConflict: 'gdrive_id' })
                
            if (error) {
                console.error(`[Sync] Error upserting chunk ${i}:`, error)
            }
        }

        const validIds = new Set(allItems.map((i) => i.id as string))
        try {
            const removed = await pruneDocumentsNotInDrive(validIds)
            if (removed > 0) {
                console.log(`[Sync] Pruned ${removed} stale document(s) not on Drive`)
            }
        } catch (pruneErr) {
            console.error('[Sync] pruneDocumentsNotInDrive failed:', pruneErr)
        }

        try {
            revalidatePath('/')
            revalidatePath('/dokumen')
            revalidatePath('/dashboard2')
        } catch (revErr) {
            console.warn('[Sync] revalidatePath:', revErr)
        }

        console.log('[Sync] Sync completed successfully')
    } catch (error) {
        console.error('[Sync] Sync failed:', error)
        throw error
    }
}

async function fetchFolderContents(
    drive: any,
    folderId: string,
    parentId: string | null,
    allItems: any[]
) {
    const query = `'${folderId}' in parents and trashed=false`

    let pageToken: string | undefined
    do {
        let response;
        let retries = 3;
        while (retries > 0) {
            try {
                response = await drive.files.list({
                    q: query,
                    fields: 'nextPageToken, files(id, name, mimeType, webViewLink, createdTime, modifiedTime)',
                    pageSize: 1000,
                    pageToken,
                    supportsAllDrives: true,
                    includeItemsFromAllDrives: true,
                })
                break;
            } catch (err: any) {
                retries--;
                console.warn(`[Sync] Drive fetch retry (${3-retries}/3) for folder ${folderId} due to:`, err.message);
                if (retries === 0) throw err;
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        const files = response?.data?.files || []

        for (const file of files) {
            allItems.push({
                ...file,
                parent_id: parentId
            })

            // If it's a folder, recursively fetch its contents
            if (file.mimeType === 'application/vnd.google-apps.folder') {
                await fetchFolderContents(drive, file.id, file.id, allItems)
            }
        }

        pageToken = response?.data?.nextPageToken
    } while (pageToken)
}
