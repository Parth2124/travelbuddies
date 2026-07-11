import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero/Hero.jsx';
import Services from '../components/Services/Services.jsx';
import DestinationSection from '../components/Destinations/DestinationSection.jsx';
import TourSection from '../components/Tours/TourSection.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs.jsx';
import TripPlanner from '../components/TripPlanner/TripPlanner.jsx';
import Newsletter from '../components/Newsletter/Newsletter.jsx';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Travel Buddies — Explore the World Without Limits</title>
        <meta
          name="description"
          content="Personalised journeys, curated stays and end-to-end travel support. Visa, flights, hotels and bespoke itineraries — planned by Travel Buddies."
        />
      </Helmet>
      <Hero />
      <Services />
      <DestinationSection />
      <TourSection />
      <Testimonials />
      <WhyChooseUs />
      <TripPlanner />
      <Newsletter />
    </>
  );
}
