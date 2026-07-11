import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaWhatsapp, FaDownload, FaMapMarkerAlt, FaCalendarAlt, 
  FaClock 
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getTourBySlug, getTours } from '../services/toursService.js';
import Button from '../components/common/Button.jsx';
import TourCard from '../components/Tours/TourCard.jsx';

export default function TourDetail() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState({ 0: true });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tourData = await getTourBySlug(slug);
        setTour(tourData);
        
        if (tourData) {
          const related = await getTours({ tour_type: tourData.tour_type });
          setRelatedTours(related.filter(t => t.slug !== slug).slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  const toggleDay = (index) => {
    setExpandedDays(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Capitalize first letter function
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleWhatsAppInquiry = () => {
    if (!tour) return;
    
    const phoneNumber = '919810391119';
    const message = encodeURIComponent(
      `Hi Travel Buddies! 👋\n\nI'm interested in the "${tour.title}" tour.\n\nLink: ${window.location.href}\n\nPlease share more details about this tour.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleDownloadItinerary = () => {
    if (!tour || !tour.itinerary) return;
    
    const itineraryText = tour.itinerary.map((day, index) => 
      `Day ${day.day}: ${day.title}\n${day.description}\n`
    ).join('\n');
    
    const fullText = `${tour.title} - Itinerary\n\n${tour.description}\n\nDuration: ${tour.duration}\n\nITINERARY:\n${itineraryText}`;
    
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tour.slug}-itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2563EB]"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Tour not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{tour.title} — Travel Buddies</title>
        <meta name="description" content={tour.description} />
      </Helmet>

      {/* PREMIUM HERO */}
      <section className="relative h-screen min-h-[700px] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${tour.image_url})` }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/60 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm font-medium inline-flex items-center gap-2"
                >
                  {capitalize(tour.tour_type)}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <FaClock className="text-[#2563EB]" /> {tour.duration}
                </motion.div>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                {tour.title}
              </h1>
              
              <p className="text-xl text-white/80 max-w-2xl">{tour.description}</p>

              {/* Mobile Only Compact Info Box */}
              <div className="md:hidden mt-8 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-2xl text-[#0F172A]">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <div className="text-xs text-slate-500">Starting from</div>
                    <div className="text-3xl font-semibold">₹{tour.price || "65,000"}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 text-lg">
                      ★★★★☆ <span className="text-sm text-slate-500 ml-1">(4.9)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#2563EB]" />
                    <div>
                      <div className="text-slate-500 text-xs">Location</div>
                      <div className="font-medium">{tour.location || "India"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-[#2563EB]" />
                    <div>
                      <div className="text-slate-500 text-xs">Duration</div>
                      <div className="font-medium">{tour.duration}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Glass Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-96 w-full max-w-sm bg-white/95 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 lg:p-8 shadow-2xl text-[#0F172A] hidden md:block"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-sm text-slate-500">Starting from</div>
                  <div className="text-4xl font-semibold">₹{tour.price || "65,000"}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500">
                    ★★★★☆ <span className="text-sm text-slate-500 ml-1">(4.9)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium">{tour.location || "India"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <Button 
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-[#0F172A] hover:bg-black py-4 text-lg rounded-2xl"
                >
                  <FaWhatsapp className="mr-2" /> Inquire on WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadItinerary}
                  className="w-full py-4 text-lg rounded-2xl border-slate-300"
                >
                  <FaDownload className="mr-2" /> Download Itinerary
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Sticky Mobile CTAs */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-3 w-full max-w-sm px-4">
          <Button 
            onClick={handleWhatsAppInquiry}
            className="flex-1 bg-[#0F172A] py-4 shadow-2xl rounded-2xl"
          >
            <FaWhatsapp /> Inquire
          </Button>
          <Button 
            onClick={handleDownloadItinerary}
            variant="outline"
            className="flex-1 py-4 shadow-2xl border-white bg-white rounded-2xl"
          >
            <FaDownload /> Itinerary
          </Button>
        </div>

        {/* DESCRIPTION */}
        {tour.description && (
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-10 text-center"
              >
                About This Experience
              </motion.h2>
              
              <div className="prose prose-lg max-w-none text-[#64748B] leading-relaxed text-[17px]">
                <p>{tour.description}</p>
              </div>
            </div>
          </section>
        )}

        {/* BEST TIME TO VISIT */}
        {tour.best_time_to_visit && (
          <section className="mb-20">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12 border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl flex items-center justify-center">
                  <FaCalendarAlt className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Best Time to Visit</h2>
                  <p className="text-slate-500">Make the most of your journey</p>
                </div>
              </div>
              <p className="text-lg text-[#0F172A]">{tour.best_time_to_visit}</p>
            </div>
          </section>
        )}

        {/* POPULAR PLACES */}
        {tour.popular_places && tour.popular_places.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-10">Places You’ll Cherish</h2>
            
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tour.popular_places.map((place, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3] cursor-pointer"
                >
                  <img 
                    src={place.image_url} 
                    alt={place.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm mb-3">
                      <FaMapMarkerAlt /> {place.location}
                    </div>
                    <h3 className="text-2xl font-semibold">{place.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1.08}
                centeredSlides
              >
                {tour.popular_places.map((place, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]">
                      <img src={place.image_url} alt={place.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-8 left-8 text-white">
                        <div className="text-sm opacity-80 flex items-center gap-2 mb-2">
                          <FaMapMarkerAlt /> {place.location}
                        </div>
                        <h3 className="text-2xl font-semibold">{place.name}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        )}

        {/* DAY-WISE ITINERARY */}
        {tour.itinerary && tour.itinerary.length > 0 && (
          <section className="mb-20">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Your Day-by-Day Journey
            </motion.h2>
            
            <div className="max-w-4xl mx-auto space-y-8">
              {tour.itinerary.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
                >
                  <div 
                    onClick={() => toggleDay(index)}
                    className="flex items-center justify-between px-8 py-7 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-inner flex-shrink-0">
                        {day.day}
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 tracking-widest">DAY {day.day}</div>
                        <h3 className="text-2xl font-semibold text-[#0F172A]">{day.title}</h3>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedDays[index] ? 180 : 0 }}
                      className="text-3xl text-slate-300"
                    >
                      ↓
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedDays[index] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="px-8 pb-8 border-t border-slate-100"
                      >
                        <div className="pt-8 text-[#64748B] leading-relaxed text-[17px]">
                          {day.description}
                        </div>

                        {day.activities && day.activities.length > 0 && (
                          <div className="mt-10">
                            <div className="uppercase text-xs tracking-[2px] text-slate-400 mb-4 font-medium">HIGHLIGHTS</div>
                            <div className="flex flex-wrap gap-3">
                              {day.activities.map((activity, aIndex) => (
                                <motion.span 
                                  key={aIndex}
                                  whileHover={{ scale: 1.05 }}
                                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-2xl text-sm text-slate-700 hover:border-[#2563EB]/30 transition-colors"
                                >
                                  {activity}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* INCLUDED / EXCLUDED */}
        {(tour.included || tour.excluded) && (
          <section className="mb-20 grid lg:grid-cols-2 gap-8">
            {tour.included && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white border border-emerald-100 rounded-3xl p-10 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl">✓</div>
                  <h3 className="text-3xl font-bold text-emerald-800">What's Included</h3>
                </div>
                <ul className="space-y-5 text-lg">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex gap-4 text-emerald-700">
                      <span className="text-emerald-500 text-xl mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {tour.excluded && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-rose-100 rounded-3xl p-10 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-3xl">✕</div>
                  <h3 className="text-3xl font-bold text-rose-800">What's Not Included</h3>
                </div>
                <ul className="space-y-5 text-lg">
                  {tour.excluded.map((item, index) => (
                    <li key={index} className="flex gap-4 text-rose-700">
                      <span className="text-rose-400 text-xl mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </section>
        )}

        {/* RELATED TOURS */}
        {relatedTours.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-4xl font-bold">Similar Journeys</h2>
              <Link to="/tours" className="text-[#2563EB] hover:underline font-medium">View All Tours →</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedTours.map((relatedTour, index) => (
                <TourCard key={relatedTour.id} tour={relatedTour} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}