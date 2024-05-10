/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["pastel", "dracula"],
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "error-red": "#dc2626",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
