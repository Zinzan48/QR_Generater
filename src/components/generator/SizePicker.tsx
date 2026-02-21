interface SizePickerProps {
  value: number
  onChange: (size: number) => void
}

export function SizePicker({ value, onChange }: SizePickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="hud-label">size</div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary-glow)' }}>
          {value}px
        </span>
      </div>
      <input
        id="qr-size"
        type="range"
        min={200}
        max={600}
        step={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
        aria-label={`QR code size: ${value} pixels`}
      />
      <div className="flex justify-between" style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
        <span>200px</span>
        <span>600px</span>
      </div>
    </div>
  )
}
