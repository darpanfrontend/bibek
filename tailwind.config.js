/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent:'transparent',
      white:'#ffffff',
      gray: {
        50: "#E8E7E6",
        100: "#D1CFCC",
        200: "#BAB7B3",
        300: "#A39F99",
        400: "#8C8880",
        500: "#757066",
        600: "#5E584D",
        700: "#474033",
        800: "#30281A",
        900: "#191000",
        1000: "#020200"
      },
      orange:{
        50: "#FFF5E6",
        100: "#FFECCC",
        200: "#FFE2B3",
        300: "#FFD999",
        400: "#FFCF80",
        500: "#FFC566",
        600: "#FFBC4D",
        700: "#FFB233",
        800: "#FFA91A",
        900: "#FF9F00",
      },
      green:'#0b704e'
    },
    extend: {
      keyframes: {
        textReveal: {
          '0%': {
            'opacity': '0',
            'transform': 'translateY(10px)',
          },
          '100%': {
            'opacity': '1',
            'transform': 'translateY(0)',
          }
        }
      },
      keyframes: {
          zoom: {
              '0%': { 'scale': '100%' },
              '50%': { 'scale': '103%' },
              '100%': { 'scale': '100%' },
          }
      },
      animation: {
        'spin-slow': 'spin 20s cubic-bezier(0.280, 0.840, 0.420, 1) infinite both',
        'text-reveal': 'textReveal 0.5s ease-in-out forwards',
        'zoom': 'zoom 5s cubic-bezier(0.280, 0.840, 0.420, 1) infinite both',
      }
    }
  },
  plugins: [],
}
