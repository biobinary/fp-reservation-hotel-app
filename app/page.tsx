import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}