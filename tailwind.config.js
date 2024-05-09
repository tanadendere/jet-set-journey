/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["pastel", "dracula"],
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
