import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiX,
  FiHome,
  FiCompass,
  FiGlobe,
  FiBriefcase,
  FiFileText,
  FiStar,
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import useScrollLock from '../../hooks/useScrollLock.js';
import Button from '../common/Button.jsx';

const ICONS = {
  Home: FiHome,
  Tours: FiCompass,
  Destinations: FiGlobe,
};

const EXTRA_LINKS = [
  { label: 'Services', href: '#services', icon: FiBriefcase },
  { label: 'About', to: '/about', icon: FiFileText },
  { label: 'Reviews', href: '/#testimonials', icon: FiStar },
];

export default function MobileMenu({ open, onClose, navLinks }) {
  useScrollLock(open);

  const allLinks = [
    ...navLinks.map((l) => ({ ...l, icon: ICONS[l.label] || FiHome })),
    ...EXTRA_LINKS,
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/75 backdrop-blur-sm z-50"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-sm z-50 flex flex-col bg-gradient-ink"
          >
            <div className="flex items-center justify-between px-7 pt-8 pb-6">
              <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
                <img
                  src="/logo-travelbuddies.jpg"
                  alt="Travel Buddies"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20"
                />
                <span className="font-display font-extrabold text-lg text-white tracking-tight">
                  Travel Buddies
                </span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition"
              >
                <FiX />
              </button>
            </div>

            <div className="h-px mx-7 bg-white/10" />

            <nav className="flex-1 px-4 pt-6 overflow-y-auto">
              {allLinks.map((link, i) => {
                const Icon = link.icon;
                const Component = link.to ? Link : 'a';
                const props = link.to ? { to: link.to } : { href: link.href };
                return (
                  <Component
                    key={link.label}
                    {...props}
                    onClick={onClose}
                    className="group flex items-center gap-4 px-3 py-3.5 rounded-2xl transition hover:bg-white/[0.07]"
                  >
                    <span className="font-display text-[11px] font-bold text-white/30 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-accent group-hover:border-accent/40 transition">
                      <Icon className="text-sm" />
                    </span>
                    <span className="font-display font-semibold text-white/90 group-hover:text-white text-[15px] transition">
                      {link.label}
                    </span>
                  </Component>
                );
              })}
            </nav>

            <div className="px-7 pb-8 pt-4">
              <Button
                as="a"
                href="https://maps.app.goo.gl/Qw1Qx8jSg4hPTE2k7"
                target="_blank"
                variant="primary"
                className="w-full mb-5"
              >
                Get Directions <FiGlobe />
              </Button>
              <div className="flex items-center justify-between">
                <a
                  href="tel:+919810391119"
                  className="text-white/60 text-xs font-medium hover:text-white transition"
                >
                  +91 98103 91119
                </a>
                <div className="flex gap-2.5">
                  <a
                    href="https://wa.me/919810391119"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/40 transition"
                  >
                    <FaWhatsapp className="text-xs" />
                  </a>
                  <a
                    href="https://www.instagram.com/travelbuddiesco.in"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/40 transition"
                  >
                    <FaInstagram className="text-xs" />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
