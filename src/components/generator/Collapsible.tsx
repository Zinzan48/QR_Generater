import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'

interface CollapsibleProps {
  label: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export function Collapsible({ label, defaultOpen = false, children }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
        className="hud-label collapsible-trigger"
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', justifyContent: 'space-between' }}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          style={{
            color: 'var(--primary)',
            flexShrink: 0,
            transition: 'transform var(--transition-fast)',
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
      </button>

      <div
        id={id}
        role="region"
        className="collapsible-grid"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="space-y-3" style={{ paddingTop: '0.75rem' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
