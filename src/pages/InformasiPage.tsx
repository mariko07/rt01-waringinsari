import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { usePortal } from '../context/PortalContext';
import { CategoryInformasi } from '../types';
import { Search, Calendar, User, ArrowRight, AlertCircle, FileText } from 'lucide-react';

export const InformasiPage: React.FC = () => {
  const { informasiList } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInformasi>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryInformasi[] = [
    'Semua',
    'Pengumuman',
    'Informasi RT',
    'Agenda',
    'Pemberitahuan Penting',
  ];

  const filteredItems = informasiList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
          <span className="text-[#1A1A1A] font-semibold">Informasi & Pengumuman</span>
        </div>

        {/* Section Header */}
        <SectionHeader
          kicker="KABAR LINGKUNGAN"
          title="Informasi & Pengumuman RT 01"
          description="Arsip warta resmi, edaran pengurus, panduan layanan administrasi warga, dan catatan penting seputar lingkungan Waringinsari."
          className="mb-6 sm:mb-7"
        />

        {/* Filter and Search Bar: Compact & Unified with Header Color */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 sm:mb-7 border-b border-[#E5E5E0]">
          {/* Category Tabs: #00A4B4 Theme */}
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

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E5E5E0] px-3.5 py-1.5 pl-9 text-xs font-sans text-[#1A1A1A] placeholder-[#555555] focus:outline-none focus:border-[#00A4B4] focus:ring-1 focus:ring-[#00A4B4] transition-colors shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#00A4B4] absolute left-2.5 top-2" />
          </div>
        </div>

        {/* Content Section */}
        {filteredItems.length === 0 ? (
          <div className="py-14 text-center border border-[#E5E5E0] bg-white p-8">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-[#00A4B4] flex items-center justify-center mx-auto mb-3 border border-[#00A4B4]/20">
              <FileText className="w-5 h-5 text-[#00A4B4]" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#1A1A1A] mb-1">
              Tidak ada informasi ditemukan
            </h4>
            <p className="text-xs text-[#555555] font-sans">
              Silakan ubah kata kunci pencarian atau pilih kategori lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="border border-[#E5E5E0] bg-white p-4 sm:p-5 flex flex-col justify-between group hover:border-[#00A4B4] hover:shadow-xs transition-all"
              >
                <div>
                  {item.imageUrl && (
                    <div className="aspect-[16/10] overflow-hidden mb-3.5 border border-[#E5E5E0] relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      />
                      {item.isImportant && (
                        <span className="absolute top-2 left-2 bg-rose-600 text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-xs uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Penting</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Kicker & Date */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-sans text-[#555555] mb-2">
                    <span className="font-semibold text-white bg-[#00A4B4] px-2 py-0.5 rounded-xs text-[11px] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-[11px] text-[#555555]">{item.date}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#0A0A0A] leading-snug mb-2 group-hover:text-[#00A4B4] transition-colors">
                    <Link
                      to={`/informasi/${item.slug}`}
                      className="hover:underline decoration-[#00A4B4] underline-offset-2"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed mb-4 line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                {/* Footer Metadata & CTA */}
                <div className="pt-3 border-t border-[#E5E5E0] flex items-center justify-between text-xs font-sans">
                  <span className="text-[#555555] text-[11px]">Oleh {item.author}</span>
                  <Link
                    to={`/informasi/${item.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#00A4B4] group-hover:text-[#007A87] transition-colors"
                  >
                    <span>Baca Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00A4B4] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Helpful Civic Notice Box at Bottom */}
        <div className="mt-8 p-4 sm:p-5 bg-teal-50/50 border border-[#00A4B4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00A4B4] text-white flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#007A87]">
                Punya Informasi atau Pengumuman untuk Lingkungan?
              </h4>
              <p className="text-xs font-sans text-[#555555] mt-0.5">
                Warga dan pengurus dapat menyampaikan warta kegiatan atau pengumuman melalui Sekretariat RT 01.
              </p>
            </div>
          </div>
          <Link
            to="/profil"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-sans font-bold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-xs whitespace-nowrap"
          >
            <span>Hubungi Sekretariat</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
