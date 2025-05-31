import { Wifi, Utensils, Dumbbell, Car, Waves, Shield, Clock, Star } from 'lucide-react';

const FeatureCard = ({ title, description, icon, highlight = false }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  highlight?: boolean;

}) => (
  <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
    highlight 
      ? 'bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-2xl shadow-blue-500/25' 
      : 'bg-white dark:bg-gray-800 hover:shadow-2xl shadow-lg'
  }`}>
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 group-hover:to-black/10 transition-all duration-500"></div>
    <div className="relative p-8 text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-500 group-hover:scale-110 ${
        highlight 
          ? 'bg-white/20 text-white' 
          : 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 group-hover:from-blue-200 group-hover:to-purple-200'
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-4 ${
        highlight ? 'text-white' : 'text-gray-800 dark:text-white'
      }`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${
        highlight ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
      }`}>
        {description}
      </p>
    </div>
    <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 ${
      highlight 
        ? 'bg-white/30' 
        : 'bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100'
    }`}></div>
  </div>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
    <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
  </div>
);

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star size={16} />
            Fasilitas Premium
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Mengapa Memilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Kami?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nikmati pengalaman menginap tak terlupakan dengan fasilitas kelas dunia dan pelayanan terbaik
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <StatCard number="500+" label="Kamar Tersedia" />
          <StatCard number="24/7" label="Layanan Customer" />
          <StatCard number="4.9★" label="Rating Tamu" />
          <StatCard number="10+" label="Tahun Pengalaman" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Wifi size={32} />}
            title="Wi-Fi Super Cepat"
            description="Internet berkecepatan tinggi hingga 1 Gbps di seluruh area hotel, perfect untuk work & entertainment."
          />

          <FeatureCard
            icon={<Utensils size={32} />}
            title="Restoran Bintang 5"
            description="Nikmati kuliner terbaik dari chef internasional dengan menu fusion Asia-Eropa yang menggugah selera."
            highlight={true}
          />

          <FeatureCard
            icon={<Waves size={32} />}
            title="Infinity Pool & Spa"
            description="Kolam renang infinity dengan pemandangan kota dan spa mewah untuk relaksasi maksimal."
          />

          <FeatureCard
            icon={<Dumbbell size={32} />}
            title="Fitness Center 24/7"
            description="Gym modern dengan peralatan terkini dari Technogym, sauna, dan personal trainer tersedia."
          />

          <FeatureCard
            icon={<Car size={32} />}
            title="Valet Parking Gratis"
            description="Parkir valet gratis dengan keamanan 24 jam dan layanan car wash untuk kenyamanan Anda."
          />

          <FeatureCard
            icon={<Shield size={32} />}
            title="Keamanan Premium"
            description="Sistem keamanan berlapis dengan CCTV HD, keycard access, dan security 24/7 di setiap lantai."
          />
        </div>

      </div>
    </section>
  );
}