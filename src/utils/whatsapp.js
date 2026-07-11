export const WHATSAPP_NUMBER = '919810391119';

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTripRequestMessage({
  name,
  phone,
  email,
  destination,
  travelers,
  budget,
  duration,
  preferences,
}) {
  return `Hey Travel Buddies! I'm interested in generating a personalised trip with you.

*Trip Request Details*
Name: ${name}
Phone: ${phone}
Email: ${email}
Preferred Destination: ${destination || 'Not specified'}
Number of Travelers: ${travelers || 'Not specified'}
Budget Range: ${budget || 'Not specified'}
Trip Duration: ${duration || 'Not specified'}
Preferences: ${preferences || 'None'}

Please help me plan the perfect trip!`;
}

export function buildServiceInquiryMessage({ service, name, phone, message }) {
  return `Hello Travel Buddies!

*Service Inquiry*
Service: ${service || 'General Inquiry'}
Name: ${name}
Phone: ${phone}
Message: ${message || 'No additional message'}

Please contact me soon!`;
}
