-- Migration untuk menambah kolom fakta_analisis dan rekomendasi pada tabel assessments
ALTER TABLE assessments
ADD COLUMN IF NOT EXISTS fakta_analisis TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS rekomendasi TEXT DEFAULT '';

-- Opsional: Jika ingin memigrasi data dari catatan ke fakta_analisis (agar tidak hilang)
-- UPDATE assessments SET fakta_analisis = catatan WHERE catatan IS NOT NULL AND catatan != '';
