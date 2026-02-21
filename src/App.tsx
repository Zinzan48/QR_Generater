import { useState } from 'react'
import { Header, type TabId } from './components/Header'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme, toggle } = useTheme()
  const [activeTab, setActiveTab] = useState<TabId>('generator')

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-slate-50">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        onThemeToggle={toggle}
      />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div
          id="generator-panel"
          role="tabpanel"
          aria-labelledby="generator-tab"
          hidden={activeTab !== 'generator'}
        >
          {/* Generator tab — implemented next */}
          <p className="font-mono text-brand-green-dark">Generator coming soon…</p>
        </div>
        <div
          id="decoder-panel"
          role="tabpanel"
          aria-labelledby="decoder-tab"
          hidden={activeTab !== 'decoder'}
        >
          {/* Decoder tab — implemented next */}
          <p className="font-mono text-brand-green-dark">Decoder coming soon…</p>
        </div>
      </main>
    </div>
  )
}

export default App
