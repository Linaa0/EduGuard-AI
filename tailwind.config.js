/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060b17',
          900: '#0b132b',
          850: '#111c3a',
          800: '#1c2541',
          700: '#2a3b66',
          600: '#3a508b',
          500: '#4d69ad',
          100: '#e7ecf7',
          50: '#f2f5fc',
        },
        royal: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(11, 19, 43, 0.04), 0 1px 3px rgba(11, 19, 43, 0.06)',
        'card': '0 4px 20px -2px rgba(11, 19, 43, 0.08), 0 2px 6px -1px rgba(11, 19, 43, 0.04)',
        'elevated': '0 20px 25px -5px rgba(11, 19, 43, 0.1), 0 8px 10px -6px rgba(11, 19, 43, 0.05)',
        'glow': '0 0 25px rgba(59, 130, 246, 0.25)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
