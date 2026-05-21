'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { KeyRound, Loader2, AlertCircle, UserCheck, ShieldCheck } from 'lucide-react'

interface SurveyorAccess {
    id: string
    surveyor_name: string
    allowed_pokja: string[]
    is_active: boolean
}

export default function LoginAsesmenPage() {
    const [surveyors, setSurveyors] = useState<SurveyorAccess[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedSurveyorId, setSelectedSurveyorId] = useState<string | null>(null)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        async function loadSurveyorAccess() {
            setLoading(true)
            setError('')

            try {
                const { data, error } = await supabase
                    .from('surveyor_access')
                    .select('id, surveyor_name, allowed_pokja, is_active')
                    .eq('is_active', true)
                    .order('surveyor_name', { ascending: true })

                if (error) throw error
                setSurveyors(data ?? [])
            } catch (err) {
                console.error('Gagal memuat akses surveyor:', err)
                setError('Akses surveyor gagal dimuat. Periksa koneksi lalu coba lagi.')
            } finally {
                setLoading(false)
            }
        }

        loadSurveyorAccess()
    }, [])

    function handleSelectSurveyor(surveyor: SurveyorAccess) {
        setSelectedSurveyorId(surveyor.id)
        setError('')

        try {
            localStorage.setItem('surveyor_auth', JSON.stringify({
                id: surveyor.id,
                name: surveyor.surveyor_name,
                pokja: surveyor.allowed_pokja || []
            }))

            router.push('/asesmen')
        } catch (err) {
            console.error('Gagal menyimpan sesi surveyor:', err)
            setError('Gagal masuk. Silakan coba lagi.')
            setSelectedSurveyorId(null)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                    <div className="mx-auto w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg border border-indigo-300/20">
                        <KeyRound className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Login Surveyor</h1>
                    <p className="text-slate-300 text-xs md:text-sm">Silakan pilih nama surveyor untuk masuk ke instrumen penilaian.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-100 p-4 rounded-2xl text-sm font-medium flex items-center gap-3 border border-red-400/20">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-300" />
                        {error}
                    </div>
                )}

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                    <h2 className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider">Pilih Surveyor:</h2>

                    {loading ? (
                        <div className="py-10 flex flex-col items-center justify-center gap-3 text-slate-300">
                            <Loader2 className="w-7 h-7 animate-spin text-indigo-300" />
                            <span className="text-sm font-medium">Memuat daftar surveyor...</span>
                        </div>
                    ) : surveyors.length === 0 ? (
                        <div className="py-8 text-center text-sm text-slate-300">
                            Belum ada surveyor aktif. Aktifkan akses surveyor terlebih dahulu.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-2.5">
                            {surveyors.map((surveyor) => {
                                const isSelected = selectedSurveyorId === surveyor.id
                                return (
                                    <button
                                        key={surveyor.id}
                                        type="button"
                                        onClick={() => handleSelectSurveyor(surveyor)}
                                        disabled={!!selectedSurveyorId}
                                        className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 disabled:opacity-70 active:scale-98 p-3 rounded-xl transition-all text-left cursor-pointer border border-white/5 group"
                                    >
                                        <div className="p-2 bg-blue-500/20 text-blue-300 rounded-lg group-hover:scale-105 transition-transform">
                                            {isSelected ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-sm font-semibold text-slate-100 truncate">{surveyor.surveyor_name}</span>
                                                <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full font-bold shrink-0">Aktif</span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                                                <ShieldCheck className="w-3 h-3 text-indigo-300" />
                                                <span className="truncate">{(surveyor.allowed_pokja || []).join(', ') || 'Belum ada pokja'}</span>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
