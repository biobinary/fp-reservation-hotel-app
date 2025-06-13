'use client';

import { useState } from 'react';
import Image from 'next/image';
import { KamarData } from '../booking/page';
import Link from 'next/link';

interface RoomCardProps {
  kamar: KamarData & {
    availableRooms?: number;
    formattedPrice?: string;
  };
  viewMode?: 'list' | 'grid';
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function RoomCard({ kamar, viewMode = 'list',  checkIn, checkOut, guests }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const facilities = kamar.k_fasilitas ? kamar.k_fasilitas.split(',').map(f => f.trim()) : [];
  const images = kamar.images || [];
  
  const formattedPrice = kamar.formattedPrice || 
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(kamar.k_harga_per_malam);

  const description = kamar.k_deskripsi || '';
  const isLongDescription = description.length > 150;
  const displayDescription = showFullDescription || !isLongDescription 
    ? description 
    : description.substring(0, 150) + '...';

  const getPopularityBadge = () => {
    const reservations = kamar.confirmedReservations || 0;
    if (reservations > 10) return { text: 'Sangat Populer', color: 'bg-red-500', icon: '🔥' };
    if (reservations > 5) return { text: 'Populer', color: 'bg-orange-500', icon: '⭐' };
    if (reservations > 0) return { text: 'Diminati', color: 'bg-blue-500', icon: '👍' };
    return null;
  };

  const popularityBadge = getPopularityBadge();

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          {images.length > 0 && !imageError ? (
            <>
              <Image
                src={images[currentImageIndex]}
                alt={kamar.k_tipe_kamar}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-4xl">🏨</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {popularityBadge && (
              <span className={`${popularityBadge.color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}>
                <span>{popularityBadge.icon}</span>
                <span>{popularityBadge.text}</span>
              </span>
            )}
            {kamar.k_jumlah_kamar <= 3 && (
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <span>⚠️</span>
                <span>Terbatas</span>
              </span>
            )}
          </div>

          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
              {kamar.k_tipe_kamar}
            </h3>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formattedPrice}
              </p>
              <p className="text-xs text-gray-500">per malam</p>
            </div>
          </div>

          {description && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
          )}
          
          {/* Facilities */}
          <div className="flex flex-wrap gap-1 mb-4">
            {facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
              >
                {facility}
              </span>
            ))}
            {facilities.length > 3 && (
              <span className="text-xs text-gray-500">+{facilities.length - 3} lainnya</span>
            )}
          </div>

          <Link 
            href={`/booking/confirm?roomId=${kamar.k_id_kamar}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
            className="block text-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Pesan Sekarang
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group">
      <div className="flex flex-col lg:flex-row">
        
        {/* Image Section */}
        <div className="relative lg:w-80 h-64 lg:h-auto overflow-hidden">
          {images.length > 0 && !imageError ? (
            <>
              <Image
                src={images[currentImageIndex]}
                alt={kamar.k_tipe_kamar}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-6xl">🏨</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {popularityBadge && (
              <span className={`${popularityBadge.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2`}>
                <span>{popularityBadge.icon}</span>
                <span>{popularityBadge.text}</span>
              </span>
            )}
            {kamar.k_jumlah_kamar <= 3 && (
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                <span>⚠️</span>
                <span>Kamar Terbatas</span>
              </span>
            )}
          </div>

          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {kamar.k_tipe_kamar}
              </h3>
              
              {description && (
                <div className="mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
                      isLongDescription && !showFullDescription ? 'line-clamp-3' : ''
                    }`}>
                      {displayDescription}
                    </p>
                    {isLongDescription && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>{showFullDescription ? 'Lihat lebih sedikit' : 'Lihat selengkapnya'}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${showFullDescription ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
            
            <div className="text-right lg:ml-6">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {formattedPrice}
              </p>
              <p className="text-sm text-gray-500">per malam</p>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                {kamar.availableRooms || kamar.k_jumlah_kamar} kamar tersedia
              </p>
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="mr-2">✨</span>
              Fasilitas
            </h4>
            <div className="flex flex-wrap gap-2">
              {facilities.map((facility, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              {kamar.totalReservations !== undefined && (
                <div className="flex items-center space-x-1">
                  <span>📊</span>
                  <span>{kamar.totalReservations} reservasi</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <span>🛏️</span>
                <span>{kamar.k_jumlah_kamar} kamar</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>📋</span>
                <span>Detail</span>
              </button>
              <Link
                href={`/booking/confirm?roomId=${kamar.k_id_kamar}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>🛏️</span>
                <span>Pesan Sekarang</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}