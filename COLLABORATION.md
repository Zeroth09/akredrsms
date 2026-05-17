# AGENT COLLABORATION & STATE LOG

File ini adalah "shared memory" untuk kolaborasi antar AI Agent (Antigravity, Codex, dll). 
**PROTOKOL WAJIB:**
1. **BACA** file ini setiap memulai sesi baru.
2. **UPDATE** file ini setiap kali ada perubahan signifikan pada kode atau logika.
3. **CATAT** keputusan teknis penting di sini.

---

## 🚀 Status Proyek Saat Ini
- **Status:** Halaman Asesmen Surveyor — Redesign UI Colorful Step-by-Step + High Contrast.
- **Terakhir Diperbarui:** 2026-05-17
- **Agent Terakhir:** Antigravity

## 🛠️ Tech Stack & Arsitektur
- **Frontend:** Next.js (App Router), Tailwind CSS, Lucide React.
- **Backend/DB:** Supabase (Postgres).
- **External:** Google Drive API (via Server Actions).
- **Key Logic:** `src/lib/pokjaUtils.ts` (Hierarki Pokja/EP) & `src/app/actions.ts` (Sync logic).

## ✅ Tasks Selesai
- [x] Migrasi Database: Tambah kolom `standar` dan `ep` ke tabel `documents`.
- [x] Logic Ekstraksi: Implementasi deteksi otomatis Standar & EP berdasarkan nama folder (Parent/Grandparent) di `actions.ts`.
- [x] UI Dasar: Menambahkan kolom Standar & EP di `DocumentTable.tsx`.
- [x] Excel Export: Update `exportExcel.ts` untuk menggunakan data dari database.
- [x] **Integrasi Master Data:** `getStandarEPHierarchy()` sekarang merge deskripsi dari `MASTER_STANDAR_EP` ke hierarki Standar/EP.
- [x] **Asesmen UI Neumorphism:** ~~Redesign halaman asesmen dengan gaya neumorphism minimalis.~~ (Diganti)
- [x] **Redesign UI Colorful:** Rombak total ke clean step-by-step flow dengan gradient header indigo-cyan, pokja tabs di atas, standar accordion dengan border kiri berwarna, dan tombol penilaian EP yang besar & colorful (solid fill saat aktif). Optimasi kontras untuk user tua.
- [x] **Filter by Nilai:** Dropdown filter status (Terpenuhi/Sebagian/Tidak) yang berfungsi di detail pokja.
- [x] **Search Standar/EP:** Search bar di detail pokja untuk cari standar/EP berdasarkan kode atau deskripsi.
- [x] **Loading State:** Loading spinner saat data asesmen sedang dimuat.
- [x] **Dokumen per EP:** Setiap EP menampilkan daftar dokumen terkait (dari tabel `documents` Supabase, match berdasarkan `standar`+`ep`) dengan tombol "Lihat" untuk buka di Google Drive.
- [x] **RDOW Badges:** Badge bukti R(egulasi)/D(okumen)/O(bservasi)/W(awancara)/S(imulasi) tampil di samping kode EP. Data dari field `bukti` di `MASTER_STANDAR_EP`.
- [x] **Fix Deskripsi EP:** Rewrite pipeline extraction dari KEPMENKES + Instrumen Survei PDF. Coverage naik dari 19% → **97% (1085/1117)** EP terisi deskripsi. 10 pokja 100%.
- [x] **Lengkapi RDOW:** **788 EP (70%)** punya RDOW otomatis dari Instrumen Survei Akreditasi (Kepdirjen 47104/2024). Semua 16 pokja tercover.

## ⏳ Tasks Pending / In Progress
- [x] **Persist ke Supabase:** Tabel `assessments` dan `assessment_sessions` sudah dibuat di Supabase. Asesmen sekarang sync otomatis ke server via upsert per EP. localStorage tetap jadi fallback.
- [ ] **Data Normalization:** Pastikan nama EP seragam (misal: "EP a" bukan "Ep a").
- [ ] **Lengkapi RDOW sisa:** 788/1117 EP sudah ada RDOW. Sisa ~329 EP (PAB, PROGNAS, PMKP) mungkin perlu verifikasi manual.
- [ ] **Testing:** Verifikasi sinkronisasi dengan dataset folder yang lebih kompleks.

## 📝 Catatan Teknis & Keputusan
- **Decision:** Standar dan EP sekarang **strictly folder-based**. Jika file berada di folder "EP a", maka `ep = "EP a"`. Jika parent dari "EP a" adalah "TKRS 1", maka `standar = "TKRS 1"`.
- **Decision:** UI Asesmen menggunakan **colorful light theme** — gradient header `indigo-600 → blue-600 → cyan-500`, standar cards dengan `border-l-4 border-l-indigo-400`, tombol EP solid fill saat aktif (emerald/amber/red-500 text-white).
- **Decision:** Deskripsi diambil dari `MASTER_STANDAR_EP` di `masterStandarEP.ts`, di-match berdasarkan `pokjaCode` + `standar.kode` + `ep.kode` (case-insensitive).
- **Constraint:** Hindari mencatat kode Pokja (KPS, TKRS, dll) sebagai nama Standar. Sudah ada filter `POKJA_CODES` di `actions.ts`.
- **Resolved:** Deskripsi EP sekarang **97% terisi** (1085/1117). RDOW **70%** (788/1117). Dua sumber data: (1) KEPMENKES 1596/2024 untuk deskripsi, (2) Instrumen Survei Kepdirjen 47104/2024 untuk RDOW bukti. SKP pakai mapping nomor→huruf. PROGNAS case-insensitive.
- **Scripts Pipeline:** `extract-descriptions-v5.mjs` (deskripsi dari KEPMENKES) + `extract-instrumen-rdow.mjs` (RDOW dari Instrumen Survei) → `ep_descriptions.json` + `ep_bukti.json` → `regenerate-master-with-desc.mjs` → `masterStandarEP.ts`.

---

## 🤝 Handover untuk Agent Berikutnya
> "97% EP punya deskripsi (1085/1117), 70% RDOW (788/1117). Dua pipeline extraction: KEPMENKES untuk deskripsi, Instrumen Survei untuk RDOW bukti. Halaman asesmen: pokja tabs, standar accordion, penilaian EP, dokumen per EP, RDOW badges (R/D/O/W/S), deskripsi EP. Data penilaian masih di localStorage. Langkah selanjutnya: (1) persist asesmen ke Supabase, (2) isi sisa 3% deskripsi & 30% RDOW."
