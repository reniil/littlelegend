import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-purple': {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#6B46C1',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        'legend-gold': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        'cream': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        'midnight': {
          50: '#E6E7F0',
          100: '#C1C3D4',
          200: '#9DA2BF',
          300: '#7881AA',
          400: '#546095',
          500: '#1E1B4B',
          600: '#1E1B4B',
          700: '#1E1B4B',
          800: '#1E1B4B',
          900: '#1E1B4B',
        },
      },
    },
  },
  plugins: [],
};

export default config;
