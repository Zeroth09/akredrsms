import { syncDriveDocuments } from './sync'

interface SyncStatus {
    isRunning: boolean
    lastSyncTime: Date | null
    error: string | null
}

class SyncService {
    private static instance: SyncService
    private interval: NodeJS.Timeout | null = null
    private status: SyncStatus = {
        isRunning: false,
        lastSyncTime: null,
        error: null
    }

    private constructor() { }

    static getInstance(): SyncService {
        if (!SyncService.instance) {
            SyncService.instance = new SyncService()
        }
        return SyncService.instance
    }

    start() {
        if (this.interval) {
            console.log('[SyncService] Already running')
            return
        }

        console.log('[SyncService] Starting auto-sync (every 10 minutes)')

        // Run immediately on start
        this.sync()

        // Then run every 10 minutes
        this.interval = setInterval(() => {
            this.sync()
        }, 10 * 60 * 1000) // 10 minutes
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
            console.log('[SyncService] Stopped')
        }
    }

    async sync(): Promise<void> {
        if (this.status.isRunning) {
            console.log('[SyncService] Sync already in progress, skipping')
            return
        }

        console.log('[SyncService] Starting sync...')
        this.status.isRunning = true
        this.status.error = null

        try {
            await syncDriveDocuments()
            this.status.lastSyncTime = new Date()
            console.log('[SyncService] Sync completed successfully')
        } catch (error) {
            this.status.error = error instanceof Error ? error.message : 'Unknown error'
            console.error('[SyncService] Sync failed:', error)
        } finally {
            this.status.isRunning = false
        }
    }

    getStatus(): SyncStatus {
        return { ...this.status }
    }
}

// Export singleton instance
export const syncService = SyncService.getInstance()

// Auto-start when module is loaded (server-side only)
if (typeof window === 'undefined') {
    syncService.start()
}
