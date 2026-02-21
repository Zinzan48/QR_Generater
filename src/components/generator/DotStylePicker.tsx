export type DotType = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded'

const DOT_TYPES: { value: DotType; label: string; preview: string }[] = [
  { value: 'square', label: 'Square', preview: '■■■\n■■■\n■■■' },
  { value: 'rounded', label: 'Rounded', preview: '●●●\n●●●\n●●●' },
  { value: 'dots', label: 'Dots', preview: '•••\n•••\n•••' },
  { value: 'classy', label: 'Classy', preview: '▪▪▪\n▪▪▪\n▪▪▪' },
  { value: 'classy-rounded', label: 'Classy+', preview: '◆◆◆\n◆◆◆\n◆◆◆' },
  { value: 'extra-rounded', label: 'XL Round', preview: '⬤⬤⬤\n⬤⬤⬤\n⬤⬤⬤' },
]

interface DotStylePickerProps {
  value: DotType
  onChange: (type: DotType) => void
}

export function DotStylePicker({ value, onChange }: DotStylePickerProps) {
  return (
    <div className="space-y-2">
      <div className="hud-label">dot_style</div>
      <div className="grid grid-cols-3 gap-2" role="group" aria-label="QR dot style">
        {DOT_TYPES.map(dot => {
          const isActive = value === dot.value
          return (
            <button
              key={dot.value}
              type="button"
              title={dot.label}
              aria-label={`Dot style: ${dot.label}`}
              aria-pressed={isActive}
              onClick={() => onChange(dot.value)}
              style={{
                padding: '0.5rem 0.25rem',
                borderRadius: 'var(--radius-sm)',
                border: isActive ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                background: isActive ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                color: isActive ? 'var(--primary-glow)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all var(--transition-fast)',
              }}
            >
              <div
                className="whitespace-pre select-none"
                style={{ fontSize: '0.6rem', lineHeight: 1.2 }}
                aria-hidden="true"
              >
                {dot.preview}
              </div>
              <div style={{ marginTop: '0.2rem' }}>{dot.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
