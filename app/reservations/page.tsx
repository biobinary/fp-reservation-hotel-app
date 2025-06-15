"use client";

import React, { useState } from 'react';
import { Search, Calendar, MapPin, CreditCard, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Reservation {
  r_id_reservasi: string;
  r_tanggal_check_in: string;
  r_tanggal_check_out: string;
  r_status: string;
  pelanggan: {
    p_nama: string;
    p_email: string;
    p_no_telp: string;
  };
  kamar: {
    k_tipe_kamar: string;
    k_harga_per_malam: number;
    k_fasilitas: string;
  };
  hotel: {
    h_nama: string;
    h_alamat: string;
  };
  pembayaran: {
    pe_status_pembayaran: string;
    pe_metode_pembayaran: string;
    pe_jumlah: number;
    pe_tanggal_pembayaran: string | null;
  };
}

export default function CheckReservation() {
  const [reservationData, setReservationData] = useState<Reservation | null>(null);
  const [reservationCode, setReservationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockReservations : Record<string, Reservation> = {
    'RSV0000001': {
      r_id_reservasi: 'RSV0000001',
      r_tanggal_check_in: '2025-06-20',
      r_tanggal_check_out: '2025-06-23',
      r_status: 'Confirmed',
      pelanggan: {
        p_nama: 'Ahmad Wijaya',
        p_email: 'ahmad.wijaya@email.com',
        p_no_telp: '+62 812-3456-7890'
      },
      kamar: {
        k_tipe_kamar: 'Deluxe Ocean View',
        k_harga_per_malam: 850000,
        k_fasilitas: 'AC, WiFi, TV LED 55", Mini Bar, Coffee Maker, Ocean View'
      },
      hotel: {
        h_nama: 'Grand Inna Surabaya',
        h_alamat: 'Jl. Pemuda No. 123, Surabaya, Jawa Timur'
      },
      pembayaran: {
        pe_status_pembayaran: 'Paid',
        pe_metode_pembayaran: 'Credit Card',
        pe_jumlah: 2550000,
        pe_tanggal_pembayaran: '2025-06-15 14:30:00'
      }
    },
    'RSV0000002': {
      r_id_reservasi: 'RSV0000002',
      r_tanggal_check_in: '2025-06-25',
      r_tanggal_check_out: '2025-06-27',
      r_status: 'Pending',
      pelanggan: {
        p_nama: 'Siti Nurhaliza',
        p_email: 'siti.nurhaliza@email.com',
        p_no_telp: '+62 813-9876-5432'
      },
      kamar: {
        k_tipe_kamar: 'Superior Twin',
        k_harga_per_malam: 650000,
        k_fasilitas: 'AC, WiFi, TV LED 43", Mini Bar, Coffee Maker'
      },
      hotel: {
        h_nama: 'Grand Inna Surabaya',
        h_alamat: 'Jl. Pemuda No. 123, Surabaya, Jawa Timur'
      },
      pembayaran: {
        pe_status_pembayaran: 'Pending',
        pe_metode_pembayaran: 'Bank Transfer',
        pe_jumlah: 1300000,
        pe_tanggal_pembayaran: null
      }
    }
  };

  const handleSearch = async () => {

    if (!reservationCode.trim()) {
      setError('Silakan masukkan kode reservasi');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/reservations/check?code=${encodeURIComponent(reservationCode.trim())}`);
      const result = await response.json();

      if (result.success) {
        setReservationData(result.data);
        setError('');
      
    } else {
        setReservationData(null);
        setError(result.message);
      }

    } catch (error) {
      console.error('Error fetching reservation:', error);
      setReservationData(null);
      setError('Terjadi kesalahan saat mengambil data. Silakan coba lagi.');
    
    } finally {
      setIsLoading(false);
    }

  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'Pending':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'Cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

    const calculateNights = (checkIn: string, checkOut: string): number => {
      
      if (!checkIn || !checkOut) return 0;
    
      const date1 = new Date(checkIn);
      const date2 = new Date(checkOut);
    
      if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return 0;
    
      if (date2 <= date1) return 0;
    
      const diffTime = date2.getTime() - date1.getTime();
    
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Header */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cek <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Reservasi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Masukkan kode reservasi Anda untuk melihat detail dan status reservasi
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Search className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Cari Reservasi Anda</h2>
              <p className="text-gray-600">Masukkan kode reservasi yang telah Anda terima via email</p>
            </div>

            <div className="space-y-6 dark:text-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kode Reservasi
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={reservationCode}
                    onChange={(e) => setReservationCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: RSV0000001"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono tracking-wider"
                    maxLength={10}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <XCircle className="text-red-500 mr-3" size={20} />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mencari...
                  </div>
                ) : (
                  'Cek Reservasi'
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Tips:</strong> Kode reservasi dapat ditemukan di email konfirmasi yang Anda terima setelah melakukan pemesanan.
              </p>
            </div>
          </div>
        </div>

        {/* Reservation Details */}
        {reservationData && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold">Detail Reservasi</h3>
                      <p className="text-blue-100">Kode: {reservationData.r_id_reservasi}</p>
                    </div>
                  </div>
                  <div className={`mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm ${getStatusColor(reservationData.r_status).replace('bg-', 'bg-white/10 ')}`}>
                    {getStatusIcon(reservationData.r_status)}
                    <span className="font-semibold text-white">{reservationData.r_status}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Guest Information */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <User className="mr-2 text-blue-600" size={20} />
                        Informasi Tamu
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="text-gray-600 w-20">Nama:</span>
                          <span className="font-medium text-gray-800">{reservationData.pelanggan.p_nama}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="text-gray-400 mr-2" size={16} />
                          <span className="text-gray-600">{reservationData.pelanggan.p_email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="text-gray-400 mr-2" size={16} />
                          <span className="text-gray-600">{reservationData.pelanggan.p_no_telp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hotel Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl">
                       <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <MapPin className="mr-2 text-blue-600" size={20} />
                        Informasi Hotel
                      </h4>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-800">{reservationData.hotel.h_nama}</p>
                        <p className="text-gray-600">{reservationData.hotel.h_alamat}</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Calendar className="mr-2 text-blue-600" size={20} />
                        Detail Pemesanan
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Check-in</p>
                            <p className="font-semibold text-gray-800">{formatDate(reservationData.r_tanggal_check_in)}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Check-out</p>
                            <p className="font-semibold text-gray-800">{formatDate(reservationData.r_tanggal_check_out)}</p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-600 mb-1">Durasi Menginap</p>
                          <p className="font-semibold text-blue-800">
                            {calculateNights(reservationData.r_tanggal_check_in, reservationData.r_tanggal_check_out)} malam
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-2">Tipe Kamar</p>
                          <p className="font-semibold text-lg text-gray-800">{reservationData.kamar.k_tipe_kamar}</p>
                          <p className="text-gray-600 text-sm mt-1">{reservationData.kamar.k_fasilitas}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <CreditCard className="mr-2 text-blue-600" size={20} />
                        Informasi Pembayaran
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Metode Pembayaran:</span>
                          <span className="font-medium text-gray-600">{reservationData.pembayaran.pe_metode_pembayaran}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status Pembayaran:</span>
                          <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(reservationData.pembayaran.pe_status_pembayaran)}`}>
                            {reservationData.pembayaran.pe_status_pembayaran}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold">
                          <span className='text-gray-600'>Total Pembayaran:</span>
                          <span className="text-blue-600">{formatCurrency(reservationData.pembayaran.pe_jumlah)}</span>
                        </div>
                        {reservationData.pembayaran.pe_tanggal_pembayaran && (
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Tanggal Pembayaran:</span>
                            <span>{new Date(reservationData.pembayaran.pe_tanggal_pembayaran).toLocaleString('id-ID')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Cetak Voucher
                    </button>
                    <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Hubungi Hotel
                    </button>
                    {reservationData.r_status === 'Pending' && (
                      <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Batalkan Reservasi
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <AlertCircle className="mr-2 text-yellow-300" size={24} />
                Butuh Bantuan?
              </h3>
              <div className="space-y-3 text-blue-100">
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  Jika Anda tidak dapat menemukan kode reservasi, periksa folder spam di email Anda
                </p>
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  Untuk pertanyaan lebih lanjut, hubungi customer service di +62 21 1234 5678
                </p>
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  Atau kirim email ke info@grandinna.com
                </p>
              </div>
              <div className="mt-6 flex gap-4">
                <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Phone size={18} />
                  Hubungi Kami
                </button>
                <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Mail size={18} />
                  Email Kami
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}