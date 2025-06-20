'use client';

import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  roomId: string;
  checkIn: string;
  checkOut: string;
}

export default function BookingForm({ roomId, checkIn, checkOut }: BookingFormProps) {
  const [formData, setFormData] = useState({
    nik: '',
    fullName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/pelanggan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nik: formData.nik,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Gagal menyimpan data pelanggan');
      }

      // ✅ Redirect ke halaman pembayaran
      router.push(`/booking/pembayaran?nik=${formData.nik}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}`);
    } catch (error: any) {
      setSubmitMessage(`❌ Gagal: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Isi Data Diri Anda</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Hanya satu langkah lagi untuk menyelesaikan pemesanan Anda.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NIK */}
        <div>
          <label htmlFor="nik" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              id="nik" 
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              required 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="16 digit NIK"
              maxLength={16}
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="Sesuai KTP/Paspor"
            />
          </div>
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="contoh@email.com"
            />
          </div>
        </div>
        
        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nomor Telepon</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="08123456789"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Memproses...
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Konfirmasi dan Bayar
            </>
          )}
        </button>
      </form>
    </div>
  );
}