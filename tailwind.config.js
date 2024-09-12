/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  safelist: [
    {
      pattern:
        /bg-(red|orange|yellow|green|teal|blue|indigo|purple|pink|gray)-(500|600|700|800)/,
    },
    {
      pattern:
        /bg-(red|orange|yellow|green|teal|blue|indigo|purple|pink|gray)-(500|600|700|800)\/80/,
      variants: ["hover"],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
