import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={`flex flex-col max-w-2xl ${alignment} ${className}`}
    >
      {eyebrow && <span className={dark ? 'eyebrow-dark mb-4' : 'eyebrow mb-4'}>{eyebrow}</span>}
      <h2
        className={`font-display font-extrabold tracking-tight text-3xl md:text-5xl leading-[1.1] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${dark ? 'text-white/70' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
