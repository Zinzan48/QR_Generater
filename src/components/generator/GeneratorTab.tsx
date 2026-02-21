import { useState } from 'react'
import { RotateCcw, RefreshCw } from 'lucide-react'
import { TextInput } from './TextInput'
import { ErrorCorrectionPicker, type ErrorCorrectionLevel } from './ErrorCorrectionPicker'
import { SizePicker } from './SizePicker'
import { DotStylePicker, type DotType } from './DotStylePicker'
import { CornerStylePicker, type CornerSquareType } from './CornerStylePicker'
import { ColorPicker } from './ColorPicker'
import { LogoUploader } from './LogoUploader'
import { DownloadButtons } from './DownloadButtons'
import { Collapsible } from './Collapsible'
import { useQrPreviewRef } from './QrPreview'
import type { QrOptions } from '../../hooks/useQrGenerator'

const STYLE_DEFAULTS = {
  errorLevel: 'M' as ErrorCorrectionLevel,
  size: 300,
  dotType: 'rounded' as DotType,
  cornerType: 'extra-rounded' as CornerSquareType,
  dotColor: '#000000',
  bgColor: '#ffffff',
  logoUrl: null as string | null,
}

export function GeneratorTab() {
  const [text, setText] = useState('https://example.com')
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>(STYLE_DEFAULTS.errorLevel)
  const [size, setSize] = useState(STYLE_DEFAULTS.size)
  const [dotType, setDotType] = useState<DotType>(STYLE_DEFAULTS.dotType)
  const [cornerType, setCornerType] = useState<CornerSquareType>(STYLE_DEFAULTS.cornerType)
  const [dotColor, setDotColor] = useState(STYLE_DEFAULTS.dotColor)
  const [bgColor, setBgColor] = useState(STYLE_DEFAULTS.bgColor)
  const [logoUrl, setLogoUrl] = useState<string | null>(STYLE_DEFAULTS.logoUrl)

  const resetStyle = () => {
    setErrorLevel(STYLE_DEFAULTS.errorLevel)
    setSize(STYLE_DEFAULTS.size)
    setDotType(STYLE_DEFAULTS.dotType)
    setCornerType(STYLE_DEFAULTS.cornerType)
    setDotColor(STYLE_DEFAULTS.dotColor)
    setBgColor(STYLE_DEFAULTS.bgColor)
    setLogoUrl(STYLE_DEFAULTS.logoUrl)
  }

  const resetAll = () => {
    setText('https://example.com')
    resetStyle()
  }

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

  const { containerRef, download, getBlob } = useQrPreviewRef(options)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
      {/* Left — Controls */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        {/* Section 01: Content — always visible */}
        <section className="space-y-3" aria-label="QR 內容輸入">
          <div className="hud-label">01 / 輸入內容</div>
          <TextInput value={text} onChange={setText} />
        </section>

        <div className="hud-divider" />

        {/* Section 02: Basic Settings — collapsible, open by default */}
        <section aria-label="QR 基本設定">
          <Collapsible label="02 / 基本設定" defaultOpen>
            <ErrorCorrectionPicker value={errorLevel} onChange={setErrorLevel} />
            <SizePicker value={size} onChange={setSize} />
          </Collapsible>
        </section>

        <div className="hud-divider" />

        {/* Section 03: Style — collapsible, closed by default */}
        <section aria-label="QR 外觀樣式">
          <Collapsible label="03 / 外觀樣式">
            <DotStylePicker value={dotType} onChange={setDotType} />
            <CornerStylePicker value={cornerType} onChange={setCornerType} />
            <ColorPicker
              dotColor={dotColor}
              bgColor={bgColor}
              onDotColorChange={setDotColor}
              onBgColorChange={setBgColor}
            />
          </Collapsible>
        </section>

        <div className="hud-divider" />

        {/* Section: Logo — collapsible, closed by default */}
        <section aria-label="中央 Logo">
          <Collapsible label="04 / 中央 Logo">
            <LogoUploader logoUrl={logoUrl} onLogoChange={setLogoUrl} />
          </Collapsible>
        </section>

        <div className="hud-divider" />

        {/* Reset actions */}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={resetStyle}
            aria-label="恢復預設風格設定"
            className="hud-btn flex items-center gap-1.5"
            style={{ padding: '0.4rem 0.875rem', fontSize: '0.75rem' }}
          >
            <RotateCcw size={12} aria-hidden="true" />
            預設風格
          </button>
          <button
            type="button"
            onClick={resetAll}
            aria-label="重新開始，清除所有設定"
            className="hud-btn flex items-center gap-1.5"
            style={{ padding: '0.4rem 0.875rem', fontSize: '0.75rem', borderColor: 'rgba(239,68,68,0.35)', color: 'rgba(252,165,165,0.9)' }}
          >
            <RefreshCw size={12} aria-hidden="true" />
            重新開始
          </button>
        </div>
      </div>

      {/* Right — Preview (sticky on large screens) */}
      <div className="lg:w-80 xl:w-96 order-first lg:order-last">
        <div className="preview-sticky space-y-2">
          <div className="hud-label">即時預覽</div>
          <div className="hud-frame-4c" style={{ borderRadius: 'var(--radius-lg)', padding: '2px' }}>
            <div
              className="flex items-center justify-center"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
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
          </div>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            // 即時自動更新
          </p>
          <div className="beam-border">
            <div className="beam-border-inner">
              <DownloadButtons onDownload={download} getBlob={getBlob} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
