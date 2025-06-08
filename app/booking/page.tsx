import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';

import pool from '@/lib/db';
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
}

async function getRooms(): Promise<KamarData[]> {
 
  try {

    const query = 'SELECT * FROM kamar ORDER BY k_harga_per_malam ASC';
    const [rows] = await pool.query<KamarData[]>(query);

    return rows.map(kamar => ({
      ...kamar,
      images: JSON.parse(kamar.k_gambar_kamar || '[]') 
    }));

  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return [];
  
  }

}

export default async function RoomsPage() {
  
  const roomsData = await getRooms();

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
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-2xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="font-semibold text-blue-800 dark:text-blue-200">Check-in</p>
                      <p className="text-blue-600 dark:text-blue-300">31 Mei 2025</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 rounded-2xl border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="font-semibold text-purple-800 dark:text-purple-200">Check-out</p>
                      <p className="text-purple-600 dark:text-purple-300">1 Juni 2025</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-2xl border border-green-200 dark:border-green-700">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-xl">👥</span>
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-200">Tamu</p>
                      <p className="text-green-600 dark:text-green-300">2 Dewasa • 1 Kamar</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Change Search Button */}
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>🔄</span>
                <span>Ubah Pencarian</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          
          {/* Filter and Sort Section */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏷️</span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Filter & Urutkan</h3>
                <p className="text-gray-600 dark:text-gray-400">Temukan kamar yang tepat untuk Anda</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Filter Dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-w-[160px]">
                    <option value="">Semua Tipe</option>
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="premium">Premium</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-w-[180px]">
                    <option value="price_asc">Harga: Rendah ke Tinggi</option>
                    <option value="price_desc">Harga: Tinggi ke Rendah</option>
                    <option value="rating_desc">Rating Tertinggi</option>
                    <option value="popular">Paling Popular</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    💰 Rp 200K - 2M
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm">
                    Ubah
                  </button>
                </div>
              </div>
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
                <span>Menampilkan {roomsData.length} kamar untuk tanggal pilihan Anda</span>
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors duration-200">
                📋 List
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors duration-200">
                🔲 Grid
              </button>
            </div>
          </div>

          {/* Rooms List */}
          <div className="space-y-8">
            {roomsData.length > 0 ? (
              roomsData.map((kamar) => (
                // @ts-ignore - 'images' ditambahkan secara dinamis, jadi kita abaikan error TS di sini
                <RoomCard key={kamar.k_id_kamar} kamar={kamar} />
              ))
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-6">😔</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Tidak Ada Kamar Tersedia
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Maaf, tidak ada kamar yang tersedia untuk kriteria pencarian Anda. 
                    Coba ubah tanggal atau filter pencarian.
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    🔄 Ubah Pencarian
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-2">
                <span>📧</span>
                <span>Dapatkan Penawaran Terbaik</span>
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Berlangganan newsletter kami dan dapatkan notifikasi untuk promo eksklusif dan penawaran terbatas!
              </p>
              
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Masukkan email Anda..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-blue-200 mt-4">
                ✅ Gratis dan bisa berhenti kapan saja
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}