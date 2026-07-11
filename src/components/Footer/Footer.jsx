import {
  FiUser,
  FiPhone,
  FiMail,
  FiHeadphones,
  FiClock,
  FiMapPin,
  FiHome,
  FiBriefcase,
  FiCompass,
  FiZap,
  FiMessageCircle,
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const CONTACT_LINES = [
  { icon: FiUser, label: 'Founder:', value: 'Dishant Khanduja' },
  { icon: FiPhone, label: null, value: '+91 98103 91119', href: 'tel:+919810391119' },
  { icon: FiMail, label: null, value: 'Dishant@travelbuddiesco.in', href: 'mailto:Dishant@travelbuddiesco.in' },
  { icon: FiHeadphones, label: 'Support:', value: 'Tours@travelbuddiesco.in', href: 'mailto:Tours@travelbuddiesco.in' },
  { icon: FiMail, label: 'Domestic:', value: 'tours@travelbuddiesco.in', href: 'mailto:tours@travelbuddiesco.in' },
  { icon: FiMail, label: 'International:', value: 'operations@travelbuddiesco.in', href: 'mailto:operations@travelbuddiesco.in' },
  { icon: FiPhone, label: 'Director:', value: '+91 98103 91119', href: 'tel:+919810391119' },
  { icon: FiPhone, label: 'Sales Executive:', value: '+91 83683 50723', href: 'tel:+918368350723' },
  { icon: FiPhone, label: 'Operations Executive:', value: '+91 92209 41119', href: 'tel:+919220941119' },
  { icon: FiClock, label: null, value: 'Mon–Sat: 9:00am – 7:00pm' },
  { icon: FiMapPin, label: null, value: 'RDC, Rajnagar, Ghaziabad, Uttar Pradesh, India' },
];

const QUICK_LINKS = [
  { icon: FiHome, label: 'Home', href: '/' },
  { icon: FiBriefcase, label: 'Services', href: '/#services' },
  { icon: FiCompass, label: 'Tours', href: '/#tours' },
  { icon: FiZap, label: 'Generate Your Trip', href: '/#generate-trip' },
  { icon: FiMessageCircle, label: 'Reviews', href: '/#reviews' },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-white text-ink border-t border-ink/10">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <div className="font-display font-extrabold text-2xl text-ink">Travel Buddies</div>
          <p className="text-sm text-muted">
            &ldquo;Your journey, our passion. Creating memories, one trip at a time.&rdquo;
          </p>
          {CONTACT_LINES.map((line, i) => {
            const Icon = line.icon;
            const content = (
              <>
                <Icon className="w-4 text-accent shrink-0" />
                {line.label && <span>{line.label}</span>}
                <span className={line.label ? 'font-semibold text-ink' : ''}>{line.value}</span>
              </>
            );
            return line.href ? (
              <a
                key={i}
                href={line.href}
                className="flex items-center gap-2 text-ink-700 text-sm hover:text-accent hover:underline transition"
              >
                {content}
              </a>
            ) : (
              <div key={i} className="flex items-center gap-2 text-ink-700 text-sm">
                {content}
              </div>
            );
          })}
          <div className="flex gap-3 mt-2">
            <a
              href="https://wa.me/919810391119?text=Hi%20Dishant%2C%20I%20am%20interested%20in%20Travel%20Buddies!"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-10 h-10 rounded-full bg-surface border border-ink/10 flex items-center justify-center text-ink-700 hover:bg-accent hover:text-white hover:border-accent transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/travelbuddiesco.in"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Instagram profile"
              className="w-10 h-10 rounded-full bg-surface border border-ink/10 flex items-center justify-center text-ink-700 hover:bg-accent hover:text-white hover:border-accent transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-lg font-display font-bold flex items-center gap-2 text-ink">
            <FiMapPin className="text-accent" /> Our Office
          </div>
          <p className="text-muted text-sm leading-relaxed">
            RDC, Rajnagar
            <br />
            Ghaziabad, Uttar Pradesh 201002
            <br />
            India
          </p>
          <div className="w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden border border-ink/10">
            <iframe
              title="Travel Buddies office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.350463490741!2d77.439769!3d28.6746902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf132fab8928d%3A0xedd85cb5fadf5279!2sTravel%20buddies!5e0!3m2!1sen!2sin!4v1732647712345!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-lg font-display font-bold text-ink">Quick Links</div>
          <div className="flex flex-col gap-3 text-ink-700 text-sm">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-accent transition flex items-center gap-2"
                >
                  <Icon className="w-4" /> {link.label}
                </a>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-ink/40">© 2024 Travel Buddies. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
