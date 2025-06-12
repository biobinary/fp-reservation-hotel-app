'use client';

import Image from 'next/image';
import { KamarData } from '../booking/page';
import { Calendar, Users, Moon, Tag, Home, MapPin } from 'lucide-react';

interface ReservationSummaryProps {
  room: KamarData;
  checkIn: string;
  checkOut: string;
  guests: number;
}

const getDurationInNights = (checkIn: string, checkOut: string): number => {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate <= startDate) {
    return 1;
  }
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function ReservationSummary({ room, checkIn, checkOut, guests }: ReservationSummaryProps) {
  const durationInNights = getDurationInNights(checkIn, checkOut);
  const totalPrice = room.k_harga_per_malam * durationInNights;

  const formattedTotalPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalPrice);
  
  const formattedPricePerNight = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(room.k_harga_per_malam);

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-fit sticky top-28">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ringkasan Reservasi</h2>
      
      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6">
        <Image 
          src={room.images?.[0] || '/placeholder.jpg'} 
          alt={room.k_tipe_kamar} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{room.k_tipe_kamar}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-600 my-4"></div>

        <p className="flex items-center gap-3"><Home size={18} className="text-blue-500" /> <span>{room.hotel_nama}</span></p>
        <p className="flex items-center gap-3"><MapPin size={18} className="text-blue-500" /> <span>{room.hotel_alamat}</span></p>

        <div className="border-t border-gray-200 dark:border-gray-600 my-4"></div>

        <div className="flex justify-between items-center">
          <p className="flex items-center gap-3"><Calendar size={18} className="text-blue-500" /> <span>Check-in</span></p>
          <span className="font-semibold">{new Date(checkIn).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-3"><Calendar size={18} className="text-purple-500" /> <span>Check-out</span></p>
          <span className="font-semibold">{new Date(checkOut).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-3"><Moon size={18} className="text-yellow-500" /> <span>Lama Menginap</span></p>
          <span className="font-semibold">{durationInNights} malam</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-3"><Users size={18} className="text-green-500" /> <span>Jumlah Tamu</span></p>
          <span className="font-semibold">{guests} orang</span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 my-4"></div>

        <div className="flex justify-between items-center text-sm">
            <p>Harga per malam</p>
            <span>{formattedPricePerNight}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <p>{durationInNights} malam × {formattedPricePerNight}</p>
            <span>{formattedTotalPrice}</span>
        </div>
        <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>
        <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
            <p>Total Pembayaran</p>
            <span>{formattedTotalPrice}</span>
        </div>
      </div>
    </div>
  );
}