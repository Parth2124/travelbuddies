import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass rounded-3xl p-8 hover:bg-white/[0.1] transition-colors duration-500"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-gold-light text-xl">
        <Icon />
      </div>
      <h3 className="font-display font-bold text-lg mb-2 text-white">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
