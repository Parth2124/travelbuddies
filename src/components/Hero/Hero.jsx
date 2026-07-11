import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import Button from '../common/Button.jsx';
import AnimatedCounter from '../common/AnimatedCounter.jsx';

const STATS = [
  { end: 20, suffix: '+', label: 'Countries' },
  { end: 1500, suffix: '+', label: 'Happy Travelers' },
  { end: 100, suffix: '+', label: 'Premium Hotels' },
  { end: 24, suffix: '/7', label: 'Support' },
];

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative bg-surface overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
    >
      <div className="absolute top-0 right-0 w-[55%] h-[70%] bg-gradient-to-bl from-accent/[0.07] to-transparent rounded-bl-[140px] pointer-events-none" />
      <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span className="eyebrow mb-6">
              <FiStar className="text-[10px]" /> Est. 2024 · Premium Travel Curators
            </span>
            <h1 className="font-display font-extrabold text-ink leading-[1.06] text-4xl sm:text-5xl md:text-[3.5rem] tracking-tight mb-6">
              Explore the World,
              <br className="hidden sm:block" /> Thoughtfully Planned
            </h1>
            <p className="text-muted text-lg max-w-lg mb-9 leading-relaxed">
              Personalised journeys and handpicked experiences, backed by a team that&rsquo;s
              reachable 24/7 — from your first enquiry to your last night away.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
              <Button as="a" href="/#tours" variant="primary" icon={<FiArrowRight />} className="w-full sm:w-auto">
                Explore Tours
              </Button>
              <Button as="a" href="#services" variant="outline" className="w-full sm:w-auto">
                Our Services
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-6 border-t border-ink/10 pt-8">
              {STATS.map((stat) => (
                <AnimatedCounter key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative"
          >
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,18,32,0.28)] ring-1 ring-black/5 aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80"
                alt="Traveler overlooking a mountain valley at golden hour"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 sm:-left-10 bg-white rounded-2xl shadow-[0_18px_40px_-12px_rgba(11,18,32,0.25)] border border-ink/5 px-5 py-4 flex items-center gap-3 max-w-[240px]"
            >
              <div className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center text-accent shrink-0">
                <FiStar />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-ink leading-tight">
                  4.9 / 5 Rating
                </div>
                <div className="text-xs text-muted mt-0.5">From 1500+ travelers</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="absolute -top-5 -right-4 sm:-right-6 bg-gradient-gold text-ink rounded-2xl shadow-gold px-4 py-3 text-center ticket-notch"
            >
              <div className="font-display font-extrabold text-lg leading-none">15+</div>
              <div className="text-[10px] uppercase tracking-widest text-ink/70 mt-1">
                Years Trusted
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
