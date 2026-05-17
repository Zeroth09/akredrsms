// Quick test to check if PROGRAM NASIONAL exists in Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testQuery() {
    console.log('Testing Supabase connection...')

    // Get all documents
    const { data: allDocs, error: allError } = await supabase
        .from('documents')
        .select('*')
        .range(0, 9999)

    if (allError) {
        console.error('Error fetching all documents:', allError)
        return
    }

    console.log(`Total documents in DB: ${allDocs.length}`)

    // Search for PROGRAM NASIONAL
    const programNasional = allDocs.find(d => d.name.includes('PROGRAM NASIONAL'))

    if (programNasional) {
        console.log('✅ PROGRAM NASIONAL FOUND:', programNasional)
    } else {
        console.log('❌ PROGRAM NASIONAL NOT FOUND')
        console.log('Sample documents:', allDocs.slice(0, 5).map(d => d.name))
    }

    // Check DOKUMEN AKREDITASI children
    const dokumenAkreditasi = allDocs.find(d => d.name === 'DOKUMEN AKREDITASI 2025-2026')
    if (dokumenAkreditasi) {
        const children = allDocs.filter(d => d.parent_id === dokumenAkreditasi.gdrive_id)
        console.log(`\nDOKUMEN AKREDITASI children (${children.length}):`)
        children.forEach(c => console.log(`  - ${c.name}`))
    }
}

testQuery()
