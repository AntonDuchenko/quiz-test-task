/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    transitionDuration: {
      DEFAULT: "300ms",
    },
    extend: {
      fontFamily: {
        'sans': ['"Lato"'],
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
