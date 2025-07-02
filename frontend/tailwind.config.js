/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aino palette - matching the logo
        'aino-orange': '#F6A96B',
        'aino-korall': '#F48C78',
        'aino-teal': '#56B0A3',
        'aino-sjøgrønn': '#9BB8A8',
        'aino-grønn': '#4A7C59',
        'aino-blågrønn': '#90D9D3',
        
        // Legacy colors
        latte: '#F5EEE6',
        bluegreen: '#4AAE9B',
        warmbrown: '#A67C52',
        skifer: '#333F48',
        softpink: '#F8D9D6',
        'joda-teal': '#4CB6B6',
        'joda-green': '#4AAE9B',
        'joda-orange': '#F6A96B',
        'joda-gul': '#F9C74F',
        'joda-seagreen': '#C7D3B3',
        'joda-rød': '#F48C78',
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
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}; 