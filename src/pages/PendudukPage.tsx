import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { usePortal } from '../context/PortalContext';
import { Shield, AlertCircle, Users, ArrowRight, UserCheck, Briefcase } from 'lucide-react';

export const PendudukPage: React.FC = () => {
  const { pendudukData } = usePortal();
  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-4">
          <Link to="/" className="hover:text-[#00A4B4] transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-[#1A1A1A] font-semibold">Statistik Kependudukan</span>
        </div>

        <SectionHeader
          kicker="DATA PUBLIK & STATISTIK"
          title="Statistik Kependudukan RT 01"
          description="Gambaran data agregat demografi, jumlah kepala keluarga, sebaran kelompok usia, dan aktivitas ekonomi warga di Waringinsari."
          badgeDemo={true}
          className="mb-5 sm:mb-6"
        />

        {/* Demo Notice Banner: Compact */}
        <div className="p-3.5 sm:p-4 bg-amber-50 border border-amber-200 text-xs font-sans text-amber-900 mb-5 sm:mb-6 flex items-start gap-2.5 rounded-xs">
          <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <strong>Pemberitahuan Data Demo:</strong> Angka kependudukan di bawah ini merupakan data ilustrasi terstruktur untuk pengujian antarmuka portal. Data kependudukan resmi dikelola secara berkala oleh Sekretaris RT berkoordinasi dengan Kalurahan Condongcatur.
          </div>
        </div>

        {/* Big Counter Highlight Matrix: Lively */}
        <div className="grid grid-cols-2 lg:grid-cols-5 border border-[#E5E5E0] bg-[#FFFFFF] mb-8 sm:mb-10 shadow-2xs rounded-xs overflow-hidden">
          <div className="col-span-2 lg:col-span-1 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#E5E5E0] bg-teal-50/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-bold text-[#00A4B4] mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Total Penduduk</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <AnimatedCounter
                  value={pendudukData.totalPenduduk}
                  className="text-3xl sm:text-4xl font-sans font-bold text-[#00A4B4]"
                />
                <span className="text-xs font-sans text-[#555555]">Jiwa</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-[#555555] leading-relaxed">
              Populasi warga tetap dan domisili terdaftar.
            </p>
          </div>

          <div className="p-4 sm:p-6 border-b border-r lg:border-b-0 border-[#E5E5E0] flex flex-col justify-between">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-sans font-bold text-[#555555] block mb-1">
                Kepala Keluarga
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <AnimatedCounter
                  value={pendudukData.jumlahKK}
                  className="text-2xl sm:text-4xl font-sans font-bold text-[#00A4B4]"
                />
                <span className="text-xs font-sans text-[#555555]">KK</span>
              </div>
            </div>
            <p className="mt-2 text-[11px] sm:text-xs text-[#555555] leading-relaxed">
              Kartu keluarga aktif dalam register RT.
            </p>
          </div>

          <div className="p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#E5E5E0] flex flex-col justify-between">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-sans font-bold text-[#555555] block mb-1">
                Laki-laki
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <AnimatedCounter
                  value={pendudukData.lakiLaki}
                  className="text-2xl sm:text-4xl font-sans font-bold text-[#00A4B4]"
                />
                <span className="text-xs font-sans text-[#555555]">Jiwa</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] sm:text-xs text-emerald-700 font-semibold">
              49.2% proporsi
            </div>
          </div>

          <div className="p-4 sm:p-6 border-r lg:border-b-0 border-[#E5E5E0] flex flex-col justify-between">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-sans font-bold text-[#555555] block mb-1">
                Perempuan
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <AnimatedCounter
                  value={pendudukData.perempuan}
                  className="text-2xl sm:text-4xl font-sans font-bold text-[#00A4B4]"
                />
                <span className="text-xs font-sans text-[#555555]">Jiwa</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] sm:text-xs text-emerald-700 font-semibold">
              50.8% proporsi
            </div>
          </div>

          <div className="p-4 sm:p-6 flex flex-col justify-between bg-teal-50/20">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider font-sans font-bold text-[#00A4B4] mb-1">
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span>Pelaku Usaha</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <AnimatedCounter
                  value={pendudukData.pelakuUsaha}
                  className="text-2xl sm:text-4xl font-sans font-bold text-[#00A4B4]"
                />
                <span className="text-xs font-sans text-[#555555]">Unit</span>
              </div>
            </div>
            <p className="mt-2 text-[11px] sm:text-xs text-[#555555] leading-relaxed">
              UMKM & usaha lokal warga.
            </p>
          </div>
        </div>

        {/* Age Demographics Table & Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 mb-8 sm:mb-10">
          <div className="lg:col-span-7">
            <div className="mb-3">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-1 block">
                DISTRIBUSI POPULASI
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#0A0A0A]">
                Komposisi Kelompok Usia Penduduk
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed mb-4">
              Distribusi kelompok usia warga RT 01 menunjukkan mayoritas berada pada usia produktif yang aktif dalam kegiatan masyarakat maupun perekonomian sekitar Condongcatur.
            </p>

            <div className="border border-[#E5E5E0] bg-white divide-y divide-[#E5E5E0] shadow-2xs rounded-xs overflow-hidden">
              {pendudukData.demographics.map((demo, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm font-sans mb-1.5">
                    <span className="font-semibold text-[#1A1A1A]">{demo.category}</span>
                    <span className="font-mono tabular-nums text-[#007A87] font-bold">
                      {demo.count} Jiwa <span className="text-[#555555] font-normal font-sans">({demo.percentage}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00A4B4] rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${demo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Civic Obligation Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] shadow-2xs rounded-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A4B4] mb-2">
                <Shield className="w-4 h-4 text-[#00A4B4]" />
                <span>Perlindungan Data Pribadi Warga</span>
              </div>
              <p className="text-xs font-sans text-[#555555] leading-relaxed mb-2.5">
                Sesuai dengan prinsip tata kelola data publik dan perlindungan privasi, portal RT 01 Waringinsari hanya menampilkan ringkasan agregat statistik (angka total, rasio, dan kelompok).
              </p>
              <p className="text-xs font-sans text-[#555555] leading-relaxed">
                Nomor Induk Kependudukan (NIK), nama lengkap anggota keluarga, dan data sensitif lainnya tersimpan aman di buku register fisik sekretariat RT.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-teal-50/50 border border-[#00A4B4]/30 shadow-2xs rounded-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#007A87] mb-2">
                <UserCheck className="w-4 h-4 text-[#00A4B4]" />
                <span>Pembaruan Data Kependudukan</span>
              </div>
              <p className="text-xs font-sans text-[#555555] leading-relaxed mb-3">
                Bagi warga yang mengalami kelahiran anggota keluarga, mutasi tempat tinggal, atau perubahan status administrasi, silakan berkoordinasi dengan Sekretariat RT 01.
              </p>
              <Link
                to="/informasi/pelayanan-administrasi-kependudukan-pengantar-rt"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A4B4] hover:text-[#007A87] underline decoration-[#00A4B4] underline-offset-4"
              >
                <span>Lihat Panduan Pelaporan Mutasi Penduduk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
