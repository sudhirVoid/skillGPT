/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px', // Small screen, for devices like phones
        md: '768px', // Medium screen, for tablets
        lg: '1024px', // Large screen, for desktops
        xl: '1280px', // Extra large screen
      },
    },
  },
  plugins: [],
}

