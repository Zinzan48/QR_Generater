import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        flex items-center justify-center
        w-9 h-9 rounded-lg
        bg-light-surface2 dark:bg-dark-surface2
        border border-light-border dark:border-dark-border
        text-slate-600 dark:text-slate-300
        hover:bg-light-border dark:hover:bg-dark-border
        hover:text-slate-900 dark:hover:text-slate-50
        transition-colors duration-200 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2
        focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg
      "
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={2} />
      ) : (
        <Moon size={18} strokeWidth={2} />
      )}
    </button>
  )
}
