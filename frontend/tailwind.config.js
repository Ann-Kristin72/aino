/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        latte: '#F5EEE6',
        bluegreen: '#4AAE9B',
        warmbrown: '#A67C52',
        skifer: '#333F48',
        softpink: '#F8D9D6',
        joda: {
          teal: '#4CB6B6',
          orange: '#F6A96B',
          yellow: '#F6D06B',
          peach: '#F6B6A6',
          green: '#A6C6B6',
          sand: '#E6E6C6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        slab: ['"Roboto Slab"', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}; 