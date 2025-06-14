"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const paymentMethods = [
  { value: 'Credit Card', label: '💳 Credit Card' },
  { value: 'Bank Transfer', label: '🏦 Bank Transfer' },
  { value: 'Virtual Account', label: '🔢 Virtual Account' },
];

export default function PaymentForm({ hargaPerMalam }: { hargaPerMalam: number }) {
  const params = useSearchParams();
  const router = useRouter();

  const nik = params.get('nik')!;
  const roomId = params.get('roomId')!;
  const checkIn = params.get('checkIn')!;
  const checkOut = params.get('checkOut')!;

  const [metode, setMetode] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jumlahMalam = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    )
  );
  const total = hargaPerMalam * jumlahMalam;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/pembayaran', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik, roomId, checkIn, checkOut, metode, total }),
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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-lg space-y-8 border border-gray-200 dark:border-gray-800"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold flex items-center gap-2">💰 Pembayaran</h2>
        <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />
        <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
          <p><strong>NIK:</strong> {nik}</p>
          <p><strong>Check-in:</strong> {checkIn}</p>
          <p><strong>Check-out:</strong> {checkOut}</p>
          <p><strong>Lama menginap:</strong> {jumlahMalam} malam</p>
          <p><strong>Harga / malam:</strong> Rp {hargaPerMalam.toLocaleString('id-ID')}</p>
        </div>
        <div className="mt-4 text-xl font-bold text-purple-600 dark:text-purple-400">
          Total Pembayaran: Rp {total.toLocaleString('id-ID')}
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium mb-3">Pilih Metode Pembayaran</label>
        <div className="grid gap-3">
          {paymentMethods.map((method) => (
            <label
              key={method.value}
              className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl border font-medium text-base ${
                metode === method.value
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-purple-300'
              } transition`}
            >
              <input
                type="radio"
                name="metode"
                value={method.value}
                checked={metode === method.value}
                onChange={() => setMetode(method.value)}
                className="hidden"
              />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
      >
        {isSubmitting ? 'Memproses Pembayaran...' : '💸 Bayar Sekarang'}
      </button>
    </form>
  );
}
