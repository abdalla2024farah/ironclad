/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'alumni': ['Alumni Sans Collegiate One', 'sans-serif'],
      },
      colors: {
        'bastion': {
          'black': '#000000',
          'dark': '#0a0a0a',
          'charcoal': '#1a1a1a',
          'steel': '#2a2a2a',
          'iron': '#3a3a3a',
          'slate': '#4a4a4a',
          'ash': '#5a5a5a',
          'smoke': '#6a6a6a',
          'fog': '#7a7a7a',
          'mist': '#8a8a8a',
          'alert': '#8b0000',
          'warning': '#b8860b',
          'active': '#1e3a5f',
          'success': '#2d5016'
        }
      }
    },
  },
  plugins: [],
};