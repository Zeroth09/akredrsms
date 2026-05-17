'use client'

import { useState } from 'react'
import { X, FileBarChart, Download, CheckSquare, Square } from 'lucide-react'

// Daftar semua Pokja yang ada dalam sistem
const SEMUA_POKJA = [
    'AKP', 'HPK', 'KE', 'KPS', 'MFK', 'MRMIK',
    'PAB', 'PAP', 'PKPO', 'PMKP', 'PP', 'PPK',
    'PPI', 'PROGNAS', 'SKP', 'TKRS',
]

export type TipeLaporan = 'umum' | 'individu'

interface PokjaFilterModalProps {
    isOpen: boolean
    onClose: () => void
    onGenerate: (selectedPokjas: string[], tipe: TipeLaporan) => void
    isGenerating: boolean
}

export function PokjaFilterModal({ isOpen, onClose, onGenerate, isGenerating }: PokjaFilterModalProps) {
    const [selectedPokjas, setSelectedPokjas] = useState<string[]>(SEMUA_POKJA)
    const [tipe, setTipe] = useState<TipeLaporan>('umum')

    if (!isOpen) return null

    const togglePokja = (kode: string) => {
        setSelectedPokjas(prev =>
            prev.includes(kode) ? prev.filter(p => p !== kode) : [...prev, kode]
        )
    }

    const toggleSemua = () => {
        setSelectedPokjas(prev => prev.length === SEMUA_POKJA.length ? [] : [...SEMUA_POKJA])
    }

    const semuaTerpilih = selectedPokjas.length === SEMUA_POKJA.length

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

                {/* Header modal */}
                <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-white font-bold text-lg">Export Laporan PDF</h2>
                        <p className="text-red-200 text-xs mt-0.5">Pilih Pokja dan jenis laporan yang ingin dicetak</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">

                    {/* Pilih Jenis Laporan */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Jenis Laporan</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setTipe('umum')}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${tipe === 'umum'
                                        ? 'border-red-600 bg-red-50 text-red-700'
                                        : 'border-gray-200 text-gray-500 hover:border-red-300'
                                    }`}
                            >
                                <Download className="w-5 h-5" />
                                <span className="text-xs font-semibold">Laporan Umum</span>
                                <span className="text-[10px] text-center leading-tight">1 file, semua Pokja terpilih, dengan chart</span>
                            </button>
                            <button
                                onClick={() => setTipe('individu')}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${tipe === 'individu'
                                        ? 'border-red-600 bg-red-50 text-red-700'
                                        : 'border-gray-200 text-gray-500 hover:border-red-300'
                                    }`}
                            >
                                <FileBarChart className="w-5 h-5" />
                                <span className="text-xs font-semibold">Laporan Individu</span>
                                <span className="text-[10px] text-center leading-tight">1 file per Pokja, analisa lengkap + target bulanan</span>
                            </button>
                        </div>
                    </div>

                    {/* Pilih Pokja */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-700">
                                Pilih Pokja
                                <span className="ml-2 text-xs font-normal text-gray-400">
                                    ({selectedPokjas.length} dipilih)
                                </span>
                            </p>
                            <button
                                onClick={toggleSemua}
                                className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-medium"
                            >
                                {semuaTerpilih ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                                {semuaTerpilih ? 'Batal Semua' : 'Pilih Semua'}
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {SEMUA_POKJA.map(pokja => {
                                const dipilih = selectedPokjas.includes(pokja)
                                return (
                                    <button
                                        key={pokja}
                                        onClick={() => togglePokja(pokja)}
                                        className={`py-1.5 px-2 rounded-lg text-xs font-bold border-2 transition-all ${dipilih
                                                ? 'bg-red-600 border-red-600 text-white'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600'
                                            }`}
                                    >
                                        {pokja}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Info laporan individu */}
                    {tipe === 'individu' && selectedPokjas.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-xs text-amber-800">
                            <span className="font-semibold">Info:</span> Akan men-download <strong>{selectedPokjas.length} file PDF</strong> secara berurutan. Browser mungkin menampilkan peringatan download, silakan izinkan.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => onGenerate(selectedPokjas, tipe)}
                        disabled={isGenerating || selectedPokjas.length === 0}
                        className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <FileBarChart className="w-4 h-4" />
                                Generate PDF
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
