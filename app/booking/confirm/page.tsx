'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import BookingForm from '@/app/components/BookingForm';
import ReservationSummary from '@/app/components/ReservationSummary';
import { KamarData } from '../page';

function ConfirmationPageContent() {
  const searchParams = useSearchParams();
  const [room, setRoom] = useState<KamarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const roomId = searchParams.get('roomId');
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '1');

  useEffect(() => {
    if (roomId) {
      const fetchRoomDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/rooms/${roomId}`);
          const data = await response.json();

          if (data.success) {
            setRoom(data.room);
          } else {
            setError(data.error || 'Gagal memuat detail kamar.');
          }
        } catch (err) {
          setError('Terjadi kesalahan pada jaringan.');
        } finally {
          setLoading(false);
        }
      };

      fetchRoomDetails();
    } else {
        setError('ID Kamar tidak ditemukan.');
        setLoading(false);
    }
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-700 dark:text-gray-300">Memuat detail pesanan Anda...</span>
      </div>
    );
  }

  if (error) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Terjadi Kesalahan</h2>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
    );
  }

  if (!room) {
    return <div className="text-center py-16">Kamar tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <BookingForm roomId={roomId!} checkIn={checkIn} checkOut={checkOut} />
        </div>
        <div className="lg:col-span-1">
          <ReservationSummary room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} />
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
    return (
        <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
                <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
                    <ConfirmationPageContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}