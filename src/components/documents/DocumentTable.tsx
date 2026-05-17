'use client'

import { useState } from 'react'
import { ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { Doc, findDocumentPokja } from '@/lib/pokjaUtils'
import { CategoryDropdown } from './CategoryDropdown'

interface DocumentTableProps {
    documents: Doc[]
    allDocuments: Doc[]
}

type SortField = 'name' | 'pokja' | 'category' | 'status' | 'date' | 'standar' | 'ep'
type SortDirection = 'asc' | 'desc'

export function DocumentTable({ documents, allDocuments }: DocumentTableProps) {
    const [sortField, setSortField] = useState<SortField>('date')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc') // Newest first
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 50

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    // Sort documents
    const sortedDocuments = [...documents].sort((a, b) => {
        let aValue: string | number
        let bValue: string | number

        switch (sortField) {
            case 'name':
                aValue = a.name
                bValue = b.name
                break
            case 'pokja':
                aValue = findDocumentPokja(a, allDocuments)?.code || ''
                bValue = findDocumentPokja(b, allDocuments)?.code || ''
                break
            case 'category':
                aValue = a.document_type || ''
                bValue = b.document_type || ''
                break
            case 'status':
                aValue = a.status
                bValue = b.status
                break
            case 'standar':
                aValue = a.standar || ''
                bValue = b.standar || ''
                break
            case 'ep':
                aValue = a.ep || ''
                bValue = b.ep || ''
                break
            case 'date':
                aValue = new Date(a.created_at).getTime()
                bValue = new Date(b.created_at).getTime()
                // For dates, we compare numbers
                const dateComparison = aValue - bValue
                return sortDirection === 'asc' ? dateComparison : -dateComparison
            default:
                return 0
        }

        const comparison = aValue.toString().localeCompare(bValue.toString())
        return sortDirection === 'asc' ? comparison : -comparison
    })

    // Pagination
    const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedDocuments = sortedDocuments.slice(startIndex, endIndex)

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null
        return sortDirection === 'asc' ? (
            <ChevronUp className="w-4 h-4 inline ml-1" />
        ) : (
            <ChevronDown className="w-4 h-4 inline ml-1" />
        )
    }

    if (documents.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-900">Tidak ada dokumen ditemukan</p>
                <p className="text-sm text-gray-600 mt-2">Coba ubah filter atau kata kunci pencarian</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('name')}
                            >
                                Nama File
                                <SortIcon field="name" />
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('date')}
                            >
                                Tanggal Upload
                                <SortIcon field="date" />
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('pokja')}
                            >
                                Pokja
                                <SortIcon field="pokja" />
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('category')}
                            >
                                Kategori
                                <SortIcon field="category" />
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('standar')}
                            >
                                Standar
                                <SortIcon field="standar" />
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('ep')}
                            >
                                EP
                                <SortIcon field="ep" />
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('status')}
                            >
                                Status
                                <SortIcon field="status" />
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedDocuments.map((doc) => {
                            const pokja = findDocumentPokja(doc, allDocuments)
                            const uploadDate = new Date(doc.created_at)
                            const formattedDate = uploadDate.toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })
                            const formattedTime = uploadDate.toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })

                            return (
                                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm text-gray-900 font-medium">{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{formattedDate}</div>
                                        <div className="text-xs text-gray-500">{formattedTime}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {pokja ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {pokja.code}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <CategoryDropdown document={doc} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {doc.standar ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                {doc.standar}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {doc.ep ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                {doc.ep}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.status === 'Verified'
                                                ? 'bg-green-100 text-green-800'
                                                : doc.status === 'Rejected'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {doc.web_view_link && (
                                            <a
                                                href={doc.web_view_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                View
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {startIndex + 1} to {Math.min(endIndex, sortedDocuments.length)} of {sortedDocuments.length} documents
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
