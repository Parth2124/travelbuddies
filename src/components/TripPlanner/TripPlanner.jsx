import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading.jsx';
import { TextField, TextAreaField, SelectField } from '../common/FormField.jsx';
import Button from '../common/Button.jsx';
import { submitTripRequest } from '../../services/formsService.js';
import { buildWhatsAppLink, buildTripRequestMessage } from '../../utils/whatsapp.js';

const BUDGET_OPTIONS = [
  { value: 'Under ₹50,000', label: 'Under ₹50,000' },
  { value: '₹50,000 - ₹1,00,000', label: '₹50,000 - ₹1,00,000' },
  { value: '₹1,00,000 - ₹2,00,000', label: '₹1,00,000 - ₹2,00,000' },
  { value: '₹2,00,000 - ₹5,00,000', label: '₹2,00,000 - ₹5,00,000' },
  { value: 'Above ₹5,00,000', label: 'Above ₹5,00,000' },
];

const DURATION_OPTIONS = [
  { value: 'Weekend (2-3 days)', label: 'Weekend (2-3 days)' },
  { value: 'Short trip (4-7 days)', label: 'Short trip (4-7 days)' },
  { value: 'Medium trip (8-14 days)', label: 'Medium trip (8-14 days)' },
  { value: 'Long trip (15+ days)', label: 'Long trip (15+ days)' },
];

const initialState = {
  name: '',
  phone: '',
  email: '',
  destination: '',
  travelers: '',
  budget: '',
  duration: '',
  preferences: '',
};

export default function TripPlanner() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitTripRequest(form);
    window.open(buildWhatsAppLink(buildTripRequestMessage(form)), '_blank');
    setLoading(false);
    setSent(true);
    setForm(initialState);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="generate-trip" className="py-24 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Custom Itinerary"
          title="Generate your perfect trip"
          subtitle="Tell us about your dream journey and we'll craft a personalised travel experience just for you."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="card-elevated p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField id="name" label="Full Name *" placeholder="Enter your full name" required value={form.name} onChange={handleChange} />
              <TextField id="phone" label="Phone Number *" type="tel" placeholder="Enter your phone number" required value={form.phone} onChange={handleChange} />
            </div>

            <TextField id="email" label="Email Address *" type="email" placeholder="Enter your email address" required value={form.email} onChange={handleChange} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField id="destination" label="Preferred Destination" placeholder="e.g., Paris, Bali, New York" value={form.destination} onChange={handleChange} />
              <TextField id="travelers" label="Number of Travelers" type="number" min="1" max="20" placeholder="How many people?" value={form.travelers} onChange={handleChange} />
            </div>

            <SelectField id="budget" label="Budget Range" placeholder="Select budget range" options={BUDGET_OPTIONS} value={form.budget} onChange={handleChange} />
            <SelectField id="duration" label="Trip Duration" placeholder="Select duration" options={DURATION_OPTIONS} value={form.duration} onChange={handleChange} />

            <TextAreaField
              id="preferences"
              label="Travel Preferences & Special Requirements"
              placeholder="Tell us about your interests, activities you'd like to do, any special requirements, preferred travel style (luxury, adventure, cultural, etc.)"
              rows={4}
              value={form.preferences}
              onChange={handleChange}
            />

            <div className="text-center pt-4">
              <Button type="submit" variant="primary" loading={loading} className="px-12">
                {sent ? (
                  <>
                    <FiCheckCircle /> Request Sent!
                  </>
                ) : (
                  'Generate My Trip'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
