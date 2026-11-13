import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { ArrowLeft, Clock, MapPin, Calendar, CheckCircle2, User, ChevronRight } from 'lucide-react';

export const KegiatanDetailPage: React.FC = () => {
  const { kegiatanList } = usePortal();
  const { slug } = useParams<{ slug: string }>();
  const item = kegiatanList.find((k) => k.slug === slug);

  if (!item) {
    return <Navigate to="/kegiatan" replace />;
  }

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/kegiatan"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#555555] hover:text-[#00A4B4] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00A4B4]" />
            <span>Kembali ke Daftar Kegiatan</span>
          </Link>
        </div>

        {/* Header */}
        <header className="pb-5 mb-6 sm:mb-8 border-b border-[#E5E5E0]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#555555] mb-2.5">
            <span className="font-semibold text-white bg-[#00A4B4] px-2.5 py-0.5 rounded-xs text-[11px] uppercase tracking-wider">
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
              Status: {item.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#0A0A0A] leading-tight mb-4">
            {item.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-teal-50/40 border border-[#00A4B4]/25 text-xs font-sans rounded-xs">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#555555] block text-[11px]">Hari & Tanggal:</span>
                <span className="font-bold text-[#0A0A0A]">{item.date}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#555555] block text-[11px]">Waktu:</span>
                <span className="font-bold text-[#0A0A0A]">{item.time}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#555555] block text-[11px]">Lokasi Titik Kumpul:</span>
                <span className="font-bold text-[#0A0A0A]">{item.location}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Narrative Description */}
        <div className="space-y-3 font-sans text-sm sm:text-base text-[#1A1A1A] leading-relaxed mb-6 sm:mb-8">
          {item.description.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Rundown / Agenda List if available */}
        {item.agendaList && item.agendaList.length > 0 && (
          <div className="border border-[#E5E5E0] bg-white p-5 sm:p-6 mb-6 sm:mb-8 shadow-2xs">
            <h3 className="font-serif text-lg font-bold text-[#0A0A0A] mb-3">
              Susunan Jadwal & Agenda
            </h3>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#555555]">
              {item.agendaList.map((agenda, idx) => (
                <li key={idx} className="flex items-start gap-2.5 pb-2.5 border-b border-[#E5E5E0] last:border-0 last:pb-0">
                  <CheckCircle2 className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
                  <span>{agenda}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PIC & Documentation Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white border border-[#E5E5E0] text-xs font-sans shadow-2xs">
          <div className="flex items-center gap-2 text-[#555555]">
            <User className="w-4 h-4 text-[#00A4B4]" />
            <span>Koordinator Kegiatan: <strong className="text-[#0A0A0A]">{item.picName || 'Pengurus RT 01'}</strong></span>
          </div>

          <Link
            to="/dokumentasi"
            className="inline-flex items-center gap-1 font-semibold text-[#00A4B4] hover:text-[#007A87] transition-colors"
          >
            <span>Buka Dokumentasi Foto</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00A4B4]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
