import React, { useEffect } from 'react';
import { GaleriItem } from '../types';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

interface LightboxProps {
  items: GaleriItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil Dokumentasi Foto"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-xs p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
        aria-label="Tutup foto"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors z-50 cursor-pointer"
        aria-label="Foto sebelumnya"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors z-50 cursor-pointer"
        aria-label="Foto berikutnya"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Content wrapper */}
      <div
        className="max-w-4xl max-h-[90vh] flex flex-col bg-[#1A1A1A] border border-white/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 min-h-[300px] max-h-[68vh] flex items-center justify-center bg-black/50 overflow-hidden">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[68vh] object-contain transition-opacity duration-300"
          />
        </div>

        <div className="p-4 sm:p-6 bg-[#1A1A1A] border-t border-white/10 text-white font-sans">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/60 mb-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[#00A4B4]">
                <Tag className="w-3.5 h-3.5" />
                <span>{currentItem.category}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentItem.date}</span>
              </span>
            </div>
            <div className="tabular-nums font-mono">
              {currentIndex + 1} / {items.length}
            </div>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-1.5">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
            {currentItem.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
