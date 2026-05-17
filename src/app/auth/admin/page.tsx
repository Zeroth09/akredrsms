'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
    const [passkey, setPasskey] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        
        // Simulating simple hardcoded check as requested
        if (passkey === 'rizuki09') {
            // Set cookie valid for 7 days
            document.cookie = `admin_passkey=${passkey}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=strict`
            
            // Redirect to callback URL or home
            setTimeout(() => {
                router.push(callbackUrl)
                router.refresh()
            }, 300)
        } else {
            setLoading(false)
            setError(true)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-5">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Admin Authentication</h1>
                        <p className="text-sm text-slate-500 mt-2">
                            Akses halaman dashboard dan manajemen
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Passkey
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-5 h-5 ${error ? 'text-red-400' : 'text-slate-400'}`} />
                                </div>
                                <input
                                    type="password"
                                    value={passkey}
                                    onChange={(e) => {
                                        setPasskey(e.target.value)
                                        setError(false)
                                    }}
                                    className={`block w-full pl-11 pr-4 py-3.5 text-slate-800 bg-slate-50 border rounded-2xl focus:ring-2 focus:outline-none transition-colors ${
                                        error 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                                    }`}
                                    placeholder="Masukkan passkey admin..."
                                    required
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <p className="mt-2.5 text-sm text-red-500 flex items-center gap-1.5 font-medium">
                                    <AlertCircle className="w-4 h-4" />
                                    Passkey tidak valid
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !passkey}
                            className="w-full relative flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 px-4 rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifikasi...
                                </span>
                            ) : (
                                <>
                                    Masuk ke Dashboard
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <p className="text-center mt-6 text-sm text-slate-400 font-medium">
                    Halaman ini dilindungi dengan sistem keamanan passkey.
                </p>
            </div>
        </div>
    )
}
