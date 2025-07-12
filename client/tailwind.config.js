/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0A192F",
        "secondary": "#F97316",
        "tertairy": "#54D6BB",
      },
      screens: {

        'lg': { 'max': '1023px' },
        // => @media (max-width: 1023px) { ... }



        'sm': { 'max': '639px' },
        // => @media (max-width: 639px) { ... }
      }


    },
    plugins: [],
  }
}
