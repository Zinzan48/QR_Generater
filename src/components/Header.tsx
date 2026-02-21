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
    { id: 'generator', label: '產生器' },
    { id: 'decoder', label: '解碼器' },
  ]

  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav
        className="flex items-center gap-6 px-[var(--container-padding)] h-14"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        {/* Logo — Zinzan code bracket style */}
        <a
          href="#"
          className="nav-logo font-mono shrink-0 select-none"
          aria-label="QR Forge home"
        >
          <span className="nav-logo-bracket">&lt;</span>
          QRForge
          <span className="nav-logo-slash"> /&gt;</span>
        </a>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1" role="tablist" aria-label="功能頁籤">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => onTabChange(tab.id)}
              className="nav-tab cursor-pointer"
              data-active={activeTab === tab.id ? 'true' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </nav>
    </header>
  )
}
