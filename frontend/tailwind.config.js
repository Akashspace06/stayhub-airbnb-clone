/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          500: '#f43f5e',
          600: '#e11d48',
        }
      }
    },
  },
  plugins: [],
}
