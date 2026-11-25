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
        charcoal: '#111318',
        black: '#08090B',
        gold: {
          DEFAULT: '#D4A853',
          light: '#E8C57A',
          dark: '#B8902A',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4A853, #E8C57A, #B8902A)',
      },
    },
  },
  plugins: [],
}

export default config
