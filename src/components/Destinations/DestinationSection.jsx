import { useEffect, useState } from 'react';
import SectionHeading from '../common/SectionHeading.jsx';
import Button from '../common/Button.jsx';
import DestinationCard from './DestinationCard.jsx';
import DestinationSkeleton from './DestinationSkeleton.jsx';
import { getDestinations } from '../../services/destinationsService.js';

export default function DestinationSection() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getDestinations().then((data) => {
      if (mounted) {
        setDestinations(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="destinations" className="py-24 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Popular Destinations"
            title="Where travelers are heading next"
            align="left"
            className="max-w-xl"
          />
          <p className="text-muted max-w-sm">
            A curated shortlist of the destinations our travelers return to again and again.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <DestinationSkeleton key={i} />)
            : destinations
                .slice(0, 4)
                .map((dest, i) => <DestinationCard key={dest.id ?? i} destination={dest} index={i} />)}
        </div>

        {destinations.length > 4 && (
          <div className="flex justify-center mt-12">
            <Button as="a" href="/destinations/" variant="outline">
              View All Destinations
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
