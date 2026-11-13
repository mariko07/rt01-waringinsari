import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { usePortal } from '../context/PortalContext';
import { PengurusItem, PengurusPerson } from '../types';
import {
  AlertCircle,
  Users,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Phone,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export const KepengurusanPage: React.FC = () => {
  const { pengurusList } = usePortal();
  const ketua = pengurusList.find((p) => p.role === 'Ketua RT 01');
  const administrasi = pengurusList.filter((p) => p.category === 'Administrasi');
  const seksiBidang = pengurusList.filter((p) => p.category === 'Seksi Bidang');

  const getPersons = (item: PengurusItem): PengurusPerson[] => {
    if (item.persons && item.persons.length > 0) return item.persons;
    if (item.name) return [{ name: item.name }];
    return [];
  };

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#555555] mb-4">
          <Link to="/" className="hover:text-[#00A4B4] transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-[#1A1A1A] font-semibold">Struktur Kepengurusan RT 01</span>
        </div>

        <SectionHeader
          kicker="ORGANISASI LINGKUNGAN"
          title="Struktur Pengurus RT 01 Waringinsari"
          description="Susunan personil pengurus rukun tetangga masa bakti 2024–2027 beserta pembagian wewenang, bidang operasional, dan pelayanan warga."
          badgeDemo={true}
          className="mb-5 sm:mb-6"
        />

        {/* Demo Disclaimer: Compact */}
        <div className="p-3.5 sm:p-4 bg-amber-50 border border-amber-200 text-xs font-sans text-amber-900 mb-6 sm:mb-8 flex items-start gap-2.5 rounded-xs">
          <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Susunan Pengurus:</strong> Sekretariat, Kebendaharaan, dan Seksi Bidang RT 01 Waringinsari diisi oleh satu atau lebih personil warga sesuai amanah musyawarah warga dan Surat Keputusan (SK) Lurah Condongcatur yang berlaku.
          </div>
        </div>

        {/* Hierarchical Organizational Chart */}
        <div className="mb-10 sm:mb-12">
          {/* Level 1: Ketua RT (Center Anchor) */}
          {ketua && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-lg p-5 sm:p-6 bg-white border-2 border-[#00A4B4] shadow-xs text-center relative rounded-xs">
                <span className="text-[11px] uppercase tracking-widest font-sans font-bold text-[#00A4B4] bg-teal-50 px-2.5 py-0.5 border border-[#00A4B4]/25 inline-block mb-2 rounded-xs">
                  PIMPINAN LINGKUNGAN
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-1">
                  {ketua.name}
                </h3>
                <div className="text-xs font-sans font-semibold text-[#555555] mb-2.5">
                  {ketua.role} · Periode {ketua.tenure}
                </div>
                <p className="text-xs font-sans text-[#555555] leading-relaxed max-w-md mx-auto">
                  {ketua.duties}
                </p>
              </div>

              {/* Connector line down to administrative tier */}
              <div className="w-0.5 h-6 bg-[#00A4B4]/30" />
            </div>
          )}

          {/* Level 2: Administrasi & Keuangan (Sekretariat & Kebendaharaan - Multi-Person) */}
          <div className="relative">
            {/* Horizontal crossbar on desktop */}
            <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-[#00A4B4]/30" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full pt-4">
              {administrasi.map((adm) => {
                const persons = getPersons(adm);
                return (
                  <div
                    key={adm.id}
                    className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs relative rounded-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans mb-3 pb-2 border-b border-[#E5E5E0]">
                        <span className="font-bold text-[#00A4B4] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span>{adm.role}</span>
                        </span>
                        <span className="text-[11px] font-medium text-[#555555] bg-slate-100 px-2 py-0.5 rounded-xs">
                          {persons.length} Personil
                        </span>
                      </div>

                      {/* Multi-Person List for Sekretaris / Bendahara */}
                      <div className="space-y-2 mb-3">
                        {persons.map((person, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-2.5 bg-slate-50/70 border border-[#E5E5E0] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                          >
                            <div>
                              <div className="font-serif text-base font-bold text-[#0A0A0A]">
                                {person.name}
                              </div>
                              {person.subRole && (
                                <div className="text-[11px] font-sans font-medium text-[#00A4B4]">
                                  {person.subRole}
                                </div>
                              )}
                            </div>
                            {person.phone && (
                              <span className="text-[11px] font-mono text-[#555555] sm:text-right shrink-0">
                                {person.phone}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="text-xs font-sans text-[#555555] leading-relaxed">
                        {adm.duties}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#E5E5E0] text-[11px] font-sans text-[#555555] flex items-center justify-between">
                      <span>Masa Bakti: {adm.tenure}</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Terdaftar SK</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connector down to Seksi Bidang */}
          <div className="flex justify-center my-4">
            <div className="w-0.5 h-6 bg-[#00A4B4]/30" />
          </div>

          {/* Level 3: Seksi Bidang Pelayanan Warga (Multi-Person Support) */}
          <div className="w-full">
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] bg-teal-50 px-2.5 py-0.5 border border-[#00A4B4]/25 inline-block rounded-xs">
                SEKSI BIDANG OPERASIONAL LINGKUNGAN
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {seksiBidang.map((seksi) => {
                const persons = getPersons(seksi);
                return (
                  <div
                    key={seksi.id}
                    className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs flex flex-col justify-between rounded-xs"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans mb-2 pb-2 border-b border-[#E5E5E0]">
                        <span className="font-bold text-[#00A4B4] uppercase tracking-wider text-[11px]">
                          {seksi.role}
                        </span>
                        <span className="text-[11px] font-medium text-[#555555] bg-slate-100 px-2 py-0.5 rounded-xs">
                          {persons.length} Anggota / Personil
                        </span>
                      </div>

                      {/* Multi-Person Roster in Seksi Bidang */}
                      <div className="space-y-1.5 my-3">
                        {persons.map((person, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-2 bg-slate-50/60 border border-[#E5E5E0] rounded-xs flex flex-wrap items-center justify-between gap-1.5"
                          >
                            <span className="text-xs font-medium text-[#0A0A0A]">
                              {person.name}
                            </span>
                            {person.subRole && (
                              <span className="text-[10px] text-[#007A87] font-semibold bg-teal-50 px-1.5 py-0.5 rounded-xs border border-[#00A4B4]/25 shrink-0">
                                {person.subRole}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="text-xs font-sans text-[#555555] leading-relaxed">
                        {seksi.duties}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-[#E5E5E0] text-[11px] font-sans text-[#555555] flex items-center justify-between">
                      <span>Periode {seksi.tenure}</span>
                      <span className="font-semibold text-emerald-700">Aktif Berjalan</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Civic Ethics & Neighborhood Values: Compact */}
        <div className="border-t border-[#E5E5E0] pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="max-w-3xl mb-4">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#00A4B4] mb-1 block">
              PRINSIP KEPENGURUSAN
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#0A0A0A]">
              Tata Nilai Pengabdian Lingkungan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#555555]">
            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs rounded-xs">
              <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-2.5">
                <HeartHandshake className="w-4 h-4 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Swadaya & Sukarela
              </h4>
              <p className="leading-relaxed">
                Pengurus RT mengemban amanah secara sukarela demi kemaslahatan warga tanpa membebankan pungutan di luar ketetapan musyawarah bersama.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs rounded-xs">
              <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Kesetaraan Warga
              </h4>
              <p className="leading-relaxed">
                Setiap warga, baik penduduk tetap, keluarga muda, penghuni sewa/kos, maupun pelaku usaha memiliki hak pelayanan dan perlindungan yang setara.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] transition-all shadow-2xs rounded-xs">
              <div className="w-8 h-8 rounded-md bg-teal-50 text-[#00A4B4] border border-[#00A4B4]/25 flex items-center justify-center mb-2.5">
                <Sparkles className="w-4 h-4 text-[#00A4B4]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Responsif & Adaptif
              </h4>
              <p className="leading-relaxed">
                Mengutamakan respon cepat terhadap keluhan ketertiban, kebersihan lingkungan, serta memanfaatkan teknologi portal terbuka untuk kemudahan warga.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Civic Contact CTA */}
        <div className="p-4 sm:p-5 bg-teal-50/50 border border-[#00A4B4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00A4B4] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#007A87]">
                Perlu Surat Pengantar atau Pelayanan Administrasi?
              </h4>
              <p className="text-xs font-sans text-[#555555] mt-0.5">
                Silakan hubungi Ketua, Sekretaris, atau Bendahara RT 01 pada jam pelayanan (16.00 – 20.00 WIB) dengan membawa dokumen KTP dan KK.
              </p>
            </div>
          </div>
          <Link
            to="/informasi/pelayanan-administrasi-kependudukan-pengantar-rt"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-sans font-bold text-white bg-[#00A4B4] hover:bg-[#008d9b] transition-colors shadow-xs whitespace-nowrap rounded-xs"
          >
            <span>Prosedur Pengantar RT</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
