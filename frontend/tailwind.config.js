/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'forgot-password': 'url("./src/assets/forgotPassword.png")',
      },
      colors: {
        primary:'rgba(252,71,71,1)'
      },
      linearGradients:{
        'primary-to-primaryLight': 'linear-gradient(90deg, rgba(252,71,71,1) 0%, rgba(255,169,169,1) 100%)',
      }
    },
  },
  plugins: [],
}

