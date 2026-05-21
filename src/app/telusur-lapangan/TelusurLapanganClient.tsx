'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
    Plus, Trash2, Download, RefreshCw, ArrowLeft,
    Search, Loader2, CheckCircle2, Cloud, CloudOff, AlertCircle,
    Key, LogOut, ShieldCheck, Stethoscope, Users, Building
} from 'lucide-react'
import * as XLSX from 'xlsx'
import Link from 'next/link'

// ============ TYPES ============

interface TelusurItem {
    id: string
    nama_ruang: string
    temuan: string
    rekomendasi: string
    penanggung_jawab: string
}

type SyncState = 'idle' | 'syncing' | 'saved' | 'error'
type SessionType = 'medis' | 'keperawatan' | 'manajemen'

const SESSION_STORAGE_KEY = 'akredmonit_telusur_active_session'

// ============ DESKTOP ROW COMPONENT (Isolated state to avoid focus loss) ============

interface RowProps {
    item: TelusurItem
    onUpdate: (id: string, field: keyof TelusurItem, value: string) => void
    onDelete: (id: string) => void
}

const TableRowItem = React.memo(({ item, onUpdate, onDelete }: RowProps) => {
    const [localRuang, setLocalRuang] = useState(item.nama_ruang)
    const [localTemuan, setLocalTemuan] = useState(item.temuan)
    const [localRekomendasi, setLocalRekomendasi] = useState(item.rekomendasi)
    const [localPIC, setLocalPIC] = useState(item.penanggung_jawab)

    useEffect(() => {
        setLocalRuang(item.nama_ruang)
    }, [item.nama_ruang])

    useEffect(() => {
        setLocalTemuan(item.temuan)
    }, [item.temuan])

    useEffect(() => {
        setLocalRekomendasi(item.rekomendasi)
    }, [item.rekomendasi])

    useEffect(() => {
        setLocalPIC(item.penanggung_jawab)
    }, [item.penanggung_jawab])

    const handleBlur = (field: keyof TelusurItem, value: string) => {
        onUpdate(item.id, field, value)
    }

    return (
        <tr className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors duration-150">
            <td className="p-4 align-top">
                <input
                    type="text"
                    value={localRuang}
                    onChange={(e) => setLocalRuang(e.target.value)}
                    onBlur={() => handleBlur('nama_ruang', localRuang)}
                    placeholder="Ketik nama ruang..."
                    className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-slate-800 text-sm font-medium py-1 px-1 focus:bg-white focus:px-3 focus:py-1.5 focus:rounded-xl focus:shadow-sm focus:border focus:border-red-200 transition-all duration-150"
                />
            </td>
            <td className="p-4 align-top">
                <textarea
                    rows={1}
                    value={localTemuan}
                    onChange={(e) => setLocalTemuan(e.target.value)}
                    onBlur={() => handleBlur('temuan', localTemuan)}
                    placeholder="Tulis temuan lapangan di sini..."
                    className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-slate-700 text-sm resize-y py-1 px-1 focus:bg-white focus:px-3 focus:py-1.5 focus:rounded-xl focus:shadow-sm focus:border focus:border-red-200 transition-all duration-150 min-h-[38px]"
                />
            </td>
            <td className="p-4 align-top">
                <textarea
                    rows={1}
                    value={localRekomendasi}
                    onChange={(e) => setLocalRekomendasi(e.target.value)}
                    onBlur={() => handleBlur('rekomendasi', localRekomendasi)}
                    placeholder="Tulis rekomendasi perbaikan..."
                    className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-slate-700 text-sm resize-y py-1 px-1 focus:bg-white focus:px-3 focus:py-1.5 focus:rounded-xl focus:shadow-sm focus:border focus:border-red-200 transition-all duration-150 min-h-[38px]"
                />
            </td>
            <td className="p-4 align-top">
                <input
                    type="text"
                    value={localPIC}
                    onChange={(e) => setLocalPIC(e.target.value)}
                    onBlur={() => handleBlur('penanggung_jawab', localPIC)}
                    placeholder="Penanggung Jawab / PIC..."
                    className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-slate-800 text-sm py-1 px-1 focus:bg-white focus:px-3 focus:py-1.5 focus:rounded-xl focus:shadow-sm focus:border focus:border-red-200 transition-all duration-150"
                />
            </td>
            <td className="p-4 align-top text-center">
                <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-white hover:bg-red-600 p-2 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer mt-0.5"
                    title="Hapus baris"
                >
                    <Trash2 className="w-4.5 h-4.5" />
                </button>
            </td>
        </tr>
    )
})

TableRowItem.displayName = 'TableRowItem'

// ============ MOBILE CARD COMPONENT (Isolated state to avoid focus loss) ============

const MobileCardItem = React.memo(({ item, onUpdate, onDelete }: RowProps) => {
    const [localRuang, setLocalRuang] = useState(item.nama_ruang)
    const [localTemuan, setLocalTemuan] = useState(item.temuan)
    const [localRekomendasi, setLocalRekomendasi] = useState(item.rekomendasi)
    const [localPIC, setLocalPIC] = useState(item.penanggung_jawab)

    useEffect(() => {
        setLocalRuang(item.nama_ruang)
    }, [item.nama_ruang])

    useEffect(() => {
        setLocalTemuan(item.temuan)
    }, [item.temuan])

    useEffect(() => {
        setLocalRekomendasi(item.rekomendasi)
    }, [item.rekomendasi])

    useEffect(() => {
        setLocalPIC(item.penanggung_jawab)
    }, [item.penanggung_jawab])

    const handleBlur = (field: keyof TelusurItem, value: string) => {
        onUpdate(item.id, field, value)
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-md hover:shadow-lg transition-all duration-200 space-y-4 relative">
            {/* Header Card */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Form Temuan Lapangan</span>
                </div>
                <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-white hover:bg-red-600 p-2 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
                    title="Hapus Temuan"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Form Fields Stacked */}
            <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Ruang / Unit</label>
                    <input
                        type="text"
                        value={localRuang}
                        onChange={(e) => setLocalRuang(e.target.value)}
                        onBlur={() => handleBlur('nama_ruang', localRuang)}
                        placeholder="Masukkan nama ruang..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm font-medium focus:bg-white focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-150"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Temuan Masalah</label>
                    <textarea
                        rows={2}
                        value={localTemuan}
                        onChange={(e) => setLocalTemuan(e.target.value)}
                        onBlur={() => handleBlur('temuan', localTemuan)}
                        placeholder="Deskripsikan temuan di lapangan..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-sm focus:bg-white focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-150 resize-y"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rekomendasi Perbaikan</label>
                    <textarea
                        rows={2}
                        value={localRekomendasi}
                        onChange={(e) => setLocalRekomendasi(e.target.value)}
                        onBlur={() => handleBlur('rekomendasi', localRekomendasi)}
                        placeholder="Langkah perbaikan yang disarankan..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-sm focus:bg-white focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-150 resize-y"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Penanggung Jawab (PIC)</label>
                    <input
                        type="text"
                        value={localPIC}
                        onChange={(e) => setLocalPIC(e.target.value)}
                        onBlur={() => handleBlur('penanggung_jawab', localPIC)}
                        placeholder="Contoh: Kepala Ruangan, IPSRS"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm focus:bg-white focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-150"
                    />
                </div>
            </div>
        </div>
    )
})

MobileCardItem.displayName = 'MobileCardItem'

// ============ MAIN CLIENT COMPONENT ============

export function TelusurLapanganClient() {
    const [baseSessionId, setBaseSessionId] = useState<string>('ASESMEN_RS_DEFAULT_2024')
    const [baseSessionName, setBaseSessionName] = useState<string>('RS Default (2024)')
    const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false)

    const [activeSession, setActiveSession] = useState<SessionType | null>(null)
    const [list, setList] = useState<TelusurItem[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [syncStatus, setSyncStatus] = useState<SyncState>('idle')
    const [lastSaved, setLastSaved] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

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
                    setBaseSessionId(data.assessment_id)
                    setBaseSessionName(`${data.rumah_sakit} (${data.tahun_akreditasi})`)
                }
            } catch (e) {
                console.error('Gagal memuat sesi aktif:', e)
            } finally {
                setIsSessionLoaded(true)
            }
        }
        fetchActiveSession()
    }, [])

    // Deteksi Sesi yang Aktif
    useEffect(() => {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY)
        if (stored === 'medis' || stored === 'keperawatan' || stored === 'manajemen') {
            setActiveSession(stored as SessionType)
        } else {
            setIsLoading(false)
        }
    }, [])

    const compoundSessionId = useMemo(() => {
        if (!activeSession) return baseSessionId
        return `${baseSessionId}|${activeSession}`
    }, [activeSession, baseSessionId])

    const localStorageDataKey = useMemo(() => {
        if (!activeSession) return 'akredmonit_telusur_lapangan_v1'
        return `akredmonit_telusur_lapangan_v1_${activeSession}`
    }, [activeSession])

    // Load Data berdasarkan Sesi Aktif
    useEffect(() => {
        if (!activeSession || !isSessionLoaded) return

        async function loadData() {
            setIsLoading(true)
            try {
                const { data, error } = await supabase
                    .from('telusur_lapangan')
                    .select('id, nama_ruang, temuan, rekomendasi, penanggung_jawab')
                    .eq('session_id', compoundSessionId)
                    .order('created_at', { ascending: true })

                if (error) {
                    throw error
                }

                if (data && data.length > 0) {
                    setList(data)
                    setSyncStatus('saved')
                    setLastSaved(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\./g, ':'))
                } else {
                    // Fallback to local storage
                    const local = localStorage.getItem(localStorageDataKey)
                    if (local) {
                        setList(JSON.parse(local))
                    } else {
                        // Default blank row to begin with
                        setList([{
                            id: crypto.randomUUID(),
                            nama_ruang: '',
                            temuan: '',
                            rekomendasi: '',
                            penanggung_jawab: ''
                        }])
                    }
                }
            } catch (err) {
                console.warn('Gagal memuat data dari Supabase, memuat dari local storage...', err)
                const local = localStorage.getItem(localStorageDataKey)
                if (local) {
                    setList(JSON.parse(local))
                } else {
                    setList([{
                        id: crypto.randomUUID(),
                        nama_ruang: '',
                        temuan: '',
                        rekomendasi: '',
                        penanggung_jawab: ''
                    }])
                }
                setSyncStatus('idle')
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [activeSession, compoundSessionId, localStorageDataKey, isSessionLoaded])

    // Sinkronisasi ke Supabase + backup LocalStorage
    const syncToDatabase = useCallback(async (currentList: TelusurItem[]) => {
        if (!activeSession || !isSessionLoaded) return

        // Simpan ke local storage terlebih dahulu sebagai backup cadangan
        try {
            localStorage.setItem(localStorageDataKey, JSON.stringify(currentList))
        } catch (e) {
            console.error('Gagal menulis ke localStorage:', e)
        }

        if (currentList.length === 0) {
            setSyncStatus('saved')
            setLastSaved(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\./g, ':'))
            return
        }

        setSyncStatus('syncing')
        try {
            // Persiapkan record dengan session_id composite
            const records = currentList.map(item => ({
                id: item.id,
                session_id: compoundSessionId,
                nama_ruang: item.nama_ruang || '',
                temuan: item.temuan || '',
                rekomendasi: item.rekomendasi || '',
                penanggung_jawab: item.penanggung_jawab || '',
                updated_at: new Date().toISOString()
            }))

            // Lakukan upsert ke Supabase
            const { error } = await supabase
                .from('telusur_lapangan')
                .upsert(records, { onConflict: 'id' })

            if (error) throw error

            setSyncStatus('saved')
            setLastSaved(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\./g, ':'))
        } catch (err) {
            console.error('Autosave ke Supabase gagal:', err)
            setSyncStatus('error')
        }
    }, [activeSession, compoundSessionId, localStorageDataKey, isSessionLoaded])

    // Debounced Autosave (1.5 detik setelah ada perubahan data list)
    useEffect(() => {
        if (isLoading || !activeSession || !isSessionLoaded) return
        const handler = setTimeout(() => {
            syncToDatabase(list)
        }, 1500)
        return () => clearTimeout(handler)
    }, [list, syncToDatabase, isLoading, activeSession, isSessionLoaded])

    // CRUD: Update Item Field
    const handleUpdateField = useCallback((id: string, field: keyof TelusurItem, value: string) => {
        setList(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value }
            }
            return item
        }))
    }, [])

    // CRUD: Tambah Baris Baru
    const handleAddRow = () => {
        setList(prev => [...prev, {
            id: crypto.randomUUID(),
            nama_ruang: '',
            temuan: '',
            rekomendasi: '',
            penanggung_jawab: ''
        }])
    }

    // CRUD: Hapus Baris
    const handleDeleteRow = useCallback(async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus baris telusur ini?')) {
            const originalList = [...list]
            const updated = list.filter(item => item.id !== id)
            setList(updated)

            // Jalankan penghapusan langsung di database
            try {
                const { error } = await supabase
                    .from('telusur_lapangan')
                    .delete()
                    .eq('id', id)

                if (error) throw error

                // Simpan ke local storage
                localStorage.setItem(localStorageDataKey, JSON.stringify(updated))
            } catch (err) {
                console.error('Gagal menghapus data dari Supabase:', err)
                // Jika gagal di database, tetap sinkronkan local list
                setList(originalList)
                alert('Gagal menghapus dari server. Periksa koneksi internet Anda.')
            }
        }
    }, [list, localStorageDataKey])

    // INSTANT SELECT SESSION
    const handleSelectSession = (keyword: SessionType) => {
        localStorage.setItem(SESSION_STORAGE_KEY, keyword)
        setActiveSession(keyword)
    }

    // LOGOUT / KELUAR SESI
    const handleLogout = () => {
        if (window.confirm('Keluar dari sesi ini? Semua perubahan terakhir Anda telah disimpan.')) {
            localStorage.removeItem(SESSION_STORAGE_KEY)
            setActiveSession(null)
            setList([])
        }
    }

    // EXPORT KE EXCEL (Format Rapi Premium)
    const handleExportExcel = () => {
        if (list.length === 0 || (list.length === 1 && !list[0].nama_ruang)) {
            alert('Belum ada data telusur lapangan untuk diekspor.')
            return
        }

        const headers = ['NAMA RUANG', 'TEMUAN', 'REKOMENDASI', 'PENANGGUNG JAWAB']
        
        // Memformat data agar bersih
        const dataRows = list.map(item => [
            item.nama_ruang || '-',
            item.temuan || '-',
            item.rekomendasi || '-',
            item.penanggung_jawab || '-'
        ])

        const readableSession = activeSession ? activeSession.toUpperCase() : 'UMUM'

        // Struktur baris
        const aoa = [
            [`LAPORAN HASIL TELUSUR LAPANGAN RUMAH SAKIT - SESI ${readableSession}`],
            [`Sesi Pemantauan Akreditasi - Tanggal Unduh: ${new Date().toLocaleDateString('id-ID')}`],
            [], // Spacer kosong
            headers,
            ...dataRows
        ]

        // Membuat worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(aoa)

        // Penyesuaian Lebar Kolom
        worksheet['!cols'] = [
            { wch: 28 }, // Nama Ruang
            { wch: 45 }, // Temuan
            { wch: 45 }, // Rekomendasi
            { wch: 28 }  // Penanggung Jawab
        ]

        // Merge Judul di bagian atas
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
            { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }
        ]

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, `Telusur ${readableSession}`)

        // File download trigger
        XLSX.writeFile(workbook, `Telusur_Lapangan_${readableSession}_${new Date().toISOString().split('T')[0]}.xlsx`)
    }

    // Filter Data berdasarkan Search Query
    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return list
        const query = searchQuery.toLowerCase()
        return list.filter(item => 
            item.nama_ruang.toLowerCase().includes(query) ||
            item.temuan.toLowerCase().includes(query) ||
            item.rekomendasi.toLowerCase().includes(query) ||
            item.penanggung_jawab.toLowerCase().includes(query)
        )
    }, [list, searchQuery])

    // ============ RENDER LOGIN SCREEN ============
    if (!activeSession) {
        return (
            <main className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-red-950 font-sans flex flex-col justify-between p-4 md:p-6">
                <div className="flex-1 flex items-center justify-center py-8">
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
                        <div className="text-center space-y-2">
                            <div className="mx-auto w-12 h-12 md:w-14 md:h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg border border-red-500/20">
                                <Key className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Login Sesi Telusur</h1>
                            <p className="text-slate-300 text-xs md:text-sm">Silakan pilih salah satu kelompok di bawah ini untuk masuk</p>
                            {isSessionLoaded && (
                                <div className="inline-block mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <p className="text-[11px] text-slate-300 font-medium">
                                        Sesi Kegiatan Aktif: <span className="text-red-400 font-bold">{baseSessionName}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Petunjuk Keyword */}
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                            <h3 className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider">Pilih Sesi Kelompok:</h3>
                            <div className="grid grid-cols-1 gap-2.5">
                                <button 
                                    type="button"
                                    onClick={() => handleSelectSession('medis')}
                                    className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 active:scale-98 p-3 rounded-xl transition-all text-left cursor-pointer border border-white/5 group"
                                >
                                    <div className="p-2 bg-blue-500/20 text-blue-300 rounded-lg group-hover:scale-105 transition-transform">
                                        <Stethoscope className="w-4 h-4" />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-sm font-semibold text-slate-200">Kelompok Medis</span>
                                        <span className="text-[10px] md:text-xs text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full font-mono font-bold">medis</span>
                                    </div>
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => handleSelectSession('keperawatan')}
                                    className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 active:scale-98 p-3 rounded-xl transition-all text-left cursor-pointer border border-white/5 group"
                                >
                                    <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-lg group-hover:scale-105 transition-transform">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-sm font-semibold text-slate-200">Kelompok Keperawatan</span>
                                        <span className="text-[10px] md:text-xs text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full font-mono font-bold">keperawatan</span>
                                    </div>
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => handleSelectSession('manajemen')}
                                    className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 active:scale-98 p-3 rounded-xl transition-all text-left cursor-pointer border border-white/5 group"
                                >
                                    <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg group-hover:scale-105 transition-transform">
                                        <Building className="w-4 h-4" />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-sm font-semibold text-slate-200">Kelompok Manajemen</span>
                                        <span className="text-[10px] md:text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full font-mono font-bold">manajemen</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        )
    }

    // ============ RENDER MAIN TABLE SCREEN ============
    const readableSession = activeSession.charAt(0).toUpperCase() + activeSession.slice(1)

    return (
        <main className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
            <div>
                {/* Navbar / Header - Merah Putih Premium Sesuai Gambar */}
                <div className="bg-[#cc0000] text-white shadow-md relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 relative">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Link 
                                    href="/"
                                    className="p-2 bg-black/15 hover:bg-black/25 active:scale-95 rounded-xl border border-white/10 transition-all duration-200 flex items-center justify-center"
                                    title="Kembali ke Dashboard"
                                >
                                    <ArrowLeft className="w-5 h-5 text-white" />
                                </Link>
                                <div>
                                    <div className="flex items-center gap-2.5">
                                        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Telusur Lapangan</h1>
                                        <span className="bg-white/20 text-white border border-white/30 text-[10px] md:text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                                            SESI {activeSession.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-red-100 text-xs md:text-sm opacity-90 font-medium">Pencatatan Temuan, Rekomendasi, &amp; Penanggung Jawab Sesi {readableSession}</p>
                                    <p className="text-[11px] text-red-200 opacity-85 mt-0.5 font-medium">
                                        Sesi Kegiatan Aktif: <span className="text-white font-bold">{baseSessionName}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Sync & Logout Controls - Sesuai Gambar */}
                            <div className="flex flex-wrap items-center gap-2.5">
                                <div className="flex items-center gap-2 bg-black/15 px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-sm">
                                    {syncStatus === 'syncing' && (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                                            <span className="text-[10px] md:text-xs text-amber-200 font-semibold">Autosave...</span>
                                        </>
                                    )}
                                    {syncStatus === 'saved' && (
                                        <>
                                            <Cloud className="w-3.5 h-3.5 text-emerald-300" />
                                            <span className="text-[10px] md:text-xs text-emerald-200 font-semibold">Tersimpan ({lastSaved})</span>
                                        </>
                                    )}
                                    {syncStatus === 'error' && (
                                        <>
                                            <CloudOff className="w-3.5 h-3.5 text-red-300" />
                                            <span className="text-[10px] md:text-xs text-red-200 font-semibold">Offline (Tersimpan Lokal)</span>
                                        </>
                                    )}
                                    {syncStatus === 'idle' && (
                                        <>
                                            <AlertCircle className="w-3.5 h-3.5 text-slate-300" />
                                            <span className="text-[10px] md:text-xs text-slate-300 font-semibold">Offline Mode</span>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={handleExportExcel}
                                    className="flex items-center justify-center bg-[#0e9f6e] hover:bg-emerald-600 active:scale-95 text-white border border-emerald-500/20 p-2 md:p-2.5 rounded-xl md:rounded-2xl font-bold shadow-md transition-all duration-200 cursor-pointer"
                                    title="Export ke Excel"
                                >
                                    <Download className="w-4 h-4 md:w-4.5 md:h-4.5 text-white" />
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 px-4 py-2 rounded-xl md:rounded-2xl font-bold transition-all duration-200 text-[10px] md:text-xs cursor-pointer"
                                    title="Keluar Sesi / Ganti Kelompok"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    Ganti Sesi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Menu & Controls - Sesuai Gambar */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
                    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Search Bar - Sesuai Gambar */}
                        <div className="relative w-full md:flex-1 md:max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder={`Cari di sesi ${activeSession.toLowerCase()}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-red-400 focus:bg-white transition-all duration-200 shadow-inner placeholder-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    {/* Table / Card Container - Sesuai Gambar */}
                    <div className="bg-transparent md:bg-white rounded-2xl md:shadow-sm md:border md:border-slate-100 overflow-hidden">
                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-100 md:border-0 shadow-sm md:shadow-none">
                                <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                                <span className="text-slate-500 text-sm font-medium">Memuat data telusur {activeSession}...</span>
                            </div>
                        ) : (
                            <>
                                {/* === DESKTOP TABLE VIEW (Exact layout and column header matching) === */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider">
                                                <th className="p-4 text-left w-1/4">NAMA RUANG</th>
                                                <th className="p-4 text-left w-1/3">TEMUAN</th>
                                                <th className="p-4 text-left w-1/3">REKOMENDASI</th>
                                                <th className="p-4 text-left w-1/4">PENANGGUNG JAWAB</th>
                                                <th className="p-4 text-center w-12">AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {filteredList.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="p-8 text-center text-slate-400 text-sm">
                                                        Belum ada data temuan di sesi ini. Silakan klik &quot;Tambah Baris&quot; untuk memulai!
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredList.map((item) => (
                                                    <TableRowItem
                                                        key={item.id}
                                                        item={item}
                                                        onUpdate={handleUpdateField}
                                                        onDelete={handleDeleteRow}
                                                    />
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* === MOBILE CARD STACK VIEW === */}
                                <div className="block md:hidden">
                                    {filteredList.length === 0 ? (
                                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center text-slate-400 text-sm">
                                            Belum ada data temuan di sesi ini. Silakan klik &quot;Tambah Baris&quot; untuk memulai!
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {filteredList.map((item) => (
                                                <MobileCardItem
                                                    key={item.id}
                                                    item={item}
                                                    onUpdate={handleUpdateField}
                                                    onDelete={handleDeleteRow}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Action Button (FAB) - Tambah Baris (Selalu Tampil) */}
            <button
                onClick={handleAddRow}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-red-700 text-white p-4 md:px-5 md:py-3.5 rounded-full shadow-2xl active:scale-95 hover:scale-105 transition-all duration-200 cursor-pointer border border-red-500/20"
                title="Tambah Baris Telusur"
            >
                <Plus className="w-6 h-6 md:w-5 md:h-5 text-white" />
                <span className="hidden md:inline font-bold text-sm">Tambah Baris</span>
            </button>
        </main>
    )
}
