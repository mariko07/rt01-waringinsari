import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, ChevronRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil RT 01', href: '/profil' },
    { label: 'Informasi', href: '/informasi' },
    { label: 'Kegiatan', href: '/kegiatan' },
    { label: 'Pembangunan', href: '/pembangunan' },
    { label: 'Keuangan', href: '/keuangan' },
    { label: 'Kepengurusan', href: '/kepengurusan' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-[#00A4B4] text-white transition-all duration-300 ${
          isScrolled
            ? 'py-3 border-b border-black/10 shadow-md'
            : 'py-4 sm:py-5 border-b border-white/15'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-6 md:gap-8">
            {/* Zone 1: Brand & Regional Identity */}
            <div className="flex flex-col min-w-0">
              <Link
                to="/"
                className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white truncate">
                  RT 01 <span className="font-sans font-light text-white/70">/</span> WARINGINSARI
                </span>
              </Link>
              <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
                <span className="w-3 sm:w-4 h-[2px] bg-white/80 shrink-0" aria-hidden="true" />
                <span className="text-[11px] sm:text-sm font-sans font-semibold italic tracking-wide text-white/95 truncate">
                  Guyub Rukun Saklawase
                </span>
              </div>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden xl:flex items-center gap-5 2xl:gap-7 text-base font-sans"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`whitespace-nowrap transition-colors duration-200 py-1 relative ${
                      active
                        ? 'font-bold text-white'
                        : 'font-semibold text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onOpenContactModal) {
                    onOpenContactModal();
                  } else {
                    const el = document.getElementById('kontak-sekretariat');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-sans font-bold text-[#007A87] bg-white hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-[#007A87] shrink-0" />
                <span className="hidden sm:inline">Layanan Warga</span>
                <span className="sm:hidden">Layanan</span>
              </button>

              {/* Mobile Burger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-1.5 sm:p-2 text-white hover:bg-white/10 border border-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs xl:hidden flex justify-end"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-xs sm:max-w-sm h-full overflow-y-auto bg-[#008996] border-l border-white/20 p-5 sm:p-6 shadow-2xl text-white flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/20">
                <div>
                  <div className="text-[11px] uppercase tracking-widest font-sans font-bold text-white/80">
                    Navigasi Portal
                  </div>
                  <div className="text-base font-bold text-white">RT 01 Waringinsari</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 border border-white/30 text-white hover:bg-white/10 cursor-pointer"
                  aria-label="Tutup navigasi"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1.5 font-sans text-base">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2.5 px-3 border border-transparent transition-colors ${
                        active
                          ? 'bg-white/20 border-white/30 font-bold text-white'
                          : 'font-semibold text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${active ? 'text-white font-bold' : 'text-white/50'}`} />
                    </Link>
                  );
                })}

                <div className="pt-3 mt-2 border-t border-white/20 flex flex-col gap-1.5">
                  <Link
                    to="/penduduk"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2.5 px-3 text-sm font-semibold transition-colors ${
                      isActive('/penduduk') ? 'bg-white/20 text-white font-bold' : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Statistik Penduduk
                  </Link>
                  <Link
                    to="/dokumentasi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2.5 px-3 text-sm font-semibold transition-colors ${
                      isActive('/dokumentasi') ? 'bg-white/20 text-white font-bold' : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Galeri Dokumentasi
                  </Link>
                </div>
              </nav>
            </div>

            <div className="pt-4 mt-6 border-t border-white/20 text-xs text-white/80 italic">
              Guyub Rukun Saklawase
            </div>
          </div>
        </div>
      )}
    </>
  );
};
