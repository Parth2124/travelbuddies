import api from "./api";
import { placeholderDestinations } from "./placeholderData";

const STRAPI_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "";

function mediaUrl(media) {
  if (!media) return "";

  const url = media.url || media.data?.attributes?.url;

  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${STRAPI_URL}${url}`;
}

function normalizeDestination(item) {
  const d = item.attributes ?? item;

  return {
    id: item.id,

    slug: d.slug,

    title: d.title,

    image_url: mediaUrl(d.image),

    rating: d.rating,

    starting_price: d.starting_price,

    duration: d.duration,

    country: d.country,

    description: d.description,

    best_time_to_visit: d.best_time_to_visit,

    culture: d.culture,

    cuisine: d.cuisine,

    best_places:
      d.best_places?.map(place => ({
        name: place.name,
        image_url: mediaUrl(place.image),
        description: place.description,
      })) || [],

    things_to_do:
      d.things_to_do?.map(item => ({
        name: item.name,
        description: item.description,
      })) || [],
  };
}

export async function getDestinations(params = {}) {
  try {
    const { data } = await api.get("/destinations", {
      params: {
        populate: "*",
        ...params,
      },
    });

    return data.data.map(normalizeDestination);

  } catch (err) {
    console.error("Error fetching destinations:", err);
    return placeholderDestinations;
  }
}

export async function getDestinationBySlug(slug) {
  try {
    const { data } = await api.get("/destinations", {
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

    return normalizeDestination(data.data[0]);

  } catch (err) {
    console.error("Error fetching destination:", err);

    return (
      placeholderDestinations.find(destination => destination.slug === slug) ||
      null
    );
  }
}