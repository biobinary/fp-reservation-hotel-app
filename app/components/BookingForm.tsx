'use client';

import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, CreditCard } from 'lucide-react';

interface BookingFormProps {
  roomId: string;
  checkIn: string;
  checkOut: string;
}

export default function BookingForm({ roomId, checkIn, checkOut }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    console.log('Data yang dikirim:', {
      ...formData,
      roomId,
      checkIn,
      checkOut
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitMessage('Reservasi Anda berhasil! Silakan cek email Anda untuk konfirmasi.');
    
  };

  if (submitMessage) {
    return (
      <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">Terima Kasih!</h3>
        <p>{submitMessage}</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Isi Data Diri Anda</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Hanya satu langkah lagi untuk menyelesaikan pemesanan Anda.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        {/* Special Requests */}
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permintaan Khusus (Opsional)</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
            <textarea 
              id="specialRequests" 
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={3}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="Contoh: kamar bebas asap rokok, check-in lebih awal"
            ></textarea>
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