import { AsesorV2Client } from './AsesorV2Client'
import { getActiveSession, getStandarEPHierarchy, getAssessmentsCatatan } from '@/app/actions'

export const metadata = {
    title: 'Asesmen V2 — Akreditasi Monitor',
    description: 'Halaman asesmen internal v2 dengan catatan per EP',
}

export default async function AsesorV2Page() {
    const [session, hierarchy] = await Promise.all([
        getActiveSession(),
        getStandarEPHierarchy(),
    ])

    let initialCatatan: Record<string, string> = {}
    if (session?.assessment_id) {
        initialCatatan = await getAssessmentsCatatan(session.assessment_id)
    }

    return (
        <AsesorV2Client
            session={session}
            hierarchy={hierarchy}
            initialCatatan={initialCatatan}
        />
    )
}
