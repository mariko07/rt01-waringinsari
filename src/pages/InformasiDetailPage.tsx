import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { ArrowLeft, Calendar, User, Tag, Share2, ArrowRight, Check } from 'lucide-react';

export const InformasiDetailPage: React.FC = () => {
  const { informasiList } = usePortal();
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const item = informasiList.find((i) => i.slug === slug);

  if (!item) {
    return <Navigate to="/informasi" replace />;
  }

  const relatedItems = informasiList.filter((i) => i.id !== item.id).slice(0, 2);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-sans text-[#555555]">
          <Link
            to="/informasi"
            className="inline-flex items-center gap-1.5 text-[#555555] hover:text-[#00A4B4] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00A4B4]" />
            <span>Kembali ke Daftar Informasi</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#00A4B4]">{item.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{item.date}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-6 sm:mb-8 pb-5 border-b border-[#E5E5E0]">
          <div className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-2.5">
            {item.category}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#0A0A0A] leading-[1.2] tracking-tight mb-4 text-balance">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-[#555555]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#00A4B4]" />
                <span>Dipublikasikan oleh <strong className="text-[#0A0A0A]">{item.author}</strong></span>
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00A4B4]" />
                <span>{item.date}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs text-[#007A87] hover:text-[#00A4B4] bg-teal-50 px-2.5 py-1 rounded-xs border border-[#00A4B4]/25 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Tautan Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#00A4B4]" />
                  <span>Bagikan Tautan</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {item.imageUrl && (
          <div className="mb-6 sm:mb-8 border border-[#E5E5E0] bg-white p-2 shadow-2xs">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-xs font-sans text-[#555555] text-center italic">
              Dokumentasi pelengkap informasi: {item.title}
            </div>
          </div>
        )}

        {/* Summary Deck */}
        <div className="p-4 sm:p-5 bg-teal-50/40 border-l-4 border-l-[#00A4B4] mb-6 sm:mb-8 text-base sm:text-lg font-serif italic text-[#0A0A0A] leading-relaxed rounded-r-xs">
          &ldquo;{item.summary}&rdquo;
        </div>

        {/* Body Prose */}
        <div className="prose prose-stone max-w-none font-sans text-[#1A1A1A] text-sm sm:text-base leading-relaxed space-y-4 mb-8 sm:mb-10">
          {item.content.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#00A4B4] first-letter:float-left first-letter:mr-2.5 first-letter:mt-0.5'
                  : ''
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related News Section */}
        {relatedItems.length > 0 && (
          <div className="border-t border-[#E5E5E0] pt-6 sm:pt-8">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A0A0A] mb-4">
              Informasi Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedItems.map((rel) => (
                <div
                  key={rel.id}
                  className="p-4 border border-[#E5E5E0] bg-white hover:border-[#00A4B4] hover:shadow-2xs transition-all"
                >
                  <div className="text-xs text-[#007A87] font-semibold mb-1">
                    {rel.category} · <span className="text-[#555555] font-normal">{rel.date}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1.5 group-hover:text-[#00A4B4]">
                    <Link
                      to={`/informasi/${rel.slug}`}
                      className="hover:underline decoration-[#00A4B4]"
                    >
                      {rel.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-[#555555] line-clamp-2">{rel.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
