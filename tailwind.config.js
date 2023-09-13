/** @type {import('tailwindcss').Config} */
export default {
	content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#00171F',
        'input-stroke': '#003459',
        'button-blue-500': '##00D1FF',
        'button-blue-700': '#00A8E8'
      },
      gridTemplateColumns: {
        'task': 'minmax(88px, 180px) 1fr'
      }
    },
  },
  plugins: [],
}

