import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { ProgressBar } from '../components/ProgressBar';
import { usePortal } from '../context/PortalContext';
import { StatusPembangunan } from '../types';
import { ArrowRight, AlertCircle, Calendar, Coins, MapPin, Building, Wrench } from 'lucide-react';

export const PembangunanPage: React.FC = () => {
  const { pembangunanList } = usePortal();
  const [statusFilter, setStatusFilter] = useState<'Semua' | StatusPembangunan>('Semua');

  const filteredProjects =
    statusFilter === 'Semua'
      ? pembangunanList
      : pembangunanList.filter((p) => p.status === statusFilter);

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-4">
          <Link to="/" className="hover:text-[#00A4B4] transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-[#1A1A1A] font-semibold">Pembangunan Sarana & Prasarana</span>
        </div>

        {/* Section Header */}
        <SectionHeader
          kicker="PEMBANGUNAN & FASILITAS"
          title="Pembangunan Sarana Lingkungan"
          description="Transparansi perencanaan, alokasi anggaran, dan pemantauan fisik proyek pemeliharaan lingkungan RT 01 Waringinsari."
          badgeDemo={true}
          className="mb-5 sm:mb-6"
        />

        {/* Demo Data Disclaimer: Compact */}
        <div className="p-3.5 sm:p-4 bg-amber-50 border border-amber-200 text-xs font-sans text-amber-900 mb-5 sm:mb-6 flex items-start gap-2.5 rounded-xs">
          <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Transparansi Publik:</strong> Seluruh data proyek pembangunan di bawah ini disajikan sebagai format contoh tata kelola sarana prasarana. Rencana pembangunan definitif ditetapkan dalam Musyawarah Rencana Pembangunan Warga (Musrenbang RT).
          </div>
        </div>

        {/* Status Filter Tabs: Unified with #00A4B4 Header Color */}
        <div className="flex flex-wrap items-center gap-1.5 pb-4 mb-6 sm:mb-7 border-b border-[#E5E5E0]">
          {(['Semua', 'Dalam Pengerjaan', 'Selesai', 'Perencanaan'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-sans transition-all cursor-pointer rounded-xs ${
                statusFilter === st
                  ? 'bg-[#00A4B4] text-white font-semibold shadow-xs'
                  : 'text-[#555555] bg-white border border-[#E5E5E0] hover:text-[#007A87] hover:border-[#00A4B4] font-medium'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Project Grid: Compact, Snug & Colorful */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {filteredProjects.map((proyek) => (
            <div
              key={proyek.id}
              className="border border-[#E5E5E0] bg-white p-4 sm:p-5 lg:p-6 flex flex-col justify-between group hover:border-[#00A4B4] hover:shadow-xs transition-all rounded-xs"
            >
              <div>
                {proyek.imageUrl && (
                  <div className="aspect-[16/9] overflow-hidden mb-4 border border-[#E5E5E0]">
                    <img
                      src={proyek.imageUrl}
                      alt={proyek.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-[#555555] mb-2">
                  <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00A4B4] shrink-0" />
                    <span>{proyek.location}</span>
                  </span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-xs text-[11px] ${
                      proyek.status === 'Selesai'
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : proyek.status === 'Dalam Pengerjaan'
                        ? 'text-[#007A87] bg-teal-50 border border-[#00A4B4]/30'
                        : 'text-amber-800 bg-amber-50 border border-amber-200'
                    }`}
                  >
                    {proyek.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#0A0A0A] leading-snug mb-2 group-hover:text-[#00A4B4] transition-colors">
                  <Link
                    to={`/pembangunan/${proyek.slug}`}
                    className="hover:underline decoration-[#00A4B4] underline-offset-3"
                  >
                    {proyek.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed mb-5">
                  {proyek.description}
                </p>
              </div>

              {/* Progress & Transparency Strip */}
              <div className="pt-4 border-t border-[#E5E5E0]">
                <ProgressBar progress={proyek.progressPercent} className="mb-3.5" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#555555] mb-3.5 p-3 bg-teal-50/40 border border-[#00A4B4]/20 rounded-xs">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555]">
                      Nilai Anggaran
                    </span>
                    <span className="font-mono font-bold text-[#007A87] text-sm tabular-nums">
                      Rp {new Intl.NumberFormat('id-ID').format(proyek.budget)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555]">
                      Target Selesai
                    </span>
                    <span className="font-bold text-[#0A0A0A] text-sm">
                      {proyek.targetDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2.5 border-t border-[#E5E5E0] text-xs font-sans">
                  <span className="text-[#555555] text-[11px]">
                    Sumber: <strong className="text-[#0A0A0A]">{proyek.sourceOfFunds}</strong>
                  </span>
                  <Link
                    to={`/pembangunan/${proyek.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-semibold text-xs text-white bg-[#00A4B4] hover:bg-[#008d9b] px-3.5 py-2 sm:py-1.5 rounded-xs transition-colors shadow-2xs whitespace-nowrap"
                  >
                    <span>Rincian Proyek</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Civic Notice Box at Bottom */}
        <div className="mt-8 p-4 sm:p-5 bg-teal-50/50 border border-[#00A4B4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00A4B4] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#007A87]">
                Punya Usulan Perbaikan Sarana atau Masukan Infrastruktur?
              </h4>
              <p className="text-xs font-sans text-[#555555] mt-0.5">
                Warga dapat menyampaikan laporan kerusakan sarana lingkungan (lampu jalan, jalan paving, saluran air) ke Seksi Pembangunan RT 01.
              </p>
            </div>
          </div>
          <Link
            to="/profil"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-sans font-bold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-xs whitespace-nowrap rounded-xs"
          >
            <span>Hubungi Seksi Pembangunan</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
