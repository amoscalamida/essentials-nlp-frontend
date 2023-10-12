/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['freight-sans-pro', 'Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        sand: { 500: "#EBE3C9" },
      }
    },
  },
  plugins: [],
}

