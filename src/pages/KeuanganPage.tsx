import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { usePortal } from '../context/PortalContext';
import { KeuanganItem } from '../types';
import {
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
  FileText,
  Users,
  ShieldCheck,
  ArrowRight,
  Wallet,
} from 'lucide-react';

export const KeuanganPage: React.FC = () => {
  const { keuanganData } = usePortal();
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'Pemasukan' | 'Pengeluaran'>('Semua');

  const filteredMutations =
    selectedFilter === 'Semua'
      ? keuanganData.mutations
      : keuanganData.mutations.filter((m) => m.category === selectedFilter);

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-4">
          <Link to="/" className="hover:text-[#00A4B4] transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-[#1A1A1A] font-semibold">Transparansi Keuangan RT</span>
        </div>

        <SectionHeader
          kicker="TRANSPARANSI KAS LINGKUNGAN"
          title="Keuangan yang Terbuka"
          description="Laporan ringkas pengelolaan dana swadaya warga, iuran sampah, pemeliharaan sarana, dan alokasi kas sosial RT 01 Waringinsari."
          badgeDemo={true}
          className="mb-5 sm:mb-6"
        />

        {/* Demo Disclaimer: Compact */}
        <div className="p-3.5 sm:p-4 bg-amber-50 border border-amber-200 text-xs font-sans text-amber-900 mb-5 sm:mb-6 flex items-start gap-2.5 rounded-xs">
          <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Transparansi Publik:</strong> Data mutasi kas dan nominal di bawah ini disajikan sebagai format contoh tata kelola kas lingkungan. Buku kas besar dan kuitansi fisik diverifikasi dan disahkan oleh Bendahara bersama Ketua RT dalam musyawarah warga.
          </div>
        </div>

        {/* Financial Highlights Matrix: Lively & Colorful */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E5E5E0] bg-[#FFFFFF] mb-6 sm:mb-7 shadow-2xs rounded-xs overflow-hidden">
          {/* Pemasukan */}
          <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#E5E5E0] bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-sans text-[#555555] mb-2">
                <span className="uppercase tracking-wider font-bold text-[#0A0A0A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Pemasukan Periode Ini</span>
                </span>
                <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                  {keuanganData.period}
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-1 text-2xl sm:text-3xl font-serif font-bold text-[#0A0A0A]">
                <span className="text-emerald-700">Rp</span>
                <AnimatedCounter value={keuanganData.totalPemasukan} />
              </div>
              <p className="mt-2 text-xs font-sans text-[#555555] leading-relaxed">
                Terkumpul dari 70 KK, sumbangan tempat usaha lingkungan, dan jasa sewa tenda/inventaris RT.
              </p>
            </div>
          </div>

          {/* Pengeluaran */}
          <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#E5E5E0] bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-sans text-[#555555] mb-2">
                <span className="uppercase tracking-wider font-bold text-[#0A0A0A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Pengeluaran Periode Ini</span>
                </span>
                <span className="text-rose-700 font-semibold text-[11px] bg-rose-50 px-2 py-0.5 rounded-xs border border-rose-200">
                  Realisasi Kas
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-1 text-2xl sm:text-3xl font-serif font-bold text-[#0A0A0A]">
                <span className="text-rose-600">Rp</span>
                <AnimatedCounter value={keuanganData.totalPengeluaran} />
              </div>
              <p className="mt-2 text-xs font-sans text-[#555555] leading-relaxed">
                Dialokasikan untuk operasional petugas sampah, pemeliharaan lampu jalan, dan konsumsi kerja bakti.
              </p>
            </div>
          </div>

          {/* Saldo Kas: Vibrant #00A4B4 Card */}
          <div className="p-5 sm:p-6 bg-[#00A4B4] text-white flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs font-sans mb-2">
                <span className="uppercase tracking-wider font-bold text-white/90 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-white" />
                  <span>Saldo Akhir Tersimpan</span>
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1 text-2xl sm:text-3xl font-serif font-bold text-white">
                <span className="text-white/80">Rp</span>
                <AnimatedCounter value={keuanganData.saldoAkhir} />
              </div>
              <p className="mt-2 text-xs font-sans text-white/90 leading-relaxed">
                Tersimpan di rekening bank resmi kas RT 01 dan kas kecil operasional bendahara.
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Table Controls: Tabs #00A4B4 & Compact */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 sm:mb-5 border-b border-[#E5E5E0]">
          <div className="w-full sm:w-auto grid grid-cols-3 sm:flex items-center gap-1.5 p-1 bg-white border border-[#E5E5E0] shadow-2xs rounded-xs">
            {(['Semua', 'Pemasukan', 'Pengeluaran'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 text-xs font-sans text-center transition-all cursor-pointer rounded-xs ${
                  selectedFilter === filter
                    ? 'bg-[#00A4B4] text-white font-semibold shadow-xs'
                    : 'text-[#555555] hover:text-[#007A87] hover:bg-teal-50/50 font-medium'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="text-xs font-sans text-[#555555] flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Periode Laporan: <strong className="text-[#0A0A0A]">{keuanganData.period}</strong></span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Terakhir diperbarui: <strong className="text-[#0A0A0A]">{keuanganData.lastUpdated}</strong></span>
          </div>
        </div>

        {/* Mobile Card View (< md) */}
        <div className="md:hidden border border-[#E5E5E0] bg-white divide-y divide-[#E5E5E0] mb-8 shadow-2xs rounded-xs">
          {filteredMutations.map((m) => (
            <div key={m.id} className="p-3.5 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-sans text-[#555555]">{m.date}</span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-xs ${
                    m.category === 'Pemasukan'
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                      : 'text-red-700 bg-red-50 border border-red-200'
                  }`}
                >
                  {m.category}
                </span>
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] leading-snug">
                {m.description}
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-[#555555] truncate">{m.sourceOrRecipient}</span>
                <span
                  className={`text-xs font-sans tabular-nums font-bold whitespace-nowrap ${
                    m.category === 'Pemasukan' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {m.category === 'Pemasukan' ? '+' : '-'} Rp{' '}
                  {new Intl.NumberFormat('id-ID').format(m.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Compact & Clean Ledger Table (Desktop md+) */}
        <div className="hidden md:block border border-[#E5E5E0] bg-white overflow-x-auto mb-8 sm:mb-10 shadow-2xs rounded-xs">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-50 text-[#555555] uppercase tracking-wider text-[11px] border-b border-[#E5E5E0]">
              <tr>
                <th className="py-2.5 px-4 sm:px-5">Tanggal</th>
                <th className="py-2.5 px-4 sm:px-5">Uraian / Keterangan</th>
                <th className="py-2.5 px-4 sm:px-5">Jenis</th>
                <th className="py-2.5 px-4 sm:px-5">Pihak / Sumber</th>
                <th className="py-2.5 px-4 sm:px-5 text-right">Nominal (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E0]">
              {filteredMutations.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 text-[#555555] whitespace-nowrap font-mono text-xs">
                    {m.date}
                  </td>
                  <td className="py-2.5 px-4 sm:px-5 font-medium text-[#1A1A1A]">
                    {m.description}
                  </td>
                  <td className="py-2.5 px-4 sm:px-5 whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-xs ${
                        m.category === 'Pemasukan'
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-red-700 bg-red-50 border border-red-200'
                      }`}
                    >
                      {m.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 sm:px-5 text-[#555555] whitespace-nowrap">
                    {m.sourceOrRecipient}
                  </td>
                  <td
                    className={`py-2.5 px-4 sm:px-5 text-right font-mono tabular-nums font-bold whitespace-nowrap ${
                      m.category === 'Pemasukan' ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {m.category === 'Pemasukan' ? '+' : '-'} Rp{' '}
                    {new Intl.NumberFormat('id-ID').format(m.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Accountability Guidelines & Audit Rules: Compact & Vivid */}
        <div className="border-t border-[#E5E5E0] pt-6 sm:pt-8 mb-8 sm:mb-10">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-1 block">
              TATA KELOLA KEUANGAN
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#0A0A0A]">
              Prinsip Akuntabilitas & Verifikasi Kas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs rounded-xs">
              <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-2.5">
                <FileText className="w-4 h-4 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Kuitansi & Bukti Fisik
              </h4>
              <p className="text-xs font-sans text-[#555555] leading-relaxed">
                Seluruh pengeluaran kas wajib disertai nota belanja atau tanda terima sah yang diarsipkan rapi oleh Bendahara RT.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs rounded-xs">
              <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-2.5">
                <Users className="w-4 h-4 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Musyawarah Terbuka
              </h4>
              <p className="text-xs font-sans text-[#555555] leading-relaxed">
                Laporan buku kas dibacakan dan diverifikasi secara terbuka di hadapan warga setiap akhir semester dan rapat pleno tahunan.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs rounded-xs">
              <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Alokasi Dana Darurat
              </h4>
              <p className="text-xs font-sans text-[#555555] leading-relaxed">
                Sebagian kas dialokasikan khusus sebagai dana tanggap darurat dan santunan sosial kedukaan keluarga warga.
              </p>
            </div>
          </div>
        </div>

        {/* Helpful Civic Notice Box at Bottom */}
        <div className="p-4 sm:p-5 bg-teal-50/50 border border-[#00A4B4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00A4B4] text-white flex items-center justify-center shrink-0 mt-0.5">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#007A87]">
                Ada Pertanyaan Mengenai Iuran atau Laporan Kas RT?
              </h4>
              <p className="text-xs font-sans text-[#555555] mt-0.5">
                Warga dapat menghubungi Bendahara RT 01 untuk konfirmasi pembayaran iuran bulanan atau klarifikasi mutasi kas.
              </p>
            </div>
          </div>
          <Link
            to="/kepengurusan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-sans font-bold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-xs whitespace-nowrap rounded-xs"
          >
            <span>Hubungi Bendahara RT</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
