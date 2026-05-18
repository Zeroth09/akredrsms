import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  const sql = fs.readFileSync(path.join(process.cwd(), 'migration_pic_fields.sql'), 'utf-8');
  
  // To run raw SQL from client, we can use RPC if available or we just log that user needs to run it.
  // Actually, supabase JS client doesn't support running raw SQL directly without RPC.
  // We can try to just select to see if the columns exist, and if not, tell the user.
  const { data, error } = await supabase.from('assessments').select('rekomendasi_pic, status_pic').limit(1);
  if (error) {
    console.error('Migration might be needed. Please run migration_pic_fields.sql in your Supabase SQL Editor.');
    console.error(error);
  } else {
    console.log('Columns already exist or migration successful.');
  }
}

runMigration();
