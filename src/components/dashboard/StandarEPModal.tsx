'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { X, ChevronDown, ChevronRight, Folder, FileText, ExternalLink, Search, CheckCircle, XCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { Pokja, Doc, findPokjaRootFolder, getColorClasses } from '@/lib/pokjaUtils'
import {
    countFilesRecursiveUnderFolder,
    getSortedDirectChildrenOfFolder,
} from '@/lib/standarEpHierarchy'

/** Isi satu folder (EP atau subfolder): tampilkan subfolder + file secara hierarkis */
function EpSubtreeContents({
    parentFolderId,
    documents,
    depth,
    expandedFolderIds,
    onToggleFolder,
}: {
    parentFolderId: string
    documents: Doc[]
    depth: number
    expandedFolderIds: Set<string>
    onToggleFolder: (gdriveId: string) => void
}) {
    const children = useMemo(
        () => getSortedDirectChildrenOfFolder(parentFolderId, documents),
        [parentFolderId, documents]
    )

    if (children.length === 0) return null

    const pad = `calc(${5 + depth * 1.125}rem)`

    return (
        <div className={clsx(depth > 0 && 'border-l border-gray-200/80 ml-3 pl-1')}>
            <div className="divide-y divide-gray-100/90">
                {children.map((item) => {
                const isFolder = item.mime_type === 'application/vnd.google-apps.folder'
                if (!isFolder) {
                    return (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 py-2 pr-3 hover:bg-white transition-colors"
                            style={{ paddingLeft: pad }}
                        >
                            <FileText className="w-4 h-4 shrink-0 text-gray-400" />
                            <div className="flex-1 text-sm text-gray-700 min-w-0 truncate">{item.name}</div>
                            {item.web_view_link && (
                                <a
                                    href={item.web_view_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 shrink-0 hover:bg-gray-200 rounded transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="w-4 h-4 text-gray-500" />
                                </a>
                            )}
                        </div>
                    )
                }

                const isOpen = expandedFolderIds.has(item.gdrive_id)
                const subtreeFiles = countFilesRecursiveUnderFolder(item.gdrive_id, documents)

                return (
                    <div key={item.id}>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                onToggleFolder(item.gdrive_id)
                            }}
                            className="flex w-full items-center gap-2 py-2 pr-3 text-left hover:bg-white transition-colors rounded-sm"
                            style={{ paddingLeft: pad }}
                        >
                            <span className="text-gray-400 shrink-0">
                                {subtreeFiles > 0 ? (
                                    isOpen ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )
                                ) : (
                                    <span className="inline-block w-4" />
                                )}
                            </span>
                            <Folder className="w-4 h-4 shrink-0 text-amber-600/90" />
                            <div className="flex-1 min-w-0 flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-800 truncate">{item.name}</span>
                                {subtreeFiles > 0 && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
                                        {subtreeFiles} file
                                    </span>
                                )}
                            </div>
                        </button>
                        {isOpen && (
                            <EpSubtreeContents
                                parentFolderId={item.gdrive_id}
                                documents={documents}
                                depth={depth + 1}
                                expandedFolderIds={expandedFolderIds}
                                onToggleFolder={onToggleFolder}
                            />
                        )}
                    </div>
                )
                })}
            </div>
        </div>
    )
}

interface StandarEPModalProps {
    pokja: Pokja
    documents: Doc[]
    isOpen: boolean
    onClose: () => void
}

interface StandarGroup {
    standar: Doc
    eps: Array<{
        ep: Doc
        fileCount: number
        isEmpty: boolean
    }>
}

export function StandarEPModal({ pokja, documents, isOpen, onClose }: StandarEPModalProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedStandar, setExpandedStandar] = useState<Set<string>>(new Set())
    const [expandedEP, setExpandedEP] = useState<Set<string>>(new Set())
    /** Subfolder apa saja dalam EP yang dibuka (key = gdrive_id folder) */
    const [expandedFolderIds, setExpandedFolderIds] = useState<Set<string>>(new Set())

    useEffect(() => {
        if (!isOpen) {
            setExpandedFolderIds(new Set())
        }
    }, [isOpen])

    const toggleExpandFolder = useCallback((gdriveId: string) => {
        setExpandedFolderIds((prev) => {
            const next = new Set(prev)
            if (next.has(gdriveId)) next.delete(gdriveId)
            else next.add(gdriveId)
            return next
        })
    }, [])

    const colors = getColorClasses(pokja.color)

    // Group documents by Standar and EP
    const standarGroups = useMemo(() => {
        // Helper to check if EP folder - matches "EP 1", "EP a", "EP 1.1", etc
        const isEPFolder = (doc: Doc): boolean => {
            return doc.name.match(/^EP\s*[a-z0-9.]+/i) !== null
        }

        // Folder root pokja (nama "TKRS"), bukan folder standar "TKRS 1" / "TKRS 14"
        const pokjaFolder = findPokjaRootFolder(documents, pokja)

        if (!pokjaFolder) {
            console.log(`[${pokja.code}] Pokja folder not found`)
            return []
        }

        console.log(`[${pokja.code}] Found Pokja folder:`, pokjaFolder.name)

        // Find all folders that are children of the Pokja folder
        // These could be Standar folders OR sub-folders containing Standar
        const pokjaChildren = documents.filter(doc =>
            doc.parent_id === pokjaFolder.gdrive_id &&
            doc.mime_type === 'application/vnd.google-apps.folder'
        )

        console.log(`[${pokja.code}] Found ${pokjaChildren.length} children of Pokja folder`)

        // Debug: log children names
        if (pokja.code === 'PAP') {
            console.log('[PAP] Children names:', pokjaChildren.map(c => c.name))
        }

        // For each child, check if it contains EP folders (making it a Standar)
        // OR if its children contain EP folders (making them Standar)
        const standarFolders: Doc[] = []

        pokjaChildren.forEach(child => {
            const childChildren = documents.filter(d => d.parent_id === child.gdrive_id)
            const hasEPChildren = childChildren.some(c => isEPFolder(c))

            // Debug logging for PAP
            if (pokja.code === 'PAP') {
                console.log(`[PAP] Child "${child.name}" has ${childChildren.length} children:`,
                    childChildren.map(c => c.name))
                console.log(`[PAP] Child "${child.name}" hasEPChildren:`, hasEPChildren)
            }

            if (hasEPChildren) {
                // This child itself is a Standar folder
                standarFolders.push(child)
            } else {
                // Check if grandchildren are Standar (contain EP)
                childChildren.forEach(grandchild => {
                    if (grandchild.mime_type !== 'application/vnd.google-apps.folder') return
                    const grandchildChildren = documents.filter(d => d.parent_id === grandchild.gdrive_id)
                    const hasEPGrandchildren = grandchildChildren.some(c => isEPFolder(c))

                    // Debug logging for PAP
                    if (pokja.code === 'PAP') {
                        console.log(`[PAP] Grandchild "${grandchild.name}" has ${grandchildChildren.length} children:`,
                            grandchildChildren.map(c => c.name))
                        console.log(`[PAP] Grandchild "${grandchild.name}" hasEPGrandchildren:`, hasEPGrandchildren)
                    }

                    if (hasEPGrandchildren) {
                        standarFolders.push(grandchild)
                    }
                })
            }
        })

        console.log(`[${pokja.code}] Found ${standarFolders.length} standar folders`)

        // Group EPs under each Standar
        const groups: StandarGroup[] = standarFolders.map(standar => {
            const epFolders = documents.filter(doc =>
                doc.parent_id === standar.gdrive_id && isEPFolder(doc)
            )

            const eps = epFolders.map((ep) => {
                const fileCount = countFilesRecursiveUnderFolder(ep.gdrive_id, documents)

                return {
                    ep,
                    fileCount,
                    isEmpty: fileCount === 0,
                }
            })

            return { standar, eps }
        })

        const sortGroups = (items: StandarGroup[]) =>
            items
                .map(g => ({
                    ...g,
                    eps: [...g.eps].sort((a, b) =>
                        a.ep.name.localeCompare(b.ep.name, 'id', { numeric: true })
                    ),
                }))
                .sort((a, b) =>
                    a.standar.name.localeCompare(b.standar.name, 'id', { numeric: true })
                )

        // Filter by search query
        if (searchQuery) {
            return sortGroups(groups.filter(group => {
                const standarMatch = group.standar.name.toLowerCase().includes(searchQuery.toLowerCase())
                const epMatch = group.eps.some(ep =>
                    ep.ep.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                return standarMatch || epMatch
            }))
        }

        return sortGroups(groups)
    }, [documents, pokja, searchQuery])

    const toggleStandar = (id: string) => {
        const newSet = new Set(expandedStandar)
        if (newSet.has(id)) {
            newSet.delete(id)
        } else {
            newSet.add(id)
        }
        setExpandedStandar(newSet)
    }

    const toggleEP = (id: string) => {
        const newSet = new Set(expandedEP)
        if (newSet.has(id)) {
            newSet.delete(id)
        } else {
            newSet.add(id)
        }
        setExpandedEP(newSet)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className={clsx(
                    "flex items-center justify-between p-6 border-b bg-gradient-to-r text-white rounded-t-2xl",
                    colors.gradient
                )}>
                    <div>
                        <div className="text-2xl font-bold">{pokja.code}</div>
                        <div className="text-sm opacity-90 mt-1">{pokja.name}</div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b bg-gray-50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari Standar atau EP..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {standarGroups.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Tidak ada data ditemukan</p>
                            <p className="text-sm mt-2">Coba ubah kata kunci pencarian</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {standarGroups.map((group) => {
                                const isStandarExpanded = expandedStandar.has(group.standar.gdrive_id)
                                const totalEP = group.eps.length
                                const kosongEP = group.eps.filter(ep => ep.isEmpty).length

                                return (
                                    <div key={group.standar.gdrive_id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        {/* Standar Header */}
                                        <div
                                            onClick={() => toggleStandar(group.standar.gdrive_id)}
                                            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                                        >
                                            <div className="text-gray-400">
                                                {isStandarExpanded ? (
                                                    <ChevronDown className="w-5 h-5" />
                                                ) : (
                                                    <ChevronRight className="w-5 h-5" />
                                                )}
                                            </div>
                                            <Folder className={clsx("w-5 h-5", colors.text)} />
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800">
                                                    {group.standar.name}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                                                    {totalEP} EP
                                                </span>
                                                {kosongEP > 0 && (
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                        {kosongEP} Kosong
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* EP List */}
                                        {isStandarExpanded && (
                                            <div className="bg-white">
                                                {group.eps.map((epData) => {
                                                    const isEPExpanded = expandedEP.has(epData.ep.gdrive_id)

                                                    return (
                                                        <div key={epData.ep.gdrive_id} className="border-t border-gray-100">
                                                            {/* EP Header */}
                                                            <div
                                                                onClick={() => toggleEP(epData.ep.gdrive_id)}
                                                                className="flex items-center gap-3 p-4 pl-12 hover:bg-gray-50 cursor-pointer transition-colors"
                                                            >
                                                                <div className="text-gray-400">
                                                                    {isEPExpanded ? (
                                                                        <ChevronDown className="w-4 h-4" />
                                                                    ) : (
                                                                        <ChevronRight className="w-4 h-4" />
                                                                    )}
                                                                </div>
                                                                <Folder className="w-4 h-4 text-gray-500" />
                                                                <div className="flex-1 font-medium text-gray-700">
                                                                    {epData.ep.name}
                                                                </div>
                                                                <div>
                                                                    {epData.isEmpty ? (
                                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                                            <XCircle className="w-3 h-3" />
                                                                            Kosong
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                                            <CheckCircle className="w-3 h-3" />
                                                                            {epData.fileCount} File
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Pohon folder + file di dalam EP */}
                                                            {isEPExpanded && epData.fileCount > 0 && (
                                                                <div className="bg-gray-50/90 border-t border-gray-100">
                                                                    <EpSubtreeContents
                                                                        parentFolderId={epData.ep.gdrive_id}
                                                                        documents={documents}
                                                                        depth={0}
                                                                        expandedFolderIds={expandedFolderIds}
                                                                        onToggleFolder={toggleExpandFolder}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
