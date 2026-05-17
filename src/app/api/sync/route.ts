import { NextRequest, NextResponse } from 'next/server'
import { syncService } from '@/lib/sync-service'

// GET /api/sync - Get sync status
export async function GET() {
    const status = syncService.getStatus()

    return NextResponse.json({
        isRunning: status.isRunning,
        lastSyncTime: status.lastSyncTime?.toISOString() || null,
        error: status.error
    })
}

// POST /api/sync - Trigger manual sync
export async function POST() {
    try {
        await syncService.sync()
        const status = syncService.getStatus()

        return NextResponse.json({
            success: true,
            lastSyncTime: status.lastSyncTime?.toISOString() || null
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Sync failed'
        }, { status: 500 })
    }
}
