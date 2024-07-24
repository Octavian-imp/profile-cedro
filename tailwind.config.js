/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/scss/**/*.scss"],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: "343px",
          xl: "1205px",
        },
      },
      screens: {
        sm: "343px",
        xl: "1205px",
      },
      fontFamily: {
        times: `'Times New Roman', Times, serif`,
        roboto: `"Roboto", sans-serif`,
      },
      colors: {
        danger: "#eb5757",
        "danger-light": "#c07474",
        brown: "#c08d74",
        gold: "#d0bc7a",
        "orange-light": "#ea976f",
        dark: "#21242e",
        gray: "#f7f7f7",
        "gray-dark": "#e4e4e4",
      },
      textColor: {
        // dark: "rgba(0, 0, 0, 0.48)",
      },
      borderRadius: {
        xs: "0.25rem",
      },
      borderColor: {
        "primary-dark": "#e4e4e4",
        primary: "#f7f7f7",
      },
      fontSize: {
        "8xl": [
          "5rem",
          {
            lineHeight: "5rem",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
