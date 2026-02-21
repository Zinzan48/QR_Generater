/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme tokens
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-surface2': '#334155',
        'dark-border': '#475569',
        'dark-muted': '#94A3B8',
        // Light theme tokens
        'light-bg': '#F8FAFC',
        'light-surface': '#FFFFFF',
        'light-surface2': '#F1F5F9',
        'light-border': '#CBD5E1',
        'light-muted': '#475569',
        // Shared
        'brand-green-dark': '#22C55E',
        'brand-green-light': '#16A34A',
        'brand-accent': '#3B82F6',
        'brand-accent-light': '#2563EB',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

