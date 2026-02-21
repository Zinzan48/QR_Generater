import { useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface LogoUploaderProps {
  logoUrl: string | null
  onLogoChange: (url: string | null) => void
}

export function LogoUploader({ logoUrl, onLogoChange }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => { onLogoChange(e.target?.result as string) }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      <div className="hud-label">中央 Logo <span style={{ color: 'var(--text-dim)' }}>// 選填</span></div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="hud-btn flex items-center gap-1.5 cursor-pointer"
          style={{ padding: '0.35rem 0.75rem' }}
          aria-label="上傳中央 Logo 圖片"
        >
          <Upload size={13} aria-hidden="true" />
          <span style={{ fontSize: '0.8rem' }}>{logoUrl ? '更換' : '上傳'}</span>
        </button>
        {logoUrl && (
          <>
            <img
              src={logoUrl}
              alt="Logo preview"
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'contain',
                border: '1px solid var(--glass-border)',
                background: '#fff',
              }}
            />
            <button
              type="button"
              onClick={() => onLogoChange(null)}
              className="flex items-center gap-1 cursor-pointer"
              style={{
                padding: '0.35rem 0.625rem',
                background: 'transparent',
                border: '1px solid rgba(239,68,68,0.4)',
                borderRadius: 'var(--radius-sm)',
                color: 'rgb(239,68,68)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                transition: 'all var(--transition-fast)',
              }}
              aria-label="移除中央 Logo"
            >
              <X size={12} aria-hidden="true" />
              移除
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-hidden="true"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>
      {logoUrl && (
        <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          提示：置入 Logo 時建議使用容錯等級 H
        </p>
      )}
    </div>
  )
}
