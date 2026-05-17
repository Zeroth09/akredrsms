const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GOOGLE_PRIVATE_KEY="(.*?)"/s);
if (keyMatch) {
  const key = keyMatch[1];
  const cleaned = key.replace(/\\n/g, '\n').replace(/^"|"$/g, '').trim();
  const lines = cleaned.split('\n');
  console.log('Total lines:', lines.length);
  lines.forEach((l, i) => console.log('Line', i, 'length:', l.length, l === '-----BEGIN PRIVATE KEY-----' || l === '-----END PRIVATE KEY-----' ? '' : '(base64)'));
}
