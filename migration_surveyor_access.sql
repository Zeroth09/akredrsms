-- Migration: surveyor_access
CREATE TABLE IF NOT EXISTS surveyor_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    passkey VARCHAR(50) NOT NULL UNIQUE,
    surveyor_name VARCHAR(200) NOT NULL,
    allowed_pokja JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE surveyor_access ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_write_surveyor" ON surveyor_access;
CREATE POLICY "public_read_write_surveyor" ON surveyor_access FOR ALL USING (true) WITH CHECK (true);
