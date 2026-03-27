"use client";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-tighter text-white">
          NEXORA<span className="text-neon">.</span>
        </div>
        <a href="#contacto" className="text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full transition-all">
          Agendar llamada
        </a>
      </div>
    </nav>
  );
}
