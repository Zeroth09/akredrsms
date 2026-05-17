'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Doc } from '@/lib/pokjaUtils'
import { updateDocumentType } from '@/app/actions'

interface CategoryDropdownProps {
    document: Doc
}

const DOCUMENT_TYPES = ['SPO', 'Regulasi', 'SK', 'Pedoman', 'Panduan', 'KAK', 'Laporan', 'Lainnya']

export function CategoryDropdown({ document }: CategoryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(document.document_type)
    const [isSaving, setIsSaving] = useState(false)

    const handleCategoryChange = async (newCategory: string) => {
        setIsSaving(true)
        setCurrentCategory(newCategory)
        setIsOpen(false)

        try {
            await updateDocumentType(document.id, newCategory)
        } catch (error) {
            console.error('Failed to update category:', error)
            // Revert on error
            setCurrentCategory(document.document_type)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {currentCategory || 'Pilih Kategori'}
                <ChevronDown className="w-4 h-4" />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
                        {DOCUMENT_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => handleCategoryChange(type)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-between"
                            >
                                {type}
                                {currentCategory === type && (
                                    <Check className="w-4 h-4 text-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
