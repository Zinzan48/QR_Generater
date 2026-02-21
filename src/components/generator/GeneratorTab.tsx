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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
      {/* Left — Controls */}
      <div className="glass-card p-6 space-y-6">
        {/* Section: Content */}
        <section className="space-y-4">
          <div className="hud-label" style={{ marginBottom: '0.75rem' }}>01 / input</div>
          <TextInput value={text} onChange={setText} />
        </section>

        <div className="hud-divider" />

        {/* Section: Basic Settings */}
        <section className="space-y-4">
          <div className="hud-label" style={{ marginBottom: '0.75rem' }}>02 / settings</div>
          <ErrorCorrectionPicker value={errorLevel} onChange={setErrorLevel} />
          <SizePicker value={size} onChange={setSize} />
        </section>

        <div className="hud-divider" />

        {/* Section: Style */}
        <section className="space-y-4">
          <div className="hud-label" style={{ marginBottom: '0.75rem' }}>03 / style</div>
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

        {/* Section: Logo */}
        <section>
          <LogoUploader logoUrl={logoUrl} onLogoChange={setLogoUrl} />
        </section>

        <div className="hud-divider" />

        {/* Section: Download */}
        <section>
          <DownloadButtons onDownload={download} />
        </section>
      </div>

      {/* Right — Preview (sticky on desktop) */}
      <div className="lg:w-80 xl:w-96">
        <div
          style={{ position: 'sticky', top: '4.5rem' }}
          className="space-y-3"
        >
          <div className="hud-label">live_preview</div>
          <div
            className="hud-frame flex items-center justify-center p-6"
            style={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
              minHeight: '320px',
            }}
          >
            <div
              ref={containerRef}
              role="img"
              aria-label="QR Code Preview"
              style={{ lineHeight: 0 }}
            />
          </div>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            // updates automatically
          </p>
        </div>
      </div>
    </div>
  )
}
