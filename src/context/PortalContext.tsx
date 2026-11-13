import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InformasiItem,
  KegiatanItem,
  PembangunanItem,
  KeuanganSummary,
  KeuanganItem,
  PengurusItem,
  PengurusPerson,
  PendudukStat,
} from '../types';
import {
  INFORMASI_LIST as INITIAL_INFORMASI,
  KEGIATAN_LIST as INITIAL_KEGIATAN,
  PEMBANGUNAN_LIST as INITIAL_PEMBANGUNAN,
  KEUANGAN_DATA as INITIAL_KEUANGAN,
  PENGURUS_LIST as INITIAL_PENGURUS,
  PENDUDUK_DATA as INITIAL_PENDUDUK,
} from '../data/portalData';

interface AdminUser {
  username: string;
  name: string;
  role: string;
}

interface PortalContextType {
  // Auth
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (username: string, password: string) => { success: boolean; message?: string };
  logout: () => void;

  // Informasi
  informasiList: InformasiItem[];
  addInformasi: (item: Omit<InformasiItem, 'id' | 'slug'>) => void;
  updateInformasi: (id: string, updated: Partial<InformasiItem>) => void;
  deleteInformasi: (id: string) => void;

  // Kegiatan
  kegiatanList: KegiatanItem[];
  addKegiatan: (item: Omit<KegiatanItem, 'id' | 'slug'>) => void;
  updateKegiatan: (id: string, updated: Partial<KegiatanItem>) => void;
  deleteKegiatan: (id: string) => void;

  // Pembangunan
  pembangunanList: PembangunanItem[];
  addPembangunan: (item: Omit<PembangunanItem, 'id' | 'slug'>) => void;
  updatePembangunan: (id: string, updated: Partial<PembangunanItem>) => void;
  deletePembangunan: (id: string) => void;

  // Keuangan
  keuanganData: KeuanganSummary;
  addMutasi: (mutasi: Omit<KeuanganItem, 'id'>) => void;
  updateMutasi: (id: string, updated: Partial<KeuanganItem>) => void;
  deleteMutasi: (id: string) => void;
  updateKeuanganSummary: (pemasukan: number, pengeluaran: number, saldo: number) => void;

  // Pengurus
  pengurusList: PengurusItem[];
  updatePengurusItem: (id: string, updated: Partial<PengurusItem>) => void;
  addPersonilToPengurus: (pengurusId: string, person: PengurusPerson) => void;
  updatePersonilInPengurus: (pengurusId: string, personIndex: number, person: PengurusPerson) => void;
  removePersonilFromPengurus: (pengurusId: string, personIndex: number) => void;

  // Penduduk
  pendudukData: PendudukStat;
  updatePendudukData: (data: Partial<PendudukStat>) => void;

  // Reset
  resetToDefaultData: () => void;
}

const STORAGE_KEY = 'waringinsari_portal_state_v1';
const AUTH_KEY = 'waringinsari_portal_auth_v1';

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored).isAuthenticated : false;
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored).adminUser : null;
    } catch {
      return null;
    }
  });

  // Load Data State
  const [informasiList, setInformasiList] = useState<InformasiItem[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_informasi`);
      return stored ? JSON.parse(stored) : INITIAL_INFORMASI;
    } catch {
      return INITIAL_INFORMASI;
    }
  });

  const [kegiatanList, setKegiatanList] = useState<KegiatanItem[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_kegiatan`);
      return stored ? JSON.parse(stored) : INITIAL_KEGIATAN;
    } catch {
      return INITIAL_KEGIATAN;
    }
  });

  const [pembangunanList, setPembangunanList] = useState<PembangunanItem[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_pembangunan`);
      return stored ? JSON.parse(stored) : INITIAL_PEMBANGUNAN;
    } catch {
      return INITIAL_PEMBANGUNAN;
    }
  });

  const [keuanganData, setKeuanganData] = useState<KeuanganSummary>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_keuangan`);
      return stored ? JSON.parse(stored) : INITIAL_KEUANGAN;
    } catch {
      return INITIAL_KEUANGAN;
    }
  });

  const [pengurusList, setPengurusList] = useState<PengurusItem[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_pengurus`);
      return stored ? JSON.parse(stored) : INITIAL_PENGURUS;
    } catch {
      return INITIAL_PENGURUS;
    }
  });

  const [pendudukData, setPendudukData] = useState<PendudukStat>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_penduduk`);
      return stored ? JSON.parse(stored) : INITIAL_PENDUDUK;
    } catch {
      return INITIAL_PENDUDUK;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_informasi`, JSON.stringify(informasiList));
    } catch {}
  }, [informasiList]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_kegiatan`, JSON.stringify(kegiatanList));
    } catch {}
  }, [kegiatanList]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_pembangunan`, JSON.stringify(pembangunanList));
    } catch {}
  }, [pembangunanList]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_keuangan`, JSON.stringify(keuanganData));
    } catch {}
  }, [keuanganData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_pengurus`, JSON.stringify(pengurusList));
    } catch {}
  }, [pengurusList]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_penduduk`, JSON.stringify(pendudukData));
    } catch {}
  }, [pendudukData]);

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated, adminUser }));
    } catch {}
  }, [isAuthenticated, adminUser]);

  // Auth methods
  const login = (username: string, password: string) => {
    // Valid credentials for RT Officers demo
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (
      (cleanUser === 'admin' && (cleanPass === 'admin' || cleanPass === 'admin123' || cleanPass === 'waringinsari')) ||
      (cleanUser === 'pengurus' && (cleanPass === 'pengurus' || cleanPass === 'admin123')) ||
      (cleanUser === 'sekretariat' && cleanPass === 'admin123')
    ) {
      const user: AdminUser = {
        username: cleanUser,
        name: cleanUser === 'pengurus' ? 'Pengurus RT 01' : 'Administrator RT 01 Waringinsari',
        role: 'Pengurus Inti RT 01',
      };
      setIsAuthenticated(true);
      setAdminUser(user);
      return { success: true };
    }

    return {
      success: false,
      message: 'Nama pengguna atau kata sandi tidak cocok. Gunakan admin / admin123.',
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  // Informasi CRUD
  const addInformasi = (item: Omit<InformasiItem, 'id' | 'slug'>) => {
    const newId = `info-${Date.now()}`;
    const newSlug = `${slugify(item.title)}-${Date.now().toString().slice(-4)}`;
    const newItem: InformasiItem = {
      ...item,
      id: newId,
      slug: newSlug,
    };
    setInformasiList((prev) => [newItem, ...prev]);
  };

  const updateInformasi = (id: string, updated: Partial<InformasiItem>) => {
    setInformasiList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteInformasi = (id: string) => {
    setInformasiList((prev) => prev.filter((item) => item.id !== id));
  };

  // Kegiatan CRUD
  const addKegiatan = (item: Omit<KegiatanItem, 'id' | 'slug'>) => {
    const newId = `keg-${Date.now()}`;
    const newSlug = `${slugify(item.title)}-${Date.now().toString().slice(-4)}`;
    const newItem: KegiatanItem = {
      ...item,
      id: newId,
      slug: newSlug,
    };
    setKegiatanList((prev) => [newItem, ...prev]);
  };

  const updateKegiatan = (id: string, updated: Partial<KegiatanItem>) => {
    setKegiatanList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteKegiatan = (id: string) => {
    setKegiatanList((prev) => prev.filter((item) => item.id !== id));
  };

  // Pembangunan CRUD
  const addPembangunan = (item: Omit<PembangunanItem, 'id' | 'slug'>) => {
    const newId = `pem-${Date.now()}`;
    const newSlug = `${slugify(item.title)}-${Date.now().toString().slice(-4)}`;
    const newItem: PembangunanItem = {
      ...item,
      id: newId,
      slug: newSlug,
    };
    setPembangunanList((prev) => [newItem, ...prev]);
  };

  const updatePembangunan = (id: string, updated: Partial<PembangunanItem>) => {
    setPembangunanList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deletePembangunan = (id: string) => {
    setPembangunanList((prev) => prev.filter((item) => item.id !== id));
  };

  // Keuangan CRUD
  const addMutasi = (mutasi: Omit<KeuanganItem, 'id'>) => {
    const newId = `mut-${Date.now()}`;
    const newMutasi: KeuanganItem = {
      ...mutasi,
      id: newId,
    };

    setKeuanganData((prev) => {
      const isPemasukan = mutasi.category === 'Pemasukan';
      const newPemasukan = isPemasukan ? prev.totalPemasukan + mutasi.amount : prev.totalPemasukan;
      const newPengeluaran = !isPemasukan ? prev.totalPengeluaran + mutasi.amount : prev.totalPengeluaran;
      const newSaldo = isPemasukan ? prev.saldoAkhir + mutasi.amount : prev.saldoAkhir - mutasi.amount;

      return {
        ...prev,
        totalPemasukan: newPemasukan,
        totalPengeluaran: newPengeluaran,
        saldoAkhir: newSaldo,
        lastUpdated: new Date().toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        mutations: [newMutasi, ...prev.mutations],
      };
    });
  };

  const updateMutasi = (id: string, updated: Partial<KeuanganItem>) => {
    setKeuanganData((prev) => {
      const oldItem = prev.mutations.find((m) => m.id === id);
      if (!oldItem) return prev;

      const newItem: KeuanganItem = { ...oldItem, ...updated };
      const newMutations = prev.mutations.map((m) => (m.id === id ? newItem : m));

      let pemasukan = 0;
      let pengeluaran = 0;
      newMutations.forEach((m) => {
        if (m.category === 'Pemasukan') pemasukan += m.amount;
        else pengeluaran += m.amount;
      });

      const oldNet = oldItem.category === 'Pemasukan' ? oldItem.amount : -oldItem.amount;
      const newNet = newItem.category === 'Pemasukan' ? newItem.amount : -newItem.amount;
      const newSaldo = prev.saldoAkhir - oldNet + newNet;

      return {
        ...prev,
        totalPemasukan: pemasukan,
        totalPengeluaran: pengeluaran,
        saldoAkhir: newSaldo,
        mutations: newMutations,
      };
    });
  };

  const deleteMutasi = (id: string) => {
    setKeuanganData((prev) => {
      const target = prev.mutations.find((m) => m.id === id);
      if (!target) return prev;

      const isPemasukan = target.category === 'Pemasukan';
      const newPemasukan = isPemasukan ? prev.totalPemasukan - target.amount : prev.totalPemasukan;
      const newPengeluaran = !isPemasukan ? prev.totalPengeluaran - target.amount : prev.totalPengeluaran;
      const newSaldo = isPemasukan ? prev.saldoAkhir - target.amount : prev.saldoAkhir + target.amount;

      return {
        ...prev,
        totalPemasukan: Math.max(0, newPemasukan),
        totalPengeluaran: Math.max(0, newPengeluaran),
        saldoAkhir: newSaldo,
        mutations: prev.mutations.filter((m) => m.id !== id),
      };
    });
  };

  const updateKeuanganSummary = (pemasukan: number, pengeluaran: number, saldo: number) => {
    setKeuanganData((prev) => ({
      ...prev,
      totalPemasukan: pemasukan,
      totalPengeluaran: pengeluaran,
      saldoAkhir: saldo,
      lastUpdated: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }));
  };

  // Pengurus CRUD
  const updatePengurusItem = (id: string, updated: Partial<PengurusItem>) => {
    setPengurusList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addPersonilToPengurus = (pengurusId: string, person: PengurusPerson) => {
    setPengurusList((prev) =>
      prev.map((item) => {
        if (item.id !== pengurusId) return item;
        const currentPersons = item.persons || (item.name ? [{ name: item.name }] : []);
        return {
          ...item,
          persons: [...currentPersons, person],
        };
      })
    );
  };

  const updatePersonilInPengurus = (pengurusId: string, personIndex: number, person: PengurusPerson) => {
    setPengurusList((prev) =>
      prev.map((item) => {
        if (item.id !== pengurusId) return item;
        const currentPersons = item.persons || (item.name ? [{ name: item.name }] : []);
        const updated = [...currentPersons];
        updated[personIndex] = person;
        return {
          ...item,
          persons: updated,
        };
      })
    );
  };

  const removePersonilFromPengurus = (pengurusId: string, personIndex: number) => {
    setPengurusList((prev) =>
      prev.map((item) => {
        if (item.id !== pengurusId) return item;
        const currentPersons = item.persons || (item.name ? [{ name: item.name }] : []);
        const updated = currentPersons.filter((_, idx) => idx !== personIndex);
        return {
          ...item,
          persons: updated,
        };
      })
    );
  };

  // Penduduk CRUD
  const updatePendudukData = (data: Partial<PendudukStat>) => {
    setPendudukData((prev) => ({
      ...prev,
      ...data,
      updatePeriod: new Date().toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      }),
    }));
  };

  // Reset function to restore demo data
  const resetToDefaultData = () => {
    setInformasiList(INITIAL_INFORMASI);
    setKegiatanList(INITIAL_KEGIATAN);
    setPembangunanList(INITIAL_PEMBANGUNAN);
    setKeuanganData(INITIAL_KEUANGAN);
    setPengurusList(INITIAL_PENGURUS);
    setPendudukData(INITIAL_PENDUDUK);

    localStorage.removeItem(`${STORAGE_KEY}_informasi`);
    localStorage.removeItem(`${STORAGE_KEY}_kegiatan`);
    localStorage.removeItem(`${STORAGE_KEY}_pembangunan`);
    localStorage.removeItem(`${STORAGE_KEY}_keuangan`);
    localStorage.removeItem(`${STORAGE_KEY}_pengurus`);
    localStorage.removeItem(`${STORAGE_KEY}_penduduk`);
  };

  return (
    <PortalContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        informasiList,
        addInformasi,
        updateInformasi,
        deleteInformasi,
        kegiatanList,
        addKegiatan,
        updateKegiatan,
        deleteKegiatan,
        pembangunanList,
        addPembangunan,
        updatePembangunan,
        deletePembangunan,
        keuanganData,
        addMutasi,
        updateMutasi,
        deleteMutasi,
        updateKeuanganSummary,
        pengurusList,
        updatePengurusItem,
        addPersonilToPengurus,
        updatePersonilInPengurus,
        removePersonilFromPengurus,
        pendudukData,
        updatePendudukData,
        resetToDefaultData,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
