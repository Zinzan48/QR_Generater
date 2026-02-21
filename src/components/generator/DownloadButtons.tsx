import { Download } from 'lucide-react'

interface DownloadButtonsProps {
  onDownload: (format: 'svg' | 'png') => void
  disabled?: boolean
}

export function DownloadButtons({ onDownload, disabled = false }: DownloadButtonsProps) {
  return (
    <div className="space-y-2">
      <div className="hud-label">export</div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onDownload('svg')}
          disabled={disabled}
          aria-label="Download QR code as SVG"
          className="hud-btn-primary flex items-center gap-1.5 cursor-pointer"
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.8rem',
            opacity: disabled ? 0.4 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <Download size={13} aria-hidden="true" />
          SVG
        </button>
        <button
          type="button"
          onClick={() => onDownload('png')}
          disabled={disabled}
          aria-label="Download QR code as PNG"
          className="hud-btn flex items-center gap-1.5 cursor-pointer"
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.8rem',
            opacity: disabled ? 0.4 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <Download size={13} aria-hidden="true" />
          PNG
        </button>
      </div>
    </div>
  )
}
