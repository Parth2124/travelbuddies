import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import SectionHeading from '../common/SectionHeading.jsx';
import Button from '../common/Button.jsx';
import TourCard from './TourCard.jsx';
import TourFilters from './TourFilters.jsx';
import { getTours } from '../../services/toursService.js';

export default function TourSection() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    getTours().then((data) => {
      if (mounted) {
        setTours(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(
    () => (filter === 'all' ? tours : tours.filter((t) => t.tour_type === filter)),
    [tours, filter]
  );

  return (
    <section id="tours" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Featured Tours"
          title="Handpicked Journeys"
          subtitle="Carefully curated experiences that create lifelong memories"
          className="mb-14"
        />

        <TourFilters active={filter} onChange={setFilter} />

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-[22px] bg-ink/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop / tablet grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((tour, i) => (
                <TourCard key={tour.id ?? i} tour={tour} index={i} />
              ))}
            </div>

            {/* Mobile swiper */}
            <div className="block md:hidden">
              <Swiper
                modules={[EffectCoverflow, Autoplay, Pagination]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                coverflowEffect={{ rotate: 20, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
                loop={filtered.length > 3}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                speed={650}
                className="!pb-10"
              >
                {filtered.map((tour, i) => (
                  <SwiperSlide key={tour.id ?? i} className="!w-64">
                    <TourCard tour={tour} index={i} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}

        {tours.length > 12 && (
          <div className="flex justify-center mt-16">
            <Button as="a" href="/tours/" variant="outline">
              View All Tours
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
