/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { min: "360px", max: "640px" },
      // => @media (min-width: 640px) { ... }

      md: { min: "640px", max: "1024px" },
      // => @media (min-width: 768px) { ... }

      lg: { min: "1024px", max: "1280px" },
      // => @media (min-width: 1024px) { ... }

      xl: { min: "1280px", max: "1536px" },
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
    },
  },
  plugins: [],
};
