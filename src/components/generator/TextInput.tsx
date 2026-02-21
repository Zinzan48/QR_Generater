interface TextInputProps {
  value: string
  onChange: (value: string) => void
}

export function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="qr-text" className="hud-label">
        content
      </label>
      <textarea
        id="qr-text"
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter URL or text…"
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          resize: 'none',
          outline: 'none',
          transition: 'border-color var(--transition-fast)',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--glass-border)' }}
      />
    </div>
  )
}
