"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

const images = [
  './slideshow-1-1.jpg',
  './slideshow-2-2.jpg'
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Hotel ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          </div>
        ))}
      </div>

      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      <div className="container mx-auto px-6 text-center relative z-20 h-full flex flex-col justify-center items-center">
        <div className="max-w-4xl">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white text-sm font-medium">4.9 • 2,847 ulasan</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Penginapan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Impian</span> Anda
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Rasakan kemewahan dan kenyamanan di hotel bintang 5 dengan pemandangan menakjubkan dan pelayanan tak terlupakan.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={20} className="text-blue-400" />
              <span>Surabaya</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Calendar size={20} className="text-blue-400" />
              <span>Check-in Hari Ini</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 inline-block"
            >
              <span className="relative z-10">Pesan Sekarang</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentImageIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75 w-2'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-20 right-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
          <div className="text-2xl font-bold">Mulai 700k</div>
          <div className="text-sm opacity-80">per malam</div>
        </div>
      </div>
    </section>

  );
}