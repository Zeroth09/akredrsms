
'use client'

import { useState, useTransition } from 'react'
import { updateDocumentStatus, updateDocumentCategory } from '@/app/actions'
import { CheckCircle, XCircle, AlertCircle, FileText, ExternalLink, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Category {
    id: string
    name: string
}

interface Document {
    id: string
    name: string
    status: string
    category_id: string | null
    last_synced_at: string
    web_view_link: string | null
    categories: { name: string } | null
}

interface DocumentRowProps {
    doc: Document
    categories: Category[]
}

export function DocumentRow({ doc, categories }: DocumentRowProps) {
    const [isPending, startTransition] = useTransition()
    const [status, setStatus] = useState(doc.status)
    const [categoryId, setCategoryId] = useState(doc.category_id || '')

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus)
        startTransition(async () => {
            await updateDocumentStatus(doc.id, newStatus)
        })
    }

    const handleCategoryChange = (newCategoryId: string) => {
        setCategoryId(newCategoryId)
        startTransition(async () => {
            await updateDocumentCategory(doc.id, newCategoryId)
        })
    }

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="truncate max-w-[300px]" title={doc.name}>{doc.name}</span>
            </td>
            <td className="px-6 py-4">
                <select
                    value={categoryId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    disabled={isPending}
                    className="bg-transparent text-sm border-none focus:ring-0 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 -ml-2 w-full max-w-[150px]"
                >
                    <option value="">Uncategorized</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </td>
            <td className="px-6 py-4">
                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={isPending}
                        className={twMerge(
                            "appearance-none pl-8 pr-8 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all",
                            status === 'Lengkap' ? 'bg-green-50 text-green-700 border-green-200 focus:ring-green-500' :
                                status === 'Tidak Lengkap' ? 'bg-red-50 text-red-700 border-red-200 focus:ring-red-500' :
                                    'bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-yellow-500'
                        )}
                    >
                        <option value="Lengkap">Lengkap</option>
                        <option value="Tidak Lengkap">Tidak Lengkap</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        {status === 'Lengkap' && <CheckCircle className="w-3 h-3 text-green-700" />}
                        {status === 'Tidak Lengkap' && <XCircle className="w-3 h-3 text-red-700" />}
                        {status === 'Pending' && <AlertCircle className="w-3 h-3 text-yellow-700" />}
                    </div>
                    <ChevronDown className={twMerge(
                        "absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50",
                        status === 'Lengkap' ? 'text-green-700' :
                            status === 'Tidak Lengkap' ? 'text-red-700' :
                                'text-yellow-700'
                    )} />
                </div>
            </td>
            <td className="px-6 py-4 text-gray-500 text-sm">
                {new Date(doc.last_synced_at).toLocaleDateString('id-ID')}
            </td>
            <td className="px-6 py-4">
                {doc.web_view_link && (
                    <a
                        href={doc.web_view_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 text-sm"
                    >
                        Buka <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </td>
        </tr>
    )
}
