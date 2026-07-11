import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { TextField, TextAreaField, SelectField } from '../common/FormField.jsx';
import Button from '../common/Button.jsx';
import { submitServiceInquiry } from '../../services/formsService.js';
import { buildWhatsAppLink, buildServiceInquiryMessage } from '../../utils/whatsapp.js';

const SERVICE_OPTIONS = [
  { value: 'Visa Assistance', label: 'Visa Assistance' },
  { value: 'Flights', label: 'Flights' },
  { value: 'Hotels', label: 'Hotels' },
  { value: 'Holiday Packages', label: 'Holiday Packages' },
  { value: 'Corporate Travel', label: 'Corporate Travel' },
  { value: 'Passport', label: 'Passport' },
];

const initialState = { service: '', name: '', phone: '', message: '' };

export default function InquiryForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitServiceInquiry(form);
    window.open(buildWhatsAppLink(buildServiceInquiryMessage(form)), '_blank');
    setLoading(false);
    setSent(true);
    setForm(initialState);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="card-elevated p-8 md:p-10"
    >
      <h3 className="font-display font-bold text-2xl text-ink mb-2">Get in touch</h3>
      <p className="text-muted mb-8">
        Tell us what you need and we&rsquo;ll get back to you instantly via WhatsApp.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <SelectField
          id="service"
          label="Select Service"
          placeholder="Choose a service..."
          options={SERVICE_OPTIONS}
          value={form.service}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            id="name"
            label="Full Name"
            placeholder="Your name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            required
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <TextAreaField
          id="message"
          label="Message (Optional)"
          placeholder="Any specific requirements?"
          rows={3}
          value={form.message}
          onChange={handleChange}
        />

        <Button type="submit" variant="primary" loading={loading} className="w-full">
          {sent ? (
            <>
              <FiCheckCircle /> Sent!
            </>
          ) : (
            'Send Inquiry via WhatsApp'
          )}
        </Button>
      </form>
    </motion.div>
  );
}
