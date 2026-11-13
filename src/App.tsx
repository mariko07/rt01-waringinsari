/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PortalProvider } from './context/PortalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { InformasiPage } from './pages/InformasiPage';
import { InformasiDetailPage } from './pages/InformasiDetailPage';
import { KegiatanPage } from './pages/KegiatanPage';
import { KegiatanDetailPage } from './pages/KegiatanDetailPage';
import { PembangunanPage } from './pages/PembangunanPage';
import { PembangunanDetailPage } from './pages/PembangunanDetailPage';
import { PendudukPage } from './pages/PendudukPage';
import { DokumentasiPage } from './pages/DokumentasiPage';
import { KeuanganPage } from './pages/KeuanganPage';
import { KepengurusanPage } from './pages/KepengurusanPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function AppLayout() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { pathname } = useLocation();

  // Hide public Navbar and Footer on admin and login pages
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1A1A1A] antialiased selection:bg-[#DFFFFF] selection:text-[#1A1A1A]">
      {/* Editorial Top Navbar (Only on Public Pages) */}
      {!isAdminRoute && <Navbar onOpenContactModal={() => setIsContactModalOpen(true)} />}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Routes>
          {/* Public Citizen Portal Routes */}
          <Route
            path="/"
            element={
              <HomePage onOpenContactModal={() => setIsContactModalOpen(true)} />
            }
          />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/wilayah" element={<Navigate to="/profil" replace />} />
          <Route path="/informasi" element={<InformasiPage />} />
          <Route path="/informasi/:slug" element={<InformasiDetailPage />} />
          <Route path="/kegiatan" element={<KegiatanPage />} />
          <Route path="/kegiatan/:slug" element={<KegiatanDetailPage />} />
          <Route path="/pembangunan" element={<PembangunanPage />} />
          <Route path="/pembangunan/:slug" element={<PembangunanDetailPage />} />
          <Route path="/penduduk" element={<PendudukPage />} />
          <Route path="/dokumentasi" element={<DokumentasiPage />} />
          <Route path="/keuangan" element={<KeuanganPage />} />
          <Route path="/kepengurusan" element={<KepengurusanPage />} />

          {/* Standalone Admin Routes (Without Public Header & Footer) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <HomePage onOpenContactModal={() => setIsContactModalOpen(true)} />
            }
          />
        </Routes>
      </main>

      {/* Editorial Civic Footer (Only on Public Pages) */}
      {!isAdminRoute && <Footer />}

      {/* Service & Contact Modal */}
      {!isAdminRoute && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </PortalProvider>
  );
}
