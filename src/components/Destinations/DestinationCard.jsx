import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiArrowRight, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function DestinationCard({ destination, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const {
    title,
    image_url: image,
    rating = 4.8,
    starting_price: price = '50,000',
    duration = '6 Days',
    slug,
  } = destination;

  return (
    <Link to={`/destination/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: index * 0.08 }}
        className="relative rounded-xl2 overflow-hidden card-elevated group cursor-pointer"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked((v) => !v);
            }}
            aria-label="Save destination to wishlist"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform hover:scale-110"
          >
            <FiHeart className={liked ? 'fill-red-500 text-red-500' : ''} />
          </button>

          <div className="absolute bottom-0 left-0 w-full p-5 text-white">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-bold text-lg">{title}</h3>
              <span className="text-xs bg-white/15 px-2 py-1 rounded-full flex items-center gap-1">
                <FiStar className="text-gold-light text-[10px]" /> {rating}
              </span>
            </div>
            <p className="text-xs text-white/70 mb-3">
              From ₹{price} · {duration}
            </p>
            <span className="text-xs font-semibold inline-flex items-center gap-1 text-white/90 hover:text-white">
              Explore <FiArrowRight className="text-[10px]" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
