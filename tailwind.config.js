/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ECBE07',
        dark: '#004040',
        lightGray: '#ddd',
        darkGray: '#333333',
        mediumGray: '#777777',
        deepNavy: '#0a1128',
        'green-teal': '#008080',
        'green-teal-dark': '#006666',
        green: {
          500: 'green-500',
          700: 'green-700',
        },
        blue: {
          500: 'blue-500',
          700: 'blue-700',
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out forwards',
        slideUpFade: 'slideUpFade 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
