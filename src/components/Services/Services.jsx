import {
  FiCreditCard,
  FiSend,
  FiHome,
  FiBriefcase,
  FiGlobe,
  FiShield,
} from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading.jsx';
import ServiceCard from './ServiceCard.jsx';
import InquiryForm from './InquiryForm.jsx';

const SERVICES = [
  {
    icon: FiCreditCard,
    title: 'Visa Assistance',
    description: 'End-to-end documentation and appointment support.',
  },
  {
    icon: FiSend,
    title: 'Flights',
    description: 'Competitive fares with flexible rebooking.',
  },
  {
    icon: FiHome,
    title: 'Hotels',
    description: 'Handpicked stays from boutique to luxury.',
  },
  {
    icon: FiBriefcase,
    title: 'Holiday Packages',
    description: 'Fully-planned getaways with everything included.',
  },
  {
    icon: FiGlobe,
    title: 'Corporate Travel',
    description: 'Seamless business trips and group travel.',
  },
  {
    icon: FiShield,
    title: 'Passport',
    description: 'End-to-end documentation and appointment support.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="What We Offer"
          title="Everything your journey needs"
          subtitle="From the first stamp on your passport to the last night in your hotel — we handle it all."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} index={i} {...service} />
            ))}
          </div>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
