import { useEffect, useRef } from 'react'
import { X, Download, Copy, Share2, Loader2 } from 'lucide-react'

interface QrModalProps {
  open: boolean
  imgSrc: string | null
  isMobile: boolean
  shareLoading?: boolean
  copyLoading?: boolean
  onClose: () => void
  onShare: () => void
  onDownloadPng: () => void
  onDownloadSvg: () => void
  onCopy: () => void
}

export function QrModal({
  open, imgSrc, isMobile,
  shareLoading, copyLoading,
  onClose, onShare, onDownloadPng, onDownloadSvg, onCopy,
}: QrModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const btnBase = { padding: '0.5rem 1.25rem', fontSize: '0.8rem' }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="QR Code 全螢幕預覽"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 100,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4.5rem 1.5rem 1.5rem',
      }}
    >
      {/* Fixed close button — always top-right regardless of scroll */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="關閉全螢幕預覽"
        className="hud-btn flex items-center gap-1.5 cursor-pointer"
        style={{
          position: 'fixed', top: '1rem', right: '1rem', zIndex: 102,
          padding: '0.4rem 0.875rem', fontSize: '0.75rem',
          background: 'rgba(15,23,42,0.92)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <X size={13} aria-hidden="true" />
        關閉
      </button>

      <div
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', width: '100%', maxWidth: '90vmin' }}
      >

        {/* QR Image — <img> enables iOS native long-press "加入照片" */}
        <div style={{ width: '80vmin', height: '80vmin', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt="QR Code — iOS 長按可儲存至照片"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'var(--radius-lg)', display: 'block' }}
              draggable={false}
            />
          ) : (
            <Loader2 size={36} className="animate-spin" style={{ color: 'var(--primary)' }} />
          )}
        </div>

        {/* iOS long-press hint */}
        {isMobile && (
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', textAlign: 'center', margin: '-0.5rem 0 0' }}>
            // iOS：長按圖片 → 「加入照片」
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {isMobile ? (
            <button
              type="button"
              onClick={onShare}
              disabled={shareLoading}
              aria-label="分享或儲存 QR Code 圖片"
              className="hud-btn-primary flex items-center gap-1.5 cursor-pointer"
              style={{ ...btnBase, opacity: shareLoading ? 0.4 : 1, cursor: shareLoading ? 'not-allowed' : 'pointer' }}
            >
              {shareLoading ? <Loader2 size={13} className="animate-spin" /> : <Share2 size={13} />}
              {shareLoading ? '處理中...' : '分享 / 儲存'}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onDownloadSvg}
                aria-label="下載 SVG 格式"
                className="hud-btn flex items-center gap-1.5 cursor-pointer"
                style={btnBase}
              >
                <Download size={13} />
                SVG
              </button>
              <button
                type="button"
                onClick={onDownloadPng}
                aria-label="下載 PNG 格式"
                className="hud-btn flex items-center gap-1.5 cursor-pointer"
                style={btnBase}
              >
                <Download size={13} />
                PNG
              </button>
              <button
                type="button"
                onClick={onCopy}
                disabled={copyLoading}
                aria-label="複製 PNG 到剪貼簿"
                className="hud-btn-primary flex items-center gap-1.5 cursor-pointer"
                style={{ ...btnBase, opacity: copyLoading ? 0.4 : 1, cursor: copyLoading ? 'not-allowed' : 'pointer' }}
              >
                {copyLoading ? <Loader2 size={13} className="animate-spin" /> : <Copy size={13} />}
                {copyLoading ? '複製中...' : '複製 PNG'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
