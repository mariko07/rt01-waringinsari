import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { HERO_IMAGE, POS_RONDA_IMAGE, KERJA_BAKTI_IMAGE, WILAYAH_INFO } from '../data/portalData';
import {
  MapPin,
  Compass,
  Building,
  Heart,
  CheckCircle2,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-4">
          <Link to="/" className="hover:text-[#00A4B4] transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-[#1A1A1A] font-semibold">Profil RT 01 Waringinsari</span>
        </div>

        {/* Section Header */}
        <SectionHeader
          kicker="TENTANG KAMI"
          title="Profil Lingkungan RT 01 Waringinsari"
          description="Mengenal identitas, dinamika kehidupan sosial, nilai guyub rukun, batas kawasan, serta fasilitas penunjang kenyamanan warga dan pelaku usaha di Condongcatur, Sleman."
          className="mb-6 sm:mb-8"
        />

        {/* Hero Visual & Opening Editorial Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-10 items-start">
          {/* Left Column: Editorial Essay */}
          <div className="lg:col-span-7">
            <div className="font-sans text-[#1A1A1A] space-y-4 text-sm sm:text-base leading-relaxed">
              <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#00A4B4] first-letter:float-left first-letter:mr-2.5 first-letter:mt-0.5">
                RT 01 Waringinsari merupakan rukun tetangga yang terletak strategis di jantung Kalurahan Condongcatur, Kapanewon Depok, Kabupaten Sleman. Berada berdampingan dengan pesatnya pertumbuhan kawasan pendidikan tinggi dan sentra ekonomi lingkar utara Yogyakarta, lingkungan ini tetap kokoh mempertahankan kehangatan budaya guyub rukun, musyawarah, dan gotong royong.
              </p>

              <p className="text-[#555555]">
                Warga RT 01 memiliki latar belakang yang beragam, mencakup keluarga asli yang telah bermukim turun-temurun, keluarga muda pendatang, serta pelaku usaha mikro dan hunian sewa (kos/kontrakan). Keberagaman ini dikelola melalui keterbukaan komunikasi dan kepedulian bersama dalam menciptakan lingkungan yang aman, bersih, dan asri.
              </p>

              {/* Lively Editorial Pull Quote */}
              <div className="my-5 p-4 sm:p-5 bg-teal-50/40 border-l-4 border-[#00A4B4] rounded-r-sm">
                <blockquote className="font-serif italic text-base sm:text-lg text-[#0A0A0A] leading-snug">
                  &ldquo;Menjaga keharmonisan antara ketenangan hunian warga dengan dinamika aktivitas usaha yang menopang ekonomi lingkungan.&rdquo;
                </blockquote>
                <div className="mt-2 text-xs font-sans font-semibold text-[#007A87]">
                  — Prinsip Kerukunan RT 01 Waringinsari
                </div>
              </div>

              <p className="text-[#555555]">
                Sebagai unit pemerintahan terkecil, pengurus RT 01 bertugas melayani kebutuhan administrasi warga, menjembatani komunikasi ke tingkat RW dan Kalurahan Condongcatur, serta menggerakkan pemeliharaan sarana swadaya lingkungan.
              </p>
            </div>
          </div>

          {/* Right Column: Hero Photo & Administrative Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Visual Photo */}
            <div className="border border-[#E5E5E0] bg-white p-2 shadow-xs group">
              <div className="aspect-[16/11] overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Permukiman RT 01 Waringinsari"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="pt-2 px-1 flex items-center justify-between text-xs font-sans text-[#555555]">
                <span className="font-medium text-[#1A1A1A]">Lorong Jalan Lingkungan RT 01</span>
                <span className="text-[#00A4B4] font-semibold text-[11px]">Asri & Tertata</span>
              </div>
            </div>

            {/* Geographical & Administrative Identity Card */}
            <div className="border border-[#E5E5E0] bg-white shadow-xs overflow-hidden">
              <div className="bg-[#00A4B4] text-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="font-serif font-bold text-sm tracking-wide">
                    Identitas Administratif
                  </span>
                </div>
                <span className="text-[11px] font-sans font-semibold bg-white/20 px-2 py-0.5 rounded-xs">
                  Kab. Sleman
                </span>
              </div>
              <dl className="divide-y divide-[#E5E5E0] p-4 text-xs sm:text-sm font-sans">
                <div className="py-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
                  <dt className="text-[#555555]">Nama Lingkungan</dt>
                  <dd className="font-bold text-[#0A0A0A]">RT 01 Waringinsari</dd>
                </div>
                <div className="py-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
                  <dt className="text-[#555555]">Padukuhan / Dusun</dt>
                  <dd className="font-medium text-[#1A1A1A]">Waringinsari</dd>
                </div>
                <div className="py-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
                  <dt className="text-[#555555]">Kalurahan</dt>
                  <dd className="font-medium text-[#1A1A1A]">Condongcatur</dd>
                </div>
                <div className="py-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
                  <dt className="text-[#555555]">Kapanewon</dt>
                  <dd className="font-medium text-[#1A1A1A]">Depok</dd>
                </div>
                <div className="py-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
                  <dt className="text-[#555555]">Kabupaten / Provinsi</dt>
                  <dd className="font-medium text-[#1A1A1A]">Sleman, D.I. Yogyakarta</dd>
                </div>
                <div className="py-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
                  <dt className="text-[#555555]">Kode Pos</dt>
                  <dd className="font-mono font-bold text-[#00A4B4]">55283</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* =====================================================================
            NILAI BUDAYA DAN KARAKTER LINGKUNGAN (Lively 3-Pillar Cards)
        ===================================================================== */}
        <div className="border-t border-[#E5E5E0] pt-6 sm:pt-8 mb-8 sm:mb-10">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-1 block">
              NILAI KEMASYARAKATAN
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#0A0A0A]">
              Pilar Kehidupan Bertetangga
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 border border-[#E5E5E0] bg-white hover:border-[#00A4B4] transition-all shadow-xs">
              <div className="w-9 h-9 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Guyub Rukun & Ramah
              </h4>
              <p className="text-xs font-sans text-[#555555] leading-relaxed">
                Memelihara silaturahmi antarwarga melalui pertemuan bulanan, arisan, tegur sapa hangat, dan penghormatan antargenerasi.
              </p>
            </div>

            <div className="p-4 sm:p-5 border border-[#E5E5E0] bg-white hover:border-[#00A4B4] transition-all shadow-xs">
              <div className="w-9 h-9 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Gotong Royong Mandiri
              </h4>
              <p className="text-xs font-sans text-[#555555] leading-relaxed">
                Swadaya aktif dalam kebersihan parit, pemeliharaan lampu jalan, dan tanggap darurat saat warga menghadapi musibah.
              </p>
            </div>

            <div className="p-4 sm:p-5 border border-[#E5E5E0] bg-white hover:border-[#00A4B4] transition-all shadow-xs">
              <div className="w-9 h-9 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-3">
                <Eye className="w-5 h-5 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Keterbukaan & Tertib
              </h4>
              <p className="text-xs font-sans text-[#555555] leading-relaxed">
                Pengelolaan kas lingkungan yang transparan serta pelayanan administrasi surat pengantar yang responsif tanpa berbelit.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            BATAS GEOGRAFIS LINGKUNGAN (Compact Boundaries Grid)
        ===================================================================== */}
        <div className="border-t border-[#E5E5E0] pt-6 sm:pt-8 mb-8 sm:mb-10">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-1 block">
              BATAS WILAYAH
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#0A0A0A]">
              Letak dan Cakupan Kawasan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 border border-[#E5E5E0] bg-white border-l-4 border-l-[#00A4B4] shadow-xs">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#00A4B4] mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Batas Utara</span>
              </div>
              <div className="font-serif font-medium text-sm text-[#0A0A0A]">
                Jalur Saluran Selokan Mataram
              </div>
              <p className="mt-1 text-xs font-sans text-[#555555]">
                Bersebelahan dengan batas RT tetangga dan lorong akses padukuhan.
              </p>
            </div>

            <div className="p-4 border border-[#E5E5E0] bg-white border-l-4 border-l-[#00A4B4] shadow-xs">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#00A4B4] mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Batas Selatan</span>
              </div>
              <div className="font-serif font-medium text-sm text-[#0A0A0A]">
                Koridor Akses Lingkar Utara
              </div>
              <p className="mt-1 text-xs font-sans text-[#555555]">
                Menghubungkan ke sentra pertokoan dan akses jalan raya Condongcatur.
              </p>
            </div>

            <div className="p-4 border border-[#E5E5E0] bg-white border-l-4 border-l-[#00A4B4] shadow-xs">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#00A4B4] mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Batas Timur</span>
              </div>
              <div className="font-serif font-medium text-sm text-[#0A0A0A]">
                Wilayah RT 02 Waringinsari
              </div>
              <p className="mt-1 text-xs font-sans text-[#555555]">
                Batas lorong permukiman antar RT satu padukuhan Waringinsari.
              </p>
            </div>

            <div className="p-4 border border-[#E5E5E0] bg-white border-l-4 border-l-[#00A4B4] shadow-xs">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#00A4B4] mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Batas Barat</span>
              </div>
              <div className="font-serif font-medium text-sm text-[#0A0A0A]">
                Kawasan Hunian & Usaha Warga
              </div>
              <p className="mt-1 text-xs font-sans text-[#555555]">
                Akses penghubung gang permukiman dengan kawasan indekos mahasiswa.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            VISI DAN MISI LINGKUNGAN (Vibrant Cards with Top Accent)
        ===================================================================== */}
        <div className="border-t border-[#E5E5E0] pt-6 sm:pt-8 mb-8 sm:mb-10">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-1 block">
              KOMITMEN BERSAMA
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#0A0A0A]">
              Visi dan Misi Lingkungan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Card Visi */}
            <div className="p-5 sm:p-6 bg-white border border-[#E5E5E0] border-t-4 border-t-[#00A4B4] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-sans font-bold text-white bg-[#00A4B4] px-2.5 py-0.5 rounded-xs inline-block mb-3">
                  Visi RT 01
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-medium text-[#0A0A0A] mb-3 leading-snug">
                  Kawasan Permukiman yang Rukun, Nyaman, Berdaya, dan Transparan
                </h4>
                <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed">
                  Mewujudkan RT 01 Waringinsari sebagai lingkungan tempat tinggal yang harmonis, asri, aman, serta memiliki tata kelola kemasyarakatan yang terbuka, adaptif, dan bermanfaat bagi seluruh warga.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E5E5E0] text-xs font-sans text-[#007A87] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00A4B4]" />
                <span>Pedoman Warga Waringinsari</span>
              </div>
            </div>

            {/* Card Misi */}
            <div className="p-5 sm:p-6 bg-white border border-[#E5E5E0] border-t-4 border-t-[#007A87] shadow-xs">
              <span className="text-xs uppercase tracking-wider font-sans font-bold text-white bg-[#007A87] px-2.5 py-0.5 rounded-xs inline-block mb-3">
                Misi Utama
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#555555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
                  <span>
                    Meningkatkan kerukunan antarwarga lewat silaturahmi rutin, kegiatan sosial, dan gotong royong.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
                  <span>
                    Menjaga kebersihan dan kelestarian saluran air serta tata kelola sampah mandiri lingkungan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
                  <span>
                    Menyelenggarakan pelayanan administrasi warga yang ramah, cepat, dan berbasis transparansi.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A4B4] shrink-0 mt-0.5" />
                  <span>
                    Menjaga ketertiban dan keamanan lingkungan melalui ronda malam dan koordinasi warga terpadu.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* =====================================================================
            FASILITAS BERSAMA DI RT 01 (Compact 4 Cards with Badges)
        ===================================================================== */}
        <div className="border-t border-[#E5E5E0] pt-6 sm:pt-8 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-1 block">
                FASILITAS PUBLIK
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#0A0A0A]">
                Fasilitas Bersama di RT 01
              </h3>
            </div>
            <p className="text-xs font-sans text-[#555555] mt-1 sm:mt-0">
              Sarana bersama yang dirawat mandiri oleh warga
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center">
                    <Building className="w-4 h-4 text-[#00A4B4]" />
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    Aktif
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                  Pos Ronda / Jaga
                </h4>
                <p className="text-xs font-sans text-[#555555] leading-relaxed">
                  Pusat koordinasi siskamling, mading informasi warga, dan titik temu kegiatan swadaya.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#00A4B4]" />
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    Terawat
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                  Jalan Paving Gang
                </h4>
                <p className="text-xs font-sans text-[#555555] leading-relaxed">
                  Akses jalan berpaving rapi dengan saluran drainase tertutup untuk kenyamanan mobilitas warga.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center">
                    <Compass className="w-4 h-4 text-[#00A4B4]" />
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    Hemat Energi
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                  Lampu Surya Gang
                </h4>
                <p className="text-xs font-sans text-[#555555] leading-relaxed">
                  Penerangan jalan bertenaga surya di persimpangan gang untuk keamanan malam hari.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#00A4B4]" />
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    Berkala
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                  Sentra Posyandu
                </h4>
                <p className="text-xs font-sans text-[#555555] leading-relaxed">
                  Layanan kesehatan balita dan lansia bekerjasama dengan kader kesehatan Padukuhan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            NEXT ACTION NAVIGATION (Quick Links)
        ===================================================================== */}
        <div className="p-4 sm:p-6 bg-teal-50/50 border border-[#00A4B4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#007A87]">
              Ingin Mengetahui Pengurus Lingkungan RT 01?
            </h4>
            <p className="text-xs font-sans text-[#555555] mt-1">
              Kenali susunan ketua, sekretaris, bendahara, serta koordinator seksi bidang pelayanan warga.
            </p>
          </div>
          <div className="w-full sm:w-auto flex items-center gap-3 shrink-0">
            <Link
              to="/kepengurusan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-sans font-bold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-xs"
            >
              <span>Lihat Kepengurusan</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
