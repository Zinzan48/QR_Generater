import { useState } from 'react'
import { Download, Loader2, Share2 } from 'lucide-react'

// Runtime-safe detection: supports file sharing via Web Share API
const HAS_SHARE_API =
  typeof navigator !== 'undefined' &&
  'share' in navigator &&
  'canShare' in navigator

interface DownloadButtonsProps {
  onDownload: (format: 'svg' | 'png') => void
  getBlob: (format: 'png' | 'svg') => Promise<Blob | null>
  disabled?: boolean
}

export function DownloadButtons({ onDownload, getBlob, disabled = false }: DownloadButtonsProps) {
  const [loading, setLoading] = useState(false)

  const handlePng = async () => {
    if (loading || disabled) return
    setLoading(true)
    try {
      const blob = await getBlob('png')
      if (!blob) { onDownload('png'); return }

      const file = new File([blob], 'qr-forge.png', { type: 'image/png' })

      // Try Web Share API (mobile: saves to Photos/Gallery)
      if (HAS_SHARE_API && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'QR Code — QR Forge' })
      } else {
        // Fallback: trigger <a download>
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'qr-forge.png'
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      // AbortError = user cancelled share sheet, silently ignore
      if (err instanceof Error && err.name !== 'AbortError') {
        onDownload('png') // last-resort fallback
      }
    } finally {
      setLoading(false)
    }
  }

  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1.25rem',
    fontSize: '0.8rem',
    opacity: disabled || loading ? 0.4 : 1,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
  }

  return (
    <div className="space-y-2">
      <div className="hud-label">匯出</div>
      <div className="flex gap-2">
        {/* SVG — desktop only (hidden on mobile via CSS, no inline display override) */}
        <button
          type="button"
          onClick={() => onDownload('svg')}
          disabled={disabled || loading}
          aria-label="下載 SVG 格式 QR Code"
          className="hud-btn-primary hidden sm:flex items-center gap-1.5 cursor-pointer"
          style={btnStyle}
        >
          <Download size={13} aria-hidden="true" />
          SVG
        </button>

        {/* PNG / Share — always visible */}
        <button
          type="button"
          onClick={handlePng}
          disabled={disabled || loading}
          aria-label={HAS_SHARE_API ? '分享或儲存 QR Code 圖片' : '下載 PNG 格式 QR Code'}
          className="hud-btn flex items-center gap-1.5 cursor-pointer flex-1 sm:flex-none justify-center"
          style={btnStyle}
        >
          {loading
            ? <Loader2 size={13} className="animate-spin" aria-hidden="true" />
            : HAS_SHARE_API
              ? <Share2 size={13} aria-hidden="true" />
              : <Download size={13} aria-hidden="true" />
          }
          {/* Mobile label */}
          <span className="sm:hidden">
            {loading ? '處理中...' : HAS_SHARE_API ? '分享 / 儲存' : '下載 PNG'}
          </span>
          {/* Desktop label */}
          <span className="hidden sm:inline">
            {loading ? '...' : 'PNG'}
          </span>
        </button>
      </div>
    </div>
  )
}
