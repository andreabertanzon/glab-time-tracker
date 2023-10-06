/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'container-dark': '#1E1E1E',
        'container-blue': '#C8E3E4',
        'card-dark': '#414141'
      },
      textColor: {
        'container-dark': '#414141'
      }
    }
  },
  plugins: []
}
