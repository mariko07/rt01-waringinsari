export type CategoryInformasi = 'Semua' | 'Pengumuman' | 'Informasi RT' | 'Agenda' | 'Pemberitahuan Penting';

export interface InformasiItem {
  id: string;
  slug: string;
  title: string;
  category: 'Pengumuman' | 'Informasi RT' | 'Agenda' | 'Pemberitahuan Penting';
  date: string;
  author: string;
  summary: string;
  content: string[];
  imageUrl?: string;
  isFeatured?: boolean;
  isImportant?: boolean;
}

export type CategoryKegiatan = 'Semua' | 'Kerja Bakti' | 'Rapat Warga' | 'Sosial' | 'Keagamaan' | 'Pertemuan Pengurus';
export type StatusKegiatan = 'Akan Datang' | 'Selesai';

export interface KegiatanItem {
  id: string;
  slug: string;
  title: string;
  category: 'Kerja Bakti' | 'Rapat Warga' | 'Sosial' | 'Keagamaan' | 'Pertemuan Pengurus';
  date: string;
  time: string;
  location: string;
  status: StatusKegiatan;
  summary: string;
  description: string[];
  agendaList?: string[];
  picName?: string;
  documentationUrl?: string;
}

export type StatusPembangunan = 'Perencanaan' | 'Dalam Pengerjaan' | 'Selesai' | 'Tertunda';

export interface PembangunanItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDetails: string[];
  location: string;
  sourceOfFunds: string;
  budget: number;
  startDate: string;
  targetDate: string;
  status: StatusPembangunan;
  progressPercent: number;
  imageUrl?: string;
  timelineUpdates?: {
    date: string;
    title: string;
    description: string;
  }[];
}

export interface PendudukStat {
  totalPenduduk: number;
  jumlahKK: number;
  lakiLaki: number;
  perempuan: number;
  pelakuUsaha: number;
  updatePeriod: string;
  isDemo: boolean;
  demographics: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

export interface KeuanganItem {
  id: string;
  date: string;
  description: string;
  category: 'Pemasukan' | 'Pengeluaran';
  sourceOrRecipient: string;
  amount: number;
}

export interface KeuanganSummary {
  period: string;
  totalPemasukan: number;
  totalPengeluaran: number;
  saldoAkhir: number;
  lastUpdated: string;
  mutations: KeuanganItem[];
  isDemo: boolean;
}

export interface PengurusPerson {
  name: string;
  subRole?: string;
  phone?: string;
}

export interface PengurusItem {
  id: string;
  role: string;
  name?: string;
  persons?: PengurusPerson[];
  tenure: string;
  duties: string;
  category: 'Pimpinan' | 'Administrasi' | 'Seksi Bidang';
  imageUrl?: string;
}

export interface GaleriItem {
  id: string;
  title: string;
  category: 'Kegiatan' | 'Pembangunan' | 'Lingkungan';
  date: string;
  caption: string;
  imageUrl: string;
  aspect?: 'wide' | 'tall' | 'standard';
}

export interface MapMarkerItem {
  id: string;
  title: string;
  category: 'Wilayah' | 'Fasilitas Umum' | 'Sarpras' | 'Pos Ronda';
  lat: number;
  lng: number;
  description: string;
}
