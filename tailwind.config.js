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
        // border: "hsl(var(--border))",
        // input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
        // muted: {
        //   DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        // },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },
        // card: {
        //   DEFAULT: "hsl(var(--card))",
        //   foreground: "hsl(var(--card-foreground))",
        // },
        // "border-dark": "hsl(var(--border-dark))",
        // "input-dark": "hsl(var(--input-dark))",
        // "ring-dark": "hsl(var(--ring-dark))",
        // "background-dark": "hsl(var(--background-dark))",
        // "foreground-dark": "hsl(var(--foreground-dark))",
        // "primary-dark": {
        //   DEFAULT: "hsl(var(--primary-dark))",
        //   foreground: "hsl(var(--primary-foreground-dark))",
        // },
        // "secondary-dark": {
        //   DEFAULT: "hsl(var(--secondary-dark))",
        //   foreground: "hsl(var(--secondary-foreground-dark))",
        // },
        // "destructive-dark": {
        //   DEFAULT: "hsl(var(--destructive-dark))",
        //   foreground: "hsl(var(--destructive-foreground-dark))",
        // },
        // "muted-dark": {
        //   DEFAULT: "hsl(var(--muted-dark))",
        //   foreground: "hsl(var(--muted-foreground-dark))",
        // },
        // "accent-dark": {
        //   DEFAULT: "hsl(var(--accent-dark))",
        //   foreground: "hsl(var(--accent-foreground-dark))",
        // },
        // "popover-dark": {
        //   DEFAULT: "hsl(var(--popover-dark))",
        //   foreground: "hsl(var(--popover-foreground-dark))",
        // },
        // "card-dark": {
        //   DEFAULT: "hsl(var(--card-dark))",
        //   foreground: "hsl(var(--card-foreground-dark))",
        // },
      },
    },
  },
  plugins: [],
};
