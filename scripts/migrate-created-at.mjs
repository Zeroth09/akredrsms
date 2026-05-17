/**
 * Script Migrasi: Update created_at dari metadata Google Drive
 * 
 * Jalankan dengan: node scripts/migrate-created-at.mjs
 * 
 * Script ini akan:
 * 1. Ambil semua dokumen dari Supabase yang punya gdrive_id
 * 2. Fetch createdTime dari Google Drive API per file
 * 3. Update kolom created_at di Supabase dengan nilai dari Drive
 */

import { google } from 'googleapis'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ─── Load .env.local secara manual ───────────────────────────────────────────
function loadEnvLocal() {
    const envPath = resolve(process.cwd(), '.env.local')
    try {
        const content = readFileSync(envPath, 'utf-8')
        for (const line of content.split('\n')) {
            const trimmed = line.trim()
            if (!trimmed || trimmed.startsWith('#')) continue
            const eqIndex = trimmed.indexOf('=')
            if (eqIndex === -1) continue
            const key = trimmed.slice(0, eqIndex).trim()
            const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '')
            process.env[key] = value
        }
        console.log('[ENV] Loaded .env.local')
    } catch {
        console.warn('[ENV] .env.local tidak ditemukan, menggunakan env sistem')
    }
}

loadEnvLocal()

// ─── Init Google Drive Client ─────────────────────────────────────────────────
function getGoogleDriveClient() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

    if (!clientEmail || !privateKey) {
        throw new Error('Missing: GOOGLE_SERVICE_ACCOUNT_EMAIL atau GOOGLE_PRIVATE_KEY')
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    })

    return google.drive({ version: 'v3', auth })
}

// ─── Init Supabase Client ─────────────────────────────────────────────────────
function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        throw new Error('Missing: NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY')
    }

    return createClient(url, key)
}

// ─── Main Migration ───────────────────────────────────────────────────────────
async function migrateCreatedAt() {
    console.log('=== Mulai Migrasi created_at dari Google Drive ===\n')

    const drive = getGoogleDriveClient()
    const supabase = getSupabaseClient()

    // 1. Ambil semua dokumen dari Supabase
    const { data: documents, error: fetchError } = await supabase
        .from('documents')
        .select('id, gdrive_id, name, created_at')
        .not('gdrive_id', 'is', null)

    if (fetchError) {
        console.error('Gagal fetch dokumen dari Supabase:', fetchError.message)
        process.exit(1)
    }

    console.log(`Ditemukan ${documents.length} dokumen di database\n`)

    let updated = 0
    let skipped = 0
    let failed = 0

    // 2. Proses per dokumen
    for (const doc of documents) {
        try {
            // Fetch metadata dari Google Drive
            const response = await drive.files.get({
                fileId: doc.gdrive_id,
                fields: 'id, name, createdTime',
            })

            const driveCreatedTime = response.data.createdTime

            if (!driveCreatedTime) {
                console.warn(`  [SKIP] ${doc.name} — createdTime tidak tersedia`)
                skipped++
                continue
            }

            const driveCreatedAt = new Date(driveCreatedTime).toISOString()

            // Bandingkan: skip jika sudah sama
            const currentCreatedAt = doc.created_at
                ? new Date(doc.created_at).toISOString()
                : null

            if (currentCreatedAt === driveCreatedAt) {
                console.log(`  [SAMA] ${doc.name}`)
                skipped++
                continue
            }

            // Update created_at di Supabase
            const { error: updateError } = await supabase
                .from('documents')
                .update({ created_at: driveCreatedAt })
                .eq('id', doc.id)

            if (updateError) {
                console.error(`  [ERROR] ${doc.name}: ${updateError.message}`)
                failed++
                continue
            }

            console.log(`  [OK] ${doc.name}`)
            console.log(`       DB lama : ${currentCreatedAt ?? 'kosong'}`)
            console.log(`       Drive   : ${driveCreatedAt}`)
            updated++

        } catch (err) {
            // File mungkin sudah dihapus dari Drive
            if (err.code === 404 || err.status === 404) {
                console.warn(`  [404] ${doc.name} — file tidak ditemukan di Drive, dilewati`)
            } else {
                console.error(`  [ERROR] ${doc.name}: ${err.message}`)
            }
            skipped++
        }
    }

    console.log('\n=== Selesai ===')
    console.log(`  ✅ Diperbarui : ${updated}`)
    console.log(`  ⏭️  Dilewati  : ${skipped}`)
    console.log(`  ❌ Gagal     : ${failed}`)
}

migrateCreatedAt().catch((err) => {
    console.error('\nScript error:', err.message)
    process.exit(1)
})
