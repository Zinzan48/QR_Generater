import { Loader2, Share2, Download, Copy } from 'lucide-react'

interface DownloadButtonsProps {
  isMobile: boolean
  shareLoading?: boolean
  copyLoading?: boolean
  disabled?: boolean
  onShare: () => void
  onDownloadPng: () => void
  onDownloadSvg: () => void
  onCopy: () => void
}

export function DownloadButtons({
  isMobile, shareLoading, copyLoading, disabled,
  onShare, onDownloadPng, onDownloadSvg, onCopy,
}: DownloadButtonsProps) {
  const isDisabled = disabled || shareLoading || copyLoading
  const btnStyle = {
    padding: '0.5rem 1.25rem',
    fontSize: '0.8rem',
    opacity: isDisabled ? 0.4 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  }

  return (
    <div className="space-y-2">
      <div className="hud-label">匯出</div>
      <div className="flex gap-2 flex-wrap">
        {isMobile ? (
          // Mobile: Web Share API
          <button
            type="button"
            onClick={onShare}
            disabled={isDisabled}
            aria-label="分享或儲存 QR Code 圖片"
            className="hud-btn-primary flex items-center gap-1.5 cursor-pointer flex-1 justify-center"
            style={btnStyle}
          >
            {shareLoading
              ? <Loader2 size={13} className="animate-spin" aria-hidden="true" />
              : <Share2 size={13} aria-hidden="true" />
            }
            {shareLoading ? '處理中...' : '分享 / 儲存'}
          </button>
        ) : (
          // Desktop: SVG download + PNG download + Copy to clipboard
          <>
            <button
              type="button"
              onClick={onDownloadSvg}
              disabled={isDisabled}
              aria-label="下載 SVG 格式 QR Code"
              className="hud-btn flex items-center gap-1.5 cursor-pointer"
              style={btnStyle}
            >
              <Download size={13} aria-hidden="true" />
              SVG
            </button>
            <button
              type="button"
              onClick={onDownloadPng}
              disabled={isDisabled}
              aria-label="下載 PNG 格式 QR Code"
              className="hud-btn flex items-center gap-1.5 cursor-pointer"
              style={btnStyle}
            >
              <Download size={13} aria-hidden="true" />
              PNG
            </button>
            <button
              type="button"
              onClick={onCopy}
              disabled={isDisabled}
              aria-label="複製 PNG 到剪貼簿"
              className="hud-btn-primary flex items-center gap-1.5 cursor-pointer"
              style={{ ...btnStyle, opacity: copyLoading || disabled ? 0.4 : 1 }}
            >
              {copyLoading
                ? <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                : <Copy size={13} aria-hidden="true" />
              }
              {copyLoading ? '複製中...' : '複製'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

