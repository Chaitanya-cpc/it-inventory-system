/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        border: "#0A1114",
        input: "#0A1114",
        ring: "#00FFFF",
        background: "#000000",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#00FFFF",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#0A1114",
          foreground: "#00FFFF",
          100: "#0A1114",
          200: "#0C1519",
          300: "#0E191E",
          400: "#101D23",
          500: "#122128",
          600: "#14252D",
          700: "#162932",
          800: "#182D37",
          900: "#1A313C",
        },
        destructive: {
          DEFAULT: "#FF0000",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1A313C",
          foreground: "#CCCCCC",
        },
        accent: {
          DEFAULT: "#007FFF",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#0A1114",
          foreground: "#FFFFFF",
        },
        // Tron Legacy Theme Colors
        'tron-black': '#000000',
        'tron-darkblue': '#0A1114',
        'tron-blue': '#007FFF',
        'tron-cyan': '#00FFFF',
        'tron-green': '#00FF00',
        'tron-orange': '#FF9000',
        'tron-red': '#FF0000',
        'tron-yellow': '#FFFF00',
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.3rem",
        sm: "0.1rem",
      },
      boxShadow: {
        'tron-glow': '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)',
        'tron-blue-glow': '0 0 10px rgba(0, 127, 255, 0.7), 0 0 20px rgba(0, 127, 255, 0.5), 0 0 30px rgba(0, 127, 255, 0.3)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "tron-pulse": {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.6,
          },
        },
        "fade-in": {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        "fade-out": {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        "slide-in-right": {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        "slide-out-right": {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "tron-pulse": "tron-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-in",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-in",
      },
      transitionDelay: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 