const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GOOGLE_PRIVATE_KEY="(.*?)"/s) || env.match(/GOOGLE_PRIVATE_KEY=(.*)/);
if (keyMatch) {
    let key = keyMatch[1];
    console.log('Raw key from regex:', key ? key.substring(0, 50) + '...' + key.substring(key.length - 50) : 'null');
    console.log('Contains literal \\\\n?', key.includes('\\n'));
    console.log('Contains actual newline?', key.includes('\n'));
    let cleaned = key.replace(/\\n/g, '\n');
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) cleaned = cleaned.slice(1, -1);
    cleaned = cleaned.trim();
    console.log('Cleaned key length:', cleaned.length, 'Contains actual newline?', cleaned.includes('\n'), 'Contains literal \\\\n?', cleaned.includes('\\n'));
    
    // Check if it's a valid PEM
    console.log('Starts with BEGIN?', cleaned.startsWith('-----BEGIN PRIVATE KEY-----'));
    console.log('Ends with END?', cleaned.endsWith('-----END PRIVATE KEY-----'));
} else {
    console.log("Not found in regex");
}
