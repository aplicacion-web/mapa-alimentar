/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf9',
          100: '#ccfbee',
          200: '#9af6dd',
          300: '#5ce8c8',
          400: '#2dd4b1',
          500: '#14b896', // Tealy turquoise from wireframes
          600: '#0c947b',
          700: '#0c7664',
          800: '#0d5d51',
          900: '#0e4d44',
          950: '#042c27',
        },
        warm: {
          50: '#fffbf5',
          100: '#fff5e6',
          200: '#fee7c5',
          300: '#fed296',
          400: '#fdb35a',
          500: '#f89124',
        }
      },
      screens: {
        'xs': '360px',
      }
    },
  },
  plugins: [],
}
