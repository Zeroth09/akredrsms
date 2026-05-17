
-- Add document_type to documents table
ALTER TABLE documents ADD COLUMN IF NOT EXISTS document_type TEXT;
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON documents(document_type);

-- Optional: Create a separate table for document types if we want them dynamic, 
-- but for now a simple text column or Enum check is sufficient.
-- If we want strict types:
-- ALTER TABLE documents ADD CONSTRAINT check_document_type CHECK (document_type IN ('SPO', 'Regulasi', 'SK', 'Pedoman', 'Panduan', 'KAK', 'Laporan', 'Lainnya'));
