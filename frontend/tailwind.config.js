/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Make sure dark mode is enabled
  theme: {
    extend: {
      // PASTE THE CODE BELOW INTO YOUR FILE
      colors: {
        'primary': '#ffffff',
        'secondary': '#1F1F1F',
        'accent-red': '#FF6B6B',
        'accent-yellow': '#FFD93D',
        'accent-green': '#6BCB77',
        'accent-blue': '#4D96FF',
        'accent-purple': '#9B5DE5',
        'accent-pink': '#F15BB5',
        'accent-orange': '#FF6A00',
        'text-primary': '#ffffff',
        'text-secondary': '#E5E5E5',
        'text-dark': '#1F1F1F',
        'bg-dark': '#1F1F1F',
        'bg-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
}