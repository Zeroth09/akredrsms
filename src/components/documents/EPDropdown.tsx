'use client'

import { useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { Doc } from '@/lib/pokjaUtils'
import { updateDocumentEP } from '@/app/actions'

interface EPDropdownProps {
    document: Doc
    allDocuments: Doc[]
}

export function EPDropdown({ document, allDocuments }: EPDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentEP, setCurrentEP] = useState(document.ep)
    const [isSaving, setIsSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Get unique EP names for the same standard if possible, otherwise all
    const uniqueEPs = Array.from(new Set(
        allDocuments
            .filter(d => d.ep && (document.standar ? d.standar === document.standar : true))
            .map(d => d.ep as string)
    )).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    const filteredEPs = uniqueEPs.filter(e => 
        e.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleEPChange = async (newEP: string | null) => {
        setIsSaving(true)
        setCurrentEP(newEP)
        setIsOpen(false)

        try {
            await updateDocumentEP(document.id, newEP)
        } catch (error) {
            console.error('Failed to update EP:', error)
            setCurrentEP(document.ep)
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
                <span className="truncate max-w-[80px]">
                    {currentEP || 'Pilih EP'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1 flex flex-col max-h-80">
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
                                onClick={() => handleEPChange(null)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 flex items-center justify-between"
                            >
                                (Kosong)
                                {!currentEP && <Check className="w-4 h-4 text-blue-600" />}
                            </button>
                            {filteredEPs.map(ep => (
                                <button
                                    key={ep}
                                    onClick={() => handleEPChange(ep)}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                                >
                                    {ep}
                                    {currentEP === ep && <Check className="w-4 h-4 text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
