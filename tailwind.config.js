/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#012c32",
        foam: "#f7fbfa",
        mist: "#5f7679",
        line: "#dde6e5",
        seaglass: { DEFAULT: "#6fa8a8", soft: "rgba(111,168,168,0.18)", ink: "#2f6b6e" },
        lagoon: { DEFAULT: "#7ba7c2", soft: "rgba(123,167,194,0.18)", ink: "#3d6680" },
        seafoam: { DEFAULT: "#8dbfae", soft: "rgba(141,191,174,0.18)", ink: "#2f6b57" },
        tide: { DEFAULT: "#9bb4d4", soft: "rgba(155,180,212,0.18)", ink: "#44618a" },
      },
      fontFamily: {
        sans: ['"Geist"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      keyframes: {
        sonar: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
      },
      animation: { sonar: "sonar 2s ease-out infinite" },
    },
  },
  plugins: [],
}
