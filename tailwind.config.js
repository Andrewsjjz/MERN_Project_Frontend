/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{jsx, tsx, js, ts}"],
  theme: {
    extend: {
      colors: {
        green2 : {
          "50" : "#606C5D"
        },
        white2 : {
          "50" : "#FFF4F4"
        },
        black2 : {
          "50" : "#001C30"
        },
        yellow2 : {
          "50" : "#F1C376",
          "100" : "#F7E6C4"
        }
      }
    },
  },
  plugins: [],
}

