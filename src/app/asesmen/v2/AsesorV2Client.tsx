'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { upsertCatatan } from '@/app/actions'
import {
    ChevronDown, ChevronRight, Search, Loader2, Cloud, CloudOff,
    Check, X, Filter, RotateCcw, ExternalLink, FileText,
    ArrowLeft, ClipboardList, Layers, StickyNote, BarChart3
} from 'lucide-react'

// ============ TYPES ============

interface EPDoc { name: string; link: string }
interface EPItem { kode: string; deskripsi: string; bukti?: string[]; dokumen?: EPDoc[] }
interface StandarItem { kode: string; deskripsi: string; epList: EPItem[] }
interface PokjaStandarData { pokjaCode: string; pokjaName: string; standarList: StandarItem[] }

type SessionData = {
    assessment_id: string
    rumah_sakit: string
    tahun_akreditasi: string
    surveyor_name: string | null
    surveyor_unit: string | null
} | null

type CatatanStore = Record<string, string>

// ============ COLOR SYSTEM ============

const POKJA_COLORS: Record<string, { gradient: string; bg: string; text: string; accent: string }> = {
    KPS:    { gradient: 'from-blue-500 to-blue-600',       bg: 'bg-blue-50',    text: 'text-blue-700',    accent: 'text-blue-500' },
    MFK:    { gradient: 'from-emerald-500 to-emerald-600',  bg: 'bg-emerald-50', text: 'text-emerald-700', accent: 'text-emerald-500' },
    MRMIK:  { gradient: 'from-purple-500 to-purple-600',    bg: 'bg-purple-50',  text: 'text-purple-700',  accent: 'text-purple-500' },
    PMKP:   { gradient: 'from-orange-500 to-orange-600',    bg: 'bg-orange-50',  text: 'text-orange-700',  accent: 'text-orange-500' },
    PPI:    { gradient: 'from-red-500 to-red-600',          bg: 'bg-red-50',     text: 'text-red-700',     accent: 'text-red-500' },
    PPK:    { gradient: 'from-indigo-500 to-indigo-600',    bg: 'bg-indigo-50',  text: 'text-indigo-700',  accent: 'text-indigo-500' },
    TKRS:   { gradient: 'from-pink-500 to-pink-600',        bg: 'bg-pink-50',    text: 'text-pink-700',    accent: 'text-pink-500' },
    AKP:    { gradient: 'from-cyan-500 to-cyan-600',        bg: 'bg-cyan-50',    text: 'text-cyan-700',    accent: 'text-cyan-500' },
    HPK:    { gradient: 'from-teal-500 to-teal-600',        bg: 'bg-teal-50',    text: 'text-teal-700',    accent: 'text-teal-500' },
    KE:     { gradient: 'from-lime-500 to-lime-600',        bg: 'bg-lime-50',    text: 'text-lime-700',    accent: 'text-lime-500' },
    PAB:    { gradient: 'from-amber-500 to-amber-600',      bg: 'bg-amber-50',   text: 'text-amber-700',   accent: 'text-amber-500' },
    PAP:    { gradient: 'from-rose-500 to-rose-600',        bg: 'bg-rose-50',    text: 'text-rose-700',    accent: 'text-rose-500' },
    PKPO:   { gradient: 'from-violet-500 to-violet-600',    bg: 'bg-violet-50',  text: 'text-violet-700',  accent: 'text-violet-500' },
    PP:     { gradient: 'from-fuchsia-500 to-fuchsia-600',  bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', accent: 'text-fuchsia-500' },
    SKP:    { gradient: 'from-sky-500 to-sky-600',          bg: 'bg-sky-50',     text: 'text-sky-700',     accent: 'text-sky-500' },
    PROGNAS:{ gradient: 'from-slate-500 to-slate-600',      bg: 'bg-slate-50',   text: 'text-slate-700',   accent: 'text-slate-500' },
}

function getColor(code: string) {
    return POKJA_COLORS[code] ?? POKJA_COLORS['PPK']
}

// ============ HELPERS ============

function buildKey(pokja: string, standar: string, ep: string) {
    return `${pokja}|${standar}|${ep}`
}

function epDocStats(pokja: PokjaStandarData): { terisi: number; total: number } {
    let terisi = 0
    let total = 0
    for (const std of pokja.standarList) {
        for (const ep of std.epList) {
            total++
            if ((ep.dokumen ?? []).length > 0) terisi++
        }
    }
    return { terisi, total }
}

// ============ MAIN COMPONENT ============

export function AsesorV2Client({
    session,
    hierarchy,
    initialCatatan,
}: {
    session: SessionData
    hierarchy: PokjaStandarData[]
    initialCatatan: CatatanStore
}) {
    const [store, setStore] = useState<CatatanStore>(initialCatatan)
    const [activePokja, setActivePokja] = useState<string | null>(null)
    const [expandedStandar, setExpandedStandar] = useState<Set<string>>(new Set())
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState<'semua' | 'ada' | 'belum'>('semua')
    const [showFilters, setShowFilters] = useState(false)
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'saved' | 'error'>('idle')
    const [lastSaved, setLastSaved] = useState<string | null>(null)

    // --- Auto-save debounce ---
    const pendingChanges = useRef<CatatanStore>({})
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const flushChanges = useCallback(async () => {
        const changes = { ...pendingChanges.current }
        pendingChanges.current = {}
        if (!session?.assessment_id || Object.keys(changes).length === 0) return

        setSyncStatus('syncing')
        let allOk = true
        for (const [key, catatan] of Object.entries(changes)) {
            const [pokjaCode, standarKode, epKode] = key.split('|')
            const ok = await upsertCatatan(session.assessment_id, pokjaCode, standarKode, epKode, catatan)
            if (!ok) allOk = false
        }
        setSyncStatus(allOk ? 'saved' : 'error')
        if (allOk) setLastSaved(new Date().toLocaleTimeString('id-ID'))
    }, [session])

    function updateCatatan(pokjaCode: string, standarKode: string, epKode: string, catatan: string) {
        const key = buildKey(pokjaCode, standarKode, epKode)
        setStore(prev => ({ ...prev, [key]: catatan }))
        pendingChanges.current[key] = catatan
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(flushChanges, 1500)
    }

    useEffect(() => {
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current)
            flushChanges()
        }
    }, [flushChanges])

    function toggleStandar(kode: string) {
        setExpandedStandar(prev => {
            const next = new Set(prev)
            if (next.has(kode)) next.delete(kode)
            else next.add(kode)
            return next
        })
    }

    // Global EP doc stats
    const globalStats = useMemo(() => {
        let terisi = 0, total = 0
        for (const pokja of hierarchy) {
            const s = epDocStats(pokja)
            terisi += s.terisi
            total += s.total
        }
        return { terisi, total, pct: total > 0 ? Math.round((terisi / total) * 100) : 0 }
    }, [hierarchy])

    const selectedPokjaData = hierarchy.find(p => p.pokjaCode === activePokja)

    // Filtered standar for active pokja
    const filteredStandar = useMemo(() => {
        if (!selectedPokjaData) return []
        return selectedPokjaData.standarList.filter(std => {
            const q = searchQuery.toLowerCase().trim()
            if (q) {
                const matchStd = std.kode.toLowerCase().includes(q) || std.deskripsi.toLowerCase().includes(q)
                const matchEP = std.epList.some(ep =>
                    ep.kode.toLowerCase().includes(q) || ep.deskripsi.toLowerCase().includes(q)
                )
                if (!matchStd && !matchEP) return false
            }
            if (filterStatus !== 'semua') {
                const hasMatch = std.epList.some(ep => {
                    const key = buildKey(selectedPokjaData.pokjaCode, std.kode, ep.kode)
                    const hasCatatan = !!store[key]?.trim()
                    return filterStatus === 'ada' ? hasCatatan : !hasCatatan
                })
                if (!hasMatch) return false
            }
            return true
        })
    }, [selectedPokjaData, searchQuery, filterStatus, store])

    // RDOW config
    const buktiColors: Record<string, string> = {
        R: 'bg-purple-100 text-purple-700 border-purple-200',
        D: 'bg-blue-100 text-blue-700 border-blue-200',
        O: 'bg-teal-100 text-teal-700 border-teal-200',
        W: 'bg-orange-100 text-orange-700 border-orange-200',
        S: 'bg-pink-100 text-pink-700 border-pink-200',
    }
    const buktiLabels: Record<string, string> = {
        R: 'Regulasi', D: 'Dokumen', O: 'Observasi', W: 'Wawancara', S: 'Simulasi',
    }

    // === NO SESSION ===
    if (!session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                        <ClipboardList className="w-10 h-10 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tidak Ada Sesi Aktif</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Belum ada sesi asesmen yang ditandai aktif. Silakan aktifkan sesi terlebih dahulu di halaman admin.
                    </p>
                </div>
            </div>
        )
    }

    // === LANDING: POKJA CARDS ===
    if (!activePokja) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Asesmen Internal</h1>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {session.rumah_sakit} ({session.tahun_akreditasi})
                                    {session.surveyor_name && (
                                        <span className="text-indigo-600 font-medium"> &middot; {session.surveyor_name}</span>
                                    )}
                                </p>
                            </div>
                            <SyncBadge status={syncStatus} lastSaved={lastSaved} />
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    {/* Global Progress */}
                    <div className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <ProgressRing value={globalStats.terisi} max={globalStats.total} size={72} color="text-indigo-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-gray-900">{globalStats.pct}%</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Progress Pemenuhan</h2>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    <span className="font-semibold text-indigo-600">{globalStats.terisi}</span> dari{' '}
                                    <span className="font-semibold">{globalStats.total}</span> EP terisi
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pokja Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {hierarchy.map(pokja => {
                            const { terisi, total } = epDocStats(pokja)
                            const pct = total > 0 ? Math.round((terisi / total) * 100) : 0
                            const c = getColor(pokja.pokjaCode)

                            return (
                                <button
                                    key={pokja.pokjaCode}
                                    onClick={() => {
                                        setActivePokja(pokja.pokjaCode)
                                        setExpandedStandar(new Set())
                                        setSearchQuery('')
                                        setFilterStatus('semua')
                                        setShowFilters(false)
                                    }}
                                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 text-left overflow-hidden"
                                >
                                    <div className={`h-1.5 bg-gradient-to-r ${c.gradient}`} />
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <span className={`text-lg font-extrabold ${c.text}`}>{pokja.pokjaCode}</span>
                                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-0.5">{pokja.pokjaName}</p>
                                            </div>
                                            <div className="relative shrink-0">
                                                <ProgressRing value={terisi} max={total} size={48} color={c.accent} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-[11px] font-bold text-gray-700">{pct}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-3">
                                            <div className="flex items-center gap-1.5">
                                                <Layers className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-xs text-gray-500">{pokja.standarList.length} Standar</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <StickyNote className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-xs text-gray-500">{total} EP</span>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Pemenuhan</span>
                                                <span className="text-[11px] font-semibold text-gray-600">{terisi}/{total}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${c.gradient} rounded-full transition-all duration-700 ease-out`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-end">
                                            <span className="text-[10px] font-medium text-gray-400 group-hover:text-indigo-500 transition-colors flex items-center gap-1">
                                                Buka
                                                <ChevronRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </main>
            </div>
        )
    }

    // === POWER PAGE: SINGLE POKJA ===
    const pokjaData = selectedPokjaData!
    const c = getColor(activePokja)
    const { terisi: pokjaTerisi, total: pokjaTotal } = epDocStats(pokjaData)
    const pokjaPct = pokjaTotal > 0 ? Math.round((pokjaTerisi / pokjaTotal) * 100) : 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
                <div className="max-w-5xl mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-3 py-3">
                        <button
                            onClick={() => {
                                setActivePokja(null)
                                setSearchQuery('')
                                setFilterStatus('semua')
                                setShowFilters(false)
                            }}
                            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${c.gradient} shrink-0`} />

                        <div className="flex-1 min-w-0">
                            <h1 className="text-base font-bold text-gray-900 truncate">{pokjaData.pokjaCode}</h1>
                            <p className="text-xs text-gray-500 truncate">{pokjaData.pokjaName}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${c.gradient} rounded-full transition-all`} style={{ width: `${pokjaPct}%` }} />
                                </div>
                                <span className="text-xs font-semibold text-gray-600">{pokjaTerisi}/{pokjaTotal}</span>
                            </div>
                            <SyncBadge status={syncStatus} lastSaved={lastSaved} />
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-2 rounded-lg border transition-all ${
                                    showFilters
                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile progress */}
                    <div className="sm:hidden pb-3">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${c.gradient} rounded-full transition-all`} style={{ width: `${pokjaPct}%` }} />
                            </div>
                            <span className="text-xs font-semibold text-gray-600">{pokjaTerisi}/{pokjaTotal}</span>
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="pb-3 space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari standar atau EP..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 text-gray-800 placeholder-gray-400"
                                    />
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={e => setFilterStatus(e.target.value as 'semua' | 'ada' | 'belum')}
                                    className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-indigo-400 text-gray-700 cursor-pointer font-medium"
                                >
                                    <option value="semua">Semua Status</option>
                                    <option value="ada">Sudah Ada Catatan</option>
                                    <option value="belum">Belum Ada Catatan</option>
                                </select>
                                {(searchQuery || filterStatus !== 'semua') && (
                                    <button
                                        onClick={() => { setSearchQuery(''); setFilterStatus('semua') }}
                                        className="flex items-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 font-medium"
                                    >
                                        <RotateCcw className="w-3 h-3" /> Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 pb-24">
                {/* Stats summary */}
                <div className="mb-4 flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span className="font-semibold">{pokjaData.standarList.length}</span> Standar
                    </div>
                    <span className="text-gray-300">&middot;</span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Layers className="w-3.5 h-3.5" />
                        <span className="font-semibold">{pokjaTotal}</span> EP
                    </div>
                    <span className="text-gray-300">&middot;</span>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                        <Check className="w-3.5 h-3.5" />
                        <span className="font-semibold">{pokjaTerisi}</span> Terisi
                    </div>
                </div>

                {filteredStandar.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Search className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-sm">Tidak ada hasil yang cocok.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredStandar.map(standar => {
                            const standarKey = `${pokjaData.pokjaCode}|${standar.kode}`
                            const isExpanded = expandedStandar.has(standarKey)
                            const docCount = standar.epList.filter(ep => (ep.dokumen ?? []).length > 0).length

                            return (
                                <div key={standar.kode} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => toggleStandar(standarKey)}
                                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleStandar(standarKey) }}
                                        className="w-full flex items-start gap-3 px-4 md:px-5 py-3.5 cursor-pointer hover:bg-gray-50/80 transition-colors"
                                    >
                                        <div className={`w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                                            <span className="text-white text-[10px] font-bold">{docCount}/{standar.epList.length}</span>
                                        </div>
                                        <div className="flex-1 basis-0 min-w-0">
                                            <span className="text-sm font-bold text-gray-800">{standar.kode}</span>
                                            {!isExpanded && standar.deskripsi && (
                                                <span className="text-xs text-gray-400 mt-0.5 block truncate">{standar.deskripsi}</span>
                                            )}
                                        </div>
                                        <div className="shrink-0 pt-0.5">
                                            {isExpanded
                                                ? <ChevronDown className="w-5 h-5 text-gray-400" />
                                                : <ChevronRight className="w-5 h-5 text-gray-300" />
                                            }
                                        </div>
                                    </div>

                                    {isExpanded && standar.deskripsi && (
                                        <div className="px-4 md:px-5 pb-2 pl-[2.75rem] md:pl-[2.75rem]">
                                            <span className="text-xs text-gray-500 leading-relaxed block">{standar.deskripsi}</span>
                                        </div>
                                    )}

                                    {isExpanded && (
                                        <div className="border-t border-gray-100">
                                            {standar.epList.map(ep => {
                                                const epKey = buildKey(pokjaData.pokjaCode, standar.kode, ep.kode)
                                                return (
                                                    <EPRow
                                                        key={ep.kode}
                                                        ep={ep}
                                                        pokjaCode={pokjaData.pokjaCode}
                                                        standarKode={standar.kode}
                                                        catatan={store[epKey] ?? ''}
                                                        onUpdateCatatan={updateCatatan}
                                                        buktiColors={buktiColors}
                                                        buktiLabels={buktiLabels}
                                                        gradient={c.gradient}
                                                    />
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}

// ============ SYNC BADGE ============

function SyncBadge({ status, lastSaved }: { status: string; lastSaved: string | null }) {
    if (status === 'syncing') {
        return (
            <span className="text-xs text-gray-500 flex items-center gap-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                <span className="hidden sm:inline">Menyimpan...</span>
            </span>
        )
    }
    if (status === 'saved') {
        return (
            <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{lastSaved}</span>
            </span>
        )
    }
    if (status === 'error') {
        return (
            <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                <CloudOff className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Gagal</span>
            </span>
        )
    }
    return null
}

// ============ PROGRESS RING ============

function ProgressRing({ value, max, size = 56, color }: {
    value: number; max: number; size?: number; color: string
}) {
    const sw = size > 60 ? 5 : 3
    const radius = (size - sw) / 2
    const circumference = 2 * Math.PI * radius
    const pct = max > 0 ? value / max : 0
    const offset = circumference * (1 - pct)

    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                style={{ fill: 'none', stroke: '#e5e7eb', strokeWidth: sw }}
            />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                className={`${color} transition-all duration-700 ease-out`}
                style={{ fill: 'none', strokeWidth: sw, strokeLinecap: 'round', strokeDasharray: circumference, strokeDashoffset: offset }}
            />
        </svg>
    )
}

// ============ EP ROW ============

function EPRow({
    ep, pokjaCode, standarKode, catatan, onUpdateCatatan,
    buktiColors, buktiLabels, gradient,
}: {
    ep: EPItem
    pokjaCode: string
    standarKode: string
    catatan: string
    onUpdateCatatan: (pokja: string, standar: string, ep: string, catatan: string) => void
    buktiColors: Record<string, string>
    buktiLabels: Record<string, string>
    gradient: string
}) {
    const [expanded, setExpanded] = useState(false)
    const hasCatatan = !!catatan.trim()
    const bukti = ep.bukti ?? []
    const dokumen = ep.dokumen ?? []
    const hasDocs = dokumen.length > 0

    return (
        <div className="border-b border-gray-50 last:border-b-0">
            <div
                role="button"
                tabIndex={0}
                onClick={() => setExpanded(!expanded)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded) }}
                className="w-full flex items-center gap-3 px-4 md:px-5 py-2.5 cursor-pointer hover:bg-indigo-50/30 transition-colors"
            >
                <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${
                    hasDocs ? `bg-gradient-to-br ${gradient} shadow-sm` : 'bg-gray-100'
                }`}>
                    {hasDocs
                        ? <Check className="w-4 h-4 text-white" />
                        : <span className="text-[10px] font-bold text-gray-400">{ep.kode.replace('EP ', '')}</span>
                    }
                </div>

                <div className="flex-1 basis-0 min-w-0 flex items-center gap-2 overflow-hidden">
                    <span className="text-sm font-semibold text-gray-800 shrink-0">{ep.kode}</span>
                    {bukti.map(b => (
                        <span key={b}
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold border leading-none shrink-0 ${buktiColors[b] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}
                            title={buktiLabels[b] ?? b}
                        >
                            {b}
                        </span>
                    ))}
                    {!expanded && ep.deskripsi && (
                        <span className="text-xs text-gray-400 truncate min-w-0">{ep.deskripsi}</span>
                    )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                    {hasDocs && !expanded && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium bg-slate-50 px-1.5 py-0.5 rounded">
                            <FileText className="w-3 h-3" /> {dokumen.length}
                        </span>
                    )}
                    {hasCatatan && !expanded && (
                        <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                            catatan
                        </span>
                    )}
                    {expanded
                        ? <ChevronDown className="w-4 h-4 text-gray-400" />
                        : <ChevronRight className="w-4 h-4 text-gray-300" />
                    }
                </div>
            </div>

            {expanded && (
                <div className="px-4 md:px-5 pb-4 pl-[3.25rem] md:pl-14 space-y-3">
                    {ep.deskripsi && (
                        <span className="text-xs text-gray-500 leading-relaxed block">{ep.deskripsi}</span>
                    )}

                    {/* Dokumen */}
                    {hasDocs && (
                        <div className="bg-slate-50 rounded-xl border border-gray-200 p-3">
                            <p className="text-[11px] font-semibold text-gray-500 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                                <FileText className="w-3.5 h-3.5" />
                                Dokumen Terkait
                            </p>
                            <div className="space-y-1.5">
                                {dokumen.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-2 py-1">
                                        <div className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0">
                                            <FileText className="w-3 h-3 text-gray-400" />
                                        </div>
                                        <span className="text-xs text-gray-600 truncate flex-1 min-w-0" title={doc.name}>
                                            {doc.name}
                                        </span>
                                        {doc.link && (
                                            <a href={doc.link} target="_blank" rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                                            >
                                                <ExternalLink className="w-2.5 h-2.5" /> Buka
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Catatan */}
                    <textarea
                        value={catatan}
                        onChange={e => onUpdateCatatan(pokjaCode, standarKode, ep.kode, e.target.value)}
                        placeholder="Tulis catatan di sini..."
                        rows={3}
                        className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-700 placeholder-gray-400 resize-y transition-all leading-relaxed"
                    />
                </div>
            )}
        </div>
    )
}
