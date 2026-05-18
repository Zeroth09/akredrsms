'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { getStandarEPHierarchy } from '@/app/actions'
import { supabase } from '@/lib/supabase'
import {
    ChevronDown, ChevronRight, Save, RotateCcw,
    CheckCircle2, AlertCircle, XCircle, Download,
    Search, Loader2, MessageSquare, MoreHorizontal,
    ExternalLink, FileText, Cloud, CloudOff, Check, LogOut, UserCircle, Menu
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// ============ TYPES ============

interface EPDoc { name: string; link: string }
interface EPItem { kode: string; deskripsi: string; bukti?: string[]; dokumen?: EPDoc[] }
interface StandarItem { kode: string; deskripsi: string; epList: EPItem[] }
interface PokjaStandarData { pokjaCode: string; pokjaName: string; standarList: StandarItem[] }

type NilaiEP = 'terpenuhi' | 'sebagian' | 'tidak' | null

interface EPAssessment { nilai: NilaiEP; fakta_analisis: string; rekomendasi: string }

type AssessmentStore = Record<string, EPAssessment>

const STORAGE_KEY = 'akredmonit_asesmen_v1'
const SESSION_KEY = 'akredmonit_session_id'

// ============ HELPERS ============

function buildKey(pokja: string, standar: string, ep: string) {
    return `${pokja}|${standar}|${ep}`
}

// Parsing key back to parts: "MRMIK|MRMIK 1|EP a" → pokjaCode="MRMIK", standarKode="MRMIK 1", epKode="EP a"
function parseKey(key: string) {
    const parts = key.split('|')
    // buildKey: `${pokja}|${standar}|${ep}` → parts = [pokja, standar, ep]
    const [pokjaCode = '', standarKode = '', epKode = ''] = parts
    return { pokjaCode, standarKode, epKode }
}

function getOrCreateSessionId(): string {
    // Saat ini kita gunakan ID sesi default agar semua browser/device 
    // membaca dan menulis ke dokumen asesmen yang sama.
    // Ke depan, ini bisa diganti dengan membaca dari parameter URL (?session=xxx)
    // atau state manajemen sesi (dropdown pilih sesi RS).
    return 'ASESMEN_RS_DEFAULT_2024'
}

function skorNilai(nilai: NilaiEP): number {
    if (nilai === 'terpenuhi') return 10
    if (nilai === 'sebagian') return 5
    return 0
}

function nilaiLabel(nilai: NilaiEP): string {
    if (nilai === 'terpenuhi') return 'Terpenuhi'
    if (nilai === 'sebagian') return 'Terpenuhi Sebagian'
    if (nilai === 'tidak') return 'Tidak Terpenuhi'
    return 'Belum Dinilai'
}

// ============ MAIN COMPONENT ============

export function AsesmenClient() {
    const [store, setStore] = useState<AssessmentStore>({})
    const [activePokjaIdx, setActivePokjaIdx] = useState(0)
    const [expandedStandar, setExpandedStandar] = useState<Set<string>>(new Set())
    const [filterNilai, setFilterNilai] = useState<NilaiEP | 'semua'>('semua')
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'saved' | 'error'>('idle')
    const [lastSaved, setLastSaved] = useState<string | null>(null)
    const [standarEPData, setStandarEPData] = useState<PokjaStandarData[]>([])
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [editingCatatan, setEditingCatatan] = useState<string | null>(null)
    const [surveyor, setSurveyor] = useState<{name: string, pokja: string[]} | null>(null)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const router = useRouter()

    const sessionId = useMemo(() => getOrCreateSessionId(), [])

    // Auth Check
    useEffect(() => {
        const auth = localStorage.getItem('surveyor_auth')
        if (!auth) {
            router.replace('/asesmen/login')
        } else {
            setSurveyor(JSON.parse(auth))
        }
    }, [router])

    // Load dari Supabase + localStorage fallback
    useEffect(() => {
        async function loadFromSupabase() {
            try {
                const { data, error } = await supabase
                    .from('assessments')
                    .select('pokja_code, standar_kode, ep_kode, nilai, fakta_analisis, rekomendasi')
                    .eq('assessment_id', sessionId)

                if (error) throw error

                if (data && data.length > 0) {
                    const loaded: AssessmentStore = {}
                    for (const row of data) {
                        const key = buildKey(row.pokja_code, row.standar_kode, row.ep_kode)
                        loaded[key] = { nilai: row.nilai, fakta_analisis: row.fakta_analisis || '', rekomendasi: row.rekomendasi || '' }
                    }
                    setStore(loaded)
                    setSyncStatus('saved')
                    setLastSaved(new Date().toLocaleTimeString('id-ID'))
                } else {
                    // Fallback: coba load dari localStorage
                    const saved = localStorage.getItem(STORAGE_KEY)
                    if (saved) setStore(JSON.parse(saved))
                    setSyncStatus('idle')
                }
            } catch {
                // Supabase gagal → fallback ke localStorage
                try {
                    const saved = localStorage.getItem(STORAGE_KEY)
                    if (saved) setStore(JSON.parse(saved))
                } catch { /* ignore */ }
                setSyncStatus('idle')
            }
        }
        loadFromSupabase()
    }, [sessionId])

    // Load data standar dari server
    useEffect(() => {
        if (!surveyor) return; // Wait until auth is resolved

        async function loadData() {
            try {
                const data = await getStandarEPHierarchy()
                // Filter hanya pokja yang diizinkan untuk surveyor ini
                const allowedData = data.filter(d => surveyor?.pokja.includes(d.pokjaCode))
                setStandarEPData(allowedData)
            } catch (error) {
                console.error('Gagal memuat data Standar & EP:', error)
            } finally {
                setIsLoadingData(false)
            }
        }
        loadData()
    }, [surveyor])

    // Sync ke Supabase (upsert per EP) + localStorage fallback
    const syncToSupabase = useCallback(async (currentStore: AssessmentStore) => {
        // Always save to localStorage as backup
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(currentStore)) } catch { /* ignore */ }

        // Sync ke Supabase
        if (Object.keys(currentStore).length === 0) {
            setLastSaved(new Date().toLocaleTimeString('id-ID'))
            setSyncStatus('saved')
            return
        }

        setSyncStatus('syncing')
        try {
            const records = Object.entries(currentStore).map(([key, val]) => {
                const { pokjaCode, standarKode, epKode } = parseKey(key)
                return {
                    assessment_id: sessionId,
                    pokja_code: pokjaCode,
                    standar_kode: standarKode,
                    ep_kode: epKode,
                    nilai: val.nilai,
                    fakta_analisis: val.fakta_analisis || '',
                    rekomendasi: val.rekomendasi || '',
                }
            })

            const { error } = await supabase
                .from('assessments')
                .upsert(records, { onConflict: 'assessment_id,pokja_code,standar_kode,ep_kode' })

            if (error) throw error

            setLastSaved(new Date().toLocaleTimeString('id-ID'))
            setSyncStatus('saved')
        } catch (e) {
            console.error('Sync failed:', e)
            setSyncStatus('error')
        }
    }, [sessionId])

    // Debounce sync
    useEffect(() => {
        const timeout = setTimeout(() => syncToSupabase(store), 1200)
        return () => clearTimeout(timeout)
    }, [store, syncToSupabase])

    // Pokja aktif
    const activePokja = standarEPData[activePokjaIdx] ?? null

    // Filter standar berdasarkan search & filter nilai
    const filteredStandar = useMemo(() => {
        if (!activePokja) return []
        return activePokja.standarList.filter(std => {
            // Search filter
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                const matchStd = std.kode.toLowerCase().includes(q) || std.deskripsi.toLowerCase().includes(q)
                const matchEP = std.epList.some(ep =>
                    ep.kode.toLowerCase().includes(q) || ep.deskripsi.toLowerCase().includes(q)
                )
                if (!matchStd && !matchEP) return false
            }
            // Nilai filter
            if (filterNilai !== 'semua') {
                const hasMatch = std.epList.some(ep => {
                    const key = buildKey(activePokja.pokjaCode, std.kode, ep.kode)
                    const a = store[key]
                    if (filterNilai === null) return !a?.nilai
                    return a?.nilai === filterNilai
                })
                if (!hasMatch) return false
            }
            return true
        })
    }, [activePokja, searchQuery, filterNilai, store])

    // Update handlers
    function updateNilai(pokjaCode: string, standarKode: string, epKode: string, nilai: NilaiEP) {
        const key = buildKey(pokjaCode, standarKode, epKode)
        setStore(prev => ({
            ...prev,
            [key]: { ...prev[key], nilai, fakta_analisis: prev[key]?.fakta_analisis || '', rekomendasi: prev[key]?.rekomendasi || '' }
        }))
    }

    function updateFaktaAnalisis(pokjaCode: string, standarKode: string, epKode: string, fakta_analisis: string) {
        const key = buildKey(pokjaCode, standarKode, epKode)
        setStore(prev => ({
            ...prev,
            [key]: { ...prev[key], fakta_analisis, nilai: prev[key]?.nilai || null, rekomendasi: prev[key]?.rekomendasi || '' }
        }))
    }

    function updateRekomendasi(pokjaCode: string, standarKode: string, epKode: string, rekomendasi: string) {
        const key = buildKey(pokjaCode, standarKode, epKode)
        setStore(prev => ({
            ...prev,
            [key]: { ...prev[key], rekomendasi, nilai: prev[key]?.nilai || null, fakta_analisis: prev[key]?.fakta_analisis || '' }
        }))
    }

    function toggleStandar(kode: string) {
        setExpandedStandar(prev => {
            const next = new Set(prev)
            if (next.has(kode)) next.delete(kode)
            else next.add(kode)
            return next
        })
    }

    function resetPokja(pokjaCode: string) {
        if (!confirm('Yakin ingin reset semua penilaian untuk pokja ini?')) return
        setStore(prev => {
            const next = { ...prev }
            for (const key of Object.keys(next)) {
                if (key.startsWith(pokjaCode + '|')) delete next[key]
            }
            return next
        })
        setShowMenu(false)
    }

    function handleLogout() {
        if (!confirm('Yakin ingin keluar?')) return
        localStorage.removeItem('surveyor_auth')
        router.replace('/asesmen/login')
    }

    function exportCSV() {
        const rows = ['Pokja,Standar,EP,Nilai,Skor,Catatan']
        for (const pokja of standarEPData) {
            for (const std of pokja.standarList) {
                for (const ep of std.epList) {
                    const key = buildKey(pokja.pokjaCode, std.kode, ep.kode)
                    const a = store[key]
                    const nilai = a?.nilai ? nilaiLabel(a.nilai) : 'Belum Dinilai'
                    const skor = a?.nilai ? skorNilai(a.nilai) : 0
                    const catatan = (a?.catatan || '').replace(/"/g, '""')
                    rows.push(`"${pokja.pokjaCode}","${std.kode}","${ep.kode}","${nilai}",${skor},"${catatan}"`)
                }
            }
        }
        const blob = new Blob(['\ufeff' + rows.join('\n')], { type: 'text/csv;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `asesmen_akreditasi_${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
        setShowMenu(false)
    }

    // ============ LOADING ============
    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                    <p className="text-gray-500 text-base">Memuat data asesmen...</p>
                </div>
            </div>
        )
    }

    if (!standarEPData.length) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500 text-base">Belum ada data standar & EP.</p>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden relative">
            
            {/* Mobile Sidebar Overlay */}
            {showMobileMenu && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden" 
                    onClick={() => setShowMobileMenu(false)}
                />
            )}

            {/* ====== SIDEBAR ====== */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-indigo-700 flex flex-col shadow-xl transform transition-transform duration-300 md:relative md:translate-x-0 shrink-0 ${
                showMobileMenu ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="p-5 bg-indigo-800">
                    <h1 className="text-xl font-bold text-white">Asesmen Internal</h1>
                    <p className="text-xs text-indigo-200 mt-1">Penilaian Kelengkapan Dokumen</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    {standarEPData.map((pokja, idx) => {
                        const isActive = idx === activePokjaIdx
                        return (
                            <button key={pokja.pokjaCode}
                                onClick={() => {
                                    setActivePokjaIdx(idx)
                                    setExpandedStandar(new Set())
                                    setSearchQuery('')
                                    setFilterNilai('semua')
                                    setShowMobileMenu(false) // Hide menu on mobile after selection
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors
                                    ${isActive
                                        ? 'bg-white text-indigo-700 shadow-sm'
                                        : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                                    }`}>
                                {pokja.pokjaCode}
                            </button>
                        )
                    })}
                </div>

                {/* Sidebar Footer User Info */}
                <div className="p-4 bg-indigo-800/50 border-t border-indigo-600/50">
                    <div className="flex items-center gap-3">
                        <UserCircle className="w-8 h-8 text-indigo-300" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{surveyor?.name}</p>
                            <p className="text-xs text-indigo-300 truncate">Surveyor</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ====== MAIN CONTENT ====== */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header (Sync Status & Actions) */}
                <header className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <button 
                            className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
                            onClick={() => setShowMobileMenu(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        {activePokja && (
                            <h2 className="text-lg font-bold text-gray-800 truncate">{activePokja.pokjaName}</h2>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {/* Sync Status Indicator */}
                        <div className="flex items-center gap-2">
                            {syncStatus === 'syncing' && (
                                <span className="text-xs text-gray-500 flex items-center gap-1.5">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" /> Menyimpan...
                                </span>
                            )}
                            {syncStatus === 'saved' && (
                                <span className="text-xs text-emerald-600 flex items-center gap-1.5 font-medium">
                                    <Cloud className="w-3.5 h-3.5" /> <Check className="w-3 h-3" /> {lastSaved}
                                </span>
                            )}
                            {syncStatus === 'error' && (
                                <span className="text-xs text-red-500 flex items-center gap-1.5 font-medium" title="Gagal sync ke server, data tersimpan di browser">
                                    <CloudOff className="w-3.5 h-3.5" /> Offline
                                </span>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors border border-gray-200">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                            {showMenu && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                                    <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[200px]">
                                        <button onClick={exportCSV}
                                            className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-blue-50 flex items-center gap-2 font-medium">
                                            <Download className="w-4 h-4 text-blue-500" /> Export CSV
                                        </button>
                                        {activePokja && (
                                            <button onClick={() => resetPokja(activePokja.pokjaCode)}
                                                className="w-full px-4 py-2.5 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                                                <RotateCcw className="w-4 h-4" /> Reset {activePokja.pokjaCode}
                                            </button>
                                        )}
                                        <div className="h-px bg-gray-100 my-1"></div>
                                        <button onClick={handleLogout}
                                            className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 font-medium">
                                            <LogOut className="w-4 h-4 text-gray-500" /> Keluar
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto space-y-6">
                        
                        {/* ====== TOOLS: Search & Filter ====== */}
                        {activePokja && (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari standar atau elemen penilaian..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-800 placeholder-gray-400 shadow-sm"
                                    />
                                </div>
                                <select
                                    value={filterNilai ?? 'semua'}
                                    onChange={e => {
                                        const v = e.target.value
                                        setFilterNilai(v === 'semua' ? 'semua' : v as NilaiEP)
                                    }}
                                    className="px-4 py-2.5 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-700 cursor-pointer font-medium shadow-sm">
                                    <option value="semua">Semua Status</option>
                                    <option value="terpenuhi">✓ Terpenuhi</option>
                                    <option value="sebagian">◐ Sebagian</option>
                                    <option value="tidak">✕ Tidak</option>
                                </select>
                            </div>
                        )}

                        {/* ====== STANDAR LIST ====== */}
                        {activePokja && (
                            <div className="space-y-4 pb-24">
                    {filteredStandar.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-400 text-base">Tidak ada hasil yang cocok.</p>
                        </div>
                    )}

                    {filteredStandar.map(standar => {
                        const isExpanded = expandedStandar.has(standar.kode)

                        // Filter EP berdasarkan nilai jika ada
                        const visibleEPs = standar.epList.filter(ep => {
                            if (filterNilai === 'semua') return true
                            const key = buildKey(activePokja.pokjaCode, standar.kode, ep.kode)
                            const a = store[key]
                            return a?.nilai === filterNilai
                        })

                        return (
                            <div key={standar.kode} className="bg-white rounded-2xl overflow-hidden shadow-sm border-l-4 border-l-indigo-400 border border-gray-100">
                                {/* Standar Header */}
                                <button
                                    onClick={() => toggleStandar(standar.kode)}
                                    className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-indigo-50/40 transition-colors">
                                    <div className="mt-0.5 shrink-0">
                                        {isExpanded
                                            ? <ChevronDown className="w-6 h-6 text-indigo-500" />
                                            : <ChevronRight className="w-6 h-6 text-gray-400" />
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-bold text-indigo-800">{standar.kode}</span>
                                            <span className="text-xs font-medium text-indigo-300 bg-indigo-50 px-2 py-0.5 rounded-full">{standar.epList.length} EP</span>
                                        </div>
                                        {standar.deskripsi && (
                                            <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
                                                {standar.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                </button>

                                {/* EP List */}
                                {isExpanded && (
                                    <div className="border-t border-gray-100">
                                        {visibleEPs.length === 0 ? (
                                            <p className="text-center text-gray-300 text-sm py-6">
                                                Tidak ada EP dengan status ini.
                                            </p>
                                        ) : (
                                            visibleEPs.map(ep => (
                                                <EPRow
                                                    key={ep.kode}
                                                    ep={ep}
                                                    pokjaCode={activePokja.pokjaCode}
                                                    standarKode={standar.kode}
                                                    store={store}
                                                    editingCatatan={editingCatatan}
                                                    onSetEditingCatatan={setEditingCatatan}
                                                    onUpdateNilai={updateNilai}
                                                    onUpdateFaktaAnalisis={updateFaktaAnalisis}
                                                    onUpdateRekomendasi={updateRekomendasi}
                                                />
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}


function EPRow({
    ep, pokjaCode, standarKode, store, editingCatatan, onSetEditingCatatan, onUpdateNilai, onUpdateFaktaAnalisis, onUpdateRekomendasi
}: {
    ep: EPItem
    pokjaCode: string
    standarKode: string
    store: AssessmentStore
    editingCatatan: string | null
    onSetEditingCatatan: (key: string | null) => void
    onUpdateNilai: (pokja: string, standar: string, ep: string, nilai: NilaiEP) => void
    onUpdateFaktaAnalisis: (pokja: string, standar: string, ep: string, val: string) => void
    onUpdateRekomendasi: (pokja: string, standar: string, ep: string, val: string) => void
}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const key = buildKey(pokjaCode, standarKode, ep.kode)
    const assessment = store[key]
    const nilai = assessment?.nilai ?? null
    const fakta_analisis = assessment?.fakta_analisis ?? ''
    const rekomendasi = assessment?.rekomendasi ?? ''
    const isEditingNote = editingCatatan === key
    
    const hasNotes = !!(fakta_analisis || rekomendasi)

    // Toggle: klik lagi pada nilai yang sama → hapus penilaian
    function handleNilai(newNilai: NilaiEP) {
        onUpdateNilai(pokjaCode, standarKode, ep.kode, nilai === newNilai ? null : newNilai)
    }

    // Status indicator — pakai full class string (Tailwind tidak support dynamic interpolation)
    const statusDot = nilai === 'terpenuhi' ? 'bg-emerald-500 ring-2 ring-emerald-200'
        : nilai === 'sebagian' ? 'bg-amber-500 ring-2 ring-amber-200'
        : nilai === 'tidak' ? 'bg-red-500 ring-2 ring-red-200'
        : 'bg-gray-300'

    // Penilaian label ringkas untuk collapsed view
    const nilaiTag = nilai === 'terpenuhi' ? { text: 'Terpenuhi', cls: 'bg-emerald-100 text-emerald-700' }
        : nilai === 'sebagian' ? { text: 'Sebagian', cls: 'bg-amber-100 text-amber-700' }
        : nilai === 'tidak' ? { text: 'Tidak', cls: 'bg-red-100 text-red-700' }
        : null

    // RDOW badge styling
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

    const dokumen = ep.dokumen ?? []
    const bukti = ep.bukti ?? []

    return (
        <div className="border-b border-gray-100 last:border-b-0 transition-colors">
            {/* === Collapsed Header (selalu terlihat) === */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-blue-50/40 transition-colors"
            >
                {/* Expand/Collapse icon */}
                <div className="shrink-0">
                    {isExpanded
                        ? <ChevronDown className="w-4 h-4 text-indigo-500" />
                        : <ChevronRight className="w-4 h-4 text-gray-400" />
                    }
                </div>

                {/* Status dot */}
                <div className={`w-3 h-3 rounded-full shrink-0 ${statusDot} transition-all`} />

                {/* EP Kode + RDOW badges */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-sm font-bold text-gray-800">{ep.kode}</span>
                    {bukti.length > 0 && bukti.map(b => (
                        <span key={b}
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border leading-none ${buktiColors[b] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}
                            title={buktiLabels[b] ?? b}>
                            {b}
                        </span>
                    ))}
                </div>

                {/* Deskripsi singkat (collapsed) */}
                {!isExpanded && ep.deskripsi && (
                    <span className="text-sm text-gray-400 truncate flex-1 min-w-0">
                        {ep.deskripsi}
                    </span>
                )}

                {/* Status tag + info ringkas di sisi kanan */}
                <div className="flex items-center gap-2 ml-auto shrink-0">
                    {nilaiTag && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${nilaiTag.cls}`}>
                            {nilaiTag.text}
                        </span>
                    )}
                    {hasNotes && !isExpanded && (
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    )}
                    {dokumen.length > 0 && !isExpanded && (
                        <span className="text-[10px] text-slate-400 font-medium">
                            {dokumen.length} dok
                        </span>
                    )}
                </div>
            </button>

            {/* === Expanded Content === */}
            {isExpanded && (
                <div className="px-5 pb-4 pl-[3.75rem]">
                    {/* Deskripsi lengkap */}
                    {ep.deskripsi && (
                        <p className="text-sm text-gray-500 mb-3 leading-relaxed">{ep.deskripsi}</p>
                    )}

                    {/* Penilaian Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNilai('terpenuhi') }}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                                ${nilai === 'terpenuhi'
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                                }`}>
                            <CheckCircle2 className="w-4 h-4" />
                            Terpenuhi
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNilai('sebagian') }}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                                ${nilai === 'sebagian'
                                    ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                                    : 'bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100'
                                }`}>
                            <AlertCircle className="w-4 h-4" />
                            Sebagian
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNilai('tidak') }}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                                ${nilai === 'tidak'
                                    ? 'bg-red-500 text-white shadow-md shadow-red-200'
                                    : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                                }`}>
                            <XCircle className="w-4 h-4" />
                            Tidak
                        </button>

                    </div>

                    {/* Dokumen terkait EP */}
                    {dokumen.length > 0 && (
                        <div className="mt-3 bg-slate-50 rounded-xl border border-slate-200 p-3">
                            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                {dokumen.length} Dokumen
                            </p>
                            <div className="space-y-1.5">
                                {dokumen.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-2 group">
                                        <span className="text-sm text-gray-600 truncate flex-1" title={doc.name}>
                                            {doc.name}
                                        </span>
                                        {doc.link && (
                                            <a href={doc.link} target="_blank" rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                                                <ExternalLink className="w-3 h-3" /> Lihat
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Catatan input selalu tampil */}
                    <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <span className="text-xs font-semibold text-slate-500 mb-1 block">Fakta dan Analisis:</span>
                            <textarea
                                value={fakta_analisis}
                                onClick={e => e.stopPropagation()}
                                onChange={e => onUpdateFaktaAnalisis(pokjaCode, standarKode, ep.kode, e.target.value)}
                                placeholder="Tulis fakta dan analisis..."
                                rows={3}
                                className="w-full text-sm bg-blue-50/50 border-2 border-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-700 placeholder-gray-400 resize-none transition-all"
                            />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-slate-500 mb-1 block">Rekomendasi:</span>
                            <textarea
                                value={rekomendasi}
                                onClick={e => e.stopPropagation()}
                                onChange={e => onUpdateRekomendasi(pokjaCode, standarKode, ep.kode, e.target.value)}
                                placeholder="Tulis rekomendasi..."
                                rows={3}
                                className="w-full text-sm bg-blue-50/50 border-2 border-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-700 placeholder-gray-400 resize-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
