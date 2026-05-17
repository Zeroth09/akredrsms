const { google } = require('googleapis');

// Completely isolate from any env variables
delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
delete process.env.GOOGLE_PRIVATE_KEY;
delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

async function testIsolatedJson() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'refined-algebra-487309-f0-954e9a68db95.json',
            scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata'],
        });

        const drive = google.drive({ version: 'v3', auth });
        const res = await drive.files.list({ pageSize: 1, fields: 'files(id, name)' });
        console.log("Success! Found files:", res.data.files.length);
    } catch (e) {
        console.error("Auth Error with isolated keyFile:", e.message);
        if (e.response && e.response.data) {
            console.error("Error data:", e.response.data);
        }
    }
}

testIsolatedJson();
