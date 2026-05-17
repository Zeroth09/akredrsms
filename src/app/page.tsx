
import { getDocuments, getCategories, syncDocuments } from './actions'
import { RefreshCw, LayoutDashboard, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import { FileSystemView } from '@/components/documents/FileSystemView'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const documents = await getDocuments()
  const categories = await getCategories() || []

  // Calculate stats
  const totalDocs = documents.length
  // For total count, we should probably exclude folders if we want "Document" count, 
  // but let's keep it simple or filter by mime_type !== folder
  const fileDocs = documents.filter(d => d.mime_type !== 'application/vnd.google-apps.folder')
  const completed = fileDocs.filter(d => d.status === 'Lengkap').length
  const pending = fileDocs.filter(d => d.status === 'Pending').length
  const incomplete = fileDocs.filter(d => d.status === 'Tidak Lengkap').length

  return (
    <main className="min-h-screen bg-slate-50 font-sans">

      {/* Navbar / Header - Merah Putih Theme */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Akreditasi Monitor</h1>
                <p className="text-red-100 text-sm opacity-90">Sistem Pemantauan Dokumen Rumah Sakit</p>
              </div>
            </div>

            <form action={async () => {
              'use server'
              await syncDocuments()
            }}>
              <button
                className="group flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 px-5 py-2.5 rounded-full font-semibold shadow-md transition-all active:scale-95"
                type="submit"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Sync Drive
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stats Grid - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            label="Total Dokumen"
            value={fileDocs.length}
            icon={<FileText className="w-6 h-6 text-red-600" />}
            trend="File Tersimpan"
          />
          <StatCard
            label="Lengkap"
            value={completed}
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            trend={`${Math.round((completed / fileDocs.length || 0) * 100)}% Compliance`}
            color="green"
          />
          <StatCard
            label="Perlu Review"
            value={pending}
            icon={<AlertTriangle className="w-6 h-6 text-yellow-500" />}
            trend="Status Pending"
            color="yellow"
          />
          <StatCard
            label="Belum Lengkap"
            value={incomplete}
            icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
            trend="Action Required"
            color="red"
          />
        </div>

        {/* Tree View Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
              Dokumen & Folder
            </h2>
            <div className="text-sm text-gray-500">
              Menampilkan struktur dari Google Drive
            </div>
          </div>

          <FileSystemView documents={documents} categories={categories} />
        </div>

      </div>
    </main>
  )
}

function StatCard({ label, value, icon, trend, color = 'red' }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 bg-${color}-50 rounded-xl`}>
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            <span className="text-xs font-medium text-gray-400">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
