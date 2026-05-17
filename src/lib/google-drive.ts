
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata']

export const getGoogleDriveClient = async () => {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    let privateKey = process.env.GOOGLE_PRIVATE_KEY

    if (privateKey) {
        // Tangani jika ada literal string "\n" (biasanya akibat copy-paste dari JSON)
        privateKey = privateKey.replace(/\\n/g, '\n')
        
        // Hapus tanda kutip jika ikut tertulis di awal/akhir string
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.slice(1, -1)
        }
        
        // Bersihkan whitespace tambahan
        privateKey = privateKey.trim()
    }

    if (!clientEmail || !privateKey) {
        throw new Error('Missing Google Service Account credentials')
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey,
        },
        scopes: SCOPES,
    })

    return google.drive({ version: 'v3', auth })
}
