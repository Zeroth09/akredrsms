-- Migration: Menambahkan kolom yang mungkin hilang pada tabel assessment_sessions
-- Menghindari error schema cache saat menyimpan atau membaca sesi di Halaman Admin

ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS rumah_sakit VARCHAR(200) DEFAULT '';
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS tahun_akreditasi VARCHAR(10) DEFAULT '';
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS surveyor_name VARCHAR(200) DEFAULT '';
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS surveyor_unit VARCHAR(100) DEFAULT '';
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS is_aktif BOOLEAN DEFAULT TRUE;

