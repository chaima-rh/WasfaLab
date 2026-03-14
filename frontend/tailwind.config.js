/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // هادي مهمة باش Tailwind يلقا الكلاسات في الكود ديالك
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C05621',
        'primary-dark': '#9A3E18',
        'primary-light': '#FBE7D5',
        dark: '#1F2937',
        light: '#F9FAFB',
      },
      boxShadow: {
        soft: '0 14px 40px rgba(194, 86, 33, 0.16)',
      },
    },
  },
  plugins: [],
}