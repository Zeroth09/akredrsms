
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gdrive_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  mime_type TEXT,
  web_view_link TEXT,
  status TEXT CHECK (status IN ('Lengkap', 'Tidak Lengkap', 'Pending')) DEFAULT 'Pending',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  notes TEXT,
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_documents_gdrive_id ON documents(gdrive_id);
CREATE INDEX IF NOT EXISTS idx_documents_category_id ON documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);

-- Seed some categories (optional)
INSERT INTO categories (name, description) VALUES
('Rawat Inap', 'Dokumen terkait pelayanan rawat inap'),
('Rawat Jalan', 'Dokumen terkait pelayanan rawat jalan'),
('IGD', 'Dokumen Instalasi Gawat Darurat'),
('Farmasi', 'Dokumen kefarmasian'),
('SDM', 'Dokumen kepegawaian')
ON CONFLICT (name) DO NOTHING;
