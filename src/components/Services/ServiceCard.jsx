import { motion } from 'framer-motion';

export default function ServiceCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-xl2 p-[1px] bg-gradient-to-br from-accent/25 via-ink/5 to-accent/25"
    >
      <div className="rounded-[calc(1.75rem-1px)] bg-surface-card h-full p-8">
        <div className="w-16 h-16 rounded-[20px] flex items-center justify-center bg-gradient-accent text-white text-2xl shadow-[0_10px_24px_-6px_rgba(37,99,235,0.45)] mb-6 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
          <Icon />
        </div>
        <h3 className="font-display font-bold text-xl text-ink mb-2">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
