import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
        body: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052E16'
        },
        gray: {
          50: '#F7F7F9',
          100: '#EDEDF0',
          200: '#D1D1D8',
          300: '#B3B3BF',
          400: '#8A8A98',
          500: '#5A5A6F',
          600: '#3C3C50',
          700: '#2C2C3A',
          800: '#1D1D27',
          900: '#0D0F12', // brand-dark
          950: '#060709'
        },
        yellow: {
          400: '#FFD646',
          500: '#F5C000', // brand-gold
          600: '#E6B000'
        },
        teal: {
          400: '#47C4C4',
          500: '#1AA6A6', // signal-teal
          600: '#178888'
        }
      }
    }
  },
  plugins: []
}

export default config
