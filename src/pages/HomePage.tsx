import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { HERO_IMAGE } from '../data/portalData';
import { usePortal } from '../context/PortalContext';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';

interface HomePageProps {
  onOpenContactModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContactModal }) => {
  const { keuanganData, informasiList, kegiatanList, pendudukData } = usePortal();
  const [kegiatanFilter, setKegiatanFilter] = useState<'Semua' | 'Akan Datang' | 'Selesai'>('Semua');

  const featuredInfo = informasiList.find((i) => i.isFeatured) || informasiList[0] || {
    id: 'info-default',
    title: 'Kabar Lingkungan RT 01 Waringinsari',
    summary: 'Warga dan pelaku usaha dapat mengikuti perkembangan terbaru di sini.',
    category: 'Pengumuman',
    date: 'Hari ini',
    author: 'Pengurus RT',
    slug: 'kabar-lingkungan',
    content: [],
    imageUrl: HERO_IMAGE,
  };
  const secondaryInfoList = informasiList.filter((i) => i.id !== featuredInfo.id);

  const filteredKegiatan =
    kegiatanFilter === 'Semua'
      ? kegiatanList
      : kegiatanList.filter((k) => k.status === kegiatanFilter);

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION (Compact Editorial Layout)
      ========================================================================= */}
      <section className="relative pt-4 pb-8 sm:pb-10 lg:pt-8 lg:pb-12 border-b border-[#E5E5E0] bg-[#FFFFFF] overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Grid Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Headline & Action */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-serif font-medium text-[#0A0A0A] leading-[1.1] tracking-tight text-balance mb-4">
                Ruang Informasi Warga <span className="text-[#00A4B4]">Waringinsari.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#555555] font-sans leading-relaxed max-w-2xl mb-5">
                Selamat datang di Portal RT 01 Waringinsari. Temukan informasi lingkungan, kegiatan warga, data kependudukan, serta laporan keuangan dalam satu ruang terbuka yang bersih dan terpercaya.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href="#tentang-lingkungan"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-sans font-semibold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Jelajahi Informasi</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>

                <button
                  type="button"
                  onClick={onOpenContactModal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold text-[#007A87] bg-white border border-[#00A4B4] hover:bg-[#00A4B4]/10 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#00A4B4]" />
                  <span>Kontak Pengurus</span>
                </button>
              </div>

              {/* Verified Geographical Strip */}
              <div className="mt-6 pt-3 border-t border-[#E5E5E0] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-sans text-[#555555]">
                <span className="font-semibold text-[#1A1A1A]">Wilayah Kerja:</span>
                <span>RT 01</span>
                <span aria-hidden="true">·</span>
                <span>Waringinsari</span>
                <span aria-hidden="true">·</span>
                <span>Kalurahan Condongcatur</span>
                <span aria-hidden="true">·</span>
                <span>Kodepos 55283</span>
              </div>
            </motion.div>

            {/* Right Column: Hero Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="border border-[#E5E5E0] bg-white p-2 shadow-xs">
                <div className="overflow-hidden aspect-[16/11]">
                  <img
                    src={HERO_IMAGE}
                    alt="Suasana jalan permukiman RT 01 Waringinsari, Condongcatur"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="pt-2 px-1 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-[#555555]">
                  <span>Jalan Lingkungan RT 01 Waringinsari</span>
                  <span className="font-mono">Foto Dokumenter</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 01: PROFIL SINGKAT RT 01 (Compact Two-Area)
      ========================================================================= */}
      <section id="tentang-lingkungan" className="py-8 sm:py-10 lg:py-12 border-b border-[#E5E5E0] bg-[#FFFFFF]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Area: Title & Kicker */}
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#00A4B4] mb-1.5 block">
                01 / PROFIL LINGKUNGAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#0A0A0A] tracking-tight leading-tight">
                Tentang Lingkungan Kami
              </h2>
              <div className="w-10 h-0.5 bg-[#00A4B4] mt-3 mb-4" />
              <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed mb-4">
                Mengenal lebih dekat suasana kemasyarakatan, fasilitas umum, dan nilai kekeluargaan yang menopang kehidupan sehari-hari di RT 01 Waringinsari.
              </p>
              <Link
                to="/profil"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#00A4B4] hover:border-[#00A4B4] group transition-colors"
              >
                <span>Selengkapnya tentang RT 01</span>
                <ArrowUpRight className="w-4 h-4 text-[#00A4B4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Right Area: Prose & Key Pillars */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="space-y-3.5 text-sm sm:text-base font-sans text-[#1A1A1A] leading-relaxed">
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:mt-1">
                  RT 01 Waringinsari merupakan bagian integral dari Dusun Waringinsari, Kalurahan Condongcatur, Kapanewon Depok, Kabupaten Sleman. Berada di persimpangan kawasan penyangga pendidikan tinggi dan permukiman kultural Yogyakarta, lingkungan ini menjadi ruang bersama tempat warga tinggal, beribadah, dan menjalankan kegiatan usaha.
                </p>
                <p className="text-[#555555]">
                  Semangat gotong royong dan rembug warga tetap menjadi fondasi utama dalam pengambilan keputusan demi terwujudnya hunian yang nyaman, aman, dan berdaya saing.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-[#E5E5E0]">
                <div className="p-3.5 bg-slate-50 border border-[#E5E5E0]">
                  <div className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#00A4B4] mb-0.5">
                    Kebersamaan
                  </div>
                  <h4 className="text-sm font-serif font-medium text-[#1A1A1A] mb-1">
                    Gotong Royong Guyub
                  </h4>
                  <p className="text-xs font-sans text-[#555555] leading-relaxed">
                    Tradisi kerja bakti, tilik warga sakit, dan silaturahmi berkala.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-[#E5E5E0]">
                  <div className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#00A4B4] mb-0.5">
                    Keterbukaan
                  </div>
                  <h4 className="text-sm font-serif font-medium text-[#1A1A1A] mb-1">
                    Tata Kelola Transparan
                  </h4>
                  <p className="text-xs font-sans text-[#555555] leading-relaxed">
                    Informasi keuangan dan kerja sarpras dilaporkan secara berkala.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-[#E5E5E0]">
                  <div className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#00A4B4] mb-0.5">
                    Harmoni Usaha
                  </div>
                  <h4 className="text-sm font-serif font-medium text-[#1A1A1A] mb-1">
                    Warga & Pelaku Usaha
                  </h4>
                  <p className="text-xs font-sans text-[#555555] leading-relaxed">
                    Kolaborasi aktif antara warga permukiman dan pemilik usaha sekitar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: STATISTIK PENDUDUK ("Waringinsari dalam Angka")
      ========================================================================= */}
      <section className="py-8 sm:py-10 lg:py-12 border-b border-[#E5E5E0] bg-[#FFFFFF]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="02 / KEPENDUDUKAN"
            title="Waringinsari dalam Angka"
            description="Gambaran ringkas kependudukan dan aktivitas lingkungan RT 01 sebagai acuan perencanaan sarana dan pelayanan warga."
            linkTo="/penduduk"
            linkText="Lihat Statistik Lengkap"
            badgeDemo={true}
          />

          {/* Demographic Grid: 1 Dominant Key Figure + 4 Supporting Metrics with Compact Hairline Dividers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#E5E5E0] bg-[#FFFFFF]">
            {/* Dominant Highlight: Total Penduduk */}
            <div className="lg:col-span-5 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-[#E5E5E0] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#555555]">
                  Populasi Keseluruhan
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <AnimatedCounter
                    value={pendudukData.totalPenduduk}
                    className="text-5xl sm:text-6xl font-sans text-[#00A4B4]"
                  />
                  <span className="text-base font-sans font-semibold text-[#555555]">Jiwa</span>
                </div>
                <p className="mt-2 text-xs font-sans text-[#555555] leading-relaxed">
                  Total warga yang berdomisili di lingkungan RT 01 Waringinsari, terdiri atas warga ber-KTP setempat dan warga domisili terdaftar.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E5E5E0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#555555]">
                <span>Pembaruan: {pendudukData.updatePeriod}</span>
                <span className="text-amber-800 font-medium">Contoh Tampilan</span>
              </div>
            </div>

            {/* Supporting 4 Metrics Grid: 2x2 on both mobile and desktop */}
            <div className="lg:col-span-7 grid grid-cols-2">
              {/* Jumlah KK */}
              <div className="p-4 sm:p-5 border-b border-r border-[#E5E5E0] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-sans text-[#555555] block">
                    Jumlah Kepala Keluarga
                  </span>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5">
                    <AnimatedCounter
                      value={pendudukData.jumlahKK}
                      className="text-2xl sm:text-4xl font-sans text-[#00A4B4]"
                    />
                    <span className="text-xs font-sans text-[#555555]">KK</span>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs font-sans text-[#555555]">
                    Keluarga terdaftar aktif dalam administrasi RT.
                  </p>
                </div>
              </div>

              {/* Pelaku Usaha */}
              <div className="p-4 sm:p-5 border-b border-[#E5E5E0] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-sans text-[#555555] block">
                    Pelaku Usaha Lingkungan
                  </span>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5">
                    <AnimatedCounter
                      value={pendudukData.pelakuUsaha}
                      className="text-2xl sm:text-4xl font-sans text-[#00A4B4]"
                    />
                    <span className="text-xs font-sans text-[#555555]">Usaha</span>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs font-sans text-[#555555]">
                    Warung, fotokopi, indekos, dan UMKM warga.
                  </p>
                </div>
              </div>

              {/* Laki-laki */}
              <div className="p-4 sm:p-5 border-r border-[#E5E5E0] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-sans text-[#555555] block">
                    Penduduk Laki-laki
                  </span>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5">
                    <AnimatedCounter
                      value={pendudukData.lakiLaki}
                      className="text-2xl sm:text-4xl font-sans text-[#00A4B4]"
                    />
                    <span className="text-xs font-sans text-[#555555]">Jiwa</span>
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-sans text-[#555555]">
                    Rasio: ~49.2%
                  </div>
                </div>
              </div>

              {/* Perempuan */}
              <div className="p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-sans text-[#555555] block">
                    Penduduk Perempuan
                  </span>
                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5">
                    <AnimatedCounter
                      value={pendudukData.perempuan}
                      className="text-2xl sm:text-4xl font-sans text-[#00A4B4]"
                    />
                    <span className="text-xs font-sans text-[#555555]">Jiwa</span>
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-sans text-[#555555]">
                    Rasio: ~50.8%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: TRANSPARANSI KEUANGAN RT (Moved directly under "Waringinsari dalam Angka")
      ========================================================================= */}
      <section className="py-8 sm:py-10 lg:py-12 border-b border-[#E5E5E0] bg-[#FFFFFF]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="03 / TRANSPARANSI KAS"
            title="Keuangan yang Terbuka"
            description="Ringkasan pemasukan, pengeluaran, dan saldo kas lingkungan sebagai bagian dari komitmen keterbukaan tata kelola RT 01."
            linkTo="/keuangan"
            linkText="Lihat Laporan Lengkap"
            badgeDemo={true}
          />

          {/* 3 Summary Cards with Animated Count-Up in IDR */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E5E5E0] bg-[#FFFFFF] mb-5">
            {/* Total Pemasukan */}
            <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#E5E5E0]">
              <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#555555]">
                Pemasukan Periode Ini
              </span>
              <div className="mt-2.5 flex items-baseline gap-1 text-2xl sm:text-3xl font-serif text-[#0A0A0A]">
                <span>Rp</span>
                <AnimatedCounter value={keuanganData.totalPemasukan} />
              </div>
              <div className="mt-1.5 text-xs font-sans text-emerald-700">
                Dari iuran warga, sumbangan usaha, dan sewa inventaris
              </div>
            </div>

            {/* Total Pengeluaran */}
            <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#E5E5E0]">
              <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#555555]">
                Pengeluaran Periode Ini
              </span>
              <div className="mt-2.5 flex items-baseline gap-1 text-2xl sm:text-3xl font-serif text-[#0A0A0A]">
                <span>Rp</span>
                <AnimatedCounter value={keuanganData.totalPengeluaran} />
              </div>
              <div className="mt-1.5 text-xs font-sans text-[#555555]">
                Untuk operasional kebersihan, perbaikan sarana, dan sosial
              </div>
            </div>

            {/* Saldo Kas Berjalan */}
            <div className="p-5 sm:p-6 bg-[#00A4B4] text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-sans font-bold text-white/90">
                  Saldo Kas Akhir
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1 text-2xl sm:text-3xl font-serif text-white">
                <span className="text-white/80">Rp</span>
                <AnimatedCounter value={keuanganData.saldoAkhir} />
              </div>
              <div className="mt-1.5 text-xs font-sans text-white/90">
                Posisi per {keuanganData.lastUpdated}
              </div>
            </div>
          </div>

          {/* Compact Cash Flow Mutation List (Mobile Cards) + Table (Desktop) */}
          <div className="border border-[#E5E5E0] bg-white">
            <div className="p-3.5 sm:p-4 border-b border-[#E5E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="font-serif text-sm sm:text-base font-medium text-[#0A0A0A]">
                Mutasi Kas Terbaru ({keuanganData.period})
              </h4>
              <span className="text-xs font-sans text-[#555555]">
                Menampilkan 5 mutasi terkini
              </span>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-[#E5E5E0]">
              {keuanganData.mutations.slice(0, 5).map((m) => (
                <div key={m.id} className="p-3.5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-sans text-[#555555] mb-0.5">
                      {m.date} · {m.sourceOrRecipient}
                    </div>
                    <div className="text-xs font-medium text-[#1A1A1A] leading-snug">
                      {m.description}
                    </div>
                  </div>
                  <div
                    className={`text-xs font-sans tabular-nums font-bold whitespace-nowrap shrink-0 ${
                      m.category === 'Pemasukan' ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {m.category === 'Pemasukan' ? '+' : '-'} Rp{' '}
                    {new Intl.NumberFormat('id-ID').format(m.amount)}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm font-sans">
                <thead className="bg-slate-50 text-[#555555] uppercase tracking-wider text-[11px] border-b border-[#E5E5E0]">
                  <tr>
                    <th className="py-2.5 px-4 sm:px-5">Tanggal</th>
                    <th className="py-2.5 px-4 sm:px-5">Uraian Transaksi</th>
                    <th className="py-2.5 px-4 sm:px-5">Pihak Terkait</th>
                    <th className="py-2.5 px-4 sm:px-5 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E0]">
                  {keuanganData.mutations.slice(0, 5).map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4 sm:px-5 text-[#555555] whitespace-nowrap text-xs">
                        {m.date}
                      </td>
                      <td className="py-2.5 px-4 sm:px-5 font-medium text-[#1A1A1A]">
                        {m.description}
                      </td>
                      <td className="py-2.5 px-4 sm:px-5 text-[#555555] whitespace-nowrap text-xs">
                        {m.sourceOrRecipient}
                      </td>
                      <td
                        className={`py-2.5 px-4 sm:px-5 text-right font-mono tabular-nums font-semibold whitespace-nowrap ${
                          m.category === 'Pemasukan' ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {m.category === 'Pemasukan' ? '+' : '-'} Rp{' '}
                        {new Intl.NumberFormat('id-ID').format(m.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: INFORMASI DAN PENGUMUMAN (Compact News Layout)
      ========================================================================= */}
      <section className="py-8 sm:py-10 lg:py-12 border-b border-[#E5E5E0] bg-[#FFFFFF]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="04 / KABAR LINGKUNGAN"
            title="Kabar dari Lingkungan"
            description="Informasi terbaru, pengumuman, dan hal-hal penting yang perlu diketahui warga dan pelaku usaha di wilayah RT 01."
            linkTo="/informasi"
            linkText="Lihat Semua Informasi"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            {/* Lead Story */}
            <div className="lg:col-span-7">
              <article className="border border-[#E5E5E0] bg-[#FFFFFF] p-4 sm:p-5 group">
                {featuredInfo.imageUrl && (
                  <div className="aspect-[16/10] overflow-hidden mb-4 border border-[#E5E5E0]">
                    <img
                      src={featuredInfo.imageUrl}
                      alt={featuredInfo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-sans text-[#555555] mb-2">
                  <span className="font-semibold text-white bg-[#00A4B4] px-2 py-0.5 rounded-xs text-[11px] uppercase tracking-wider">{featuredInfo.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredInfo.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>Oleh {featuredInfo.author}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#0A0A0A] leading-snug mb-2 group-hover:text-black">
                  <Link
                    to={`/informasi/${featuredInfo.slug}`}
                    className="hover:underline decoration-[#00A4B4] underline-offset-4"
                  >
                    {featuredInfo.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed mb-4">
                  {featuredInfo.summary}
                </p>
                <Link
                  to={`/informasi/${featuredInfo.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#00A4B4] hover:text-[#007A87] group border-b border-[#00A4B4] pb-0.5"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00A4B4] group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            </div>

            {/* Secondary News List: Compact */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="divide-y divide-[#E5E5E0] border border-[#E5E5E0] p-4 bg-white">
                {secondaryInfoList.slice(0, 3).map((item) => (
                  <article key={item.id} className="py-3 first:pt-0 last:pb-0 group">
                    <div className="flex items-center gap-2 text-[11px] font-sans text-[#555555] mb-1">
                      <span className="font-semibold text-white bg-[#00A4B4] px-1.5 py-0.5 rounded-xs text-[10px] uppercase tracking-wider">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="font-serif text-base font-medium text-[#0A0A0A] leading-snug group-hover:text-black mb-1">
                      <Link
                        to={`/informasi/${item.slug}`}
                        className="hover:underline decoration-[#00A4B4] underline-offset-2"
                      >
                        {item.title}
                      </Link>
                    </h4>
                    <p className="text-xs font-sans text-[#555555] leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </article>
                ))}
              </div>

              {/* Civic Notice Box */}
              <div className="p-4 bg-teal-50/50 border border-[#00A4B4]/30 text-xs font-sans">
                <div className="font-bold text-[#007A87] mb-1">
                  Pemberitahuan Warga Baru?
                </div>
                <p className="text-[#555555] leading-relaxed mb-2.5">
                  Warga yang baru pindah atau mengontrak diimbau melapor ke sekretariat RT 01 Waringinsari dalam 1x24 jam untuk pencatatan domisili.
                </p>
                <button
                  type="button"
                  onClick={onOpenContactModal}
                  className="text-xs font-bold text-[#00A4B4] underline decoration-[#00A4B4] underline-offset-4 hover:text-[#007A87] cursor-pointer"
                >
                  Lihat Prosedur Pelaporan Warga
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: KEGIATAN WARGA (Date-Driven Editorial List)
      ========================================================================= */}
      <section className="py-8 sm:py-10 lg:py-12 border-b border-[#E5E5E0] bg-[#FFFFFF]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="05 / AGENDA & KEBERSAMAAN"
            title="Kegiatan dan Kebersamaan"
            description="Jadwal agenda lingkungan, pertemuan rutin warga, kerja bakti, dan kegiatan sosial di lingkungan RT 01."
            linkTo="/kegiatan"
            linkText="Semua Agenda Kegiatan"
          />

          {/* Filter Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5 border-b border-[#E5E5E0] pb-2.5">
            {(['Semua', 'Akan Datang', 'Selesai'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setKegiatanFilter(status)}
                className={`px-3 py-1 text-xs font-sans font-medium transition-colors cursor-pointer ${
                  kegiatanFilter === status
                    ? 'bg-[#00A4B4] text-white font-semibold shadow-xs'
                    : 'text-[#555555] hover:text-[#1A1A1A] bg-white border border-[#E5E5E0]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Activities List: Compact Spacing */}
          <div className="divide-y divide-[#E5E5E0] border-y border-[#E5E5E0]">
            {filteredKegiatan.map((kegiatan) => {
              const dateParts = kegiatan.date.split(' ');
              const dayNum = dateParts[0];
              const monthYear = dateParts.slice(1).join(' ');

              return (
                <div
                  key={kegiatan.id}
                  className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start group hover:bg-slate-50 transition-colors"
                >
                  {/* Left Column: Date Display */}
                  <div className="md:col-span-2 flex items-baseline md:flex-col gap-1.5">
                    <span className="font-serif text-3xl sm:text-4xl font-medium text-[#0A0A0A] tabular-nums">
                      {dayNum}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-sans text-[#555555]">
                      {monthYear}
                    </span>
                  </div>

                  {/* Middle Column: Activity Content */}
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-1">
                      <span className="font-semibold text-[#00A4B4]">{kegiatan.category}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          kegiatan.status === 'Akan Datang'
                            ? 'text-emerald-700 font-medium'
                            : 'text-[#555555]'
                        }
                      >
                        {kegiatan.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#0A0A0A] mb-1.5 group-hover:text-black">
                      <Link
                        to={`/kegiatan/${kegiatan.slug}`}
                        className="hover:underline decoration-[#00A4B4] underline-offset-4"
                      >
                        {kegiatan.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed mb-2.5">
                      {kegiatan.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-[#555555]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00A4B4]" />
                        <span>{kegiatan.time}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00A4B4]" />
                        <span>{kegiatan.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Link / Action */}
                  <div className="md:col-span-3 flex md:justify-end items-center">
                    <Link
                      to={`/kegiatan/${kegiatan.slug}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-sans font-medium text-[#1A1A1A] bg-white border border-[#E5E5E0] px-3.5 py-2 sm:py-1.5 hover:border-[#00A4B4] hover:text-[#00A4B4] transition-colors"
                    >
                      <span>Detail Agenda</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#00A4B4]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
