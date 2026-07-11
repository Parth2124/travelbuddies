import api from './api.js';

// These calls are wired to real endpoints already — until a backend exists
// they resolve quietly so the WhatsApp hand-off (the current source of truth
// for lead capture) is never blocked by a failed network request.

export async function submitTripRequest(payload) {
  try {
    await api.post('/leads/trip-request', payload);
  } catch (error) {
    /* backend not connected yet — safe to ignore */
  }
}

export async function submitServiceInquiry(payload) {
  try {
    await api.post('/leads/service-inquiry', payload);
  } catch (error) {
    /* backend not connected yet — safe to ignore */
  }
}

export async function subscribeNewsletter(email) {
  try {
    await api.post('/newsletter/subscribe', { email });
  } catch (error) {
    /* backend not connected yet — safe to ignore */
  }
}
