/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      rob: ['Roboto', 'Arial', 'sans-serif'],
      pop: ['Poppins', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}
