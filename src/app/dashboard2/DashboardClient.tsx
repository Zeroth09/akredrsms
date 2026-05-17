'use client'

import { useState, useMemo } from 'react'
import { PokjaCard } from '@/components/dashboard/PokjaCard'
import { StandarEPModal } from '@/components/dashboard/StandarEPModal'
import { POKJA_LIST, Pokja, calculatePokjaStats, Doc } from '@/lib/pokjaUtils'
import { LayoutGrid } from 'lucide-react'

interface DashboardClientProps {
    documents: Doc[]
}

export function DashboardClient({ documents }: DashboardClientProps) {
    const [selectedPokja, setSelectedPokja] = useState<Pokja | null>(null)

    // Calculate stats for all Pokja
    const pokjaWithStats = useMemo(() => {
        return POKJA_LIST.map(pokja => ({
            pokja,
            stats: calculatePokjaStats(pokja, documents)
        }))
    }, [documents])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <LayoutGrid className="w-8 h-8 text-red-600" />
                            Dashboard Akreditasi
                        </h1>
                        <p className="text-gray-600 mt-1">Kelompok Pokja - Standar & Elemen Penilaian</p>
                    </div>
                </div>
            </div>

            {/* Pokja Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pokjaWithStats.map(({ pokja, stats }) => (
                        <PokjaCard
                            key={pokja.code}
                            pokja={pokja}
                            stats={stats}
                            onClick={() => setSelectedPokja(pokja)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedPokja && (
                <StandarEPModal
                    pokja={selectedPokja}
                    documents={documents}
                    isOpen={!!selectedPokja}
                    onClose={() => setSelectedPokja(null)}
                />
            )}
        </div>
    )
}
