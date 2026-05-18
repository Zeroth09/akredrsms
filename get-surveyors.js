const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const envConfig = {};
envFile.split('\n').forEach(line => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) envConfig[key.trim()] = values.join('=').trim();
});

const supabase = createClient(envConfig['NEXT_PUBLIC_SUPABASE_URL'], envConfig['NEXT_PUBLIC_SUPABASE_ANON_KEY']);

async function getSurveyors() {
    const { data, error } = await supabase.from('surveyors').select('*');
    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
}

getSurveyors();
