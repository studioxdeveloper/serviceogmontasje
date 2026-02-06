import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Service og Montasje brand colors from profilguide
        brand: {
          dark: '#003630',      // Mørk grønn - primær
          DEFAULT: '#008170',   // Logofarge - teal
          light: '#9cd0b8',     // Lys grønn
          bg: '#e4f3f7',        // Bakgrunn - lys blå
          50: '#e4f3f7',
          100: '#c8e7ef',
          200: '#9cd0b8',
          300: '#70b99a',
          400: '#44a27c',
          500: '#008170',
          600: '#006b5d',
          700: '#00554a',
          800: '#003630',
          900: '#002520',
        },
        // Semantic colors
        warning: {
          50: '#fff8eb',
          100: '#fef0d7',
          200: '#fde1ae',
          300: '#f2ac6f',      // Lys oransje from guide
          400: '#f09819',      // Oransje from guide
          500: '#e88b00',
          600: '#cc6a00',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 54, 48, 0.08)',
        'medium': '0 4px 12px -4px rgba(0, 54, 48, 0.12)',
        'large': '0 8px 24px -8px rgba(0, 54, 48, 0.16)',
      },
    },
  },
  plugins: [],
}
export default config
