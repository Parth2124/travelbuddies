import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMenu,
  FiMapPin,
  FiChevronDown,
  FiCreditCard,
  FiHome,
  FiSend,
  FiShield,
} from 'react-icons/fi';
import { BsPassport } from 'react-icons/bs';
import useScrollPosition from '../../hooks/useScrollPosition.js';
import MobileMenu from './MobileMenu.jsx';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/#tours' },
  { label: 'Contact Us', href: '/#generate-trip' },
];

const SERVICES = [
  { label: 'Visa', icon: BsPassport },
  { label: 'Passport', icon: FiCreditCard },
  { label: 'Hotels', icon: FiHome },
  { label: 'Flights', icon: FiSend },
  { label: 'Insurance', icon: FiShield },
];

export default function Navbar() {
  const scrolled = useScrollPosition(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Smooth scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        const navbarHeight = 100; // Adjust if needed
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
          <div
            className={`flex items-center justify-between px-4 md:px-6 py-2.5 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_-8px_rgba(11,18,32,0.18)] border border-ink/[0.06]'
                : 'bg-transparent border border-transparent'
            }`}
          >
            <Link to="/" className="flex items-center gap-2.5 select-none">
              <img
                src="/logo-travelbuddies.jpg"
                alt="Travel Buddies logo"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-white/50"
              />
              <span
                className={`font-display font-extrabold text-lg tracking-tight transition-colors ${
                  scrolled ? 'text-ink' : 'text-black'
                }`}
              >
                Travel Buddies
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative font-medium text-sm transition-colors group ${
                    scrolled ? 'text-ink-700' : 'text-white/90'
                  }`}
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1.5 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              {/* Services Dropdown */}
              <div className="relative group">
                <span
                  className={`flex items-center gap-1 font-medium text-sm cursor-pointer transition-colors ${
                    scrolled ? 'text-ink-700' : 'text-white/90'
                  }`}
                >
                  Services <FiChevronDown className="text-xs mt-0.5" />
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 card-elevated p-2 z-20 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                  {SERVICES.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={`#${s.label.toLowerCase()}`}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-700 hover:bg-surface hover:text-accent transition"
                      >
                        <Icon className="w-4" /> {s.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <Link
                to="/about"
                className={`font-medium text-sm transition-colors ${
                  scrolled ? 'text-ink-700' : 'text-white/90'
                }`}
              >
                About
              </Link>
              <a
                href="/#testimonials"
                className={`font-medium text-sm transition-colors ${
                  scrolled ? 'text-ink-700' : 'text-white/90'
                }`}
              >
                Reviews
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://maps.app.goo.gl/Qw1Qx8jSg4hPTE2k7"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex relative items-center justify-center w-11 h-11 rounded-full"
              >
                <span className="absolute inset-0 rounded-full border border-accent/60 animate-ping" />
                <span
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                    scrolled ? 'bg-ink text-white' : 'bg-black/80 text-white border border-white/30'
                  }`}
                >
                  <FiMapPin className="text-sm" />
                </span>
              </a>

              <button
                onClick={() => setMenuOpen(true)}
                className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  scrolled ? 'bg-ink text-white' : 'bg-black/80 text-white border border-white/30'
                }`}
              >
                <FiMenu />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navLinks={NAV_LINKS} />
    </>
  );
}