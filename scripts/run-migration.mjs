// Script: Run migration untuk tabel assessments
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function runMigration() {
    console.log('🔧 Running assessments migration...')

    // 1. Buat tabel assessments
    const { error: err1 } = await supabase.rpc('exec_sql', {
        sql: `
        CREATE TABLE IF NOT EXISTS assessments (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            assessment_id VARCHAR(100) NOT NULL,
            pokja_code VARCHAR(20) NOT NULL,
            standar_kode VARCHAR(30) NOT NULL,
            ep_kode VARCHAR(10) NOT NULL,
            nilai VARCHAR(20) CHECK (nilai IN ('terpenuhi', 'sebagian', 'tidak')),
            catatan TEXT DEFAULT '',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE (assessment_id, pokja_code, standar_kode, ep_kode)
        );
        CREATE INDEX IF NOT EXISTS idx_assessments_assessment_id ON assessments (assessment_id);
        CREATE INDEX IF NOT EXISTS idx_assessments_pokja ON assessments (pokja_code, standar_kode, ep_kode);
        `
    })
    if (err1) console.log('assessments table:', err1.message)
    else console.log('✅ assessments table created')

    // 2. Buat tabel assessment_sessions
    const { error: err2 } = await supabase.rpc('exec_sql', {
        sql: `
        CREATE TABLE IF NOT EXISTS assessment_sessions (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            assessment_id VARCHAR(100) NOT NULL UNIQUE,
            rumah_sakit VARCHAR(200) DEFAULT '',
            tahun_akreditasi VARCHAR(10) DEFAULT '',
            surveyor_name VARCHAR(200) DEFAULT '',
            surveyor_unit VARCHAR(100) DEFAULT '',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            is_aktif BOOLEAN DEFAULT TRUE
        );
        CREATE INDEX IF NOT EXISTS idx_sessions_aktif ON assessment_sessions (is_aktif);
        `
    })
    if (err2) console.log('sessions table:', err2.message)
    else console.log('✅ assessment_sessions table created')

    // 3. Enable RLS
    const { error: err3 } = await supabase.rpc('exec_sql', {
        sql: `
        ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
        ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "public_read_write_assessments" ON assessments;
        CREATE POLICY "public_read_write_assessments" ON assessments FOR ALL USING (true) WITH CHECK (true);
        DROP POLICY IF EXISTS "public_read_write_sessions" ON assessment_sessions;
        CREATE POLICY "public_read_write_sessions" ON assessment_sessions FOR ALL USING (true) WITH CHECK (true);
        `
    })
    if (err3) console.log('RLS policies:', err3.message)
    else console.log('✅ RLS policies set')

    // 4. Verifikasi
    const { data: tables, error: err4 } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .in('table_name', ['assessments', 'assessment_sessions'])
    
    if (err4) console.error('Verification failed:', err4)
    else console.log('\n📋 Tables in public schema:', tables.map(t => t.table_name).join(', '))

    console.log('\n✅ Migration complete!')
}

runMigration().catch(console.error)
