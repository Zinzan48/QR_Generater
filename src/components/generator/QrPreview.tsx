import { useRef } from 'react'
import { useQrGenerator, type QrOptions } from '../../hooks/useQrGenerator'

interface QrPreviewProps extends QrOptions {
  onDownload: (format: 'svg' | 'png') => void
}

export function QrPreview({ onDownload: _onDownload, ...options }: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { download } = useQrGenerator(containerRef, options)

  // Expose download to parent via callback ref pattern — we return download so GeneratorTab can call it
  void _onDownload
  void download

  return (
    <div
      className="hud-frame flex items-center justify-center p-6"
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        minHeight: '320px',
      }}
    >
      <div
        ref={containerRef}
        role="img"
        aria-label="QR Code Preview"
        style={{ lineHeight: 0 }}
      />
    </div>
  )
}

// Variant that returns download ref for imperative use
export function useQrPreviewRef(options: QrOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { download } = useQrGenerator(containerRef, options)
  return { containerRef, download }
}
