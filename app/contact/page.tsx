"use client";

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow bg-gray-50">

        <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Kami</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Kami siap membantu Anda dengan segala pertanyaan atau kebutuhan reservasi. Silakan hubungi kami!
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Phone size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Telepon</h3>
                    <p className="text-blue-600 font-medium">+62 21 1234 5678</p>
                    <p className="text-gray-500 text-sm">Tersedia 24 jam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Mail size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-green-600 font-medium">info@grandinna.com</p>
                    <p className="text-gray-500 text-sm">Respon dalam 2 jam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <MapPin size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Alamat</h3>
                    <p className="text-gray-700">Jl. Sudirman No.123</p>
                    <p className="text-gray-700">Surabaya, Indonesia</p>
                  </div>
                </div>

              </div>

              <div className="mt-8 p-6 bg-orange-50 rounded-xl border-l-4 border-orange-400">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Jam Operasional</h3>
                </div>
                <p className="text-gray-700 font-medium">24 Jam • 7 Hari Seminggu</p>
              </div>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Masukkan email Anda"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Tulis pesan Anda di sini"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                  </div>
                </button>
                {submitStatus && (
                  <p className={`text-center ${submitStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}