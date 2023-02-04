/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#091b18",
        "body-lighter": "#0a1f1c",
      },
      backgroundImage: {
        lotteryLogin: "url('/images/background.png')",
      },
    },
  },
  plugins: [],
};
