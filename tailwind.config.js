/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      screens: {
        print: {raw: 'print'},
        screen: {raw: 'screen'},
      }
    }
  }
}

