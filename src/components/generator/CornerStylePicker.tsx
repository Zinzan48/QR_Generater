export type CornerSquareType = 'square' | 'extra-rounded' | 'dot'
export type CornerDotType = 'square' | 'dot'

const CORNER_TYPES: { value: CornerSquareType; label: string; symbol: string }[] = [
  { value: 'square', label: 'Square', symbol: '◻' },
  { value: 'extra-rounded', label: 'Rounded', symbol: '◯' },
  { value: 'dot', label: 'Dot', symbol: '◉' },
]

interface CornerStylePickerProps {
  value: CornerSquareType
  onChange: (type: CornerSquareType) => void
}

export function CornerStylePicker({ value, onChange }: CornerStylePickerProps) {
  return (
    <div className="space-y-2">
      <div className="hud-label">corner_style</div>
      <div className="flex gap-2" role="group" aria-label="QR corner style">
        {CORNER_TYPES.map(corner => {
          const isActive = value === corner.value
          return (
            <button
              key={corner.value}
              type="button"
              aria-label={`Corner style: ${corner.label}`}
              aria-pressed={isActive}
              onClick={() => onChange(corner.value)}
              style={{
                flex: 1,
                padding: '0.5rem 0.25rem',
                borderRadius: 'var(--radius-sm)',
                border: isActive ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                background: isActive ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                color: isActive ? 'var(--primary-glow)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }} aria-hidden="true">{corner.symbol}</span>
              <span>{corner.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
