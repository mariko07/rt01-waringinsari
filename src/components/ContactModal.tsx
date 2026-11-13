import React from 'react';
import { X, Phone, Mail, MapPin, Clock, MessageSquare, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Layanan & Kontak Pengurus RT 01"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/80 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#E5E5E0] shadow-2xl p-5 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#555555] hover:text-[#1A1A1A] cursor-pointer"
          aria-label="Tutup jendela informasi"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest font-sans font-semibold text-[#555555] mb-1">
            Pelayanan Administrasi Lingkungan
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Hubungi Pengurus RT 01
          </h3>
          <p className="text-xs sm:text-sm text-[#555555] font-sans mt-2 leading-relaxed">
            Warga dan pelaku usaha di wilayah RT 01 Waringinsari, Condongcatur dapat menghubungi pengurus untuk keperluan administrasi kependudukan, perizinan lingkungan, atau penyampaian aspirasi.
          </p>
        </div>

        <div className="space-y-4 font-sans text-xs sm:text-sm text-[#1A1A1A]">
          <div className="p-3.5 bg-white border border-[#E5E5E0] flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#1A1A1A]">Waktu Pelayanan Administrasi</div>
              <div className="text-xs text-[#555555] mt-0.5">
                Senin – Sabtu: 16.00 – 20.00 WIB (Kecuali kondisi darurat)
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E5E0] flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#1A1A1A]">Ketua RT 01 (Drs. H. Bambang Suwito)</div>
              <div className="text-xs text-[#555555] mt-0.5">WhatsApp / Telepon: (+62) 812-3456-7890</div>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E5E0] flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#1A1A1A]">Sekretaris RT (Wahyu Nugroho, S.Kom.)</div>
              <div className="text-xs text-[#555555] mt-0.5">
                Surat Pengantar RT, Domisili Usaha, Mutasi Data Kependudukan
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E5E0] flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#1A1A1A]">Sekretariat & Pos Warga</div>
              <div className="text-xs text-[#555555] mt-0.5">
                Dusun Waringinsari, Condongcatur, Depok, Sleman, DIY 55283
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E5E0] flex items-center justify-between text-xs text-[#555555]">
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#00A4B4]" />
            <span>Membawa KTP asli & salinan dokumen</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#1A1A1A] text-white hover:bg-black font-medium transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
