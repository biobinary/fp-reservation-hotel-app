'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';
import { RowDataPacket } from 'mysql2';

export interface KamarData extends RowDataPacket {
  k_id_kamar: string;
  k_id_hotel: string;
  k_tipe_kamar: string;
  k_harga_per_malam: number;
  k_fasilitas: string;
  k_jumlah_kamar: number;
  k_deskripsi: string;
  k_gambar_kamar: string;
  images?: string[];
  hotel_nama?: string;
  hotel_alamat?: string;
  popularityScore?: number;
  totalReservations?: number;
  confirmedReservations?: number;
}

interface FilterState {
  tipeKamar: string;
  sortBy: string;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  hotel?: string;
}

export default function RoomsPage() {
  const router = useRouter();

  const [roomsData, setRoomsData] = useState<KamarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState<FilterState>({
    tipeKamar: '',
    sortBy: 'price_asc',
    minPrice: 0,
    maxPrice: 2000000,
    priceRange: [200000, 2000000],
    checkIn: '2025-05-31',
    checkOut: '2025-06-01',
    guests: 2,
    rooms: 1,
    hotel: ''
  });

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams({
          tipeKamar: filters.tipeKamar,
          sortBy: filters.sortBy,
          minPrice: filters.priceRange[0].toString(),
          maxPrice: filters.priceRange[1].toString(),
          checkIn: filters.checkIn,
          checkOut: filters.checkOut,
          guests: filters.guests.toString(),
          rooms: filters.rooms.toString(),
          hotel: filters.hotel || ''
        });

        const response = await fetch(`/api/rooms?${searchParams.toString()}`);
        const data = await response.json();
        if (data.success) {
          setRoomsData(data.rooms);
        } else {
          setRoomsData([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setRoomsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [filters]);

  const roomTypes = useMemo(() => {
    return [...new Set(roomsData.map(r => r.k_tipe_kamar))].sort();
  }, [roomsData]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, priceRange: [min, max] }));
  };

  const handleRedirectToRooms = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams({
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      guests: filters.guests.toString(),
      rooms: filters.rooms.toString(),
      hotel: filters.hotel || '',
      tipeKamar: filters.tipeKamar,
      sortBy: filters.sortBy,
      minPrice: filters.priceRange[0].toString(),
      maxPrice: filters.priceRange[1].toString()
    });
    router.push(`/rooms?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      tipeKamar: '',
      sortBy: 'price_asc',
      minPrice: 0,
      maxPrice: 2000000,
      priceRange: [200000, 2000000],
      checkIn: '2025-05-31',
      checkOut: '2025-06-01',
      guests: 2,
      rooms: 1,
      hotel: ''
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section with Enhanced Search */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/5 rounded-full blur-2xl animate-spin-slow" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Temukan Kamar Impian Anda
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              Pilih dari berbagai pilihan kamar premium dengan fasilitas terbaik
            </p>
          </div>
          
          {/* Enhanced Search Card */}
          <div className="bg-white/95 backdrop-blur-lg dark:bg-gray-800/95 shadow-2xl rounded-3xl p-6 md:p-8 border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              {/* Search Title */}
              <div className="lg:flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center space-x-2">
                  <span className="text-2xl">🏨</span>
                  <span>Pencarian Anda</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Pilih kamar yang sesuai dengan kebutuhan Anda</p>
              </div>
              
              {/* Search Details */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">

              {/* Hotel Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hotel & Lokasi
                </label>
                <div className="relative">
                  <select
                    value={filters.hotel}
                    onChange={(e) => handleFilterChange('hotel', e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 w-full"
                  >
                    <option value="">Semua Cabang</option>
                    <option value="Grand Inna Jakarta">Grand Inna Jakarta</option>
                    <option value="Grand Inna Surabaya">Grand Inna Surabaya</option>
                    <option value="Grand Inna Bali">Grand Inna Bali</option>
                    <option value="Grand Inna Yogyakarta">Grand Inna Yogyakarta</option>
                    <option value="Grand Inna Bandung">Grand Inna Bandung</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>


                {/* Check-in */}
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-2xl border border-blue-200 dark:border-blue-700">
                  <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                    📅 Check-in
                  </label>
                  <input
                    type="date"
                    value={filters.checkIn}
                    onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                    className="bg-transparent outline-none text-blue-600 dark:text-blue-300 text-sm"
                  />
                </div>

                {/* Check-out */}
                <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 rounded-2xl border border-purple-200 dark:border-purple-700">
                  <label className="block text-sm font-semibold text-purple-800 dark:text-purple-200 mb-1">
                    📅 Check-out
                  </label>
                  <input
                    type="date"
                    value={filters.checkOut}
                    onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                    className="bg-transparent outline-none text-purple-600 dark:text-purple-300 text-sm"
                  />
                </div>

                {/* Tamu */}
                <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-2xl border border-green-200 dark:border-green-700">
                  <label className="block text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                    👥 Tamu
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={filters.guests}
                    onChange={(e) => handleFilterChange('guests', parseInt(e.target.value))}
                    className="bg-transparent outline-none text-green-600 dark:text-green-300 text-sm w-16"
                  />
                </div>

                {/* Kamar */}
                <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-2xl border border-green-200 dark:border-green-700">
                  <label className="block text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                    🛏️ Kamar
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={filters.rooms}
                    onChange={(e) => handleFilterChange('rooms', parseInt(e.target.value))}
                    className="bg-transparent outline-none text-green-600 dark:text-green-300 text-sm w-16"
                  />
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          
          {/* Enhanced Filter and Sort Section */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-6">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏷️</span>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Filter & Urutkan</h3>
                  <p className="text-gray-600 dark:text-gray-400">Temukan kamar yang tepat untuk Anda</p>
                </div>
                
                <button 
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                >
                  <span>🔄</span>
                  <span>Reset Filter</span>
                </button>
              </div>
              
              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row gap-4">
                
                {/* Room Type Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipe Kamar
                  </label>
                  <div className="relative">
                    <select 
                      value={filters.tipeKamar}
                      onChange={(e) => handleFilterChange('tipeKamar', e.target.value)}
                      className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 w-full"
                    >
                      <option value="">Semua Tipe</option>
                      {roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Sort Options */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urutkan Berdasarkan
                  </label>
                  <div className="relative">
                    <select 
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 w-full"
                    >
                      <option value="price_asc">Harga: Rendah ke Tinggi</option>
                      <option value="price_desc">Harga: Tinggi ke Rendah</option>
                      <option value="popular_desc">Paling Populer</option>
                      <option value="rooms_desc">Ketersediaan Terbanyak</option>
                      <option value="type_asc">Tipe Kamar A-Z</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rentang Harga (per malam)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange[1])}
                      placeholder="Min"
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value) || 2000000)}
                      placeholder="Max"
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Rp {filters.priceRange[0].toLocaleString('id-ID')} - Rp {filters.priceRange[1].toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
              
              {/* Active Filters Display */}
              {(filters.tipeKamar || filters.priceRange[0] > 200000 || filters.priceRange[1] < 2000000) && (
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter Aktif:</span>
                  
                  {filters.tipeKamar && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      Tipe: {filters.tipeKamar}
                      <button 
                        onClick={() => handleFilterChange('tipeKamar', '')}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                      </button>
                    </span>
                  )}
                  
                  {(filters.priceRange[0] > 200000 || filters.priceRange[1] < 2000000) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Harga: Rp {filters.priceRange[0].toLocaleString('id-ID')} - Rp {filters.priceRange[1].toLocaleString('id-ID')}
                      <button 
                        onClick={() => handlePriceRangeChange(200000, 2000000)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Kamar Tersedia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                <span>📍</span>
                <span>
                  {loading ? 'Memuat...' : `Menampilkan ${roomsData.length} kamar untuk kriteria pencarian Anda`}
                </span>
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'text-white bg-blue-600' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📋 List
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'text-white bg-blue-600' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🔲 Grid
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Memuat kamar...</span>
            </div>
          )}

          {/* Rooms List/Grid */}
          {!loading && (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-8'}>
              {roomsData.length > 0 ? (
                roomsData.map((kamar) => (
                  // @ts-ignore - 'images' ditambahkan secara dinamis, jadi kita abaikan error TS di sini
                  <RoomCard 
                    key={kamar.k_id_kamar} kamar={kamar} viewMode={viewMode} 
                    checkIn={filters.checkIn} checkOut={filters.checkOut} guests={filters.guests}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-6">😔</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Tidak Ada Kamar Tersedia
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Maaf, tidak ada kamar yang sesuai dengan kriteria pencarian Anda. 
                      Coba ubah filter atau rentang harga.
                    </p>
                    <button 
                      onClick={resetFilters}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      🔄 Reset Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
