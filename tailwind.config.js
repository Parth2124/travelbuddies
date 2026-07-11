/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1220',
          800: '#111A2E',
          700: '#16213A',
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          deep: '#1739A6',
          soft: '#EAF0FE',
        },
        gold: {
          DEFAULT: '#C9A66B',
          light: '#E4CFA4',
          deep: '#9C7A3F',
        },
        surface: {
          DEFAULT: '#F7F8FA',
          card: '#FFFFFF',
        },
        muted: '#64748B',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.75rem',
        xl3: '2.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,18,32,0.04), 0 20px 40px -16px rgba(11,18,32,0.14)',
        'card-hover': '0 24px 48px -12px rgba(37,99,235,0.22)',
        gold: '0 12px 30px -8px rgba(201,166,107,0.45)',
      },
      backgroundImage: {
        'gradient-ink': 'linear-gradient(160deg, #0B1220 0%, #16213A 70%)',
        'gradient-accent': 'linear-gradient(135deg, #2563EB, #1739A6)',
        'gradient-gold': 'linear-gradient(135deg, #E4CFA4, #C9A66B 55%, #9C7A3F)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.6)', opacity: 0.4 },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        pulseDot: 'pulseDot 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
