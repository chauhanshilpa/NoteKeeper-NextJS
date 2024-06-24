/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./page/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "0px",
        // => @media (min-width: 0px) { ... }

        xs: "400px",
        // => @media (min-width: 400px) { ... }
      },
    },
  },
  plugins: [],
};
