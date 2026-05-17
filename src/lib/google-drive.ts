
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata']

export const getGoogleDriveClient = async () => {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

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
