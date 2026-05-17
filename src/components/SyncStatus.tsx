'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Clock } from 'lucide-react'

interface SyncStatus {
    isRunning: boolean
    lastSyncTime: string | null
    error: string | null
}

export function SyncStatus() {
    const [status, setStatus] = useState<SyncStatus>({
        isRunning: false,
        lastSyncTime: null,
        error: null
    })
    const [isSyncing, setIsSyncing] = useState(false)

    // Fetch sync status
    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/sync')
            const data = await res.json()
            setStatus(data)
        } catch (error) {
            console.error('Failed to fetch sync status:', error)
        }
    }

    // Manual sync trigger
    const handleManualSync = async () => {
        setIsSyncing(true)
        try {
            const res = await fetch('/api/sync', { method: 'POST' })
            const data = await res.json()

            if (data.success) {
                await fetchStatus()
            }
        } catch (error) {
            console.error('Manual sync failed:', error)
        } finally {
            setIsSyncing(false)
        }
    }

    // Auto-refresh status every 30 seconds
    useEffect(() => {
        fetchStatus()
        const interval = setInterval(fetchStatus, 30000)
        return () => clearInterval(interval)
    }, [])

    const formatLastSync = (lastSyncTime: string | null) => {
        if (!lastSyncTime) return 'Never'

        const date = new Date(lastSyncTime)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)

        if (diffMins < 1) return 'Just now'
        if (diffMins === 1) return '1 minute ago'
        if (diffMins < 60) return `${diffMins} minutes ago`

        const diffHours = Math.floor(diffMins / 60)
        if (diffHours === 1) return '1 hour ago'
        if (diffHours < 24) return `${diffHours} hours ago`

        return date.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <Clock className="w-4 h-4 text-gray-500" />
            <div className="flex flex-col">
                <span className="text-xs text-gray-500">Last Sync</span>
                <span className="text-sm font-medium text-gray-900">
                    {formatLastSync(status.lastSyncTime)}
                </span>
            </div>

            <button
                onClick={handleManualSync}
                disabled={isSyncing || status.isRunning}
                className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Sync now"
            >
                <RefreshCw className={`w-4 h-4 ${(isSyncing || status.isRunning) ? 'animate-spin' : ''}`} />
            </button>
        </div>
    )
}
