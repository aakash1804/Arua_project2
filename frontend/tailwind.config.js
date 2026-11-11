/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF7',
          100: '#FAF8F0',
          200: '#F5EFEB',
          300: '#EBE3D7',
          400: '#DED3C1',
        },
        charcoal: {
          800: '#222221',
          900: '#181817',
          950: '#0F0F0E',
        },
        gold: {
          300: '#F5D061',
          400: '#E6BA39',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

