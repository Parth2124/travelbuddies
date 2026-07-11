# Strapi CMS Setup Guide

This guide will help you set up Strapi CMS to manage tours and destinations for your Travel Buddies application.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Step 1: Install Strapi

Create a new Strapi project:

```bash
npx create-strapi-app@latest travel-buddies-cms --quickstart
```

Or with specific options:

```bash
npx create-strapi-app@latest travel-buddies-cms --quickstart --no-run
cd travel-buddies-cms
npm install
npm run develop
```

## Step 2: Configure Content Types

### Tours Content Type

1. Go to `http://localhost:1337/admin`
2. Create admin account
3. Navigate to **Content-Type Builder** → **Create new collection type**
4. Name it `tour` (singular)
5. Add the following fields:

| Field Name | Type | Required | Notes |
|-----------|------|----------|-------|
| title | Text | Yes | Tour name |
| slug | UID | Yes | Auto-generated from title |
| short_description | Text | No | Short description for tour cards (shown on desktop hover) |
| description | Rich Text | No | Full tour description |
| image_url | Media | Yes | Tour image |
| tour_type | Enumeration | Yes | Values: domestic, international |
| price | Number | No | Tour price |
| duration | Text | No | e.g., "7 Days" |
| best_time_to_visit | Text | No | Best time to visit description |
| popular_places | JSON | No | Array of place objects with name, location, image_url |
| itinerary | JSON | No | Array of day objects with day, title, description, activities |
| included | JSON | No | Array of strings (what's included) |
| excluded | JSON | No | Array of strings (what's excluded) |
| publishedAt | Date | Yes | Auto-managed by Strapi |

**Note on JSON fields:**
- `popular_places` should be structured as:
  ```json
  [
    {
      "name": "Place Name",
      "location": "Location",
      "image_url": "https://example.com/image.jpg"
    }
  ]
  ```

- `itinerary` should be structured as:
  ```json
  [
    {
      "day": 1,
      "title": "Day Title",
      "description": "Day description",
      "activities": ["Activity 1", "Activity 2"]
    }
  ]
  ```

- `included` and `excluded` should be arrays of strings:
  ```json
  ["Item 1", "Item 2", "Item 3"]
  ```

### Destinations Content Type

1. Create another collection type named `destination`
2. Add the following fields:

| Field Name | Type | Required | Notes |
|-----------|------|----------|-------|
| title | Text | Yes | Destination name |
| slug | UID | Yes | Auto-generated from title |
| description | Rich Text | No | Destination description |
| image_url | Media | Yes | Destination image |
| rating | Number | No | 0-5 scale |
| starting_price | Text | Yes | e.g., "1,25,000" |
| duration | Text | Yes | e.g., "7 Days" |
| country | Text | No | Country name |
| best_time_to_visit | Text | No | Best time to visit description |
| best_places | JSON | No | Array of place objects with name, image_url, description |
| things_to_do | JSON | No | Array of activity objects with name, description |
| culture | Text | No | Culture and heritage information |
| cuisine | Text | No | Local cuisine information |
| publishedAt | Date | Yes | Auto-managed by Strapi |

**Note on JSON fields:**
- `best_places` should be structured as:
  ```json
  [
    {
      "name": "Place Name",
      "image_url": "https://example.com/image.jpg",
      "description": "Place description"
    }
  ]
  ```

- `things_to_do` should be structured as:
  ```json
  [
    {
      "name": "Activity Name",
      "description": "Activity description"
    }
  ]
  ```

## Step 3: Configure API Permissions

1. Go to **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
2. Under **Permissions**, find `tour` and `destination`
3. Enable **find** and **findOne** actions for both
4. Click **Save**

## Step 4: Generate API Token (Optional)

For enhanced security, generate an API token:

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name it `Travel Buddies Frontend`
4. Set duration (or unlimited)
5. Copy the token

## Step 5: Configure Environment Variables

In your React project, create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:1337/api
VITE_STRAPI_API_TOKEN=your-api-token-here
```

Copy from `.env.example` if needed:

```bash
cp .env.example .env
```

## Step 6: Add Sample Content

1. Go to **Content Manager** → **Tour**
2. Click **Create new entry**
3. Fill in the fields with tour data
4. Click **Save** and then **Publish**
5. Repeat for destinations

## Step 7: Enable SSE (Server-Sent Events)

Strapi doesn't have built-in SSE, but you can add it via a plugin or custom middleware:

### Option A: Use Strapi Webhook Plugin

1. Install webhook plugin:
```bash
cd travel-buddies-cms
npm install strapi-provider-webhook
```

2. Configure in `config/plugins.js`:
```javascript
module.exports = {
  webhook: {
    config: {
      url: 'http://localhost:5173/api/webhook',
      events: ['entry.create', 'entry.update', 'entry.delete'],
    },
  },
};
```

### Option B: Custom SSE Middleware

Create `src/middlewares/sse.js` in your Strapi project:

```javascript
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.path.startsWith('/sse/')) {
      const contentType = ctx.path.split('/sse/')[1];
      
      ctx.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });

      const sendEvent = (data) => {
        ctx.res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Subscribe to Strapi lifecycle hooks
      strapi.db.query(`api::${contentType}.${contentType}`).subscribe((event) => {
        sendEvent({ type: event.action, data: event.result });
      });

      // Keep connection alive
      ctx.req.on('close', () => {
        // Cleanup
      });
    } else {
      await next();
    }
  };
};
```

## Step 8: Test the Connection

Start your React application:

```bash
npm run dev
```

The app should now fetch tours and destinations from your Strapi CMS instead of using placeholder data.

## Step 9: Use SSE in Components (Optional)

To enable real-time updates in your components:

```javascript
import { useSSE } from '../services/sseService';

// In TourSection.jsx
useSSE('tours', (update) => {
  // Refresh tours when Strapi content changes
  getTours().then(setTours);
});
```

## Troubleshooting

### CORS Issues

If you get CORS errors, add this to Strapi's `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      cors: {
        enabled: true,
        origin: ['http://localhost:5173'],
        credentials: true,
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### API Not Responding

- Check Strapi is running on port 1337
- Verify the API URL in `.env`
- Check browser console for errors
- Ensure content is published (not just saved as draft)

### Images Not Loading

- Ensure media files are uploaded in Strapi
- Check media permissions in Strapi settings
- Verify image URLs in the response

## Data Structure Reference

### Tour Response Format
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Swiss Alps Explorer",
        "slug": "swiss-alps-explorer",
        "description": "...",
        "image_url": "https://...",
        "tour_type": "international",
        "price": 150000,
        "duration": "7 Days",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ]
}
```

### Destination Response Format
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Switzerland",
        "slug": "switzerland",
        "description": "...",
        "image_url": "https://...",
        "rating": 4.9,
        "starting_price": "1,25,000",
        "duration": "7 Days",
        "country": "Switzerland",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ]
}
```

## Next Steps

1. Deploy Strapi to production (Strapi Cloud, DigitalOcean, etc.)
2. Update `.env` with production API URL
3. Set up proper authentication and permissions
4. Configure backup and monitoring
