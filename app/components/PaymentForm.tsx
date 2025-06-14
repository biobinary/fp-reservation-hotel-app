'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaymentForm() {
  const params = useSearchParams();
  const router = useRouter();

  const nik = params.get('nik')!;
  const roomId = params.get('roomId')!;
  const checkIn = params.get('checkIn')!;
  const checkOut = params.get('checkOut')!;

  const [hargaPerMalam, setHargaPerMalam] = useState(0);
  const [metode, setMetode] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jumlahMalam = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
  const total = hargaPerMalam * jumlahMalam;

  useEffect(() => {
    const fetchHarga = async () => {
      try {
        const res = await fetch(`/api/harga-kamar?roomId=${roomId}`);
        const data = await res.json();
        setHargaPerMalam(data.harga || 0);
      } catch (err) {
        console.error('Gagal mengambil harga kamar:', err);
      }
    };
    fetchHarga();
  }, [roomId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/pembayaran', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nik,
          roomId,
          checkIn,
          checkOut,
          metode,
          total
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Pembayaran berhasil!');
        router.push('/sukses');
      } else {
        alert('Pembayaran gagal!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pembayaran</h2>
        <p>NIK: {nik}</p>
        <p>Check-in: {checkIn}</p>
        <p>Check-out: {checkOut}</p>
        <p>Lama menginap: {jumlahMalam} malam</p>
        <p>Harga/malam: Rp {hargaPerMalam.toLocaleString('id-ID')}</p>
        <p className="font-semibold text-lg">
          Total: Rp {total.toLocaleString('id-ID')}
        </p>
      </div>

      <div>
        <label className="block font-medium mb-1">Metode Pembayaran</label>
        <select
          value={metode}
          onChange={(e) => setMetode(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option>Credit Card</option>
          <option>Bank Transfer</option>
          <option>Virtual Account</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? 'Memproses Pembayaran...' : 'Bayar Sekarang'}
      </button>
    </form>
  );
}
