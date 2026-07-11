import axios from 'axios';

/**
 * Central Axios instance for Strapi CMS.
 * Point VITE_API_BASE_URL at your Strapi instance.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(import.meta.env.VITE_STRAPI_API_TOKEN && {
      'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    }),
  },
});

export default api;
