import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';

// Data Kamar (Nanti ini fetch pake DB)
const roomsData = [
  {
    id: 'superior-101',
    name: 'Superior',
    images: ['/kamar/2679300_IMG_ICG.jpg'],
    size: 24,
    maxGuests: 2,
    beds: 1,
    description: 'Experience tranquility and rejuvenation in our superior room, designed with a contemporary touch and essential amenities for a comfortable stay.',
    originalPrice: 699539,
    discountedPrice: 489677,
    specialOffer: true,
  },
  {
    id: 'deluxe-201',
    name: 'Deluxe',
    images: ['/kamar/2679300_IMG_ICG.jpg'],
    size: 28,
    maxGuests: 2,
    beds: 1,
    description: 'Allow yourself to be captivated by the impeccable blend of modernity and tradition, and indulge in the refined comfort of our deluxe rooms.',
    originalPrice: 794539,
    discountedPrice: 556177,
    specialOffer: true,
  },
  {
    id: 'deluxe-pool-205',
    name: 'Deluxe Pool Access',
    images: ['/kamar/2679300_IMG_ICG.jpg'],
    size: 30,
    maxGuests: 2,
    beds: 1,
    description: 'Enjoy direct access to the swimming pool from your private terrace. Our Deluxe Pool Access rooms offer luxury and convenience.',
    originalPrice: 937039,
    discountedPrice: 655927,
    specialOffer: true,
  },
  {
    id: 'suite-301',
    name: 'Junior Suite',
    images: ['/kamar/2679300_IMG_ICG.jpg'],
    size: 45,
    maxGuests: 3,
    beds: 1, // King bed
    description: 'Spacious and elegantly appointed, our Junior Suites feature a separate living area, perfect for families or extended stays.',
    originalPrice: 1562709,
    discountedPrice: 1093896,
  },
];

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-background shadow-md rounded-lg p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-foreground hidden md:block">
              Select the room that suits you best
            </h2>
            <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex items-center">
                {/* <FaCalendarAlt className="mr-1" /> */} 🗓️ 31 Sat May 2025
              </span>
              <span>-</span>
              <span className="flex items-center">
                {/* <FaCalendarAlt className="mr-1" /> */} 🗓️ 1 Sun Jun 2025
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex items-center">
                {/* <FaUserFriends className="mr-1" /> */} 👤 2 Adults
              </span>
              <span className="flex items-center">
                {/* <FaBed className="mr-1" /> */} 🛌 1 Room
              </span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
              Change Search
            </button>
          </div>

          <div>
            {roomsData.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}