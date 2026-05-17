'use client'

import { Pokja, PokjaStats, getColorClasses } from '@/lib/pokjaUtils'
import { CheckCircle, XCircle, FileText } from 'lucide-react'
import { clsx } from 'clsx'

interface PokjaCardProps {
    pokja: Pokja
    stats: PokjaStats
    onClick: () => void
}

export function PokjaCard({ pokja, stats, onClick }: PokjaCardProps) {
    const colors = getColorClasses(pokja.color)

    return (
        <div
            onClick={onClick}
            className={clsx(
                "group relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-300",
                "hover:scale-105 hover:shadow-2xl hover:-translate-y-1",
                colors.border,
                colors.bg
            )}
        >
            {/* Gradient Header */}
            <div className={clsx(
                "bg-gradient-to-br p-6 text-white",
                colors.gradient
            )}>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="text-3xl font-black tracking-tight mb-2">
                            {pokja.code}
                        </div>
                        <div className="text-sm font-medium opacity-90 line-clamp-2">
                            {pokja.name}
                        </div>
                    </div>
                    <FileText className="w-8 h-8 opacity-50" />
                </div>
            </div>

            {/* Stats Section */}
            <div className="p-6 space-y-4">
                {/* Progress Bar */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Progress</span>
                        <span className={clsx("text-lg font-bold", colors.text)}>
                            {stats.percentage}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className={clsx(
                                "h-full rounded-full transition-all duration-500 bg-gradient-to-r",
                                colors.gradient
                            )}
                            style={{ width: `${stats.percentage}%` }}
                        />
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Total EP */}
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">
                            {stats.totalEP}
                        </div>
                        <div className="text-xs text-gray-500 font-medium mt-1">
                            Total EP
                        </div>
                    </div>

                    {/* Kosong */}
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-center gap-1">
                            <XCircle className="w-4 h-4 text-red-600" />
                            <div className="text-2xl font-bold text-red-700">
                                {stats.kosong}
                            </div>
                        </div>
                        <div className="text-xs text-red-600 font-medium mt-1">
                            Kosong
                        </div>
                    </div>

                    {/* Terisi */}
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <div className="text-2xl font-bold text-green-700">
                                {stats.terisi}
                            </div>
                        </div>
                        <div className="text-xs text-green-600 font-medium mt-1">
                            Terisi
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    )
}
