"use client";

import React from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function KamarPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pilihan Kamar</h1>
        <p className="text-lg">Temukan kenyamanan dan kemewahan di setiap kamar</p>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Kamar 1 */}
           <div className="bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800">
            <Image
              src="/kamar/2679310_IMG_ICG.jpg"
              alt="Standard Room"
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Standard Room</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Kamar standar nyaman untuk keluarga dengan fasilitas AC, TV, dan WiFi.</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-4">
                <li>🛏️ 1 Double Bed</li>
                <li>❄️ AC</li>
                <li>📺 TV</li>
                <li>📶 WiFi</li>
              </ul>
            </div>
          </div>

          {/* Kamar 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800">
            <Image
              src="/kamar/2679300_IMG_ICG.jpg"
              alt="Kamar Suite"
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Suite Room</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Nikmati kenyamanan kamar dengan fasilitas lengkap untuk istirahat terbaik Anda.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-4">
                <li>🛏️ 1 Queen Bed</li>
                <li>📶 WiFi Gratis</li>
                <li>🛁 Kamar Mandi Pribadi</li>
                <li>📺 Smart TV</li>
              </ul>
            </div>
          </div>

          {/* Kamar 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800">
            <Image
              src="/kamar/2679314_IMG_ICG.jpg"
              alt="Kamar Deluxe"
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Deluxe Room</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Kamar luas dengan pemandangan kota dan fasilitas untuk pengalaman menginap premium.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-4">
                <li>🛏️ 1 King Bed</li>
                <li>📶 WiFi Kecepatan Tinggi</li>
                <li>🛁 Bathtub & Shower</li>
                <li>☕ Mini Bar & Coffee Maker</li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}