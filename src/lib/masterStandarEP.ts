// MASTER DATA STANDAR DAN ELEMEN PENILAIAN (EP) AKREDITASI RUMAH SAKIT
// Diekstrak dari PDF di folder "STANDAR DAN EP POKJA"
// Auto-generated — JANGAN edit manual

export interface EPItem {
    kode: string       // "EP a", "EP b", dst.
    deskripsi: string  // Deskripsi elemen penilaian
    bukti?: string[]   // Jenis bukti: R(egulasi), D(okumen), O(bservasi), W(awancara), S(imulasi)
}

export interface StandarItem {
    kode: string        // "TKRS 1", "AKP 1.1", dst.
    deskripsi: string   // Deskripsi standar
    epList: EPItem[]     // Daftar EP dalam standar ini
}

export interface PokjaStandarData {
    pokjaCode: string
    pokjaName: string
    standarList: StandarItem[]
}

export const MASTER_STANDAR_EP: PokjaStandarData[] = [
    {
        pokjaCode: 'AKP',
        pokjaName: 'Akses dan Kontinuitas Pelayanan',
        standarList: [
            {
                kode: 'AKP 1',
                deskripsi: 'Rumah sakit menetapkan proses skrining baik pasien rawat inap maupun rawat jalan untuk mengidentifikasi pelayanan Kesehatan yang dibutuhkan sesuai dengan misi serta sumber daya rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi akses dan kesinambungan pelayanan (AKP) meliputi poin a) – f) pada gambaran umum.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan proses skrining baik di dalam maupun di luar rumah sakit dan terdokumentasi.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Ada proses untuk memberikan hasil pemeriksaan diagnostik kepada tenaga kesehatan yang kompeten/terlatih untuk bertanggung jawab menentukan apakah pasien akan diterima, ditransfer, atau dirujuk.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Bila kebutuhan pasien tidak dapat dipenuhi sesuai misi dan sumber daya yang ada, maka rumah sakit akan merujuk atau membantu pasien ke fasilitas pelayanan yang sesuai kebutuhannya.', bukti: ['W'] },
                ],
            },
            {
                kode: 'AKP 1.1',
                deskripsi: 'Pasien dengan kebutuhan darurat, sangat mendesak, atau yang membutuhkan pertolongan segera diberikan prioritas untuk pengkajian dan tindakan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Proses triase dan pelayanan kegawatdaruratan telah diterapkan oleh staf yang kompeten dan bukti dokumen kompetensi dan kewenangan klinisnya tersedia.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Staf telah menggunakan kriteria triase berbasis bukti untuk memprioritaskan pasien sesuai dengan kegawatannya.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pasien darurat dinilai dan distabilkan sesuai kapasitas rumah sakit sebelum ditransfer ke ruang rawat atau dirujuk dan didokumentasikan dalam rekam medik.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'AKP 1.2',
                deskripsi: 'Rumah sakit melakukan skrining kebutuhan pasien saat admisi rawat inap untuk menetapkan pelayanan preventif, paliatif, kuratif, rehabilitatif, pelayanan khusus/spesialistik atau pelayanan intensif.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan skrining pasien masuk rawat inap untuk menetapkan kebutuhan pelayanan preventif, paliatif, kuratif, dan rehabilitatif, pelayanan khusus/spesialistik atau pelayanan intensif.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan kriteria masuk dan kriteria keluar di unit pelayanan khusus/spesialistik menggunakan parameter diagnostik dan atau parameter objektif termasuk kriteria berbasis fisiologis dan terdokumentasikan di rekam medik.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah menerapkan kriteria masuk dan kriteria keluar di unit pelayanan intensif menggunakan parameter diagnostik dan atau parameter objektif termasuk kriteria berbasis fisiologis dan terdokumentasikan di rekam medik', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Staf yang kompeten dan berwenang di unit pelayanan khusus dan unit pelayanan intensif terlibat dalam penyusunan kriteria masuk dan kriteria keluar di unitnya.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'AKP 1.3',
                deskripsi: 'Rumah Sakit mempertimbangkan kebutuhan klinis pasien dan memberikan informasi kepada pasien jika terjadi penundaan dan kelambatan pelaksanaan tindakan/pengobatan dan atau pemeriksaan penunjang diagnostik.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pasien dan atau keluarga diberi informasi jika ada penundaan dan atau keterlambatan pelayanan beserta alasannya dan dicatat di rekam medis.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pasien dan atau keluarga diberi informasi tentang alternatif yang tersedia sesuai kebutuhan klinis pasien dan dicatat di rekam medis.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Admisi pasien rawat inap;' },
                    { kode: 'EP d', deskripsi: 'Pendaftaran pasien rawat jalan;' },
                    { kode: 'EP e', deskripsi: 'Observasi pasien; dan' },
                    { kode: 'EP f', deskripsi: 'Mengelola pasien bila tidak tersedia tempat tidur. Rumah Sakit sering melayani berbagai pasien misalnya pasien lansia, disabilitas (fisik, mental, intelektual), berbagai bahasa dan dialek, budaya yang berbeda atau hambatan yang lainnya, sehingga dibutuhkan sistem pendaftaran dan admisi secara online. Sistim tersbut diharapkan dapat mengurangi hambatan pada saat penerimaan pasien. Saat pasien diputuskan untuk rawat inap, maka staf medis yang memutuskan tersebut memberi informasi tentang rencana a...' },
                ],
            },
            {
                kode: 'AKP 2',
                deskripsi: 'Rumah Sakit menetapkan proses penerimaan dan pendaftaran pasien rawat inap, rawat jalan, dan pasien gawat darurat.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan proses penerimaan pasien meliputi poin a) – f) pada maksud dan tujuan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan sistim pendaftaran pasien rawat jalan dan rawat inap baik secara offline maupun secara online dan dilakukan evaluasi dan tindak lanjutnya.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah memberikan informasi tentang rencana asuhan yang akan diberikan, hasil asuhan yang diharapkan serta perkiraan biaya yang harus dibayarkan oleh pasien/keluarga.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Saat diterima sebagai pasien rawat inap, pasien dan keluarga mendapat edukasi dan orientasi tentang ruang rawat inap.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Efisiensi pelayanan nonklinis penunjang asuhan dan tindakan kepada pasien (seperti kerumahtanggaan dan transportasi);' },
                    { kode: 'EP f', deskripsi: 'Memberikan asuhan pasien yang sama kepada pasien yang dirawat di tempat sementara/transit/intermediate seperti perawatan kepada pasien yang dirawat di ruang rawat inap; dan' },
                    { kode: 'EP g', deskripsi: 'Akses pelayanan yang bersifat mendukung (seperti pekerja sosial, keagamaan atau bantuan spiritual, dan sebagainya).' },
                    { kode: 'EP h', deskripsi: 'Pemantauan dan perbaikan proses ini bermanfaat untuk mengatasi masalah penumpukan pasien. Semua staf rumah sakit, mulai dari unit gawat darurat, unit rawat inap, staf medis, keperawatan, administrasi, lingkungan, dan manajemen risiko dapat ikut berperan serta menyelesaikan masalah alur pasien ini. Koordinasi dapat dilakukan oleh Manajer Pelayanan Pasien (MPP)/Case Manager. Rumah sakit harus menetapkan standar waktu berapa lama pasien dapat diobservasi di unit gawat darurat dan kapan harus di tra...' },
                ],
            },
            {
                kode: 'AKP 2.1',
                deskripsi: 'Rumah sakit menetapkan proses untuk mengelola alur pasien di seluruh area rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan pengelolaan alur pasien untuk menghindari penumpukan. mencakup poin a) – g) pada maksud dan tujuan.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Manajer pelayanan pasien (MPP)/case manager bertanggung jawab terhadap pelaksanaan pengaturan alur pasien untuk menghindari penumpukan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melakukan evaluasi terhadap pengelolaan alur pasien secara berkala dan melaksanakan upaya perbaikannya.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Ada sistem informasi tentang ketersediaan tempat tidur secara online kepada masyarakat.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Asuhan gizi terintegrasi; dan' },
                    { kode: 'EP f', deskripsi: 'Manajer pelayanan pasien/case manager. Manajer Pelayanan Pasien (MPP) bukan merupakan profesional pemberi asuhan (PPA) aktif dan dalam menjalankan manajemen pelayanan pasien mempunyai peran minimal adalah sebagai berikut:' },
                    { kode: 'EP g', deskripsi: 'Edukasi dan advokasi; dan' },
                    { kode: 'EP h', deskripsi: 'Kendali mutu dan biaya pelayanan pasien. Keluaran yang diharapkan dari kegiatan manajemen pelayanan pasien antara lain adalah:' },
                ],
            },
            {
                kode: 'AKP 3',
                deskripsi: 'Rumah sakit memiliki proses untuk melaksanakan kesinambungan pelayanan di rumah sakit dan integrasi antara profesional pemberi asuhan (PPA) dibantu oleh manajer pelayanan pasien (MPP)/case manager.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Para PPA telah memberikan asuhan pasien secara terintegrasi berfokus pada pasien meliputi poin a) - f) pada maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Ada penunjukkan MPP dengan uraian tugas meliputi poin a) - h) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Para profesional pemberi asuhan (PPA) dan manajer pelayanan pasien (MPP) telah melaksanakan kesinambungan dan koordinasi pelayanan meliputi poin a) - e) pada maksud dan tujuan.', bukti: ['O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pencatatan perkembangan pasien didokumentasikan para PPA di formulir catatan pasien terintegrasi (CPPT).', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Pencatatan di unit intensif atau unit khusus menggunakan lembar pemantauan pasien khusus, pencatatan perkembangan pasien dilakukan pada lembar tersebut oleh DPJP di unit tersebut, PPA lain dapat melakukan pencatatan perkembangan pasien di formulir catatan pasien terintegrasi (CPPT).', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Perencanaan dan pelayanan pasien secara terintegrasi diinformasikan kepada pasien dan atau keluarga secara berkala sesuai ketentuan Rumah Sakit.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'AKP 3.1',
                deskripsi: 'Rumah sakit menetapkan bahwa setiap pasien harus memiliki dokter penanggung jawab pelayanan (DPJP) untuk memberikan asuhan kepada pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan bahwa setiap pasien memiliki dokter penanggung jawab pelayanan (DPJP) dan telah melakukan asuhan pasien secara terkoordinasi dan terdokumentasi dalam rekam medis pasien.', bukti: ['R', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit juga menetapkan proses perpindahan tanggung jawab koordinasi asuhan pasien dari satu dokter penanggung jawab pelayanan (DPJP) ke DPJP lain, termasuk bila terjadi perubahan DPJP utama.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Bila dilaksanakan rawat bersama ditetapkan DPJP utama sebagai koordinator asuhan pasien.', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Prosedur yang telah dilakukan;' },
                    { kode: 'EP e', deskripsi: 'Obat-obatan;' },
                    { kode: 'EP f', deskripsi: 'Perawatan lain yang diterima pasien; dan' },
                    { kode: 'EP g', deskripsi: 'Kondisi pasien saat transfer. Bila pasien dalam pengelolaan manajer pelayanan pasien (MPP) maka kesinambungan proses tersebut di atas dipantau, diikuti, dan transfernya disupervisi oleh manajer pelayanan pasien (MPP). Bila pasien dalam pengelolaan manajer pelayanan pasien (MPP) maka kesinambungan proses tersebut di atas dipantau, diikuti, dan transfernya disupervisi oleh manajer pelayanan pasien (MPP).' },
                ],
            },
            {
                kode: 'AKP 4',
                deskripsi: 'Rumah sakit menetapkan informasi tentang pasien disertakan pada proses transfer internal antar unit di dalam rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan proses transfer pasien antar unit pelayanan di dalam rumah sakit dilengkapi dengan formulir transfer pasien.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Formulir transfer internal meliputi poin a) - g) pada maksud dan tujuan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'AKP 5',
                deskripsi: 'Rumah sakit menetapkan dan melaksanakan proses pemulangan pasien dari rumah sakit berdasarkan kondisi kesehatan pasien dan kebutuhan kesinambungan asuhan atau tindakan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan kriteria pemulangan pasien sesuai dengan kondisi kesehatan dan kebutuhan pelayanan pasien beserta edukasinya.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan kemungkinan pasien diizinkan keluar rumah sakit dalam jangka waktu tertentu untuk keperluan penting.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Penyusunan rencana dan instruksi pemulangan didokumentasikan dalam rekam medis pasien dan diberikan kepada pasien secara tertulis.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Tindak lanjut pemulangan pasien bila diperlukan dapat ditujukan kepada fasilitas pelayanan kesehatan baik perorangan ataupun dimana pasien untuk memberikan pelayanan berkelanjutan.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Kondisi pasien (status present); dan' },
                    { kode: 'EP f', deskripsi: 'Instruksi tindak lanjut. Ringkasan pasien pulang dijelaskan dan ditandatangani oleh pasien/keluarga karena memuat instruksi tindak lanjut. Ringkasan pasien pulang dibuat sebelum pasien keluar dari rumah sakit oleh dokter penanggung jawab pelayanan (DPJP). Satu salinan/copy dari ringkasan diberikan kepada tenaga medis dan/atau tenaga kesehatan yang bertanggung jawab memberikan tindak lanjut asuhan kepada pasien. Satu salinan diberikan kepada pasien sesuai dengan regulasi rumah sakit yang mengacu ...' },
                ],
            },
            {
                kode: 'AKP 5.1',
                deskripsi: 'Ringkasan pasien pulang (discharge summary) dibuat untuk semua pasien rawat inap yang keluar dari rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan Ringkasan pasien pulang meliputi a) – f) pada maksud dan tujuan.' },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memberikan salinan ringkasan pasien pulang kepada pihak yang berkepentingan dan tersimpan di dalam rekam medik.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Formulir Ringkasan pasien pulang dijelaskan kepada pasien dan atau keluarga.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'pada maksud dan tujuan.', bukti: ['R'] },
                ],
            },
            {
                kode: 'AKP 5.2',
                deskripsi: 'Rumah sakit menetapkan proses untuk mengelola dan melakukan tindak lanjut pasien dan memberitahu staf rumah sakit bahwa mereka berniat keluar rumah sakit serta menolak rencana asuhan medis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan proses untuk mengelola pasien rawat jalan dan rawat inap yang menolak rencana asuhan medis termasuk keluar rumah sakit atas permintaan sendiri dan pasien yang menghendaki penghentian pengobatan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Ada bukti pemberian edukasi kepada pasien tentang risiko medis akibat asuhan medis yang belum lengkap.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pasien keluar rumah sakit atas permintaan sendiri, tetapi tetap mengikuti proses pemulangan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Dokter keluarga (bila ada) atau dokter yang memberi asuhan berikutnya kepada pasien diberitahu tentang kondisi tersebut.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Ada dokumentasi rumah sakit melakukan pengkajian untuk mengetahui alasan pasien keluar rumah sakit apakah permintaan sendiri, menolak asuhan medis, atau tidak melanjutkan program pengobatan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'AKP 5.3',
                deskripsi: 'Rumah sakit menetapkan proses untuk mengelola pasien yang menolak rencana asuhan medis yang melarikan diri.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Ada regulasi yang mengatur pasien rawat inap dan rawat jalan yang meninggalkan rumah sakit tanpa pemberitahuan (melarikan diri).', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit melakukan identifikasi pasien menderita penyakit yang membahayakan dirinya sendiri atau lingkungan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit melaporkan kepada pihak yang berwenang bila ada indikasi kondisi pasien yang membahayakan dirinya sendiri atau lingkungan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'AKP 5.4',
                deskripsi: 'Pasien dirujuk ke fasilitas pelayanan kesehatan lain berdasar atas kondisi pasien untuk memenuhi kebutuhan asuhan berkesinambungan dan sesuai dengan kemampuan fasilitas kesehatan penerima untuk memenuhi kebutuhan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Ada regulasi tentang rujukan sesuai dengan peraturan perundang-undangan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rujukan pasien dilakukan sesuai dengan kebutuhan kesinambungan asuhan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit yang merujuk memastikan bahwa fasilitas kesehatan yang menerima dapat memenuhi kebutuhan pasien yang dirujuk.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Ada kerjasama rumah sakit yang merujuk dengan rumah sakit yang menerima rujukan yang sering dirujuk.', bukti: ['D'] },
                ],
            },
            {
                kode: 'AKP 5.5',
                deskripsi: 'Rumah sakit menetapkan proses rujukan untuk memastikan pasien pindah dengan aman.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit memiliki staf yang bertanggung jawab dalam pengelolaan rujukan termasuk untuk memastikan pasien diterima di rumah sakit rujukan yang dapat memenuhi kebutuhan pasien.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Selama proses rujukan ada staf yang kompeten sesuai dengan kondisi pasien yang selalu memantau dan mencatatnya dalam rekam medis.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Selama proses rujukan tersedia obat, bahan medis habis pakai, alat kesehatan, dan peralatan medis sesuai dengan kebutuhan kondisi pasien.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memiliki proses serah terima pasien antara staf pengantar dan yang menerima.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Pasien dan keluarga dijelaskan apabila rujukan yang dibutuhkan tidak dapat dilaksanakan.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Nama dan tanda tangan tenaga medis dan tenaga kesehatan yang memberikan pelayanan rujukan. Dokumentasi juga memuat nama fasilitas pelayanan kesehatan dan nama orang di fasilitas pelayanan kesehatan yang menyetujui menerima pasien, kondisi khusus untuk rujukan (seperti kalau ruangan tersedia di penerima rujukan atau tentang status pasien). Juga dicatat jika kondisi pasien atau kondisi pasien berubah selama ditransfer (misalnya, pasien meninggal atau membutuhkan resusitasi). Dokumen lain yang dimi...' },
                ],
            },
            {
                kode: 'AKP 5.6',
                deskripsi: 'Rumah sakit menetapkan regulasi untuk mengatur proses rujukan dan dicatat di rekam medis pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Dokumen rujukan berisi nama dari fasilitas pelayanan kesehatan yang menerima dan nama orang yang menyetujui menerima pasien.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Dokumen rujukan berisi alasan pasien dirujuk, memuat kondisi pasien, dan kebutuhan pelayanan lebih lanjut.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Dokumen rujukan juga memuat prosedur dan intervensi yang sudah dilakukan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Proses rujukan dievaluasi dalam aspek mutu dan keselamatan pasien.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'AKP 5.7',
                deskripsi: 'Untuk pasien rawat jalan yang membutuhkan asuhan yang kompleks atau diagnosis yang kompleks dibuat catatan tersendiri profil ringkas medis rawat jalan (PRMRJ) dan tersedia untuk PPA.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan kriteria pasien rawat jalan dengan asuhan yang kompleks atau yang diagnosisnya kompleks diperlukan Profil Ringkas Medis Rawat Jalan (PRMRJ) meliputi poin a-d dalam maksud tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki proses yang dapat dibuktikan bahwa PRMRJ mudah ditelusur dan mudah di-review.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Proses tersebut dievaluasi untuk memenuhi kebutuhan para DPJP dan meningkatkan mutu serta keselamatan pasien.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'AKP 6',
                deskripsi: 'Rumah sakit menetapkan proses transportasi dalam merujuk, memindahkan atau pemulangan, pasien rawat inap dan rawat jalan utk memenuhi kebutuhan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit memiliki proses transportasi pasien sesuai dengan kebutuhannya yang meliputi pengkajian kebutuhan transportasi, SDM, obat, bahan medis habis pakai, alat kesehatan, peralatan medis dan persyaratan PPI yang sesuai dengan kebutuhan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Bila rumah sakit memiliki kendaraan transport sendiri, ada bukti pemeliharan kendaraan tersebut sesuai dengan peraturan perundang-undangan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Bila rumah sakit bekerja sama dengan jasa transportasi pasien mandiri, ada bukti kerja sama tersebut dan evaluasi berkala dari rumah sakit mengenai kelayakan kendaraan transportasi, memenuhi aspek mutu, keselamatan pasien dan keselamatan transportasi.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Kriteria alat transportasi yang digunakan untuk merujuk, memindahkan, atau memulangkan pasien ditentukan oleh rumah sakit (staf yang kompeten), harus sesuai dengan Program PPI, memenuhi aspek mutu, keselamatan pasien dan keselamatan transportasi.', bukti: ['R'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'HPK',
        pokjaName: 'Hak Pasien dan Keluarga',
        standarList: [
            {
                kode: 'HPK 1',
                deskripsi: 'Rumah sakit menerapkan proses yang mendukung hak-hak pasien dan keluarganya selama pasien mendapatkan pelayanan dan perawatan di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan regulasi hak pasien dan keluarga sebagaimana tercantum dalam poin a) – d) pada gambaran umum dan peraturan perundang- undangan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki proses untuk mengidentifikasi siapa yang diinginkan pasien untuk berpartisipasi dalam pengambilan keputusan terkait perawatannya.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memiliki proses untuk menentukan preferensi pasien, dan pada beberapa keadaan preferensi keluarga pasien, dalam menentukan informasi apa mengenai perawatan pasien yang dapat diberikan kepada keluarga/pihak lain, dan dalam situasi apa.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Semua staff dilatih tentang proses dan peran mereka dalam mendukung hak-hak serta partisipasi pasien dan keluarga dalam perawatan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 1.1',
                deskripsi: 'Rumah sakit berupaya mengurangi hambatan fisik, bahasa, budaya, dan hambatan lainnya dalam mengakses dan memberikan layanan serta memberikan informasi dan edukasi kepada pasien dan keluarga dalam bahasa dan cara yang dapat mereka pahami.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah mengidentifikasi hambatan serta menerapkan proses untuk mengurangi hambatan bagi pasien dalam mendapatkan akses, proses penerimaan dan pelayanan perawatan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Informasi terkait aspek perawatan dan tata laksana medis pasien diberikan dengan cara dan bahasa yang dipahami pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Informasi mengenai hak dan tanggung jawab pasien terpampang di area rumah sakit atau diberikan kepada setiap pasien secara tertulis atau dalam metode lain dalam bahasa yang dipahami pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memiliki proses untuk memberikan pasien akses terhadap informasi kesehatan mereka.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 1.2',
                deskripsi: 'Rumah sakit memberikan pelayanan yang menghargai martabat pasien, menghormati nilai-nilai dan kepercayaan pribadi pasien serta menanggapi permintaan yang terkait dengan keyakinan agama dan spiritual.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Staf memberikan perawatan yang penuh penghargaan dengan memerhatikan harkat dan martabat pasien.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menghormati keyakinan spiritual dan budaya pasien serta nilai-nilai yang dianut pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memenuhi kebutuhan pasien terhadap bimbingan rohani.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 1.3',
                deskripsi: 'Rumah sakit menjaga privasi pasien dan kerahasiaan informasi dalam perawatan, serta memberikan hak kepada pasien untuk memperoleh akses dalam informasi kesehatan mereka sesuai perundang-undangan yang berlaku.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menjamin kebutuhan privasi pasien selama perawatan dan pengobatan di rumah sakit, dengan memperhatikan jenis kelamin dan usia.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Kerahasiaan informasi pasien dijaga sesuai dengan peraturan perundangan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memiliki proses untuk meminta persetujuan pasien terkait pemberian informasi.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memiliki proses untuk memberikan pasien akses terhadap informasi kesehatan mereka.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 1.4',
                deskripsi: 'Rumah sakit melindungi harta benda pasien dari pencurian atau kehilangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan proses untuk mencatat dan melindungi pertanggungjawaban harta benda pasien.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Pasien mendapat informasi mengenai tanggung jawab rumah sakit untuk melindungi harta benda pribadi mereka di tempat penyimpanan barang pasien berupa nakas/lemari kecil pada masing-masing tempat tidur pasien.', bukti: ['D', 'O', 'W'] },
                ],
            },
            {
                kode: 'HPK 1.5',
                deskripsi: 'Rumah sakit melindungi pasien dari serangan fisik dan verbal, dan populasi yang berisiko diidentifikasi serta dilindungi dari kerentanan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit mengembangkan dan menerapkan proses untuk melindungi semua pasien dari serangan fisik dan verbal.', bukti: ['R', 'D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit mengidentifikasi populasi yang memiliki risiko lebih tinggi untuk mengalami serangan.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memantau area fasilitas yang terisolasi dan terpencil.', bukti: ['D', 'O', 'W'] },
                ],
            },
            {
                kode: 'HPK 2',
                deskripsi: 'Pasien dan keluarga pasien dilibatkan dalam semua aspek perawatan dan tata laksana medis melalui edukasi, dan diberikan kesempatan untuk berpartisipasi dalam proses pengambilan keputusan mengenai perawatan serta tata laksananya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses untuk mendukung pasien dan keluarga terlibat dan berpartisipasi dalam proses asuhan dan dalam pengambilan keputusan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan proses untuk memberikan edukasi kepada pasien dan keluarganya mengenai kondisi medis, diagnosis, serta rencana perawatan dan terapi yang diberikan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pasien diberikan informasi mengenai hasil asuhan dan tata laksana yang diharapkan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pasien diberikan informasi mengenai kemungkinan hasil yang tidak dapat diantisipasi dari terapi dan perawatan.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit memfasilitasi permintaan pasien untuk mencari pendapat kedua tanpa perlu khawatir akan mempengaruhi perawatannya selama di dalam atau luar rumah sakit.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 2.1',
                deskripsi: 'Rumah sakit memberikan informasi kepada pasien dan keluarga mengenai hak dan kewajibannya untuk menolak atau menghentikan terapi, menolak diberikan pelayanan resusitasi, serta melepaskan atau menghentikan terapi penunjang kehidupan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses mengenai pemberian pelayanan resusitasi dan penghentian terapi penunjang kehidupan untuk pasien.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memberi informasi kepada pasien dan keluarga mengenai hak mereka untuk menolak atau menghentikan terapi, konsekuensi dari keputusan yang dibuat serta terapi dan alternatif lain yang dapat dijadikan pilihan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 2.2',
                deskripsi: 'Rumah sakit mendukung hak pasien untuk mendapat pengkajian dan tata laksana nyeri serta perawatan yang penuh kasih menjelang akhir hayatnya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses untuk menghargai dan mendukung hak pasien mendapatkan pengkajian dan pengelolaan nyeri.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan proses untuk menghargai dan mendukung hak pasien untuk mendapatkan pengkajian dan pengelolaan terhadap kebutuhan pasien menjelang akhir hayat.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 3',
                deskripsi: 'Rumah sakit memberitahu pasien dan keluarganya mengenai proses untuk menerima dan menanggapi keluhan, tindakan rumah sakit bila terdapat konflik/perbedaan pendapat di dalam asuhan pasien, serta hak pasien untuk berperan dalam semua proses ini.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pasien diberikan informasi mengenai proses untuk menyampaikan keluhan dan proses yang harus dilakukan pada saat terjadi konflik/perbedaan pendapat pada proses perawatan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Keluhan, konflik, dan perbedaan pendapat tersebut dikaji dan diselesaikan oleh unit/petugas yang bertanggung jawab melalui sebuah alur/proses spesifik.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pasien dan keluarga berpartisipasi dalam proses penyelesaian keluhan, konflik, dan perbedaan pendapat.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 4',
                deskripsi: 'Rumah sakit menetapkan batasan yang jelas untuk persetujuan umum yang diperoleh pasien pada saat akan menjalani rawat inap atau didaftarkan pertama kalinya sebagai pasien rawat jalan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses bagaimana persetujuan umum didokumentasikan dalam rekam medis pasien.', bukti: ['R', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pasien dan keluarga diberikan informasi mengenai pemeriksaan, tindakan dan pengobatan yang memerlukan informed consent.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pasien menerima informasi mengenai kemungkinan keterlibatan peserta didik, mahasiswa, residen traine dan fellow yang berpartisipasi dalam proses perawatan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'HPK 4.1',
                deskripsi: 'Persetujuan tindakan (informed consent) pasien diperoleh melalui cara yang telah ditetapkan rumah sakit dan dilaksanakan oleh petugas terlatih dengan cara dan bahasa yang mudah dipahami pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses bagi pasien untuk mendapatkan informed consent.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Pemberian informed consent dilakukan oleh staf yang kompeten dan diberikan dengan cara dan bahasa yang mudah dipahami pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memiliki daftar tindakan invasif, pemeriksaan dan terapi tambahan yang memerlukaninformed consent.', bukti: ['R'] },
                ],
            },
            {
                kode: 'HPK 4.2',
                deskripsi: 'Rumah sakit menerapkan proses untuk pemberian persetujuan oleh orang lain, sesuai dengan peraturan perundangan yang berlaku.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses untuk pemberian informed consent oleh orang lain selain pasien sesuai peraturan perundangan yang berlaku.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rekam medis pasien mencantumkan (satu atau lebih) nama individu yang menyatakan persetujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pengembangan rencana perawatan pasien untuk memenuhi kebutuhan yang telah diidentifikasi. Pengkajian disesuaikan dengan kebutuhan pasien, sebagai contoh, rawat inap atau rawat jalan. Bagaimana pengkajian ini dilakukan dan informasi apa yang perlu dikumpulkan serta didokumentasikan ditetapkan dalam kebijakan dan prosedur rumah sakit. Isi minimal pengkajian awal antara lain:' },
                    { kode: 'EP d', deskripsi: 'Ekonomi;' },
                    { kode: 'EP e', deskripsi: 'Riwayat kesehatan pasien;' },
                    { kode: 'EP f', deskripsi: 'Riwayat alergi;' },
                    { kode: 'EP g', deskripsi: 'Riwayat penggunaan obat;' },
                    { kode: 'EP h', deskripsi: 'Pengkajian nyeri;' },
                    { kode: 'EP i', deskripsi: 'Risiko jatuh;' },
                    { kode: 'EP j', deskripsi: 'Pengkajian fungsional;' },
                    { kode: 'EP k', deskripsi: 'Risiko nutritional;' },
                    { kode: 'EP l', deskripsi: 'Kebutuhan edukasi; dan' },
                    { kode: 'EP m', deskripsi: 'Perencanaan pemulangan pasien (Discharge Planning). Pada kelompok pasien tertentu, misalnya dengan risiko jatuh, nyeri dan status nutrisi maka dilakukan skrining sebagai bagian dari pengkajian awal, kemudian dilanjutkan dengan pengkajian lanjutan. Agar pengkajian kebutuhan pasien dilakukan secara konsisten, rumah sakit harus mendefinisikan dalam kebijakan, isi minimum dari pengkajian yang dilakukan oleh para dokter, perawat, dan disiplin klinis lainnya. Pengkajian dilakukan oleh setiap disiplin ...' },
                ],
            },
        ],
    },
    {
        pokjaCode: 'KE',
        pokjaName: 'Kompetensi dan Kewenangan',
        standarList: [
            {
                kode: 'KE 1',
                deskripsi: 'Rumah sakit menetapkan tim atau unit Promosi Kesehatan Rumah Sakit (PKRS) dengan tugas dan tanggung jawab sesuai peraturan perundangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang pelaksanaan PKRS di rumah sakit sesuai poin a) – b) pada gambaran umum.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Terdapat penetapan tim atau unit Promosi Kesehatan Rumah Sakit (PKRS) yang mengkoordinasikan pemberian edukasi kepada pasien sesuai dengan peraturan perundang-undangan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Tim atau unit PKRS menyusun program kegiatan promosi kesehatan rumah sakit setiap tahunnya, termasuk kegiatan edukasi rutin sesuai dengan misi rumah sakit, layanan, dan populasi pasiennya.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah menerapkan pemberian edukasi kepada pasien dan keluarga menggunakan media, format, dan metode yang yang telah ditetapkan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KE 2',
                deskripsi: 'Rumah sakit memberikan informasi kepada pasien dan keluarga tentang jenis asuhan dan pelayanan, serta akses untuk mendapatkan pelayanan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Tersedia informasi untuk pasien dan keluarga mengenai asuhan dan pelayanan yang disediakan oleh rumah sakit serta akses untuk mendapatkan layanan tersebut. Informasi dapat disampaikan secara langsung dan/atau tidak langsung.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menyampaikan informasi kepada pasien dan keluarga terkait alternatif asuhan dan pelayanan di tempat lain, apabila rumah sakit tidak dapat memberikan asuhan dan pelayanan yang dibutuhkan pasien.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Akses mendapatkan informasi kesehatan diberikan secara tepat waktu, dan status sosial ekonomi perawatan pasien tidak menghalangi pasien dan keluarga untuk mendapatkan informasi yang dibutuhkan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti pemberian informasi untuk pasien dan keluarga mengenai asuhan dan pelayanan di rumah sakit.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Kesediaan pasien untuk menerima informasi; dan' },
                    { kode: 'EP f', deskripsi: 'Nilai-nilai dan pilihan pasien. Hasil pengkajian tersebut dijadikan dasar oleh staf klinis dalam merencanakan dan melaksanakan pemberian informasi dan edukasi kepada pasien dan keluarga. Hasil pengkajian didokumentasikan di rekam medis pasien agar PPA yang terlibat merawat pasien dapat berpartisipasi dalam proses edukasi.' },
                ],
            },
            {
                kode: 'KE 3',
                deskripsi: 'Rumah sakit melakukan pengkajian terhadap kebutuhan edukasi setiap pasien, beserta kesiapan dan kemampuan pasien untuk menerima edukasi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Kebutuhan edukasi pasien dan keluarga dinilai berdasarkan pengkajian terhadap kemampuan dan kemauan belajar pasien dan keluarga yang meliputi poin a) – f) pada maksud dan tujuan, dan dicatat di rekam medis.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Hambatan dari pasien dan keluarga dalam menerima edukasi dinilai sebelum pemberian edukasi dan dicatat di rekam medis.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat bukti dilakukan pengkajian kemampuan dan kemauan belajar pasien/keluarga, serta hasil pengkajian digunakan PPA untuk membuat perencanaan kebutuhan edukasi.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'pada maksud dan tujuan, dan dicatat di rekam medis.' },
                ],
            },
            {
                kode: 'KE 4',
                deskripsi: 'Edukasi tentang proses asuhan disampaikan kepada pasien dan keluarga disesuaikan dengan tingkat pemahaman dan bahasa yang dimengerti oleh pasien dan keluarga.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti bahwa edukasi yang diberikan kepada pasien dan keluarga telah diberikan dengan cara dan bahasa yang mudah dipahami.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti bahwa pasien/keluarga telah dijelaskan mengenai hasil pengkajian, diagnosis, rencana asuhan, dan hasil pengobatan, termasuk hasil pengobatan yang tidak diharapkan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Terdapat bukti edukasi kepada pasien dan keluarga terkait dengan cara cuci tangan yang aman, penggunaan obat yang aman, penggunaan peralatan medis yang aman, potensi interaksi obat-obat dan obat-makanan, pedoman nutrisi, manajemen nyeri, dan teknik rehabilitasi serta edukasi asuhan lanjutan di rumah.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'KE 5',
                deskripsi: 'Metode edukasi dipilih dengan mempertimbangkan nilai yang dianut serta preferensi pasien dan keluarganya, untuk memungkinkan terjadinya interaksi yang memadai antara pasien, keluarga pasien dan staf.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit memiliki proses untuk memastikan bahwa pasien dan keluarganya memahami edukasi yang diberikan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Proses pemberian edukasi di dokumentasikan dalam rekam medik sesuai dengan metode edukasi yang dapat diterima pasien dan keluarganya.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Materi edukasi untuk pasien dan keluarga selalu tersedia dan diperbaharui secara berkala.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Informasi dan edukasi disampaikan kepada pasien dan keluarga dengan menggunakan format yang praktis dan dengan bahasa yang dipahami pasien dan keluarga.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit menyediakan penerjemah (bahasa dan bahasa isyarat) sesuai dengan kebutuhan pasien dan keluarga.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KE 6',
                deskripsi: 'Dalam menunjang keberhasilan asuhan yang berkesinambungan, upaya promosi kesehatan harus dilakukan berkelanjutan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit mengidentifikasi sumber-sumber yang ada di komunitas untuk mendukung promosi kesehatan berkelanjutan dan edukasi untuk menunjang asuhan pasien yang berkelanjutan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah memiliki jejaring di komunitas untuk mendukung asuhan pasien berkelanjutan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Memiliki bukti telah disampaikan kepada pasien dan keluarga tentang edukasi lanjutan dikomunitas. Rujukan edukasi tersebut dilaksanakan oleh jejaring utama yaitu Fasilitas Kesehatan Tingkat Pertama (FKTP).', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti edukasi berkelanjutan tersebut diberikan kepada pasien sesuai dengan kebutuhan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KE 7',
                deskripsi: 'Profesional Pemberi Asuhan (PPA) mampu memberikan edukasi secara efektif.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Profesional Pemberi Asuhan (PPA) telah diberikan pelatihan dan terampil melaksanakan komunikasi efektif.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'PPA telah memberikan edukasi yang efektif kepada pasien dan keluarga secara kolaboratif.', bukti: ['D'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'KPS',
        pokjaName: 'Kompetensi dan Kewenangan Staf',
        standarList: [
            {
                kode: 'KPS 1',
                deskripsi: 'Kepala unit merencanakan dan menetapkan persyaratan pendidikan, keterampilan, pengetahuan, dan persyaratan lainnya bagi semua staf di unitnya sesuai kebutuhan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur telah menetapkan regulasi terkait Kualifikasi Pendidikan dan staf meliputi poin a - f pada gambaran umum.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Kepala unit telah merencanakan dan menetapkan persyaratan pendidikan, kompetensi dan pengalaman staf di unitnya sesuai peraturan dan perundang- undangan.', bukti: ['R', 'D'] },
                    { kode: 'EP c', deskripsi: 'Kebutuhan staf telah direncanakan sesuai poin a)-e) dalam maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Perencanaan staf meliputi penghitungan jumlah, jenis, dan kualifikasi staf menggunakan metode yang diakui sesuai peraturan perundang-undangan.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Perencanaan staf termasuk membahas penugasan dan rotasi/alih fungsi staf.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Efektivitas perencanaan staf dipantau secara berkelanjutan dan diperbarui sesuai kebutuhan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KPS 2',
                deskripsi: 'Tanggung jawab tiap staf dituangkan dalam uraian tugas',
                epList: [
                    { kode: 'EP a', deskripsi: 'Setiap staf telah memiliki uraian tugas sesuai dengan tugas yang diberikan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Tenaga kesehatan yang diidentifikasi dalam a) hingga', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pengangkatan staf baru. Kepala unit berpartisipasi merekomendasikan jumlah dan kualifikasi staf serta jabatan nonklinis yang dibutuhkan untuk memberikan pelayanan pada pasien, pendidikan, penelitian ataupun tanggung jawab lainnya.' },
                    { kode: 'EP d', deskripsi: 'dalam maksud dan tujuan, memiliki uraian tugas yang sesuai dengan tugas dan tanggung jawabnya.' },
                ],
            },
            {
                kode: 'KPS 3',
                deskripsi: 'Rumah sakit menyusun dan menerapkan proses rekrutmen, evaluasi, dan pengangkatan staf serta prosedur- prosedur terkait lainnya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi terkait proses rekrutmen, evaluasi kompetensi kandidat calon staf dan mekanisme pengangkatan staf di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan proses meliputi poin a) – c) di maksud dan tujuan secara seragam.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit menetapkan proses evaluasi kemampuan PPA dan frekuensi evaluasi secara berkesinambungan. Penilaian yang berkesinambungan dapat digunakan untuk menentukan rencana pelatihan sesuai kebutuhan, kemampuan staf untuk memikul tanggung jawab baru atau untuk melakukan perubahan tanggung jawab dari PPA tersebut. Sekurang-kurangnya terdapat satu penilaian terkait uraian tugas tiap PPA yang didokumentasikan setiap tahunnya.' },
                ],
            },
            {
                kode: 'KPS 4',
                deskripsi: 'Rumah sakit menetapkan proses untuk memastikan bahwa kompetensi Profesional Pemberi Asuhan (PPA) sesuai dengan persyaratan jabatan atau tanggung jawabnya untuk memenuhi kebutuhan rumah sakit',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan dan menerapkan proses untuk menyesuaikan kompetensi PPA dengan kebutuhan pasien.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Para PPA baru dievaluasi pada saat mulai bekerja oleh kepala unit di mana PPA tersebut ditugaskan', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat setidaknya satu atau lebih evaluasi yang didokumentasikan untuk tiap PPA sesuai uraian tugas setiap tahunnya atau sesuai ketentuan rumah sakit.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KPS 5',
                deskripsi: 'Rumah sakit menetapkan proses untuk memastikan bahwa kompetensi staf nonklinis sesuai dengan persyaratan jabatan/posisinya untuk memenuhi kebutuhan rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan dan menerapkan proses untuk menyesuaikan kompetensi staf non klinis dengan persyaratan jabatan/posisi.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Staf non klinis yang baru dinilai kinerjanya pada saat akan memulai pekerjaannya oleh kepala unit di mana staf tersebut ditugaskan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat setidaknya satu atau lebih evaluasi yang didokumentasikan untuk tiap staf non klinis sesuai uraian tugas setiap tahunnya atau sesuai ketentuan rumah sakit.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Riwayat pekerjaan staf.' },
                    { kode: 'EP e', deskripsi: 'Penilaian kinerja staf.' },
                    { kode: 'EP f', deskripsi: 'Salinan sertifikat pelatihan di dalam maupun di luar rumah sakit yang telah diikuti.' },
                    { kode: 'EP g', deskripsi: 'Informasi kesehatan yang dipersyaratkan, seperti vaksinasi/ imunisasi, hasil medical check up. File kepegawaian tersebut distandarisasi dan terus diperbarui sesuai dengan kebijakan rumah sakit.' },
                ],
            },
            {
                kode: 'KPS 6',
                deskripsi: 'Terdapat informasi kepegawaian yang terdokumentasi dalam file kepegawaian setiap staf.',
                epList: [
                    { kode: 'EP a', deskripsi: 'File kepegawaian staf distandardisasi dan dipelihara serta dijaga kerahasiaannya sesuai dengan kebijakan rumah sakit.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'File kepegawaian mencakup poin a) – g) sesuai maksud dan tujuan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KPS 7',
                deskripsi: 'Semua staf diberikan orientasi mengenai rumah sakit dan unit tempat mereka ditugaskan dan tanggung jawab pekerjaannya pada saat pengangkatan staf.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi tentang orientasi bagi staf baru di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Tenaga kesehatan baru telah diberikan orientasi umum dan orientasi khusus sesuai.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Staf nonklinis baru telah diberikan orientasi umum dan orientasi khusus.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Tenaga kontrak, paruh waktu, mahasiswa atau trainee dan sukarelawan telah diberikan orientasi umum dan orientasi khusus (jika ada).', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Pengenalan teknologi termasuk penambahan peralatan medis baru, keterampilan dan pengetahuan baru yang diperoleh dari penilaian kinerja.' },
                    { kode: 'EP f', deskripsi: 'Prosedur klinis baru.' },
                    { kode: 'EP g', deskripsi: 'Rencana untuk menyediakan layanan baru di masa yang akan datang.' },
                    { kode: 'EP h', deskripsi: 'Kebutuhan dan usulan dari setiap unit. Rumah sakit memiliki suatu proses untuk mengumpulkan dan mengintegrasikan data dari berbagai sumber untuk merencanakan program pendidikan dan pelatihan staf. Selain itu, rumah sakit menentukan staf mana yang diharuskan untuk mendapatkan pendidikan berkelanjutan untuk menjaga kemampuan mereka dan bagaimana pendidikan staf tersebut akan dipantau dan didokumentasikan. Pimpinan rumah sakit meningkatkan dan mempertahankan kinerja staf dengan mendukung program pe...' },
                ],
            },
            {
                kode: 'KPS 8',
                deskripsi: 'Tiap staf diberikan pendidikan dan pelatihan yang berkelanjutan untuk mendukung atau meningkatkan keterampilan dan pengetahuannya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah mengidentifikasi kebutuhan pendidikan staf berdasarkan sumber berbagai informasi, mencakup a) – h) dalam maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Program pendidikan dan pelatihan telah disusun berdasarkan hasil identifikasi sumber informasi pada EP 1.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Pendidikan dan pelatihan berkelanjutan diberikan kepada staf rumah sakit baik internal maupun eksternal.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah menyediakan waktu, anggaran, sarana dan prasarana yang memadai bagi semua staf untuk mendapat kesempatan mengikuti pendidikan dan pelatihan yang dibutuhkan.', bukti: ['D', 'O'] },
                ],
            },
            {
                kode: 'KPS 8.1',
                deskripsi: 'Staf yang memberikan asuhan pasien dan staf yang ditentukan rumah sakit dilatih dan dapat mendemonstrasikan teknik resusitasi jantung paru dengan benar.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan pelatihan teknik resusitasi jantung paru tingkat dasar (BHD) pada seluruh staf dan bantuan hidup tingkat lanjut bagi staf yang ditentukan oleh rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti yang menunjukkan bahwa staf yang mengikuti pelatihan BHD atau bantuan hidup tingkat lanjut telah lulus pelatihan tersebut.', bukti: ['D', 'S'] },
                    { kode: 'EP c', deskripsi: 'Tingkat pelatihan yang ditentukan untuk tiap staf harus diulang berdasarkan persyaratan dan/atau jangka waktu yang ditetapkan oleh program pelatihan yang diakui, atau setiap 2 (dua) tahun jika tidak menggunakan program pelatihan yang diakui.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Pendidikan, pelatihan, dan intervensi terkait pengelolaan kekerasan di tempat kerja' },
                    { kode: 'EP e', deskripsi: 'Pendidikan, pelatihan, dan intervensi terhadap staf yang berpotensi melakukan kejadian tidak diharapkan (KTD) atau kejadian sentinel' },
                    { kode: 'EP f', deskripsi: 'Tata laksana kondisi terkait pekerjaan yang umum dijumpai seperti cedera punggung atau cedera lain yang lebih darurat.' },
                    { kode: 'EP g', deskripsi: 'Vaksinasi/Imunisasi pencegahan, dan pemeriksaan kesehatan berkala.' },
                    { kode: 'EP h', deskripsi: 'Pengelolaan kesehatan mental staf, seperti pada saat kondisi kedaruratan penyakit infeksi/pandemi. Penyusunan program mempertimbangkan masukan dari staf serta penggunaan sumber daya klinis yang ada di rumah sakit dan di masyarakat.' },
                ],
            },
            {
                kode: 'KPS 9',
                deskripsi: 'Rumah sakit menyelenggarakan pelayanan kesehatan dan keselamatan staf.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan program kesehatan dan keselamatan staf.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Program kesehatan dan keselamatan staf mencakup setidaknya a) hingga h) yang tercantum dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit mengidentifikasi penularan penyakit infeksi atau paparan yang dapat terjadi pada staf serta melakukan upaya pencegahan dengan vaksinasi.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Berdasar atas epidemologi penyakit infeksi maka rumah sakit mengidentifikasi risiko staf terpapar atau tertular serta melaksanakan pemeriksaan kesehatan dan vaksinasi.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit telah melaksanakan evaluasi, konseling, dan tata laksana lebih lanjut untuk staf yang terpapar penyakit infeksi serta dikoordinasikan dengan program pencegahan dan pengendalian infeksi.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Rumah sakit telah mengidentifikasi area yang berpotensi untuk terjadi tindakan kekerasan di tempat kerja (workplace violence) dan menerapkan upaya untuk mengurangi risiko tersebut.', bukti: ['D', 'O'] },
                    { kode: 'EP g', deskripsi: 'Rumah sakit telah melaksanakan evaluasi, konseling, dan tata laksana lebih lanjut untuk staf yang mengalami cedera akibat tindakan kekerasan di tempat kerja.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'KPS 10',
                deskripsi: 'Rumah sakit menyelenggarakan proses kredensial yang seragam dan transparan bagi tenaga medis yang diberi izin memberikan asuhan kepada pasien secara mandiri.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan peraturan internal tenaga medis (medical staf bylaws) yang mengatur proses penerimaan, kredensial, penilaian kinerja, dan rekredensial tenaga medis', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melaksanakan proses kredensial dan pemberian kewenangan klinis untuk pelayanan diagnostik, konsultasi, dan tata laksana yang diberikan oleh dokter praktik mandiri di rumah sakit secara seragam', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melaksanakan proses kredensial dan pemberian kewenangan klinis kepada dokter praktik mandiri dari luar rumah sakit seperti konsultasi kedokteran jarak jauh (telemedicine), radiologi jarak jauh (teleradiology), dan interpretasi untuk pemeriksaan diagnostik lain: elektrokardiogram (EKG), elektroensefalogram (EEG), elektromiogram (EMG), serta pemeriksaan lain yang serupa.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Setiap tenaga medis yang memberikan pelayanan di rumah sakit wajib menandatangani perjanjian sesuai dengan regulasi rumah sakit.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit telah melaksanakan verifikasi ke Lembaga/Badan/Instansi pendidikan atau organisasi profesional yang diakui yang mengeluarkan izin/sertifikat, dan kredensial lain dalam proses kredensial sesuai dengan peraturan perundang- undangan atau yang', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Ada bukti dilaksanakan kredensial tambahan ke sumber yang mengeluarkan apabila tenaga medis yang meminta kewenangan klinis tambahan yang canggih atau subspesialisasi.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'KPS 10.1',
                deskripsi: 'Rumah sakit melaksanakan verifikasi terkini terhadap pendidikan, registrasi/izin, pengalaman, dan lainnya dalam proses kredensialing tenaga medis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pengangkatan tenaga medis dibuat berdasar atas kebijakan rumah sakit dan konsisten dengan populasi pasien rumah sakit, misi, dan pelayanan yang diberikan untuk memenuhi kebutuhan pasien.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Pengangkatan tidak dilakukan sampai setidaknya izin/surat tanda registrasi sudah diverifikasi dari sumber utama yang mengeluarkan surat tersebut dan tenaga medis dapat memberikan pelayanan kepada pasien di bawah supervisi sampai semua kredensial yang disyaratkan undang-undang dan peraturan sudah diverifikasi dari sumbernya.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Untuk tenaga medis yang belum mendapatkan kewenangan mandiri, dilakukan supervisi dengan mengatur frekuensi supervisi dan supervisor yang ditunjuk serta didokumentasikan di file kredensial staf tersebut.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Seorang dokter dengan spesialisasi yang sama dimungkinkan memiliki kewenangan klinis berbeda yang disebabkan oleh perbedaan pendidikan dan pelatihan tambahan, pengalaman, atau hasil kinerja yang bersangkutan selama bekerja, serta kemampuan motoriknya;' },
                    { kode: 'EP e', deskripsi: 'Keputusan kewenangan klinis dirinci dan akan direkomendasikan kepada pimpinan rumah sakit di area spesialisasi terkait dengan mempertimbangkan proses lain, diantaranya: (1) Pemilihan proses apa yang akan dimonitor menggunakan data oleh pimpinan unit pelayanan klinis; (2) Penggunaan data tersebut dalam OPPE dari tenaga medis tersebut di unit pelayanan klinis; dan (3) Penggunaan data yang dimonitor tersebut untuk proses penugasan ulang dan pembaharuan kewenangan klinis.' },
                    { kode: 'EP f', deskripsi: 'Penilaian kinerja tenaga medis berkelanjutan setiap tahun yang dikeluarkan oleh rumah sakit yang berisi jumlah pasien per penyakit/tindakan yang ditangani per tahun, rerata lama dirawat, serta angka kematiannya. Angka Infeksi Luka Operasi (ILO) dan kepatuhan terhadap Panduan Praktik Klinis (PPK) meliputi penggunaan obat, penunjang diagnostik, darah, produk darah, dan lainnya;' },
                    { kode: 'EP g', deskripsi: 'Hasil evaluasi praktik profesional berkelanjutan (OPPE) dan terfokus (FPPE);' },
                    { kode: 'EP h', deskripsi: 'Hasil pendidikan dan pelatihan tambahan dari pusat pendidikan, kolegium, perhimpunan profesi, dan rumah sakit yang kompeten mengeluarkan sertifikat;' },
                    { kode: 'EP i', deskripsi: 'Untuk kewenangan tambahan pada pelayanan risiko tinggi maka rumah sakit menentukan area pelayanan risiko tinggi seperti prosedur cathlab, penggantian sendi lutut dan panggul, pemberian obat kemoterapi, obat radioaktif, obat anestesi, dan lainnya. Prosedur dengan risiko tinggi tersebut maka tenaga medis dapat diberikan kewenangan klinis secara khusus. Prosedur risiko tinggi, obat-obat, atau layanan yang lain ditentukan di kelompok spesialisasi dan dirinci kewenangannya secara jelas. Beberapa pros...' },
                    { kode: 'EP j', deskripsi: 'Kewenangan klinis tidak dapat diberikan jika rumah sakit tidak mempunyai peralatan medis khusus atau staf khusus untuk mendukung pelaksanaan kewenangan klinis. Sebagai contoh, seorang nefrolog kompeten melakukan dialisis atau kardiolog kompeten memasang sten tidak dapat diberi kewenangan klinis jika rumah sakit tidak memiliki peralatannya. Catatan: jika anggota tenaga medis juga mempunyai tanggung jawab administrasi seperti ketua kelompok tenaga medis (KSM), administrator rumah sakit, atau posis...' },
                ],
            },
            {
                kode: 'KPS 11',
                deskripsi: 'Rumah sakit menetapkan proses yang seragam, objektif, dan berdasar bukti (evidence based) untuk memberikan wewenang kepada tenaga medis untuk memberikan layanan klinis kepada pasien sesuai dengan kualifikasinya',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur menetapkan kewenangan klinis setelah mendapat rekomendasi dari Komite Medik termasuk kewenangan tambahan dengan mempertimbangan poin', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Ada bukti pemberian kewenangan klinis berdasar atas rekomendasi kewenangan klinis dari Komite Medik.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti pelaksanaan pemberian kewenangan tambahan setelah melakukan verifikasi dari sumber utama yang mengeluarkan ijazah/sertifikat.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Surat penugasan klinis dan rincian kewenangan klinis anggota tenaga medis dalam bentuk cetak atau elektronik (softcopy) atau media lain tersedia di semua unit pelayanan.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Setiap tenaga medis hanya memberikan pelayanan klinis sesuai kewenangan klinis yang diberikan kepadanya.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'KPS 12',
                deskripsi: 'Rumah sakit menerapkan evaluasi praktik profesional berkelanjutan (OPPE) tenaga medis secara seragam untuk menilai mutu dan keselamatan serta pelayanan pasien yang diberikan oleh setiap tenaga medis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan dan menerapkan proses penilaian kinerja untuk evaluasi mutu praktik profesional berkelanjutan, etik, dan disiplin (OPPE) tenaga medis', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Penilaian OPPE tenaga medis memuat 3 (tiga) area umum 1) – 3) dalam maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Penilaian OPPE juga meliputi peran tenaga medis dalam pencapaian target indikator mutu yang diukur di unit tempatnya bekerja.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Data dan informasi hasil pelayanan klinis dari tenaga medis dikaji secara objektif dan berdasar atas bukti, jika memungkinkan dilakukan benchmarking dengan pihak eksternal rumah sakit.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Data dan informasi hasil pemantauan kinerja tenaga medis sekurang-kurangnya setiap 12 (dua belas) bulan dilakukan oleh kepala unit, kepala kelompok tenaga medis, Subkomite Mutu Profesi Komite Medik dan pimpinan pelayanan medis. Hasil, simpulan, dan tindakan didokumentasikan di dalam file kredensial tenaga medis tersebut', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Jika terjadi kejadian insiden keselamatan pasien atau pelanggaran perilaku etik maka dilakukan tindakan terhadap tenaga medis tersebut secara adil (just culture) berdasarkan hasil analisisterkait kejadian tersebut.', bukti: ['D'] },
                    { kode: 'EP g', deskripsi: 'Bila ada temuan yang berdampak pada pemberian kewenangan tenaga medis, temuan tersebut didokumentasi ke dalam file tenaga medis dan diinformasikan serta disimpan di unit tempat tenaga medis memberikan pelayanan', bukti: ['D'] },
                ],
            },
            {
                kode: 'KPS 13',
                deskripsi: 'Rumah sakit paling sedikit setiap 3 (tiga) tahun melakukan rekredensial berdasarkan hasil penilaian praktik profesional berkelanjutan (OPPE) terhadap setiap semua tenaga medis rumah sakit untuk menentukan apabila tenaga medis dan kewenangan klinisnya dapat dilanjutkan dengan atau tanpa modifikasi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Berdasarkan penilaian praktik profesional berkelanjutan tenaga medis, rumah sakit menentukan sedikitnya setiap 3 (tiga) tahun, apakah kewenangan klinis tenaga medis dapat dilanjutkan dengan atau tanpa modifikasi (berkurang atau bertambah).' },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti terkini dalam berkas setiap tenaga medis untuk semua kredensial yang perlu diperbarui secara periodik.' },
                    { kode: 'EP c', deskripsi: 'Ada bukti pemberian kewenangan klinis tambahan didasarkan atas kredensial yang telah diverifikasi dari sumber Badan/Lembaga/Institusi penyelenggara pendidikan atau pelatihan. sesuai dengan peraturan perundang-undangan.' },
                ],
            },
            {
                kode: 'KPS 14',
                deskripsi: 'Rumah sakit mempunyai proses yang efektif untuk melakukan kredensial tenaga perawat dengan mengumpulkan, verifikasi pendidikan, registrasi, izin, kewenangan, pelatihan, dan pengalamannya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan dan menerapkan proses kredensial yang efektif terhadap tenaga perawat meliputi poin a) – c) dalam maksud dan tujuan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Tersedia bukti dokumentasi pendidikan, registrasi, sertifikasi, izin, pelatihan, dan pengalaman yang terbaharui di file tenaga perawat.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat pelaksanaan verifikasi ke sumber Badan/Lembaga/institusi penyelenggara pendidikan/ pelatihan yang seragam.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti dokumen kredensial yang dipelihara pada setiap tenaga perawat.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit menerapkan proses untuk memastikan bahwa kredensial perawat kontrak lengkap sebelum penugasan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KPS 15',
                deskripsi: 'Rumah sakit melakukan identifikasi tanggung jawab pekerjaan dan memberikan penugasan klinis berdasar atas hasil kredensial tenaga perawat sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan rincian kewenangan klinis perawat berdasar hasil kredensial terhadap perawat.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan Surat Penugasan Klinis tenaga perawat sesuai dengan peraturan perundang- undangan.', bukti: ['R'] },
                ],
            },
            {
                kode: 'KPS 16',
                deskripsi: 'Rumah sakit telah melakukan penilaian kinerja tenaga perawat termasuk perannya dalam kegiatan peningkatan mutu dan keselamatan pasien serta program manajemen risiko rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melakukan penilaian kinerja tenaga perawat secara periodik menggunakan format dan metode sesuai ketentuan yang ditetapkan rumah sakit.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Penilaian kinerja tenaga perawat meliputi pemenuhan uraian tugasnya dan perannya dalam pencapaian target indikator mutu yang diukur di unit tempatnya bekerja.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit dan kepala unit telah berlaku adil (just culture) ketika ada temuan dalam kegiatan peningkatan mutu, laporan insiden keselamatan pasien atau manajemen risiko.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah mendokumentasikan hasil kajian, tindakan yang diambil, dan setiap dampak atas tanggung jawab pekerjaan perawat dalam file kredensial perawat.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KPS 17',
                deskripsi: 'Rumah sakit mempunyai proses yang efektif untuk melakukan kredensial tenaga kesehatan lain dengan mengumpulkan dan memverifikasi pendidikan, registrasi, izin, kewenangan, pelatihan, dan pengalamannya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan dan menerapkan proses kredensial yang efektif terhadap tenaga Kesehatan lainnya meliputi poin a) – c) dalam maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Tersedia bukti dokumentasi pendidikan, registrasi, sertifikasi, izin, pelatihan, dan pengalaman yang terbaharui di file tenaga Kesehatan lainnya.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat pelaksanaan verifikasi ke sumber Badan/Lembaga/institusi penyelenggara Pendidikan/pelatihan yang seragam.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat dokumen kredensial yang dipelihara dari setiap tenaga kesehatan lainnya.', bukti: ['D'] },
                ],
            },
            {
                kode: 'KPS 18',
                deskripsi: 'Rumah sakit melakukan identifikasi tanggung jawab pekerjaan dan memberikan penugasan klinis berdasar atas hasil kredensial tenaga kesehatan lainnya sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan rincian kewenangan klinis profesional pemberi asuhan (PPA) lainnya dan staf klinis lainnya berdasar atas hasil kredensial tenaga Kesehatan lainnya.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan surat penugasan klinis kepada tenaga Kesehatan lainnya sesuai dengan peraturan perundang-undangan.', bukti: ['R'] },
                ],
            },
            {
                kode: 'KPS 19',
                deskripsi: 'Rumah sakit telah melakukan penilaian kinerja tenaga Kesehatan lainnya termasuk perannya dalam kegiatan peningkatan mutu dan keselamatan pasien serta program manajemen risiko rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melakukan penilaian kinerja tenaga Kesehatan lainnya secara periodik menggunakan format dan metode sesuai ketentuan yang ditetapkan rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Penilain kinerja tenaga Kesehatan lainnya meliputi pemenuhan uraian tugasnya dan perannya dalam pencapaian target indikator mutu yang diukur di unit tempatnya bekerja.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit dan kepala unit telah berlaku adil (just culture) ketika ada temuan dalam kegiatan peningkatan mutu, laporan insiden keselamatan pasien atau manajemen risiko.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah mendokumentasikan hasil kajian, tindakan yang diambil, dan setiap dampak atas tanggung jawab pekerjaan tenaga kesehatan dalam file kredensial tenaga kesehatan lainnya.', bukti: ['D'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'MFK',
        pokjaName: 'Manajemen Fasilitas dan Keselamatan',
        standarList: [
            {
                kode: 'MFK 1',
                deskripsi: 'Rumah sakit mematuhi persyaratan sesuai dengan peraturan perundang-undangan yang berkaitan dengan bangunan, prasarana dan peralatan medis rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi terkait Manajemen Fasilitas dan Keselamatan (MFK) yang meliputi poin a) – j) pada gambaran umum.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melengkapi izin-izin dan sertifikasi yang masih berlaku sesuai persyaratan peraturan perundang-undangan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit memenuhi perencanaan anggaran dan sumber daya serta memastikan rumah sakit memenuhi persyaratan perundang-undangan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Proteksi kebakaran: Melakukan penilaian risiko yang berkelanjutan untuk meningkatkan perlindungan seluruh aset, properti dan penghuni dari kebakaran dan asap.' },
                    { kode: 'EP e', deskripsi: 'Penanganan kedaruratan dan bencana: Risiko diidentifikasi dan respons terhadap epidemi, bencana, dan keadaan darurat direncanakan dan efektif termasuk evaluasi integritas struktural dan non struktural lingkungan pelayanan dan perawatan pasien.' },
                    { kode: 'EP f', deskripsi: 'Peralatan medis: Peralatan dipilih, dipelihara, dan digunakan dengan cara yang aman dan benar untuk mengurangi risiko.' },
                    { kode: 'EP g', deskripsi: 'Sistem utilitas: Listrik, air, gas medik dan sistem utilitas lainnya dipelihara untuk meminimalkan risiko kegagalan pengoperasian.' },
                    { kode: 'EP h', deskripsi: 'Konstruksi dan renovasi: Risiko terhadap pasien, staf, dan pengunjung diidentifikasi dan dinilai selama konstruksi, renovasi, pembongkaran, dan aktivitas pemeliharaan lainnya.' },
                    { kode: 'EP i', deskripsi: 'Pelatihan: Seluruh staf di rumah sakit dan para tenant/penyewa lahan dilatih dan memiliki pengetahuan tentang K3, termasuk penanggulangan kebakaran.' },
                    { kode: 'EP j', deskripsi: 'Pengawasan pada para tenant/penyewa lahan yang melakukan kegiatan di dalam area lingkungan rumah sakit. Penanggung jawab MFK menyusun Program Manajemen fasilitas dan keselamatan rumah sakit meliputi a) – j) setiap tahun. Dalam program tersebut termasuk melakukan pengkajian dan penanganan risiko pada keselamatan, keamanan, pengelolaan B3, proteksi kebakaran, penanganan kedaruratan dan bencana, peralatan medis dan sistim utilitas. Pengkajian dan penanganan risiko dimasukkan dalam daftar risiko man...' },
                ],
            },
            {
                kode: 'MFK 2',
                deskripsi: 'Rumah Sakit menetapkan penanggungjawab yang kompeten untuk mengawasi penerapan manajemen fasilitas dan keselamatan di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan Penanggungjawab MFK yang memiliki kompetensi dan pengalaman dalam melakukan pengelolaan pada fasilitas dan keselamatan di lingkungan rumah sakit.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Penanggungjawab MFK telah menyusun Program Manajemen Fasilitas dan Keselamatan (MFK) yang meliputi poin a) – j) dalam maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Penanggungjawab MFK telah melakukan pengawasan dan evaluasi Manajemen Fasilitas dan Keselamatan (MFK) setiap tahunnya meliputi poin a) – g) dalam maksud dan tujuan serta melakukan penyesuaian program apabila diperlukan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Penerapan program Manajemen Fasilitas dan Keselamatan (MFK) pada tenant/penyewa lahan yang berada di lingkungan rumah sakit meliputi poin a) – e) dalam maksud dan tujuan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MFK 3',
                deskripsi: 'Rumah sakit menerapkan Program Manajemen Fasilitas dan Keselamatan (MFK) terkait keselamatan di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses pengelolaan keselamatan rumah sakit meliputi poin a) - c) pada maksud dan tujuan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah mengintegrasikan program Kesehatan dan keselamatan kerja staf ke dalam program manajemen fasilitas dan keselamatan.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah membuat pengkajian risiko secara proaktif terkait keselamatan di rumah sakit setiap tahun yang didokumentasikan dalam daftar risiko/risk register.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah melakukan pemantauan risiko keselamatan dan dilaporkan setiap 6 (enam) bulan kepada piminan rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Menghindari terjadinya kehilangan, kerusakan, atau pengrusakan barang milik pribadi maupun rumah sakit.' },
                ],
            },
            {
                kode: 'MFK 4',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses pengelolaan keamanan dilingkungan rumah sakit meliputi poin a) -', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah membuat pengkajian risiko secara proaktif terkait keamanan di rumah sakit setiap tahun yang didokumentasikan dalam daftar risiko/risk register.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah membuat pengkajian risiko secara proaktif terkait keselamatan di rumah sakit. (Daftar risiko/risk register).', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah melakukan pemantauan risiko keamanan dan dilaporkan setiap 6 (enam) bulan kepada Direktur rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'pada maksud dan tujuan.' },
                    { kode: 'EP f', deskripsi: 'Kontainer bertekanan;' },
                    { kode: 'EP g', deskripsi: 'Benda tajam;' },
                    { kode: 'EP h', deskripsi: 'Genotoksik/sitotoksik; dan' },
                    { kode: 'EP i', deskripsi: 'Radioaktif. Proses pengelolaan bahan berbahaya beracun dan limbahnya di rumah sakit (merupakan bagian dari program Manajemen Fasilitas dan Keselamatan (MFK) pada standar MFK 1 meliputi:' },
                ],
            },
            {
                kode: 'MFK 5',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan pengelolaan Bahan Berbahaya dan Beracun (B3) serta limbah B3 sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan proses pengelolaan B3 meliputi poin a) – h) pada maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah membuat pengkajian risiko secara proaktif terkait pengelolaan B3 di rumah sakit setiap tahun yang didokumentasikan dalam daftar risiko/risk register.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Di area tertentu yang rawan terhadap pajanan telah dilengkapi dengan eye washer/body washer yang berfungsi dan terpelihara baik dan tersedia kit tumpahan/spill kit sesuai ketentuan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Staf dapat menjelaskan dan atau memperagakan penanganan tumpahan B3.', bukti: ['W'] },
                    { kode: 'EP e', deskripsi: 'Staf dapat menjelaskan dan atau memperagakan tindakan, kewaspadaan, prosedur dan partisipasi dalam penyimpanan, penanganan dan pembuangan limbah B3.', bukti: ['W', 'O', 'S'] },
                    { kode: 'EP f', deskripsi: 'Terlindungi dari sinar matahari, hujan, angin kencang, banjir, dan faktor lain yang berpotensi menimbulkan kecelakaan atau bencana kerja;' },
                    { kode: 'EP g', deskripsi: 'Terlindung dari hewan: kucing, serangga, burung, dan lain- lainnya;' },
                    { kode: 'EP h', deskripsi: 'Dilengkapi dengan ventilasi dan pencahayaan yang baik serta memadai;' },
                    { kode: 'EP i', deskripsi: 'Berjarak jauh dari tempat penyimpanan atau penyiapan makanan;' },
                    { kode: 'EP j', deskripsi: 'Peralatan pembersihan, alat pelindung diri/APD (antara lain masker, sarung tangan, penutup kepala, goggle, sepatu boot, serta pakaian pelindung) dan wadah atau kantong limbah harus diletakkan sedekat- dekatnya dengan lokasi fasilitas penyimpanan; dan' },
                    { kode: 'EP k', deskripsi: 'Dinding, lantai, dan juga langit-langit fasilitas penyimpanan senantiasa dalam keadaan bersih termasuk pembersihan lantai setiap hari. Untuk limbah berwujud cair dapat dilakukan di Instalasi Pengolahan Air Limbah (IPAL) dari fasilitas pelayanan kesehatan. Tujuan pengolahan limbah medis adalah mengubah karakteristik biologis dan/atau kimia limbah sehingga potensi bahayanya terhadap manusia berkurang atau tidak ada. Bila rumah sakit mengolah limbah B-3 sendiri maka wajib mempunyai izin mengolah li...' },
                ],
            },
            {
                kode: 'MFK 6',
                deskripsi: 'Rumah sakit menerapkan proses untuk pencegahan, penanggulangan bahaya kebakaran dan penyediaan sarana jalan keluar yang aman dari fasilitas sebagai respons terhadap kebakaran dan keadaan darurat lainnya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melakukan pengkajian risiko kebakaran secara proaktif meliputi poin a) – i) dalam maksud dan tujuan setiap tahun yang didokumentasikan dalam daftar risiko/risk register.', bukti: ['W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan proses proteksi kebakaran yang meliputi poin a) – f) pada maksud dan tujuan.', bukti: ['D', 'O'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit menetapkan kebijakan dan melakukan pemantauan larangan merokok di seluruh area rumah sakit.', bukti: ['R', 'O'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah melakukan pengkajian risiko proteksi kebakaran.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit memastikan semua staf memahami proses proteksi kebakaran termasuk melakukan pelatihan penggunaan APAR, hidran dan simulasi kebakaran setiap tahun.', bukti: ['D', 'S', 'W'] },
                    { kode: 'EP f', deskripsi: 'Peralatan pemadaman kebakaran aktif dan sistem peringatan dini serta proteksi kebakaran secara pasif telah diinventarisasi, diperiksa, di ujicoba dan dipelihara sesuai dengan peraturan perundang- undangan dan didokumentasikan.', bukti: ['D', 'O'] },
                ],
            },
            {
                kode: 'MFK 7',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan proses pengelolaan peralatan medik.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan proses pengelolaan peralatan medik yang digunakan di rumah sakit meliputi poin a) - e) pada maksud dan tujuan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menetapkan penanggung jawab yang kompeten dalam pengelolaan dan pengawasan peralatan medik di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melakukan pengkajian risiko peralatan medik secara proaktif setiap tahun yang didokumentasikan dalam daftar risiko/risk register.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti perbaikan yang dilakukan oleh pihak yang berwenang dan kompeten.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit telah menerapkan pemantauan, pemberitahuan kerusakan (malfungsi) dan penarikan (recall) peralatan medis yang membahayakan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Rumah sakit telah melaporkan insiden keselamatan pasien terkait peralatan medis sesuai dengan peraturan perundang-undangan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'MFK 8',
                deskripsi: 'Rumah sakit menetapkan dan melaksanakan proses untuk memastikan semua sistem utilitas (sistem pendukung) berfungsi efisien dan efektif yang meliputi pemeriksaan, pemeliharaan, dan perbaikan sistem utilitas.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan proses pengelolaan sistem utilitas yang meliputi poin a) - e ) dalam maksud dan tujuan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melakukan pengkajian risiko sistim utilitas dan komponen kritikalnya secara proaktif setiap tahun yang didokumentasikan dalam daftar risiko/risk register.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'MFK 8.1',
                deskripsi: 'Dilakukan pemeriksaan, pemeliharaan, dan perbaikan sistem utilitas.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses inventarisasi sistim utilitas dan komponen kritikalnya setiap tahun.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Sistem utilitas dan komponen kritikalnya telah diinspeksi secara berkala berdasarkan ketentuan rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Sistem utilitas dan komponen kritikalnya diuji secara berkala berdasar atas kriteria yang sudah ditetapkan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Sistem utilitas dan komponen kritikalnya dipelihara berdasar atas kriteria yang sudah ditetapkan.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Sistem utilitas dan komponen kritikalnya diperbaiki bila diperlukan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'MFK 8.2',
                deskripsi: 'Sistem utilitas rumah sakit menjamin tersedianya air bersih dan listrik sepanjang waktu serta menyediakan sumber cadangan/alternatif persediaan air dan tenaga listrik jika terjadi terputusnya sistem, kontaminasi, atau kegagalan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit mempunyai proses sistem utilitas terhadap keadaan darurat yang meliputi poin a)-c ) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Air bersih harus tersedia selama 24 jam setiap hari, 7 (tujuh) hari dalam seminggu.', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Listrik tersedia 24 jam setiap hari, 7 (tujuh) hari dalam seminggu.', bukti: ['O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit mengidentifikasi area dan pelayanan yang berisiko paling tinggi bila terjadi kegagalan listrik atau air bersih terkontaminasi atau terganggu dan melakukan penanganan untuk mengurangi risiko.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit mempunyai sumber listrik dan air bersih cadangan dalam keadaan darurat/emergensi.', bukti: ['D', 'O'] },
                ],
            },
            {
                kode: 'MFK 8.2.1',
                deskripsi: 'Rumah sakit melakukan uji coba/uji beban sumber listrik dan sumber air cadangan/alternatif.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit melaksanakan uji coba sumber air bersih dan listrik cadangan/alternatif sekurangnya 6 (enam) bulan sekali atau lebih sering bila diharuskan oleh peraturan perundang-undanganan yang berlaku atau oleh kondisi sumber air.', bukti: ['D', 'O', 'W', 'S'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit mendokumentasi hasil uji coba sumber air bersih cadangan/alternatif tersebut.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit mendokumentasikan hasil uji sumber listrik/cadangan/alternatif tersebut.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit mempunyai tempat dan jumlah bahan bakar untuk sumber listrik cadangan/alternatif yang mencukupi.', bukti: ['O', 'W'] },
                ],
            },
            {
                kode: 'MFK 8.3',
                deskripsi: 'Rumah sakit melakukan pemeriksaan air bersih dan air limbah secara berkala sesuai dengan peraturan dan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan proses sekurang- kurangnya meliputi poin a) - d) pada maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melakukan pemantauan dan evaluasi proses pada EP 1.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah menindaklanjuti hasil pemantauan dan evaluasi pada EP 2 dan didokumentasikan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Menentukan strategi komunikasi pada waktu kejadian;' },
                    { kode: 'EP e', deskripsi: 'Mengelola sumber daya selama kejadian termasuk sumber- sumber alternatif;' },
                    { kode: 'EP f', deskripsi: 'Mengelola kegiatan klinis selam kejadian termasuk tempat pelayanan alternatif pada waktu kejadian;' },
                    { kode: 'EP g', deskripsi: 'Mengidentifikasi dan penetapan peran serta tanggung jawab staf selama kejadian dan; dan' },
                    { kode: 'EP h', deskripsi: 'Proses mengelola keadaan darurat ketika terjadi konflik antara tanggung jawab pribadi staf dan tanggung jawab rumah sakit untuk tetap menyediakan pelayanan pasien termasuk kesehatan mental dari staf. Rumah sakit yang aman adalah rumah sakit yang fasilitas layananny tetapdapatdiaksesdanberfungsipada kapasitas maksimum, serta dengan infrastruktur yang sama sebelum selama dan segera setelah dampak keadaan darurat dan bencana. Fungsi rumah sakit yang terus berlanjut bergantung pada berbagai faktor t...' },
                ],
            },
            {
                kode: 'MFK 9',
                deskripsi: 'Rumah sakit menerapkan proses penanganan bencana untuk menanggapi bencana yang berpotensi terjadi di wilayah rumah sakitnya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses pengelolaan bencana yang meliputi poin a) – h) pada maksud dan tujuan di atas.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah mengidentifikasi risiko bencana internal dan eksternal dalam analisis kerentanan bahaya/Hazard Vulnerability Analysis (HVA) secara proaktif setiap tahun dan diintegrasikan ke dalam daftar risiko/risk register dan profil risiko.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit membuat program pengelolaan bencana di rumah sakit berdasarkan hasil analisis kerentanan bahaya/Hazard Vulnerability Analysis (HVA) setiap tahun.', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah melakukan simulasi penanggulangan bencana (disaster drill) minimal setahun sekali termasuk debriefing.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Staf dapat menjelaskan dan atau memperagakan prosedur dan peran mereka dalam penanganan kedaruratan serta bencana internal dan external', bukti: ['W', 'S'] },
                    { kode: 'EP f', deskripsi: 'Rumah sakit telah menyiapkan area dekontaminasi sesuai ketentuan pada instalasi gawat darurat.', bukti: ['O'] },
                    { kode: 'EP g', deskripsi: 'Keselamatan kebakaran;' },
                    { kode: 'EP h', deskripsi: 'Keamanan;' },
                    { kode: 'EP i', deskripsi: 'Prosedur darurat, termasuk jalur/keluar alternatif dan akses ke layanan darurat; dan' },
                    { kode: 'EP j', deskripsi: 'Bahaya lain yang mempengaruhi perawatan, pengobatan, dan layanan. Selain itu, rumah sakit memastikan bahwa kepatuhan kontraktor dipantau, ditegakkan, dan didokumentasikan. Sebagai bagian dari penilaian risiko, risiko infeksi pasien dari konstruksi dievaluasi melalui penilaian risiko pengendalian infeksi, juga dikenal sebagai ICRA. Setiap ada kontruksi, renovasi dan demolisi harus dilakukan penilaian risiko prakontruksi termasuk dengan rencana/pelaksanaan pengurangan risiko dampak keselamatan ser...' },
                ],
            },
            {
                kode: 'MFK 10',
                deskripsi: 'Rumah sakit melakukan penilaian risiko prakontruksi/Pre Contruction Risk Assessment (PCRA) pada waktu merencanakan pembangunan baru (proyek konstruksi), renovasi dan pembongkaran.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan penilaian risiko prakonstruksi (PCRA) terkait rencana konstruksi, renovasi dan demolisi meliputi poin a) - j) seperti di maksud dan tujuan diatas.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit melakukan penilaian risiko prakontruksi (PCRA) bila ada rencana kontruksi, renovasi dan demolisi.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit melakukan tindakan berdasarkan hasil penilaian risiko untuk meminimalkan risiko selama pembongkaran, konstruksi, dan renovasi.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memastikan bahwa kepatuhan kontraktor dipantau, dilaksanakan, dan didokumentasikan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MFK 11',
                deskripsi: 'Seluruh staf di rumah sakit dan yang lainnya telah dilatih dan memiliki pengetahuan tentang pengelolaan fasilitas rumah sakit, program keselamatan dan peran mereka dalam memastikan keamanan dan keselamatan fasilitas secara efektif.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Semua staf telah diberikan pelatihan program manajemen fasilitas dan keselamatan (MFK) terkait keselamatan setiap tahun dan dapat menjelaskan dan/atau menunjukkan peran dan tanggung jawabnya dan didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Semua staf telah diberikan pelatihan program manajemen fasilitas dan keselamatan (MFK) terkait keamanan setiap tahun dan dapat menjelaskan dan/atau menunjukkan peran dan tanggung jawabnya dan didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Semua staf telah diberikan pelatihan program manajemen fasilitas dan keselamatan (MFK) terkait pengelolaan B3 dan limbahnya setiap tahun dan dapat menjelaskan dan/atau menunjukkan peran dan tanggung jawabnya dan didokumentasikan.', bukti: ['D', 'W', 'S'] },
                    { kode: 'EP d', deskripsi: 'Semua staf telah diberikan pelatihan program manajemen fasilitas dan keselamatan (MFK) terkait proteksi kebakaran setiap tahun dan dapat menjelaskan dan/atau menunjukkan peran dan tanggung jawabnya dan didokumentasikan.', bukti: ['D', 'W', 'S'] },
                    { kode: 'EP e', deskripsi: 'Semua staf telah diberikan pelatihan program manajemen fasilitas dan keselamatan (MFK) terkait peralatan medis setiap tahun dan dapat menjelaskan dan/atau menunjukkan peran dan tanggung jawabnya dan didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Semua staf telah diberikan pelatihan program manajemen fasilitas dan keselamatan (MFK) terkait sistim utilitas setiap tahun dan dapat menjelaskan dan/atau menunjukkan peran dan tanggung jawabnya dan didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP g', deskripsi: 'Semua staf telah diberikan pelatihan program manajemen fasilitas dan keselamatan (MFK) terkait penanganan bencana setiap tahun dan dapat menjelaskan dan/atau menunjukkan peran dan tanggung jawabnya dan didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP h', deskripsi: 'Pelatihan tentang pengelolaan fasilitas dan program keselamatan mencakup vendor, pekerja kontrak, relawan, pelajar, peserta didik, peserta pelatihan, dan lainnya, sebagaimana berlaku untuk peran dan tanggung jawab individu, dan sebagaimana ditentukan oleh rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP i', deskripsi: 'Mengkomunikasikan hasil pengukuran mutu meliputi masalah mutu dan capaian data kepada staf. Hal-hal penting yang perlu dilakukan agar program peningkatan mutu dan keselamatan pasien dapat diterapkan secara menyeluruh di unit pelayanan, meliputi:' },
                ],
            },
            {
                kode: 'MFK 5.1',
                deskripsi: 'Rumah sakit mempunyai sistem pengelolaan limbah B3 cair dan padat sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit melakukan penyimpanan limbah B3 sesuai poin a) – k) pada maksud dan tujuan.', bukti: ['W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit mengolah limbah B3 padat secara mandiri atau menggunakan pihak ketiga yang berizin termasuk untuk pemusnahan limbah B3 cair yang tidak bisa dibuang ke IPAL.', bukti: ['D', 'O'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit mengelola limbah B3 cair sesuai peraturan perundang-undangan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pintu keluar darurat kebakaran (emergency exit).' },
                    { kode: 'EP e', deskripsi: 'Dapur termasuk peralatan memasak penghasil minyak.' },
                    { kode: 'EP f', deskripsi: 'Sistem dan peralatan listrik darurat/alternatif serta jalur kabel dan instalasi listrik.' },
                    { kode: 'EP g', deskripsi: 'Penyimpanan dan penanganan bahan yang berpotensi mudah terbakar (misalnya, cairan dan gas mudah terbakar, gas medis yang mengoksidasi seperti oksigen dan dinitrogen oksida), ruang penyimpanan oksigen dan komponennya dan vakum medis.' },
                    { kode: 'EP h', deskripsi: 'Prosedur dan tindakan untuk mencegah dan mengelola kebakaran akibat pembedahan.' },
                    { kode: 'EP i', deskripsi: 'Bahaya kebakaran terkait dengan proyek konstruksi, renovasi, atau pembongkaran. Berdasarkan hasil pengkajian risiko kebakaran, rumah sakit menerapkan proses proteksi kebakaran (yang merupakan bagian dari Manajemen Fasilitas dan Keamanan (MFK) pada standar MFK 1 untuk:' },
                ],
            },
        ],
    },
    {
        pokjaCode: 'MRMIK',
        pokjaName: 'Manajemen Rekam Medis dan Informasi Kesehatan',
        standarList: [
            {
                kode: 'MRMIK 1',
                deskripsi: 'Rumah sakit menetapkan proses manajemen informasi untuk memenuhi kebutuhan informasi internal maupun eksternal.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi pengelolaan informasi untuk memenuhi kebutuhan informasi sesuai poin a) – g) yang terdapat dalam gambaran umum.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti rumah sakit telah menerapkan proses pengelolaan informasi untuk memenuhi kebutuhan PPA, pimpinan rumah sakit, kepala departemen/unit layanan dan badan/individu dari luar rumah sakit.', bukti: ['D', 'O'] },
                    { kode: 'EP c', deskripsi: 'Proses yang diterapkan sesuai dengan ukuran rumah sakit, kompleksitas layanan, ketersediaan staf terlatih, sumber daya teknis, dan sumber daya lainnya.', bukti: ['D', 'O'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit melakukan pemantauan dan evaluasi secara berkala sesuai ketentuan rumah sakit serta upaya perbaikan terhadap pemenuhan informasi internal dan eksternal dalam mendukung asuhan, pelayanan, dan mutu serta keselamatan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Apabila terdapat program penelitian dan atau pendidikan Kesehatan di rumah sakit, terdapat bukti bahwa data dan informasi yang mendukung asuhan pasien, pendidikan, serta riset telah tersedia tepat waktu dari sumber data terkini.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Pemantauan dan evaluasi untuk mengkaji dan meningkatkan proses kerja serta perawatan. Semua staf dilatih sesuai tanggung jawab, uraian tugas, serta kebutuhan data dan informasi. Dalam penyelenggaraan rekam medis elektronik di rumah sakit harus dipastikan bahwa staf dapat mengakses, meninjau, dan/atau mendokumentasikan rekam medis pasien sesuai dengan hak akses yang diberikan oleh Direktur rumah sakit, dan staf dimaksud telah mendapatkan pelatihan untuk menggunakan sistem rekam medis elektronik s...' },
                    { kode: 'EP g', deskripsi: 'yang terdapat dalam gambaran umum' },
                ],
            },
            {
                kode: 'MRMIK 2',
                deskripsi: 'Seluruh komponen dalam rumah sakit termasuk pimpinan rumah sakit, PPA, kepala unit klinis/non klinis dan staf dilatih mengenai prinsip manajemen dan penggunaan informasi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti PPA, pimpinan rumah sakit, kepala departemen, unit layanan dan staf telah dilatih tentang prinsip pengelolaan dan penggunaan sistem informasi termasuk rekam medis elektronik sesuai dengan peran dan tanggung jawab mereka.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti bahwa data dan informasi klinis serta non klinis diintegrasikan dan terkoneksi dengan system informasi secara nasional sesuai kebutuhan dan digunakan dalam mendukung proses pengambilan keputusan sesuai dengan peraturan perundang- undangan.', bukti: ['D', 'O'] },
                ],
            },
            {
                kode: 'MRMIK 2.1',
                deskripsi: 'Rumah sakit menjaga keamanan, kerahasiaan, keutuhan, dan ketersediaan data dan informasi termasuk data Rekam Medis elektronik melalui proses untuk mengelola dan mengontrol akses.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses untuk memastikan kerahasiaan, keamanan, dan integritas data dan informasi sesuai dengan peraturan perundangan.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan proses pemberian akses kepada staf yang berwenang untuk mengakses data dan informasi, termasuk entry ke dalam rekam medis pasien.', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memantau kepatuhan terhadap proses ini dan mengambil tindakan ketika terjadi terjadi pelanggaran terhadap kerahasiaan, keamanan, atau integritas data.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MRMIK 2.2',
                deskripsi: 'Rumah sakit menjaga kerahasiaan, keamanan, privasi, integritas data dan informasi melalui proses yang melindungi data dan informasi dari kehilangan, pencurian, kerusakan, dan penghancuran.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Data dan informasi yang disimpan terlindung dari kehilangan, pencurian, kerusakan, dan penghancuran.', bukti: ['O'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan pemantauan dan evaluasi terhadap keamanan data dan informasi.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat bukti rumah sakit telah melakukan tindakan perbaikan untuk meningkatkan keamanan data dan informasi.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Bagaimana mengidentifikasi adanya perubahan dalam dokumen' },
                    { kode: 'EP e', deskripsi: 'Pemeliharaan identitas dan keterbacaan dokumen' },
                    { kode: 'EP f', deskripsi: 'Proses pengelolaan dokumen yang berasal dari luar rumah sakit' },
                    { kode: 'EP g', deskripsi: 'Penyimpanan dokumen lama yang sudah tidak terpakai (obsolete) setidaknya selama waktu yang ditentukan oleh peraturan perundangan, sekaligus memastikan bahwa dokumen tersebut tidak akan salah digunakan' },
                    { kode: 'EP h', deskripsi: 'Identifikasi dan pelacakan semua dokumen yang beredar (misalnya, diidentifikasi berdasarkan judul, tanggal terbit, edisi dan/atau tanggal revisi terbaru, jumlah halaman, dan nama orang yang mensahkan pada saat penerbitan dan revisi dan/atau meninjau dokumen tersebut) Proses-proses tersebut diterapkan dalam menyusun serta memelihara dokumen termasuk kebijakan, prosedur, dan program kerja. Dokumen internal rumah sakit terdiri dari regulasi dan dokumen pelaksanaan. Terdapat beberapa tingkat dokumen...' },
                ],
            },
            {
                kode: 'MRMIK 3',
                deskripsi: 'Rumah Sakit menerapkan proses pengelolaan dokumen, termasuk kebijakan, pedoman, prosedur, dan program kerja secara konsisten dan seragam.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan pengelolaan dokumen sesuai dengan butir a) – h) dalam maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki dan menerapkan format yang seragam untuk semua dokumen sejenis sesuai dengan ketentuan rumah sakit.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah memiliki dokumen internal mencakup butir a) – c) dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Menyediakan laporan dengan frekuensi yang dibutuhkan oleh staf atau rumah sakit;' },
                    { kode: 'EP e', deskripsi: 'Menyediakan data dan informasi dalam format yang memudahkan penggunaannya;' },
                    { kode: 'EP f', deskripsi: 'Menghubungkan sumber data dan informasi; dan' },
                    { kode: 'EP g', deskripsi: 'Menginterpretasi atau mengklarifikasi data.' },
                ],
            },
            {
                kode: 'MRMIK 4',
                deskripsi: 'Kebutuhan data dan informasi dari pihak dalam dan luar rumah sakit dipenuhi secara tepat waktu dalam format yang memenuhi harapan pengguna dan dengan frekuensi yang diinginkan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti bahwa penyebaran data dan informasi memenuhi kebutuhan internal dan eksternal rumah sakit sesuai dengan yang tercantum dalam maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat proses yang memastikan bahwa data dan informasi yang dibutuhkan untuk perawatan pasien telah diterima tepat waktu dan sesuai format yang seragam dan sesuai dengan kebutuhan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MRMIK 5',
                deskripsi: 'Rumah sakit menetapkan penyelenggaraan dan pengelolaan rekam medis elektronik terkait asuhan pasien sesuai dengan ketentuan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi tentang penyelenggaraan rekam medis elektronik di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menetapkan unit penyelenggara rekam medis dan minimal 1 (satu) orang yang kompeten mengelola rekam medis.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah Sakit menerapkan penyelenggaraan Rekam Medis yang dilakukan sejak pasien masuk sampai pasien pulang, dirujuk, atau meninggal.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Pengelolaan rekam medis yang menjamin keamanan dan kerahasiaannya, melalui penjaminan mutu secara berkala yang dilakukan oleh tim reviu yang ditetapkan oleh pimpinan rumah sakit.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MRMIK 6',
                deskripsi: 'Setiap pasien memiliki rekam medis yang terstandar dalam format yang seragam dan selalu diperbaharui (terkini) dan diisi sesuai dengan ketetapan rumah sakit dalam tatacara pengisian rekam medis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti bahwa setiap pasien memiliki rekam medik dengan satu nomor RM sesuai sistem penomoran yang ditetapkan.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rekam medis rawat jalan, rawat inap, gawat darurat dan pemeriksaan penunjang disusun dan diisi sesuai ketetapan rumah sakit.', bukti: ['D', 'O'] },
                    { kode: 'EP c', deskripsi: 'Terdapat bukti bahwa formulir rekam medis dievaluasi dan diperbaharui (terkini) sesuai dengan kebutuhan dan secara periodik.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Mendokumentasikan hasil pemeriksaan dan hasil pengobatan;' },
                    { kode: 'EP e', deskripsi: 'Memuat ringkasan pasien pulang (discharge summary); dan' },
                    { kode: 'EP f', deskripsi: 'Meningkatkan kesinambungan pelayanan diantara Profesional Pemberi Asuhan (PPA).' },
                ],
            },
            {
                kode: 'MRMIK 7',
                deskripsi: 'Rumah sakit menetapkan informasi yang akan dimuat pada rekam medis pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti rekam medis pasien telah berisi informasi yang sesuai dengan ketetapan rumah sakit dan peraturan perundangan yang berlaku.', bukti: ['D', 'O'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti rekam medis pasien mengandung informasi yang memadai sesuai butir a) – f) pada maksud dan tujuan.', bukti: ['D', 'O'] },
                ],
            },
            {
                kode: 'MRMIK 8',
                deskripsi: 'Setiap catatan (entry) pada rekam medis pasien mencantumkan identitas Profesional Pemberi Asuhan (PPA) yang menulis dan kapan catatan tersebut ditulis di dalam rekam medis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'PPA mencantumkan identitas secara jelas pada saat mengisi RM.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Tanggal dan waktu penulisan setiap catatan dalam rekam medis pasien dapat diidentifikasi.', bukti: ['D', 'O'] },
                    { kode: 'EP c', deskripsi: 'Terdapat prosedur koreksi penulisan dalam pengisian RM elektronik', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Telah dilakukan pemantauan dan evaluasi terhadap penulisan identitas, tanggal dan waktu penulisan catatan pada rekam medis pasien serta koreksi penulisan catatan dalam rekam medis, dan hasil evaluasi yang ada telah digunakan sebagai dasar upaya perbaikan di rumah sakit.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'MRMIK 9',
                deskripsi: 'Rumah sakit menggunakan kode diagnosis, kode prosedur, penggunaan simbol dan singkatan baku yang seragam dan terstandar.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Penggunaan kode diagnosis, kode prosedur, singkatan dan simbol sesuai dengan ketetapan rumah sakit.', bukti: ['R', 'O'] },
                    { kode: 'EP b', deskripsi: 'Dilakukan evaluasi secara berkala penggunaan kode diagnosis, kode prosedur, singkatan dan simbol yang berlaku di rumah sakit dan hasilnya digunakan sebagai upaya tindak lanjut untuk perbaikan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MRMIK 10',
                deskripsi: 'Rumah sakit menjamin keamanan, kerahasiaan dan kepemilikan rekam medis serta privasi pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menentukan otoritas pengisian rekam medis termasuk isi dan format rekam medis.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah Sakit menentukan hak akses dalam pelepasan informasi rekam medis', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit menjamin otentifikasi, keamanan dan kerahasiaan data rekam medis sebagai bagian dari hak pasien.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MRMIK 11',
                deskripsi: 'Rumah sakit mengatur lama penyimpanan rekam medis, data, dan informasi pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit memiliki regulasi jangka waktu penyimpanan berkas rekam medis, serta data dan informasi lainnya terkait dengan pasien dan prosedur pemusnahannya sesuai dengan peraturan perundangan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Dokumen, data dan/informasi terkait pasien dimusnahkan setelah melampaui periode waktu penyimpanan sesuai dengan peraturan perundang- undangan dengan prosedur yang tidak membahayakan keamanan dan kerahasiaan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Dokumen, data dan/atau informasi tertentu terkait pasien yang bernilai guna, disimpan abadi (permanen) sesuai dengan ketetapan rumah sakit.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MRMIK 12',
                deskripsi: 'Dalam upaya perbaikan kinerja, rumah sakit secara teratur melakukan evaluasi atau pengkajian rekam medis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan komite/tim rekam medis.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Komite/tim secara berkala melakukan pengkajian rekam medis pasien secara berkala setiap tahun dan menggunakan sampel yang mewakili (rekam medis pasien yang masih dirawat dan pasien yang sudah pulang).', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Fokus pengkajian paling sedikit mencakup pada ketepatan waktu, keterbacaan, kelengkapan rekam medis dan isi rekam medis sesuai dengan peraturan perundangan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Hasil pengkajian yang dilakukan oleh komite/tim rekam medis dilaporkan kepada pimpinan rumah sakit dan dibuat upaya perbaikan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'MRMIK 13',
                deskripsi: 'Rumah sakit menerapkan sistem teknologi informasi kesehatan di pelayanan kesehatan untuk mengelola data dan informasi klinis serta non klinis sesuai peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang penyelenggaraan teknologi informasi kesehatan', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan SIMRS sesuai dengan ketetapan dan peraturan perundangan yang berlaku.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit menetapkan unit yang bertanggung jawab sebagai penyelenggara SIMRS dan dipimpim oleh staf kompeten.', bukti: ['R', 'W'] },
                    { kode: 'EP d', deskripsi: 'Data serta informasi klinis dan non klinis diintegrasikan sesuai dengan kebutuhan untuk mendukung pengambilan keputusan', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit telah menerapkan proses untuk menilai efektifitas sistem rekam medis elektronik dan melakukan upaya perbaikan terkait hasil penilaian yang ada.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'MRMIK 13.1',
                deskripsi: 'Rumah sakit mengembangkan, memelihara, dan menguji program untuk mengatasi waktu henti (downtime) dari sistem data, baik yang terencana maupun yang tidak terencana.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat prosedur yang harus dilakukan jika terjadi waktu henti sistem data (down time) untuk mengatasi masalah pelayanan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Staf dilatih dan memahami perannya di dalam prosedur penanganan waktu henti sistem data (down time), baik yang terencana maupun yang tidak terencana.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit melakukan evaluasi pasca terjadinya waktu henti sistem data (down time) dan menggunakan informasi dari data tersebut untuk persiapan dan perbaikan apabila terjadi waktu henti (down time) berikutnya.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Berkomunikasi dengan semua unit untuk memastikan bahwa program berkelanjutan dan proaktif. Hasil koordinasi didokumentasikan untuk meninjau efektivitas koordinasi program dan untuk memantau adanya perbaikan progresif. Rumah sakit menetapkan perawat PPI/IPCN (perawat pencegah dan pengendali infeksi) yaitu perawat yang bekerja penuh waktu) dan IPCLN (perawat penghubung pencegah dan pengendali infeksi) berdasarkan jumlah dan kualifikasinya sesuai dengan ukuran rumah sakit, kompleksitas kegiatan, ti...' },
                    { kode: 'EP e', deskripsi: 'Sarana penunjang lainnya untuk menunjang kegiatan PPI yang dapat mempermudah kegiatan PPI. Informasi dan data kegiatan PPI akan dintegrasikan ke Komite/ Tim Penyelenggara Mutu untuk peningkatan mutu dan keselamatan pasien rumah sakit oleh Komite / tim PPI setiap bulan.' },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PAB',
        pokjaName: 'Pelayanan Anestesi dan Bedah',
        standarList: [
            {
                kode: 'PAB 1',
                deskripsi: 'Rumah sakit menerapkan pelayanan anestesi, sedasi moderat dan dalam untuk memenuhi kebutuhan pasien sesuai dengan kapasitas pelayanan, standar profesi dan perundang undangan yang berlaku.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi pelayanan anestesi dan sedasi dan pembedahan meliputi poin a) –', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Pelayanan anestesi dan sedasi yang telah diberikan dapat memenuhi kebutuhan pasien.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'pada gambaran umum.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Memantau dan mengevaluasi pelayanan sedasi dan anestesi.' },
                ],
            },
            {
                kode: 'PAB 2',
                deskripsi: 'Rumah sakit menetapkan penanggung jawab pelayanan anestesi, sedasi moderat dan dalam adalah seorang dokter anastesi yang kompeten.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pelayanan anestesi dan sedasi secara seragam di seluruh area seusai regulasi yang ditetapkan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan penanggung jawab pelayanan anestesi dan sedasi adalah seorang dokter anastesi yang kompeten yang melaksanakan tanggung jawabnya meliputi poin a) – d) pada maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Bila memerlukan profesional pemberi asuhan terdapat PPA dari luar rumah sakit untuk memberikan pelayanan anestesi dan sedasi, maka ada bukti rekomendasi dan evaluasi pelayanan dari penanggung jawab pelayanan anastesi dan sedasi terhadap PPA tersebut.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Perbedaan populasi anak, dewasa, dan geriatri ataupun pertimbangan khusus lainnya;' },
                    { kode: 'EP e', deskripsi: 'Peralatan medis dan bahan yang digunakan sesuai dengan populasi yang diberikan sedasi moderat atau dalam; dan' },
                    { kode: 'EP f', deskripsi: 'Cara memantau.' },
                ],
            },
            {
                kode: 'PAB 3',
                deskripsi: 'Pemberian sedasi moderat dan dalam dilakukan sesuai dengan regulasi dan ditetapkan rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan pemberian sedasi moderat dan dalam yang seragam di semua tempat di rumah sakit sesuai dengan poin a) - f) pada maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Peralatan dan perbekalan gawat darurat tersedia di tempat dilakukan sedasi moderat dan dalam serta dipergunakan sesuai jenis sedasi, usia, dan kondisi pasien.', bukti: ['D', 'O'] },
                    { kode: 'EP c', deskripsi: 'PPA yang terlatih dan berpengalaman dalam memberikan bantuan hidup lanjut (advance) harus selalu mendampingi dan siaga selama tindakan sedasi dikerjakan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Bertindak jika ada komplikasi. Tenaga medis yang melakukan prosedur sedasi harus mampu bertanggung jawab melakukan pemantauan terhadap pasien. PPA yang kompeten melakukan prosedur sedasi, seperti dokter spesialis anestesi atau perawat yang terlatih yang bertanggung jawab melakukan pemantauan berkesinambungan terhadap parameter fisiologis pasien dan membantu tindakan resusitasi. PPA yang bertanggung jawab melakukan pemantauan harus kompeten dalam:' },
                ],
            },
            {
                kode: 'PAB 3.1',
                deskripsi: 'Tenaga medis yang kompeten dan berwenang memberikan pelayanan sedasi moderat dan dalam serta melaksanakan pemantauan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Tenaga medis yang diberikan kewenangan klinis memberikan sedasi moderat dan dalam harus kompeten dalam poin a) – d) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Profesional pemberi asuhan (PPA) yang bertanggung jawab melakukan pemantauan selama pelayanan sedasi moderat dan dalam harus kompeten meliputi poin a) – d) pada maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Kompetensi semua PPA yang terlibat dalam sedasi moderat dan dalam tercatat di file kepegawaian.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'pada maksud dan tujuan (masukkan dalam Pedoman pelayanan Anestesi dan sedasi, lihat standar 1 elemen a) 2. SPK-RKK dokter spesialis anestesi.' },
                    { kode: 'EP e', deskripsi: 'Penyimpulkan temuan hasil pemantauan pasien selama prosedur sedasi dan pemulihan. Cakupan dan isi pengkajian dibuat berdasar atas Panduan Praktik Klinis dan kebijakan pelayanan anastesi dan sedasi yang ditetapkan oleh rumah sakit. Pasien yang sedang menjalani tindakan sedasi dipantau tingkat kesadarannya, ventilasi dan status oksigenasi, variabel hemodinamik berdasar atas jenis obat sedasi yang diberikan, jangka waktu sedasi, jenis kelamin, dan kondisi pasien. Perhatian khusus ditujukan pada kem...' },
                ],
            },
            {
                kode: 'PAB 3.2',
                deskripsi: 'Rumah sakit menetapkan panduan praktik klinis untuk pelayanan sedasi moderat dan dalam',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pengkajian prasedasi dan dicatat dalam rekam medis meliputi poin a) – e) pada maksud dan tujuan.' },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapakn pemantauan pasien selama dilakukan pelayanan sedasi moderat dan dalam oleh PPA yang kompeten dan di catat di rekam medik.' },
                    { kode: 'EP c', deskripsi: 'Kriteria pemulihan telah digunakan dan didokumentasikan untuk mengidentifikasi pasien yang sudah pulih kembali dan atau siap untuk ditransfer/dipulangkan.' },
                    { kode: 'EP d', deskripsi: 'Menafsirkan temuan pada waktu pemantauan selama anestesi dan pemulihan; dan' },
                    { kode: 'EP e', deskripsi: 'Memberikan informasi obat analgesia yang akan digunakan pascaoperasi. Dokter spesialis anestesi akan melakukan pengkajian pra- anestesi yang dapat dilakukan sebelum masuk rawat inap atau sebelum dilakukan tindakan bedah atau sesaat menjelang operasi, misalnya pada pasien darurat. Asesmen prainduksi terpisah dari asesmen pra-anestesi, karena difokuskan pada stabilitas fisiologis dan kesiapan pasien untuk tindakan anestesi, dan berlangsung sesaat sebelum induksi anestesi. Jika anestesi diberikan s...' },
                ],
            },
            {
                kode: 'PAB 4',
                deskripsi: 'Profesional pemberi asuhan (PPA) yang kompeten dan telah diberikan kewenangan klinis pelayanan anestesi melakukan asesmen pra-anestesi dan prainduksi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pengkajian pra-anestesi telah dilakukan untuk setiap pasien yang akan dilakukan anestesi.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Pengkajian prainduksi telah dilakukan secara terpisah untuk mengevaluasi ulang pasien segera sebelum induksi anestesi.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Kedua pengkajian tersebut telah dilakukan oleh PPA yang kompeten dan telah diberikan kewenangan klinis didokumentasikan dalam rekam medis pasien.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PAB 5',
                deskripsi: 'Risiko, manfaat, dan alternatif tindakan sedasi atau anestesi didiskusikan dengan pasien dan keluarga atau orang yang dapat membuat keputusan mewakili pasien sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pemberian informasi kepada pasien dan atau keluarga atau pihak yang akan memberikan keputusan tentang jenis, risiko, manfaat, alternatif dan analagsia pasca tindakan sedasi atau anastesi.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pemberian informasi dilakukan oleh dokter spesialis dengan kompetensi di bidang tata laksana anastesi dan didokumentasikan dalam formulir persetujuan tindakan anastesi/sedasi.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PAB 6',
                deskripsi: 'Status fisiologis setiap pasien selama tindakan sedasi atau anestesi dipantau sesuai dengan panduan praktik klinis (PPK) dan didokumentasikan dalam rekam medis pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Frekuensi dan jenis pemantauan selama tindakan anestesi dan pembedahan didasarkan pada status praanestesi pasien, anestesi yang digunakan, serta prosedur pembedahan yang dilakukan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pemantauan status fisiologis pasien sesuai dengan panduan praktik klinis (PPK) dan didokumentasikan dalam rekam medis pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pasien dipindahkan ke unit yang mampu menyediakan perawatan pascaanestesi misalnya di unit perawatan intensif. Waktu masuk dan keluar dari ruang pemulihan (atau waktu mulai dan dihentikannya pemantauan pemulihan) didokumentasikan dalam rekam medis pasien.' },
                ],
            },
            {
                kode: 'PAB 6.1',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pemantauan pasien pascaanestesi baik di ruang intensif maupun di ruang pemulihan dan didokumentasikan dalam rekam medis pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pasien dipindahkan dari unit pascaanestesi (atau pemantauan pemulihan dihentikan) sesuai dengan kriteria baku yang ditetapkan dengan alternatif a) - c) pada maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Waktu dimulai dan dihentikannya proses pemulihan dicatat di dalam rekam medis pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pemilihan teknik operasi bergantung pada riwayat pasien, status fisik, data diagnostik, serta manfaat dan risiko tindakan yang dipilih. Untuk pasien yang saat masuk rumah sakit langsung dilayani oleh dokter bedah, pengkajian prabedah menggunakan formulir pengkajian awal rawat inap. Sedangkan pasien yang dikonsultasikan di tengah perawatan oleh dokter penanggung jawab pelayanan (DPJP) lain dan diputuskan operasi maka pengkajian prabedah dapat dicatat di rekam medis sesuai kebijakan rumah sakit. H...' },
                ],
            },
            {
                kode: 'PAB 7',
                deskripsi: 'Asuhan setiap pasien bedah direncanakan berdasar atas hasil pengkajian dan dicatat dalam rekam medis pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pengkajian prabedah pada pasien yang akan dioperasi oleh dokter penanggung jawab pelayanan (DPJP) sebelum operasi dimulai.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Diagnosis praoperasi dan rencana prosedur/tindakan operasi berdasarkan hasil pengkajian prabedah dan didokumentasikan di rekam medik.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Memungkinan komplikasi dan dampak; dan' },
                    { kode: 'EP d', deskripsi: 'Pilihan operasi atau nonoperasi (alternatif) yang tersedia untuk menangani pasien;' },
                ],
            },
            {
                kode: 'PAB 7.1',
                deskripsi: 'Risiko, manfaat dan alternatif tindakan pembedahan didiskusikan dengan pasien dan atau keluarga atau pihak lain yang berwenang yang memberikan keputusan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pemberian informasi kepada pasien dan atau keluarga atau pihak yang akan memberikan keputusan tentang jenis, risiko, manfaat, komplikasi dan dampak serta alternatif prosedur/teknik terkait dengan rencana operasi (termasuk pemakaian produk darah bila diperlukan) kepada pasien dan atau keluarga atau mereka yang berwenang memberi keputusan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pemberian informasi dilakukan oleh dokter penanggung jawab pelayanan (DPJP) didokumentasikan dalam formulir persetujuan tindakan kedokteran.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: '' },
                    { kode: 'EP d', deskripsi: '' },
                    { kode: 'EP e', deskripsi: 'Diagnosis pascaoperasi;' },
                    { kode: 'EP f', deskripsi: 'Nama dokter bedah dan asistennya;' },
                    { kode: 'EP g', deskripsi: 'Prosedur operasi yang dilakukan dan rincian temuan;' },
                    { kode: 'EP h', deskripsi: 'Ada dan tidak ada komplikasi;' },
                    { kode: 'EP i', deskripsi: 'Spesimen operasi yang dikirim untuk diperiksa;' },
                    { kode: 'EP j', deskripsi: 'Jumlah darah yang hilang dan jumlah yang masuk lewat transfusi;' },
                    { kode: 'EP k', deskripsi: 'Nomor pendaftaran alat yang dipasang (implan), (bila mempergunakan)' },
                    { kode: 'EP l', deskripsi: 'Tanggal, waktu, dan tanda tangan dokter yang bertanggung jawab.' },
                ],
            },
            {
                kode: 'PAB 7.2',
                deskripsi: 'Informasi yang terkait dengan operasi dicatat dalam laporan operasi dan digunakan untuk menyusun rencana asuhan lanjutan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Laporan operasi memuat poin a) – h) pada maksud dan tujuan serta dicatat pada formular/template yang ditetapkan rumah sakit.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Laporan operasi telah tersedia segera setelah operasi selesai dan sebelum pasien dipindah ke ruang lain untuk perawatan selanjutnya.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PAB 7.3',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rencana asuhan pascaoperasi dicatat di rekam medis pasien dalam waktu 24 jam oleh dokter penanggung jawab pelayanan (DPJP).', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rencana asuhan pascaoperasi termasuk rencana asuhan medis, keperawatan, oleh PPA lainnya berdasar atas kebutuhan pasien.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rencana asuhan pascaoperasi diubah berdasarkan pengkajian ulang pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Proses pelaporan jika ada kejadian yang tidak diharapkan terkait implant.' },
                    { kode: 'EP e', deskripsi: 'Proses pelaporan malfungsi implan sesuai dgn standar/aturan pabrik.' },
                    { kode: 'EP f', deskripsi: 'Pertimbangan pengendalian infeksi yang khusus.' },
                    { kode: 'EP g', deskripsi: 'Instruksi khusus kepada pasien setelah operasi.' },
                    { kode: 'EP h', deskripsi: 'Kemampuan penelusuran (traceability) alat jika terjadi penarikan kembali (recall) alat medis misalnya dengan menempelkan barcode alat di rekam medis.' },
                ],
            },
            {
                kode: 'PAB 7.4',
                deskripsi: 'Perawatan bedah yang mencakup implantasi alat medis direncanakan dengan pertimbangan khusus tentang bagaimana memodifikasi proses dan prosedur standar.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah mengidentifikasi jenis alat implan yang termasuk dalam cakupan layanannya.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Kebijakan dan praktik mencakup poin a) – h) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit mempunyai proses untuk melacak implan medis yang telah digunakan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit menerapkan proses untuk menghubungi dan memantau pasien dalam jangka waktu yang ditentukan setelah menerima pemberitahuan adanya penarikan/recall suatu implan medis.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Penyimpanan.' },
                    { kode: 'EP g', deskripsi: 'Pendistribusian.' },
                    { kode: 'EP h', deskripsi: 'Peresepan/permintaan obat/instruksi pengobatan.' },
                    { kode: 'EP i', deskripsi: 'Penyiapan (dispensing).' },
                    { kode: 'EP j', deskripsi: 'Pemberian.' },
                    { kode: 'EP k', deskripsi: 'Pemantauan terapi obat. Untuk memastikan efektivitas sistem pelayanan kefarmasian dan penggunaan obat, maka rumah sakit melakukan kajian sekurang-kurangnya sekali setahun. Kajian tahunan dilakukan dengan mengumpulkan semua informasi dan pengalaman yang berhubungan dengan pelayanan kefarmasian dan penggunaan obat, termasuk jumlah laporan insiden kesalahan obat serta upaya untuk menurunkannya. Pelaksanaan kajian melibatkan Komite/Tim Farmasi dan Terapi, Komite/ Tim Penyelenggara Mutu, serta unit k...' },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PAP',
        pokjaName: 'Pelayanan dan Asuhan Pasien',
        standarList: [
            {
                kode: 'PAP 1',
                deskripsi: 'Pelayanan dan asuhan yang seragam diberikan untuk semua pasien sesuai peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang Pelayanan dan Asuhan Pasien (PAP) yang meliputi poin a) – e) dalam gambaran umum.', bukti: ['W'] },
                    { kode: 'EP b', deskripsi: 'Asuhan yang seragam diberikan kepada setiap pasien meliputi poin a) – e) dalam maksud dan tujuan', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Pengecualian dalam kondisi khusus, misalnya di unit darurat dan unit intensif' },
                    { kode: 'EP d', deskripsi: 'Siapa yang diberi kewenangan memberi instruksi dan perintah catat di dalam berkas rekam medik/sistem elektronik rekam medik sesuai regulasi rumah sakit Prosedur diagnostik dan tindakan klinis, yang dilakukan sesuai instruksi serta hasilnya didokumentasikan di dalam rekam medis pasien. Contoh prosedur dan tindakan misalnya endoskopi, kateterisasi jantung, terapi radiasi, pemeriksaan Computerized Tomography (CT), dan tindakan serta prosedur diagnostik invasif dan non-invasif lainnya. Informasi men...' },
                ],
            },
            {
                kode: 'PAP 1.1',
                deskripsi: 'Proses pelayanan dan asuhan pasien yang terintegrasi serta terkoordinasi telah dilakukan sesuai instruksi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melakukan pelayanan dan asuhan yang terintegrasi serta terkoordinasi kepada setiap pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan kewenangan pemberian instruksi oleh PPA yang kompeten, tata cara pemberian instruksi dan pendokumentasiannya.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Permintaan pemeriksaan laboratorium dan diagnostik imajing harus disertai indikasi klinis apabila meminta hasilnya berupa interpretasi.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Prosedur dan tindakan telah dilakukan sesuai instruksi dan PPA yang memberikan instruksi, alasan dilakukan prosedur atau tindakan serta hasilnya telah didokumentasikan di dalam rekam medis pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Pasien yang menjalani tindakan invasif/berisiko di rawat jalan telah dilakukan pengkajian dan didokumentasikan dalam rekam medis.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PAP 1.2',
                deskripsi: 'Rencana asuhan individual setiap pasien dibuat dan didokumentasikan',
                epList: [
                    { kode: 'EP a', deskripsi: 'PPA telah membuat rencana asuhan untuk setiap pasien setelah diterima sebagai pasien rawat inap dalam waktu 24 jam berdasarkan hasil pengkajian awal.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rencana asuhan dievaluasi secara berkala, direvisi atau dimutakhirkan serta didokumentasikan dalam rekam medis oleh setiap PPA.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Instruksi berdasarkan rencana asuhan dibuat oleh PPA yang kompeten dan berwenang, dengan cara yang seragam, dan didokumentasikan di CPPT.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rencana asuhan pasien dibuat dengan membuat sasaran yang terukur dan di dokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'DPJP telah melakukan evaluasi/review berkala dan verifikasi harian untuk memantau terlaksananya asuhan secara terintegrasi dan membuat notasi sesuai dengan kebutuhan.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Ketersediaan dan penggunaan peralatan medis khusus untuk pemberian pelayanan. Rumah sakit mengidentifikasi dan memberikan asuhan pada pasien risiko tinggi dan pelayanan risiko tinggi sesuai kemampuan, sumber daya dan sarana prasarana yang dimiliki meliputi:' },
                    { kode: 'EP g', deskripsi: 'Pelayanan pada pasien dengan “immuno-suppressed”;' },
                    { kode: 'EP h', deskripsi: 'Pelayanan pada pasien yang mendapatkan pelayanan dialisis;' },
                    { kode: 'EP i', deskripsi: 'Pelayanan pada pasien yang direstrain;' },
                    { kode: 'EP j', deskripsi: 'Pelayanan pada pasien yang menerima kemoterapi;' },
                    { kode: 'EP k', deskripsi: 'Pelayanan pasien paliatif;' },
                    { kode: 'EP l', deskripsi: 'Pelayanan pada pasien yang menerima radioterapi;' },
                    { kode: 'EP m', deskripsi: 'Pelayanan pada pasien risiko tinggi lainnya (misalnya terapi hiperbarik dan pelayanan radiologi intervensi);' },
                    { kode: 'EP n', deskripsi: 'Pelayanan pada populasi pasien rentan, pasien lanjut usia (geriatri) misalnya anak-anak, dan pasien berisiko tindak kekerasan atau diterlantarkan misalnya pasien dengan gangguan jiwa. Rumah sakit juga menetapkan jika terdapat risiko tambahan setelah dilakukan tindakan atau rencana asuhan (contoh, kebutuhan mencegah trombosis vena dalam, luka dekubitus, infeksi terkait penggunaan ventilator pada pasien, cedera neurologis dan pembuluh darah pada pasien restrain, infeksi melalui pembuluh darah pada...' },
                ],
            },
            {
                kode: 'PAP 2',
                deskripsi: 'Rumah sakit menetapkan pasien risiko tinggi dan pelayanan risiko tinggi sesuai dengan kemampuan, sumber daya dan sarana prasarana yang dimiliki.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit telah melaksanakan tanggung jawabnya untuk memberikan pelayanan pada pasien berisiko tinggi dan pelayanan berisiko tinggi meliputi a) - c) dalam maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah memberikan pelayanan pada pasien risiko tinggi dan pelayanan risiko tinggi yang telah diidentifikasi berdasarkan populasi yaitu pasien anak, pasien dewasa dan pasien geriatri sesuai dalam maksud dan tujuan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit telah mengidentifikasi risiko tambahan yang dapat mempengaruhi pasien dan pelayanan risiko tinggi.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Tingkat paripurna (rawat jalan, klinik asuhan siang, rawat inap akut, rawat inap kronis, rawat inap psychogeriatri, penitipan pasien respit care dan home care)' },
                ],
            },
            {
                kode: 'PAP 2.1',
                deskripsi: 'Rumah sakit memberikan pelayanan geriatri rawat jalan, rawat inap akut dan rawat inap kronis sesuai dengan tingkat jenis pelayanan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi tentang penyelenggaraan pelayanan geriatri di rumah sakit sesuai dengan kemampuan, sumber daya dan sarana prasarana nya.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan tim terpadu geriatri dan telah menyelenggarakan pelayanan sesuai tingkat jenis layanan', bukti: ['R', 'O'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melaksanakan proses pemantauan dan evaluasi kegiatan pelayanan geriatri', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Ada pelaporan penyelenggaraan pelayanan geriatri di rumah sakit.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PAP 2.2',
                deskripsi: 'Rumah Sakit melakukan promosi dan edukasi sebagai bagian dari Pelayanan Kesehatan Warga Lanjut usia di Masyarakat Berbasis Rumah Sakit (Hospital Based Community Geriatric Service).',
                epList: [
                    { kode: 'EP a', deskripsi: 'Ada program PKRS terkait Pelayanan Kesehatan Warga Lanjut usia di Masyarakat Berbasis Rumah Sakit (Hospital Based Community Geriatric Service).', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah memberikan edukasi sebagai bagian dari Pelayanan Kesehatan Warga Lanjut usia di Masyarakat Berbasis Rumah Sakit (Hospital Based Community Geriatric Service).', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melaksanakan kegiatan sesuai program dan tersedia leaflet atau alat bantu kegiatan (brosur, leaflet, dan lain-lainnya).', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah melakukan evaluasi dan membuat laporan kegiatan pelayanan secara berkala.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PAP 2.3',
                deskripsi: 'Rumah sakit memberikan pelayanan kesehatan jiwa rawat jalan, rawat inap dan gawat darurat sesuai dengan tingkat jenis pelayanan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi tentang penyelenggaraan pelayanan jiwa di rumah sakit sesuai dengan kemampuan pelayanan, sarana, prasarana, peralatan, sumber daya manusia, dan sumber daya lain sesuai dengan peraturan perundang-undangan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melaksanakan penyelenggaraan pelayanan jiwa yang berkualitas dan menghargai hak-hak asasi orang dengan gangguan jiwa', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melaksanakan proses pemantauan dan evaluasi kegiatan pelayanan jiwa', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Pengguna napza & alcohol,', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Kegagalan,', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Pengalaman traumatis,', bukti: ['D'] },
                    { kode: 'EP g', deskripsi: 'Kesepian,' },
                    { kode: 'EP h', deskripsi: 'Kehilangan,' },
                    { kode: 'EP i', deskripsi: 'Kemiskinan dan' },
                    { kode: 'EP j', deskripsi: 'Sistem pendukung yang kurang. Pasien yang dirawat di rumah sakit harus dilakukan skrining dan pengkajian untuk mengidentifikasi risiko bunuh diri dan melukai diri sendiri sehingga dapat diminimalkan kemungkinan upaya bunuh diri atau melukai diri sendiri. Pasien dengan risiko bunuh diri dilakukan penanganan lebih lanjut. Oleh karena itu rumah sakit perlu memiliki sumber daya manusia yang terlatih dalam mengidentifikasi risiko bunuh diri, melakukan pengkajian lanjut, mencegah risiko bunuh diri dan...' },
                ],
            },
            {
                kode: 'PAP 2.4',
                deskripsi: 'Rumah sakit memiliki pelayanan dalam mengidentifikasi, menilai, mengelola dan menindaklanjuti seseorang yang memiliki risiko bunuh diri',
                epList: [
                    { kode: 'EP a', deskripsi: '' },
                    { kode: 'EP b', deskripsi: '' },
                    { kode: 'EP c', deskripsi: '' },
                    { kode: 'EP d', deskripsi: '' },
                    { kode: 'EP e', deskripsi: '', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PAP 2.5',
                deskripsi: 'Rumah sakit menerapkan proses pengenalan perubahan kondisi pasien yang memburuk.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan proses pengenalan perubahan kondisi pasien yang memburuk (EWS) dan mendokumentasikannya di dalam rekam medik pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki bukti PPA dilatih menggunakan EWS.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PAP 2.6',
                deskripsi: 'Pelayanan resusitasi tersedia di seluruh area rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pelayanan resusitasi tersedia dan diberikan selama 24 jam setiap hari di seluruh area rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Peralatan medis untuk resusitasi dan obat untuk bantuan hidup dasar dan lanjut terstandar sesuai dengan kebutuhan populasi pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Di seluruh area rumah sakit, bantuan hidup dasar diberikan segera saat dikenali henti jantung-paru dan bantuan hidup lanjut diberikan kurang dari 5 menit.', bukti: ['S', 'W'] },
                    { kode: 'EP d', deskripsi: 'Staf diberi pelatihan pelayanan bantuan hidup dasar/lanjut sesuai dengan ketentuan rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Penyimpanan darah;' },
                    { kode: 'EP f', deskripsi: 'Identifikasi pasien;' },
                    { kode: 'EP g', deskripsi: 'Distribusi dan pemberian darah; dan' },
                    { kode: 'EP h', deskripsi: 'Pemantauan pasien dan respons terhadap reaksi transfusi. Staf kompeten dan berwenang melaksanakan pelayanan darah dan produk darah serta melakukan pemantauan dan evaluasi.' },
                ],
            },
            {
                kode: 'PAP 2.7',
                deskripsi: 'Pelayanan darah dan produk darah dilaksanakan sesuai dengan panduan klinis serta prosedur yang ditetapkan rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan penyelenggaraan pelayanan darah.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Panduan klinis dan prosedur disusun dan diterapkan untuk pelayanan darah serta produk darah.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Staf yang kompeten bertanggungjawab terhadap pelayanan darah di rumah sakit.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PAP 3',
                deskripsi: 'Rumah sakit memberikan makanan untuk pasien rawat inap dan terapi nutrisi terintegrasi untuk pasien dengan risiko nutrisional.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Berbagai pilihan makanan atau terapi nutrisi yang sesuai untuk kondisi, perawatan, dan kebutuhan pasien tersedia dan disediakan tepat waktu.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Sebelum pasien rawat inap diberi makanan, terdapat instruksi pemberian makanan dalam rekam medis pasien yang didasarkan pada status gizi dan kebutuhan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Untuk makanan yang disediakan keluarga, edukasi diberikan mengenai batasan-batasan diet pasien dan penyimpanan yang baik untuk mencegah kontaminasi.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Memiliki bukti pemberian terapi gizi terintegrasi (rencana, pemberian dan evaluasi) pada pasien risiko gizi.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Pemantauan dan evaluasi terapi gizi dicatat di rekam medis pasien.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PAP 4',
                deskripsi: 'Pasien mendapatkan pengelolaan nyeri yang efektif.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit memiliki proses untuk melakukan skrining, pengkajian, dan tata laksana nyeri meliputi poin a) - e) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Informasi mengenai kemungkinan adanya nyeri dan pilihan tata laksananya diberikan kepada pasien yang menerima terapi/prosedur/pemeriksaan terencana yang sudah dapat diprediksi menimbulkan rasa nyeri.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pasien dan keluarga mendapatkan edukasi mengenai pengelolaan nyeri sesuai dengan latar belakang agama, budaya, nilai-nilai yang dianut.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Staf rumah sakit mendapatkan pelatihan mengenai cara melakukan edukasi bagi pengelolaan nyeri.', bukti: ['D', 'W', 'S'] },
                ],
            },
            {
                kode: 'PAP 5',
                deskripsi: 'Rumah sakit memberikan asuhan pasien menjelang akhir kehidupan dengan memperhatikan kebutuhan pasien dan keluarga, mengoptimalkan kenyamanan dan martabat pasien, serta mendokumentasikan dalam rekam medis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan pengkajian pasien menjelang akhir kehidupan dan dapat dilakukan pengkajian ulang sampai pasien yang memasuki fase akhir kehidupannya, dengan memperhatikan poin 1) – 9) pada maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Asuhan menjelang akhir kehidupan ditujukan terhadap kebutuhan psikososial, emosional, kultural dan spiritual pasien dan keluarganya.', bukti: ['D'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PKPO',
        pokjaName: 'Pelayanan Kefarmasian dan Penggunaan Obat',
        standarList: [
            {
                kode: 'PKPO 1',
                deskripsi: 'Sistem pelayanan kefarmasian dan penggunaan obat dikelola untuk memenuhi kebutuhan pasien sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi tentang sistem pelayanan kefarmasian dan penggunaan obat, termasuk pengorganisasiannya sesuai dengan peraturan perundang-undangan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki bukti seluruh apoteker memiliki izin dan kompeten, serta telah melakukan supervisi pelayanan kefarmasian dan memastikan kepatuhan terhadap peraturan perundang- undangan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memiliki bukti kajian sistem pelayanan kefarmasian dan penggunaan obat yang dilakukan setiap tahun.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memiliki sumber informasi obat untuk semua staf yang terlibat dalam penggunaan obat.', bukti: ['D', 'O', 'W'] },
                ],
            },
            {
                kode: 'PKPO 2',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan formularium yang digunakan untuk peresepan/permintaan obat/instruksi pengobatan. Obat dalam formularium senantiasa tersedia di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah memiliki proses penyusunan formularium rumah sakit secara kolaboratif.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit melakukan pemantauan kepatuhan terhadap formularium baik dari persediaan maupun penggunaannya.', bukti: ['O', 'D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit melakukan evaluasi terhadap formularium sekurang-kurangnya setahun sekali berdasarkan informasi tentang efektivitas, keamanan dan biaya.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit melakukan pelaksanaan dan evaluasi terhadap perencanaan dan pengadaan sediaan farmasi, dan BMHP.', bukti: ['O'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit melakukan pengadaan sediaan farmasi, dan BMHP melibatkan apoteker untuk memastikan proses berjalan sesuai peraturan perundang- undangan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PKPO 3.1',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi pengelolaan obat atau produk yang memerlukan penanganan khusus, misalnya obat dan bahan berbahaya, radioaktif, obat penelitian, produk nutrisi parenteral, obat/BMHP dari program/donasi sesuai peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Obat yang memerlukan penanganan khusus dan bahan berbahaya dikelola sesuai sifat dan risiko bahan.', bukti: ['O'] },
                    { kode: 'EP b', deskripsi: 'Radioaktif dikelola sesuai sifat dan risiko bahan radioaktif.', bukti: ['O'] },
                    { kode: 'EP c', deskripsi: 'Obat penelitian dikelola sesuai protokol penelitian.', bukti: ['O'] },
                    { kode: 'EP d', deskripsi: 'Produk nutrisi parenteral dikelola sesuai stabilitas produk.', bukti: ['O'] },
                    { kode: 'EP e', deskripsi: 'Obat/BMHP dari program/donasi dikelola sesuai peraturan perundang-undangan dan pedoman terkait.', bukti: ['O'] },
                ],
            },
            {
                kode: 'PKPO 3',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi penyimpanan sediaan farmasi dan BMHP disimpan dengan benar dan aman sesuai peraturan perundang-undangan dan standar profesi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Sediaan farmasi dan BMHP disimpan dengan benar dan aman dalam kondisi yang sesuai untuk stabilitas produk, termasuk yang disimpan di luar Instalasi Farmasi.' },
                    { kode: 'EP b', deskripsi: 'Narkotika dan psikotropika disimpan dan dilaporkan penggunaannya sesuai peraturan perundang- undangan.' },
                    { kode: 'EP c', deskripsi: 'Rumah sakit melaksanakan supervisi secara rutin oleh apoteker untuk memastikan penyimpanan sediaan farmasi dan BMHP dilakukan dengan benar dan aman.' },
                    { kode: 'EP d', deskripsi: 'Obat dan zat kimia yang digunakan untuk peracikan obat diberi label secara akurat yang terdiri atas nama zat dan kadarnya, tanggal kedaluwarsa, dan peringatan khusus.' },
                ],
            },
            {
                kode: 'PKPO 3.2',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi pengelolaan obat, dan BMHP untuk kondisi emergensi yang disimpan di luar Instalasi Farmasi untuk memastikan selalu tersedia, dimonitor dan aman.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Obat dan BMHP untuk kondisi emergensi yang tersimpan di luar Instalasi Farmasi termasuk di ambulans dikelola secara seragam dalam hal penyimpanan, pemantauan, penggantian karena digunakan, rusak atau kedaluwarsa, dan dilindungi dari kehilangan dan pencurian.', bukti: ['O'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan tata laksana obat emergensi untuk meningkatkan ketepatan dan kecepatan pemberian obat.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PKPO 3.3',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi penarikan kembali (recall) dan pemusnahan sediaan farmasi, BMHP dan implan sesuai peraturan perundang- undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Batas waktu obat dapat digunakan (beyond use date) tercantum pada label obat.', bukti: ['D', 'O'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki sistem pelaporan sediaan farmasi dan BMHP substandar (rusak).', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit menerapkan proses recall obat, BMHP dan implan yang meliputi identifikasi, penarikan, dan pengembalian produk yang di-recall.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit menerapkan proses pemusnahan sediaan farmasi dan BMHP.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PKPO 4',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi rekonsiliasi obat.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan rekonsiliasi obat saat pasien masuk rumah sakit, pindah antar unit pelayanan di dalam rumah sakit dan sebelum pasien pulang.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Hasil rekonsiliasi obat didokumentasikan di rekam medis.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Penulisan berat badan dan/atau tinggi badan untuk pasien anakanak, lansia, pasien yang mendapatkan kemoterapi, dan populasi khusus lainnya.' },
                    { kode: 'EP d', deskripsi: 'Penulisan kecepatan pemberian infus di instruksi pengobatan.' },
                    { kode: 'EP e', deskripsi: 'Penulisan instruksi khusus seperti: titrasi, tapering, rentang dosis. Instruksi titrasi adalah instruksi pengobatan dimana dosis obat dinaikkan/diturunkan secara bertahap tergantung status klinis pasien. Instruksi harus terdiri dari: dosis awal, dosis titrasi, parameter penilaian, dan titik akhir penggunaan, misalnya: infus nitrogliserin, dosis awal 5 mcg/menit. Naikkan dosis 5 mcg/menit setiap 5 menit jika nyeri dada menetap, jaga tekanan darah 110-140 mmHg. Instruksi tapering down/tapering off...' },
                ],
            },
            {
                kode: 'PKPO 4.1',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi peresepan/permintaan obat dan BMHP/instruksi pengobatan sesuai peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Resep dibuat lengkap sesuai regulasi.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Telah dilakukan evaluasi terhadap penulisan resep/instruksi pengobatan yang tidak lengkap dan tidak terbaca.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Telah dilaksanaan proses untuk mengelola resep khusus seperti emergensi, automatic stop order, tapering,', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Daftar obat yang diresepkan tercatat dalam rekam medis pasien dan menyertai pasien ketika dipindahkan/transfer.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Daftar obat pulang diserahkan kepada pasien disertai edukasi penggunaannya.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PKPO 5',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi dispensing sediaan farmasi dan bahan medis habis pakai sesuai standar profesi dan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Telah memiliki sistem distribusi dan dispensing yang sama/seragam diterapkan di rumah sakit sesuai peraturan perundang-undangan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Staf yang melakukan dispensing sediaan obat non steril kompeten.', bukti: ['D', 'O'] },
                    { kode: 'EP c', deskripsi: 'Staf yang melakukan dispensing sediaan obat steril non sitostatika terlatih dan kompeten.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Staf yang melakukan pencampuran sitostatika terlatih dan kompeten.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Tersedia fasilitas dispensing sesuai standar praktik kefarmasian.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP f', deskripsi: 'Telah melaksanakan penyerahan obat dalam bentuk yang siap diberikan untuk pasien rawat inap.', bukti: ['O'] },
                    { kode: 'EP g', deskripsi: 'Obat yang sudah disiapkan diberi etiket yang meliputi identitas pasien, nama obat, dosis atau konsentrasi, cara pemakaian, waktu pemberian, tanggal dispensing dan tanggal kedaluwarsa/beyond use date (BUD).', bukti: ['O'] },
                ],
            },
            {
                kode: 'PKPO 5.1',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi pengkajian resep dan telaah obat sesuai peraturan perundang-undangan dan standar praktik profesi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Telah melaksanakan pengkajian resep yang dilakukan oleh staf yang kompeten dan berwenang serta didukung tersedianya informasi klinis pasien yang memadai.', bukti: ['D', 'O', 'W', 'S'] },
                    { kode: 'EP b', deskripsi: 'Telah memiliki proses telaah obat sebelum diserahkan.', bukti: ['D', 'O', 'W', 'S'] },
                    { kode: 'EP c', deskripsi: 'Dosis.' },
                    { kode: 'EP d', deskripsi: 'Rute pemberian' },
                    { kode: 'EP e', deskripsi: 'Waktu pemberian. Obat yang termasuk golongan obat high alert, harus dilakukan double checking untuk menjamin ketepatan pemberian obat.' },
                ],
            },
            {
                kode: 'PKPO 6',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi pemberian obat sesuai peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Staf yang melakukan pemberian obat kompeten dan berwenang dengan pembatasan yang ditetapkan.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Telah dilaksanaan verifikasi sebelum obat diberikan kepada pasien minimal meliputi: identitas pasien, nama obat, dosis, rute, dan waktu pemberian.', bukti: ['S'] },
                    { kode: 'EP c', deskripsi: 'Telah melaksanakan double checking untuk obat high alert.', bukti: ['D', 'S'] },
                    { kode: 'EP d', deskripsi: 'Pasien diberi informasi tentang obat yang akan diberikan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PKPO 6.1',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan regulasi penggunaan obat yang dibawa pasien dari luar rumah sakit dan penggunaan obat oleh pasien secara mandiri.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Telah melakukan penilaian obat yang dibawa pasien dari luar rumah sakit untuk kelayakan penggunaannya di rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Telah melaksanakan edukasi kepada pasien/keluarga jika obat akan digunakan secara mandiri.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Telah memantau pelaksanaan penggunaan obat secara mandiri sesuai edukasi.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PKPO 7',
                deskripsi: 'Rumah sakit menerapkan pemantauan terapi obat secara kolaboratif.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Telah melaksanakan pemantauan terapi obat secara kolaboratif.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Telah melaksanakan pemantauan dan pelaporan efek samping obat serta analisis laporan untuk meningkatkan keamanan penggunaan obat.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PKPO 7.1',
                deskripsi: 'Rumah sakit menetapkan dan menerapkan proses pelaporan serta tindak lanjut terhadap kesalahan obat (medication error) dan berupaya menurunkan kejadiannya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah memiliki regulasi tentang medication safety yang bertujuan mengarahkan penggunaan obat yang aman dan meminimalkan risiko kesalahan penggunaan obat sesuai dengan peraturan perundang- undangan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan sistem pelaporan kesalahan obat yang menjamin laporan akurat dan tepat waktu yang merupakan bagian program peningkatan mutu dan keselamatan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memiliki upaya untuk mendeteksi, mencegah dan menurunkan kesalahan obat dalam meningkatkan mutu proses penggunaan obat.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Seluruh staf rumah sakit dilatih terkait kesalahan obat (medication error).', bukti: ['D'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PMKP',
        pokjaName: 'Peningkatan Mutu dan Keselamatan Pasien',
        standarList: [
            {
                kode: 'PMKP 1',
                deskripsi: 'Rumah sakit mempunyai Komite/Tim Penyelenggara Mutu yang kompeten untuk mengelola kegiatan Peningkatan Mutu dan Keselamatan Pasien (PMKP) sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur telah menetapkan regulasi terkait peningkatan mutu dan keselamatan pasien serta manajemen risiko', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Direktur rumah sakit telah membentuk Komite/Tim Penyelenggara Mutu untuk mengelola kegiatan PMKP serta uraian tugasnya sesuai dengan peraturan perundang-undangan.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Komite/ Tim Penyelenggara Mutu menyusun program PMKP rumah sakit meliputi poin a) – i) yang telah ditetapkan Direktur rumah sakit dan disahkan oleh representatif pemilik/dewan pengawas.', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Program PMKP dievaluasi dalam rapat koordinasi mellibatkan komite-komite, pimpinan rumah sakit dan kepala unit setiap triwulan untuk menjamin perbaikan mutu yang berkesinambungan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PMKP 2',
                deskripsi: 'Komite/Tim Penyelenggara Mutu mendukung proses pemilihan indikator dan melaksanakan koordinasi serta integrasi kegiatan pengukuran data indikator mutu dan keselamatan pasien di rumah sakit',
                epList: [
                    { kode: 'EP a', deskripsi: 'Komite/Tim Penyelenggara Mutu terlibat dalam pemilihan indikator mutu prioritas baik ditingkat rumah sakit maupun tingkat unit layanan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Komite/Tim Penyelenggara Mutu melaksanakan koordinasi dan integrasi kegiatan pengukuran serta melakukan supervisi ke unit layanan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Komite/Tim Penyelenggara Mutu mengintegrasikan laporan insiden keselamatan pasien, pengukuran budaya keselamatan, dan lainnya untuk mendapatkan solusi dan perbaikan terintegrasi.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Tujuan.' },
                    { kode: 'EP e', deskripsi: 'Definisi Operasional.' },
                    { kode: 'EP f', deskripsi: 'Jenis Indikator.' },
                    { kode: 'EP g', deskripsi: 'Satuan pengukuran.' },
                    { kode: 'EP h', deskripsi: 'Numerator (Pembilang).' },
                    { kode: 'EP i', deskripsi: 'Denominator (Penyebut).' },
                    { kode: 'EP j', deskripsi: 'Target Pencapaian.' },
                    { kode: 'EP k', deskripsi: 'Kriteria inklusi dan eksklusi.' },
                    { kode: 'EP l', deskripsi: 'Formula.' },
                    { kode: 'EP m', deskripsi: 'Metode pengumpulan data.' },
                    { kode: 'EP n', deskripsi: 'Sumber data.' },
                    { kode: 'EP o', deskripsi: 'Instrumen pengambilan data.' },
                    { kode: 'EP p', deskripsi: 'Populasi / Sampel (Besar sampel dan cara pengambilan sampel).' },
                    { kode: 'EP q', deskripsi: 'Periode pengumpulan data.' },
                    { kode: 'EP r', deskripsi: 'Periode analisis dan pelaporan data.' },
                    { kode: 'EP s', deskripsi: 'Penyajian data.' },
                    { kode: 'EP t', deskripsi: 'Penanggung jawab.' },
                ],
            },
            {
                kode: 'PMKP 3',
                deskripsi: 'Pengumpulan data indikator mutu dilakukan oleh staf pengumpul data yang sudah mendapatkan pelatihan tentang pengukuran data indikator mutu.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit melakukan pengumpulan data mencakup (poin a) – c)) dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Indikator mutu prioritas rumah sakit (IMP-RS) dan indikator mutu prioritas unit (IMP- Unit) telah dibuat profil indikator mencakup (poin a-t) dalam maksud dan tujuan dan diimplementasikan.', bukti: ['R'] },
                ],
            },
            {
                kode: 'PMKP 4',
                deskripsi: 'Agregasi dan analisis data dilakukan untuk mendukung program peningkatan mutu dan keselamatan pasien serta mendukung partisipasi dalam pengumpulan database eksternal.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Telah dilakukan agregasi dan analisis data menggunakan metode dan teknik statistik terhadap semua indikator mutu yang telah diukur oleh staf yang kompeten', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Hasil analisis digunakan untuk membuat rekomendasi tindakan perbaikan dan serta menghasilkan efisiensi penggunaan sumber daya.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Memiliki bukti analisis data dilaporkan kepada Direktur dan reprentasi pemilik/dewan pengawas sebagai bagian dari program peningkatan mutu dan keselamatan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Memiliki bukti hasil analisis berupa informasi INM dan e-report IKP diwajibkan lapor kepada Kementrian kesehatan sesuai peraturan yang berlaku.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Terdapat proses pembelajaran dari database eksternal untuk tujuan perbandingan internal dari waktu ke waktu, perbandingan dengan rumah sakit yang setara, dengan praktik terbaik (best practices), dan dengan sumber ilmiah profesional yang objektik.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Keamanan dan kerahasiaan tetap dijaga saat berkontribusi pada database eksternal.', bukti: ['D', 'W'] },
                    { kode: 'EP g', deskripsi: 'Telah menganalisis efisiensi berdasarkan biaya dan jenis sumber daya yang digunakan (sebelum dan sesudah perbaikan) terhadap satu proyek prioritas perbaikan yang dipilih setiap tahun.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PMKP 5',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melakukan validasi yang berbasis bukti meliputi poin a) – f) yang ada pada maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pimpinan rumah sakit bertanggung jawab atas validitas dan kualitas data serta hasil yang dipublikasikan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PMKP 6',
                deskripsi: 'Rumah sakit mencapai perbaikan mutu dan dipertahankan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah membuat rencana perbaikan dan melakukan uji coba menggunakan metode yang telah teruji dan menerapkannya untuk meningkatkan mutu dan keselamatan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Tersedia kesinambungan data mulai dari pengumpulan data sampai perbaikan yang dilakukan dan dapat dipertahankan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Memiliki bukti perubahan regulasi atau perubahan proses yang diperlukan untuk mempertahankan perbaikan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Keberhasilan telah didokumentasikan dan dijadikan laporan PMKP.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Secara konsisten menggunakan praktik berbasis bukti (evidence based practices) dalam memberikan asuhan bermutu tinggi. Evaluasi prioritas standar pelayanan kedokteran tersebut dipergunakan untuk mengukur keberhasilan dan efisensi peningkatan mutu pelayanan klinis prioritas rumah sakit. Evaluasi perbaikan pelayanan klinis berupa standar pelayanan kedokteran dapat dilakukan melalui audit medis dan atau audit klinis serta dapat menggunakan indikator mutu. Tujuan evaluasi adalah untuk menilai efekti...' },
                ],
            },
            {
                kode: 'PMKP 7',
                deskripsi: 'Dilakukan evaluasi proses pelaksanaan standar pelayanan kedokteran di rumah sakit untuk menunjang pengukuran mutu pelayanan klinis prioritas.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit melakukan evaluasi clinical pathway sesuai yang tercantum dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Hasil evaluasi dapat menunjukkan adanya perbaikan terhadap kepatuhan dan mengurangi variasi dalam penerapan prioritas standar pelayanan dari Clinical Pathway yang sudah dibuat.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melaksanakan audit klinis dan atau audit medis setiap tahun atau sewaktu-waktu bila diperlukan pada penerapan prioritas standar pelayanan kedokteran di rumah sakit pada kasus high cost dan high volume.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Penculikan pasien yang sedang menerima perawatan, tata laksana, dan pelayanan;' },
                    { kode: 'EP e', deskripsi: 'Kaburnya pasien (atau pulang tanpa izin) dari unit perawatan yang selalu dijaga oleh staf sepanjang hari (termasuk UGD), yang menyebabkan kematian, cedera permanen, atau cedera sementara derajat berat bagi pasien tersebut;' },
                    { kode: 'EP f', deskripsi: 'Reaksi transfusi hemolitik yang melibatkan pemberian darah atau produk darah dengan inkompatibilitas golongan darah mayor (ABO, Rh, kelompok darah lainnya);' },
                    { kode: 'EP g', deskripsi: 'Pemerkosaan, kekerasan (yang menyebabkan kematian, cedera permanen, atau cedera sementara derajat berat) atau pembunuhan pasien yang sedang menerima perawatan, tata laksana, dan layanan ketika berada dalam lingkungan rumah sakit;' },
                    { kode: 'EP h', deskripsi: 'Pemerkosaan, kekerasan (yang menyebabkan kematian, cedera permanen, atau cedera sementara derajat berat) atau pembunuhan anggota staf, praktisi mandiri berizin, pengunjung, atau vendor ketika berada dalam lingkungan rumah sakit' },
                    { kode: 'EP i', deskripsi: 'Tindakan invasif, termasuk operasi yang dilakukan pada pasien yang salah, pada sisi yang salah, atau menggunakan prosedur yang salah (secara tidak sengaja);' },
                    { kode: 'EP j', deskripsi: 'Tertinggalnya benda asing dalam tubuh pasien secara tidak sengaja setelah suatu tindakan invasif, termasuk operasi;' },
                    { kode: 'EP k', deskripsi: 'Hiperbilirubinemia neonatal berat (bilirubin >30 mg/dL);' },
                    { kode: 'EP l', deskripsi: 'Fluoroskopi berkepanjangan dengan dosis kumulatif >1.500 rad pada satu medan tunggal atau pemberian radioterapi ke area tubuh yang salah atau pemberian radioterapi >25% melebihi dosis radioterapi yang direncanakan;' },
                    { kode: 'EP m', deskripsi: 'Kebakaran, lidah api, atau asap, uap panas, atau pijaran yang tidak diantisipasi selama satu episode perawatan pasien;' },
                    { kode: 'EP n', deskripsi: 'Semua kematian ibu intrapartum (terkait dengan proses persalinan); atau' },
                    { kode: 'EP o', deskripsi: 'Morbiditas ibu derajat berat (terutama tidak berhubungan dengan perjalanan alamiah penyakit pasien atau kondisi lain yang mendasari) terjadi pada pasien dan menyebabkan cedera permanen atau cedera sementara derajat berat. Definisi kejadian sentinel meliputi poin a) hingga o) di atas dan dapat meliputi kejadian-kejadian lainnya seperti yang disyaratkan dalam peraturan atau dianggap sesuai oleh rumah sakit untuk ditambahkan ke dalam daftar kejadian sentinel. Komite/ Tim Penyelenggara Mutu segera m...' },
                ],
            },
            {
                kode: 'PMKP 8',
                deskripsi: 'Rumah sakit mengembangkan Sistem pelaporan dan pembelajaran keselamatan pasien di rumah sakit (SP2KP- RS).',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur menetapkan sistem pelaporan dan pembelajaran keselamatan pasien rumah sakit (SP2KP RS) termasuk didalamnya definisi, jenis insiden kselamatan pasien meliputi kejadian sentinel (poin a –', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Komite/ Tim Penyelenggara Mutu membentuk tim investigator sesegera mungkin untuk melakukan investigasi komprehensif/analisis akar masalah (root cause analysis) pada semua kejadian sentinel dalam kurun waktu tidak melebihi 45 (empat puluh lima) hari.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit melakukan tindakan perbaikan korektif dan memantau efektivitasnya untuk mencegah atau mengurangi berulangnya kejadian sentinel tersebut.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pimpinan rumah sakit menetapkan proses untuk menganalisis KTD, KNC, KTC, KPCS dengan melakukan investigasi sederhana dengan kurun waktu yaitu grading biru tidak melebihi 7 (tujuh) hari, grading hijau tidak melebihi 14 (empat belas) hari.', bukti: ['R'] },
                    { kode: 'EP e', deskripsi: 'Pimpinan rumah sakit melakukan tindakan perbaikan korektif dan memantau efektivitasnya untuk mencegah atau mengurangi berulangnya KTD, KNC, KTC, KPCS tersebut.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Kejadian tidak diharapkan atau pola kejadian tidak diharapkan selama anestesi tanpa memandang cara pemberian' },
                    { kode: 'EP g', deskripsi: 'Kejadian tidak diharapkan yang berkaitan dengan identifikasi pasien' },
                    { kode: 'EP h', deskripsi: 'Kejadian-kejadian lain, misalnya infeksi yang berkaitan dengan perawatan kesehatan atau wabah penyakit menular.' },
                    { kode: 'EP o', deskripsi: 'dalam bagian maksud dan tujuan), KTD, KNC, KTC dan KPCS, mekanisme pelaporan dan analisisnya serta pembelajarannya,' },
                ],
            },
            {
                kode: 'PMKP 9',
                deskripsi: 'Data laporan insiden keselamatan pasien selalu dianalisis setiap 3 (tiga) bulan untuk memantau ketika muncul tren atau variasi yang tidak diinginkan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Proses pengumpulan data sesuai a) sampai h) dari maksud dan tujuan, analisis, dan pelaporan diterapkan untuk memastikan akurasi data.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Analisis data mendalam dilakukan ketika terjadi tingkat, pola atau tren yang tak diharapkan yang digunakan untuk meningkatkan mutu dan keselamatan pasien.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Data luaran (outcome) dilaporkan kepada direktur dan representatif pemilik/ dewan pengawas sebagai bagian dari program peningkatan mutu dan keselamatan pasien.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PMKP 10',
                deskripsi: 'Rumah sakit melakukan pengukuran dan evaluasi budaya keselamatan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan pengukuran budaya keselamatan pasien dengan survei budaya keselamatan pasien setiap tahun menggunakan metode yang telah terbukti.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Hasil pengukuran budaya sebagai acuan dalam menyusun program peningkatan budaya keselamatan di rumah sakit.', bukti: ['R'] },
                ],
            },
            {
                kode: 'PMKP 11',
                deskripsi: 'Komite/ Tim Penyelenggara Mutu memandu penerapan program manajemen risiko di rumah sakit',
                epList: [
                    { kode: 'EP a', deskripsi: 'Komite/ Tim Penyelenggara Mutu memandu penerapan program manajemen risiko yang di tetapkan oleh Direktur', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Komite/ Tim Penyelenggara Mutu telah membuat daftar risiko rumah sakit berdasarkan daftar risiko unit-unit di rumah sakit', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Komite/ Tim Penyelenggara Mutu telah membuat profil risiko dan rencana penanganan', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Komite/ Tim Penyelenggara Mutu telah membuat pemantauan terhadap rencana penanganan dan melaporkan kepada direktur dan representatif pemilik/dewan pengawas setiap 6 (enam) bulan', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Komite/ Tim Penyelenggara Mutu telah menyusun Program manajemen risiko tingkat rumah sakit untuk ditetapkan Direktur', bukti: ['R'] },
                    { kode: 'EP f', deskripsi: 'Komite/ Tim Penyelenggara Mutu telah memandu pemilihan minimal satu analisis secara proaktif proses berisiko tinggi yang diprioritaskan untuk dilakukan analisis FMEA setiap tahun.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PMKP 4.1',
                deskripsi: 'Staf dengan pengalaman, pengetahuan, dan keterampilan yang bertugas mengumpulkan dan menganalisis data rumah sakit secara sistematis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Data dikumpulkan, dianalisis, dan diubah menjadi informasi untuk mengidentifikasi peluang-peluang untuk perbaikan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Staf yang kompeten melakukan proses pengukuran menggunakan alat dan teknik statistik.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Hasil analisis data dilaporkan kepada penanggung jawab indikator mutu yang akan melakukan perbaikan. 7) Standard PMKP 5 Rumah sakit melakukan proses validasi data terhadap indikator mutu yang diukur.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Bila terdapat perubahan hasil pengukuran tanpa diketahui sebabnya' },
                    { kode: 'EP e', deskripsi: 'Bila terdapat perubahan sumber data, misalnya terdapat perubahan sistem pencatatan pasien dari manual ke elektronik;' },
                    { kode: 'EP f', deskripsi: 'Bila terdapat perubahan subyek data seperti perubahan umur rata rata pasien, perubahan protokol riset, panduan praktik klinik baru diberlakukan, serta adanya teknologi dan metodologi pengobatan baru.' },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PP',
        pokjaName: 'Pengkajian Pasien',
        standarList: [
            {
                kode: 'PP 1',
                deskripsi: 'Semua pasien yang dirawat di rumah sakit diidentifikasi kebutuhan perawatan kesehatannya melalui suatu proses pengkajian yang telah ditetapkan oleh rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang pengkajian awal dan pengkajian ulang medis dan keperawatan di unit gawat darurat, rawat inap dan rawat jalan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menetapkan isi minimal pengkajian awal meliputi poin a) – l) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Hanya PPA yang kompeten, diperbolehkan untuk melakukan pengkajian sesuai dengan ketentuan rumah sakit.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Perencanaanan pulang yang mencakup identifikasi kebutuhan khusus dan rencana untuk memenuhi kebutuhan tersebut, disusun sejak pengkajian awal.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 1.1',
                deskripsi: 'Kebutuhan medis dan keperawatan pasien diidentifikasi berdasarkan pengkajian awal.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pengkajian awal medis dan keperawatandilaksanakan dan didokumentasikan dalam kurun waktu 24 jam pertama sejak pasien masuk rawat inap, atau lebih awal bila diperlukan sesuai dengan kondisi pasien.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Pengkajian awal medis menghasilkan diagnosis medis yang mencakup kondisi utama dan kondisi lainnya yang membutuhkan tata laksana dan pemantauan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Pengkajian awal keperawatan menghasilkan diagnosis keperawatan untuk menentukan kebutuhan asuhan keperawatan, intervensi atau pemantauan pasien yang spesifik.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Sebelum pembedahan pada kondisi mendesak, minimal terdapat catatan singkat dan diagnosis praoperasi yang didokumentasikan di dalam rekam medik.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Pengkajian medis yang dilakukan sebelum masuk rawat inap atau sebelum pasien menjalani prosedur di layanan rawat jalan rumah sakit harus dilakukan dalam waktu kurang atau sama dengan 30 (tiga puluh) hari sebelumnya. Jika lebih dari 30 (tiga puluh) hari, maka harus dilakukan pengkajian ulang.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Hasil dari seluruh pengkajian yang dikerjakan di luar rumah sakit ditinjau dan/atau diverifikasi pada saat masuk rawat inap atau sebelum tindakan di unit rawat jalan.' },
                ],
            },
            {
                kode: 'PP 1.2',
                deskripsi: 'Pasien dilakukan skrining risiko nutrisi, skrining nyeri, kebutuhan fungsional termasuk risiko jatuh dan kebutuhan khusus lainnya',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan kriteria risiko nutrisional yang dikembangkan bersama staf yang kompeten dan berwenang.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Pasien diskrining untuk risiko nutrisi sebagai bagian dari pengkajian awal.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Pasien dengan risiko nutrisional dilanjutkan dengan pengkajian gizi.', bukti: ['R', 'D'] },
                    { kode: 'EP d', deskripsi: 'Pasien diskrining untuk kebutuhan fungsional termasuk risiko jatuh.' },
                    { kode: 'EP e', deskripsi: 'Geriatri.' },
                    { kode: 'EP f', deskripsi: 'Sakit terminal / menghadapi kematian.' },
                    { kode: 'EP g', deskripsi: 'Pasien dengan nyeri kronik atau nyeri (intense).' },
                    { kode: 'EP h', deskripsi: 'Pasien dengan gangguan emosional atau pasien psikiatris.' },
                    { kode: 'EP i', deskripsi: 'Pasien kecanduan obat terlarang atau alkohol.' },
                    { kode: 'EP j', deskripsi: 'Korban kekerasan atau kesewenangan.' },
                    { kode: 'EP k', deskripsi: 'Pasien dengan penyakit menular atau infeksius.' },
                    { kode: 'EP l', deskripsi: 'Pasien yang menerima kemoterapi atau terapi radiasi.' },
                    { kode: 'EP m', deskripsi: 'Pasien dengan sistem imunologi terganggu. Tambahan pengkajian terhadap pasien ini memperhatikan kebutuhan dan kondisi mereka berdasarkan budaya dan nilai yang dianut pasien. Proses pengkajian disesuaikan dengan peraturan perundangan dan standar profesional.' },
                ],
            },
            {
                kode: 'PP 1.3',
                deskripsi: 'Rumah sakit melakukan pengkajian awal yang telah dimodifikasi untuk populasi khusus yang dirawat di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan jenis populasi khusus yang akan dilakukan pengkajian meliputi poin a) - m) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melaksanakan pengkajian tambahan terhadap populasi pasien khusus sesuai ketentuan rumah sakit.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Dalam menanggapi perubahan signifikan dalam kondisi pasien; (Juga lihat PP 3.2)' },
                    { kode: 'EP d', deskripsi: 'Jika diagnosis pasien telah berubah dan kebutuhan perawatan memerlukan perencanaan yang direvisi; dan' },
                    { kode: 'EP e', deskripsi: 'Untuk menentukan apakah pengobatan dan perawatan lain telah berhasil dan pasien dapat dipindahkan atau dipulangkan. Temuan pada pengkajian digunakan sepanjang proses pelayanan untuk mengevaluasi kemajuan pasien dan untuk memahami kebutuhan untuk pengkajian ulang. Oleh karena itu pengkajian medis, keperawatan dan PPA lain dicatat di rekam medik untuk digunakan oleh semua PPA yang memberikan asuhan ke pasien.' },
                ],
            },
            {
                kode: 'PP 2',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit melaksanakan pengkajian ulang oleh DPJP, perawat dan PPA lainnya untuk menentukan rencana asuhan lanjutan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti pelaksanaan pengkajian ulang medis dilaksanakan minimal satu kali sehari, termasuk akhir minggu/libur untuk pasien akut.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat bukti pelaksanaan pengkajian ulang oleh perawat minimal satu kali per shift atau sesuai dengan perubahan kondisi pasien.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti pengkajian ulang oleh PPA lainnya dilaksanakan dengan interval sesuai regulasi rumah sakit.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 3',
                deskripsi: 'Pelayanan laboratorium tersedia untuk memenuhi kebutuhan pasien sesuai peraturan perundangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang pelayanan laboratorium di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Pelayanan laboratorium buka 24 jam, 7 (tujuh) hari seminggu, sesuai dengan kebutuhan pasien.', bukti: ['R', 'D'] },
                    { kode: 'EP c', deskripsi: 'Melaksanakan program kendali mutu (PMI dan PME) dan mengintegrasikan program mutu laboratorium dengan program Manajemen Fasilitas dan Keamanan serta program Pencegahan dan Pengendalian Infeksi di rumah sakit.' },
                    { kode: 'EP d', deskripsi: 'Melakukan pemantauan dan evaluasi semua jenis pelayanan laboratorium.' },
                    { kode: 'EP e', deskripsi: 'Mereview dan menindaklanjuti hasil pemeriksaan laboratorium rujukan.' },
                ],
            },
            {
                kode: 'PP 3.1',
                deskripsi: 'Rumah sakit menetapkan bahwa seorang yang kompeten dan berwenang, bertanggung jawab mengelola pelayanan laboratorium.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur rumah sakit menetapkan penanggung jawab laboratorium yang memiliki kompetensi sesuai ketentuan perundang-undangan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti pelaksanaan tanggung jawab pimpinan laboratorium sesuai poin a) - e) pada maksud dan tujuan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 3.2',
                deskripsi: 'Staf laboratorium mempunyai pendidikan, pelatihan, kualifikasi dan pengalaman yang dipersyaratkan untuk mengerjakan pemeriksaan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Staf laboratorium yang membuat interpretasi telah memenuhi persyaratan kredensial.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Staf laboratorium dan staf lain yang melaksanakan pemeriksaan termasuk yang mengerjakan Point-of-care testing (POCT), memenuhi persyaratan kredensial.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 3.3',
                deskripsi: 'Rumah Sakit menetapkan kerangka waktu penyelesaian pemeriksaan regular dan pemeriksaan segera (cito).',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan dan menerapkan kerangka waktu penyelesaian pemeriksaan laboratorium regular dan cito.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti pencatatan dan evaluasi waktu penyelesaian pemeriksaan laboratorium.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat bukti pencatatan dan evaluasi waktu penyelesaian pemeriksaan cito.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti pencatatan dan evaluasi pelayanan laboratorium rujukan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 3.4',
                deskripsi: 'Rumah sakit memiliki prosedur pengelolaan semua reagensia esensial dan di evaluasi secara berkala pelaksaksanaannya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti pelaksanaan semua reagensia esensial disimpan dan diberi label, serta didistribusi sesuai prosedur dari pembuatnya atau instruksi pada kemasannya', bukti: ['D', 'O'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti pelaksanaan evaluasi/audit semua reagen.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Pengiriman, pembuangan, penyimpanan dan pengawetan' },
                    { kode: 'EP d', deskripsi: 'Penerimaan, penyimpanan, telusur spesimen (tracking).' },
                ],
            },
            {
                kode: 'PP 3.5',
                deskripsi: 'Rumah sakit memiliki prosedur untuk cara pengambilan, pengumpulan, identifikasi, pengerjaan, pengiriman, penyimpanan, dan pembuangan spesimen.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pengelolaan spesimen dilaksanakan sesuai poin a) - d) pada maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti pemantauan dan evaluasi terhadap pengelolaan spesimen.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 3.6',
                deskripsi: 'Rumah sakit menetapkan nilai normal dan rentang nilai untuk interpretasi dan pelaporan hasil laboratorium klinis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan dan mengevaluasi rentang nilai normal untuk interpretasi, pelaporan hasil laboratorium klinis.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Setiap hasil pemeriksaan laboratorium dilengkapi dengan rentang nilai normal.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Reagensia di tes;' },
                    { kode: 'EP d', deskripsi: 'Koreksi cepat jika ditemukan kekurangan;' },
                    { kode: 'EP e', deskripsi: 'Dokumentasi hasil dan tindakan koreksi; dan' },
                    { kode: 'EP f', deskripsi: 'Pemantapan Mutu Eksternal.' },
                ],
            },
            {
                kode: 'PP 3.7',
                deskripsi: 'Rumah sakit melaksanakan prosedur kendali mutu pelayanan laboratorium, di evaluasi dan dicatat sebagai dokumen.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti bahwa unit laboratorium telah melakukan Pemantapan Mutu Internal (PMI) secara rutin yang meliputi poin a-e pada maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti bahwa unit laboratorium telah melakukan Pemantapan Mutu Eksternal (PME) secara rutin.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 3.8',
                deskripsi: 'Rumah sakit bekerjasama dengan laboratorium rujukan yang terakreditasi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Unit laboratorium memiliki bukti sertifikat akreditasi laboratorium rujukan yang masih berlaku.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Telah dilakukan pemantauan dan evaluasi kerjasama pelayanan kontrak sesuai dengan kesepakatan kedua belah pihak.', bukti: ['R', 'D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melakukan pemantauan dan evaluasi mutu terhadap penyelenggaran pelayanan darah di rumah sakit.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit menerapkan proses persetujuan tindakan pasien untuk pemberian darah dan produk darah.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 3.9',
                deskripsi: 'Rumah Sakit menetapkan regulasi tentang penyelenggara pelayanan darah dan menjamin pelayanan yang diberikan sesuai peraturan dan perundang-undangan dan standar pelayanan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan regulasi tentang penyelenggaraan pelayanan darah di rumah sakit.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Penyelenggaraan pelayanan darah dibawah tanggung jawab seorang staf yang kompeten.', bukti: ['R', 'D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melakukan pemantauan dan evaluasi mutu terhadap penyelenggaran pelayanan darah di rumah sakit.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit menerapkan proses persetujuan tindakan pasien untuk pemberian darah dan produk darah.' },
                ],
            },
            {
                kode: 'PP 4',
                deskripsi: 'Pelayanan radiologi klinik menetapkan regulasi pelayanan radiologi klinis di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah Sakit menetapkan dan melaksanakan regulasi pelayanan radiologi klinik.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Terdapat pelayanan radiologi klinik selama 24 jam, 7 (tujuh) hari seminggu, sesuai dengan kebutuhan pasien.', bukti: ['R', 'D'] },
                    { kode: 'EP c', deskripsi: 'Melaksanakan program kendali mutu (PMI dan PME) dan mengintegrasikan program mutu radiologi dengan program Manajemen Fasilitas dan Keamanan serta program Pencegahan dan Pengendalian Infeksi di rumah sakit.' },
                    { kode: 'EP d', deskripsi: 'Memonitor dan evaluasi semua jenis pelayanan RIR.' },
                    { kode: 'EP e', deskripsi: 'Mereviu dan menindak lanjuti hasil pemeriksaan pelayanan RIR rujukan.' },
                ],
            },
            {
                kode: 'PP 4.1',
                deskripsi: 'Rumah Sakit menetapkan seorang yang kompeten dan berwenang, bertanggung jawab mengelola pelayanan RIR.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur menetapkankan penanggung jawab radiologi klinik yang memiliki kompetensi sesuai ketentuan dengan peraturan perundang-undangan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti pengawasan pelayanan radiologi klinik oleh penanggung jawab radiologi klinik sesuai poin a) –', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'pada maksud dan tujuan.' },
                ],
            },
            {
                kode: 'PP 4.2',
                deskripsi: 'Semua staf radiologi klinik mempunyai pendidikan, pelatihan, kualifikasi dan pengalaman yang dipersyaratkan untuk mengerjakan pemeriksaan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Staf radiologi klinik yang membuat interpretasi telah memenuhi persyaratan kredensial', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Staf radiologi klinik dan staf lain yang melaksanakan pemeriksaan termasuk yang mengerjakan tindakan di Ruang Rawat pasien, memenuhi persyaratan kredensial.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 4.3',
                deskripsi: 'Rumah sakit menetapkan kerangka waktu penyelesaian pemeriksaan radiologi klinik regular dan cito.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan kerangka waktu penyelesaian pemeriksaan radiologi klinik.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Dilakukan pencatatan dan evaluasi waktu penyelesaian pemeriksaan radiologi klinik.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Dilakukan pencatatan dan evaluasi waktu penyelesaian pemeriksaan cito.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti pencatatan dan evaluasi pelayanan radiologi rujukan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 4.4',
                deskripsi: 'Film X-ray dan bahan lainnya tersedia secara teratur.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan proses pengelolaan logistik film x-ray, reagens, dan bahan lainnya, termasuk kondisi bila terjadi kekosongan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Semua film x-ray disimpan dan diberi label, serta didistribusi sesuai pedoman dari pembuatnya atau instruksi pada kemasannya.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PP 4.5',
                deskripsi: 'Rumah sakit menetapkan program kendali mutu, dilaksanakan, divalidasi dan didokumentasikan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti bahwa unit radiologi klinik telah melaksanakan Pemantapan Mutu Internal (PMI).', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti bahwa unit radiologi klinik melaksanakan Pemantapan Mutu Eksternal (PME).', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Kondisi pasien menentukan sumber daya yang akan dialokasikan untuk memenuhi kebutuhannya' },
                    { kode: 'EP d', deskripsi: 'Pemberian asuhan yang diberikan kepada pasien, sama di semua unit pelayanan di rumah sakit misalnya pelayanan anestesi.' },
                    { kode: 'EP e', deskripsi: 'Pasien yang membutuhkan asuhan keperawatan yang sama akan menerima tingkat asuhan keperawatan yang sama di semua unit pelayanan di rumah sakit. Keseragaman dalam memberikan asuhan pada semua pasien akan menghasilkan penggunaan sumber daya yang efektif dan memungkinkan dilakukan evaluasi terhadap hasil asuhan yang sama di semua unit pelyanan di rumah sakit.' },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PPI',
        pokjaName: 'Pencegahan dan Pengendalian Infeksi',
        standarList: [
            {
                kode: 'PPI 1',
                deskripsi: 'Rumah sakit menetapkan Komite/Tim PPI untuk melakukan pengkajian, perencanaan, pelaksanaan, pemantauan, dan evaluasi kegiatan PPI di rumah sakit serta menyediakan sumber daya untuk mendukung program pencegahan dan pengendalian infeksi',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur rumah sakit telah menetapkan regulasi PPI meliputi a - m pada gambaran umum.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Direktur rumah sakit telah menetapkan komite/tim PPI untuk untuk mengelola dan mengawasi kegiatan PPI di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah menerapkan mekanisme koordinasi yang melibatkan pimpinan rumah sakit dan komite/tim PPI untuk melaksanakan program PPI sesuai dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Direktur rumah sakit memberikan dukungan sumber daya terhadap penyelenggaraan kegiatan PPI meliputi namun tidak terbatas pada maksud dan tujuan. 4) Elemen Penialian PPI 1.1', bukti: ['D', 'O', 'W'] },
                ],
            },
            {
                kode: 'PPI 1.1',
                deskripsi: 'Direktur rumah sakit menetapkan Komite/Tim PPI untuk mengelola dan mengawasi kegiatan PPI disesuaikan dengan jenis pelayanan, kebutuhan, beban kerja, dan/atau klasifikasi rumah sakit sesuai sesuai peraturan perundang undangan. Komite/Tim PPI dipimpin oleh seorang tenaga medis yang mempunyai pengalaman klinis, pengalaman pencegahan dan pengendalian infeksi (PPI) serta kepemimpinan sehingga dapat mengarahkan, mengimplementasikan, dan mengukur perubahan. Kualifikasi Ketua Komite/Tim PPI dapat dipen...',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan perawat PPI/IPCN purna waktu dan IPCLN berdasarkan jumlah dan kualifikasi sesuai ukuran rumah sakit, kompleksitas kegiatan, tingkat risiko, cakupan program dan sesuai dengan peraturan perundang-undangan', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Ada bukti perawat PPI/IPCN melaksanakan supervisi pada semua kegiatan pencegahan dan pengendalian infeksi di rumah sakit.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PPI 2',
                deskripsi: 'Rumah sakit menyusun dan menerapkan program PPI yang terpadu dan menyeluruh untuk mencegah penularan infeksi terkait pelayanan kesehatan berdasarkan pengkajian risiko secara proaktif setiap tahun.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan kebijakan Program PPI yang terdiri dari kewaspadaan standar dan kewaspadaan transmisi sesuai maksud dan tujuan diatas.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit melakukan evaluasi pelaksanaan program PPI.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pelayanan yang menggunakan peralatan yang berisiko infeksi;' },
                    { kode: 'EP d', deskripsi: 'Prosedur/tindakan-tindakan berisiko tinggi;' },
                    { kode: 'EP e', deskripsi: 'Pelayanan distribusi linen bersih dan kotor;' },
                    { kode: 'EP f', deskripsi: 'Pelayanan sterilisasi alat;' },
                    { kode: 'EP g', deskripsi: 'Kebersihan permukaan dan lingkungan;' },
                    { kode: 'EP h', deskripsi: 'Pengelolaan linen/laundri;' },
                    { kode: 'EP i', deskripsi: 'Pengelolaan sampah;' },
                    { kode: 'EP j', deskripsi: 'Penyediaan makanan; dan' },
                    { kode: 'EP k', deskripsi: 'Pengelolaan kamar jenazah Data surveilans dikumpulkan di rumah sakit secara periodik dan dianalisis setiap triwulan. Data surveilans ini meliputi:' },
                    { kode: 'EP l', deskripsi: 'Pengelolaan di kamar jenazah. Rumah sakit juga melakukan kaji banding angka kejadian dan tren di rumah sakit lain yang setara. Ilmu pengetahuan terkait pengendalian infeksi melalui pedoman praktik klinik, program pengawasan antibiotik, program PPI dan pembatasan penggunaan peralatan invasif yang tidak diperlukan telah diterapkan untuk menurunkan tingkat infeksi secara signifikan Penanggung jawab program menerapkan intervensi berbasis bukti untuk meminimalkan risiko infeksi. Pemantauan yang berke...' },
                ],
            },
            {
                kode: 'PPI 3',
                deskripsi: 'Rumah sakit melakukan pengkajian proaktif setiap tahunnya sebagai dasar penyusunan program PPI terpadu untuk mencegah penularan infeksi terkait pelayanan kesehatan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit secara proaktif telah melaksanakan pengkajian risiko pengendalian infeksi (ICRA) setiap tahunnya terhadap tingkat dan kecenderungan infeksi layanan kesehatan sesuai poin a) – k) pada maksud dan tujuan dan selanjutnya menggunakan data tersebut untuk membuat dan menentukan prioritas/fokus pada Program PPI.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melaksanakan surveilans data secara periodik dan dianalisis setiap triwulan meliputi' },
                    { kode: 'EP c', deskripsi: 'Tingkat 3 - Non-kritikal: Benda yang menyentuh kulit intak tetapi tidak menyentuh selaput lendir, dan membutuhkan disinfeksi tingkat rendah. Pembersihan dan disinfeksi tambahan dibutuhkan untuk peralatan medis dan/atau bahan medis habis pakai (BMHP) yang digunakan pada pasien yang diisolasi sebagai bagian dari kewaspadaan berbasis transmisi. Pembersihan, desinfeksi, dan sterilisasi dapat dilakukan di area CSSD atau, di area lain di rumah sakit dengan pengawasan. Metode pembersihan, desinfeksi, d...' },
                ],
            },
            {
                kode: 'PPI 4',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pengolahan sterilisasi mengikuti peraturan perundang- undangan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Staf yang memroses peralatan medis dan/atau BMHP telah diberikan pelatihan dalam pembersihan, desinfeksi, dan sterilisasi serta mendapat pengawasan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Metode pembersihan, desinfeksi, dan sterilisasi', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Penyimpanan peralatan medis dan/atau BMHP bersih dan steril disimpan dengan baik di area penyimpanan yang ditetapkan, bersih dan kering dan terlindungi dari debu, kelembaban, serta perubahan suhu yang ekstrem.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP e', deskripsi: 'Bila sterilisasi dilaksanakan di luar rumah sakit harus dilakukan oleh lembaga yang memiliki sertifikasi mutu dan ada kerjasama yang menjamin kepatuhan proses sterilisasi sesuai dengan peraturan perundang- undangan.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Pencatatan bahan medis habis pakai yang reuse di rekam medis; dan' },
                    { kode: 'EP g', deskripsi: 'Evaluasi untuk menurunkan risiko infeksi bahan medis habis pakai yang di-reuse. Ada 2 (dua) risiko jika menggunakan lagi (reuse) alat sekali pakai. Terdapat risiko tinggi terkena infeksi dan juga terdapat risiko kinerja alat tidak cukup atau tidak dapat terjamin sterilitas serta fungsinya Dilakukan pengawasan terhadap proses untuk memberikan atau mencabut persetujuan penggunaan kembali alat medis sekali pakai yang diproses ulang. Daftar alat sekali pakai yang disetujui untuk digunakan kembali di...' },
                ],
            },
            {
                kode: 'PPI 4.1',
                deskripsi: 'Rumah sakit mengidentifikasi dan menetapkan proses untuk mengelola peralatan medis dan/atau bahan medis habis pakai (BMHP) yang sudah kadaluwarsa dan penggunaan ulang (reuse) alat sekali-pakai apabila diizinkan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan peralatan medis dan/atau BMHP yang dapat digunakan ulang meliputi a) – g) dalam maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menggunakan proses terstandarisasi untuk menentukan kapan peralatan', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti pemantauan, evaluasi, dan tindak lanjut pelaksanaan penggunaan kembali (reuse) peralatan medis dan/atau BMHP meliputi a) – g) dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PPI 5',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan prosedur pembersihan dan disinfeksi permukaan dan lingkungan sesuai standar PPI', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit melaksanakan pembersihan dan desinfeksi tambahan di area berisiko tinggi berdasarkan hasil pengkajian risiko', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melakukan pemantauan proses pembersihan dan disinfeksi lingkungan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pengelolaan limbah cair;' },
                    { kode: 'EP e', deskripsi: 'Pelaporan pajanan limbah infeksius. Salah satu bahaya luka karena tertusuk jarum suntik adalah terjadi penularan penyakit melalui darah (blood borne diseases). Pengelolaan limbah benda tajam dan jarum yang tidak benar merupakan kekhawatiran staf terhadap keamanannya. Kebiasaan bekerja sangat memengaruhi timbulnya risiko menderita luka dan kemungkinan terpapar penyakit secara potensial. Identifikasi dan melaksanakan kegiatan praktik berdasar atas bukti sahih (evidence based) menurunkan risiko luk...' },
                ],
            },
            {
                kode: 'PPI 6',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: '' },
                    { kode: 'EP b', deskripsi: '', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP c', deskripsi: '', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: '' },
                    { kode: 'EP e', deskripsi: '' },
                ],
            },
            {
                kode: 'PPI 7',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan pengelolaan limbah rumah sakit untuk meminimalkan risiko infeksi yang meliputi a) –' },
                    { kode: 'EP b', deskripsi: 'Penanganan dan pembuangan darah serta komponen darah sesuai dengan regulasi, dipantau dan dievaluasi, serta di tindak lanjutnya.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pelaporan pajanan limbah infeksius sesuai dengan regulasi dan dilaksanakan pemantauan, evaluasi, serta tindak lanjutnya.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Bila pengelolaan limbah dilaksanakan oleh pihak luar rumah sakit harus berdasar atas kerjasama dengan pihak yang memiliki izin dan sertifikasi mutu sesuai dengan peraturan perundang- undangan', bukti: ['W'] },
                    { kode: 'EP e', deskripsi: 'pada maksud dan tujuan.', bukti: ['D', 'O', 'W'] },
                ],
            },
            {
                kode: 'PPI 7.1',
                deskripsi: '',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pemulasaraan jenazah dan bedah mayat sesuai dengan regulasi.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Ada bukti kegiatan kamar mayat dan kamar bedah mayat sudah dikelola sesuai dengan peraturan perundang-undangan.', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti pemantauan dan evaluasi, serta tindak lanjut kepatuhan prinsip-prinsip PPI sesuai dengan peraturan perundang-undangan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PPI 7.2',
                deskripsi: 'Rumah sakit menetapkan pengelolaan limbah benda tajam dan jarum secara aman.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Benda tajam dan jarum sudah dikumpulkan, disimpan di dalam wadah yang tidak tembus, tidak bocor, berwarna kuning, diberi label infeksius, dan dipergunakan hanya sekali pakai sesuai dengan peraturan perundangundangan.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Bila pengelolaan benda tajam dan jarum dilaksanakan oleh pihak luar rumah sakit harus berdasar atas kerjasama dengan pihak yang memiliki izin dan sertifikasi mutu sesuai dengan peraturan perundang- undangan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti data dokumen limbah benda tajam dan jarum.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Ada bukti pelaksanaan supervisi dan pemantauan oleh IPCN terhadap pengelolaan benda tajam dan jarum sesuai dengan prinsip PPI, termasuk bila dilaksanakan oleh pihak luar rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Ada bukti pelaksanaan pemantauan kepatuhan prinsip-prinsip PPI sesuai regulasi.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PPI 8',
                deskripsi: 'Rumah sakit mengurangi risiko infeksi terkait penyelenggaraan pelayanan makanan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang pelayanan makanan di rumah sakit yang meliputi a) – b) pada maksud dan tujuan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Ada bukti pelaksanaan yang penyimpanan bahan makanan, pengolahan, pembagian/pemorsian, dan distribusi makanan sudah sesuai dengan peraturan perundang-undangan.', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti pelaksanaan penyimpanan makanan dan produk nutrisi dengan memperhatikan kesehatan lingkungan meliputi sanitasi, suhu, pencahayaan, kelembapan, ventilasi, dan keamanan untuk mengurangi risiko infeksi.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Proyek untuk menetapkan kelas/tingkat infeksi;' },
                    { kode: 'EP e', deskripsi: 'Tindak pengendalian infeksi berdasar atas tingkat/kelas infeksi; dan' },
                    { kode: 'EP f', deskripsi: 'Pemantauan pelaksanaan. Karena itu, rumah sakit agar mempunyai regulasi pengendalian mekanis dan teknis (mechanical dan engineering controls) fasilitas yang antara lain meliputi' },
                ],
            },
            {
                kode: 'PPI 9',
                deskripsi: 'Rumah sakit menurunkan risiko infeksi pada fasilitas yang terkait dengan pengendalian mekanis dan teknis (mechanical dan enginering controls) serta pada saat melakukan pembongkaran, konstruksi, dan renovasi gedung.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan pengendalian mekanis dan teknis (mechanical dan engineering control) minimal untuk fasilitas yang tercantum pada a) – e) pada maksud dan tujuan.', bukti: ['O', 'W', 'D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan penilaian risiko pengendalian infeksi (infection control risk assessment/ICRA) yang minimal meliputi a) – f) yang ada pada maksud dan tujuan.', bukti: ['W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melaksanakan penilaian risiko pengendalian infeksi (infection control risk assessment/ICRA) pada semua renovasi, kontruksi dan demolisi sesuai dengan regulasi.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PPI 10',
                deskripsi: 'Rumah sakit menyediakan APD untuk kewaspadaan (barrier precautions) dan prosedur isolasi untuk penyakit menular melindungi pasien dengan imunitas rendah (immunocompromised) dan mentransfer pasien dengan airborne diseases di dalam rumah sakit dan keluar rumah sakit serta penempatannya dalam waktu singkat jika rumah sakit tidak mempunyai kamar dengan tekanan negatif (ventilasi alamiah dan mekanik).',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menyediakan dan menempatkan ruangan untuk pasien dengan imunitas rendah (immunocompromised) sesuai dengan peraturan perundang undangan.', bukti: ['O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit melaksanakan proses transfer pasien airborne diseases di dalam rumah sakit dan keluar rumah sakit sesuai dengan peraturan perundang- undangan termasuk di ruang gawat darurat dan ruang lainnya', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah menempatkan pasien infeksi “air borne” dalam waktu singkat jika rumah sakit tidak mempunyai kamar dengan tekanan negatif sesuai dengan peraturan perundang-undangan termasuk di ruang gawat darurat dan ruang lainnya.', bukti: ['O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Ada bukti pemantauan ruang tekanan negatif dan penempatan pasien secara rutin.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PPI 10.1',
                deskripsi: 'Rumah sakit mengembangkan dan menerapkan sebuah proses untuk menangani lonjakan mendadak (outbreak) penyakit infeksi air borne.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses pengelolaan pasien bila terjadi ledakan pasien (outbreak) penyakit infeksi air borne.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menyediakan ruang isolasi dengan tekanan negatif bila terjadi ledakan pasien (outbreak) sesuai dengan peraturan perundangan.', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti dilakukan edukasi kepada staf tentang pengelolaan pasien infeksius jika terjadi ledakan pasien (outbreak) penyakit infeksi air borne.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PPI 11',
                deskripsi: 'Kebersihan tangan menggunakan sabun dan desinfektan adalah sarana efektif untuk mencegah dan mengendalikan infeksi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan hand hygiene yang mencakup kapan, di mana, dan bagaimana melakukan cuci tangan mempergunakan sabun (hand wash) dan atau dengan disinfektan (hand rubs) serta ketersediaan fasilitas hand hygiene.', bukti: ['O', 'S'] },
                    { kode: 'EP b', deskripsi: 'Sabun, disinfektan, serta tissu/handuk sekali pakai tersedia di tempat cuci tangan dan tempat melakukan disinfeksi tangan.', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti pelaksanaan pelatihan hand hygiene kepada semua pegawai termasuk tenaga kontrak.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PPI 11.1',
                deskripsi: 'Sarung tangan, masker, pelindung mata, serta alat pelindung diri lainnya tersedia dan digunakan secara tepat apabila disyaratkan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan penggunaan alat pelindung diri, tempat yang harus menyediakan alat pelindung diri, dan pelatihan cara memakainya.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Alat pelindung diri sudah digunakan secara tepat dan benar.', bukti: ['O', 'W', 'S'] },
                    { kode: 'EP c', deskripsi: 'Ketersediaan alat pelindung diri sudah cukup sesuai dengan regulasi.', bukti: ['O'] },
                    { kode: 'EP d', deskripsi: 'Ada bukti pelatihan penggunaan alat pelindung diri kepada semua pegawai termasuk tenaga kontrak.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Pengunjung.' },
                ],
            },
            {
                kode: 'PPI 12',
                deskripsi: 'Kegiatan PPI diintegrasikan dengan program PMKP (Peningkatan Mutu dan Keselamatan Pasien) dengan menggunakan indikator yang secara epidemiologik penting bagi rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Ada regulasi sistem manajemen data terintegrasi antara data surveilans dan data indikator mutu di Komite/ Tim Penyelenggara Mutu.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Ada bukti pertemuan berkala antara Komite/ Tim Penyelenggara Mutu dan Komite/Tim PPI untuk berkoordinasi dan didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti penyampaian hasil analisis data dan rekomendasi Komite/Tim PPI kepada Komite/ Tim Penyelenggara Mutu setiap tiga bulan. m. Edukasi, Pendidikan dan Pelatihan', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Mutu setiap tiga bulan.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Pengunjung.' },
                ],
            },
            {
                kode: 'PPI 13',
                deskripsi: 'Rumah sakit melakukan edukasi tentang PPI kepada staf klinis dan nonklinis, pasien, keluarga pasien, serta petugas lainnya yang terlibat dalam pelayanan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan program pelatihan dan edukasi tentang PPI yang meliputi a) – e) yang ada pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Ada bukti pelaksanaan pelatihan untuk semua staf klinik dan nonklinik sebagai bagian dari orientasi pegawai baru tentang regulasi dan praktik program PPI.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti pelaksanaan edukasi untuk pasien, keluarga, dan pengunjung', bukti: ['D', 'W'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PPK',
        pokjaName: 'Program Peningkatan Kepatuhan',
        standarList: [
            {
                kode: 'PPK 1',
                deskripsi: 'Rumah sakit menetapkan regulasi tentang persetujuan dan pemantauan pemilik pimpinan dalam kerja sama penyelenggaraan pendidikan kesehatan di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit memilki kerjasama resmi rumah sakit dengan institusi pendidikan yang masih berlaku.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Kerja sama antara rumah sakit dengan institusi pendidikan yang sudah terakreditasi.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Kriteria penerimaan peserta didik sesuai dengan kapasitas RS harus dicantumkan dalam perjanjian Kerjasama.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pemilik, pimpinan rumah sakit dan pimpinan institusi pendidikan membuat kajian tertulis sedikitnya satu kali setahun terhadap hasil evaluasi program pendidikan kesehatan yang dijalankan di rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Laporan pencapaian kompetensi.' },
                ],
            },
            {
                kode: 'PPK 2',
                deskripsi: 'Pelaksanaan pelayanan dalam pendidikan klinis yang diselenggarakan di rumah sakit mempunyai akuntabilitas manajemen, koordinasi, dan prosedur yang jelas.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang pengelolaan dan pengawasan pelaksanaan pendidikan klinis yang telah disepakati bersama meliputi poin a) sampai dengan c) pada maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki daftar lengkap memuat nama semua peserta pendidikan klinis yang saat ini ada di rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Untuk setiap peserta pendidikan klinis terdapat dokumentasi yang meliputi poin a) – e) pada maksud dan tujuan', bukti: ['D'] },
                ],
            },
            {
                kode: 'PPK 3',
                deskripsi: 'Tujuan dan sasaran program pendidikan klinis di rumah sakit disesuaikan dengan jumlah staf yang memberikan pendidikan klinis, variasi dan jumlah pasien, teknologi, serta fasilitas rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat bukti perhitungan rasio peserta pendidikan dengan staf pendidik klinis untuk seluruh peserta dari setiap program pendidikan profesi yang disepakati oleh rumah sakit dan institusi pendidikan sesuai dengan peraturan perundang-undangan.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Terdapat bukti perhitungan peserta didik yang diterima di rumah sakit per periode untuk proses pendidikan disesuaikan dengan jumlah pasien untuk menjamin mutu dan keselamatan pasien.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat bukti bahwa sarana prasarana, teknologi, dan sumber daya lain di rumah sakit tersedia untuk mendukung pendidikan peserta didik.', bukti: ['D', 'O'] },
                ],
            },
            {
                kode: 'PPK 4',
                deskripsi: 'Seluruh staf yang memberikan pendidikan klinis mempunyai kompetensi sebagai pendidik klinis dan mendapatkan kewenangan dari institusi pendidikan dan rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan staf klinis yang memberikan pendidikan klinis dan penetapan penugasan klinis serta rincian kewenangan klinis dari rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit memiliki daftar staf klinis yang memberikan pendidikan klinis secara lengkap (akademik dan profesi) sesuai dengan jenis pendidikan yang dilaksanakan di rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memiliki bukti staf klinis yang memberikan pendidikan klinis telah mengikuti pendidikan sebagai pendidikan dan keprofesian berkelanjutan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PPK 5',
                deskripsi: 'Rumah sakit memastikan pelaksanaan pendidikan yang dijalankan untuk setiap jenis dan jenjang pendidikan staf klinis di rumah sakit aman bagi pasien dan peserta didik.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah memiliki tingkat supervisi yang diperlukan oleh setiap peserta pendidikan klinis di rumah sakit untuk setiap jenjang pendidikan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Setiap peserta pendidikan klinis mengetahui tingkat, frekuensi, dan dokumentasi untuk supervisinya.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah memiliki format spesifik untuk mendokumentasikan proses supervisi yang sesuai dengan kebijakan rumah sakit, tujuan program pendidikan, serta mutu dan keselamatan asuhan pasien.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah memiliki proses pengkajian rekam medis untuk memastikan kepatuhan batasan kewenangan dan proses supervisi peserta pendidikan yang mempunyai akses pengisian rekam medis.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PPK 6',
                deskripsi: 'Pelaksanaan pendidikan klinis di rumah sakit harus mematuhi regulasi rumah sakit dan pelayanan yang diberikan berada dalam upaya mempertahankan atau meningkatkan mutu dan keselamatan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan unit yang bertanggung jawab untuk mengelola pelaksanaan pendidikan klinis di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menetapkan program orientasi peserta pendidikan klinis.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah memiliki bukti pelaksanaan dan sertifikat program orientasi peserta pendidikan klinis.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah memiliki bukti pelaksanaan dan dokumentasi peserta didik diikutsertakan dalam semua program peningkatan mutu dan keselamatan pasien di rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit telah memantau dan mengevaluasi bahwa pelaksanaan program pendidikan kesehatan tidak menurunkan mutu dan keselamatan pasien yang dilaksanakan sekurang-kurangnya sekali setahun yang terintegrasi dengan program mutu dan keselamatan pasien.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Rumah sakit telah melakukan survei mengenai kepuasan pasien terhadap pelayanan rumah sakit atas dilaksanakannya pendidikan klinis sekurang- kurangnya sekali setahun.', bukti: ['D', 'W'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'PROGNAS',
        pokjaName: 'Program Nasional',
        standarList: [
            {
                kode: 'PROGNAS 1',
                deskripsi: 'Rumah sakit melaksanakan program PONEK 24 jam dan 7 (tujuh) hari seminggu.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan regulasi tentang pelaksanaan PONEK 24 jam.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Terdapat Tim PONEK yang ditetapkan oleh rumah sakit dengan rincian tugas dan tanggungjawabnya.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Terdapat program kerja yang menjadi acuan dalam pelaksanaan program PONEK Rumah Sakit sesuai maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Terdapat bukti pelaksanaan program PONEK Rumah Sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Program PONEK Rumah Sakit dipantau dan dievaluasi secara rutin.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'PROGNAS 1.1',
                deskripsi: 'Untuk meningkatkan efektifitas sistem rujukan maka Rumah sakit melakukan pembinaan kepada jejaring fasilitas Kesehatan rujukan yang ada.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan program pembinaan jejaring rujukan rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit melakukan pembinaan terhadap jejaring secara berkala.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Telah dilakukan evaluasi program pembinaan jejaring rujukan.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Penemuan dan penanganan kasus tuberkulosis. Penemuan kasus tuberkulosis dilakukan melalui pasien yang datang kerumah sakit, setelah pemeriksaan, penegakan diagnosis, penetapan klarifikasi dan tipe pasien tuberkulosis. Sedangkan untuk penanganan kasus dilaksanakan sesuai tata laksana pada pedoman nasional pelayanan kedokteran tuberkulosis dan standar lainnya sesuai dengan peraturan perundang- undangan.' },
                    { kode: 'EP e', deskripsi: 'Pemberian kekebalan Pemberian kekebalan dilakukan melalui pemberian imunisasi BCG terhadap bayi dalam upaya penurunan risiko tingkat pemahaman tuberkulosis sesuai dengan peraturan perundang-undangan.' },
                    { kode: 'EP f', deskripsi: 'Pemberian obat pencegahan. Pemberian obat pencegahan selama 6 (enam) bulan yang ditujukan pada anak usia dibawah 5 (lima) tahun yang kontak erat dengan pasien tuberkulosis aktif; orang dengan HIV dan AIDS (ODHA) yang tidak terdiagnosis tuberkulosis; populasi tertentu lainnya sesuai peraturan perundang- undangan. Untuk menjalankan kegiatan tersebut maka rumah sakit dapat membentuk tim/panitia pelaksana program TB Paru Rumah Sakit.' },
                ],
            },
            {
                kode: 'PROGNAS 2',
                deskripsi: 'Rumah sakit melaksanakan program penanggulangan tuberkulosis.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan regulasi tentang pelaksanaan penanggulangan tuberkulosis di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Direktur menetapkan tim TB Paru Rumah sakit beserta program kerjanya.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Ada bukti pelaksanaan promosi kesehatan, surveilans dan upaya pencegahan tuberkulosis', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Tersedianya laporan pelaksanaan promosi Kesehatan.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PROGNAS 2.1',
                deskripsi: 'Rumah sakit menyediakan sarana dan prasarana pelayanan tuberkulosis sesuai peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Tersedia ruang pelayanan rawat jalan yang memenuhi pedoman pencegahan dan pengendalian infeksi tuberkulosis.', bukti: ['O'] },
                    { kode: 'EP b', deskripsi: 'Bila rumah sakit memberikan pelayanan rawat inap bagi pasien tuberkulosis paru dewasa maka rumah sakit harus memiliki ruang rawat inap yang memenuhi pedoman pencegahan danpengendalian infeksi tuberkulosis.', bukti: ['O'] },
                    { kode: 'EP c', deskripsi: 'Tersedia ruang pengambilan spesimen sputum yang memenuhi pedoman pencegahan dan pengendalian infeksi tuberkulosis.', bukti: ['O'] },
                ],
            },
            {
                kode: 'PROGNAS 2.2',
                deskripsi: 'Rumah sakit telah melaksanakan pelayanan tuberkulosis dan upaya pengendalian faktor risiko tuberkulosis sesuai peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan kepatuhan staf medis terhadap panduan praktik klinis tuberkulosis.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit merencanakan dan mengadakan penyediaan Obat Anti Tuberkulosis.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit melaksanakan pelayanan TB MDR (bagi rumah sakit rujukan TB MDR).', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit melaksanakan pencatatan dan pelaporan kasus TB Paru sesuai ketentuan.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Meningkatkan fungsi pelayanan penunjang yang meliputi pelayanan gizi, laboratorium dan radiologi, pencatatan dan pelaporan.' },
                ],
            },
            {
                kode: 'PROGNAS 3',
                deskripsi: 'Rumah sakit melaksanakan penanggulangan HIV/AIDS sesuai dengan peraturan perundang-undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan kebijakan program penanggulangan HIV/AIDS sesuai ketentuan perundangan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan fungsi rujukan HIV/AIDS pada rumah sakit sesuai dengan kebijakan yang berlaku.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit melaksanakan pelayanan PITC dan PMTC.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memberikan pelayanan ODHA dengan faktor risiko IO.', bukti: ['D'] },
                    { kode: 'EP e', deskripsi: 'Rumah sakit merencanakan dan mengadakan penyediaan ART.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Rumah sakit melakukan pemantauan dan evaluasi program penanggulangan HIV/AIDS.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PROGNAS 4',
                deskripsi: 'Rumah Sakit melaksanakan program penurunan prevalensi stunting dan wasting.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan kebijakan tentang pelaksanaan program gizi.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Terdapat tim untuk program penurunan prevalensi stunting dan wasting di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah menetapkan sistem rujukan untuk kasus gangguan gizi yang perlu penanganan lanjut.', bukti: ['R'] },
                ],
            },
            {
                kode: 'PROGNAS 4.1',
                deskripsi: 'Rumah Sakit melakukan edukasi, pendampingan intervensi dan pengelolaan gizi serta penguatan jejaring rujukan kepada rumah sakit kelas di bawahnya dan FKTP di wilayahnya serta rujukan masalah gizi.',
                epList: [
                    { kode: 'EP 11', deskripsi: 'Terselenggara kegiatan peningkatan kapasitas untuk meningkatkan kemampuan pelayanan PKBRS, termasuk KB Paska Persalinan dan Paska Keguguran.' },
                    { kode: 'EP 12', deskripsi: 'Pelaksanaan rujukan sesuai dengan ketentuan peraturan perundangan-undangan.' },
                    { kode: 'EP 13', deskripsi: 'Pelaporan dan analisis meliputi: a) Ketersediaan semua jenis alat dan obat kontrasepsi sesuai dengan kapasitas rumah sakit dan kebutuhan pelayanan KB. b) Ketersediaan sarana penunjang pelayanan KB. c) Ketersediaan tenaga medis dan tenaga kesehatan yang memberikan pelayanan KB. d) Angka capaian pelayanan KB per metode kontrasepsi, baik Metode Kontrasepsi Jangka Panjang (MKJP) dan Non MKJP. e) Angka capaian pelayanan KB Paska Persalinan dan Paska Keguguran. f) Kejadian tidak dilakukannya KB Paska ...' },
                    { kode: 'EP a', deskripsi: 'Rumah sakit membuktikan telah melakukan pendampingan intervensi dan pengelolaan gizi serta penguatan jejaring rujukan kepada rumah sakit kelas di bawahnya dan FKTP di wilayahnya serta rujukan masalah gizi.' },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan sistem pemantauan dan evaluasi, bukti pelaporan, dan analisis.' },
                    { kode: 'EP c', deskripsi: 'Meningkatkan kesiapan rumah sakit dalam melaksanakan PKBRS termasuk pelayanan KB Paska Persalinan dan Paska Keguguran.' },
                    { kode: 'EP d', deskripsi: 'Meningkatkan fungsi rumah sakit sebagai model dan pembinaan teknis dalam melaksanakan PKBRS.' },
                    { kode: 'EP e', deskripsi: 'Meningkatkan fungsi rumah sakit sebagai pusat rujukan pelayanan KB bagi sarana pelayanan kesehatan lainnya.' },
                    { kode: 'EP f', deskripsi: 'Melaksanakan sistem pemantauan dan evaluasi pelaksanaan PKBRS.' },
                    { kode: 'EP g', deskripsi: 'Adanya regulasi rumah sakit yang menjamin pelaksanaan PKBRS, meliputi SPO pelayanan KB per metode kontrasepsi termasuk pelayanan KB Paska Persalinan dan Paska Keguguran.' },
                    { kode: 'EP h', deskripsi: 'Upaya peningkatan PKBRS masuk dalam rencana strategis (Renstra) dan rencana kerja anggaran (RKA) rumah sakit.' },
                    { kode: 'EP i', deskripsi: 'Tersedia ruang pelayanan yang memenuhi persyaratan untuk PKBRS antara lain ruang konseling dan ruang pelayanan KB.' },
                    { kode: 'EP j', deskripsi: 'Pembentukan tim PKBR serta program kerja dan bukti pelaksanaanya.' },
                ],
            },
            {
                kode: 'PROGNAS 5',
                deskripsi: 'Rumah sakit melaksanakan program pelayanan keluarga berencana dan kesehatan reproduksi di rumah sakit beserta pemantauan dan evaluasinya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan kebijakan tentang pelaksanaan PKBRS.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Terdapat tim PKBRS yang ditetapkan oleh direktur disertai program kerjanya.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah melaksanakan program KB Pasca Persalinan dan Pasca Keguguran.', bukti: ['D'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah melakukan pemantauan dan evaluasi pelaksanaan PKBRS.', bukti: ['D'] },
                ],
            },
            {
                kode: 'PROGNAS 5.1',
                deskripsi: 'Rumah sakit menyiapkan sumber daya untuk penyelenggaraan pelayanan keluarga dan kesehatan reproduksi.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menyediakan alat dan obat kontrasepsi dan sarana penunjang pelayanan KB.', bukti: ['D', 'O'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menyediakan layanan konseling bagi peserta dan calon peserta program KB.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah merancang dan menyediakan ruang pelayanan KB yang memadai.', bukti: ['O'] },
                    { kode: 'EP d', deskripsi: 'membantu direktur rumah sakit dalam mengawasi dan mengevaluasi pelaksanaan program pengendalian resistensi antimikoba;' },
                    { kode: 'EP e', deskripsi: 'menyelenggarakan forum kajian kasus pengelolaan penyakit infeksi terintegrasi;' },
                    { kode: 'EP f', deskripsi: 'melakukan surveilans pola penggunaan antibiotik;' },
                    { kode: 'EP g', deskripsi: 'melakukan surveilans pola mikroba penyebab infeksi dan kepekaannya terhadap antibiotik;' },
                    { kode: 'EP h', deskripsi: 'menyebarluaskan serta meningkatkan pemahaman dan kesadaran tentang prinsip pengendalian resistensi antimikroba, penggunaan antibiotik secara bijak, dan ketaatan terhadap pencegahan pengendalian infeksi melalui kegiatan pendidikan dan pelatihan;' },
                    { kode: 'EP i', deskripsi: 'mengembangkan penelitian di bidang pengendalian resistensi antimikroba; dan' },
                    { kode: 'EP j', deskripsi: 'melaporkan kegiatan program pengendalian resistensi antimikroba kepada direktur rumah sakit. Rumah sakit menjalankan Program Pengendalian Resistensi Antimikroba (PPRA) sesuai dengan ketentuan peraturan perundang-undangan. Implementasi PPRA di rumah sakit dapat berjalan dengan baik, apabila mendapat dukungan penuh dari pimpinan rumah sakit dengan penetapan kebijakan, pembentukan organisasi pengelola program dalam bentuk komite/tim PPRA yang bertanggungjawab langsung kepada Direktur rumah sakit, p...' },
                ],
            },
            {
                kode: 'PROGNAS 6',
                deskripsi: 'Rumah sakit menyelenggarakan program pengendalian resistansi antimikroba (PPRA) sesuai peraturan perundang- undangan.',
                epList: [
                    { kode: 'EP a', deskripsi: '' },
                    { kode: 'EP b', deskripsi: '' },
                    { kode: 'EP c', deskripsi: '' },
                    { kode: 'EP d', deskripsi: '' },
                    { kode: 'EP e', deskripsi: '' },
                ],
            },
            {
                kode: 'PROGNAS 6.1',
                deskripsi: 'Rumah sakit mengembangkan dan menerapkan penggunaan antimikroba secara bijak berdasarkan prinsip penatagunaan antimikroba (PGA).',
                epList: [
                    { kode: 'EP a', deskripsi: '' },
                    { kode: 'EP b', deskripsi: '' },
                    { kode: 'EP c', deskripsi: '' },
                    { kode: 'EP d', deskripsi: '' },
                    { kode: 'EP e', deskripsi: '' },
                ],
            },
        ],
    },
    {
        pokjaCode: 'SKP',
        pokjaName: 'Sasaran Keselamatan Pasien',
        standarList: [
            {
                kode: 'SKP 1',
                deskripsi: 'Rumah sakit menerapkan proses untuk menjamin ketepatan identifikasi pasien',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menetapkan regulasi terkait Sasaran keselamatan pasien meliputi poin 1 – 6 pada gambaran umum.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan proses identifikasi pasien menggunakan minimal 2 (dua) identitas, dapat memenuhi tujuan identifikasi pasien dan sesuai dengan ketentuan rumah sakit.', bukti: ['O', 'W', 'S'] },
                    { kode: 'EP c', deskripsi: 'Pasien telah diidentifikasi menggunakan minimal dua jenis identitas meliputi poin 1) - 4) dalam maksud dan tujuan.', bukti: ['O', 'S', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memastikan pasien teridentifikasi dengan tepat pada situasi khusus, dan penggunaan label seperti tercantum dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'SKP 2',
                deskripsi: 'Rumah sakit menerapkan proses untuk meningkatkan efektivitas komunikasi lisan dan/atau telepon di antara para profesional pemberi asuhan (PPA), proses pelaporan hasil kritis pada pemeriksaan diagnostic termasuk POCT dan proses komunikasi saat serah terima (hand over) .',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan komunikasi saat menerima instruksi melalui telepon: menulis/menginput ke komputer - membacakan - konfirmasi kembali” (writedown, read back, confirmation dan SBAR saat melaporkan kondisi pasien kepada DPJP serta di dokumentasikan dalam rekam medik.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menerapkan komunikasi saat pelaporan hasil kritis pemeriksaan penunjang diagnostic melalui telepon: menulis/menginput ke komputer – membacakan – konfirmasi kembali” (writedown, read back, confirmation dan di dokumentasikan dalam rekam medik.', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah menerapkan komunikasi saat serah terima sesuai dengan jenis serah terima meliputi poin 1) - 3) dalam maksud dan tujuan.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Masalah peralatan yang perlu ditangani (bila ada). Rumah sakit dapat menggunakan Daftar tilik keselamatan operasi (Surgical Safety Checklist dari WHO terkini).' },
                ],
            },
            {
                kode: 'SKP 3',
                deskripsi: 'Rumah sakit menerapkan proses untuk meningkatkan keamanan penggunaan obat yang memerlukan kewaspadaan tinggi (high alert medication) termasuk obat Look - Alike Sound Alike (LASA).',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menetapkan daftar obat kewaspadaan tinggi (High Alert) termasuk obat Look -Alike Sound Alike (LASA).', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit menerapkan pengelolaan obat kewaspadaan tinggi (High Alert) termasuk obat Look -Alike Sound Alike (LASA) secara seragam di seluruh area rumah sakit untuk mengurangi risiko dan cedera', bukti: ['O', 'W'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit mengevaluasi dan memperbaharui daftar obat High-Alert dan obat Look -Alike Sound Alike (LASA) yang sekurang-kurangnya 1 (satu) tahun sekali berdasarkan laporan insiden lokal, nasional dan internasional.' },
                ],
            },
            {
                kode: 'SKP 3.1',
                deskripsi: 'Rumah sakit menerapkan proses untuk meningkatkan keamanan penggunaan elektrolit konsentrat',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit menerapkan proses penyimpanan elektrolit konsentrat tertentu hanya di Instalasi Farmasi, kecuali di unit pelayanan dengan pertimbangan klinis untuk mengurangi risiko dan cedera pada penggunaan elektrolit konsentrat.' },
                    { kode: 'EP b', deskripsi: 'Penyimpanan elektrolit konsentrat di luar Instalasi Farmasi diperbolehkan hanya dalam untuk situasi yang ditentukan sesuai dalam maksud dan tujuan.' },
                    { kode: 'EP c', deskripsi: 'Rumah sakit menetapkan dan menerapkan protokol koreksi hipokalemia, hiponatremia, hipofosfatemia.' },
                ],
            },
            {
                kode: 'SKP 4',
                deskripsi: 'Rumah sakit menetapkan proses untuk melaksanakan verifikasi pra opearsi, penandaan lokasi operasi dan proses time-out yang dilaksanakan sesaat sebelum tindakan pembedahan/invasif dimulai serta proses sign-out yang dilakukan setelah tindakan selesai.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan proses verifikasi pra operasi dengan daftar tilik untuk memastikan benar pasien, benar tindakan dan benar sisi.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah menetapkan dan menerapkan tanda yang seragam, mudah dikenali dan tidak bermakna ganda untuk mengidentifikasi sisi operasi atau tindakan invasif.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit telah menerapkan penandaan sisi operasi atau tindakan invasif (site marking) dilakukan oleh dokter operator/dokter asisten yang melakukan operasi atau tindakan invasif dengan melibatkan pasien bila memungkinkan.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit telah menerapkan proses Time-Out menggunakan “surgical check list” (Surgical Safety Checklist dari WHO terkini pada tindakan operasi termasuk tindakan medis invasif.', bukti: ['D'] },
                ],
            },
            {
                kode: 'SKP 5',
                deskripsi: 'Rumah sakit menerapkan kebersihan tangan (hand hygiene) untuk menurunkan risiko infeksi terkait layanan kesehatan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah menerapkan kebersihan tangan (hand hygiene) yang mengacu pada standar WHO terkini.', bukti: ['O', 'W', 'S'] },
                    { kode: 'EP b', deskripsi: 'Terdapat proses evaluasi terhadap pelaksanaan program kebersihan tangan di rumah sakit serta upaya perbaikan yang dilakukan untuk meningkatkan pelaksanaan program.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'situasi misalnya pasien yang mendapatkan sedasi atau pasien dengan riwayat tirah baring/perawatan yang lama yang akan dipindahkan untuk pemeriksaan penunjang dari ambulans, perubahan posisi akan meningkatkan risiko jatuh.' },
                    { kode: 'EP d', deskripsi: 'lokasi misalnya area-area yang berisiko pasien jatuh, yaitu tangga, area yang penerangannya kurang atau mempunyai unit pelayanan dengan peralatan parallel bars, freestanding staircases seperti unit rehabilitasi medis. Ketika suatu lokasi tertentu diidentifikasi sebagai area risiko tinggi yang lebih rumah sakit dapat menentukan bahwa semua pasien yang mengunjungi lokasi tersebut akan dianggap berisiko jatuh dan menerapkan langkah-langkah untuk mengurangi risiko jatuh yang berlaku untuk semua pasi...' },
                ],
            },
            {
                kode: 'SKP 6.1',
                deskripsi: 'Rumah sakit menerapkan proses untuk mengurangi risiko cedera pasien akibat jatuh di rawat inap.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melakukan pengkajian risiko jatuh untuk semua pasien rawat inap baik dewasa maupun anak menggunakan metode pengkajian yang baku sesuai dengan ketentuan rumah sakit.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Rumah sakit telah melaksanakan pengkajian ulang risiko jatuh pada pasien rawat inap karena adanya perubahan kondisi, atau memang sudah mempunyai risiko jatuh dari hasil pengkajian.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Tindakan dan/atau intervensi untuk mengurangi risiko jatuh pada pasien rawat inap telah dilakukan dan didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Meningkatkan kesiapan rumah sakit dalam melaksanakan fungsi pelayanan obstetric dan neonates termasuk pelayanan kegawatdaruratan (PONEK 24 jam).' },
                    { kode: 'EP e', deskripsi: 'Meningkatkan fungsi rumah sakit sebagai model dan Pembina teknis dalam pelaksanaan IMD dan ASI Eksklusif serta Perawatan Metode Kanguru (PMK) pada BBLR' },
                    { kode: 'EP f', deskripsi: 'Meningkatkan fungsi rumah sakit sebagai pusat rujukan pelayanan kesehatan ibu dan bayi bagi sarana pelayanan kesehatan lainnya.' },
                    { kode: 'EP g', deskripsi: 'Melaksanakan pemantauan dan evaluasi pelaksanaan program RSSIB 10 langkah menyusui dan peningkatan kesehatan ibu' },
                    { kode: 'EP h', deskripsi: 'Melakukan pemantauan dan analisis yang meliputi: a) Angka keterlambatan operasi section caesaria b) Angka kematian ibu dan anak c) Kejadian tidak dilakukannya inisiasi menyusui dini (IMD) pada bayi baru lahir.' },
                ],
            },
            {
                kode: 'SKP 6',
                deskripsi: 'Rumah sakit menerapkan proses untuk mengurangi risiko cedera pasien akibat jatuh di rawat jalan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Rumah sakit telah melaksanakan skrining pasien rawat jalan pada kondisi, diagnosis, situasi atau lokasi yang dapat menyebabkan pasien berisiko jatuh, dengan menggunakan alat bantu/metode skrining yang ditetapkan rumah sakit', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP b', deskripsi: 'Tindakan dan/atau intervensi dilakukan untuk mengurangi risiko jatuh pada pasien jika hasil skrining menunjukkan adanya risiko jatuh dan hasil skrining serta intervensi didokumentasikan.', bukti: ['D', 'O', 'W'] },
                ],
            },
        ],
    },
    {
        pokjaCode: 'TKRS',
        pokjaName: 'Tata Kelola Rumah Sakit',
        standarList: [
            {
                kode: 'TKRS 1',
                deskripsi: 'Struktur organisasi serta wewenang representasi pemilik/dewan pengawas dijelaskan di dalam aturan internal rumah sakit (Hospital byLaws) yang ditetapkan oleh pemilik rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Representasi pemilik/Dewan Pengawas dipilih dan ditetapkan oleh Pemilik.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Tanggung jawab dan wewenang representasi pemilik/Dewan Pengawas meliputi poin a) sampai dengan i) yang tertera di dalam maksud dan tujuan serta dijelaskan di dalam peraturan internal rumah sakit.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Representasi pemilik/Dewan Pengawas di evaluasi oleh pemilik setiap tahun dan hasil evaluasinya didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Representasi pemilik/Dewan Pengawas menetapkan visi misi rumah sakit yang diarahkan oleh pemilik.', bukti: ['R'] },
                    { kode: 'EP e', deskripsi: 'Mengelola dan mengendalikan sumber daya manusia, keuangan dan sumber daya lainnya' },
                    { kode: 'EP f', deskripsi: 'Merekomendasikan sejumlah kebijakan, rencana strategis, dan anggaran kepada Representatif pemilik/Dewan Pengawas untuk mendapatkan persetujuan' },
                    { kode: 'EP g', deskripsi: 'Menetapkan prioritas perbaikan Tingkat rumah sakit yaitu perbaikan yang akan berdampak luas/menyeluruh di rumah sakit yang akan dilakukan pengukuran sebagai indikator mutu prioritas rumah sakit' },
                    { kode: 'EP h', deskripsi: 'Melaporkan hasil pelaksanaan program mutu dan keselamatan pasien meliputi pengukuran data dan laporan semua insiden keselamatan pasien secara berkala setiap 3 (tiga) bulan kepada Representasi pemilik/Dewan Pengawas.' },
                    { kode: 'EP i', deskripsi: 'Melaporkan hasil pelaksanaan program manajemen risiko kepada Representasi pemilik/Dewan Pengawas setiap 6 (enam) bulan.' },
                ],
            },
            {
                kode: 'TKRS 2',
                deskripsi: 'Direktur rumah sakit bertanggung jawab untuk menjalankan rumah sakit dan mematuhi peraturan dan perundang- undangan dan kebijakan rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Telah menetapkan regulasi tentang kualifikasi Direktur, uraian tugas, tanggung jawab dan wewenang sesuai dengan persyaratan dan peraturan perundang- undangan yang berlaku.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Direktur menjalankan operasional rumah sakit sesuai tanggung jawabnya yang meliputi namun tidak terbatas pada poin a) sampai dengan i) dalam maksud dan tujuan yang dituangkan dalam uraian tugasnya.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Memiliki bukti tertulis tanggung jawab Direktur telah dilaksanakan dan dievaluasi oleh pemilik/representasi pemilik setiap tahun dan hasil evaluasinya didokumentasikan.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Memiliki bukti tertulis tanggung jawab Direktur telah dilaksanakan dan dievaluasi oleh pemilik/representasi pemilik setiap tahun dan hasil evaluasinya didokumentasikan.' },
                ],
            },
            {
                kode: 'TKRS 3',
                deskripsi: 'Pimpinan rumah sakit (direktur dan pimpinan rumah sakit lain/wakil direktur rumah sakit) menyusun misi, rencana kerja dan kebijakan untuk memenuhi misi rumah sakit serta merencanakan dan menentukan jenis pelayanan klinis untuk memenuhi kebutuhan pasien yang dilayani rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur menunjuk pimpinan rumah sakit lain dan kepala unit sesuai kualifikasi dalam persyaratan jabatan yang telah ditetapkan beserta uraian tugasnya.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Pimpinan rumah sakit bertanggung jawab untuk melaksanakan misi yang telah ditetapkan dan memastikan kebijakan serta prosedur dilaksanakan.', bukti: ['W'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit bersama dengan pimpinan unit merencanakan dan menentukan jenis pelayanan klinis untuk memenuhi kebutuhan pasien yang dilayani rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memberikan informasi tentang pelayanan yang disediakan kepada tokoh masyarakat, para pemangku kepentingan, fasilitas pelayanan kesehatan lain di sekitar rumah sakit, dan terdapat proses untuk menerima masukan bagi peningkatan pelayanannya.', bukti: ['D'] },
                ],
            },
            {
                kode: 'TKRS 3.1',
                deskripsi: 'Pimpinan rumah sakit memastikan komunikasi yang efektif telah dilaksanakan secara menyeluruh di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit memastikan bahwa terdapat proses untuk menyampaikan informasi dalam lingkungan rumah sakit secara akurat dan tepat waktu.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pimpinan rumah sakit memastikan bahwa komunikasi yang efektif antara unit klinis dan nonklinis, antara PPA dengan manajemen, antar PPA dengan pasien dan keluarga serta antar staf telah dilaksanakan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit telah mengkomunikasikan visi, misi, tujuan, rencana strategis dan kebijakan, rumah sakit kepada semua staf.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'TKRS 4',
                deskripsi: 'Pimpinan rumah sakit (direktur dan pimpinan rumah sakit lain/wakil direktur) merencanakan, mengembangkan, dan menerapkan program peningkatan mutu dan keselamatan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit berpartisipasi dalam merencanakan mengembangkan dan menerapkan program peningkatan mutu dan keselamatan pasien di lingkungan rumah sakit.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pimpinan rumah sakit memilih dan menetapkan proses pengukuran, pengkajian data, rencana perbaikan dan mempertahankan peningkatan mutu dan keselamatan pasien di lingkungan rumah sakit', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit memastikan terlaksananya program PMKP termasuk memberikan dukungan teknologi dan sumber daya yang adekuat serta menyediakan pendidikan staf tentang peningkatan mutu dan keselamatan pasien di rumah sakit agar dapat berjalan secara efektif.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pimpinan rumah sakit menetapkan mekanisme pemantauan dan koordinasi program peningkatan mutu dan keselamatan pasien.', bukti: ['R'] },
                    { kode: 'EP e', deskripsi: 'Manajemen risiko untuk melakukan perbaikan secara proaktif terhadap proses berisiko tinggi misalnya yang telah dilakukan analisis FMEA atau dapat diambil dari profil risiko' },
                    { kode: 'EP f', deskripsi: 'Penelitian klinis dan program pendidikan kesehatan (apabila ada). Untuk memilih prioritas pengukuran dan perbaikan menggunakan kriteria prioritas mencakup:' },
                    { kode: 'EP g', deskripsi: 'Ketentuan Pemerintah / Persyaratan Eksternal, seperti layanan unggulan kanker, jantung, stroke dan uronephrologi (KJSU).' },
                    { kode: 'EP h', deskripsi: 'Sesuai dengan tujuan strategis rumah sakit.' },
                    { kode: 'EP i', deskripsi: 'Memberikan pengalaman pasien lebih baik (patient experience), seperti waktu tunggu rawat jalan, waktu pelayanan dokter. Pimpinan rumah sakit berpartisipasi dalam penentuan pengukuran perbaikan. Penentuan prioritas terukur dapat menggunakan skoring prioritas. Pimpinan rumah sakit akan menilai dampak perbaikan dapat berupa:' },
                ],
            },
            {
                kode: 'TKRS 5',
                deskripsi: 'Pimpinan rumah sakit berpartisipasi dalam menetapkan prioritas perbaikan di tingkat rumah sakit yang merupakan proses yang berdampak luas/menyeluruh di rumah sakit termasuk di dalamnya kegiatan keselamatan pasien serta analisis dampak dari perbaikan yang telah dilakukan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit menggunakan data yang tersedia (data based) dalam menetapkan indikator prioritas rumah sakit yang perbaikannya akan berdampak luas/menyeluruh meliputi poin a) – f) dalam maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Dalam memilih prioritas perbaikan di tingkat rumah sakit maka pimpinan rumah sakit mengggunakan kriteria prioritas meliputi poin a) – i) dalam maksud dan tujuan.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit mengkaji dampak perbaikan primer dan dampak perbaikan sekunder pada indikator prioritas rumah sakit yang ditetapkan di tingkat rumah sakit maupun tingkat unit.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'dalam maksud dan tujuan, sebagai acuan untuk memilih indikator prioritas. (lihat maksud dan tujuan di PMKP 3)', bukti: ['W'] },
                ],
            },
            {
                kode: 'TKRS 6',
                deskripsi: 'Pimpinan Rumah Sakit bertanggung jawab untuk mengkaji, memilih, dan memantau kontrak klinis dan nonklinis serta melakukan evaluasi termasuk inspeksi kepatuhan layanan sesuai kontrak yang disepakati.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit bertanggung jawab terhadap kontrak untuk memenuhi kebutuhan pasien dan manajemen termasuk ruang lingkup pelayanan tersebut yang dicantumkan dalam persetujuan kontrak.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Tenaga kesehatan yang dikontrak perlu dilakukan kredensial sesuai ketentuan di rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit menginspeksi kepatuhan layanan kontrak sesuai kebutuhan', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Apabila kontrak dinegosiasikan ulang atau dihentikan, rumah sakit tetap mempertahankan kelanjutan dari pelayanan pasien', bukti: ['R'] },
                    { kode: 'EP e', deskripsi: 'Semua kontrak menetapkan data mutu yang harus dilaporkan kepada rumah sakit, disertai frekuensi dan mekanisme pelaporan, serta bagaimana rumah sakit akan merespons jika persyaratan atau ekspektasi mutu tidak terpenuhi.', bukti: ['R'] },
                    { kode: 'EP f', deskripsi: 'Pimpinan klinis dan non klinis yang terkait layanan yang dikontrak melakukan analisis dan memantau informasi mutu yang dilaporkan pihak yang dikontrak yang merupakan bagian dalam program penigkatan mutu dan keselamatan pasien rumah sakit.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'TKRS 7',
                deskripsi: 'Pimpinan rumah sakit membuat keputusan tentang pengadaan dan pembelian. Penggunaan sumber daya manusia dan sumber daya lainnya harus berdasarkan pertimbangan mutu dan dampaknya pada keselamatan.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit menggunakan data dan informasi mutu serta dampak terhadap keselamatan untuk membuat keputusan pembelian dan penggunaan peralatan baru.', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Pimpinan rumah sakit menggunakan data dan informasi mutu serta dampak terhadap keselamatan dalam pemilihan, penambahan, pengurangan dan melakukan rotasi staf.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit menggunakan rekomendasi dari organisasi profesional dan sumber berwenang lainnya dalam mengambil keputusan mengenai pengadaan sumber daya.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Pimpinan rumah sakit memberikan arahan, dukungan, dan pengawasan terhadap penggunaan sumber daya Teknologi informasi Kesehatan (TIK)', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Pimpinan rumah sakit memberikan arahan, dukungan, dan pengawasan terhadap pelaksanaan program penanggulangan kedaruratan dan bencana.', bukti: ['D', 'W'] },
                    { kode: 'EP f', deskripsi: 'Pimpinan rumah sakit memantau hasil keputusannya dan menggunakan data tersebut untuk mengevaluasi dan memperbaiki mutu keputusan pembelian dan pengalokasian sumber daya.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'TKRS 7.1',
                deskripsi: 'Pimpinan rumah sakit mencari dan menggunakan data serta informasi tentang keamanan dalam rantai perbekalan untuk melindungi pasien dan staf terhadap produk yang tidak stabil, terkontaminasi, rusak, dan palsu.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit menentukan obat-obatan, perbekalan medis, serta peralatan medis yang paling berisiko dan membuat bagan alur rantai perbekalannya.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Pimpinan rumah sakit menentukan titik paling berisiko dalam bagan alur rantai perbekalan dan membuat keputusan berdasarkan risiko dalam rantai perbekalan tersebut.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Rumah sakit memiliki proses untuk melakukan pelacakan retrospektif terhadap perbekalan yang diduga tidak stabil, terkontaminasi, rusak, atau palsu.', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit memberitahu produsen dan/atau distributor bila menemukan perbekalan yang tidak stabil, terkontaminasi, rusak, atau palsu.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'TKRS 8',
                deskripsi: 'Komite Medik, Komite Keperawatan dan Komite Tenaga Kesehatan Lain menerapkan pengorganisasisannya sesuai peraturan perundang-undangan untuk mendukung tanggung jawab serta wewenang mereka.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Terdapat struktur organisasi Komite Medik, Komite Keperawatan, dan Komite Tenaga Kesehatan Lain yang ditetapkan Direktur sesuai peraturan perundang- undangan yang berlaku.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Komite Medik, Komite Keperawatan dan Komite Tenaga Kesehatan Lain melaksanakan tanggung jawabnya mencakup (a-d) dalam maksud dan tujuan.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Untuk melaksanakan tanggung jawabnya Komite Medik, Komite Keperawatan, dan Komite Tenaga Kesehatan Lain menyusun Program kerja setiap tahun dan ditetapkan oleh Direktur.', bukti: ['R'] },
                ],
            },
            {
                kode: 'TKRS 9',
                deskripsi: 'Unit layanan di rumah sakit dipimpin oleh kepala unit yang ditetapkan oleh Direktur sesuai dengan kompetensinya untuk mengarahkan kegiatan di unitnya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Kepala unit kerja diangkat sesuai kualifikasi dalam persyaratan jabatan yang ditetapkan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Kepala unit kerja menyusun pedoman pengorganisasian, pedoman pelayanan dan prosedur sesuai proses bisnis di unit kerja.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Kepala unit kerja menyusun program kerja yang termasuk di dalamnya kegiatan peningkatan mutu dan keselamatan pasien serta manajemen risiko setiap tahun.', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Kepala unit kerja mengusulkan kebutuhan sumber daya mencakup ruangan, peralatan medis, teknologi informasi dan sumber daya lain yang diperlukan unit layanan serta terdapat mekanisme untuk menanggapi kondisi jika terjadi kekurangan tenaga.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Kepala unit kerja telah melakukan koordinasi dan integrasi baik dalam unitnya maupun antar unit layanan.', bukti: ['D', 'W'] },
                ],
            },
            {
                kode: 'TKRS 10',
                deskripsi: 'Kepala unit layanan berpartisipasi dalam meningkatkan mutu dan keselamatan pasien dengan melakukan pengukuran indikator mutu rumah sakit yang dapat diterapkan di unitnya dan memantau serta memperbaiki pelayanan pasien di unit layanannya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Kepala unit klinis/non klinis melakukan pengukuran INM yang sesuai dengan pelayanan yang diberikan oleh unitnya', bukti: ['D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Kepala unit klinis/non klinis melakukan pengukuran IMP-RS yang sesuai dengan pelayanan yang diberikan oleh unitnya, termasuk semua layanan kontrak yang menjadi tanggung jawabnya.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'Kepala unit klinis/non klinis menerapkan pengukuran IMP-Unit untuk mengurangi variasi dan memperbaiki proses dalam unitnya,', bukti: ['D', 'W'] },
                    { kode: 'EP d', deskripsi: 'Kepala unit klinis/non klinis memilih prioritas perbaikan yang baru bila perbaikan sebelumnya sudah dapat dipertahankan dalam waktu 1 (satu) tahun.', bukti: ['D'] },
                ],
            },
            {
                kode: 'TKRS 11',
                deskripsi: 'Kepala unit klinis mengevaluasi kinerja para dokter, perawat dan tenaga kesehatan profesional lainnya menggunakan indikator mutu yang diukur di unitnya.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Penilaian praktik profesional berkelanjutan (On going Professional Practice Evaluation) para dokter dalam memberikan pelayanan untuk meningkatkan mutu dan keselamatan pasien menggunakan indikator mutu yang diukur di unit tersebut.', bukti: ['D'] },
                    { kode: 'EP b', deskripsi: 'Penilaian kinerja para perawat dalam memberikan pelayanan untuk meningkatkan mutu dan keselamatan pasien menggunakan indikator mutu yang diukur di unit tersebut.', bukti: ['D'] },
                    { kode: 'EP c', deskripsi: 'Penilaian kinerja tenaga kesehatan lainnya memberikan pelayanan untuk meningkatkan mutu dan keselamatan pasien menggunakan indikator mutu yang diukur di unit tersebut.', bukti: ['D'] },
                ],
            },
            {
                kode: 'TKRS 12',
                deskripsi: 'Pimpinan rumah sakit menetapkan kerangka kerja pengelolaan etik rumah sakit untuk menangani masalah etik rumah sakit meliputi finansial, pemasaran, penerimaan pasien, transfer pasien, pemulangan pasien dan yang lainnya termasuk konflik etik antar profesi serta konflik kepentingan staf yang mungkin bertentangan dengan hak dan kepentingan pasien.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Direktur rumah sakit menetapkan Komite Etik rumah sakit.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Komite Etik telah menyusun kode etik rumah sakit yang mengacu pada Kode Etik Rumah Sakit Indonesia (KODERSI) dan ditetapkan Direktur.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Komite Etik telah menyusun kerangka kerja pelaporan dan pengelolaan etik rumah sakit serta pedoman pengelolaan kode etik rumah sakit meliputi poin (1) sampai dengan (12) dalam maksud dan tujuan sesuai dengan visi, misi, dan nilai-nilai yang dianut rumah sakit.', bukti: ['R'] },
                    { kode: 'EP d', deskripsi: 'Rumah sakit menyediakan sumber daya serta pelatihan kerangka pengelolaan etik rumah sakit bagi praktisi kesehatan dan staf lainnya dan memberikan solusi yang efektif dan tepat waktu untuk masalah etik.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'identifikasi dan mengenali masalah akibat perilaku yang tidak diinginkan (perilaku sembrono).' },
                    { kode: 'EP f', deskripsi: 'evaluasi budaya secara berkala dengan metode seperti kelompok fokus diskusi (FGD), wawancara dengan staf, dan analisis data.' },
                    { kode: 'EP g', deskripsi: 'mendorong kerja sama dan membangun sistem, dalam mengembangkan budaya perilaku yang aman.' },
                    { kode: 'EP h', deskripsi: 'menanggapi perilaku yang tidak diinginkan pada semua staf pada semua jenjang di rumah sakit, termasuk manajemen, staf administrasi, staf klinis dan nonklinis, dokter praktisi mandiri, representasi pemilik dan anggota Dewan pengawas Perilaku yang tidak mendukung budaya keselamatan di antaranya adalah: perilaku yang tidak layak seperti katakata atau bahasa tubuh yang merendahkan atau menyinggung perasaan sesama staf, misalnya mengumpat dan memaki, perilaku yang mengganggu, bentuk tindakan verbal a...' },
                ],
            },
            {
                kode: 'TKRS 13',
                deskripsi: 'Pimpinan rumah sakit menerapkan, memantau dan mengambil tindakan serta mendukung Budaya Keselamatan di seluruh area rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'pimpinan rumah sakit menetapkan program budaya keselamatan yang mencakup poin a) sampai dengan h) dalam maksud dan tujuan serta mendukung penerapannya secara akuntabel dan transparan.', bukti: ['R', 'D'] },
                    { kode: 'EP b', deskripsi: 'pimpinan rumah sakit menyelenggarakan pendidikan dan menyediakan informasi (kepustakaan dan laporan) terkait budaya keselamatan bagi semua staf yang bekerja di rumah sakit.', bukti: ['D', 'W'] },
                    { kode: 'EP c', deskripsi: 'pimpinan rumah sakit menyediakan sumber daya untuk mendukung dan mendorong budaya keselamatan di rumah sakit.', bukti: ['D', 'O'] },
                    { kode: 'EP d', deskripsi: 'pimpinan rumah sakit mengembangkan sistem yang rahasia, sederhana dan mudah diakses bagi staf untuk mengidentifikasi dan melaporkan perilaku yang tidak diinginkan dan menindaklanjutinya.', bukti: ['D', 'O', 'W'] },
                    { kode: 'EP e', deskripsi: 'pimpinan rumah sakit melakukan pengukuran untuk mengevaluasi dan memantau budaya keselamatan di rumah sakit serta hasil yang diperoleh dipergunakan untuk perbaikan penerapannya di rumah sakit.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Pimpinan rumah sakit menerapkan budaya adil (just culture) terhadap staf yang terkait laporan budaya keselamatan tersebut.', bukti: ['D', 'W'] },
                    { kode: 'EP g', deskripsi: 'Pemantauan risiko. Program manajemen risiko rumah sakit harus disusun setiap tahun berdasarkan daftar risiko yang diprioritaskan dalam profil risiko meliputi:' },
                ],
            },
            {
                kode: 'TKRS 14',
                deskripsi: 'Program manajemen risiko yang terintegrasi digunakan untuk mencegah terjadinya cedera dan kerugian di rumah sakit.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit berpartisipasi dan menetapkan program manajemen risiko tingkat rumah sakit meliputi poin a) sampai dengan d) dalam maksud dan tujuan.', bukti: ['R'] },
                    { kode: 'EP b', deskripsi: 'Pimpinan rumah sakit memantau penyusunan daftar risiko yang diprioritaskan menjadi profil risiko di tingkat rumah sakit.', bukti: ['D'] },
                ],
            },
            {
                kode: 'TKRS 15',
                deskripsi: 'Pimpinan rumah sakit bertanggung jawab terhadap mutu dan keamanan dalam program penelitian bersubjek manusia.',
                epList: [
                    { kode: 'EP a', deskripsi: 'Pimpinan rumah sakit menetapkan penanggung jawab program penelitian di dalam rumah sakit yang memastikan semua proses telah sesuai dengan kode etik penelitian dan persyaratan lainnya sesuai peraturan perundang-undangan.', bukti: ['R', 'D', 'W'] },
                    { kode: 'EP b', deskripsi: 'Terdapat proses untuk menyelesaian konflik kepentingan (finansial dan non finansial) yang terjadi akibat penelitian di rumah sakit.', bukti: ['R'] },
                    { kode: 'EP c', deskripsi: 'Pimpinan rumah sakit telah mengidentifikasi fasilitas dan sumber daya yang diperlukan untuk melakukan penelitian, termasuk di dalam nya kompetensi sumber daya yang akan berpartisipasi di dalam penelitian sebagai pimpinan dan anggota tim peneliti.', bukti: ['R', 'D'] },
                    { kode: 'EP d', deskripsi: 'Terdapat proses yang memastikan bahwa seluruh pasien yang ikut di dalam penelitian telah melalui proses persetujuan tertulis (informed consent) untuk melakukan penelitian, tanpa adanya paksaan untuk mengikuti penelitian dan telah mendapatkan informasi mengenai lamanya penelitian, prosedur yang harus dilalui, siapa yang dapat dikontak selama penelitian berlangsung, manfaat, potensial risiko serta alternatif pengobatan lainnya.', bukti: ['D', 'W'] },
                    { kode: 'EP e', deskripsi: 'Apabila penelitian dilakukan oleh pihak ketiga (kontrak), maka pimpinan rumah sakit memastikan bahwa pihak ketiga tersebut bertanggung jawab dalam pemantauan dan evaluasi dari mutu, keamanan dan etika dalam penelitian.', bukti: ['D'] },
                    { kode: 'EP f', deskripsi: 'Penanggung jawab penelitian melakukan kajian dan evaluasi terhadap seluruh penelitian yang dilakukan di rumah sakit setidaknya 1 (satu) tahun sekali.', bukti: ['D', 'W'] },
                    { kode: 'EP g', deskripsi: 'Seluruh kegiatan penelitian merupakan bagian dari program mutu rumah sakit dan dilakukan pemantauan serta evaluasinya secara berkala sesuai ketetapan rumah sakit.', bukti: ['R', 'D', 'W'] },
                ],
            },
        ],
    },
]

/** Cari standar data berdasarkan kode pokja */
export function getStandarByPokja(pokjaCode: string): PokjaStandarData | undefined {
    return MASTER_STANDAR_EP.find(p => p.pokjaCode === pokjaCode)
}

/** Hitung total EP di seluruh pokja */
export function hitungTotalEPSemua(): number {
    return MASTER_STANDAR_EP.reduce((total, pokja) => {
        return total + pokja.standarList.reduce((t, s) => t + s.epList.length, 0)
    }, 0)
}
