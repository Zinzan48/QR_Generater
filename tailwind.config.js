/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS variable-based tokens — auto-adapts with data-theme
        'bg-deep':    'var(--bg-deep)',
        'bg-surface': 'var(--bg-surface)',
        'bg-card':    'var(--bg-card)',
        'bg-elevated':'var(--bg-elevated)',
        'primary':       'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-glow':  'var(--primary-glow)',
        'primary-dim':   'var(--primary-dim)',
        'glass-border':  'var(--glass-border)',
        'accent-green':  'var(--accent-green)',
        'text-main':     'var(--text)',
        'text-secondary':'var(--text-secondary)',
        'text-muted':    'var(--text-muted)',
        'text-dim':      'var(--text-dim)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', '"Cascadia Code"', '"Fira Code"', 'monospace'],
        sans: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card':      'var(--card-shadow)',
        'card-hover':'var(--card-shadow-hover)',
        'glow':      '0 0 20px var(--primary-dim)',
        'glow-lg':   '0 0 40px rgba(59, 130, 246, 0.25)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}

