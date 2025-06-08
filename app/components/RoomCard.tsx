"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { KamarData } from '../booking/page'; // Asumsi path ini benar

interface RoomCardProps {
  kamar: KamarData & { images: string[] };
}

export default function RoomCardMinimalist({ kamar }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const isAvailable = kamar.k_jumlah_kamar > 0;
  const facilities = typeof kamar.k_fasilitas === 'string' 
    ? kamar.k_fasilitas.split(',').map(f => f.trim()).filter(f => f.length > 0)
    : [];

  const images = kamar.images && kamar.images.length > 0 ? kamar.images : ['/placeholder.jpg'];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    
    if (!isAutoPlaying || !hasMultipleImages) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, hasMultipleImages, images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getFacilityIcon = (facility: string) => {
    const lowerFacility = facility.toLowerCase();
    if (lowerFacility.includes('wifi')) return '📶';
    if (lowerFacility.includes('tv')) return '📺';
    if (lowerFacility.includes('ac')) return '❄️';
    if (lowerFacility.includes('shower')) return '🚿';
    if (lowerFacility.includes('coffee')) return '☕';
    return '✨';
  };

  return (
    <div className="group flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 mb-8">
      
      {/* Image Slider Section */}
      <div 
        className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            src={images[currentImageIndex]}
            alt={`${kamar.k_tipe_kamar} - Gambar ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-all duration-700 ease-in-out"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Room Info Overlay */}
          <div className="absolute bottom-4 left-4 text-white z-10">
            <h3 className="text-2xl font-bold">{kamar.k_tipe_kamar}</h3>
            <p className="text-sm">Mulai dari Rp {kamar.k_harga_per_malam.toLocaleString('id-ID')}</p>
          </div>
          
          {/* Limited Rooms Badge */}
          {kamar.k_jumlah_kamar > 0 && kamar.k_jumlah_kamar <= 3 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              Sisa {kamar.k_jumlah_kamar}!
            </div>
          )}

          {/* Navigation Arrows - Only show if multiple images */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Gambar sebelumnya"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Gambar berikutnya"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Dots Indicator - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ke gambar ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Deskripsi Singkat</h4>
            {hasMultipleImages && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{images.length} Foto</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
            {kamar.k_deskripsi.substring(0, 150)}{kamar.k_deskripsi.length > 150 ? '...' : ''}
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Fasilitas Termasuk</h4>
          <div className="flex flex-wrap gap-4 mb-6">
            {facilities.slice(0, 5).map((facility, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
                <span className="text-xl">{getFacilityIcon(facility)}</span>
                <span>{facility}</span>
              </div>
            ))}
            {facilities.length > 5 && (
              <div className="flex items-center text-sm text-blue-500">
                + {facilities.length - 5} lainnya
              </div>
            )}
          </div>
        </div>
        
        {/* Action Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col items-start mb-4 sm:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">Harga per malam</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Rp {kamar.k_harga_per_malam.toLocaleString('id-ID')}
            </p>
          </div>
          <Link
            href={isAvailable ? `/booking?roomId=${kamar.k_id_kamar}` : '#'}
            className={`w-full sm:w-auto px-6 py-3 text-center font-semibold text-white rounded-lg transition-all duration-300 ${
              isAvailable 
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-300/50' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            style={!isAvailable ? { pointerEvents: 'none' } : {}}
          >
            {isAvailable ? 'Pesan Kamar' : 'Habis Terjual'}
          </Link>
        </div>
      </div>
    </div>
  );
}