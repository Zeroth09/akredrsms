import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
    readFileSync('.env.local', 'utf8').split('\n')
        .filter(l => l.includes('='))
        .map(l => { const idx = l.indexOf('='); return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()] })
)

const sb = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['NEXT_PUBLIC_SUPABASE_ANON_KEY'])
const { data: docs } = await sb.from('documents').select('gdrive_id,name,mime_type,parent_id')
console.log('Total docs:', docs.length)

const knownEpbId = '1AjioHs688o1LbZ4BSZa1ftggaEvr3ofx'
const epbRecord = docs.find(d => d.gdrive_id === knownEpbId)
console.log('\nEP b record by drive URL ID:', epbRecord ? `name=${epbRecord.name}` : 'TIDAK ADA di DB')

const filesInEpb = docs.filter(d => d.parent_id === knownEpbId && d.mime_type !== 'application/vnd.google-apps.folder')
console.log('Files dgn parent_id = EP b drive ID:', filesInEpb.length)
filesInEpb.slice(0, 5).forEach(f => console.log(' -', f.name))

// Cari semua folder bernama "EP b"
const allEpbFolders = docs.filter(d => d.name === 'EP b' && d.mime_type === 'application/vnd.google-apps.folder')
console.log('\nSemua folder "EP b" di DB:', allEpbFolders.length)
allEpbFolders.forEach(ep => {
    const parent = docs.find(d => d.gdrive_id === ep.parent_id)
    const gp = parent ? docs.find(d => d.gdrive_id === parent.parent_id) : null
    const children = docs.filter(d => d.parent_id === ep.gdrive_id && d.mime_type !== 'application/vnd.google-apps.folder')
    console.log(`  gdrive_id=${ep.gdrive_id} | parent=${parent?.name} | gp=${gp?.name} | files=${children.length}`)
})

// Cek MFK 1
const mfk1 = docs.filter(d => d.name === 'MFK 1' && d.mime_type === 'application/vnd.google-apps.folder')
console.log('\nMFK 1 records:', mfk1.length)
mfk1.forEach(m => {
    const ch = docs.filter(d => d.parent_id === m.gdrive_id)
    console.log(`  gdrive_id=${m.gdrive_id} | children: ${ch.map(c => c.name).join(', ')}`)
})
