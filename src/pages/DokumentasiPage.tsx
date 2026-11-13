import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { Lightbox } from '../components/Lightbox';
import { GALERI_LIST } from '../data/portalData';
import { Maximize2, Camera, ArrowRight } from 'lucide-react';

export const DokumentasiPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Kegiatan', 'Pembangunan', 'Lingkungan'];

  const filteredItems =
    selectedCategory === 'Semua'
      ? GALERI_LIST
      : GALERI_LIST.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-4">
          <Link to="/" className="hover:text-[#00A4B4] transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-[#1A1A1A] font-semibold">Dokumentasi Lingkungan</span>
        </div>

        <SectionHeader
          kicker="ARSIP FOTO & DOKUMENTASI"
          title="Catatan Visual Waringinsari"
          description="Koleksi dokumentasi kegiatan warga, progres pembenahan sarana prasarana, serta kehangatan suasana lingkungan RT 01."
          className="mb-5 sm:mb-6"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E5E5E0] w-full sm:w-fit mb-5 sm:mb-6 shadow-2xs rounded-xs">
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

        {/* Compact Editorial Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="border border-[#E5E5E0] bg-white p-3 group cursor-pointer hover:border-[#00A4B4] hover:shadow-xs transition-all rounded-xs"
              onClick={() => setActivePhotoIndex(idx)}
            >
              <div className="aspect-[4/3] overflow-hidden relative mb-2.5 bg-slate-50 border border-[#E5E5E0]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-2 bg-white/95 text-[#00A4B4] rounded-full shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-1 text-xs font-sans">
                <div className="flex items-center gap-2 text-[#555555] mb-1">
                  <span className="font-semibold text-[#00A4B4]">{item.category}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#0A0A0A] leading-snug mb-1 group-hover:text-[#00A4B4] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Civic Photo Submission Banner */}
        <div className="p-4 sm:p-5 bg-teal-50/50 border border-[#00A4B4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00A4B4] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#007A87]">
                Punya Foto atau Dokumentasi Kegiatan Warga?
              </h4>
              <p className="text-xs font-sans text-[#555555] mt-0.5">
                Warga dipersilakan mengirimkan foto kegiatan gotong royong, posyandu, atau momen kebersamaan RT 01 untuk diarsipkan ke galeri portal.
              </p>
            </div>
          </div>
          <Link
            to="/informasi/pelayanan-administrasi-kependudukan-pengantar-rt"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-sans font-bold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-xs whitespace-nowrap rounded-xs"
          >
            <span>Kirim Dokumentasi</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>

        {/* Lightbox Component */}
        {activePhotoIndex !== null && (
          <Lightbox
            items={filteredItems}
            currentIndex={activePhotoIndex}
            isOpen={true}
            onClose={() => setActivePhotoIndex(null)}
            onPrev={() =>
              setActivePhotoIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
              )
            }
            onNext={() =>
              setActivePhotoIndex((prev) =>
                prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
              )
            }
          />
        )}
      </div>
    </div>
  );
};
