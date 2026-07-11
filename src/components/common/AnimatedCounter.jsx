import useCountUp from '../../hooks/useCountUp.js';

export default function AnimatedCounter({ end, suffix = '', label, dark = false }) {
  const [ref, value] = useCountUp(end);

  return (
    <div ref={ref} className="flex flex-col">
      <span
        className={`font-display font-extrabold text-3xl md:text-4xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {value}
        {suffix}
      </span>
      <span
        className={`text-[11px] uppercase tracking-[0.16em] font-semibold mt-1.5 ${
          dark ? 'text-white/60' : 'text-muted'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
