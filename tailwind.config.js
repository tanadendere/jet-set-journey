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
    extend: {
      fontFamily: {
        lato: ['"Lato"'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
