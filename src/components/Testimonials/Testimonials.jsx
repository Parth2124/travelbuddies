import { useEffect } from 'react';
import SectionHeading from '../common/SectionHeading.jsx';
import Button from '../common/Button.jsx';

/**
 * Elfsight (or any embeddable reviews widget) mounts into #google-reviews-widget.
 * The script tag is injected once on mount so it plays nicely with React's
 * virtual DOM instead of being hardcoded into index.html.
 */
export default function Testimonials() {
  useEffect(() => {
    if (document.querySelector('script[data-elfsight]')) return;
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    script.dataset.elfsight = 'true';
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 px-4 bg-gradient-ink text-white relative overflow-hidden"
    >
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="Real Stories"
          title="What our travelers say"
          subtitle="Live reviews from happy travelers who explored with us"
          dark
          className="mb-16"
        />

        <div className="max-w-5xl mx-auto">
          <div
            id="google-reviews-widget"
            className="elfsight-app-79e0aca9-0791-4f94-bc2a-c34e508a21e9 bg-transparent py-5"
            data-elfsight-app-lazy
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/80 text-lg mb-6">Join hundreds of satisfied travelers</p>
          <Button as="a" href="#generate-trip" variant="gold">
            Start Your Journey Now
          </Button>
        </div>
      </div>
    </section>
  );
}
