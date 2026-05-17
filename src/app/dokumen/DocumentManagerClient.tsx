'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Doc, POKJA_LIST, findDocumentPokja } from '@/lib/pokjaUtils'
import { DocumentTable } from '@/components/documents/DocumentTable'
import { SyncStatus } from '@/components/SyncStatus'

interface DocumentManagerClientProps {
    documents: Doc[]
}

const DOCUMENT_TYPES = ['SPO', 'Regulasi', 'SK', 'Pedoman', 'Panduan', 'KAK', 'Laporan', 'Lainnya']
const STATUS_OPTIONS = ['Pending', 'Verified', 'Rejected']

export function DocumentManagerClient({ documents }: DocumentManagerClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPokja, setSelectedPokja] = useState<string>('all')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedStandar, setSelectedStandar] = useState<string>('all')
    const [selectedEP, setSelectedEP] = useState<string>('all')

    // Filter only files (not folders)
    const files = useMemo(() => {
        const result = documents.filter(doc => doc.mime_type !== 'application/vnd.google-apps.folder')
        console.log(`[Dokumen] Total files: ${result.length}`)

        // Debug: Check how many have Pokja
        const filesWithPokja = result.filter(file => {
            const pokja = findDocumentPokja(file, documents)
            return pokja !== null
        })
        console.log(`[Dokumen] Files with Pokja: ${filesWithPokja.length}`)

        // Debug: Show Pokja distribution
        const pokjaDistribution: Record<string, number> = {}
        result.forEach(file => {
            const pokja = findDocumentPokja(file, documents)
            const pokjaCode = pokja?.code || 'NO_POKJA'
            pokjaDistribution[pokjaCode] = (pokjaDistribution[pokjaCode] || 0) + 1
        })
        console.log('[Dokumen] Pokja distribution:', pokjaDistribution)

        return result
    }, [documents])

    // Apply filters
    const filteredFiles = useMemo(() => {
        let result = files

        // Search filter
        if (searchQuery) {
            result = result.filter(file =>
                file.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Pokja filter
        if (selectedPokja !== 'all') {
            result = result.filter(file => {
                const pokja = findDocumentPokja(file, documents)
                return pokja?.code === selectedPokja
            })
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(file => file.document_type === selectedCategory)
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(file => file.status === selectedStatus)
        }

        // Standar filter
        if (selectedStandar !== 'all') {
            result = result.filter(file => file.standar === selectedStandar)
        }

        // EP filter
        if (selectedEP !== 'all') {
            result = result.filter(file => file.ep === selectedEP)
        }

        return result
    }, [files, searchQuery, selectedPokja, selectedCategory, selectedStatus, selectedStandar, selectedEP, documents])

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedPokja('all')
        setSelectedCategory('all')
        setSelectedStatus('all')
        setSelectedStandar('all')
        setSelectedEP('all')
    }

    const hasActiveFilters = searchQuery || selectedPokja !== 'all' || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedStandar !== 'all' || selectedEP !== 'all'

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Manajemen Dokumen</h1>
                                <p className="text-gray-600 mt-1">Kelola dan kategorisasi semua dokumen akreditasi</p>
                            </div>
                        </div>

                        {/* Sync Status */}
                        <SyncStatus />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{filteredFiles.length}</span>
                        <span>dari</span>
                        <span className="font-medium">{files.length}</span>
                        <span>dokumen</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Search className="w-4 h-4 inline mr-1" />
                                Cari Dokumen
                            </label>
                            <input
                                type="text"
                                placeholder="Nama file..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 bg-white"
                            />
                        </div>

                        {/* Pokja Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Filter className="w-4 h-4 inline mr-1" />
                                Pokja
                            </label>
                            <select
                                value={selectedPokja}
                                onChange={(e) => setSelectedPokja(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            >
                                <option value="all" className="text-gray-900">Semua Pokja</option>
                                {POKJA_LIST.map(pokja => (
                                    <option key={pokja.code} value={pokja.code} className="text-gray-900">{pokja.code}</option>
                                ))}
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            >
                                <option value="all" className="text-gray-900">Semua Kategori</option>
                                {DOCUMENT_TYPES.map(type => (
                                    <option key={type} value={type} className="text-gray-900">{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Standar Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Standar
                            </label>
                            <select
                                value={selectedStandar}
                                onChange={(e) => setSelectedStandar(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            >
                                <option value="all" className="text-gray-900">Semua Standar</option>
                                {Array.from(new Set(files.map(f => f.standar).filter(Boolean))).sort().map(s => (
                                    <option key={s!} value={s!} className="text-gray-900">{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* EP Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                EP
                            </label>
                            <select
                                value={selectedEP}
                                onChange={(e) => setSelectedEP(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            >
                                <option value="all" className="text-gray-900">Semua EP</option>
                                {Array.from(new Set(files.map(f => f.ep).filter(Boolean)))
                                    .sort((a, b) => a!.localeCompare(b!, undefined, { numeric: true }))
                                    .map(e => (
                                        <option key={e!} value={e!} className="text-gray-900">{e}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Document Table */}
                <DocumentTable documents={filteredFiles} allDocuments={documents} />
            </div>
        </div>
    )
}
