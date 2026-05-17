'use client'

import { useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { Doc } from '@/lib/pokjaUtils'
import { updateDocumentStandar } from '@/app/actions'

interface StandarDropdownProps {
    document: Doc
    allDocuments: Doc[]
}

export function StandarDropdown({ document, allDocuments }: StandarDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStandar, setCurrentStandar] = useState(document.standar)
    const [isSaving, setIsSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Get unique standard names from current documents
    const uniqueStandars = Array.from(new Set(
        allDocuments
            .filter(d => d.standar)
            .map(d => d.standar as string)
    )).sort()

    const filteredStandars = uniqueStandars.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleStandarChange = async (newStandar: string | null) => {
        setIsSaving(true)
        setCurrentStandar(newStandar)
        setIsOpen(false)

        try {
            await updateDocumentStandar(document.id, newStandar)
        } catch (error) {
            console.error('Failed to update standar:', error)
            setCurrentStandar(document.standar)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
            >
                <span className="truncate max-w-[120px]">
                    {currentStandar || 'Pilih Standar'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1 flex flex-col max-h-80">
                        <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto">
                            <button
                                onClick={() => handleStandarChange(null)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-between"
                            >
                                (Kosong)
                                {!currentStandar && <Check className="w-4 h-4 text-blue-600" />}
                            </button>
                            {filteredStandars.map(standar => (
                                <button
                                    key={standar}
                                    onClick={() => handleStandarChange(standar)}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                                >
                                    {standar}
                                    {currentStandar === standar && <Check className="w-4 h-4 text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
