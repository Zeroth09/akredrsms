import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
    POKJA_LIST,
    calculatePokjaStats,
    enumerateEPRowsForExport,
    aggregateDashboardEPStats,
    type Doc,
} from '@/lib/pokjaUtils'

/**
 * GET /api/dashboard2
 *
 * API publik untuk feed data Dashboard Akreditasi ke Google Apps Script / Sheets.
 *
 * Query params:
 *   - key    : API key sederhana (opsional, dikonfigurasi via env API_DASHBOARD_KEY)
 *   - view   : "summary" | "detail" | "all" (default: "all")
 *
 * Response JSON:
 *   { summary, details, meta }
 */
export async function GET(request: NextRequest) {
    // --- Validasi API Key (opsional) ---
    const configuredKey = process.env.API_DASHBOARD_KEY
    if (configuredKey) {
        const providedKey = request.nextUrl.searchParams.get('key')
        if (providedKey !== configuredKey) {
            return NextResponse.json(
                { error: 'Unauthorized. API key salah atau tidak diberikan.' },
                { status: 401 }
            )
        }
    }

    const view = request.nextUrl.searchParams.get('view') ?? 'all'

    try {
        const allDocs = await fetchAllDocuments()

        const response: Record<string, unknown> = {}

        // --- Summary per Pokja ---
        if (view === 'summary' || view === 'all') {
            response.summary = POKJA_LIST.map((pokja) => {
                const stats = calculatePokjaStats(pokja, allDocs)
                return {
                    kode: pokja.code,
                    nama: pokja.name,
                    totalEP: stats.totalEP,
                    terisi: stats.terisi,
                    kosong: stats.kosong,
                    persentase: stats.percentage,
                }
            })
        }

        // --- Detail per EP (flat, cocok untuk sheet) ---
        if (view === 'detail' || view === 'all') {
            const rows = enumerateEPRowsForExport(allDocs)
            response.details = rows.map((r) => ({
                pokja: r.pokjaCode,
                standar: r.standarName,
                ep: r.epName,
                jumlahFile: r.fileCount,
                terisi: r.terisi,
            }))
        }

        // --- Meta / Agregat ---
        const agg = aggregateDashboardEPStats(allDocs)
        response.meta = {
            totalPokja: POKJA_LIST.length,
            totalEP: agg.total,
            totalTerisi: agg.terisi,
            totalKosong: agg.kosong,
            persentaseKeseluruhan: agg.percentage,
            waktuAmbil: new Date().toISOString(),
        }

        return NextResponse.json(response, {
            status: 200,
            headers: {
                // Izinkan CORS agar Google Apps Script bisa akses
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                // Cache 5 menit supaya tidak terlalu berat
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
            },
        })
    } catch (error) {
        console.error('[API dashboard2] Error:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data dashboard.' },
            { status: 500 }
        )
    }
}

// Preflight CORS untuk Google Apps Script
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}

// --- Helper: Fetch semua dokumen dari Supabase (logika sama dengan getDocuments di actions.ts) ---
async function fetchAllDocuments(): Promise<Doc[]> {
    let allDocuments: any[] = []
    let from = 0
    const pageSize = 1000
    let hasMore = true

    while (hasMore) {
        const { data, error } = await supabase
            .from('documents')
            .select(`
                *,
                categories (
                    name
                )
            `)
            .order('name', { ascending: true })
            .order('gdrive_id', { ascending: true })
            .range(from, from + pageSize - 1)

        if (error) {
            console.error('[API dashboard2] Supabase error:', error)
            break
        }

        if (data && data.length > 0) {
            allDocuments = [...allDocuments, ...data]
            from += pageSize
            hasMore = data.length === pageSize
        } else {
            hasMore = false
        }
    }

    // Dedupe berdasarkan gdrive_id
    const seenIds = new Set<string>()
    allDocuments = allDocuments.filter((d) => {
        const id = d.gdrive_id as string
        if (!id || seenIds.has(id)) return false
        seenIds.add(id)
        return true
    })

    return allDocuments as Doc[]
}
