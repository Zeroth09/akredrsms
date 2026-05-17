
-- Add parent_id to documents table for hierarchy support
ALTER TABLE documents ADD COLUMN IF NOT EXISTS parent_id TEXT;
CREATE INDEX IF NOT EXISTS idx_documents_parent_id ON documents(parent_id);
