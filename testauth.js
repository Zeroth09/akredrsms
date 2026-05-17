const { google } = require('googleapis');
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata'];

async function testAuth() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (privateKey) {
        privateKey = privateKey.replace(/\\n/g, '\n');
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.slice(1, -1);
        }
        privateKey = privateKey.trim();
    }
    
    console.log("Client Email:", clientEmail);
    console.log("Private Key length:", privateKey.length);

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: SCOPES,
        });

        const drive = google.drive({ version: 'v3', auth });
        const res = await drive.files.list({ pageSize: 1, fields: 'files(id, name)' });
        console.log("Success! Found files:", res.data.files.length);
    } catch (e) {
        console.error("Auth Error:", e.message);
    }
}

testAuth();
