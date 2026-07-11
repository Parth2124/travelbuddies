import { motion } from 'framer-motion';

/**
 * Generic scroll-triggered reveal wrapper.
 * variant: 'up' | 'scale' | 'fade' | 'left' | 'right'
 */
const variantMap = {
  up: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
};

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  as = 'div',
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={variantMap[variant]}
      transition={{ duration, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}
