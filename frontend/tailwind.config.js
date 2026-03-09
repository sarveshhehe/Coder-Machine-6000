/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#1a1a1a',
        'surface-hover': '#2a2a2a',
        border: '#2a2a2a',
        primary: '#e0e0e0',
        secondary: '#a0a0a0',
        accent: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 1.2s infinite',
      },
      keyframes: {
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0px)' },
          '30%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
