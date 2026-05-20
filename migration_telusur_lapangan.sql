-- ================================================================
-- Migration: telusur_lapangan table
-- Menyimpan data temuan, rekomendasi, dan penanggung jawab telusur lapangan
-- ================================================================

CREATE TABLE IF NOT EXISTS telusur_lapangan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(100) DEFAULT 'ASESMEN_RS_DEFAULT_2024' NOT NULL,
    nama_ruang TEXT NOT NULL,
    temuan TEXT DEFAULT '',
    rekomendasi TEXT DEFAULT '',
    penanggung_jawab TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index untuk performa query berdasarkan sesi
CREATE INDEX IF NOT EXISTS idx_telusur_session_id ON telusur_lapangan (session_id);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE telusur_lapangan ENABLE ROW LEVEL SECURITY;

-- Policy untuk development (bisa dibaca dan ditulis oleh siapa saja)
DROP POLICY IF EXISTS "public_read_write_telusur" ON telusur_lapangan;
CREATE POLICY "public_read_write_telusur" ON telusur_lapangan
    FOR ALL USING (true) WITH CHECK (true);
