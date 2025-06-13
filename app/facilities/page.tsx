"use client";

import { useState } from 'react';
import { 
  Wifi, 
  Car, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Heart, 
  Users, 
  Coffee, 
  Shield, 
  Wind, 
  Tv, 
  Phone,
  MapPin,
  Mail,
  Menu,
  X,
  Search,
  User,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const facilities = [
  {
    category: "Rekreasi & Olahraga",
    items: [
      {
        icon: <Waves className="w-8 h-8" />,
        title: "Kolam Renang Infinity",
        description: "Kolam renang infinity dengan pemandangan kota yang menakjubkan, dilengkapi dengan area anak-anak dan jacuzzi.",
        image: "/fasilitas/swimming-pool.jpg",
        hours: "06:00 - 22:00",
        features: ["Kolam Dewasa", "Kolam Anak", "Jacuzzi", "Pool Bar"]
      },
      {
        icon: <Dumbbell className="w-8 h-8" />,
        title: "Fitness Center",
        description: "Pusat kebugaran modern dengan peralatan terlengkap dan instruktur profesional tersedia 24 jam.",
        image: "/fasilitas/gym.jpg",
        hours: "24 Jam",
        features: ["Peralatan Modern", "Personal Trainer", "Kelas Yoga", "Sauna"]
      },
      {
        icon: <Heart className="w-8 h-8" />,
        title: "Grand Spa",
        description: "Spa mewah dengan treatment tradisional dan modern untuk relaksasi maksimal.",
        image: "/fasilitas/spa.jpg",
        hours: "09:00 - 21:00",
        features: ["Massage", "Facial", "Body Treatment", "Aromaterapi"]
      }
    ]
  },
  {
    category: "Kuliner",
    items: [
      {
        icon: <Utensils className="w-8 h-8" />,
        title: "Grand Restaurant",
        description: "Restoran utama dengan menu internasional dan lokal, suasana elegan dengan live cooking station.",
        image: "/fasilitas/restaurant.jpg",
        hours: "06:00 - 23:00",
        features: ["Buffet Breakfast", "A la Carte", "Live Cooking", "Private Dining"]
      },
      {
        icon: <Coffee className="w-8 h-8" />,
        title: "Sky Lounge",
        description: "Rooftop lounge dengan pemandangan panorama kota, cocktail premium dan live music.",
        image: "/fasilitas/sky-lounge.jpg",
        hours: "17:00 - 02:00",
        features: ["Rooftop View", "Premium Cocktails", "Live Music", "VIP Area"]
      }
    ]
  },
  {
    category: "Bisnis & Event",
    items: [
      {
        icon: <Users className="w-8 h-8" />,
        title: "Grand Ballroom",
        description: "Ballroom mewah untuk acara besar dengan kapasitas hingga 500 orang, dilengkapi teknologi audiovisual terkini.",
        image: "/fasilitas/ballroom.jpg",
        hours: "24 Jam (Reservasi)",
        features: ["Kapasitas 500", "Audio Visual", "Lighting System", "Catering Service"]
      },
      {
        icon: <Tv className="w-8 h-8" />,
        title: "Meeting Rooms",
        description: "7 ruang meeting dengan berbagai ukuran, dilengkapi teknologi presentasi modern.",
        image: "/fasilitas/sky-lounge.jpg",
        hours: "07:00 - 22:00",
        features: ["7 Ruang Meeting", "Projector & Screen", "Video Conference", "Business Center"]
      }
    ]
  }
];

const amenities = [
  { icon: <Wifi className="w-6 h-6" />, title: "WiFi Gratis", description: "High-speed internet di seluruh area hotel" },
  { icon: <Car className="w-6 h-6" />, title: "Valet Parking", description: "Layanan parkir dengan valet 24 jam" },
  { icon: <Shield className="w-6 h-6" />, title: "Keamanan 24 Jam", description: "Security dan CCTV di seluruh area" },
  { icon: <Wind className="w-6 h-6" />, title: "AC Central", description: "Sistem pendingin udara di semua ruangan" },
  { icon: <Phone className="w-6 h-6" />, title: "Concierge", description: "Layanan concierge 24/7 untuk kebutuhan Anda" },
  { icon: <Clock className="w-6 h-6" />, title: "Room Service", description: "Layanan kamar 24 jam" }
];

export default function FacilitiesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", ...facilities.map(f => f.category)];

  const filteredFacilities = selectedCategory === "Semua" 
    ? facilities 
    : facilities.filter(f => f.category === selectedCategory);

  const navLinks = [
    { href: '/rooms', label: 'Kamar' },
    { href: '/facilities', label: 'Fasilitas' },
    { href: '/dining', label: 'Restoran' },
    { href: '/events', label: 'Event' },
    { href: '/contact', label: 'Kontak' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+62 21 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>info@grandinna.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Surabaya, Indonesia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Grand Inna
                </h1>
                <p className="text-xs text-gray-500">Luxury & Comfort</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`relative font-medium transition-colors duration-300 group ${
                    link.label === 'Fasilitas' 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                    link.label === 'Fasilitas' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all">
                <Search size={20} />
              </button>
              <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all">
                <User size={20} />
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Book Now
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Fasilitas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Premium</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Nikmati berbagai fasilitas world-class yang dirancang untuk kenyamanan dan kemewahan Anda
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg">4.9/5 Rating Fasilitas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredFacilities.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {category.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((facility, index) => (
                  <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full p-3">
                        <div className="text-white">{facility.icon}</div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 text-sm bg-black/30 backdrop-blur-md rounded-full px-3 py-1">
                          <Clock size={16} />
                          <span>{facility.hours}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{facility.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{facility.description}</p>
                      <div className="space-y-2">
                        {facility.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                        Pelajari Lebih Lanjut
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amenitas Hotel
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fasilitas pelengkap untuk pengalaman menginap yang tak terlupakan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
                    <div className="text-blue-600">{amenity.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{amenity.title}</h3>
                    <p className="text-gray-600">{amenity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Merasakan Kemewahan?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Pesan sekarang dan nikmati semua fasilitas premium kami dengan harga terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                href="/booking" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105">
              Pesan Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 mr-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <span className="text-white font-bold text-2xl">H</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Grand Inna
                </h3>
                <p className="text-sm text-gray-400">Luxury & Comfort</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Pengalaman menginap yang tak terlupakan dengan fasilitas world-class dan pelayanan terbaik di jantung kota Surabaya.
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <span>© 2024 Grand Inna Hotel</span>
              <span>•</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}