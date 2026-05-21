'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { getStandarEPHierarchy } from '@/app/actions'
import { supabase } from '@/lib/supabase'
import {
    ChevronDown, ChevronRight, CheckCircle2, Cloud, CloudOff, Check,
    Search, Loader2, MessageSquare, ExternalLink, FileText, Menu,
    LogOut, UserCircle, AlertCircle, XCircle, Download
} from 'lucide-react'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/navigation'

// ============ TYPES ============

interface EPDoc { name: string; link: string }
interface EPItem { kode: string; deskripsi: string; bukti?: string[]; dokumen?: EPDoc[] }
interface StandarItem { kode: string; deskripsi: string; epList: EPItem[] }
interface PokjaStandarData { pokjaCode: string; pokjaName: string; standarList: StandarItem[] }

type NilaiEP = 'terpenuhi' | 'sebagian' | 'tidak' | null
type StatusPic = 'pending' | 'completed' | 'in_progress'

interface EPAssessment { 
    nilai: NilaiEP; 
    fakta_analisis: string;
    rekomendasi: string;
    rekomendasi_pic: string;
    status_pic: StatusPic;
}

type AssessmentStore = Record<string, EPAssessment>

const SESSION_KEY = 'akredmonit_session_id'
const PIC_STORAGE_KEY = 'akredmonit_pic_v1'

// ============ HELPERS ============

function buildKey(pokja: string, standar: string, ep: string) {
    return `${pokja}|${standar}|${ep}`
}

function parseKey(key: string) {
    const parts = key.split('|')
    const [pokjaCode = '', standarKode = '', epKode = ''] = parts
    return { pokjaCode, standarKode, epKode }
}

function nilaiLabel(nilai: NilaiEP): string {
    if (nilai === 'terpenuhi') return 'Terpenuhi'
    if (nilai === 'sebagian') return 'Terpenuhi Sebagian'
    if (nilai === 'tidak') return 'Tidak Terpenuhi'
    return 'Belum Dinilai'
}

// ============ MAIN COMPONENT ============

export function PicClient() {
    const [sessionId, setSessionId] = useState<string>('ASESMEN_RS_DEFAULT_2024')
    const [sessionName, setSessionName] = useState<string>('RS Default (2024)')
    const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false)

    // Fetch active session from Supabase
    useEffect(() => {
        async function fetchActiveSession() {
            try {
                const { data, error } = await supabase
                    .from('assessment_sessions')
                    .select('assessment_id, rumah_sakit, tahun_akreditasi')
                    .eq('is_aktif', true)
                    .maybeSingle()
                
                if (!error && data) {
                    setSessionId(data.assessment_id)
                    setSessionName(`${data.rumah_sakit} (${data.tahun_akreditasi})`)
                }
            } catch (e) {
                console.error('Gagal memuat sesi aktif:', e)
            } finally {
                setIsSessionLoaded(true)
            }
        }
        fetchActiveSession()
    }, [])
    const [store, setStore] = useState<AssessmentStore>({})
    const [activePokjaIdx, setActivePokjaIdx] = useState(0)
    const [expandedStandar, setExpandedStandar] = useState<Set<string>>(new Set())
    const [filterStatus, setFilterStatus] = useState<StatusPic | 'semua'>('semua')
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'saved' | 'error'>('idle')
    const [lastSaved, setLastSaved] = useState<string | null>(null)
    const [standarEPData, setStandarEPData] = useState<PokjaStandarData[]>([])
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [editingRekomendasi, setEditingRekomendasi] = useState<string | null>(null)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const router = useRouter()

    const picUser = { name: "Penanggung Jawab (PIC)", role: "PIC" }

    // Load dari Supabase
    useEffect(() => {
        if (!isSessionLoaded) return

        async function loadFromSupabase() {
            try {
                const { data, error } = await supabase
                    .from('assessments')
                    .select('pokja_code, standar_kode, ep_kode, nilai, fakta_analisis, rekomendasi, rekomendasi_pic, status_pic')
                    .eq('assessment_id', sessionId)

                if (error) {
                    console.error("Error fetching assessments:", error.message)
                    throw error
                }

                if (data && data.length > 0) {
                    const loaded: AssessmentStore = {}
                    for (const row of data) {
                        const key = buildKey(row.pokja_code, row.standar_kode, row.ep_kode)
                        loaded[key] = { 
                            nilai: row.nilai, 
                            fakta_analisis: row.fakta_analisis || '',
                            rekomendasi: row.rekomendasi || '',
                            rekomendasi_pic: row.rekomendasi_pic || '',
                            status_pic: row.status_pic || 'pending'
                        }
                    }
                    setStore(loaded)
                    setSyncStatus('saved')
                    setLastSaved(new Date().toLocaleTimeString('id-ID'))
                } else {
                    // Fallback to localStorage only for default session
                    if (sessionId === 'ASESMEN_RS_DEFAULT_2024') {
                        const saved = localStorage.getItem(PIC_STORAGE_KEY)
                        if (saved) setStore(JSON.parse(saved))
                    } else {
                        setStore({})
                    }
                    setSyncStatus('idle')
                }
            } catch {
                if (sessionId === 'ASESMEN_RS_DEFAULT_2024') {
                    try {
                        const saved = localStorage.getItem(PIC_STORAGE_KEY)
                        if (saved) setStore(JSON.parse(saved))
                    } catch { /* ignore */ }
                }
                setSyncStatus('idle')
            }
        }
        loadFromSupabase()
    }, [sessionId, isSessionLoaded])

    // Load data standar dari server
    useEffect(() => {
        async function loadData() {
            try {
                const data = await getStandarEPHierarchy()
                // PIC bisa melihat semua pokja
                setStandarEPData(data)
            } catch (error) {
                console.error('Gagal memuat data Standar & EP:', error)
            } finally {
                setIsLoadingData(false)
            }
        }
        loadData()
    }, [])

    // Sync ke Supabase
    const syncToSupabase = useCallback(async (currentStore: AssessmentStore) => {
        if (!isSessionLoaded) return

        // Always save to localStorage as backup if default session
        if (sessionId === 'ASESMEN_RS_DEFAULT_2024') {
            try { localStorage.setItem(PIC_STORAGE_KEY, JSON.stringify(currentStore)) } catch { /* ignore */ }
        }

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
                    rekomendasi_pic: val.rekomendasi_pic || '',
                    status_pic: val.status_pic || 'pending'
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
    }, [sessionId, isSessionLoaded])

    // Debounce sync
    useEffect(() => {
        const timeout = setTimeout(() => syncToSupabase(store), 1200)
        return () => clearTimeout(timeout)
    }, [store, syncToSupabase])

    const activePokja = standarEPData[activePokjaIdx] ?? null

    const filteredStandar = useMemo(() => {
        if (!activePokja) return []
        return activePokja.standarList.filter(std => {
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                const matchStd = std.kode.toLowerCase().includes(q) || std.deskripsi.toLowerCase().includes(q)
                const matchEP = std.epList.some(ep =>
                    ep.kode.toLowerCase().includes(q) || ep.deskripsi.toLowerCase().includes(q)
                )
                if (!matchStd && !matchEP) return false
            }
            if (filterStatus !== 'semua') {
                const hasMatch = std.epList.some(ep => {
                    const key = buildKey(activePokja.pokjaCode, std.kode, ep.kode)
                    const a = store[key]
                    const status = a?.status_pic || 'pending'
                    return status === filterStatus
                })
                if (!hasMatch) return false
            }
            return true
        })
    }, [activePokja, searchQuery, filterStatus, store])

    function updateRekomendasi(pokjaCode: string, standarKode: string, epKode: string, rekomendasi: string) {
        const key = buildKey(pokjaCode, standarKode, epKode)
        setStore(prev => ({
            ...prev,
            [key]: { 
                ...prev[key], 
                nilai: prev[key]?.nilai || null,
                fakta_analisis: prev[key]?.fakta_analisis || '',
                rekomendasi: prev[key]?.rekomendasi || '',
                rekomendasi_pic: rekomendasi,
                status_pic: prev[key]?.status_pic || 'pending'
            }
        }))
    }

    function updateStatusPic(pokjaCode: string, standarKode: string, epKode: string, status: StatusPic) {
        const key = buildKey(pokjaCode, standarKode, epKode)
        setStore(prev => ({
            ...prev,
            [key]: { 
                ...prev[key], 
                nilai: prev[key]?.nilai || null,
                fakta_analisis: prev[key]?.fakta_analisis || '',
                rekomendasi: prev[key]?.rekomendasi || '',
                rekomendasi_pic: prev[key]?.rekomendasi_pic || '',
                status_pic: status
            }
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

    function handleLogout() {
        if (!confirm('Kembali ke Dashboard Utama?')) return
        router.push('/')
    }

    function exportExcel() {
        if (!activePokja) return
        const data = []
        let no = 1
        for (const std of activePokja.standarList) {
            for (const ep of std.epList) {
                const key = buildKey(activePokja.pokjaCode, std.kode, ep.kode)
                const a = store[key]
                const rekPic = a?.rekomendasi_pic || ''
                data.push({
                    'No': no++,
                    'Standar': std.kode,
                    'Element Penilaian': ep.kode,
                    'Rekomendasi/ Bukti Perbaikan': rekPic
                })
            }
        }
        
        const ws = XLSX.utils.json_to_sheet(data)
        // Mengatur lebar kolom agar rapi
        ws['!cols'] = [
            { wch: 5 },   // No
            { wch: 15 },  // Standar
            { wch: 20 },  // Element Penilaian
            { wch: 60 }   // Rekomendasi/ Bukti Perbaikan
        ]

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Rekomendasi")
        XLSX.writeFile(wb, `Rekomendasi_PIC_${activePokja.pokjaCode}_${new Date().toISOString().slice(0, 10)}.xlsx`)
    }

    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <p className="text-gray-500 text-base">Memuat data PIC...</p>
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
            
            {showMobileMenu && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden" 
                    onClick={() => setShowMobileMenu(false)}
                />
            )}

            {/* ====== SIDEBAR ====== */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 flex flex-col shadow-xl transform transition-transform duration-300 md:relative md:translate-x-0 shrink-0 ${
                showMobileMenu ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="p-5 bg-slate-900 border-b border-slate-700">
                    <h1 className="text-xl font-bold text-white">Tindak Lanjut PIC</h1>
                    <p className="text-xs text-slate-300 mt-1">Rekomendasi & Perbaikan EP</p>
                    <div className="mt-3 bg-slate-800/60 rounded-lg p-2.5 border border-slate-700">
                        <p className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Sesi Kegiatan</p>
                        <p className="text-xs font-semibold text-white truncate mt-0.5" title={sessionName}>{sessionName}</p>
                    </div>
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
                                    setFilterStatus('semua')
                                    setShowMobileMenu(false)
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors
                                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`}>
                                {pokja.pokjaCode}
                            </button>
                        )
                    })}
                </div>

                {/* Sidebar Footer User Info */}
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                    <div className="flex items-center gap-3">
                        <UserCircle className="w-8 h-8 text-blue-400" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{picUser.name}</p>
                            <p className="text-xs text-slate-400 truncate">{picUser.role}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ====== MAIN CONTENT ====== */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
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
                                <span className="text-xs text-red-500 flex items-center gap-1.5 font-medium">
                                    <CloudOff className="w-3.5 h-3.5" /> Offline
                                </span>
                            )}
                        </div>

                        <button onClick={exportExcel}
                            className="p-2 rounded-lg hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 transition-colors border border-gray-200" title="Export Excel">
                            <Download className="w-5 h-5" />
                        </button>

                        <button onClick={handleLogout}
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors border border-gray-200" title="Keluar">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto space-y-6">
                        
                        {/* ====== TOOLS: Search & Filter ====== */}
                        {activePokja && (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari standar atau elemen penilaian..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-800 shadow-sm"
                                    />
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={e => setFilterStatus(e.target.value as StatusPic | 'semua')}
                                    className="px-4 py-2.5 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 cursor-pointer font-medium shadow-sm">
                                    <option value="semua">Semua Status PIC</option>
                                    <option value="pending">⏳ Pending</option>
                                    <option value="in_progress">🚧 Dalam Proses</option>
                                    <option value="completed">✅ Selesai</option>
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

                                    const visibleEPs = standar.epList.filter(ep => {
                                        if (filterStatus === 'semua') return true
                                        const key = buildKey(activePokja.pokjaCode, standar.kode, ep.kode)
                                        const a = store[key]
                                        const status = a?.status_pic || 'pending'
                                        return status === filterStatus
                                    })

                                    return (
                                        <div key={standar.kode} className="bg-white rounded-2xl overflow-hidden shadow-sm border-l-4 border-l-blue-500 border border-gray-100">
                                            {/* Standar Header */}
                                            <button
                                                onClick={() => toggleStandar(standar.kode)}
                                                className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors">
                                                <div className="mt-0.5 shrink-0">
                                                    {isExpanded
                                                        ? <ChevronDown className="w-6 h-6 text-blue-500" />
                                                        : <ChevronRight className="w-6 h-6 text-gray-400" />
                                                    }
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-base font-bold text-slate-800">{standar.kode}</span>
                                                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{standar.epList.length} EP</span>
                                                    </div>
                                                    {standar.deskripsi && (
                                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                                            {standar.deskripsi}
                                                        </p>
                                                    )}
                                                </div>
                                            </button>

                                            {/* EP List */}
                                            {isExpanded && (
                                                <div className="border-t border-gray-100 bg-slate-50/50">
                                                    {visibleEPs.length === 0 ? (
                                                        <p className="text-center text-gray-400 text-sm py-6">
                                                            Tidak ada EP dengan status ini.
                                                        </p>
                                                    ) : (
                                                        visibleEPs.map(ep => (
                                                            <EPRowPic
                                                                key={ep.kode}
                                                                ep={ep}
                                                                pokjaCode={activePokja.pokjaCode}
                                                                standarKode={standar.kode}
                                                                store={store}
                                                                editingRekomendasi={editingRekomendasi}
                                                                onSetEditingRekomendasi={setEditingRekomendasi}
                                                                onUpdateRekomendasi={updateRekomendasi}
                                                                onUpdateStatusPic={updateStatusPic}
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

function EPRowPic({
    ep, pokjaCode, standarKode, store, editingRekomendasi, onSetEditingRekomendasi, onUpdateRekomendasi, onUpdateStatusPic
}: {
    ep: EPItem
    pokjaCode: string
    standarKode: string
    store: AssessmentStore
    editingRekomendasi: string | null
    onSetEditingRekomendasi: (key: string | null) => void
    onUpdateRekomendasi: (pokja: string, standar: string, ep: string, rek: string) => void
    onUpdateStatusPic: (pokja: string, standar: string, ep: string, status: StatusPic) => void
}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const key = buildKey(pokjaCode, standarKode, ep.kode)
    const assessment = store[key]
    
    // Surveyor Data (Read Only for PIC)
    const nilai = assessment?.nilai ?? null

    
    // PIC Data
    const rekomendasi = assessment?.rekomendasi_pic ?? ''
    const isEditing = editingRekomendasi === key

    return (
        <div className="border-b border-gray-200 last:border-b-0 transition-colors">
            {/* Collapsed Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-white transition-colors"
            >
                <div className="shrink-0">
                    {isExpanded
                        ? <ChevronDown className="w-4 h-4 text-blue-500" />
                        : <ChevronRight className="w-4 h-4 text-gray-400" />
                    }
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-slate-800 w-16">{ep.kode}</span>
                </div>

                {!isExpanded && ep.deskripsi && (
                    <span className="text-sm text-gray-500 flex-1 pr-4">
                        {ep.deskripsi}
                    </span>
                )}

                <div className="flex items-center gap-2 ml-auto shrink-0">
                    {/* Status Rekomendasi Badge */}
                    {rekomendasi.trim() ? (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700" title="Rekomendasi sudah diisi">
                            Sudah Diisi
                        </span>
                    ) : (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500" title="Belum ada rekomendasi">
                            Belum Diisi
                        </span>
                    )}
                </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-5 pb-5 pl-12">
                    {ep.deskripsi && (
                        <p className="text-sm text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            {ep.deskripsi}
                        </p>
                    )}

                        {/* Kolom Kanan: Input PIC */}
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-slate-600 font-semibold">Rekomendasi / Bukti Perbaikan:</span>
                                </div>
                                <textarea
                                    value={rekomendasi}
                                    onChange={e => onUpdateRekomendasi(pokjaCode, standarKode, ep.kode, e.target.value)}
                                    placeholder="Ketik langkah perbaikan atau link bukti perbaikan di sini..."
                                    rows={3}
                                    className="w-full text-sm bg-white border border-blue-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-700 resize-y transition-all"
                                />
                            </div>
                        </div>
                </div>
            )}
        </div>
    )
}
