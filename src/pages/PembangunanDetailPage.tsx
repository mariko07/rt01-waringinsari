import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { ProgressBar } from '../components/ProgressBar';
import { ArrowLeft, MapPin, Calendar, Coins, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export const PembangunanDetailPage: React.FC = () => {
  const { pembangunanList } = usePortal();
  const { slug } = useParams<{ slug: string }>();
  const proyek = pembangunanList.find((p) => p.slug === slug);

  if (!proyek) {
    return <Navigate to="/pembangunan" replace />;
  }

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/pembangunan"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#555555] hover:text-[#00A4B4] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00A4B4]" />
            <span>Kembali ke Daftar Pembangunan</span>
          </Link>
        </div>

        {/* Header */}
        <header className="pb-5 mb-6 sm:mb-8 border-b border-[#E5E5E0]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#555555] mb-2.5">
            <span className="font-semibold text-[#1A1A1A] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00A4B4]" />
              <span>{proyek.location}</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-xs text-[11px] ${
                proyek.status === 'Selesai'
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                  : 'text-[#007A87] bg-teal-50 border border-[#00A4B4]/30'
              }`}
            >
              {proyek.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#0A0A0A] leading-tight mb-4">
            {proyek.title}
          </h1>

          <div className="p-4 sm:p-5 bg-teal-50/40 border border-[#00A4B4]/25 mb-4 rounded-xs shadow-2xs">
            <ProgressBar progress={proyek.progressPercent} className="mb-3.5" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div>
                <span className="text-[#555555] block text-[11px]">Anggaran Disetujui:</span>
                <span className="font-mono text-base font-bold text-[#007A87] tabular-nums">
                  Rp {new Intl.NumberFormat('id-ID').format(proyek.budget)}
                </span>
              </div>
              <div>
                <span className="text-[#555555] block text-[11px]">Tanggal Dimulai:</span>
                <span className="font-bold text-[#0A0A0A] text-sm">{proyek.startDate}</span>
              </div>
              <div>
                <span className="text-[#555555] block text-[11px]">Target Rampung:</span>
                <span className="font-bold text-[#0A0A0A] text-sm">{proyek.targetDate}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {proyek.imageUrl && (
          <div className="mb-6 sm:mb-8 border border-[#E5E5E0] bg-white p-2 shadow-2xs rounded-xs">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={proyek.imageUrl}
                alt={proyek.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-xs font-sans text-[#555555] text-center italic">
              Dokumentasi lapangan proyek: {proyek.title}
            </div>
          </div>
        )}

        {/* Full Details */}
        <div className="space-y-3 font-sans text-sm sm:text-base text-[#1A1A1A] leading-relaxed mb-6 sm:mb-8">
          {proyek.fullDetails.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Timeline updates if any */}
        {proyek.timelineUpdates && proyek.timelineUpdates.length > 0 && (
          <div className="border border-[#E5E5E0] bg-white p-5 sm:p-6 mb-6 sm:mb-8 shadow-2xs rounded-xs">
            <h3 className="font-serif text-lg font-bold text-[#0A0A0A] mb-4">
              Catatan Tahapan & Progres Lapangan
            </h3>
            <div className="space-y-4">
              {proyek.timelineUpdates.map((t, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-[#E5E5E0] last:border-0 last:pb-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A4B4] mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-mono font-semibold text-[#007A87] mb-0.5">{t.date}</div>
                    <h4 className="font-bold text-sm text-[#0A0A0A] mb-0.5">{t.title}</h4>
                    <p className="text-xs font-sans text-[#555555] leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Funding Source Card */}
        <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] text-xs font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs rounded-xs">
          <div>
            <span className="text-[#555555] block text-[11px]">Sumber Pendanaan Resmi:</span>
            <span className="font-bold text-[#0A0A0A] text-sm">{proyek.sourceOfFunds}</span>
          </div>
          <Link
            to="/keuangan"
            className="inline-flex items-center gap-1.5 font-semibold text-xs text-white bg-[#00A4B4] hover:bg-[#008d9b] px-3.5 py-1.5 rounded-xs transition-colors shadow-2xs self-start sm:self-auto"
          >
            <span>Buka Laporan Kas Lingkungan</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
