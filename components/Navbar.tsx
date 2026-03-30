"use client";

// ─── IMPORTANTE: Image debe estar importado para que el logo funcione ───────
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Servicios",       href: "#servicios"     },
  { label: "Cómo funciona",   href: "#como-funciona" },
  { label: "Resultados",      href: "#resultados"    },
  { label: "Contacto",        href: "#contacto"      },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── LOGO — imagen en lugar de texto ─────────────────────────────── */}
        <a href="/" aria-label="Nexora — inicio" className="flex items-center">
          <div className="relative h-10 w-[150px]">
            <Image
              src="/logo-nexora.png"
              alt="Nexora Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </a>
        {/* ─────────────────────────────────────────────────────────────────── */}

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-neon text-black text-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(239,255,0,0.3)] transition-all"
        >
          Agendar demo
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/5 px-6 py-6 flex flex-col gap-5"
          >
            {/* Logo en mobile menu también */}
            <div className="relative h-8 w-[120px] mb-2">
              <Image
                src="/logo-nexora.png"
                alt="Nexora Logo"
                fill
                className="object-contain object-left"
              />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-5 py-3 bg-neon text-black text-sm font-bold rounded-lg text-center"
            >
              Agendar demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
