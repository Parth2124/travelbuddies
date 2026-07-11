# Travel Buddies — React Rebuild

A premium, component-based React rebuild of the original Django-templated
Travel Buddies homepage. Same section order and content hierarchy, redesigned
with a modern, editorial travel-brand aesthetic (Airbnb / Booking.com /
Luxury Escapes inspired) — glassmorphism, floating navbar, scroll reveals,
and a signature "boarding pass" gold accent motif.

## Stack

- React 19 + Vite
- Tailwind CSS (custom design tokens in `tailwind.config.js`)
- Framer Motion (scroll reveals, hero entrance, counters, mobile menu)
- React Router
- React Icons
- Swiper.js (mobile tour carousel)
- Axios (CMS-ready service layer)
- React Helmet Async (SEO)

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Connecting a real CMS / backend

Every dynamic section reads from `src/services/*.js`, not from hardcoded
arrays:

- `src/services/destinationsService.js` → `GET /api/destinations`
- `src/services/toursService.js` → `GET /api/tours`
- `src/services/formsService.js` → trip requests, service inquiries, newsletter

Set `VITE_API_BASE_URL` in a `.env` file to point `src/services/api.js` at
any headless CMS (Strapi, Directus, Payload) or your existing Django REST
Framework API:

```
VITE_API_BASE_URL=https://your-api.example.com/api
```

Until a real endpoint responds, each service quietly falls back to the
placeholder data in `src/services/placeholderData.js` so the UI never
breaks — remove that fallback once your CMS is live.

## Structure

```
src/
  components/    # one folder per section, each with its own sub-components
  pages/         # route-level composition (Home.jsx)
  hooks/         # useScrollPosition, useScrollLock, useCountUp
  services/      # Axios instance + CMS-ready data fetchers
  utils/         # WhatsApp message builders
  styles/        # Tailwind entry + shared utility classes
public/
  logo-travelbuddies.jpg   # replace with the real brand logo
```

## Notes

- The WhatsApp hand-off (Trip Generator, Service Inquiry) is preserved
  exactly as in the Django version — forms build a formatted message and
  open `wa.me` in a new tab, after (optionally) posting to your backend.
- Replace `public/logo-travelbuddies.jpg` with the real logo asset.
- The Google Reviews embed loads the Elfsight script client-side in
  `Testimonials.jsx` — swap the widget ID for your own if needed.
