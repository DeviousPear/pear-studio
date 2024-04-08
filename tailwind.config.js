/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/editor.js"],
  theme: {
    extend: {
      colors: {
        "darkgray": "#1e1e1e"
      },
      fontSize: {
        "2xs": "0.5rem",
        "3xs": "0.1rem",
      }
    },
  },
  plugins: [],
}

