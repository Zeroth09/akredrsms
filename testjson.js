const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata'];

async function testAuthJson() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'refined-algebra-487309-f0-954e9a68db95.json',
            scopes: SCOPES,
        });

        const drive = google.drive({ version: 'v3', auth });
        const res = await drive.files.list({ pageSize: 1, fields: 'files(id, name)' });
        console.log("Success! Found files:", res.data.files.length);
    } catch (e) {
        console.error("Auth Error with keyFile:", e.message);
    }
}

testAuthJson();
