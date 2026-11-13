import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePortal } from '../../context/PortalContext';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  Building2,
  Check,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { isAuthenticated, login } = usePortal();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoCopied, setDemoCopied] = useState(false);

  // If already authenticated, redirect directly to admin dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Harap masukkan nama pengguna dan kata sandi.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/admin', { replace: true });
      } else {
        setErrorMsg(res.message || 'Nama pengguna atau kata sandi tidak cocok.');
      }
    }, 200);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#FFFFFF] relative overflow-hidden select-none">
      {/* Decorative Minimal Ambient Accents */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#00A4B4] via-[#00c5d9] to-[#00A4B4]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-teal-50/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal-50/40 blur-3xl pointer-events-none"
      />

      {/* Top Bar: Return to Public Portal */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#555555] hover:text-[#00A4B4] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00A4B4] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Portal Warga</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-sans text-[#777777]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sistem Portal RT 01 Waringinsari</span>
        </div>
      </header>

      {/* Main Content Form Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[440px]">
          {/* Card Container */}
          <div className="bg-white border border-[#E5E5E0] shadow-sm rounded-sm p-6 sm:p-9 relative">
            {/* Top Brand & Crest Header */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 border border-[#00A4B4]/25 text-[#00A4B4] mb-3 shadow-2xs">
                <Building2 className="w-6 h-6 text-[#00A4B4]" />
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-sans font-bold text-[#00A4B4] tracking-widest uppercase mb-1">
                <span>RT 01 WARINGINSARI</span>
                <span>·</span>
                <span>CONDONGCATUR</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight">
                Masuk Panel Pengurus
              </h1>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-xs font-sans text-red-700 rounded-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* Quick Demo Credentials Card */}
            <div className="mb-6 p-3 bg-teal-50/50 border border-[#00A4B4]/25 rounded-xs flex items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#007A87]">
                <KeyRound className="w-4 h-4 text-[#00A4B4] shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  Demo: <strong className="font-mono">admin</strong> / <strong className="font-mono">admin123</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-2.5 py-1 bg-white hover:bg-teal-50 text-[#00A4B4] hover:text-[#007A87] border border-[#00A4B4]/30 rounded-xs text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 shrink-0"
              >
                {demoCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Terisi!</span>
                  </>
                ) : (
                  <span>Gunakan Akun</span>
                )}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Nama Pengguna (Username)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#777777]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan nama pengguna..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#E5E5E0] rounded-xs text-[#0A0A0A] placeholder-[#999999] focus:outline-none focus:border-[#00A4B4] focus:ring-1 focus:ring-[#00A4B4] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1A1A1A]">
                    Kata Sandi (Password)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-[#555555] hover:text-[#00A4B4] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Sembunyikan</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#777777]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#E5E5E0] rounded-xs text-[#0A0A0A] placeholder-[#999999] focus:outline-none focus:border-[#00A4B4] focus:ring-1 focus:ring-[#00A4B4] transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs text-[#555555]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded-xs border-[#E5E5E0] text-[#00A4B4] focus:ring-[#00A4B4]"
                  />
                  <span>Ingat sesi pengurus ini</span>
                </label>
                <span className="text-[11px] text-[#777777]">Sesi Aman</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-2.5 px-4 bg-[#00A4B4] hover:bg-[#008d9b] active:scale-[0.99] text-white text-xs sm:text-sm font-bold transition-all shadow-xs rounded-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Memverifikasi akun...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Masuk ke Panel Pengurus</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom Security Note */}
            <div className="mt-6 pt-4 border-t border-[#E5E5E0] text-center text-[11px] font-sans text-[#777777] leading-relaxed">
              Khusus untuk Ketua RT, Sekretaris, Bendahara, dan Seksi Bidang RT 01 Waringinsari.
            </div>
          </div>
        </div>
      </main>

      {/* Clean Bottom Copyright Bar */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs font-sans text-[#777777]">
        <div>
          &copy; {new Date().getFullYear()} RT 01 Waringinsari · Condongcatur, Depok, Sleman, D.I. Yogyakarta
        </div>
      </footer>
    </div>
  );
};
