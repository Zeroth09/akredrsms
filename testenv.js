const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const key = process.env.GOOGLE_PRIVATE_KEY;
console.log('Next.js ENV key length:', key ? key.length : 'null');
if (key) {
    console.log('Contains actual newline?', key.includes('\n'));
    console.log('Contains literal \\\\n?', key.includes('\\n'));
    console.log('First 40 chars:', key.substring(0, 40));
    console.log('Last 40 chars:', key.substring(key.length - 40));
}
