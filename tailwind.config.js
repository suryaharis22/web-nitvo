/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4028b8',
          light: '#5c44cd',
          dark: '#2c1e83',
        },
        secondary: {
          DEFAULT: '#8230c9',
          light: '#9b51d9',
          dark: '#5e1b99',
        },
        warning: {
          DEFAULT: '#fa9420',
          light: '#ffb74d',
          dark: '#cc7700',
        },
        danger: {
          DEFAULT: '#e03e00',
          light: '#ff5e2d',
          dark: '#aa2f00',
        },
        success: {
          DEFAULT: '#00927c',
          light: '#00b89b',
          dark: '#006d5c',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'gdn': 'linear-gradient(90deg, #4028b8 0%, #8230c9 50%, #fa9420 100%)',
        'cardimg': 'url("/bg-card1.PNG")',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
