import { getDocuments } from '../actions'
import { DocumentManagerClient } from './DocumentManagerClient'

export default async function DokumenPage() {
    const documents = await getDocuments()

    return <DocumentManagerClient documents={documents} />
}
