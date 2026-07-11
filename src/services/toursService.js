import api from "./api";
import { placeholderTours } from "./placeholderData";

const STRAPI_URL = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "";

function mediaUrl(media) {
  if (!media) return "";

  const url = media.url || media.data?.attributes?.url;

  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

function normalizeTour(item) {
  const t = item.attributes ?? item;

  return {
    id: item.id,

    slug: t.slug,

    title: t.title,

    short_description: t.short_description,

    image_url: mediaUrl(t.image),

    tour_type: t.tour_type,

    description: t.description,

    price: t.price,

    duration: t.duration,

    best_time_to_visit: t.best_time_to_visit,

    popular_places:
      t.popular_places?.map(place => ({
        name: place.name,
        location: place.location,
        image_url: mediaUrl(place.image),
      })) || [],

    itinerary:
      t.itinerary?.map(day => ({
        day: day.day,
        title: day.title,
        description: day.description,
        activities: day.activities || [],
      })) || [],

    included: t.included || [],

    excluded: t.excluded || [],
  };
}

export async function getTours(params = {}) {
  try {

    const { data } = await api.get("/tours", {
      params: {
        populate: "*",
        ...params,
      },
    });

    return data.data.map(normalizeTour);

  } catch (err) {

    console.error(err);

    return placeholderTours;

  }
}

export async function getTourBySlug(slug) {
  try {

    const { data } = await api.get("/tours", {
      params: {
        populate: "*",
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
    });

    if (!data.data.length) return null;

    return normalizeTour(data.data[0]);

  } catch (err) {

    console.error(err);

    return placeholderTours.find(t => t.slug === slug) || null;

  }
}