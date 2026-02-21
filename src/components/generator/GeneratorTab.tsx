import { useState } from 'react'
import { TextInput } from './TextInput'
import { ErrorCorrectionPicker, type ErrorCorrectionLevel } from './ErrorCorrectionPicker'
import { SizePicker } from './SizePicker'
import { DotStylePicker, type DotType } from './DotStylePicker'
import { CornerStylePicker, type CornerSquareType } from './CornerStylePicker'
import { ColorPicker } from './ColorPicker'
import { LogoUploader } from './LogoUploader'
import { DownloadButtons } from './DownloadButtons'
import { useQrPreviewRef } from './QrPreview'
import type { QrOptions } from '../../hooks/useQrGenerator'

export function GeneratorTab() {
  const [text, setText] = useState('https://example.com')
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M')
  const [size, setSize] = useState(300)
  const [dotType, setDotType] = useState<DotType>('rounded')
  const [cornerType, setCornerType] = useState<CornerSquareType>('extra-rounded')
  const [dotColor, setDotColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  const options: QrOptions = {
    data: text,
    size,
    errorCorrectionLevel: errorLevel,
    dotType,
    cornerSquareType: cornerType,
    dotColor,
    bgColor,
    logoUrl,
  }

  const { containerRef, download } = useQrPreviewRef(options)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
      {/* Left — Controls */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        {/* Section: Content */}
        <section className="space-y-3" aria-label="QR 內容輸入">
          <div className="hud-label">01 / 輸入內容</div>
          <TextInput value={text} onChange={setText} />
        </section>

        <div className="hud-divider" />

        {/* Section: Basic Settings */}
        <section className="space-y-3" aria-label="QR 基本設定">
          <div className="hud-label">02 / 基本設定</div>
          <ErrorCorrectionPicker value={errorLevel} onChange={setErrorLevel} />
          <SizePicker value={size} onChange={setSize} />
        </section>

        <div className="hud-divider" />

        {/* Section: Style */}
        <section className="space-y-3" aria-label="QR 外觀樣式">
          <div className="hud-label">03 / 外觀樣式</div>
          <DotStylePicker value={dotType} onChange={setDotType} />
          <CornerStylePicker value={cornerType} onChange={setCornerType} />
          <ColorPicker
            dotColor={dotColor}
            bgColor={bgColor}
            onDotColorChange={setDotColor}
            onBgColorChange={setBgColor}
          />
        </section>

        <div className="hud-divider" />

        {/* Section: Logo + Download (combined on mobile for quick access) */}
        <section className="space-y-4" aria-label="Logo 與匯出">
          <LogoUploader logoUrl={logoUrl} onLogoChange={setLogoUrl} />
          <div className="hud-divider" />
          <DownloadButtons onDownload={download} />
        </section>
      </div>

      {/* Right — Preview (sticky on large screens) */}
      <div className="lg:w-80 xl:w-96 order-first lg:order-last">
        <div style={{ position: 'sticky', top: '4rem' }} className="space-y-2">
          <div className="hud-label">即時預覽</div>
          <div
            className="hud-frame flex items-center justify-center"
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              minHeight: '280px',
            }}
          >
            <div
              ref={containerRef}
              role="img"
              aria-label="QR Code 即時預覽 — 設定變更時自動更新"
              style={{ lineHeight: 0, maxWidth: '100%', overflow: 'hidden' }}
            />
          </div>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            // 即時自動更新
          </p>
        </div>
      </div>
    </div>
  )
}
