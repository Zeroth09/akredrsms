
-- 1. Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create documents table (with all columns)
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  -- Added for Tree View
  parent_id TEXT,
  -- Added for Document Types
  document_type TEXT
);

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_documents_gdrive_id ON documents(gdrive_id);
CREATE INDEX IF NOT EXISTS idx_documents_category_id ON documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_parent_id ON documents(parent_id);
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON documents(document_type);

-- 4. Seed categories
INSERT INTO categories (name, description) VALUES
('Rawat Inap', 'Dokumen terkait pelayanan rawat inap'),
('Rawat Jalan', 'Dokumen terkait pelayanan rawat jalan'),
('IGD', 'Dokumen Instalasi Gawat Darurat'),
('Farmasi', 'Dokumen kefarmasian'),
('SDM', 'Dokumen kepegawaian')
ON CONFLICT (name) DO NOTHING;

-- 5. Safeguard for existing tables (Migrations)
ALTER TABLE documents ADD COLUMN IF NOT EXISTS parent_id TEXT;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS document_type TEXT;

CREATE INDEX IF NOT EXISTS idx_documents_parent_id ON documents(parent_id);
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON documents(document_type);
