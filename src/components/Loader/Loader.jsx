import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-ink flex flex-col items-center justify-center gap-6"
        >
        

          {/* Text Branding */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display font-extrabold text-2xl text-white tracking-tight"
          >
            Travel Buddies
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}