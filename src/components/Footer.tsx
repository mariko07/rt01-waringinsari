import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="kontak-sekretariat" className="bg-[#00A4B4] text-white pt-8 pb-6 sm:pt-10 sm:pb-8 border-t border-black/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 pb-6 sm:pb-8 border-b border-white/20">
          {/* Brand & Editorial Mission */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
              RT 01 <span className="font-sans font-light text-white/70">/</span> WARINGINSARI
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-bold text-white/85 mb-2.5">
              Condongcatur · Depok · Sleman · D.I. Yogyakarta
            </div>
            <p className="text-xs sm:text-sm font-sans text-white/90 leading-relaxed max-w-md mb-3 font-normal">
              Portal informasi resmi lingkungan RT 01 Waringinsari untuk transparansi informasi, koordinasi kegiatan, dan kemajuan sarana lingkungan.
            </p>
            <div className="inline-block border-l-2 border-white pl-3 py-0.5 text-xs sm:text-sm font-serif italic text-white font-semibold">
              &ldquo;Guyub rukun saklawase, untuk kebersamaan warga.&rdquo;
            </div>
          </div>

          {/* Navigation Columns: Side-by-side 2 columns on mobile, regular columns on desktop */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:contents">
            {/* Quick Navigation 1 */}
            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-bold text-white mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />
                <span>Jelajahi Portal</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-white/90 font-medium">
                <li>
                  <Link to="/" className="hover:text-white hover:underline transition-colors">
                    Beranda Utama
                  </Link>
                </li>
                <li>
                  <Link to="/profil" className="hover:text-white hover:underline transition-colors">
                    Profil RT 01
                  </Link>
                </li>
                <li>
                  <Link to="/informasi" className="hover:text-white hover:underline transition-colors">
                    Kabar & Pengumuman
                  </Link>
                </li>
                <li>
                  <Link to="/kegiatan" className="hover:text-white hover:underline transition-colors">
                    Agenda Kegiatan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Navigation 2 */}
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-bold text-white mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />
                <span>Transparansi</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-white/90 font-medium">
                <li>
                  <Link to="/keuangan" className="hover:text-white hover:underline transition-colors">
                    Transparansi Kas
                  </Link>
                </li>
                <li>
                  <Link to="/pembangunan" className="hover:text-white hover:underline transition-colors">
                    Proyek Sarpras
                  </Link>
                </li>
                <li>
                  <Link to="/penduduk" className="hover:text-white hover:underline transition-colors">
                    Data Kependudukan
                  </Link>
                </li>
                <li>
                  <Link to="/kepengurusan" className="hover:text-white hover:underline transition-colors">
                    Susunan Pengurus
                  </Link>
                </li>
                <li>
                  <Link to="/dokumentasi" className="hover:text-white hover:underline transition-colors">
                    Galeri Foto Warga
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Civic Address & Contact */}
          <div className="md:col-span-2 lg:col-span-3 pt-4 border-t border-white/15 md:pt-0 md:border-t-0">
            <h4 className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-bold text-white mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />
              <span>Sekretariat & Pelayanan</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-xs font-sans text-white/90 leading-normal">
              <div className="flex items-start gap-2 sm:col-span-2 md:col-span-1">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  Pos Ronda / Sekretariat RT 01, Dusun Waringinsari, Condongcatur, Depok, Sleman 55283
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span>Pelayanan: 16.00 – 20.00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>Ketua RT: (+62) 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2 md:col-span-1 min-w-0">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span className="break-all">sekretariat.rt01waringinsari@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left text-[11px] sm:text-xs font-sans text-white/85 font-medium">
          <div>
            &copy; {new Date().getFullYear()} RT 01 Waringinsari, Condongcatur. Hak cipta dilindungi.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span>Sistem Informasi Terbuka Komunitas</span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <Link
              to="/admin/login"
              className="text-white hover:underline transition-colors font-semibold"
            >
              Akses Pengurus RT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
