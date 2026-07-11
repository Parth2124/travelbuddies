import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function TourCard({ tour, index = 0 }) {
  const { title, image_url: image, slug, short_description } = tour;

  return (
    <Link to={`/tour/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="tour-card group relative block rounded-[22px] overflow-hidden aspect-[3/4] shadow-[0_1px_2px_rgba(11,18,32,0.06),0_18px_40px_-16px_rgba(11,18,32,0.35)] ring-1 ring-black/5 cursor-pointer"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/35" />

        {/* Title - Always visible on mobile, visible on hover on desktop */}
        <div className="absolute inset-x-0 bottom-[4.75rem] px-5 opacity-100 md:opacity-0 md:translate-y-2 transition-all duration-500 ease-out md:group-hover:opacity-100 md:group-hover:translate-y-0">
          <h3 className="font-display font-bold text-lg md:text-xl text-white leading-tight tracking-tight">
            {title}
          </h3>
          {/* Short description - Only visible on desktop */}
          {short_description && (
            <p className="text-white/80 text-sm mt-1 hidden md:block line-clamp-2">
              {short_description}
            </p>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-[13px] font-semibold font-display tracking-[0.08em] uppercase bg-white/12 backdrop-blur-md border border-white/25 transition-all duration-300 group-hover:bg-white/22 group-hover:border-white/40">
            Explore
            <FiArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
