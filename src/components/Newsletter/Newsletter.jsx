import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button.jsx';
import { subscribeNewsletter } from '../../services/formsService.js';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await subscribeNewsletter(email);
    setLoading(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#172554] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative"
      >
        <h2 className="font-display font-extrabold text-2xl md:text-4xl text-white mb-3">
          Get insider fares and trip ideas
        </h2>
        <p className="text-white/75 mb-8 max-w-lg mx-auto">
          Join our newsletter for curated destination guides and early access to seasonal deals.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3.5 rounded-full text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-white/70"
          />
          <Button type="submit" variant="ghost" loading={loading} className="whitespace-nowrap">
            Subscribe
          </Button>
        </form>
        <AnimatePresence>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-white/90 text-sm mt-4"
            >
              Thanks for subscribing! We&rsquo;ll be in touch with your first guide soon.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
