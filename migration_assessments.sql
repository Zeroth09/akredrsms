-- ================================================================
-- Migration: assessments table
-- Menyimpan data penilaian EP surveyor ke Supabase
-- ================================================================

-- 1. Tabel assessments (data penilaian per EP)
CREATE TABLE IF NOT EXISTS assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id VARCHAR(100) NOT NULL,
    -- Composite key: "TKRS 1|EP a" → breakdown:
    pokja_code VARCHAR(20) NOT NULL,
    standar_kode VARCHAR(30) NOT NULL,
    ep_kode VARCHAR(10) NOT NULL,
    -- Nilai EP: terpenuhi, sebagian, tidak (null = belum dinilai)
    nilai VARCHAR(20) CHECK (nilai IN ('terpenuhi', 'sebagian', 'tidak')),
    -- Catatan surveyor
    catatan TEXT DEFAULT '',
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Constraint unik per EP per asesmen
    UNIQUE (assessment_id, pokja_code, standar_kode, ep_kode)
);

-- Index untuk query cepat
CREATE INDEX IF NOT EXISTS idx_assessments_assessment_id ON assessments (assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessments_pokja ON assessments (pokja_code, standar_kode, ep_kode);

-- 2. Tabel assessment_sessions (metadata asesmen per RS)
CREATE TABLE IF NOT EXISTS assessment_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id VARCHAR(100) NOT NULL UNIQUE,
    -- Info RS
    rumah_sakit VARCHAR(200) DEFAULT '',
    tahun_akreditasi VARCHAR(10) DEFAULT '',
    -- Info surveyor
    surveyor_name VARCHAR(200) DEFAULT '',
    surveyor_unit VARCHAR(100) DEFAULT '',
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_aktif BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_sessions_aktif ON assessment_sessions (is_aktif);

-- ================================================================
-- Policy: allow all for development (RLS bisa ditambahkan nanti)
-- ================================================================
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;

-- Policy untuk development: siapa pun bisa read/write
-- Ganti dengan policy yang lebih ketat untuk production
DROP POLICY IF EXISTS "public_read_write_assessments" ON assessments;
CREATE POLICY "public_read_write_assessments" ON assessments
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_read_write_sessions" ON assessment_sessions;
CREATE POLICY "public_read_write_sessions" ON assessment_sessions
    FOR ALL USING (true) WITH CHECK (true);
