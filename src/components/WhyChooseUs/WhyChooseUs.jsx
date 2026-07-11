import {
  FiAward,
  FiUsers,
  FiHeadphones,
  FiLock,
  FiTag,
  FiMap,
} from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading.jsx';
import FeatureCard from './FeatureCard.jsx';

const FEATURES = [
  {
    icon: FiAward,
    title: 'Licensed Agency',
    description: 'Fully registered and IATA-aligned, with every booking backed by proper documentation.',
  },
  {
    icon: FiUsers,
    title: 'Trusted by 1500+',
    description: 'A growing community of travelers who return to us trip after trip.',
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'A real person, always reachable — before, during and after your trip.',
  },
  {
    icon: FiLock,
    title: 'Secure Payments',
    description: 'Encrypted transactions and transparent invoicing on every booking.',
  },
  {
    icon: FiTag,
    title: 'Best Price Guarantee',
    description: 'We match or beat comparable packages found elsewhere, without cutting corners.',
  },
  {
    icon: FiMap,
    title: 'Custom Itineraries',
    description: 'Every trip built around how you actually want to travel, not a fixed template.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 bg-gradient-ink text-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Travel with confidence"
          subtitle="Fifteen years of getting the details right, so you don't have to think about them."
          dark
          className="mb-16"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} index={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
