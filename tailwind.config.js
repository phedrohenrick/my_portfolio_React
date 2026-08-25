/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html",

  ],
  theme: {
    extend: {
      colors: {
        primary: "#012c32",
        secondary: "#fbf5df",
        accent: "#E67E22",
        muted: "#8ca0a2",
      },
      fontFamily: {
        sans: ['"Montserrat"', '"Segoe UI"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
}

