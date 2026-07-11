import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-gradient-accent text-white shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] hover:shadow-[0_16px_32px_-6px_rgba(37,99,235,0.6)]',
  gold: 'bg-gradient-gold text-ink shadow-gold hover:shadow-[0_18px_36px_-8px_rgba(201,166,107,0.55)]',
  ghost: 'bg-white/10 text-white border border-white/40 backdrop-blur-md hover:bg-white/20',
  outline:
    'bg-transparent border-2 border-ink text-ink hover:bg-ink hover:text-white',
  dark: 'bg-ink text-white hover:bg-ink-700',
};

/**
 * Shared CTA button. `as="a"` renders an anchor, otherwise a <button>.
 */
export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  icon,
  loading = false,
  disabled = false,
  ...props
}) {
  const Comp = motion[as] || motion.button;
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight px-8 py-3.5 text-sm md:text-base transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <Comp
      whileHover={{ y: disabled || loading ? 0 : -3 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </Comp>
  );
}
