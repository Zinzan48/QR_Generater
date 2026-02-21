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
    { id: 'generator', label: 'generator' },
    { id: 'decoder', label: 'decoder' },
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
          className="font-mono text-[var(--text)] hover:text-[var(--primary)] transition-colors shrink-0 select-none"
          style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', textDecoration: 'none' }}
          aria-label="QR Forge home"
        >
          <span style={{ color: 'var(--primary)' }}>&lt;</span>
          QRForge
          <span style={{ color: 'var(--text-dim)' }}> /&gt;</span>
        </a>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1" role="tablist" aria-label="App sections">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => onTabChange(tab.id)}
              className="nav-tab-btn cursor-pointer"
              style={{
                padding: '0.4rem 0.875rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.02em',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === tab.id ? 'var(--primary-dim)' : 'transparent',
                color: activeTab === tab.id ? 'var(--primary-glow)' : 'var(--text-muted)',
                transition: 'color var(--transition-fast), background var(--transition-fast)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.id) {
                  ;(e.target as HTMLElement).style.color = 'var(--text)'
                  ;(e.target as HTMLElement).style.background = 'var(--primary-dim)'
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.id) {
                  ;(e.target as HTMLElement).style.color = 'var(--text-muted)'
                  ;(e.target as HTMLElement).style.background = 'transparent'
                }
              }}
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
