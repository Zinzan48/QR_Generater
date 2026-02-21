export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

const LEVELS: { value: ErrorCorrectionLevel; label: string; description: string }[] = [
  { value: 'L', label: 'L', description: '7% — Best for clean environments' },
  { value: 'M', label: 'M', description: '15% — Recommended default' },
  { value: 'Q', label: 'Q', description: '25% — Good for logos' },
  { value: 'H', label: 'H', description: '30% — Best with center logo' },
]

interface ErrorCorrectionPickerProps {
  value: ErrorCorrectionLevel
  onChange: (level: ErrorCorrectionLevel) => void
}

export function ErrorCorrectionPicker({ value, onChange }: ErrorCorrectionPickerProps) {
  return (
    <div className="space-y-2">
      <div className="hud-label">error_correction</div>
      <div className="flex gap-2" role="group" aria-label="Error correction level">
        {LEVELS.map(level => {
          const isActive = value === level.value
          return (
            <button
              key={level.value}
              type="button"
              title={level.description}
              aria-label={`Error correction ${level.description}`}
              aria-pressed={isActive}
              onClick={() => onChange(level.value)}
              style={{
                flex: 1,
                padding: '0.35rem 0',
                borderRadius: 'var(--radius-sm)',
                border: isActive ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                background: isActive ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                color: isActive ? 'var(--primary-glow)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              {level.label}
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
        {LEVELS.find(l => l.value === value)?.description}
      </p>
    </div>
  )
}
