'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Plus, Edit, Trash2, Save, X, CheckCircle, Calendar, Hospital, AlertCircle } from 'lucide-react'

interface SurveyorAccess {
    id: string
    passkey: string
    surveyor_name: string
    allowed_pokja: string[]
    is_active: boolean
}

interface AssessmentSession {
    id: string
    assessment_id: string
    rumah_sakit: string
    tahun_akreditasi: string
    surveyor_name: string
    surveyor_unit: string
    is_aktif: boolean
}

const POKJA_LIST = [
    "KPS", "MFK", "MRMIK", "PMKP", "PPI", "PPK", "TKRS",
    "AKP", "HPK", "KE", "PAB", "PAP", "PKPO", "PP", "SKP", "PROGNAS"
]

export default function AdminAksesPage() {
    const [activeTab, setActiveTab] = useState<'surveyor' | 'sesi'>('surveyor')
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    // ================= SURVEYOR ACCESSS STATE =================
    const [surveyors, setSurveyors] = useState<SurveyorAccess[]>([])
    const [formId, setFormId] = useState<string | null>(null)
    const [formName, setFormName] = useState('')
    const [formPasskey, setFormPasskey] = useState('')
    const [formPokjas, setFormPokjas] = useState<string[]>([])
    const [formActive, setFormActive] = useState(true)

    // ================= SESSION STATE =================
    const [sessions, setSessions] = useState<AssessmentSession[]>([])
    const [sessionFormId, setSessionFormId] = useState<string | null>(null)
    const [formRs, setFormRs] = useState('')
    const [formTahun, setFormTahun] = useState('')
    const [formSessionId, setFormSessionId] = useState('')
    const [formSurveyorName, setFormSurveyorName] = useState('')
    const [formSurveyorUnit, setFormSurveyorUnit] = useState('')
    const [formSessionActive, setFormSessionActive] = useState(false)

    useEffect(() => {
        setIsEditing(false)
        if (activeTab === 'surveyor') {
            loadSurveyors()
        } else {
            loadSessions()
        }
    }, [activeTab])

    // ================= LOAD FUNCTIONS =================
    async function loadSurveyors() {
        setLoading(true)
        const { data, error } = await supabase
            .from('surveyor_access')
            .select('*')
            .order('created_at', { ascending: false })
            
        if (!error && data) {
            setSurveyors(data)
        }
        setLoading(false)
    }

    async function loadSessions() {
        setLoading(true)
        const { data, error } = await supabase
            .from('assessment_sessions')
            .select('*')
            .order('created_at', { ascending: false })
            
        if (!error && data) {
            setSessions(data)
        }
        setLoading(false)
    }

    // ================= SURVEYOR ACTIONS =================
    function handleEditSurveyor(s: SurveyorAccess) {
        setFormId(s.id)
        setFormName(s.surveyor_name)
        setFormPasskey(s.passkey)
        setFormPokjas(s.allowed_pokja || [])
        setFormActive(s.is_active)
        setIsEditing(true)
    }

    function handleNewSurveyor() {
        setFormId(null)
        setFormName('')
        setFormPasskey(Math.random().toString(36).substring(2, 8).toUpperCase())
        setFormPokjas([])
        setFormActive(true)
        setIsEditing(true)
    }

    function togglePokja(pokja: string) {
        setFormPokjas(prev => 
            prev.includes(pokja) ? prev.filter(p => p !== pokja) : [...prev, pokja]
        )
    }

    async function handleSaveSurveyor() {
        if (!formName || !formPasskey) return alert('Nama dan Passkey wajib diisi')
        if (formPokjas.length === 0) return alert('Pilih minimal 1 Pokja')

        setLoading(true)
        const payload = {
            surveyor_name: formName,
            passkey: formPasskey.toUpperCase().trim(),
            allowed_pokja: formPokjas,
            is_active: formActive
        }

        if (formId) {
            await supabase.from('surveyor_access').update(payload).eq('id', formId)
        } else {
            await supabase.from('surveyor_access').insert(payload)
        }
        
        setIsEditing(false)
        loadSurveyors()
    }

    async function handleDeleteSurveyor(id: string) {
        if (!confirm('Yakin ingin menghapus akses surveyor ini?')) return
        setLoading(true)
        await supabase.from('surveyor_access').delete().eq('id', id)
        loadSurveyors()
    }

    // ================= SESSION ACTIONS =================
    function handleEditSession(s: AssessmentSession) {
        setSessionFormId(s.id)
        setFormRs(s.rumah_sakit)
        setFormTahun(s.tahun_akreditasi)
        setFormSessionId(s.assessment_id)
        setFormSurveyorName(s.surveyor_name)
        setFormSurveyorUnit(s.surveyor_unit)
        setFormSessionActive(s.is_aktif)
        setIsEditing(true)
    }

    function handleNewSession() {
        setSessionFormId(null)
        setFormRs('')
        setFormTahun(new Date().getFullYear().toString())
        setFormSessionId('')
        setFormSurveyorName('')
        setFormSurveyorUnit('')
        setFormSessionActive(sessions.length === 0) // otomatis aktif jika sesi pertama
        setIsEditing(true)
    }

    function handleRsChange(val: string, yearVal = formTahun) {
        setFormRs(val)
        const formatted = val.toUpperCase().replace(/[^A-Z0-9]/g, '_')
        const year = yearVal ? `_${yearVal}` : ''
        setFormSessionId(`ASESMEN_${formatted}${year}`)
    }

    function handleTahunChange(val: string, rsVal = formRs) {
        setFormTahun(val)
        const formatted = rsVal.toUpperCase().replace(/[^A-Z0-9]/g, '_')
        const year = val ? `_${val}` : ''
        setFormSessionId(`ASESMEN_${formatted}${year}`)
    }

    async function handleSaveSession() {
        if (!formRs || !formTahun || !formSessionId) return alert('Nama RS, Tahun, dan ID Sesi wajib diisi')
        
        const cleanedSessionId = formSessionId.trim().toUpperCase().replace(/\s+/g, '_')
        setLoading(true)

        try {
            // Cek keunikan assessment_id jika ini sesi baru
            if (!sessionFormId) {
                const { data: existing } = await supabase
                    .from('assessment_sessions')
                    .select('id')
                    .eq('assessment_id', cleanedSessionId)
                    .maybeSingle()
                    
                if (existing) {
                    alert('ID Sesi sudah digunakan. Silakan gunakan ID Sesi yang lain.')
                    setLoading(false)
                    return
                }
            }

            const payload = {
                rumah_sakit: formRs,
                tahun_akreditasi: formTahun,
                assessment_id: cleanedSessionId,
                surveyor_name: formSurveyorName,
                surveyor_unit: formSurveyorUnit,
                is_aktif: formSessionActive
            }

            if (formSessionActive) {
                // Nonaktifkan semua sesi lainnya terlebih dahulu
                await supabase
                    .from('assessment_sessions')
                    .update({ is_aktif: false })
                    .neq('assessment_id', '___NON_EXISTENT_ID___')
            }

            if (sessionFormId) {
                const { error } = await supabase
                    .from('assessment_sessions')
                    .update(payload)
                    .eq('id', sessionFormId)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('assessment_sessions')
                    .insert(payload)
                if (error) throw error
            }

            setIsEditing(false)
            loadSessions()
        } catch (e: any) {
            alert('Gagal menyimpan sesi: ' + e.message)
            setLoading(false)
        }
    }

    async function handleActivateSession(s: AssessmentSession) {
        setLoading(true)
        try {
            // 1. Nonaktifkan semua sesi
            const { error: err1 } = await supabase
                .from('assessment_sessions')
                .update({ is_aktif: false })
                .neq('assessment_id', '___NON_EXISTENT_ID___')
            if (err1) throw err1

            // 2. Aktifkan sesi target
            const { error: err2 } = await supabase
                .from('assessment_sessions')
                .update({ is_aktif: true })
                .eq('id', s.id)
            if (err2) throw err2

            loadSessions()
        } catch (e: any) {
            alert('Gagal mengaktifkan sesi: ' + e.message)
            setLoading(false)
        }
    }

    async function handleDeleteSession(id: string) {
        if (!confirm('Yakin ingin menghapus sesi kegiatan ini? Semua data asesmen dengan sesi ID ini tidak akan tampil kecuali dibuat sesi dengan ID yang sama lagi.')) return
        setLoading(true)
        await supabase.from('assessment_sessions').delete().eq('id', id)
        loadSessions()
    }

    async function handleInitDefaultSession() {
        setLoading(true)
        try {
            const payload = {
                rumah_sakit: 'RS Default (Awal)',
                tahun_akreditasi: '2024',
                assessment_id: 'ASESMEN_RS_DEFAULT_2024',
                surveyor_name: '-',
                surveyor_unit: '-',
                is_aktif: true
            }
            
            // Check first
            const { data: existing } = await supabase
                .from('assessment_sessions')
                .select('id')
                .eq('assessment_id', 'ASESMEN_RS_DEFAULT_2024')
                .maybeSingle()

            if (existing) {
                // If exists, just set it to active
                await supabase
                    .from('assessment_sessions')
                    .update({ is_aktif: false })
                    .neq('assessment_id', '___NON_EXISTENT_ID___')
                
                await supabase
                    .from('assessment_sessions')
                    .update({ is_aktif: true })
                    .eq('assessment_id', 'ASESMEN_RS_DEFAULT_2024')
            } else {
                await supabase
                    .from('assessment_sessions')
                    .update({ is_aktif: false })
                    .neq('assessment_id', '___NON_EXISTENT_ID___')
                
                const { error } = await supabase.from('assessment_sessions').insert(payload)
                if (error) throw error
            }
            loadSessions()
        } catch (e: any) {
            alert('Gagal inisialisasi sesi default: ' + e.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Judul & Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Panel Administrator</h1>
                        <p className="text-gray-500 mt-1">Konfigurasi hak akses surveyor dan manajemen sesi kegiatan akreditasi.</p>
                    </div>
                    {!isEditing && (
                        <div>
                            {activeTab === 'surveyor' ? (
                                <button 
                                    onClick={handleNewSurveyor}
                                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-semibold shadow-sm transition-all">
                                    <Plus className="w-5 h-5" /> Surveyor Baru
                                </button>
                            ) : (
                                <button 
                                    onClick={handleNewSession}
                                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-semibold shadow-sm transition-all">
                                    <Plus className="w-5 h-5" /> Sesi Kegiatan Baru
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Tabs Navigation */}
                {!isEditing && (
                    <div className="flex border-b border-gray-200 mb-6 bg-white rounded-lg p-1 shadow-sm border">
                        <button
                            onClick={() => setActiveTab('surveyor')}
                            className={`flex-1 md:flex-none py-3 px-6 text-sm font-semibold rounded-md transition-all ${
                                activeTab === 'surveyor'
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Akses Surveyor
                        </button>
                        <button
                            onClick={() => setActiveTab('sesi')}
                            className={`flex-1 md:flex-none py-3 px-6 text-sm font-semibold rounded-md transition-all ${
                                activeTab === 'sesi'
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Sesi Kegiatan
                        </button>
                    </div>
                )}

                {/* ================= TAB ACCESS SURVEYOR ================= */}
                {activeTab === 'surveyor' && (
                    isEditing ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">{formId ? 'Edit Akses' : 'Buat Akses Baru'}</h2>
                                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Surveyor</label>
                                    <input 
                                        type="text" 
                                        value={formName}
                                        onChange={e => setFormName(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="Contoh: dr. Budi Santoso"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Passkey Rahasia</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={formPasskey}
                                            onChange={e => setFormPasskey(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase font-mono"
                                            placeholder="KODE UNIK"
                                        />
                                        <button 
                                            onClick={() => setFormPasskey(Math.random().toString(36).substring(2, 8).toUpperCase())}
                                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium transition-all">
                                            Generate
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Hak Akses Pokja ({formPokjas.length} dipilih)</label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                                    {POKJA_LIST.map(pokja => {
                                        const isSelected = formPokjas.includes(pokja)
                                        return (
                                            <button
                                                key={pokja}
                                                onClick={() => togglePokja(pokja)}
                                                className={`py-2 text-center rounded-lg border-2 text-sm font-bold transition-all ${
                                                    isSelected 
                                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                                                        : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-300 hover:text-indigo-600'
                                                }`}
                                            >
                                                {pokja}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8">
                                <input 
                                    type="checkbox" 
                                    id="active"
                                    checked={formActive}
                                    onChange={e => setFormActive(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="active" className="text-sm font-semibold text-gray-700">Akun Aktif (bisa login)</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button 
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 transition-all">
                                    Batal
                                </button>
                                <button 
                                    onClick={handleSaveSurveyor}
                                    disabled={loading}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-2 shadow-sm transition-all">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    Simpan
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {loading ? (
                                <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
                            ) : surveyors.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">Belum ada data surveyor. Silakan buat baru.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Surveyor</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Passkey</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Akses Pokja</th>
                                                <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {surveyors.map(s => (
                                                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-semibold text-gray-900">{s.surveyor_name}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono bg-gray-100 px-2.5 py-1 rounded text-gray-700 text-sm border border-gray-200">{s.passkey}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            {s.allowed_pokja.map(p => (
                                                                <span key={p} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-semibold border border-indigo-100">{p}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {s.is_active 
                                                            ? <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-200">Aktif</span>
                                                            : <span className="text-xs font-bold bg-red-50 text-red-600 px-2.5 py-1 rounded-full border border-red-200">Nonaktif</span>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button onClick={() => handleEditSurveyor(s)} className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all inline-flex items-center justify-center"><Edit className="w-4 h-4" /></button>
                                                        <button onClick={() => handleDeleteSurveyor(s.id)} className="text-red-500 hover:text-red-700 p-2 ml-1 rounded-lg hover:bg-red-50 transition-all inline-flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )
                )}

                {/* ================= TAB SESI KEGIATAN ================= */}
                {activeTab === 'sesi' && (
                    isEditing ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">{sessionFormId ? 'Edit Sesi Kegiatan' : 'Buat Sesi Kegiatan Baru'}</h2>
                                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Rumah Sakit</label>
                                    <input 
                                        type="text" 
                                        value={formRs}
                                        onChange={e => handleRsChange(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="Contoh: RSUD Mataram"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Akreditasi</label>
                                    <input 
                                        type="text" 
                                        value={formTahun}
                                        onChange={e => handleTahunChange(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="Contoh: 2026"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Sesi (Kode Database Unik)</label>
                                    <input 
                                        type="text" 
                                        value={formSessionId}
                                        onChange={e => setFormSessionId(e.target.value.toUpperCase())}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono uppercase bg-slate-50"
                                        placeholder="ASESMEN_NAMA_RS_TAHUN"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">ID ini digunakan sebagai pemisah data di Supabase. Disarankan tanpa spasi, diganti dengan underscore (_).</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Surveyor (Opsional)</label>
                                        <input 
                                            type="text" 
                                            value={formSurveyorName}
                                            onChange={e => setFormSurveyorName(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="dr. John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Surveyor (Opsional)</label>
                                        <input 
                                            type="text" 
                                            value={formSurveyorUnit}
                                            onChange={e => setFormSurveyorUnit(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="KARS / LAFKI"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8">
                                <input 
                                    type="checkbox" 
                                    id="sessionActive"
                                    checked={formSessionActive}
                                    onChange={e => setFormSessionActive(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="sessionActive" className="text-sm font-semibold text-gray-700">Set sebagai Sesi Aktif saat ini</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button 
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 transition-all">
                                    Batal
                                </button>
                                <button 
                                    onClick={handleSaveSession}
                                    disabled={loading}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-2 shadow-sm transition-all">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    Simpan Sesi
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {/* Alert Context */}
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3 items-start">
                                <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-indigo-900 text-sm">Informasi Sesi Aktif</h4>
                                    <p className="text-xs text-indigo-700 mt-0.5 leading-relaxed">
                                        Hanya ada 1 sesi yang dapat aktif dalam satu waktu. Sesi aktif akan menjadi acuan utama bagi seluruh halaman Asesmen, PIC, dan Telusur Lapangan untuk memuat dan menyimpan data. Sesi lama Anda tetap aman di database.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {loading ? (
                                    <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
                                ) : sessions.length === 0 ? (
                                    <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-3">
                                        <p>Belum ada sesi kegiatan terdaftar.</p>
                                        <button 
                                            onClick={handleInitDefaultSession}
                                            className="px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-all">
                                            Inisialisasi Sesi Awal (ASESMEN_RS_DEFAULT_2024)
                                        </button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-gray-50 border-b border-gray-100">
                                                <tr>
                                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rumah Sakit</th>
                                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tahun</th>
                                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Sesi</th>
                                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Surveyor</th>
                                                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {sessions.map(s => (
                                                    <tr key={s.id} className={`hover:bg-gray-50/50 transition-colors ${s.is_aktif ? 'bg-indigo-50/20' : ''}`}>
                                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                                            <div className="flex items-center gap-2">
                                                                <Hospital className="w-4 h-4 text-gray-400" />
                                                                {s.rumah_sakit}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                                {s.tahun_akreditasi}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="font-mono bg-gray-100 px-2.5 py-1 rounded text-gray-700 text-sm border border-gray-200">{s.assessment_id}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {s.surveyor_name ? (
                                                                <div>
                                                                    <div className="font-medium text-gray-800">{s.surveyor_name}</div>
                                                                    <div className="text-xs text-gray-400">{s.surveyor_unit || '-'}</div>
                                                                </div>
                                                            ) : '-'}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            {s.is_aktif ? (
                                                                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-200">
                                                                    <CheckCircle className="w-3.5 h-3.5" /> Aktif
                                                                </span>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => handleActivateSession(s)}
                                                                    className="text-xs font-bold bg-gray-100 text-gray-500 hover:bg-indigo-600 hover:text-white px-2.5 py-1 rounded-full border border-gray-200 hover:border-indigo-600 transition-all">
                                                                    Aktifkan
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button onClick={() => handleEditSession(s)} className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all inline-flex items-center justify-center"><Edit className="w-4 h-4" /></button>
                                                            <button onClick={() => handleDeleteSession(s.id)} className="text-red-500 hover:text-red-700 p-2 ml-1 rounded-lg hover:bg-red-50 transition-all inline-flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            
                            {/* Optional: Init Default Button at the bottom if sessions exist but default doesn't */}
                            {sessions.length > 0 && !sessions.some(s => s.assessment_id === 'ASESMEN_RS_DEFAULT_2024') && (
                                <div className="flex justify-end">
                                    <button 
                                        onClick={handleInitDefaultSession}
                                        className="text-xs font-semibold text-gray-400 hover:text-indigo-600 transition-colors">
                                        + Tambah Sesi Default 'ASESMEN_RS_DEFAULT_2024' ke Daftar
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
