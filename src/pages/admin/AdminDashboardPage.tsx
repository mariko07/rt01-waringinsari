import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePortal } from '../../context/PortalContext';
import {
  LayoutDashboard,
  Wallet,
  Newspaper,
  Calendar,
  Building,
  Users,
  BarChart3,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Pencil,
  Search,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Clock,
  MapPin,
  Shield,
  X,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Tag,
  Check,
} from 'lucide-react';
import {
  InformasiItem,
  KegiatanItem,
  PembangunanItem,
  KeuanganItem,
  PengurusItem,
  PengurusPerson,
} from '../../types';

type AdminTab = 'home' | 'keuangan' | 'informasi' | 'kegiatan' | 'pembangunan' | 'pengurus' | 'penduduk';

interface ToastState {
  type: 'success' | 'error' | 'info';
  message: string;
}

export const AdminDashboardPage: React.FC = () => {
  const {
    isAuthenticated,
    adminUser,
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
    pengurusList,
    addPersonilToPengurus,
    updatePersonilInPengurus,
    removePersonilFromPengurus,
    pendudukData,
    updatePendudukData,
    resetToDefaultData,
  } = usePortal();

  const navigate = useNavigate();

  // Guard route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Main navigation & drawer state
  const [activeTab, setActiveTab] = useState<AdminTab>('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Profile dropdown state
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileDropdownOpen]);

  // Toast Notification System
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3800);
  };

  // --- DELETE CONFIRMATION MODAL STATE ---
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  // --- PAGINATION HELPER ---
  const ITEMS_PER_PAGE = 7;

  // =========================================================================
  // 1. MODUL INFORMASI STATE & MODALS
  // =========================================================================
  const [infoSearch, setInfoSearch] = useState('');
  const [infoCategoryFilter, setInfoCategoryFilter] = useState<string>('Semua');
  const [infoPage, setInfoPage] = useState(1);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoEditingItem, setInfoEditingItem] = useState<InformasiItem | null>(null);
  const [infoForm, setInfoForm] = useState({
    title: '',
    category: 'Pengumuman' as 'Pengumuman' | 'Informasi RT' | 'Agenda' | 'Pemberitahuan Penting',
    date: '',
    author: 'Pengurus RT 01',
    summary: '',
    content: '',
    isImportant: false,
  });

  const filteredInformasi = useMemo(() => {
    return informasiList.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(infoSearch.toLowerCase()) ||
        item.summary.toLowerCase().includes(infoSearch.toLowerCase()) ||
        item.author.toLowerCase().includes(infoSearch.toLowerCase());
      const matchCat =
        infoCategoryFilter === 'Semua' || item.category === infoCategoryFilter;
      return matchSearch && matchCat;
    });
  }, [informasiList, infoSearch, infoCategoryFilter]);

  const pagedInformasi = useMemo(() => {
    const start = (infoPage - 1) * ITEMS_PER_PAGE;
    return filteredInformasi.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInformasi, infoPage]);

  const handleOpenAddInfo = () => {
    setInfoEditingItem(null);
    setInfoForm({
      title: '',
      category: 'Pengumuman',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      author: 'Pengurus RT 01',
      summary: '',
      content: '',
      isImportant: false,
    });
    setInfoModalOpen(true);
  };

  const handleOpenEditInfo = (item: InformasiItem) => {
    setInfoEditingItem(item);
    setInfoForm({
      title: item.title,
      category: item.category,
      date: item.date,
      author: item.author,
      summary: item.summary,
      content: item.content ? item.content.join('\n\n') : '',
      isImportant: !!item.isImportant,
    });
    setInfoModalOpen(true);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!infoForm.title.trim() || !infoForm.summary.trim()) {
      showToast('Terjadi kesalahan. Judul dan ringkasan wajib diisi.', 'error');
      return;
    }

    const paragraphs = infoForm.content
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const contentArray = paragraphs.length > 0 ? paragraphs : [infoForm.summary.trim()];

    if (infoEditingItem) {
      updateInformasi(infoEditingItem.id, {
        title: infoForm.title.trim(),
        category: infoForm.category,
        date: infoForm.date.trim() || infoEditingItem.date,
        author: infoForm.author.trim() || 'Pengurus RT 01',
        summary: infoForm.summary.trim(),
        content: contentArray,
        isImportant: infoForm.isImportant,
      });
      showToast('Perubahan berhasil disimpan.');
    } else {
      addInformasi({
        title: infoForm.title.trim(),
        category: infoForm.category,
        date: infoForm.date.trim() || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        author: infoForm.author.trim() || 'Pengurus RT 01',
        summary: infoForm.summary.trim(),
        content: contentArray,
        isImportant: infoForm.isImportant,
      });
      showToast('Data berhasil ditambahkan.');
    }

    setInfoModalOpen(false);
  };

  const handleDeleteInfo = (item: InformasiItem) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Hapus Informasi / Kabar',
      description: `Apakah Anda yakin ingin menghapus kabar "${item.title}"?`,
      onConfirm: () => {
        deleteInformasi(item.id);
        setDeleteConfirm(null);
        showToast('Data berhasil dihapus.');
      },
    });
  };

  // =========================================================================
  // 2. MODUL AGENDA (KEGIATAN) STATE & MODALS
  // =========================================================================
  const [kegSearch, setKegSearch] = useState('');
  const [kegStatusFilter, setKegStatusFilter] = useState<string>('Semua');
  const [kegPage, setKegPage] = useState(1);
  const [kegModalOpen, setKegModalOpen] = useState(false);
  const [kegEditingItem, setKegEditingItem] = useState<KegiatanItem | null>(null);
  const [kegForm, setKegForm] = useState({
    title: '',
    category: 'Kerja Bakti' as 'Kerja Bakti' | 'Rapat Warga' | 'Sosial' | 'Keagamaan' | 'Pertemuan Pengurus',
    date: '',
    time: '07.00 - Selesai WIB',
    location: 'Lingkungan RT 01 Waringinsari',
    status: 'Akan Datang' as 'Akan Datang' | 'Selesai',
    summary: '',
    picName: 'Pengurus RT 01',
  });

  const filteredKegiatan = useMemo(() => {
    return kegiatanList.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(kegSearch.toLowerCase()) ||
        item.location.toLowerCase().includes(kegSearch.toLowerCase()) ||
        item.summary.toLowerCase().includes(kegSearch.toLowerCase());
      const matchStatus =
        kegStatusFilter === 'Semua' || item.status === kegStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [kegiatanList, kegSearch, kegStatusFilter]);

  const pagedKegiatan = useMemo(() => {
    const start = (kegPage - 1) * ITEMS_PER_PAGE;
    return filteredKegiatan.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredKegiatan, kegPage]);

  const handleOpenAddKegiatan = () => {
    setKegEditingItem(null);
    setKegForm({
      title: '',
      category: 'Kerja Bakti',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: '07.00 - Selesai WIB',
      location: 'Lingkungan RT 01 Waringinsari',
      status: 'Akan Datang',
      summary: '',
      picName: 'Pengurus RT 01',
    });
    setKegModalOpen(true);
  };

  const handleOpenEditKegiatan = (item: KegiatanItem) => {
    setKegEditingItem(item);
    setKegForm({
      title: item.title,
      category: item.category,
      date: item.date,
      time: item.time,
      location: item.location,
      status: item.status,
      summary: item.summary,
      picName: item.picName || 'Pengurus RT 01',
    });
    setKegModalOpen(true);
  };

  const handleSaveKegiatan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kegForm.title.trim() || !kegForm.summary.trim()) {
      showToast('Terjadi kesalahan. Nama agenda dan ringkasan wajib diisi.', 'error');
      return;
    }

    if (kegEditingItem) {
      updateKegiatan(kegEditingItem.id, {
        title: kegForm.title.trim(),
        category: kegForm.category,
        date: kegForm.date.trim() || kegEditingItem.date,
        time: kegForm.time.trim() || kegEditingItem.time,
        location: kegForm.location.trim() || kegEditingItem.location,
        status: kegForm.status,
        summary: kegForm.summary.trim(),
        description: [kegForm.summary.trim()],
        picName: kegForm.picName.trim(),
      });
      showToast('Perubahan berhasil disimpan.');
    } else {
      addKegiatan({
        title: kegForm.title.trim(),
        category: kegForm.category,
        date: kegForm.date.trim() || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        time: kegForm.time.trim() || '07.00 - Selesai WIB',
        location: kegForm.location.trim() || 'Lingkungan RT 01 Waringinsari',
        status: kegForm.status,
        summary: kegForm.summary.trim(),
        description: [kegForm.summary.trim()],
        picName: kegForm.picName.trim(),
      });
      showToast('Data berhasil ditambahkan.');
    }

    setKegModalOpen(false);
  };

  const handleDeleteKegiatan = (item: KegiatanItem) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Hapus Agenda Warga',
      description: `Apakah Anda yakin ingin menghapus agenda "${item.title}"?`,
      onConfirm: () => {
        deleteKegiatan(item.id);
        setDeleteConfirm(null);
        showToast('Data berhasil dihapus.');
      },
    });
  };

  // =========================================================================
  // 3. MODUL PEMBANGUNAN STATE & MODALS
  // =========================================================================
  const [pemSearch, setPemSearch] = useState('');
  const [pemStatusFilter, setPemStatusFilter] = useState<string>('Semua');
  const [pemPage, setPemPage] = useState(1);
  const [pemModalOpen, setPemModalOpen] = useState(false);
  const [pemEditingItem, setPemEditingItem] = useState<PembangunanItem | null>(null);
  const [pemForm, setPemForm] = useState({
    title: '',
    location: 'Gang Timur RT 01',
    sourceOfFunds: 'Kas Swadaya Warga & Bantuan',
    budget: '',
    startDate: '',
    targetDate: '',
    status: 'Dalam Pengerjaan' as 'Perencanaan' | 'Dalam Pengerjaan' | 'Selesai' | 'Tertunda',
    progressPercent: 50,
    description: '',
  });

  const filteredPembangunan = useMemo(() => {
    return pembangunanList.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(pemSearch.toLowerCase()) ||
        item.location.toLowerCase().includes(pemSearch.toLowerCase()) ||
        item.sourceOfFunds.toLowerCase().includes(pemSearch.toLowerCase());
      const matchStatus =
        pemStatusFilter === 'Semua' || item.status === pemStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [pembangunanList, pemSearch, pemStatusFilter]);

  const pagedPembangunan = useMemo(() => {
    const start = (pemPage - 1) * ITEMS_PER_PAGE;
    return filteredPembangunan.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPembangunan, pemPage]);

  const handleOpenAddPembangunan = () => {
    setPemEditingItem(null);
    setPemForm({
      title: '',
      location: 'Gang Timur RT 01',
      sourceOfFunds: 'Kas Swadaya Warga & Bantuan',
      budget: '',
      startDate: '01 November 2026',
      targetDate: '15 Desember 2026',
      status: 'Dalam Pengerjaan',
      progressPercent: 50,
      description: '',
    });
    setPemModalOpen(true);
  };

  const handleOpenEditPembangunan = (item: PembangunanItem) => {
    setPemEditingItem(item);
    setPemForm({
      title: item.title,
      location: item.location,
      sourceOfFunds: item.sourceOfFunds,
      budget: item.budget.toString(),
      startDate: item.startDate,
      targetDate: item.targetDate,
      status: item.status,
      progressPercent: item.progressPercent,
      description: item.description,
    });
    setPemModalOpen(true);
  };

  const handleSavePembangunan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pemForm.title.trim() || !pemForm.description.trim()) {
      showToast('Terjadi kesalahan. Judul proyek dan deskripsi wajib diisi.', 'error');
      return;
    }

    const budgetNum = parseInt(pemForm.budget.replace(/\D/g, ''), 10) || 0;

    if (pemEditingItem) {
      updatePembangunan(pemEditingItem.id, {
        title: pemForm.title.trim(),
        location: pemForm.location.trim() || pemEditingItem.location,
        sourceOfFunds: pemForm.sourceOfFunds.trim() || pemEditingItem.sourceOfFunds,
        budget: budgetNum,
        startDate: pemForm.startDate.trim() || pemEditingItem.startDate,
        targetDate: pemForm.targetDate.trim() || pemEditingItem.targetDate,
        status: pemForm.status,
        progressPercent: Number(pemForm.progressPercent),
        description: pemForm.description.trim(),
      });
      showToast('Perubahan berhasil disimpan.');
    } else {
      addPembangunan({
        title: pemForm.title.trim(),
        location: pemForm.location.trim() || 'Gang Timur RT 01',
        sourceOfFunds: pemForm.sourceOfFunds.trim() || 'Kas Swadaya Warga & Bantuan',
        budget: budgetNum,
        startDate: pemForm.startDate.trim() || '01 November 2026',
        targetDate: pemForm.targetDate.trim() || '15 Desember 2026',
        status: pemForm.status,
        progressPercent: Number(pemForm.progressPercent),
        description: pemForm.description.trim(),
        fullDetails: [pemForm.description.trim()],
      });
      showToast('Data berhasil ditambahkan.');
    }

    setPemModalOpen(false);
  };

  const handleDeletePembangunan = (item: PembangunanItem) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Hapus Proyek Sarpras',
      description: `Apakah Anda yakin ingin menghapus proyek "${item.title}"?`,
      onConfirm: () => {
        deletePembangunan(item.id);
        setDeleteConfirm(null);
        showToast('Data berhasil dihapus.');
      },
    });
  };

  // =========================================================================
  // 4. MODUL PERSONIL (KEPENGURUSAN) STATE & MODALS
  // =========================================================================
  const [pengSearch, setPengSearch] = useState('');
  const [pengRoleFilter, setPengRoleFilter] = useState<string>('Semua');
  const [pengPage, setPengPage] = useState(1);
  const [pengModalOpen, setPengModalOpen] = useState(false);
  const [pengEditingPerson, setPengEditingPerson] = useState<{
    pengurusId: string;
    personIndex: number;
    person: PengurusPerson;
  } | null>(null);
  const [pengForm, setPengForm] = useState({
    pengurusId: pengurusList[0]?.id || '',
    name: '',
    subRole: '',
    phone: '',
  });

  // Flatten personil into tabular entries with department mapping
  interface FlatPersonil {
    uniqueKey: string;
    pengurusId: string;
    personIndex: number;
    roleName: string;
    category: string;
    name: string;
    subRole: string;
    phone: string;
  }

  const allFlatPersonil: FlatPersonil[] = useMemo(() => {
    const list: FlatPersonil[] = [];
    pengurusList.forEach((peng) => {
      const persons = peng.persons && peng.persons.length > 0
        ? peng.persons
        : peng.name ? [{ name: peng.name }] : [];

      persons.forEach((p, idx) => {
        list.push({
          uniqueKey: `${peng.id}-${idx}-${p.name}`,
          pengurusId: peng.id,
          personIndex: idx,
          roleName: peng.role,
          category: peng.category,
          name: p.name,
          subRole: p.subRole || peng.role,
          phone: p.phone || '-',
        });
      });
    });
    return list;
  }, [pengurusList]);

  const filteredPersonil = useMemo(() => {
    return allFlatPersonil.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(pengSearch.toLowerCase()) ||
        p.roleName.toLowerCase().includes(pengSearch.toLowerCase()) ||
        p.subRole.toLowerCase().includes(pengSearch.toLowerCase()) ||
        p.phone.toLowerCase().includes(pengSearch.toLowerCase());
      const matchRole =
        pengRoleFilter === 'Semua' || p.roleName === pengRoleFilter;
      return matchSearch && matchRole;
    });
  }, [allFlatPersonil, pengSearch, pengRoleFilter]);

  const pagedPersonil = useMemo(() => {
    const start = (pengPage - 1) * ITEMS_PER_PAGE;
    return filteredPersonil.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPersonil, pengPage]);

  const handleOpenAddPersonil = () => {
    setPengEditingPerson(null);
    setPengForm({
      pengurusId: pengurusList[0]?.id || '',
      name: '',
      subRole: '',
      phone: '',
    });
    setPengModalOpen(true);
  };

  const handleOpenEditPersonil = (item: FlatPersonil) => {
    setPengEditingPerson({
      pengurusId: item.pengurusId,
      personIndex: item.personIndex,
      person: {
        name: item.name,
        subRole: item.subRole,
        phone: item.phone !== '-' ? item.phone : '',
      },
    });
    setPengForm({
      pengurusId: item.pengurusId,
      name: item.name,
      subRole: item.subRole,
      phone: item.phone !== '-' ? item.phone : '',
    });
    setPengModalOpen(true);
  };

  const handleSavePersonil = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pengForm.name.trim() || !pengForm.pengurusId) {
      showToast('Terjadi kesalahan. Nama personil dan bidang wajib dipilih.', 'error');
      return;
    }

    if (pengEditingPerson) {
      updatePersonilInPengurus(
        pengEditingPerson.pengurusId,
        pengEditingPerson.personIndex,
        {
          name: pengForm.name.trim(),
          subRole: pengForm.subRole.trim() || undefined,
          phone: pengForm.phone.trim() || undefined,
        }
      );
      showToast('Perubahan berhasil disimpan.');
    } else {
      addPersonilToPengurus(pengForm.pengurusId, {
        name: pengForm.name.trim(),
        subRole: pengForm.subRole.trim() || undefined,
        phone: pengForm.phone.trim() || undefined,
      });
      showToast('Data berhasil ditambahkan.');
    }

    setPengModalOpen(false);
  };

  const handleDeletePersonil = (item: FlatPersonil) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Hapus Personil Pengurus',
      description: `Apakah Anda yakin ingin menghapus ${item.name} dari jabatan ${item.roleName}?`,
      onConfirm: () => {
        removePersonilFromPengurus(item.pengurusId, item.personIndex);
        setDeleteConfirm(null);
        showToast('Data berhasil dihapus.');
      },
    });
  };

  // =========================================================================
  // 5. MODUL DATA KEPENDUDUKAN STATE & MODALS
  // =========================================================================
  const [pendSearch, setPendSearch] = useState('');
  const [pendPage, setPendPage] = useState(1);
  const [pendStatModalOpen, setPendStatModalOpen] = useState(false);
  const [pendDemoModalOpen, setPendDemoModalOpen] = useState(false);
  const [pendEditingDemoIndex, setPendEditingDemoIndex] = useState<number | null>(null);

  // Form for Aggregate Stats
  const [pendStatForm, setPendStatForm] = useState({
    totalPenduduk: pendudukData.totalPenduduk,
    jumlahKK: pendudukData.jumlahKK,
    lakiLaki: pendudukData.lakiLaki,
    perempuan: pendudukData.perempuan,
    pelakuUsaha: pendudukData.pelakuUsaha,
    updatePeriod: pendudukData.updatePeriod || 'Semester I / 2026',
  });

  // Form for Demographic / Wilayah Record
  const [pendDemoForm, setPendDemoForm] = useState({
    category: '',
    count: 0,
    percentage: 0,
  });

  const filteredDemographics = useMemo(() => {
    return (pendudukData.demographics || []).filter((item) =>
      item.category.toLowerCase().includes(pendSearch.toLowerCase())
    );
  }, [pendudukData.demographics, pendSearch]);

  const pagedDemographics = useMemo(() => {
    const start = (pendPage - 1) * ITEMS_PER_PAGE;
    return filteredDemographics.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDemographics, pendPage]);

  const handleOpenStatModal = () => {
    setPendStatForm({
      totalPenduduk: pendudukData.totalPenduduk,
      jumlahKK: pendudukData.jumlahKK,
      lakiLaki: pendudukData.lakiLaki,
      perempuan: pendudukData.perempuan,
      pelakuUsaha: pendudukData.pelakuUsaha,
      updatePeriod: pendudukData.updatePeriod || 'Semester I / 2026',
    });
    setPendStatModalOpen(true);
  };

  const handleSaveStat = (e: React.FormEvent) => {
    e.preventDefault();
    updatePendudukData({
      totalPenduduk: Number(pendStatForm.totalPenduduk),
      jumlahKK: Number(pendStatForm.jumlahKK),
      lakiLaki: Number(pendStatForm.lakiLaki),
      perempuan: Number(pendStatForm.perempuan),
      pelakuUsaha: Number(pendStatForm.pelakuUsaha),
      updatePeriod: pendStatForm.updatePeriod,
    });
    setPendStatModalOpen(false);
    showToast('Perubahan berhasil disimpan.');
  };

  const handleOpenAddDemo = () => {
    setPendEditingDemoIndex(null);
    setPendDemoForm({ category: '', count: 10, percentage: 5 });
    setPendDemoModalOpen(true);
  };

  const handleOpenEditDemo = (index: number) => {
    const target = pendudukData.demographics[index];
    if (!target) return;
    setPendEditingDemoIndex(index);
    setPendDemoForm({
      category: target.category,
      count: target.count,
      percentage: target.percentage,
    });
    setPendDemoModalOpen(true);
  };

  const handleSaveDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendDemoForm.category.trim()) {
      showToast('Terjadi kesalahan. Kategori kelompok wajib diisi.', 'error');
      return;
    }

    const currentDemos = [...(pendudukData.demographics || [])];
    const calcPercent =
      pendudukData.totalPenduduk > 0
        ? Number(((pendDemoForm.count / pendudukData.totalPenduduk) * 100).toFixed(1))
        : Number(pendDemoForm.percentage);

    if (pendEditingDemoIndex !== null) {
      currentDemos[pendEditingDemoIndex] = {
        category: pendDemoForm.category.trim(),
        count: Number(pendDemoForm.count),
        percentage: calcPercent,
      };
      updatePendudukData({ demographics: currentDemos });
      showToast('Perubahan berhasil disimpan.');
    } else {
      currentDemos.push({
        category: pendDemoForm.category.trim(),
        count: Number(pendDemoForm.count),
        percentage: calcPercent,
      });
      updatePendudukData({ demographics: currentDemos });
      showToast('Data berhasil ditambahkan.');
    }

    setPendDemoModalOpen(false);
  };

  const handleDeleteDemo = (index: number) => {
    const target = pendudukData.demographics[index];
    if (!target) return;

    setDeleteConfirm({
      isOpen: true,
      title: 'Hapus Kategori Kependudukan',
      description: `Apakah Anda yakin ingin menghapus kelompok "${target.category}"?`,
      onConfirm: () => {
        const currentDemos = (pendudukData.demographics || []).filter((_, idx) => idx !== index);
        updatePendudukData({ demographics: currentDemos });
        setDeleteConfirm(null);
        showToast('Data berhasil dihapus.');
      },
    });
  };

  // =========================================================================
  // 6. MODUL KAS & KEUANGAN STATE & MODALS
  // =========================================================================
  const [mutSearch, setMutSearch] = useState('');
  const [mutTypeFilter, setMutTypeFilter] = useState<string>('Semua');
  const [mutPage, setMutPage] = useState(1);
  const [mutModalOpen, setMutModalOpen] = useState(false);
  const [mutEditingItem, setMutEditingItem] = useState<KeuanganItem | null>(null);
  const [mutForm, setMutForm] = useState({
    date: '',
    description: '',
    category: 'Pemasukan' as 'Pemasukan' | 'Pengeluaran',
    sourceOrRecipient: '',
    amount: '',
  });

  const filteredMutasi = useMemo(() => {
    return keuanganData.mutations.filter((m) => {
      const matchSearch =
        m.description.toLowerCase().includes(mutSearch.toLowerCase()) ||
        m.sourceOrRecipient.toLowerCase().includes(mutSearch.toLowerCase());
      const matchType = mutTypeFilter === 'Semua' || m.category === mutTypeFilter;
      return matchSearch && matchType;
    });
  }, [keuanganData.mutations, mutSearch, mutTypeFilter]);

  const pagedMutasi = useMemo(() => {
    const start = (mutPage - 1) * ITEMS_PER_PAGE;
    return filteredMutasi.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMutasi, mutPage]);

  const handleOpenAddMutasi = () => {
    setMutEditingItem(null);
    setMutForm({
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: '',
      category: 'Pemasukan',
      sourceOrRecipient: 'Warga RT 01',
      amount: '',
    });
    setMutModalOpen(true);
  };

  const handleOpenEditMutasi = (item: KeuanganItem) => {
    setMutEditingItem(item);
    setMutForm({
      date: item.date,
      description: item.description,
      category: item.category,
      sourceOrRecipient: item.sourceOrRecipient,
      amount: item.amount.toString(),
    });
    setMutModalOpen(true);
  };

  const handleSaveMutasi = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInt(mutForm.amount.replace(/\D/g, ''), 10);
    if (!mutForm.description.trim() || !nominal || nominal <= 0) {
      showToast('Terjadi kesalahan. Deskripsi dan nominal kas wajib diisi.', 'error');
      return;
    }

    if (mutEditingItem) {
      updateMutasi(mutEditingItem.id, {
        date: mutForm.date.trim() || mutEditingItem.date,
        description: mutForm.description.trim(),
        category: mutForm.category,
        sourceOrRecipient: mutForm.sourceOrRecipient.trim() || 'Warga RT 01',
        amount: nominal,
      });
      showToast('Perubahan berhasil disimpan.');
    } else {
      addMutasi({
        date: mutForm.date.trim() || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        description: mutForm.description.trim(),
        category: mutForm.category,
        sourceOrRecipient: mutForm.sourceOrRecipient.trim() || 'Warga RT 01',
        amount: nominal,
      });
      showToast('Data berhasil ditambahkan.');
    }

    setMutModalOpen(false);
  };

  const handleDeleteMutasi = (item: KeuanganItem) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Hapus Transaksi Kas',
      description: `Apakah Anda yakin ingin menghapus catatan kas "${item.description}"?`,
      onConfirm: () => {
        deleteMutasi(item.id);
        setDeleteConfirm(null);
        showToast('Data berhasil dihapus.');
      },
    });
  };

  // Nav Items
  const navItems = [
    { id: 'home', label: 'Ringkasan Beranda', icon: LayoutDashboard },
    { id: 'keuangan', label: 'Kas & Keuangan', icon: Wallet },
    { id: 'informasi', label: 'Kabar & Informasi', icon: Newspaper },
    { id: 'kegiatan', label: 'Agenda Kegiatan', icon: Calendar },
    { id: 'pembangunan', label: 'Pembangunan Sarpras', icon: Building },
    { id: 'pengurus', label: 'Personil Pengurus', icon: Users },
    { id: 'penduduk', label: 'Data Kependudukan', icon: BarChart3 },
  ] as const;

  const totalPengurusCount = pengurusList.reduce((acc, curr) => {
    const count = curr.persons?.length || (curr.name ? 1 : 0);
    return acc + count;
  }, 0);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col lg:flex-row antialiased text-[#1A1A1A]">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div
            className={`px-4 py-3 rounded-xs border shadow-md text-xs font-sans flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : toast.type === 'error'
                ? 'bg-red-50 border-red-300 text-red-900'
                : 'bg-teal-50 border-[#00A4B4]/30 text-[#007A87]'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            ) : (
              <Shield className="w-4 h-4 text-[#00A4B4] shrink-0" />
            )}
            <span className="font-semibold">{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="p-1 hover:opacity-70 cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Backdrop for Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* =========================================================================
          LEFT SIDEBAR NAVIGATION (Desktop & Mobile Drawer)
      ========================================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#E5E5E0] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:w-72 shrink-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-5 border-b border-[#E5E5E0] bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#00A4B4] text-white flex items-center justify-center shadow-xs shrink-0 font-serif font-bold text-base">
                W
              </div>
              <div>
                <div className="text-[11px] font-sans font-bold text-[#00A4B4] tracking-widest uppercase">
                  RT 01 WARINGINSARI
                </div>
                <div className="font-serif text-base font-bold text-[#0A0A0A] leading-tight">
                  Panel Pengurus
                </div>
              </div>
            </div>
            <div className="mt-2 text-[11px] font-sans text-[#777777]">
              Condongcatur · Depok · Sleman
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="p-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xs text-base font-sans transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#00A4B4] text-white font-bold shadow-xs'
                      : 'text-[#333333] hover:text-[#007A87] hover:bg-teal-50/50 font-semibold'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#555555]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN COLUMN (Sticky Top Header + Full Width Content Area)
      ========================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#FFFFFF]">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E5E0] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3 shadow-2xs">
          {/* Left: Hamburger Button (mobile) & Active Tab Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-1.5 rounded-xs text-[#1A1A1A] hover:bg-slate-100 cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-sans text-[#777777] mb-0.5">
                <span>Panel Pengurus</span>
                <span>/</span>
                <span className="text-[#00A4B4] font-semibold">
                  {navItems.find((n) => n.id === activeTab)?.label}
                </span>
              </div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-[#0A0A0A] leading-tight">
                {navItems.find((n) => n.id === activeTab)?.label}
              </h1>
            </div>
          </div>

          {/* Right: Interactive Profile Dropdown Trigger */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              type="button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-[#E5E5E0] hover:border-[#00A4B4] rounded-xs shadow-2xs transition-colors cursor-pointer select-none"
              aria-expanded={isProfileDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-7 h-7 rounded-full bg-teal-50 border border-[#00A4B4]/25 text-[#00A4B4] flex items-center justify-center font-bold text-xs shrink-0">
                <Shield className="w-3.5 h-3.5 text-[#00A4B4]" />
              </div>
              <div className="text-left leading-tight hidden sm:block">
                <div className="font-sans font-bold text-xs text-[#0A0A0A]">
                  Administrator RT 01 Waringinsari
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
                  <span>Pengurus Aktif</span>
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#777777] transition-transform duration-200 ${
                  isProfileDropdownOpen ? 'rotate-180 text-[#00A4B4]' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Popup Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E5E5E0] rounded-xs shadow-lg z-50 py-1 text-xs font-sans animate-in fade-in zoom-in-95 duration-100">
                {/* Header User Card inside Dropdown */}
                <div className="px-4 py-3 border-b border-[#E5E5E0] bg-slate-50/60">
                  <div className="font-bold text-[#0A0A0A] text-xs">
                    Administrator RT 01 Waringinsari
                  </div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    {adminUser?.username ? `@${adminUser.username} · ${adminUser.role}` : 'Pengurus Lingkungan RT 01'}
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xs text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    <span>Pengurus Aktif Lingkungan</span>
                  </div>
                </div>

                {/* Dropdown Options */}
                <div className="py-1">
                  {/* Option 1: Buka Portal Publik (same tab/window) */}
                  <Link
                    to="/"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[#333333] hover:text-[#00A4B4] hover:bg-teal-50/40 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#00A4B4] shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-xs text-[#0A0A0A]">Buka Portal Publik</div>
                      <div className="text-[10px] text-[#777777]">Kembali ke halaman portal warga</div>
                    </div>
                  </Link>

                  {/* Option 2: Reset Data */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      if (window.confirm('Reset seluruh data ke format awal contoh demo?')) {
                        resetToDefaultData();
                        showToast('Data portal berhasil di-reset ke default contoh.', 'info');
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[#333333] hover:text-[#00A4B4] hover:bg-teal-50/40 transition-colors text-left cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-[#777777] shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-xs text-[#0A0A0A]">Reset Data</div>
                      <div className="text-[10px] text-[#777777]">Kembalikan data ke awal contoh demo</div>
                    </div>
                  </button>
                </div>

                {/* Option 3: Keluar / Logout */}
                <div className="border-t border-[#E5E5E0] py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="font-bold text-xs">Keluar (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Viewport (Full Width, dynamic padding, responsive) */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#FFFFFF] w-full">
          <div className="w-full space-y-6">

            {/* =========================================================================
                VIEW 0: BERANDA / HOME OVERVIEW (FULL WIDTH, NO DUPLICATE QUICK ACCESS)
            ========================================================================= */}
            {activeTab === 'home' && (
              <div className="space-y-6 w-full">
                {/* Home Welcome Banner */}
                <div className="p-6 bg-[#00A4B4] text-white rounded-xs shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest font-sans font-bold text-white/80 block mb-1">
                      RINGKASAN PORTAL LINGKUNGAN RT 01
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Selamat Datang di Panel Pengurus RT 01
                    </h2>
                    <p className="text-xs text-white/90 font-sans mt-1 max-w-3xl">
                      Seluruh mutasi kas, publikasi berita, jadwal agenda, progres fisik sarpras, dan data kepengurusan dikelola melalui tabel terstandar dan langsung tersinkronkan ke warga secara real-time.
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <div className="bg-white/15 border border-white/25 px-3 py-1.5 rounded-xs text-xs font-sans text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>Portal Publik Terhubung</span>
                    </div>
                  </div>
                </div>

                {/* 3 Key Stat KPI Cards across full width */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {/* 1. Saldo Cash */}
                  <div
                    onClick={() => setActiveTab('keuangan')}
                    className="p-4 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] rounded-xs shadow-2xs cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-sans text-[#555555] mb-2">
                      <span className="font-bold text-[#0A0A0A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-[#00A4B4]" />
                        <span>Saldo Cash</span>
                      </span>
                    </div>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#0A0A0A] truncate">
                      Rp {new Intl.NumberFormat('id-ID').format(keuanganData.saldoAkhir)}
                    </div>
                    <div className="mt-2 text-[10px] text-[#555555] font-medium truncate">
                      Saldo kas akhir berjalan
                    </div>
                  </div>

                  {/* 2. Kependudukan */}
                  <div
                    onClick={() => setActiveTab('penduduk')}
                    className="p-4 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] rounded-xs shadow-2xs cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-sans text-[#555555] mb-2">
                      <span className="font-bold text-[#0A0A0A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5 text-[#00A4B4]" />
                        <span>Kependudukan</span>
                      </span>
                    </div>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#0A0A0A]">
                      {pendudukData.totalPenduduk} <span className="text-xs font-normal text-[#555555]">Jiwa</span>
                    </div>
                    <div className="mt-2 text-[10px] text-[#555555] truncate">
                      {pendudukData.jumlahKK} Kepala Keluarga
                    </div>
                  </div>

                  {/* 3. Personil RT */}
                  <div
                    onClick={() => setActiveTab('pengurus')}
                    className="p-4 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] rounded-xs shadow-2xs cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-sans text-[#555555] mb-2">
                      <span className="font-bold text-[#0A0A0A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#00A4B4]" />
                        <span>Personil RT</span>
                      </span>
                    </div>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#0A0A0A]">
                      {totalPengurusCount} <span className="text-xs font-normal text-[#555555]">Orang</span>
                    </div>
                    <div className="mt-2 text-[10px] text-[#555555] truncate">
                      {pengurusList.length} Jabatan Bidang
                    </div>
                  </div>
                </div>

                {/* Two Column Feed spanning 100% width */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
                  {/* Mutasi Terkini */}
                  <div className="lg:col-span-7 bg-white border border-[#E5E5E0] rounded-xs shadow-2xs overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-[#E5E5E0] flex items-center justify-between">
                      <h3 className="font-serif text-sm font-bold text-[#0A0A0A]">
                        Catatan Mutasi Kas Terkini
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('keuangan')}
                        className="text-xs font-sans text-[#00A4B4] hover:underline font-semibold cursor-pointer"
                      >
                        Buka Manajemen Kas →
                      </button>
                    </div>

                    <div className="divide-y divide-[#E5E5E0]">
                      {keuanganData.mutations.slice(0, 5).map((m) => (
                        <div
                          key={m.id}
                          className="p-3.5 flex items-center justify-between gap-3 text-xs font-sans hover:bg-slate-50/50"
                        >
                          <div>
                            <div className="font-semibold text-[#0A0A0A]">{m.description}</div>
                            <div className="text-[11px] text-[#777777]">
                              {m.date} · {m.sourceOrRecipient}
                            </div>
                          </div>
                          <div
                            className={`font-mono font-bold whitespace-nowrap ${
                              m.category === 'Pemasukan' ? 'text-emerald-600' : 'text-red-600'
                            }`}
                          >
                            {m.category === 'Pemasukan' ? '+' : '-'} Rp{' '}
                            {new Intl.NumberFormat('id-ID').format(m.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agenda Terdekat & Info Administrasi */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-2xs overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-[#E5E5E0] flex items-center justify-between">
                        <h3 className="font-serif text-sm font-bold text-[#0A0A0A]">
                          Agenda Warga Terdekat
                        </h3>
                        <button
                          type="button"
                          onClick={() => setActiveTab('kegiatan')}
                          className="text-xs font-sans text-[#00A4B4] hover:underline font-semibold cursor-pointer"
                        >
                          Buka Manajemen Agenda →
                        </button>
                      </div>

                      <div className="p-3.5 space-y-3">
                        {kegiatanList.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="p-3 bg-slate-50/60 border border-[#E5E5E0] rounded-xs text-xs font-sans"
                          >
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-bold text-[#00A4B4]">{item.date}</span>
                              <span
                                className={`px-2 py-0.5 rounded-xs font-bold text-[10px] ${
                                  item.status === 'Akan Datang'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-slate-200 text-[#555555]'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <div className="font-serif font-bold text-[#0A0A0A] mb-1">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-[#777777] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#00A4B4]" />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-teal-50/40 border border-[#00A4B4]/25 rounded-xs text-xs font-sans">
                      <div className="font-bold text-[#007A87] mb-1">
                        Informasi Administrasi RT 01
                      </div>
                      <div className="text-[#555555] leading-relaxed space-y-1 text-[11px]">
                        <div>Dusun Waringinsari · Condongcatur · Depok · Sleman</div>
                        <div>Kode Pos: 55283 · Jam Pelayanan Administrasi: 16.00 – 20.00 WIB</div>
                        <div className="font-semibold text-emerald-700 pt-1">
                          Terdaftar Resmi di SK Kalurahan Condongcatur
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                VIEW 1: KAS & KEUANGAN (DATA TABLE + MODAL CRUD + FULL WIDTH)
            ========================================================================= */}
            {activeTab === 'keuangan' && (
              <div className="space-y-6 w-full">
                {/* Header */}
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                    Pengelolaan Kas & Transparansi Keuangan
                  </h2>
                  <p className="text-xs text-[#555555] font-sans mt-0.5">
                    Catat dan kelola transaksi arus kas masuk dan keluar secara akuntabel.
                  </p>
                </div>

                {/* KPI Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E5E5E0] bg-white rounded-xs shadow-2xs overflow-hidden w-full">
                  <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[#E5E5E0]">
                    <span className="text-[11px] uppercase font-bold text-[#555555] tracking-wider block mb-1">
                      Total Pemasukan Kas
                    </span>
                    <div className="text-2xl font-sans font-bold tabular-nums tracking-tight text-emerald-700">
                      Rp {new Intl.NumberFormat('id-ID').format(keuanganData.totalPemasukan)}
                    </div>
                    <p className="text-xs text-[#555555] mt-1">Iuran warga, sumbangan usaha, & sewa tenda</p>
                  </div>

                  <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[#E5E5E0]">
                    <span className="text-[11px] uppercase font-bold text-[#555555] tracking-wider block mb-1">
                      Total Pengeluaran Kas
                    </span>
                    <div className="text-2xl font-sans font-bold tabular-nums tracking-tight text-red-600">
                      - Rp {new Intl.NumberFormat('id-ID').format(keuanganData.totalPengeluaran)}
                    </div>
                    <p className="text-xs text-[#555555] mt-1">Operasional kebersihan, sampah, & sarpras</p>
                  </div>

                  <div className="p-4 sm:p-5 bg-[#00A4B4] text-white">
                    <span className="text-[11px] uppercase font-bold text-white/90 tracking-wider block mb-1">
                      Saldo Kas Akhir Berjalan
                    </span>
                    <div className="text-2xl font-sans font-bold tabular-nums tracking-tight text-white">
                      Rp {new Intl.NumberFormat('id-ID').format(keuanganData.saldoAkhir)}
                    </div>
                    <p className="text-xs text-white/85 mt-1">Tersimpan di kas bendahara & rekening operasional</p>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-3 bg-white border border-[#E5E5E0] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#777777] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={mutSearch}
                      onChange={(e) => {
                        setMutSearch(e.target.value);
                        setMutPage(1);
                      }}
                      placeholder="Cari uraian transaksi, penerima/sumber..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-sans text-[#777777] whitespace-nowrap">Jenis:</span>
                    <select
                      value={mutTypeFilter}
                      onChange={(e) => {
                        setMutTypeFilter(e.target.value);
                        setMutPage(1);
                      }}
                      className="px-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs bg-white focus:border-[#00A4B4] focus:outline-none"
                    >
                      <option value="Semua">Semua Transaksi</option>
                      <option value="Pemasukan">Pemasukan (+)</option>
                      <option value="Pengeluaran">Pengeluaran (-)</option>
                    </select>
                  </div>
                </div>

                {/* Action Bar: Tambah Data di atas tabel & di atas kolom aksi */}
                <div className="flex items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={handleOpenAddMutasi}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold text-xs font-sans rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="border border-[#E5E5E0] bg-white rounded-xs shadow-2xs overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 border-b border-[#E5E5E0] text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Tanggal</th>
                          <th className="py-3 px-4">Uraian / Keterangan</th>
                          <th className="py-3 px-4">Pihak / Sumber</th>
                          <th className="py-3 px-4">Jenis</th>
                          <th className="py-3 px-4 text-right">Nominal</th>
                          <th className="py-3 px-4 text-center w-28">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5E0]">
                        {pagedMutasi.length > 0 ? (
                          pagedMutasi.map((m) => (
                            <tr key={m.id} className="hover:bg-teal-50/20 transition-colors">
                              <td className="py-3 px-4 whitespace-nowrap font-medium text-[#555555]">
                                {m.date}
                              </td>
                              <td className="py-3 px-4 font-semibold text-[#0A0A0A]">
                                {m.description}
                              </td>
                              <td className="py-3 px-4 text-[#555555]">
                                {m.sourceOrRecipient}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded-xs font-bold text-[10px] inline-flex items-center gap-1 ${
                                    m.category === 'Pemasukan'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-red-50 text-red-700 border border-red-200'
                                  }`}
                                >
                                  {m.category === 'Pemasukan' ? '+' : '-'} {m.category}
                                </span>
                              </td>
                              <td
                                className={`py-3 px-4 text-right font-mono font-bold whitespace-nowrap ${
                                  m.category === 'Pemasukan' ? 'text-emerald-700' : 'text-red-600'
                                }`}
                              >
                                {m.category === 'Pemasukan' ? '+' : '-'} Rp{' '}
                                {new Intl.NumberFormat('id-ID').format(m.amount)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditMutasi(m)}
                                    title="Edit transaksi"
                                    className="p-1.5 text-[#00A4B4] hover:bg-teal-50 rounded-xs border border-[#00A4B4]/20 transition-colors cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteMutasi(m)}
                                    title="Hapus transaksi"
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs border border-red-200 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#777777] italic">
                              Tidak ada data transaksi kas yang cocok dengan pencarian.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-[#E5E5E0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                    <div>
                      Menampilkan{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {filteredMutasi.length === 0 ? 0 : (mutPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>{' '}
                      sampai{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {Math.min(mutPage * ITEMS_PER_PAGE, filteredMutasi.length)}
                      </span>{' '}
                      dari <span className="font-bold text-[#0A0A0A]">{filteredMutasi.length}</span> transaksi
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={mutPage <= 1}
                        onClick={() => setMutPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-semibold text-[#0A0A0A]">
                        Halaman {mutPage} dari {Math.max(1, Math.ceil(filteredMutasi.length / ITEMS_PER_PAGE))}
                      </span>
                      <button
                        type="button"
                        disabled={mutPage >= Math.ceil(filteredMutasi.length / ITEMS_PER_PAGE)}
                        onClick={() => setMutPage((p) => p + 1)}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                VIEW 2: KABAR & INFORMASI (DATA TABLE + MODAL CRUD + FULL WIDTH)
            ========================================================================= */}
            {activeTab === 'informasi' && (
              <div className="space-y-6 w-full">
                {/* Header */}
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                    Manajemen Kabar & Pengumuman Warga
                  </h2>
                  <p className="text-xs text-[#555555] font-sans mt-0.5">
                    Kelola daftar publikasi artikel, pengumuman penting, dan kabar lingkungan.
                  </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-3 bg-white border border-[#E5E5E0] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#777777] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={infoSearch}
                      onChange={(e) => {
                        setInfoSearch(e.target.value);
                        setInfoPage(1);
                      }}
                      placeholder="Cari judul berita, ringkasan, penulis..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-sans text-[#777777] whitespace-nowrap">Kategori:</span>
                    <select
                      value={infoCategoryFilter}
                      onChange={(e) => {
                        setInfoCategoryFilter(e.target.value);
                        setInfoPage(1);
                      }}
                      className="px-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs bg-white focus:border-[#00A4B4] focus:outline-none"
                    >
                      <option value="Semua">Semua Kategori</option>
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Informasi RT">Informasi RT</option>
                      <option value="Agenda">Agenda</option>
                      <option value="Pemberitahuan Penting">Pemberitahuan Penting</option>
                    </select>
                  </div>
                </div>

                {/* Action Bar: Tambah Data di atas tabel & di atas kolom aksi */}
                <div className="flex items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={handleOpenAddInfo}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold text-xs font-sans rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="border border-[#E5E5E0] bg-white rounded-xs shadow-2xs overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 border-b border-[#E5E5E0] text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Judul Artikel & Ringkasan</th>
                          <th className="py-3 px-4">Kategori</th>
                          <th className="py-3 px-4">Tanggal Terbit</th>
                          <th className="py-3 px-4">Penulis</th>
                          <th className="py-3 px-4 text-center">Status Penting</th>
                          <th className="py-3 px-4 text-center w-28">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5E0]">
                        {pagedInformasi.length > 0 ? (
                          pagedInformasi.map((item) => (
                            <tr key={item.id} className="hover:bg-teal-50/20 transition-colors">
                              <td className="py-3 px-4 max-w-md">
                                <div className="font-serif font-bold text-[#0A0A0A] line-clamp-1">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-[#666666] line-clamp-1 mt-0.5">
                                  {item.summary}
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span className="px-2 py-0.5 bg-slate-100 text-[#0A0A0A] border border-[#E5E5E0] rounded-xs font-semibold text-[10px]">
                                  {item.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap text-[#555555]">
                                {item.date}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap text-[#555555]">
                                {item.author}
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                {item.isImportant ? (
                                  <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xs font-bold text-[10px]">
                                    Penting ★
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-[#999999]">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditInfo(item)}
                                    title="Edit kabar"
                                    className="p-1.5 text-[#00A4B4] hover:bg-teal-50 rounded-xs border border-[#00A4B4]/20 transition-colors cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteInfo(item)}
                                    title="Hapus kabar"
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs border border-red-200 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#777777] italic">
                              Tidak ada data kabar atau pengumuman yang sesuai.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-[#E5E5E0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                    <div>
                      Menampilkan{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {filteredInformasi.length === 0 ? 0 : (infoPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>{' '}
                      sampai{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {Math.min(infoPage * ITEMS_PER_PAGE, filteredInformasi.length)}
                      </span>{' '}
                      dari <span className="font-bold text-[#0A0A0A]">{filteredInformasi.length}</span> kabar
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={infoPage <= 1}
                        onClick={() => setInfoPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-semibold text-[#0A0A0A]">
                        Halaman {infoPage} dari {Math.max(1, Math.ceil(filteredInformasi.length / ITEMS_PER_PAGE))}
                      </span>
                      <button
                        type="button"
                        disabled={infoPage >= Math.ceil(filteredInformasi.length / ITEMS_PER_PAGE)}
                        onClick={() => setInfoPage((p) => p + 1)}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                VIEW 3: AGENDA KEGIATAN (DATA TABLE + MODAL CRUD + FULL WIDTH)
            ========================================================================= */}
            {activeTab === 'kegiatan' && (
              <div className="space-y-6 w-full">
                {/* Header */}
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                    Manajemen Agenda & Jadwal Kegiatan Warga
                  </h2>
                  <p className="text-xs text-[#555555] font-sans mt-0.5">
                    Kelola jadwal pertemuan warga, kerja bakti lingkungan, rapat pengurus, dan kegiatan sosial.
                  </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-3 bg-white border border-[#E5E5E0] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#777777] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={kegSearch}
                      onChange={(e) => {
                        setKegSearch(e.target.value);
                        setKegPage(1);
                      }}
                      placeholder="Cari nama agenda, lokasi, ringkasan..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-sans text-[#777777] whitespace-nowrap">Status:</span>
                    <select
                      value={kegStatusFilter}
                      onChange={(e) => {
                        setKegStatusFilter(e.target.value);
                        setKegPage(1);
                      }}
                      className="px-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs bg-white focus:border-[#00A4B4] focus:outline-none"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Akan Datang">Akan Datang</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>
                </div>

                {/* Action Bar: Tambah Data di atas tabel & di atas kolom aksi */}
                <div className="flex items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={handleOpenAddKegiatan}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold text-xs font-sans rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="border border-[#E5E5E0] bg-white rounded-xs shadow-2xs overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 border-b border-[#E5E5E0] text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Nama Agenda & Kategori</th>
                          <th className="py-3 px-4">Tanggal & Waktu</th>
                          <th className="py-3 px-4">Lokasi Pelaksanaan</th>
                          <th className="py-3 px-4">Penanggung Jawab</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-center w-28">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5E0]">
                        {pagedKegiatan.length > 0 ? (
                          pagedKegiatan.map((item) => (
                            <tr key={item.id} className="hover:bg-teal-50/20 transition-colors">
                              <td className="py-3 px-4 max-w-sm">
                                <div className="font-serif font-bold text-[#0A0A0A] line-clamp-1">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-[#00A4B4] font-semibold mt-0.5">
                                  {item.category}
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="font-semibold text-[#0A0A0A]">{item.date}</div>
                                <div className="text-[11px] text-[#777777]">{item.time}</div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap text-[#555555]">
                                {item.location}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap text-[#555555]">
                                {item.picName || 'Pengurus RT'}
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-0.5 rounded-xs font-bold text-[10px] inline-block ${
                                    item.status === 'Akan Datang'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-slate-100 text-[#666666] border border-[#E5E5E0]'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditKegiatan(item)}
                                    title="Edit agenda"
                                    className="p-1.5 text-[#00A4B4] hover:bg-teal-50 rounded-xs border border-[#00A4B4]/20 transition-colors cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteKegiatan(item)}
                                    title="Hapus agenda"
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs border border-red-200 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#777777] italic">
                              Tidak ada data agenda kegiatan yang sesuai dengan filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-[#E5E5E0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                    <div>
                      Menampilkan{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {filteredKegiatan.length === 0 ? 0 : (kegPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>{' '}
                      sampai{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {Math.min(kegPage * ITEMS_PER_PAGE, filteredKegiatan.length)}
                      </span>{' '}
                      dari <span className="font-bold text-[#0A0A0A]">{filteredKegiatan.length}</span> agenda
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={kegPage <= 1}
                        onClick={() => setKegPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-semibold text-[#0A0A0A]">
                        Halaman {kegPage} dari {Math.max(1, Math.ceil(filteredKegiatan.length / ITEMS_PER_PAGE))}
                      </span>
                      <button
                        type="button"
                        disabled={kegPage >= Math.ceil(filteredKegiatan.length / ITEMS_PER_PAGE)}
                        onClick={() => setKegPage((p) => p + 1)}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                VIEW 4: PEMBANGUNAN SARPRAS (DATA TABLE + MODAL CRUD + FULL WIDTH)
            ========================================================================= */}
            {activeTab === 'pembangunan' && (
              <div className="space-y-6 w-full">
                {/* Header */}
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                    Pengelolaan Pembangunan Sarana & Prasarana
                  </h2>
                  <p className="text-xs text-[#555555] font-sans mt-0.5">
                    Kelola proyek fisik, anggaran swadaya/bantuan, dan perbarui progres pelaksanaan pembangunan.
                  </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-3 bg-white border border-[#E5E5E0] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#777777] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={pemSearch}
                      onChange={(e) => {
                        setPemSearch(e.target.value);
                        setPemPage(1);
                      }}
                      placeholder="Cari nama proyek, lokasi, sumber dana..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-sans text-[#777777] whitespace-nowrap">Status:</span>
                    <select
                      value={pemStatusFilter}
                      onChange={(e) => {
                        setPemStatusFilter(e.target.value);
                        setPemPage(1);
                      }}
                      className="px-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs bg-white focus:border-[#00A4B4] focus:outline-none"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Dalam Pengerjaan">Dalam Pengerjaan</option>
                      <option value="Perencanaan">Perencanaan</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Tertunda">Tertunda</option>
                    </select>
                  </div>
                </div>

                {/* Action Bar: Tambah Data di atas tabel & di atas kolom aksi */}
                <div className="flex items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={handleOpenAddPembangunan}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold text-xs font-sans rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="border border-[#E5E5E0] bg-white rounded-xs shadow-2xs overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 border-b border-[#E5E5E0] text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Nama Proyek & Lokasi</th>
                          <th className="py-3 px-4">Anggaran & Sumber</th>
                          <th className="py-3 px-4">Target Waktu</th>
                          <th className="py-3 px-4 min-w-[140px]">Progres Fisik</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-center w-28">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5E0]">
                        {pagedPembangunan.length > 0 ? (
                          pagedPembangunan.map((item) => (
                            <tr key={item.id} className="hover:bg-teal-50/20 transition-colors">
                              <td className="py-3 px-4 max-w-sm">
                                <div className="font-serif font-bold text-[#0A0A0A] line-clamp-1">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-[#777777] flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 text-[#00A4B4]" />
                                  <span>{item.location}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="font-mono font-bold text-[#0A0A0A]">
                                  Rp {new Intl.NumberFormat('id-ID').format(item.budget)}
                                </div>
                                <div className="text-[10px] text-[#666666]">{item.sourceOfFunds}</div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="text-[11px] text-[#555555]">{item.startDate}</div>
                                <div className="text-[10px] text-[#888888]">s/d {item.targetDate}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-slate-100 border border-[#E5E5E0] h-2 rounded-xs overflow-hidden">
                                    <div
                                      className="bg-[#00A4B4] h-full rounded-xs transition-all"
                                      style={{ width: `${item.progressPercent}%` }}
                                    />
                                  </div>
                                  <span className="font-mono font-bold text-[11px] text-[#0A0A0A] w-9 text-right">
                                    {item.progressPercent}%
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-0.5 rounded-xs font-bold text-[10px] inline-block ${
                                    item.status === 'Selesai'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : item.status === 'Dalam Pengerjaan'
                                      ? 'bg-teal-50 text-[#007A87] border border-[#00A4B4]/25'
                                      : 'bg-slate-100 text-[#555555] border border-[#E5E5E0]'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditPembangunan(item)}
                                    title="Edit proyek"
                                    className="p-1.5 text-[#00A4B4] hover:bg-teal-50 rounded-xs border border-[#00A4B4]/20 transition-colors cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePembangunan(item)}
                                    title="Hapus proyek"
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs border border-red-200 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#777777] italic">
                              Tidak ada data pembangunan fisik yang sesuai.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-[#E5E5E0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                    <div>
                      Menampilkan{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {filteredPembangunan.length === 0 ? 0 : (pemPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>{' '}
                      sampai{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {Math.min(pemPage * ITEMS_PER_PAGE, filteredPembangunan.length)}
                      </span>{' '}
                      dari <span className="font-bold text-[#0A0A0A]">{filteredPembangunan.length}</span> proyek
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={pemPage <= 1}
                        onClick={() => setPemPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-semibold text-[#0A0A0A]">
                        Halaman {pemPage} dari {Math.max(1, Math.ceil(filteredPembangunan.length / ITEMS_PER_PAGE))}
                      </span>
                      <button
                        type="button"
                        disabled={pemPage >= Math.ceil(filteredPembangunan.length / ITEMS_PER_PAGE)}
                        onClick={() => setPemPage((p) => p + 1)}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                VIEW 5: PERSONIL KEPENGURUSAN (DATA TABLE + MODAL CRUD + FULL WIDTH)
            ========================================================================= */}
            {activeTab === 'pengurus' && (
              <div className="space-y-6 w-full">
                {/* Header */}
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                    Susunan Personil & Struktur Kepengurusan RT 01
                  </h2>
                  <p className="text-xs text-[#555555] font-sans mt-0.5">
                    Kelola daftar nama personil pengurus. Setiap bidang (Sekretariat, Bendahara, Seksi) dapat memuat lebih dari satu orang.
                  </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-3 bg-white border border-[#E5E5E0] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#777777] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={pengSearch}
                      onChange={(e) => {
                        setPengSearch(e.target.value);
                        setPengPage(1);
                      }}
                      placeholder="Cari nama personil, jabatan, kontak..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-sans text-[#777777] whitespace-nowrap">Bidang:</span>
                    <select
                      value={pengRoleFilter}
                      onChange={(e) => {
                        setPengRoleFilter(e.target.value);
                        setPengPage(1);
                      }}
                      className="px-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs bg-white focus:border-[#00A4B4] focus:outline-none"
                    >
                      <option value="Semua">Semua Bidang</option>
                      {pengurusList.map((item) => (
                        <option key={item.id} value={item.role}>
                          {item.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Bar: Tambah Data di atas tabel & di atas kolom aksi */}
                <div className="flex items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={handleOpenAddPersonil}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold text-xs font-sans rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="border border-[#E5E5E0] bg-white rounded-xs shadow-2xs overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 border-b border-[#E5E5E0] text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Nama Personil</th>
                          <th className="py-3 px-4">Jabatan / Bidang</th>
                          <th className="py-3 px-4">Peran Khusus / Sub-Role</th>
                          <th className="py-3 px-4">Kontak / HP</th>
                          <th className="py-3 px-4">Kategori Jabatan</th>
                          <th className="py-3 px-4 text-center w-28">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5E0]">
                        {pagedPersonil.length > 0 ? (
                          pagedPersonil.map((p) => (
                            <tr key={p.uniqueKey} className="hover:bg-teal-50/20 transition-colors">
                              <td className="py-3 px-4 font-bold text-[#0A0A0A] whitespace-nowrap">
                                {p.name}
                              </td>
                              <td className="py-3 px-4 font-medium text-[#00A4B4] whitespace-nowrap">
                                {p.roleName}
                              </td>
                              <td className="py-3 px-4 text-[#555555] whitespace-nowrap">
                                {p.subRole}
                              </td>
                              <td className="py-3 px-4 font-mono text-[11px] text-[#555555] whitespace-nowrap">
                                {p.phone}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span className="px-2 py-0.5 bg-slate-100 text-[#555555] border border-[#E5E5E0] rounded-xs text-[10px] font-medium">
                                  {p.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditPersonil(p)}
                                    title="Edit personil"
                                    className="p-1.5 text-[#00A4B4] hover:bg-teal-50 rounded-xs border border-[#00A4B4]/20 transition-colors cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePersonil(p)}
                                    title="Hapus personil"
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs border border-red-200 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#777777] italic">
                              Tidak ada personil yang sesuai dengan pencarian.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-[#E5E5E0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                    <div>
                      Menampilkan{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {filteredPersonil.length === 0 ? 0 : (pengPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>{' '}
                      sampai{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {Math.min(pengPage * ITEMS_PER_PAGE, filteredPersonil.length)}
                      </span>{' '}
                      dari <span className="font-bold text-[#0A0A0A]">{filteredPersonil.length}</span> personil
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={pengPage <= 1}
                        onClick={() => setPengPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-semibold text-[#0A0A0A]">
                        Halaman {pengPage} dari {Math.max(1, Math.ceil(filteredPersonil.length / ITEMS_PER_PAGE))}
                      </span>
                      <button
                        type="button"
                        disabled={pengPage >= Math.ceil(filteredPersonil.length / ITEMS_PER_PAGE)}
                        onClick={() => setPengPage((p) => p + 1)}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                VIEW 6: DATA KEPENDUDUKAN (DATA TABLE + MODAL CRUD + FULL WIDTH)
            ========================================================================= */}
            {activeTab === 'penduduk' && (
              <div className="space-y-6 w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                      Manajemen Data Statistik Kependudukan
                    </h2>
                    <p className="text-xs text-[#555555] font-sans mt-0.5">
                      Kelola data agregat kependudukan dan rincian demografi warga RT 01 Waringinsari.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenStatModal}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5E5E0] hover:border-[#00A4B4] hover:bg-slate-50 text-[#0A0A0A] font-bold text-xs font-sans rounded-xs shadow-2xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#00A4B4]" />
                    <span>Ubah Angka Agregat</span>
                  </button>
                </div>

                {/* KPI Agregat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 border border-[#E5E5E0] bg-white p-4 rounded-xs shadow-2xs w-full">
                  <div className="border-r border-[#E5E5E0] pr-3">
                    <span className="text-[10px] uppercase font-bold text-[#777777] block">Total Penduduk</span>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#0A0A0A] mt-1">
                      {pendudukData.totalPenduduk} <span className="text-xs font-sans font-normal text-[#555555]">Jiwa</span>
                    </div>
                  </div>
                  <div className="border-r border-[#E5E5E0] pr-3">
                    <span className="text-[10px] uppercase font-bold text-[#777777] block">Jumlah KK</span>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#0A0A0A] mt-1">
                      {pendudukData.jumlahKK} <span className="text-xs font-sans font-normal text-[#555555]">KK</span>
                    </div>
                  </div>
                  <div className="border-r border-[#E5E5E0] pr-3">
                    <span className="text-[10px] uppercase font-bold text-[#777777] block">Laki-Laki</span>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#0A0A0A] mt-1">
                      {pendudukData.lakiLaki} <span className="text-xs font-sans font-normal text-[#555555]">Jiwa</span>
                    </div>
                  </div>
                  <div className="border-r border-[#E5E5E0] pr-3">
                    <span className="text-[10px] uppercase font-bold text-[#777777] block">Perempuan</span>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#0A0A0A] mt-1">
                      {pendudukData.perempuan} <span className="text-xs font-sans font-normal text-[#555555]">Jiwa</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#777777] block">Pelaku Usaha</span>
                    <div className="text-xl font-sans font-bold tabular-nums tracking-tight text-[#00A4B4] mt-1">
                      {pendudukData.pelakuUsaha} <span className="text-xs font-sans font-normal text-[#555555]">UMKM</span>
                    </div>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-3 bg-white border border-[#E5E5E0] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#777777] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={pendSearch}
                      onChange={(e) => {
                        setPendSearch(e.target.value);
                        setPendPage(1);
                      }}
                      placeholder="Cari kelompok kategori demografi..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs font-sans border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    />
                  </div>
                  <div className="text-xs font-sans text-[#777777]">
                    Periode Data: <span className="font-semibold text-[#0A0A0A]">{pendudukData.updatePeriod || 'Terbaru'}</span>
                  </div>
                </div>

                {/* Action Bar: Tambah Data di atas tabel & di atas kolom aksi */}
                <div className="flex items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={handleOpenAddDemo}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold text-xs font-sans rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="border border-[#E5E5E0] bg-white rounded-xs shadow-2xs overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 border-b border-[#E5E5E0] text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Kategori / Kelompok Demografi</th>
                          <th className="py-3 px-4 text-right">Jumlah (Jiwa/KK)</th>
                          <th className="py-3 px-4">Persentase Proporsi</th>
                          <th className="py-3 px-4">Visualisasi Proporsi</th>
                          <th className="py-3 px-4 text-center w-28">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E5E0]">
                        {pagedDemographics.length > 0 ? (
                          pagedDemographics.map((item, idx) => {
                            const originalIdx = (pendudukData.demographics || []).findIndex(
                              (d) => d.category === item.category
                            );
                            return (
                              <tr key={item.category} className="hover:bg-teal-50/20 transition-colors">
                                <td className="py-3 px-4 font-bold text-[#0A0A0A]">
                                  {item.category}
                                </td>
                                <td className="py-3 px-4 text-right font-mono font-bold text-[#0A0A0A]">
                                  {item.count}
                                </td>
                                <td className="py-3 px-4 font-mono text-[#00A4B4] font-semibold">
                                  {item.percentage}%
                                </td>
                                <td className="py-3 px-4 min-w-[140px]">
                                  <div className="w-full bg-slate-100 border border-[#E5E5E0] h-2 rounded-xs overflow-hidden">
                                    <div
                                      className="bg-[#00A4B4] h-full rounded-xs"
                                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                                    />
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditDemo(originalIdx !== -1 ? originalIdx : idx)}
                                      title="Edit kelompok"
                                      className="p-1.5 text-[#00A4B4] hover:bg-teal-50 rounded-xs border border-[#00A4B4]/20 transition-colors cursor-pointer"
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteDemo(originalIdx !== -1 ? originalIdx : idx)}
                                      title="Hapus kelompok"
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs border border-red-200 transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-[#777777] italic">
                              Tidak ada kategori demografi kependudukan yang sesuai.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-[#E5E5E0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                    <div>
                      Menampilkan{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {filteredDemographics.length === 0 ? 0 : (pendPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>{' '}
                      sampai{' '}
                      <span className="font-bold text-[#0A0A0A]">
                        {Math.min(pendPage * ITEMS_PER_PAGE, filteredDemographics.length)}
                      </span>{' '}
                      dari <span className="font-bold text-[#0A0A0A]">{filteredDemographics.length}</span> kelompok
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={pendPage <= 1}
                        onClick={() => setPendPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-semibold text-[#0A0A0A]">
                        Halaman {pendPage} dari {Math.max(1, Math.ceil(filteredDemographics.length / ITEMS_PER_PAGE))}
                      </span>
                      <button
                        type="button"
                        disabled={pendPage >= Math.ceil(filteredDemographics.length / ITEMS_PER_PAGE)}
                        onClick={() => setPendPage((p) => p + 1)}
                        className="px-2.5 py-1 border border-[#E5E5E0] rounded-xs disabled:opacity-40 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* =========================================================================
          MODALS / POP-UPS (CREATE & EDIT)
      ========================================================================= */}

      {/* 1. Modal Informasi */}
      {infoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E5E0] flex items-center justify-between bg-slate-50/50">
              <h3 className="font-serif font-bold text-base text-[#0A0A0A]">
                {infoEditingItem ? 'Edit Kabar & Informasi' : 'Tambah Kabar & Informasi Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#0A0A0A] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInfo} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Judul Informasi / Kabar <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={infoForm.title}
                  onChange={(e) => setInfoForm({ ...infoForm, title: e.target.value })}
                  placeholder="Contoh: Jadwal Pemadaman Listrik Pemeliharaan..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Kategori</label>
                  <select
                    value={infoForm.category}
                    onChange={(e) => setInfoForm({ ...infoForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none bg-white font-medium"
                  >
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Informasi RT">Informasi RT</option>
                    <option value="Agenda">Agenda</option>
                    <option value="Pemberitahuan Penting">Pemberitahuan Penting</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Tanggal Terbit</label>
                  <input
                    type="text"
                    value={infoForm.date}
                    onChange={(e) => setInfoForm({ ...infoForm, date: e.target.value })}
                    placeholder="Contoh: 15 November 2026"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Penulis / Sumber</label>
                <input
                  type="text"
                  value={infoForm.author}
                  onChange={(e) => setInfoForm({ ...infoForm, author: e.target.value })}
                  placeholder="Contoh: Pengurus RT 01 / Ketua RT"
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Ringkasan Singkat (Lead) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={infoForm.summary}
                  onChange={(e) => setInfoForm({ ...infoForm, summary: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat pengantar..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Isi Lengkap Artikel (Paragraf)</label>
                <textarea
                  rows={4}
                  value={infoForm.content}
                  onChange={(e) => setInfoForm({ ...infoForm, content: e.target.value })}
                  placeholder="Tuliskan isi informasi lengkap (pisahkan paragraf dengan baris baru)..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="infoImportant"
                  checked={infoForm.isImportant}
                  onChange={(e) => setInfoForm({ ...infoForm, isImportant: e.target.checked })}
                  className="w-4 h-4 text-[#00A4B4] rounded-xs border-[#E5E5E0] focus:ring-[#00A4B4]"
                />
                <label htmlFor="infoImportant" className="font-semibold text-[#1A1A1A] cursor-pointer">
                  Tandai sebagai Pemberitahuan Penting (Banner Pin Utama)
                </label>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setInfoModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E0] hover:bg-slate-50 text-[#555555] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal Agenda Kegiatan */}
      {kegModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E5E0] flex items-center justify-between bg-slate-50/50">
              <h3 className="font-serif font-bold text-base text-[#0A0A0A]">
                {kegEditingItem ? 'Edit Agenda Kegiatan Warga' : 'Tambah Agenda Kegiatan Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setKegModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#0A0A0A] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveKegiatan} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Nama Agenda Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={kegForm.title}
                  onChange={(e) => setKegForm({ ...kegForm, title: e.target.value })}
                  placeholder="Contoh: Kerja Bakti Saluran Air Lingkungan..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Kategori Kegiatan</label>
                  <select
                    value={kegForm.category}
                    onChange={(e) => setKegForm({ ...kegForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none bg-white font-medium"
                  >
                    <option value="Kerja Bakti">Kerja Bakti</option>
                    <option value="Rapat Warga">Rapat Warga</option>
                    <option value="Sosial">Sosial</option>
                    <option value="Keagamaan">Keagamaan</option>
                    <option value="Pertemuan Pengurus">Pertemuan Pengurus</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Status Agenda</label>
                  <select
                    value={kegForm.status}
                    onChange={(e) => setKegForm({ ...kegForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none bg-white font-medium"
                  >
                    <option value="Akan Datang">Akan Datang</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Tanggal Pelaksanaan</label>
                  <input
                    type="text"
                    value={kegForm.date}
                    onChange={(e) => setKegForm({ ...kegForm, date: e.target.value })}
                    placeholder="Contoh: 18 November 2026"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Waktu</label>
                  <input
                    type="text"
                    value={kegForm.time}
                    onChange={(e) => setKegForm({ ...kegForm, time: e.target.value })}
                    placeholder="Contoh: 07.00 - Selesai WIB"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Lokasi Kegiatan</label>
                  <input
                    type="text"
                    value={kegForm.location}
                    onChange={(e) => setKegForm({ ...kegForm, location: e.target.value })}
                    placeholder="Contoh: Pos Ronda RT 01 Waringinsari"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Penanggung Jawab (PIC)</label>
                  <input
                    type="text"
                    value={kegForm.picName}
                    onChange={(e) => setKegForm({ ...kegForm, picName: e.target.value })}
                    placeholder="Contoh: Seksi Ketertiban & Keamanan"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Ringkasan / Uraian Kegiatan <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={kegForm.summary}
                  onChange={(e) => setKegForm({ ...kegForm, summary: e.target.value })}
                  placeholder="Jelaskan tujuan dan detail instruksi warga..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setKegModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E0] hover:bg-slate-50 text-[#555555] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal Pembangunan */}
      {pemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E5E0] flex items-center justify-between bg-slate-50/50">
              <h3 className="font-serif font-bold text-base text-[#0A0A0A]">
                {pemEditingItem ? 'Edit Proyek Sarpras & Pembangunan' : 'Tambah Proyek Sarpras Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setPemModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#0A0A0A] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePembangunan} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Nama Proyek Pembangunan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={pemForm.title}
                  onChange={(e) => setPemForm({ ...pemForm, title: e.target.value })}
                  placeholder="Contoh: Peremajaan Paving Block Jalan Gang Barat..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Lokasi Proyek</label>
                  <input
                    type="text"
                    value={pemForm.location}
                    onChange={(e) => setPemForm({ ...pemForm, location: e.target.value })}
                    placeholder="Contoh: Gang Barat RT 01"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Sumber Dana</label>
                  <input
                    type="text"
                    value={pemForm.sourceOfFunds}
                    onChange={(e) => setPemForm({ ...pemForm, sourceOfFunds: e.target.value })}
                    placeholder="Contoh: Kas Swadaya Warga & Bantuan"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Estimasi Anggaran (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={pemForm.budget}
                    onChange={(e) => setPemForm({ ...pemForm, budget: e.target.value })}
                    placeholder="Contoh: 15000000"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Status Proyek</label>
                  <select
                    value={pemForm.status}
                    onChange={(e) => setPemForm({ ...pemForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none bg-white font-medium"
                  >
                    <option value="Dalam Pengerjaan">Dalam Pengerjaan</option>
                    <option value="Perencanaan">Perencanaan</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Tertunda">Tertunda</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[#1A1A1A]">Progres Pengerjaan Fisik</label>
                  <span className="font-mono font-bold text-[#00A4B4]">{pemForm.progressPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={pemForm.progressPercent}
                  onChange={(e) => setPemForm({ ...pemForm, progressPercent: Number(e.target.value) })}
                  className="w-full accent-[#00A4B4] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Tanggal Mulai</label>
                  <input
                    type="text"
                    value={pemForm.startDate}
                    onChange={(e) => setPemForm({ ...pemForm, startDate: e.target.value })}
                    placeholder="Contoh: 01 Nov 2026"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Target Rampung</label>
                  <input
                    type="text"
                    value={pemForm.targetDate}
                    onChange={(e) => setPemForm({ ...pemForm, targetDate: e.target.value })}
                    placeholder="Contoh: 20 Des 2026"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Deskripsi Proyek <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={pemForm.description}
                  onChange={(e) => setPemForm({ ...pemForm, description: e.target.value })}
                  placeholder="Jelaskan lingkup pekerjaan dan spesifikasi teknis..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPemModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E0] hover:bg-slate-50 text-[#555555] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal Personil Pengurus */}
      {pengModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E5E0] flex items-center justify-between bg-slate-50/50">
              <h3 className="font-serif font-bold text-base text-[#0A0A0A]">
                {pengEditingPerson ? 'Edit Personil Pengurus' : 'Tambah Personil Pengurus Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setPengModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#0A0A0A] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePersonil} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Pilih Jabatan / Seksi Bidang <span className="text-red-500">*</span>
                </label>
                <select
                  value={pengForm.pengurusId}
                  onChange={(e) => setPengForm({ ...pengForm, pengurusId: e.target.value })}
                  disabled={!!pengEditingPerson}
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none bg-white font-medium disabled:bg-slate-100"
                  required
                >
                  {pengurusList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.role} ({item.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Nama Lengkap Personil <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={pengForm.name}
                  onChange={(e) => setPengForm({ ...pengForm, name: e.target.value })}
                  placeholder="Contoh: Dra. Hj. Ratna Sari / Budi Santoso"
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Peran Khusus / Sub-Role (Opsional)
                </label>
                <input
                  type="text"
                  value={pengForm.subRole}
                  onChange={(e) => setPengForm({ ...pengForm, subRole: e.target.value })}
                  placeholder="Contoh: Sekretaris II / Koordinator Lapangan"
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  No. Telepon / WhatsApp (Opsional)
                </label>
                <input
                  type="text"
                  value={pengForm.phone}
                  onChange={(e) => setPengForm({ ...pengForm, phone: e.target.value })}
                  placeholder="Contoh: 0812-3456-7890"
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPengModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E0] hover:bg-slate-50 text-[#555555] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5A. Modal Ubah Agregat Kependudukan */}
      {pendStatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E5E0] flex items-center justify-between bg-slate-50/50">
              <h3 className="font-serif font-bold text-base text-[#0A0A0A]">
                Perbarui Angka Statistik Agregat RT 01
              </h3>
              <button
                type="button"
                onClick={() => setPendStatModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#0A0A0A] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStat} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Total Penduduk (Jiwa)</label>
                  <input
                    type="number"
                    min="0"
                    value={pendStatForm.totalPenduduk}
                    onChange={(e) => setPendStatForm({ ...pendStatForm, totalPenduduk: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Jumlah Kepala Keluarga (KK)</label>
                  <input
                    type="number"
                    min="0"
                    value={pendStatForm.jumlahKK}
                    onChange={(e) => setPendStatForm({ ...pendStatForm, jumlahKK: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Penduduk Laki-Laki (Jiwa)</label>
                  <input
                    type="number"
                    min="0"
                    value={pendStatForm.lakiLaki}
                    onChange={(e) => setPendStatForm({ ...pendStatForm, lakiLaki: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Penduduk Perempuan (Jiwa)</label>
                  <input
                    type="number"
                    min="0"
                    value={pendStatForm.perempuan}
                    onChange={(e) => setPendStatForm({ ...pendStatForm, perempuan: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Pelaku Usaha (Warung/UMKM)</label>
                  <input
                    type="number"
                    min="0"
                    value={pendStatForm.pelakuUsaha}
                    onChange={(e) => setPendStatForm({ ...pendStatForm, pelakuUsaha: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Periode Pembaruan</label>
                  <input
                    type="text"
                    value={pendStatForm.updatePeriod}
                    onChange={(e) => setPendStatForm({ ...pendStatForm, updatePeriod: e.target.value })}
                    placeholder="Contoh: Semester I / 2026"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPendStatModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E0] hover:bg-slate-50 text-[#555555] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5B. Modal Tambah/Edit Kategori Demografi */}
      {pendDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E5E0] flex items-center justify-between bg-slate-50/50">
              <h3 className="font-serif font-bold text-base text-[#0A0A0A]">
                {pendEditingDemoIndex !== null ? 'Edit Kelompok Demografi' : 'Tambah Kelompok Demografi Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setPendDemoModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#0A0A0A] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDemo} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Nama Kategori / Kelompok Demografi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={pendDemoForm.category}
                  onChange={(e) => setPendDemoForm({ ...pendDemoForm, category: e.target.value })}
                  placeholder="Contoh: Usia Anak & Balita (0–5 th)"
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Jumlah Jiwa / KK <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={pendDemoForm.count}
                  onChange={(e) => setPendDemoForm({ ...pendDemoForm, count: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                  required
                />
                <p className="text-[10px] text-[#777777] mt-1">
                  Persentase otomatis dihitung terhadap total penduduk ({pendudukData.totalPenduduk} jiwa).
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPendDemoModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E0] hover:bg-slate-50 text-[#555555] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal Kas Transaksi */}
      {mutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E5E0] flex items-center justify-between bg-slate-50/50">
              <h3 className="font-serif font-bold text-base text-[#0A0A0A]">
                {mutEditingItem ? 'Edit Catatan Transaksi Kas' : 'Tambah Transaksi Kas Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setMutModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#0A0A0A] rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMutasi} className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Tanggal Transaksi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={mutForm.date}
                  onChange={(e) => setMutForm({ ...mutForm, date: e.target.value })}
                  placeholder="Contoh: 12 Nov 2026"
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Uraian / Keterangan Transaksi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={mutForm.description}
                  onChange={(e) => setMutForm({ ...mutForm, description: e.target.value })}
                  placeholder="Contoh: Iuran Pengelolaan Sampah Warga..."
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Jenis Kas</label>
                  <select
                    value={mutForm.category}
                    onChange={(e) => setMutForm({ ...mutForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none bg-white font-medium"
                  >
                    <option value="Pemasukan">Pemasukan (+)</option>
                    <option value="Pengeluaran">Pengeluaran (-)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">
                    Nominal Transaksi (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={mutForm.amount}
                    onChange={(e) => setMutForm({ ...mutForm, amount: e.target.value })}
                    placeholder="Contoh: 500000"
                    className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Pihak / Sumber / Penerima</label>
                <input
                  type="text"
                  value={mutForm.sourceOrRecipient}
                  onChange={(e) => setMutForm({ ...mutForm, sourceOrRecipient: e.target.value })}
                  placeholder="Contoh: Warga RT 01 / TB Bangun Jaya"
                  className="w-full px-3 py-2 border border-[#E5E5E0] rounded-xs focus:border-[#00A4B4] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setMutModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E0] hover:bg-slate-50 text-[#555555] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A4B4] hover:bg-[#008d9b] text-white font-bold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          DELETE CONFIRMATION MODAL (GENERIC REUSABLE)
      ========================================================================= */}
      {deleteConfirm && deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E5E0] rounded-xs shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0A0A0A] mb-2">
                {deleteConfirm.title}
              </h3>
              <p className="text-xs text-[#555555] font-sans leading-relaxed">
                {deleteConfirm.description} Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-[#E5E5E0] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-[#E5E5E0] hover:bg-white text-[#555555] font-semibold rounded-xs text-xs font-sans transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={deleteConfirm.onConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xs text-xs font-sans transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Ya, Hapus Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
