import { useState } from 'react'
import { Header, type TabId } from './components/Header'
import { GeneratorTab } from './components/generator/GeneratorTab'
import { DecoderTab } from './components/decoder/DecoderTab'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme, toggle } = useTheme()
  const [activeTab, setActiveTab] = useState<TabId>('generator')

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-deep)', color: 'var(--text)' }}>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        onThemeToggle={toggle}
      />
      <main
        aria-label="QR Forge 應用程式"
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '2rem var(--container-padding)',
        }}
      >
        <div
          id="generator-panel"
          role="tabpanel"
          aria-labelledby="generator-tab"
          hidden={activeTab !== 'generator'}
        >
          <GeneratorTab />
        </div>
        <div
          id="decoder-panel"
          role="tabpanel"
          aria-labelledby="decoder-tab"
          hidden={activeTab !== 'decoder'}
        >
          <DecoderTab />
        </div>
      </main>
    </div>
  )
}

export default App
