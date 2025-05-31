import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, ArrowRight, Star, Award } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="py-16 border-b border-gray-800">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">H</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Hotel MBD
                  </h3>
                  <p className="text-sm text-gray-400">Luxury & Comfort</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Pengalaman menginap tak terlupakan dengan fasilitas bintang 5 dan pelayanan kelas dunia di jantung kota Jakarta.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1">
                  <Award size={16} className="text-yellow-400" />
                  <span className="text-xs text-yellow-400">Best Hotel 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">4.9/5</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h4>
              <ul className="space-y-3">
                {['Tentang Kami', 'Kamar & Suite', 'Fasilitas', 'Restoran', 'Spa & Wellness', 'Event & Meeting', 'Galeri', 'Blog'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-purple-400">Layanan</h4>
              <ul className="space-y-3">
                {['Room Service 24/7', 'Airport Transfer', 'Laundry Service', 'Concierge', 'Valet Parking', 'Business Center', 'Fitness Center', 'Swimming Pool'].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-green-400">Hubungi Kami</h4>
              <div className="space-y-4">

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mt-1">
                    <Phone size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Telepon</p>
                    <p className="text-gray-300 text-sm">+62 21 1234 5678<br />+62 812 3456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mt-1">
                    <Mail size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300 text-sm">info@hotelmbd.com<br />booking@hotelmbd.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mt-1">
                    <Clock size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Jam Operasional</p>
                    <p className="text-gray-300 text-sm">24/7 Reception<br />Check-in: 14:00<br />Check-out: 12:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Dapatkan Penawaran Spesial!</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe newsletter kami dan dapatkan diskon eksklusif, update promo terbaru, dan tips traveling menarik langsung di inbox Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Hotel MBD. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Designed with ❤️ in Indonesia
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
    </footer>
  );
}