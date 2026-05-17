'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Plus, Edit, Trash2, Save, X } from 'lucide-react'

interface SurveyorAccess {
    id: string
    passkey: string
    surveyor_name: string
    allowed_pokja: string[]
    is_active: boolean
}

const POKJA_LIST = [
    "KPS", "MFK", "MRMIK", "PMKP", "PPI", "PPK", "TKRS",
    "AKP", "HPK", "KE", "PAB", "PAP", "PKPO", "PP", "SKP", "PROGNAS"
]

export default function AdminAksesPage() {
    const [surveyors, setSurveyors] = useState<SurveyorAccess[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    
    // Form state
    const [formId, setFormId] = useState<string | null>(null)
    const [formName, setFormName] = useState('')
    const [formPasskey, setFormPasskey] = useState('')
    const [formPokjas, setFormPokjas] = useState<string[]>([])
    const [formActive, setFormActive] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
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

    function handleEdit(s: SurveyorAccess) {
        setFormId(s.id)
        setFormName(s.surveyor_name)
        setFormPasskey(s.passkey)
        setFormPokjas(s.allowed_pokja || [])
        setFormActive(s.is_active)
        setIsEditing(true)
    }

    function handleNew() {
        setFormId(null)
        setFormName('')
        // Generate random 6 character passkey
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

    async function handleSave() {
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
        loadData()
    }

    async function handleDelete(id: string) {
        if (!confirm('Yakin ingin menghapus akses surveyor ini?')) return
        setLoading(true)
        await supabase.from('surveyor_access').delete().eq('id', id)
        loadData()
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manajemen Akses Surveyor</h1>
                        <p className="text-gray-500 mt-1">Atur passkey dan hak akses pokja untuk setiap surveyor.</p>
                    </div>
                    {!isEditing && (
                        <button 
                            onClick={handleNew}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium">
                            <Plus className="w-5 h-5" /> Surveyor Baru
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">{formId ? 'Edit Akses' : 'Buat Akses Baru'}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Surveyor</label>
                                <input 
                                    type="text" 
                                    value={formName}
                                    onChange={e => setFormName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Contoh: dr. Budi Santoso"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Passkey Rahasia</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={formPasskey}
                                        onChange={e => setFormPasskey(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase"
                                        placeholder="KODE UNIK"
                                    />
                                    <button 
                                        onClick={() => setFormPasskey(Math.random().toString(36).substring(2, 8).toUpperCase())}
                                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium">
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Hak Akses Pokja ({formPokjas.length} dipilih)</label>
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                                {POKJA_LIST.map(pokja => {
                                    const isSelected = formPokjas.includes(pokja)
                                    return (
                                        <button
                                            key={pokja}
                                            onClick={() => togglePokja(pokja)}
                                            className={`py-2 text-center rounded-lg border-2 text-sm font-medium transition-colors ${
                                                isSelected 
                                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                                                    : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-300'
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
                                className="w-4 h-4 text-indigo-600 rounded"
                            />
                            <label htmlFor="active" className="text-sm font-medium text-gray-700">Akun Aktif (bisa login)</label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100">
                                Batal
                            </button>
                            <button 
                                onClick={handleSave}
                                disabled={loading}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2">
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
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Surveyor</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Passkey</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Akses Pokja</th>
                                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {surveyors.map(s => (
                                        <tr key={s.id} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{s.surveyor_name}</td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700 text-sm">{s.passkey}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {s.allowed_pokja.map(p => (
                                                        <span key={p} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium border border-indigo-100">{p}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {s.is_active 
                                                    ? <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-200">Aktif</span>
                                                    : <span className="text-xs font-medium bg-red-50 text-red-600 px-2.5 py-1 rounded-full border border-red-200">Nonaktif</span>
                                                }
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 p-2"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 p-2 ml-1"><Trash2 className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
