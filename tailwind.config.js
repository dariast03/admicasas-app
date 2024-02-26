const Colors = require("./src/constants/Colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        primario: {
          50: Colors.default.primario[50],
          100: Colors.default.primario[100],
          200: Colors.default.primario[200],
          300: Colors.default.primario[300],
          400: Colors.default.primario[400],
          500: Colors.default.primario[500],
          600: Colors.default.primario[600],
          700: Colors.default.primario[700],
          800: Colors.default.primario[800],
          900: Colors.default.primario[900],
          950: Colors.default.primario[950],
          dark: Colors.default.primario[950],
        },
      },
    },
  },
  plugins: [],
};
