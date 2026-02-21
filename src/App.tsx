import { lazy, Suspense, useState } from 'react'
import { Header, type TabId } from './components/Header'
import { GeneratorTab } from './components/generator/GeneratorTab'
import { useTheme } from './hooks/useTheme'
import './App.css'

const DecoderTab = lazy(async () => {
  const mod = await import('./components/decoder/DecoderTab')
  return { default: mod.DecoderTab }
})

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
        <section aria-label="QR Forge 介紹" style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.15rem, 2.6vw, 1.75rem)',
              color: 'var(--text)',
              marginBottom: '0.5rem',
            }}
          >
            QR Forge 免費 QR Code 產生器與解碼器
          </h1>
          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            支援快速產生、樣式自訂、中央 Logo 與圖片解碼，所有功能皆可直接在瀏覽器完成。
          </p>
        </section>

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
          {activeTab === 'decoder' ? (
            <Suspense
              fallback={
                <p
                  style={{
                    color: 'var(--text-dim)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  // 載入解碼器中...
                </p>
              }
            >
              <DecoderTab />
            </Suspense>
          ) : null}
        </div>
      </main>
    </div>
  )
}

export default App
