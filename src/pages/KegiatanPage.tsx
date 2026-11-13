import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { usePortal } from '../context/PortalContext';
import { CategoryKegiatan, StatusKegiatan } from '../types';
import { Clock, MapPin, Calendar, ArrowRight, CheckCircle2, CalendarDays } from 'lucide-react';

export const KegiatanPage: React.FC = () => {
  const { kegiatanList } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKegiatan>('Semua');
  const [statusFilter, setStatusFilter] = useState<'Semua' | StatusKegiatan>('Semua');

  const categories: CategoryKegiatan[] = [
    'Semua',
    'Kerja Bakti',
    'Rapat Warga',
    'Sosial',
    'Pertemuan Pengurus',
  ];

  const filteredKegiatan = kegiatanList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesStatus =
      statusFilter === 'Semua' || item.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-4">
          <Link to="/" className="hover:text-[#00A4B4] transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-[#1A1A1A] font-semibold">Kegiatan Warga RT 01</span>
        </div>

        {/* Section Header */}
        <SectionHeader
          kicker="AGENDA & KEBERSAMAAN"
          title="Kegiatan & Agenda Warga RT 01"
          description="Jadwal pertemuan, gotong royong kerja bakti, posyandu, dan agenda sosial kebersamaan warga di lingkungan RT 01 Waringinsari."
          className="mb-6 sm:mb-7"
        />

        {/* Filter Bar: Compact & Unified with #00A4B4 Header Color */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 sm:mb-7 border-b border-[#E5E5E0]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E5E5E0] shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-sans transition-all cursor-pointer rounded-xs ${
                  selectedCategory === cat
                    ? 'bg-[#00A4B4] text-white font-semibold shadow-xs'
                    : 'text-[#555555] hover:text-[#007A87] hover:bg-teal-50/50 font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['Semua', 'Akan Datang', 'Selesai'] as const).map((st) => (
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
        </div>

        {/* Kegiatan List: Compact, Snug & Colorful */}
        {filteredKegiatan.length === 0 ? (
          <div className="py-14 text-center border border-[#E5E5E0] bg-white p-8">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-[#00A4B4] flex items-center justify-center mx-auto mb-3 border border-[#00A4B4]/20">
              <CalendarDays className="w-5 h-5 text-[#00A4B4]" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#1A1A1A] mb-1">
              Tidak ada agenda kegiatan ditemukan
            </h4>
            <p className="text-xs text-[#555555] font-sans">
              Silakan pilih kategori kegiatan atau status pelaksanaan lain.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E5E0] border border-[#E5E5E0] bg-white shadow-2xs">
            {filteredKegiatan.map((item) => {
              const dateParts = item.date.split(' ');
              const dayNum = dateParts[0];
              const monthYear = dateParts.slice(1).join(' ');

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 lg:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start group hover:bg-slate-50/70 transition-colors"
                >
                  {/* Left Column: Lively Date Block */}
                  <div className="md:col-span-2 flex items-baseline md:items-center md:flex-col justify-start md:justify-center gap-2 md:gap-0 bg-teal-50/70 border border-[#00A4B4]/25 px-3.5 py-2.5 md:p-3 rounded-xs md:text-center">
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#00A4B4] tabular-nums leading-none">
                      {dayNum}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-sans font-bold text-[#007A87] md:mt-1">
                      {monthYear}
                    </span>
                  </div>

                  {/* Middle Column: Details */}
                  <div className="md:col-span-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#555555] mb-2">
                      <span className="font-semibold text-white bg-[#00A4B4] px-2 py-0.5 rounded-xs text-[11px] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span
                        className={
                          item.status === 'Akan Datang'
                            ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200 font-semibold text-[11px]'
                            : 'text-slate-600 bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-200 font-semibold text-[11px]'
                        }
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#0A0A0A] mb-1.5 group-hover:text-[#00A4B4] transition-colors">
                      <Link
                        to={`/kegiatan/${item.slug}`}
                        className="hover:underline decoration-[#00A4B4] underline-offset-3"
                      >
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed mb-3">
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#555555]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#00A4B4]" />
                        <span>{item.time}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#00A4B4]" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: CTA Button */}
                  <div className="md:col-span-3 flex md:justify-end items-center self-center pt-1 md:pt-0 w-full md:w-auto">
                    <Link
                      to={`/kegiatan/${item.slug}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-sans font-semibold text-white bg-[#00A4B4] hover:bg-[#008d9b] px-4 py-2 transition-colors shadow-2xs whitespace-nowrap rounded-xs"
                    >
                      <span>Lihat Rincian</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Helpful Civic Notice Box at Bottom */}
        <div className="mt-8 p-4 sm:p-5 bg-teal-50/50 border border-[#00A4B4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00A4B4] text-white flex items-center justify-center shrink-0 mt-0.5">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#007A87]">
                Punya Usulan Kegiatan atau Agenda untuk Lingkungan RT 01?
              </h4>
              <p className="text-xs font-sans text-[#555555] mt-0.5">
                Warga dapat mengajukan ide kegiatan sosial, kebersihan, atau keagamaan melalui musyawarah RT.
              </p>
            </div>
          </div>
          <Link
            to="/profil"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-sans font-bold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-xs whitespace-nowrap"
          >
            <span>Hubungi Pengurus RT</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
