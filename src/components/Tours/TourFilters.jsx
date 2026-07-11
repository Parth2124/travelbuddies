const FILTERS = [
  { key: 'all', label: 'All Tours' },
  { key: 'international', label: 'International' },
  { key: 'domestic', label: 'Domestic' },
];

export default function TourFilters({ active, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold font-display transition-all duration-300 ${
            active === f.key
              ? 'bg-ink text-white shadow-[0_10px_24px_-8px_rgba(11,18,32,0.5)]'
              : 'bg-transparent border border-ink/15 text-ink-700 hover:border-accent hover:text-accent'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
