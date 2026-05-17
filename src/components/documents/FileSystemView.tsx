'use client'

import { useState, useMemo } from 'react'
import { Folder, FileText, ChevronRight, ChevronDown, ExternalLink, CheckCircle, XCircle, AlertCircle, FileType, Download, FileBarChart } from 'lucide-react'
import { exportEPDataToExcel } from '@/lib/exportExcel'
import { exportReportPDF, exportLaporanIndividuPDF } from '@/lib/exportPDF'
import { PokjaFilterModal } from './PokjaFilterModal'
import type { TipeLaporan } from './PokjaFilterModal'
import { clsx } from 'clsx'
import { updateDocumentStatus, updateDocumentCategory, updateDocumentType } from '@/app/actions'
import { countFilesRecursiveUnderFolder, isEPFolderName } from '@/lib/standarEpHierarchy'

interface Category {
    id: string
    name: string
}

interface Doc {
    id: string
    gdrive_id: string
    name: string
    status: string
    category_id: string | null
    last_synced_at: string
    web_view_link: string | null
    categories: { name: string } | null
    parent_id: string | null
    mime_type: string
    document_type: string | null
}

interface FileSystemViewProps {
    documents: Doc[]
    categories: Category[]
}

// Helper functions for folder hierarchy (using const to ensure proper hoisting)
const getFolderDepth = (folder: Doc, allDocs: Doc[], depth = 1): number => {
    if (!folder.parent_id) return depth
    const parent = allDocs.find((d) => d.gdrive_id === folder.parent_id)
    if (!parent) return depth
    return getFolderDepth(parent, allDocs, depth + 1)
}

const isEPFolder = (folder: Doc, _allDocs: Doc[]): boolean => {
    return folder.mime_type === 'application/vnd.google-apps.folder' && isEPFolderName(folder.name)
}

const findPokjaParent = (doc: Doc, allDocs: Doc[]): Doc | null => {
    let current = doc
    let depth = getFolderDepth(doc, allDocs)
    while (depth > 3 && current.parent_id) {
        const parent = allDocs.find((d) => d.gdrive_id === current.parent_id)
        if (!parent) break
        current = parent
        depth--
    }
    return depth === 3 ? current : null
}

const computeEPStatus = (documents: Doc[]) => {
    const statusMap = new Map<string, { isEmpty: boolean; fileCount: number; hasUnverified: boolean }>()
    documents.forEach(doc => {
        if (doc.mime_type !== 'application/vnd.google-apps.folder') return
        if (isEPFolder(doc, documents)) {
            const fileCount = countFilesRecursiveUnderFolder(doc.gdrive_id, documents)
            statusMap.set(doc.gdrive_id, {
                isEmpty: fileCount === 0,
                fileCount,
                hasUnverified: fileCount > 0 && doc.status === 'Pending'
            })
        }
    })
    return statusMap
}

const DOCUMENT_TYPES = ['SPO', 'Regulasi', 'SK', 'Pedoman', 'Panduan', 'KAK', 'Laporan', 'Lainnya']

const FolderItem = ({
    folder,
    allDocs,
    categories,
    level = 0
}: {
    folder: Doc
    allDocs: Doc[]
    categories: Category[]
    level?: number
}) => {
    const [isOpen, setIsOpen] = useState(false)

    // Check if this is an EP folder
    const isEP = isEPFolder(folder, allDocs)

    // Get EP status if applicable
    const epStatusMap = computeEPStatus(allDocs)
    const epStatus = isEP ? epStatusMap.get(folder.gdrive_id) : null

    // Find children
    const children = allDocs.filter(d => d.parent_id === folder.gdrive_id)
    const childFolders = children.filter(d => d.mime_type === 'application/vnd.google-apps.folder')
    const childFiles = children.filter(d => d.mime_type !== 'application/vnd.google-apps.folder')

    return (
        <div className="select-none">
            {/* Folder Row */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors hover:bg-red-50/50 border-b border-gray-100",
                    level > 0 && "pl-8"
                )}
                style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
            >
                <div className="text-gray-400">
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
                <Folder className={clsx("w-5 h-5", isOpen ? "text-red-600 fill-red-100" : "text-gray-400")} />
                <span className="font-medium text-gray-700">{folder.name}</span>
                <span className="text-xs text-gray-400 ml-2">({children.length} item)</span>

                {/* EP Status Badge */}
                {isEP && epStatus && (
                    <div className="ml-auto">
                        {epStatus.isEmpty ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                                <XCircle className="w-3 h-3" />
                                Kosong
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                                <AlertCircle className="w-3 h-3" />
                                Terisi ({epStatus.fileCount}) - Belum Terverifikasi
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Children */}
            {isOpen && (
                <div className="bg-slate-50/30">
                    {childFolders.map(subFolder => (
                        <FolderItem
                            key={subFolder.id}
                            folder={subFolder}
                            allDocs={allDocs}
                            categories={categories}
                            level={level + 1}
                        />
                    ))}
                    {childFiles.map(file => (
                        <div
                            key={file.id}
                            className="border-b border-gray-100 last:border-0 hover:bg-white transition-colors"
                            style={{ paddingLeft: `${(level + 1) * 1.5}rem` }}
                        >
                            <FileRow doc={file} categories={categories} />
                        </div>
                    ))}
                    {children.length === 0 && (
                        <div className="py-2 px-8 text-xs text-gray-400 italic" style={{ paddingLeft: `${(level + 1) * 1.5 + 2}rem` }}>
                            Folder kosong
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const FileRow = ({ doc, categories }: { doc: Doc, categories: Category[] }) => {

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateDocumentStatus(doc.id, e.target.value)
    }
    const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateDocumentCategory(doc.id, e.target.value)
    }
    const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateDocumentType(doc.id, e.target.value)
    }

    return (
        <div className="flex items-center gap-4 py-3 pr-4 group">
            {/* Name */}
            <div className="flex items-center gap-3 flex-1 min-w-0 pl-10">
                <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate text-sm text-gray-700 font-medium">{doc.name}</span>
            </div>

            {/* Document Type (SPO, etc) */}
            <div className="w-24 flex-shrink-0">
                <select
                    defaultValue={doc.document_type || ''}
                    onChange={handleTypeChange}
                    className="w-full bg-transparent text-xs border border-gray-100 group-hover:border-gray-300 focus:border-red-500 rounded px-2 py-1 cursor-pointer text-gray-600 focus:outline-none transition-colors appearance-none"
                    style={{ backgroundImage: 'none' }}
                    title="Jenis Dokumen"
                >
                    <option value="" className="text-gray-400">Jenis...</option>
                    {DOCUMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Category (Unit) */}
            <div className="w-32 md:w-36 flex-shrink-0">
                <select
                    defaultValue={doc.category_id || ''}
                    onChange={handleCategoryChange}
                    className="w-full bg-transparent text-xs border-none focus:ring-0 cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2 py-1 truncate"
                >
                    <option value="">Uncategorized</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            {/* Status */}
            <div className="w-32 flex-shrink-0">
                <div className="relative">
                    <select
                        defaultValue={doc.status}
                        onChange={handleStatusChange}
                        className={clsx(
                            "w-full appearance-none pl-7 pr-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all",
                            doc.status === 'Lengkap' ? 'bg-green-50 text-green-700 border-green-200 focus:ring-green-500' :
                                doc.status === 'Tidak Lengkap' ? 'bg-red-50 text-red-700 border-red-200 focus:ring-red-500' :
                                    'bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-yellow-500'
                        )}
                    >
                        <option value="Lengkap">LENGKAP</option>
                        <option value="Tidak Lengkap">TDK LENGKAP</option>
                        <option value="Pending">PENDING</option>
                    </select>
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        {doc.status === 'Lengkap' && <CheckCircle className="w-3 h-3 text-green-700" />}
                        {doc.status === 'Tidak Lengkap' && <XCircle className="w-3 h-3 text-red-700" />}
                        {doc.status === 'Pending' && <AlertCircle className="w-3 h-3 text-yellow-700" />}
                    </div>
                </div>
            </div>

            {/* Link */}
            <div className="w-8 flex-shrink-0">
                {doc.web_view_link && (
                    <a href={doc.web_view_link} target="_blank" className="text-gray-400 hover:text-red-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>
    )
}

export function FileSystemView({ documents, categories }: FileSystemViewProps) {
    const [selectedPokja, setSelectedPokja] = useState<string>('all')
    const [isExporting, setIsExporting] = useState(false)

    const handleExportExcel = async () => {
        setIsExporting(true)
        try {
            exportEPDataToExcel(documents)
        } finally {
            setIsExporting(false)
        }
    }

    const [isExportingPDF, setIsExportingPDF] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleGenerate = async (selectedPokjas: string[], tipe: TipeLaporan) => {
        setIsExportingPDF(true)
        try {
            if (tipe === 'umum') {
                exportReportPDF(documents, selectedPokjas)
            } else {
                // Laporan individu: download satu per satu dengan delay antar file
                for (let i = 0; i < selectedPokjas.length; i++) {
                    exportLaporanIndividuPDF(documents, selectedPokjas[i])
                    if (i < selectedPokjas.length - 1) {
                        // Delay 800ms antar file agar browser tidak memblokir download
                        await new Promise(resolve => setTimeout(resolve, 800))
                    }
                }
            }
        } finally {
            setIsExportingPDF(false)
            setIsModalOpen(false)
        }
    }

    const allIds = new Set(documents.map(d => d.gdrive_id))

    // TRUE root items (no parent at all)
    const rootDocs = documents.filter(d => !d.parent_id)

    // Orphans (have parent_id but parent not in our list)
    const orphans = documents.filter(d => d.parent_id && !allIds.has(d.parent_id))

    // Combine true roots and orphans for display at root level
    const combinedRootDocs = [...rootDocs, ...orphans]

    const epStatusMap = useMemo(() => computeEPStatus(documents), [documents])

    // Filter by Pokja if selected
    const filteredRootDocs = selectedPokja === 'all' ? combinedRootDocs : combinedRootDocs.filter(doc => {
        if (doc.name.includes('DOKUMEN AKREDITASI')) {
            // Always show DOKUMEN AKREDITASI folder
            return true
        }

        // Inline findPokjaParent logic
        const findPokjaParentInline = (d: Doc): Doc | null => {
            const getFolderDepthInline = (folder: Doc, depth = 1): number => {
                if (!folder.parent_id) return depth
                const parent = documents.find((p) => p.gdrive_id === folder.parent_id)
                if (!parent) return depth
                return getFolderDepthInline(parent, depth + 1)
            }

            let current = d
            let depth = getFolderDepthInline(d)
            while (depth > 3 && current.parent_id) {
                const parent = documents.find((p) => p.gdrive_id === current.parent_id)
                if (!parent) break
                current = parent
                depth--
            }
            return depth === 3 ? current : null
        }

        const pokjaParent = findPokjaParentInline(doc)
        if (!pokjaParent) return true

        if (selectedPokja === 'KMRS') return pokjaParent.name.includes('MANAJEMEN RUMAH SAKIT')
        if (selectedPokja === 'KPS') return pokjaParent.name.includes('PELAYANAN BERFOKUS')
        if (selectedPokja === 'KSKP') return pokjaParent.name.includes('SASARAN KESELAMATAN')
        return false
    })

    const rootFolders = filteredRootDocs.filter(d => d.mime_type === 'application/vnd.google-apps.folder')
    const rootFiles = filteredRootDocs.filter(d => d.mime_type !== 'application/vnd.google-apps.folder')

    // EP Statistics
    let epStats = { total: 0, empty: 0, filled: 0 }
    epStatusMap.forEach((status: { isEmpty: boolean; fileCount: number; hasUnverified: boolean }) => {
        epStats.total++
        status.isEmpty ? epStats.empty++ : epStats.filled++
    })

    // Debug: Log DOKUMEN AKREDITASI folder and its children
    const dokumenAkreditasi = documents.find(d => d.name === 'DOKUMEN AKREDITASI 2025-2026')
    if (dokumenAkreditasi) {
        console.log('[DEBUG] DOKUMEN AKREDITASI folder:', dokumenAkreditasi)
        const children = documents.filter(d => d.parent_id === dokumenAkreditasi.gdrive_id)
        console.log('[DEBUG] Children of DOKUMEN AKREDITASI:', children.map(c => ({ name: c.name, id: c.gdrive_id, parent: c.parent_id })))
    }

    // Debug: Check if PROGRAM NASIONAL exists in database at all
    const programNasional = documents.find(d => d.name.includes('PROGRAM NASIONAL'))
    if (programNasional) {
        console.log('[DEBUG] PROGRAM NASIONAL found in DB:', programNasional)
    } else {
        console.log('[DEBUG] PROGRAM NASIONAL NOT FOUND in database!')
    }

    return (<>
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <Folder className="w-6 h-6" />
                    <div>
                        <h2 className="text-xl font-bold">FILE SISTEM</h2>
                        <span className="text-xs text-red-100">
                            {filteredRootDocs.length} Items
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* EP Statistics */}
                    <div className="flex items-center gap-3 text-sm bg-white/10 px-4 py-2 rounded-lg">
                        <div className="text-center">
                            <div className="font-bold">{epStats.total}</div>
                            <div className="text-xs text-red-100">Total EP</div>
                        </div>
                        <div className="w-px h-8 bg-white/30"></div>
                        <div className="text-center">
                            <div className="font-bold text-red-200">{epStats.empty}</div>
                            <div className="text-xs text-red-100">Kosong</div>
                        </div>
                        <div className="w-px h-8 bg-white/30"></div>
                        <div className="text-center">
                            <div className="font-bold text-green-200">{epStats.filled}</div>
                            <div className="text-xs text-red-100">Terisi</div>
                        </div>
                    </div>

                    {/* Tombol Export Excel */}
                    <button
                        onClick={handleExportExcel}
                        disabled={isExporting}
                        className="flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        {isExporting ? 'Generating...' : 'Export Excel'}
                    </button>

                    {/* Tombol Export PDF → buka modal */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={isExportingPDF}
                        className="flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all active:scale-95"
                    >
                        <FileBarChart className="w-4 h-4" />
                        {isExportingPDF ? 'Generating...' : 'Export PDF'}
                    </button>

                    {/* Pokja Filter */}
                    <select
                        value={selectedPokja}
                        onChange={(e) => setSelectedPokja(e.target.value)}
                        className="bg-white/10 border border-white/30 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        <option value="all" className="text-gray-900">Semua Pokja</option>
                        <option value="KMRS" className="text-gray-900">KMRS - Manajemen RS</option>
                        <option value="KPS" className="text-gray-900">KPS - Pelayanan Pasien</option>
                        <option value="KSKP" className="text-gray-900">KSKP - Keselamatan Pasien</option>
                    </select>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {rootFolders.map(folder => (
                    <FolderItem
                        key={folder.id}
                        folder={folder}
                        allDocs={documents}
                        categories={categories}
                    />
                ))}
                {rootFiles.map(file => (
                    <div key={file.id} className="hover:bg-slate-50 transition-colors">
                        <FileRow doc={file} categories={categories} />
                    </div>
                ))}

                {/* Info: Orphan files shown at root */}
                {orphans.length > 0 && (
                    <div className="bg-blue-50 px-4 py-3 border-t border-blue-200">
                        <div className="text-xs text-blue-800 font-semibold mb-1">
                            ℹ️ {orphans.length} file(s) ditampilkan di root karena folder induknya tidak tersinkronisasi
                        </div>
                        <div className="text-xs text-blue-600">
                            File-file ini mungkin berasal dari folder di luar scope "AKREDITASI 2026" atau merupakan shortcut.
                        </div>
                    </div>
                )}

                {documents.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                        Tidak ada dokumen.
                    </div>
                )}
            </div>
        </div>
        {/* Modal filter Pokja untuk PDF */}
        <PokjaFilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onGenerate={handleGenerate}
            isGenerating={isExportingPDF}
        />
    </>)
}
