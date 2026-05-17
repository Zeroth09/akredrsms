import { getDocuments } from '../actions'
import { DashboardClient } from './DashboardClient'

export default async function Dashboard2Page() {
    const documents = await getDocuments()

    return <DashboardClient documents={documents} />
}
