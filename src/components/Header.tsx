import { ThemeToggle } from './ThemeToggle'
import type { Theme } from '../hooks/useTheme'

export type TabId = 'generator' | 'decoder'

interface HeaderProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  theme: Theme
  onThemeToggle: () => void
}

export function Header({ activeTab, onTabChange, theme, onThemeToggle }: HeaderProps) {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'generator', label: 'Generator' },
    { id: 'decoder', label: 'Decoder' },
  ]

  return (
    <header className="
      sticky top-0 z-50
      bg-light-surface/90 dark:bg-dark-surface/90
      backdrop-blur-md
      border-b border-light-border dark:border-dark-border
    ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <svg
            width="28" height="28" viewBox="0 0 28 28" fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* QR code icon — simplified geometric representation */}
            <rect x="2" y="2" width="10" height="10" rx="2" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="4" y="4" width="6" height="6" rx="1" className="fill-light-bg dark:fill-dark-bg" />
            <rect x="5" y="5" width="4" height="4" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="16" y="2" width="10" height="10" rx="2" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="18" y="4" width="6" height="6" rx="1" className="fill-light-bg dark:fill-dark-bg" />
            <rect x="19" y="5" width="4" height="4" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="2" y="16" width="10" height="10" rx="2" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="4" y="18" width="6" height="6" rx="1" className="fill-light-bg dark:fill-dark-bg" />
            <rect x="5" y="19" width="4" height="4" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="16" y="16" width="3" height="3" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="22" y="16" width="3" height="3" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="16" y="22" width="3" height="3" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="22" y="22" width="3" height="3" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
            <rect x="19" y="19" width="3" height="3" rx="0.5" className="fill-brand-green-dark dark:fill-brand-green-dark" />
          </svg>
          <span className="font-mono text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 select-none">
            QR<span className="text-brand-green-dark dark:text-brand-green-dark">Forge</span>
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-1" role="tablist" aria-label="App sections">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => onTabChange(tab.id)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer
                transition-colors duration-150
                focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-1
                focus:ring-offset-light-surface dark:focus:ring-offset-dark-surface
                ${activeTab === tab.id
                  ? 'bg-brand-green-dark text-white dark:bg-brand-green-dark dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-light-surface2 dark:hover:bg-dark-surface2'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
    </header>
  )
}
