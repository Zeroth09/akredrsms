'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { KeyRound, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

export default function LoginAsesmenPage() {
    const [passkey, setPasskey] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        if (!passkey.trim()) return

        setLoading(true)
        setError('')

        try {
            const { data, error } = await supabase
                .from('surveyor_access')
                .select('*')
                .eq('passkey', passkey.toUpperCase().trim())
                .eq('is_active', true)
                .single()

            if (error || !data) {
                setError('Passkey tidak valid atau akun dinonaktifkan.')
                setLoading(false)
                return
            }

            // Save to local storage
            localStorage.setItem('surveyor_auth', JSON.stringify({
                id: data.id,
                name: data.surveyor_name,
                pokja: data.allowed_pokja
            }))

            // Redirect to asesmen
            router.push('/asesmen')
        } catch (err) {
            console.error(err)
            setError('Terjadi kesalahan jaringan.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <KeyRound className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Login Surveyor</h1>
                    <p className="text-indigo-100 text-sm">Masukkan passkey untuk mengakses instrumen penilaian.</p>
                </div>
                
                <div className="p-8">
                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 border border-red-100">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Passkey Akses</label>
                            <input
                                type="text"
                                value={passkey}
                                onChange={e => setPasskey(e.target.value)}
                                className="w-full text-center text-2xl tracking-[0.2em] font-mono border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none uppercase transition-all"
                                placeholder="XXXXXX"
                                maxLength={10}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !passkey}
                            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            {loading ? (
                                <>Mengecek... <Loader2 className="w-5 h-5 animate-spin" /></>
                            ) : (
                                <>Masuk <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
