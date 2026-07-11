import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiMapPin, FiPhone, FiMail, FiHeart, FiGlobe, FiShield, 
  FiUsers, FiAward, FiStar, FiClock 
} from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

// Swiper (install: npm install swiper)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const CountUp = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(end * progress);
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function About() {
  const stats = [
    { number: 20, suffix: "+", label: "Countries", icon: FiGlobe },
    { number: 1500, suffix: "+", label: "Happy Travelers", icon: FiUsers },
    { number: 100, suffix: "+", label: "Premium Hotels", icon: FiStar },
    { number: 15, suffix: "+", label: "Years Experience", icon: FiClock },
  ];

  const values = [
    {
      icon: FiHeart,
      title: 'Passion',
      description: 'We love what we do and bring genuine enthusiasm to every journey we plan.',
      color: 'from-rose-400 to-pink-500'
    },
    {
      icon: FiShield,
      title: 'Trust',
      description: 'Your safety and satisfaction are our top priorities. We never compromise on quality.',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      icon: FiUsers,
      title: 'Personalization',
      description: 'Every traveler is unique. We craft experiences tailored to your preferences.',
      color: 'from-violet-400 to-purple-500'
    },
    {
      icon: FiAward,
      title: 'Excellence',
      description: 'We strive for perfection in every detail, from planning to execution.',
      color: 'from-amber-400 to-orange-500'
    },
  ];

  const whyChoose = [
    'Expert Travel Consultants',
    '24/7 Customer Support',
    'Competitive Pricing',
    'Customized Itineraries',
    'Trusted Partners Worldwide',
    'Hassle-Free Booking',
    'Flexible Payment Options',
    'Travel Insurance Assistance',
    'Visa & Documentation Help',
  ];

  return (
    <>
      <Helmet>
        <title>About Us — Travel Buddies</title>
        <meta name="description" content="Learn about Travel Buddies - your trusted travel partner for unforgettable journeys around the world." />
      </Helmet>

      {/* HERO SECTION - Premium White */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#F8FAFC]">
        {/* Subtle animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-40 right-10 w-[32rem] h-[32rem] bg-indigo-200/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.1, 1, 1.1],
              y: [0, -40, 0]
            }}
            transition={{ duration: 28, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border border-slate-100 mb-6"
            >
              <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-widest uppercase text-slate-500">Since 2010</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-bold text-[#0F172A] leading-[1.05] max-w-4xl mb-8">
              Crafting journeys<br />that matter
            </h1>

            <p className="max-w-2xl text-xl text-[#64748B] mb-12">
              Your trusted travel partner for unforgettable journeys around the world. We turn your travel dreams into reality with personalized experiences and exceptional service.
            </p>

            {/* World Map Illustration Placeholder */}
            {/* <div className="relative w-full max-w-5xl h-80 md:h-96 mb-16 rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-slate-100 flex items-center justify-center">
              <div className="text-center">
                <FiGlobe className="w-32 h-32 text-[#2563EB]/10 mx-auto mb-6" />
                <div className="text-2xl font-semibold text-slate-400">Global Reach</div>
              </div> */}
              
              {/* Decorative floating elements */}
              {/* <motion.div 
                className="absolute top-12 left-12 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 text-left"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇮🇹</div>
                  <div>
                    <div className="font-semibold text-sm">Tuscany Escape</div>
                    <div className="text-xs text-emerald-600">8 days • 12 travelers</div>
                  </div>
                </div>
              </motion.div> */}

              {/* <motion.div 
                className="absolute bottom-16 right-16 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 text-left"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏔️</div>
                  <div>
                    <div className="font-semibold text-sm">Himalayan Trek</div>
                    <div className="text-xs text-amber-600">14 days • Expert guides</div>
                  </div>
                </div>
              </motion.div>
            </div> */}

            {/* Animated Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center group hover:-translate-y-1 transition-all"
                >
                  <div className="text-4xl mb-3 text-[#2563EB] group-hover:scale-110 transition-transform">
                    <stat.icon />
                  </div>
                  <div className="text-5xl font-bold text-[#0F172A] mb-1 tabular-nums">
                    <CountUp end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll prompt */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-400"
        >
          ↓
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Content */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-28"
              >
                <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl mb-6">
                  OUR JOURNEY
                </div>
                
                <h2 className="text-5xl font-bold text-[#0F172A] leading-tight mb-8">
                  From passion to purpose
                </h2>

                <div className="space-y-8 text-lg text-[#64748B]">
                  <p>
                    Travel Buddies was born from a passion for exploration and a desire to make travel accessible to everyone. What started as a small group of travel enthusiasts has grown into a trusted name in the travel industry.
                  </p>
                  <p>
                    With years of experience and countless journeys across the globe, we understand what makes a trip truly memorable. Our team of dedicated travel experts works tirelessly to craft personalized experiences that exceed expectations.
                  </p>
                  <p>
                    From domestic getaways to international adventures, we handle every detail so you can focus on creating memories that last a lifetime. Our commitment to quality, safety, and customer satisfaction sets us apart.
                  </p>
                </div>

                <div className="mt-12 flex gap-4">
                  <div className="px-8 py-4 bg-[#0F172A] text-white rounded-2xl font-medium flex items-center gap-3">
                    <FiAward className="w-5 h-5" /> Award Winning
                  </div>
                  <div className="px-8 py-4 border border-slate-200 rounded-2xl font-medium flex items-center">
                    15+ Years
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Visual Side */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[16/13] bg-slate-100"
              >
                <img
  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80"
  alt="Travel Buddies"
  className="absolute inset-0 w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/65 via-[#0F172A]/20 to-transparent" />

<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Experience badge */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-8 right-8 bg-white rounded-3xl shadow-2xl px-8 py-6 text-center backdrop-blur-xl"
                >
                  <div className="text-6xl font-bold text-[#2563EB]">15</div>
                  <div className="text-sm font-medium text-slate-500 tracking-widest">YEARS OF EXCELLENCE</div>
                </motion.div>

                {/* Floating tag */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  40+ Destinations Explored
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW STATS SECTION */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">By the numbers</h2>
            <p className="text-slate-500">Real impact, real connections</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: 1500, suffix: "+", label: "Happy Travelers", icon: FiUsers },
              { num: 20, suffix: "+", label: "Countries", icon: FiGlobe },
              { num: 15, suffix: "+", label: "Years Experience", icon: FiClock },
              { num: 24, suffix: "/7", label: "Customer Support", icon: FiShield },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="text-[#2563EB] mb-6">
                  <s.icon className="w-10 h-10" />
                </div>
                <div className="text-6xl font-semibold text-[#0F172A] tabular-nums mb-2">
                  <CountUp end={s.num} suffix={s.suffix} />
                </div>
                <div className="font-medium text-slate-600">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[#2563EB] font-semibold tracking-[3px] text-sm mb-3">OUR FOUNDATION</div>
              <h2 className="text-5xl font-bold text-[#0F172A]">Our Values</h2>
              <p className="mt-4 text-xl text-slate-500 max-w-md mx-auto">The principles that guide every adventure</p>
            </motion.div>
          </div>

          {/* Desktop Grid + Mobile Swiper */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white border border-slate-100 hover:border-transparent rounded-[2.25rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-8 text-white shadow-inner group-hover:rotate-12 transition-transform`}>
                  <value.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="lg:hidden">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1.1}
              centeredSlides={true}
              className="py-8"
            >
              {values.map((value, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-slate-100 rounded-[2.25rem] p-8 shadow-sm min-h-[380px]"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-8 text-white`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-semibold mb-5">{value.title}</h3>
                    <p className="text-slate-600 text-[17px] leading-relaxed">{value.description}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0F172A]">Why Choose Travel Buddies?</h2>
            <p className="text-slate-500 mt-4 text-lg">What sets us apart in a crowded world</p>
          </div>

          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {whyChoose.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className={`bg-white rounded-3xl p-8 shadow hover:shadow-xl transition-all flex flex-col ${index % 2 === 0 ? 'lg:translate-y-6' : ''}`}
              >
                <div className="mb-6 w-12 h-12 bg-gradient-to-br from-[#2563EB] to-blue-600 text-white rounded-2xl flex items-center justify-center">
                  <FiStar className="w-6 h-6" />
                </div>
                <div className="text-xl font-semibold text-[#0F172A] flex-1">{feature}</div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1.15}
              centeredSlides
            >
              {whyChoose.map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-3xl p-8 shadow">
                    <div className="mb-6 w-12 h-12 bg-gradient-to-br from-[#2563EB] to-blue-600 text-white rounded-2xl flex items-center justify-center">
                      <FiStar className="w-6 h-6" />
                    </div>
                    <div className="text-xl font-semibold text-[#0F172A]">{feature}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#172554] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline text-sm uppercase tracking-[4px] text-blue-300 font-medium mb-4 block"
            >
              LET'S CONNECT
            </motion.div>
            <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-blue-100/80 max-w-md mx-auto">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: FiMapPin, 
                title: "Visit Us", 
                detail: "Ghaziabad, India", 
                link: "https://maps.app.goo.gl/Qw1Qx8jSg4hPTE2k7",
                accent: "rose"
              },
              { 
                icon: FiPhone, 
                title: "Call Us", 
                detail: "+91 98103 91119", 
                link: "tel:+919810391119",
                accent: "emerald"
              },
              { 
                icon: FiMail, 
                title: "Email Us", 
                detail: "Tours@travelbuddiesco.in", 
                link: "mailto:Tours@travelbuddiesco.in",
                accent: "amber"
              },
            ].map((item, idx) => (
              <motion.a
                href={item.link}
                target={idx === 0 ? "_blank" : undefined}
                rel={idx === 0 ? "noreferrer" : undefined}
                key={idx}
                whileHover={{ y: -8 }}
                className="group bg-white/10 backdrop-blur-3xl border border-white/10 hover:border-white/30 rounded-3xl p-10 transition-all hover:bg-white/5"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform text-3xl`}>
                  <item.icon />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.detail}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}