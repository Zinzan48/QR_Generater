import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="QR Code 全螢幕預覽"
      className="modal-dark"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--modal-overlay)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 9000,
        overflowY: 'auto',
        // NO justify-content:center — the classic flex+overflow scroll trap
        // Content is centered via padding + margin:auto on inner div
        padding: '5rem 1.5rem 2rem',
      }}
    >
      {/* Fixed close button — always top-right, above scroll */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="關閉全螢幕預覽"
        className="hud-btn flex items-center gap-1.5 cursor-pointer"
        style={{
          position: 'fixed', top: '1rem', right: '1rem', zIndex: 9001,
          padding: '0.4rem 0.875rem', fontSize: '0.75rem',
          background: 'var(--glass-bg-heavy)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <X size={13} aria-hidden="true" />
        關閉
      </button>

      {/* Content — margin:auto centres horizontally; no vertical flex trap */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '1.25rem',
          width: '100%',
          maxWidth: 'min(90vmin, 520px)',
          margin: '0 auto',
        }}
      >
        {/* QR Image — capped at 65vmin max to leave room for buttons */}
        <div style={{
          width: 'min(65vmin, 420px)',
          height: 'min(65vmin, 420px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
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

  return createPortal(modal, document.body)
}
