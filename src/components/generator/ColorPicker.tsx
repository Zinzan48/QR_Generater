interface ColorPickerProps {
  dotColor: string
  bgColor: string
  onDotColorChange: (color: string) => void
  onBgColorChange: (color: string) => void
}

export function ColorPicker({ dotColor, bgColor, onDotColorChange, onBgColorChange }: ColorPickerProps) {
  const swatch = {
    width: '2rem',
    height: '2rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--glass-border)',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
  }

  return (
    <div className="space-y-2">
      <div className="hud-label">colors</div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="dot-color" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
            dots
          </label>
          <div style={swatch}>
            <input
              id="dot-color"
              type="color"
              value={dotColor}
              onChange={e => onDotColorChange(e.target.value)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              aria-label="QR dot color"
            />
            <div style={{ width: '100%', height: '100%', background: dotColor }} aria-hidden="true" />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', width: '4rem' }}>{dotColor}</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="bg-color" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
            bg
          </label>
          <div style={swatch}>
            <input
              id="bg-color"
              type="color"
              value={bgColor}
              onChange={e => onBgColorChange(e.target.value)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              aria-label="QR background color"
            />
            <div style={{ width: '100%', height: '100%', background: bgColor }} aria-hidden="true" />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', width: '4rem' }}>{bgColor}</span>
        </div>
      </div>
    </div>
  )
}
