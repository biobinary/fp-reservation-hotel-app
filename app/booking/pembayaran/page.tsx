"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PaymentForm from '@/app/components/PaymentForm';
import ReservationSummary from '@/app/components/ReservationSummary';
import { useEffect, useState } from 'react';
import { KamarData } from '../page';

function PaymentPageContent() {
  const params = useSearchParams();
  const roomId = params.get('roomId');
  const checkIn = params.get('checkIn') || '';
  const checkOut = params.get('checkOut') || '';
  const guests = parseInt(params.get('guests') || '1');
  const [room, setRoom] = useState<KamarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) {
        setError('ID kamar tidak ditemukan.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/rooms/${roomId}`);
        const data = await res.json();

        if (data.success) {
          setRoom(data.room);
        } else {
          setError(data.error || 'Gagal mengambil data kamar.');
        }
      } catch (err) {
        setError('Gagal memuat data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-300">Memuat halaman pembayaran...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (!room) {
    return <div className="text-center py-10">Data kamar tidak tersedia.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <PaymentForm hargaPerMalam={room.k_harga_per_malam} />
        </div>
        <div className="lg:col-span-1">
          <ReservationSummary room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} />
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
          <PaymentPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
