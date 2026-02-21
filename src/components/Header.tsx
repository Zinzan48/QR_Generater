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
      {/* Row 1 — always visible: Logo + (desktop tabs) + author + ThemeToggle */}
      <div
        className="flex items-center gap-4 px-[var(--container-padding)] h-14"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        {/* Logo */}
        <a
          href="#"
          className="nav-logo font-mono shrink-0 select-none"
          aria-label="QR Forge home"
        >
          <span className="nav-logo-bracket">&lt;</span>
          QRForge
          <span className="nav-logo-slash"> /&gt;</span>
        </a>

        {/* Tab Navigation — desktop only (inline) */}
        <nav className="hidden sm:flex items-center gap-1" role="tablist" aria-label="功能頁籤">
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

        <div className="flex-1" />

        {/* Author — desktop only */}
        <a
          href="https://www.zinzan.info"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="關於作者 Zinzan"
          className="hidden sm:flex nav-tab items-center"
          style={{ fontSize: '0.78rem', opacity: 0.75, textDecoration: 'none' }}
        >
          // 作者
        </a>

        {/* Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>

      {/* Row 2 — mobile only: full-width tab bar */}
      <nav
        className="flex sm:hidden"
        role="tablist"
        aria-label="功能頁籤"
        style={{ borderTop: '1px solid var(--glass-border)' }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab-mobile`}
            onClick={() => onTabChange(tab.id)}
            className="nav-tab cursor-pointer flex-1 text-center"
            style={{ borderRadius: 0, padding: '0.6rem 0' }}
            data-active={activeTab === tab.id ? 'true' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
