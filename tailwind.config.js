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
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".clamp-2": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          "text-overflow": "ellipsis",
          "-webkit-line-clamp": "2",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
