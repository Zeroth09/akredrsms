-- Migration untuk menambah kolom rekomendasi_pic dan status_pic pada tabel assessments
ALTER TABLE assessments
ADD COLUMN IF NOT EXISTS rekomendasi_pic TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS status_pic VARCHAR(20) CHECK (status_pic IN ('pending', 'completed')) DEFAULT 'pending';
