-- Migration: Add standar and ep columns to documents table
ALTER TABLE documents ADD COLUMN IF NOT EXISTS standar TEXT;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS ep TEXT;

-- Add indexes for better filtering performance
CREATE INDEX IF NOT EXISTS idx_documents_standar ON documents(standar);
CREATE INDEX IF NOT EXISTS idx_documents_ep ON documents(ep);
