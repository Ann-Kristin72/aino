import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bluegreen: '#00B4D8',
        'bluegreen/80': 'rgba(0, 180, 216, 0.8)',
      },
    },
  },
  plugins: [],
}

export default config 