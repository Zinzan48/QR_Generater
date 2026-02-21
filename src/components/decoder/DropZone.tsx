import { useRef, useState, type DragEvent } from 'react'
import { Upload } from 'lucide-react'

interface DropZoneProps {
  onFile: (file: File) => void
  isLoading: boolean
}

export function DropZone({ onFile, isLoading }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) onFile(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload image to decode QR code. Drag and drop or click to browse."
      onClick={() => !isLoading && inputRef.current?.click()}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && !isLoading && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      className="hud-frame cursor-pointer"
      style={{
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-lg)',
        border: `1px dashed ${isDragging ? 'var(--primary)' : 'var(--glass-border)'}`,
        background: isDragging ? 'var(--primary-dim)' : 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.875rem',
        transition: 'all var(--transition-base)',
        outline: 'none',
      }}
    >
      <div style={{
        width: '3rem',
        height: '3rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        background: 'var(--primary-dim)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary-glow)',
      }}>
        <Upload size={22} aria-hidden="true" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
          {isLoading ? 'decoding...' : isDragging ? 'drop to decode' : 'drop_image_here'}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          // or click to browse · ctrl+v to paste
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-hidden="true"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
