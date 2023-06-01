/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark-primary": "#101010",
        "dark-secondary": "#141417",
        "light-primary": "#FFFCFC",
        "light-secondary": "#E5E5E5",
      }
    },
  },
  plugins: [],
}
