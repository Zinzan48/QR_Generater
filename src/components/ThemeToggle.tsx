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
      aria-label={theme === 'dark' ? '切換至淺色模式' : '切換至深色模式'}
      title={theme === 'dark' ? '切換至淺色模式' : '切換至深色模式'}
      className="hud-btn flex items-center gap-1.5 px-3 py-1.5 cursor-pointer"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {theme === 'dark'
          ? <Sun size={14} strokeWidth={2} aria-hidden="true" />
          : <Moon size={14} strokeWidth={2} aria-hidden="true" />
        }
        <span className="text-xs hidden sm:inline">
          {theme === 'dark' ? '淺色' : '深色'}
        </span>
      </span>
    </button>
  )
}
