import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWhatsapp, FaMapMarkerAlt, FaStar, FaCalendarAlt, FaUtensils, FaLandmark } from 'react-icons/fa';
import { getDestinationBySlug, getDestinations } from '../services/destinationsService.js';
import Button from '../components/common/Button.jsx';
import DestinationCard from '../components/Destinations/DestinationCard.jsx';

export default function DestinationDetail() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [relatedDestinations, setRelatedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const destinationData = await getDestinationBySlug(slug);
        setDestination(destinationData);
        
        if (destinationData) {
          const allDestinations = await getDestinations();
          setRelatedDestinations(allDestinations.filter(d => d.slug !== slug).slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  const handleWhatsAppInquiry = () => {
    if (!destination) return;
    
    const phoneNumber = '919876543210';
    const message = encodeURIComponent(
      `Hi Travel Buddies! 👋\n\nI'm interested in planning a trip to "${destination.title}".\n\nLink: ${window.location.href}\n\nPlease share more details about available tours and packages for this destination.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{destination.title} — Travel Buddies</title>
        <meta name="description" content={destination.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image_url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="relative h-full flex items-end pb-16 px-4 max-w-7xl mx-auto">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              {destination.country && (
                <span className="flex items-center gap-1 text-sm">
                  <FaMapMarkerAlt />
                  {destination.country}
                </span>
              )}
              {destination.rating && (
                <span className="flex items-center gap-1 text-sm">
                  <FaStar className="text-yellow-400" />
                  {destination.rating}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.title}</h1>
            <div className="flex items-center gap-4 text-white/80">
              {destination.duration && (
                <span className="flex items-center gap-1">
                  <FaCalendarAlt />
                  {destination.duration}
                </span>
              )}
              {destination.starting_price && (
                <span>Starting from ₹{destination.starting_price}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Action Button */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button onClick={handleWhatsAppInquiry} className="flex items-center gap-2">
            <FaWhatsapp />
            Inquire Now
          </Button>
        </div>

        {/* Description Section */}
        {destination.description && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">About {destination.title}</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{destination.description}</p>
            </div>
          </section>
        )}

        {/* Best Time to Visit */}
        {destination.best_time_to_visit && (
          <section className="mb-16 bg-surface rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FaCalendarAlt className="text-accent" />
              Best Time to Visit
            </h2>
            <p className="text-gray-700 text-lg">{destination.best_time_to_visit}</p>
          </section>
        )}

        {/* Best Places to Visit */}
        {destination.best_places && destination.best_places.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Best Places to Visit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.best_places.map((place, index) => (
                <div key={index} className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">{place.name}</h3>
                      {place.description && (
                        <p className="text-white/80 text-sm">{place.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Things to Do */}
        {destination.things_to_do && destination.things_to_do.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Things to Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destination.things_to_do.map((activity, index) => (
                <div key={index} className="bg-surface rounded-xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaLandmark className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{activity.name}</h3>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Culture */}
        {destination.culture && (
          <section className="mb-16 bg-surface rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Culture & Heritage</h2>
            <p className="text-gray-700 text-lg">{destination.culture}</p>
          </section>
        )}

        {/* Cuisine */}
        {destination.cuisine && (
          <section className="mb-16 bg-surface rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FaUtensils className="text-accent" />
              Local Cuisine
            </h2>
            <p className="text-gray-700 text-lg">{destination.cuisine}</p>
          </section>
        )}

        {/* Related Destinations */}
        {relatedDestinations.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Other Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDestinations.map((relatedDestination, index) => (
                <DestinationCard key={relatedDestination.id ?? index} destination={relatedDestination} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
