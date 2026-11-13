import {
  InformasiItem,
  KegiatanItem,
  PembangunanItem,
  PendudukStat,
  KeuanganSummary,
  PengurusItem,
  GaleriItem,
  MapMarkerItem,
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_waringinsari_neighborhood_1794454309976.jpg';
export const KERJA_BAKTI_IMAGE = '/src/assets/images/warga_kerja_bakti_1794454310295.jpg';
export const SARPRAS_IMAGE = '/src/assets/images/sarpras_pembangunan_1794454309984.jpg';
export const POS_RONDA_IMAGE = '/src/assets/images/pos_ronda_waringinsari_1794454311227.jpg';

export const WILAYAH_INFO = {
  nama: 'RT 01',
  dusun: 'Waringinsari',
  kalurahan: 'Condongcatur',
  kapanewon: 'Depok',
  kabupaten: 'Sleman',
  provinsi: 'Daerah Istimewa Yogyakarta',
  kodePos: '55283',
  koordinatPusat: { lat: -7.7664, lng: 110.4045 },
  deskripsi:
    'RT 01 Waringinsari terletak di kawasan Condongcatur, Depok, Sleman. Lingkungan ini memadukan ketenangan permukiman warga Yogyakarta dengan dinamika kawasan penyangga perkotaan dan pusat pendidikan, di mana warga dan pelaku usaha saling berinteraksi menjaga kebersihan, ketertiban, dan kebersamaan.',
};

export const DEMO_NOTICE = {
  badge: 'Contoh Tampilan / Data Ilustrasi',
  description:
    'Angka statistik, nama kepengurusan, transaksi kas, dan detail proyek di bawah ini merupakan data demo terstruktur untuk kebutuhan pratinjau desain antarmuka. Data resmi akan diperbarui oleh pengurus RT 01 saat integrasi data final.',
};

export const PENDUDUK_DATA: PendudukStat = {
  totalPenduduk: 248,
  jumlahKK: 74,
  lakiLaki: 122,
  perempuan: 126,
  pelakuUsaha: 18,
  updatePeriod: 'Semester I / 2026',
  isDemo: true,
  demographics: [
    { category: 'Usia Anak & Remaja (0–17 th)', count: 48, percentage: 19.4 },
    { category: 'Usia Produktif (18–59 th)', count: 162, percentage: 65.3 },
    { category: 'Usia Lanjut / Lansia (60+ th)', count: 38, percentage: 15.3 },
    { category: 'Kepala Keluarga (KK)', count: 74, percentage: 29.8 },
  ],
};

export const INFORMASI_LIST: InformasiItem[] = [
  {
    id: 'info-1',
    slug: 'jadwal-kerja-bakti-saluran-air-musim-penghujan',
    title: 'Kerja Bakti Bersama Pembersihan Saluran Air & Drainase Lingkungan',
    category: 'Agenda',
    date: '14 November 2026',
    author: 'Pengurus RT 01',
    summary:
      'Warga diimbau berpartisipasi dalam agenda pembersihan saluran drainase dan perapian dahan pohon menjelang puncak musim penghujan.',
    content: [
      'Menghadapi datangnya musim penghujan di wilayah Condongcatur dan sekitarnya, seluruh warga RT 01 Waringinsari diundang untuk bergotong-royong dalam kegiatan kerja bakti lingkungan.',
      'Fokus kegiatan adalah membersihkan endapan sedimen pada saluran drainase terbuka di sepanjang jalan utama RT, memotong ranting pohon yang berpotensi membahayakan kabel listrik, serta memastikan resapan air berfungsi optimal.',
      'Warga diharapkan membawa perkakas kebersihan pribadi seperti cangkul, sapu lidi, atau karung sampah. Pengurus menyediakan konsumsi sederhana dan kantong penampung limbah organik.',
    ],
    imageUrl: KERJA_BAKTI_IMAGE,
    isFeatured: true,
    isImportant: true,
  },
  {
    id: 'info-2',
    slug: 'sosialisasi-pilah-sampah-mandiri-lingkungan',
    title: 'Gerakan Pilah Sampah Mandiri dan Pengelolaan Organik Rumah Tangga',
    category: 'Pengumuman',
    date: '08 November 2026',
    author: 'Seksi Lingkungan Hidup',
    summary:
      'Himbauan kelanjutan program pilah sampah organik dan anorganik dari rumah tangga sesuai regulasi persampahan Kabupaten Sleman.',
    content: [
      'Sebagai tindak lanjut dari kebijakan pengelolaan sampah terpadu di Kabupaten Sleman dan Kalurahan Condongcatur, warga RT 01 Waringinsari diharapkan terus memilah sampah organik dan residu dari dapur masing-masing.',
      'Sampah anorganik bernilai ekonomis dapat disetorkan setiap minggu ke wadah pemilahan kolektif di samping Pos Ronda, sedangkan sampah organik dianjurkan untuk dikomposkan menggunakan biopori atau ember tumpuk.',
    ],
    imageUrl: HERO_IMAGE,
    isFeatured: false,
    isImportant: false,
  },
  {
    id: 'info-3',
    slug: 'musyawarah-warga-pembahasan-penerangan-jalan',
    title: 'Musyawarah Warga Pembahasan Usulan Lampu Penerangan Jalan Tenaga Surya',
    category: 'Informasi RT',
    date: '02 November 2026',
    author: 'Sekretariat RT 01',
    summary:
      'Hasil notulen pertemuan warga membahas rencana pemasangan 4 titik lampu penerangan jalan mandiri hemat energi di gang permukiman.',
    content: [
      'Pada pertemuan rutin malam Minggu lalu, warga menyepakati alokasi dana stimulan untuk pengadaan empat tiang lampu surya mandiri di beberapa sudut gang yang masih minim pencahayaan.',
      'Pengerjaan fisik direncanakan berlangsung bertahap selama bulan November dengan dukungan tenaga sukarela dari warga setempat.',
    ],
    imageUrl: SARPRAS_IMAGE,
    isFeatured: false,
    isImportant: false,
  },
  {
    id: 'info-4',
    slug: 'pelayanan-administrasi-kependudukan-pengantar-rt',
    title: 'Prosedur Pelayanan Surat Pengantar RT untuk Kebutuhan Administrasi',
    category: 'Pemberitahuan Penting',
    date: '28 Oktober 2026',
    author: 'Ketua RT 01',
    summary:
      'Panduan pengurusan surat keterangan dan pengantar RT bagi warga ber-KTP setempat maupun warga domisili/kontrak.',
    content: [
      'Untuk mempermudah layanan warga yang membutuhkan surat pengantar RT (seperti permohonan SKCK, mutasi KK, atau keterangan domisili usaha), warga dapat menghubungi Ketua RT atau Sekretaris sebelum berkunjung.',
      'Bagi warga pendatang baru atau penghuni kos/kontrakan di lingkungan RT 01, diwajibkan melapor dan mencatatkan identitas diri selambat-lambatnya 1x24 jam sejak menempati tempat tinggal.',
    ],
    imageUrl: POS_RONDA_IMAGE,
    isFeatured: false,
    isImportant: true,
  },
];

export const KEGIATAN_LIST: KegiatanItem[] = [
  {
    id: 'keg-1',
    slug: 'kerja-bakti-lingkungan-november',
    title: 'Kerja Bakti Rutin Lingkungan RT 01',
    category: 'Kerja Bakti',
    date: '15 November 2026',
    time: '06.30 - 09.30 WIB',
    location: 'Sepanjang Jalur Utama & Saluran Air RT 01',
    status: 'Akan Datang',
    summary:
      'Gotong royong rutin kebersihan lingkungan, pengerukan sedimen parit, dan perawatan tanaman perindang.',
    description: [
      'Kegiatan kerja bakti ini bertujuan menjaga kebersihan dan kesiapan sarana lingkungan sebelum curah hujan tinggi.',
      'Setiap kepala keluarga diharapkan mengirimkan perwakilan. Titik kumpul berada di depan Pos Ronda RT 01.',
    ],
    agendaList: [
      '06.30 - 07.00: Pembagian area kerja dan distribusi alat',
      '07.00 - 08.45: Gotong royong saluran drainase dan pemotongan dahan',
      '08.45 - 09.30: Istirahat, makan bersama, dan evaluasi singkat',
    ],
    picName: 'Seksi Pembangunan & Kebersihan',
  },
  {
    id: 'keg-2',
    slug: 'rapat-pleno-warga-tutup-tahun',
    title: 'Pertemuan Rutin & Evaluasi Tutup Tahun 2026',
    category: 'Rapat Warga',
    date: '29 November 2026',
    time: '19.30 - 22.00 WIB',
    location: 'Pos Ronda / Balai Warga RT 01',
    status: 'Akan Datang',
    summary:
      'Musyawarah warga membahas laporan pertanggungjawaban kas tahun berjalan dan rencana program kerja 2027.',
    description: [
      'Pertemuan akhir tahun mengundang seluruh kepala keluarga dan perwakilan pemuda untuk mendengarkan paparan transparansi kas keuangan RT serta usulan prioritas perbaikan lingkungan.',
    ],
    agendaList: [
      '19.30 - 20.00: Pembukaan dan sambutan Ketua RT',
      '20.00 - 20.45: Paparan laporan keuangan oleh Bendahara',
      '20.45 - 21.30: Sesi tanya jawab dan penjaringan aspirasi',
      '21.30 - 22.00: Doa bersama dan penutup',
    ],
    picName: 'Sekretariat RT 01',
  },
  {
    id: 'keg-3',
    slug: 'pemeriksaan-kesehatan-lansia-posyandu',
    title: 'Posyandu Terpadu dan Layanan Cek Kesehatan Mandiri',
    category: 'Sosial',
    date: '25 Oktober 2026',
    time: '08.00 - 11.30 WIB',
    location: 'Halaman Rumah Warga RT 01',
    status: 'Selesai',
    summary:
      'Pemeriksaan tekanan darah, gula darah, dan penimbangan balita bekerjasama dengan kader kesehatan puskesmas pembantu.',
    description: [
      'Kegiatan telah terselenggara dengan lancar dan dihadiri oleh 42 peserta dari kalangan lansia serta ibu dan balita di wilayah RT 01 Waringinsari.',
    ],
    agendaList: [
      'Pemeriksaan tekanan darah',
      'Cek gula darah dan kolesterol sederhana',
      'Pemberian Makanan Tambahan (PMT) bergizi',
    ],
    picName: 'Kader Posyandu Lingkungan',
    documentationUrl: '/dokumentasi',
  },
  {
    id: 'keg-4',
    slug: 'ronda-malam-dan-pembaruan-jadwal-jaga',
    title: 'Konsolidasi Jadwal Jaga Siskamling',
    category: 'Pertemuan Pengurus',
    date: '10 Oktober 2026',
    time: '20.00 - 21.30 WIB',
    location: 'Pos Ronda RT 01',
    status: 'Selesai',
    summary:
      'Pembaruan regu ronda malam guna memastikan keamanan lingkungan tetap kondusif setiap malam.',
    description: [
      'Telah disepakati rotasi jadwal ronda malam bagi warga dan penataan fasilitas senter serta kentongan di pos jaga.',
    ],
    picName: 'Seksi Ketertiban & Keamanan',
    documentationUrl: '/dokumentasi',
  },
];

export const PEMBANGUNAN_LIST: PembangunanItem[] = [
  {
    id: 'pem-1',
    slug: 'peremajaan-paving-jalan-gang-timur',
    title: 'Peremajaan Paving Block & Penataan Elevasi Jalan Gang Timur',
    description:
      'Perbaikan paving jalan selebar 2,5 meter sepanjang 120 meter guna mengatasi genangan air dan memudahkan akses warga.',
    fullDetails: [
      'Kondisi permukaan jalan paving di Gang Timur sebelumnya mengalami penurunan di beberapa titik akibat rembesan air tanah.',
      'Proyek mencakup pembongkaran paving rusak, penambahan pasir urug berkualitas, perataan stamper, dan pemasangan kembali paving interlock press mesin K-250.',
      'Seluruh tenaga kerja berasal dari swadaya warga yang dikoordinir bergantian setiap akhir pekan.',
    ],
    location: 'Gang Timur RT 01 Waringinsari',
    sourceOfFunds: 'Kas Swadaya Warga & Dana Bantuan Lingkungan',
    budget: 14500000,
    startDate: '10 Oktober 2026',
    targetDate: '25 November 2026',
    status: 'Dalam Pengerjaan',
    progressPercent: 78,
    imageUrl: SARPRAS_IMAGE,
    timelineUpdates: [
      {
        date: '10 Okt 2026',
        title: 'Pembongkaran dan Penggalian Dasar',
        description: 'Paving lama diangkat dan dilakukan perataan tanah dasar sepanjang 120 meter.',
      },
      {
        date: '24 Okt 2026',
        title: 'Pemasangan Pasir Landasan & Paving 60%',
        description: 'Tahap pemadatan pasir dasar dan pemasangan paving sisi selatan telah rampung.',
      },
      {
        date: '08 Nov 2026',
        title: 'Penyelesaian Sisi Utara & Kuncian Tepi',
        description: 'Pemasangan kastin pengunci samping dan penyiraman pasir pengisi celah.',
      },
    ],
  },
  {
    id: 'pem-2',
    slug: 'instalasi-lampu-jalan-pju-solar-cell',
    title: 'Instalasi 4 Titik Lampu Jalan Tenaga Surya Otomatis',
    description:
      'Pemasangan tiang lampu LED solar cell terpadu dengan sensor cahaya otomatis untuk efisiensi energi dan penerangan malam hari.',
    fullDetails: [
      'Proyek ini bertujuan mengoptimalkan penerangan di gang-gang tembus yang belum terjangkau penerangan PLN.',
      'Menggunakan panel surya monokristalin 60W dengan baterai lithium LiFePO4 yang mampu bertahan hingga 14 jam semalam suntuk.',
    ],
    location: '4 Titik Simpang Gang RT 01',
    sourceOfFunds: 'Iuran Pengelolaan Sarpras Mandiri',
    budget: 6800000,
    startDate: '01 September 2026',
    targetDate: '20 September 2026',
    status: 'Selesai',
    progressPercent: 100,
    imageUrl: SARPRAS_IMAGE,
    timelineUpdates: [
      {
        date: '01 Sep 2026',
        title: 'Pengadaan Material Tiang & Paket Lampu',
        description: 'Verifikasi spesifikasi teknis dan pengiriman unit ke sekretariat.',
      },
      {
        date: '12 Sep 2026',
        title: 'Pengecoran Angkur Fondasi Tiang',
        description: 'Pembuatan fondasi beton cor di 4 titik lokasi.',
      },
      {
        date: '18 Sep 2026',
        title: 'Pemasangan & Uji Coba Pencahayaan',
        description: 'Lampu diuji menyala otomatis saat maghrib dan beroperasi optimal.',
      },
    ],
  },
  {
    id: 'pem-3',
    slug: 'renovasi-pos-keamanan-dan-papan-informasi',
    title: 'Revitalisasi Pos Ronda & Papan Informasi Komunitas',
    description:
      'Pengecatan ulang struktur kayu joglo pos ronda, perbaikan genteng atap, dan pengadaan etalase papan informasi mading kaca.',
    fullDetails: [
      'Pos ronda merupakan sentra interaksi warga sekaligus simbol ketertiban wilayah. Renovasi difokuskan pada pembersihan lumut, politur ulang kayu, dan perapian instalasi listrik.',
    ],
    location: 'Sudut Masuk Lingkungan RT 01',
    sourceOfFunds: 'Donasi Pelaku Usaha & Kas RT',
    budget: 4200000,
    startDate: '15 Juli 2026',
    targetDate: '10 Agustus 2026',
    status: 'Selesai',
    progressPercent: 100,
    imageUrl: POS_RONDA_IMAGE,
    timelineUpdates: [
      {
        date: '15 Jul 2026',
        title: 'Pembersihan dan Penggantian Genteng Retak',
        description: 'Pemeriksaan rangka atap dan penggantian 40 keping genteng.',
      },
      {
        date: '02 Agu 2026',
        title: 'Finishing Kayu & Instalasi Lampu Hemat Energi',
        description: 'Pengecatan ulang serta penataan papan mading kaca pengumuman.',
      },
    ],
  },
  {
    id: 'pem-4',
    slug: 'pembuatan-sumur-resapan-dan-biopori-tahap-dua',
    title: 'Pembangunan 12 Lubang Biopori & 2 Sumur Resapan Air Hujan',
    description:
      'Upaya konservasi air tanah dan pencegahan luapan air hujan di pekarangan umum sekitar pos warga.',
    fullDetails: [
      'Inisiatif ramah lingkungan untuk menjaga muka air tanah di kawasan permukiman Condongcatur.',
      'Tahap penentuan titik lokasi resapan telah disurvei bersama perwakilan warga dan ahli pengairan lokal.',
    ],
    location: 'Area Terbuka Hijau & Samping Pos Ronda RT 01',
    sourceOfFunds: 'Alokasi Usulan APBD Kalurahan (Tahap Pengajuan)',
    budget: 8500000,
    startDate: '01 Desember 2026',
    targetDate: '20 Januari 2027',
    status: 'Perencanaan',
    progressPercent: 15,
    imageUrl: KERJA_BAKTI_IMAGE,
  },
];

export const KEUANGAN_DATA: KeuanganSummary = {
  period: 'Periode Oktober 2026',
  totalPemasukan: 8650000,
  totalPengeluaran: 5320000,
  saldoAkhir: 18430000,
  lastUpdated: '31 Oktober 2026',
  isDemo: true,
  mutations: [
    {
      id: 'mut-1',
      date: '30 Okt 2026',
      description: 'Iuran Wajib Warga Bulan Oktober (70 KK)',
      category: 'Pemasukan',
      sourceOrRecipient: 'Warga RT 01',
      amount: 3500000,
    },
    {
      id: 'mut-2',
      date: '28 Okt 2026',
      description: 'Sumbangan Partisipasi Usaha & Warung Lingkungan',
      category: 'Pemasukan',
      sourceOrRecipient: 'Pelaku Usaha RT 01',
      amount: 1500000,
    },
    {
      id: 'mut-3',
      date: '26 Okt 2026',
      description: 'Pembelian Semen & Pasir Perawatan Jalan Gang',
      category: 'Pengeluaran',
      sourceOrRecipient: 'TB Bangun Makmur',
      amount: 1850000,
    },
    {
      id: 'mut-4',
      date: '22 Okt 2026',
      description: 'Honor Jasa Kebersihan Sampah & Angkutan Lingkungan',
      category: 'Pengeluaran',
      sourceOrRecipient: 'Petugas Pengangkut Sampah',
      amount: 1200000,
    },
    {
      id: 'mut-5',
      date: '18 Okt 2026',
      description: 'Bantuan Stimulan Kas Sosial Kedukaan Warga',
      category: 'Pengeluaran',
      sourceOrRecipient: 'Keluarga Berduka (Bpk. Sastro)',
      amount: 500000,
    },
    {
      id: 'mut-6',
      date: '15 Okt 2026',
      description: 'Pengadaan Lampu Pengganti & Perkakas Kebersihan',
      category: 'Pengeluaran',
      sourceOrRecipient: 'Toko Listrik Sejahtera',
      amount: 620000,
    },
    {
      id: 'mut-7',
      date: '10 Okt 2026',
      description: 'Konsumsi Kerja Bakti Saluran Air (Snack & Minum)',
      category: 'Pengeluaran',
      sourceOrRecipient: 'Dapur Konsumsi Warga',
      amount: 450000,
    },
    {
      id: 'mut-8',
      date: '05 Okt 2026',
      description: 'Iuran Pengelolaan Sampah Warga Terkumpul',
      category: 'Pemasukan',
      sourceOrRecipient: 'Kolektor Kas RT',
      amount: 2150000,
    },
    {
      id: 'mut-9',
      date: '02 Okt 2026',
      description: 'Sewa Tenda & Perlengkapan Inventaris RT',
      category: 'Pemasukan',
      sourceOrRecipient: 'Acara Syukuran Warga',
      amount: 1500000,
    },
    {
      id: 'mut-10',
      date: '01 Okt 2026',
      description: 'Biaya Rekening Listrik & Operasional Pos Ronda',
      category: 'Pengeluaran',
      sourceOrRecipient: 'PLN & Kas Operasional',
      amount: 200000,
    },
  ],
};

export const PENGURUS_LIST: PengurusItem[] = [
  {
    id: 'peng-1',
    role: 'Ketua RT 01',
    name: 'Drs. H. Bambang Suwito',
    persons: [
      {
        name: 'Drs. H. Bambang Suwito',
        subRole: 'Ketua RT',
        phone: '0812-3456-7890',
      },
    ],
    tenure: '2024 - 2027',
    duties:
      'Memimpin jalannya organisasi lingkungan, mengkoordinasikan program sosial kemasyarakatan, serta menjembatani komunikasi warga dengan pihak RW dan Kalurahan Condongcatur.',
    category: 'Pimpinan',
    imageUrl: POS_RONDA_IMAGE,
  },
  {
    id: 'peng-2',
    role: 'Sekretariat RT 01',
    name: 'Wahyu Nugroho, S.Kom.',
    persons: [
      {
        name: 'Wahyu Nugroho, S.Kom.',
        subRole: 'Sekretaris I (Administrasi & Persuratan)',
        phone: '0812-3456-7891',
      },
      {
        name: 'Bayu Prasetya, A.Md.',
        subRole: 'Sekretaris II (Data & Dokumentasi)',
        phone: '0813-9876-5432',
      },
    ],
    tenure: '2024 - 2027',
    duties:
      'Mengelola tata kelola persuratan, pengantar administrasi kependudukan, notulensi rapat warga, dan pembaruan data portal informasi.',
    category: 'Administrasi',
    imageUrl: HERO_IMAGE,
  },
  {
    id: 'peng-3',
    role: 'Kebendaharaan RT 01',
    name: 'Hj. Sri Rahayu',
    persons: [
      {
        name: 'Hj. Sri Rahayu',
        subRole: 'Bendahara I (Kas Umum & Iuran Warga)',
        phone: '0812-7654-3210',
      },
      {
        name: 'Dewi Lestari, S.E.',
        subRole: 'Bendahara II (Kas Sosial & Pembukuan)',
        phone: '0818-0123-4567',
      },
    ],
    tenure: '2024 - 2027',
    duties:
      'Mencatat pembukuan kas iuran bulanan, mengelola pengeluaran operasional lingkungan, dan menyusun laporan transparansi keuangan periodik.',
    category: 'Administrasi',
    imageUrl: KERJA_BAKTI_IMAGE,
  },
  {
    id: 'peng-4',
    role: 'Seksi Pembangunan & Sarpras',
    name: 'Ir. Joko Santoso',
    persons: [
      {
        name: 'Ir. Joko Santoso',
        subRole: 'Koordinator Bidang',
      },
      {
        name: 'Budi Hartono',
        subRole: 'Anggota (Sarana Jalan & Drainase)',
      },
      {
        name: 'Agus Riyadi',
        subRole: 'Anggota (Penerangan PJU & Listrik)',
      },
    ],
    tenure: '2024 - 2027',
    duties:
      'Merencanakan dan mengawasi perbaikan sarana jalan, pemeliharaan penerangan jalan umum, saluran pembuangan air, serta inventaris fisik RT.',
    category: 'Seksi Bidang',
    imageUrl: SARPRAS_IMAGE,
  },
  {
    id: 'peng-5',
    role: 'Seksi Keamanan & Ketertiban',
    name: 'Sutrisno',
    persons: [
      {
        name: 'Sutrisno',
        subRole: 'Koordinator Bidang',
      },
      {
        name: 'Hendro Wijaya',
        subRole: 'Anggota (Jadwal Ronda Siskamling)',
      },
      {
        name: 'Rahmat Hidayat',
        subRole: 'Anggota (Koordinasi Babinsa & Kamtibmas)',
      },
    ],
    tenure: '2024 - 2027',
    duties:
      'Mengorganisir jadwal ronda malam, memantau ketertiban lingkungan, dan memastikan sistem keamanan pos siskamling berjalan aktif.',
    category: 'Seksi Bidang',
    imageUrl: POS_RONDA_IMAGE,
  },
  {
    id: 'peng-6',
    role: 'Seksi Sosial & Pemberdayaan',
    name: 'Endang Purwaningsih, S.Pd.',
    persons: [
      {
        name: 'Endang Purwaningsih, S.Pd.',
        subRole: 'Koordinator Bidang',
      },
      {
        name: 'Siti Aminah',
        subRole: 'Anggota (Sosial Kedukaan & Kesejahteraan)',
      },
      {
        name: 'Nurul Hidayati',
        subRole: 'Anggota (Posyandu & Kesehatan Lingkungan)',
      },
    ],
    tenure: '2024 - 2027',
    duties:
      'Mengkoordinasikan dana sosial kedukaan, kegiatan posyandu lansia & balita, serta kebersamaan antar warga dan pelaku usaha di lingkungan.',
    category: 'Seksi Bidang',
    imageUrl: KERJA_BAKTI_IMAGE,
  },
  {
    id: 'peng-7',
    role: 'Seksi Pemuda & Olahraga',
    name: 'Dimas Aditya, S.T.',
    persons: [
      {
        name: 'Dimas Aditya, S.T.',
        subRole: 'Koordinator Pemuda',
      },
      {
        name: 'Fajar Nugraha',
        subRole: 'Anggota (Kegiatan Olahraga & Publikasi)',
      },
    ],
    tenure: '2024 - 2027',
    duties:
      'Menggerakkan partisipasi generasi muda dan pemuda karang taruna dalam kerja bakti, peringatan HUT RI, serta olahraga bersama warga.',
    category: 'Seksi Bidang',
    imageUrl: HERO_IMAGE,
  },
];

export const GALERI_LIST: GaleriItem[] = [
  {
    id: 'gal-1',
    title: 'Pagi Hari di Kawasan Permukiman Waringinsari',
    category: 'Lingkungan',
    date: '02 November 2026',
    caption: 'Suasana asri jalan lingkungan dengan perpaduan rumah tradisional dan pepohonan tropis yang terawat.',
    imageUrl: HERO_IMAGE,
    aspect: 'wide',
  },
  {
    id: 'gal-2',
    title: 'Gotong Royong Perawatan Tanaman Warga',
    category: 'Kegiatan',
    date: '28 Oktober 2026',
    caption: 'Ibu-ibu dan bapak warga bersama-sama menata pot tanaman hias di sepanjang jalur pejalan kaki.',
    imageUrl: KERJA_BAKTI_IMAGE,
    aspect: 'standard',
  },
  {
    id: 'gal-3',
    title: 'Peningkatan Kualitas Jalur Paving Lingkungan',
    category: 'Pembangunan',
    date: '15 Oktober 2026',
    caption: 'Paving block yang tertata rapi dilengkapi saluran resapan air dan tiang penerangan jalan terpadu.',
    imageUrl: SARPRAS_IMAGE,
    aspect: 'wide',
  },
  {
    id: 'gal-4',
    title: 'Pos Ronda dan Sentra Rembug Warga',
    category: 'Lingkungan',
    date: '10 Oktober 2026',
    caption: 'Pos ronda dengan arsitektur joglo kayu yang bersih menjadi tempat berkumpul dan koordinasi siskamling.',
    imageUrl: POS_RONDA_IMAGE,
    aspect: 'standard',
  },
  {
    id: 'gal-5',
    title: 'Pembersihan Saluran Air Drainase Terbuka',
    category: 'Kegiatan',
    date: '20 September 2026',
    caption: 'Warga secara berkala mengeruk endapan lumpur agar aliran air tetap lancar saat hujan lebat.',
    imageUrl: KERJA_BAKTI_IMAGE,
    aspect: 'standard',
  },
  {
    id: 'gal-6',
    title: 'Fasilitas Penerangan Ramah Lingkungan',
    category: 'Pembangunan',
    date: '05 September 2026',
    caption: 'Tiang lampu hemat energi tenaga surya yang dipasang di sudut jalan untuk kenyamanan pejalan kaki malam hari.',
    imageUrl: SARPRAS_IMAGE,
    aspect: 'wide',
  },
];

export const MAP_MARKERS: MapMarkerItem[] = [
  {
    id: 'loc-1',
    title: 'Pusat Lingkungan RT 01 Waringinsari',
    category: 'Wilayah',
    lat: -7.7664,
    lng: 110.4045,
    description: 'Titik pusat kawasan permukiman RT 01 Waringinsari, Condongcatur, Sleman.',
  },
  {
    id: 'loc-2',
    title: 'Pos Ronda & Papan Informasi Warga',
    category: 'Pos Ronda',
    lat: -7.7659,
    lng: 110.4042,
    description: 'Pos jaga siskamling dengan etalase pengumuman warga dan titik kumpul kerja bakti.',
  },
  {
    id: 'loc-3',
    title: 'Proyek Perapian Paving Gang Timur',
    category: 'Sarpras',
    lat: -7.7667,
    lng: 110.4052,
    description: 'Lokasi pekerjaan peremajaan paving block dan perbaikan saluran drainase warga.',
  },
  {
    id: 'loc-4',
    title: 'Titik Lampu Surya PJU Simpang Utara',
    category: 'Fasilitas Umum',
    lat: -7.7655,
    lng: 110.4046,
    description: 'Lampu penerangan mandiri tenaga surya yang beroperasi otomatis di persimpangan jalan.',
  },
  {
    id: 'loc-5',
    title: 'Balai Pertemuan & Posyandu Mitra',
    category: 'Fasilitas Umum',
    lat: -7.7671,
    lng: 110.4039,
    description: 'Lokasi pelaksanaan posyandu lansia, balita, dan rapat musyawarah warga.',
  },
];
