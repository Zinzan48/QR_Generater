import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'
import type { DecodeState } from '../../hooks/useQrDecoder'

interface DecodeResultProps {
  state: DecodeState
  onReset: () => void
}

export function DecodeResult({ state, onReset }: DecodeResultProps) {
  const [copied, setCopied] = useState(false)

  if (state.status === 'idle') return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(state.result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div
      className="glass-card animate-fade-up"
      style={{ padding: '1.25rem', marginTop: '1rem' }}
    >
      {state.status === 'loading' && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          // 掃描中...
        </p>
      )}

      {state.status === 'error' && (
        <div className="flex items-center gap-2">
          <X size={16} style={{ color: '#ef4444', flexShrink: 0 }} aria-hidden="true" />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#ef4444' }}>
            {state.error}
          </p>
        </div>
      )}

      {state.status === 'success' && (
        <div className="space-y-3">
          <div className="hud-label">解碼結果</div>
          <div
            style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-elevated)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text)',
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              maxHeight: '12rem',
              overflowY: 'auto',
            }}
            aria-live="polite"
            aria-label="已解碼的 QR Code 內容"
          >
            {state.result}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              aria-label="複製解碼文字至剪貼簿"
              className={`hud-btn-primary hud-btn flex items-center gap-1.5 cursor-pointer ${copied ? '' : ''}`}
              style={{ padding: '0.4rem 1rem', fontSize: '0.78rem' }}
            >
              {copied
                ? <Check size={13} aria-hidden="true" />
                : <Copy size={13} aria-hidden="true" />
              }
              {copied ? '已複製！' : '複製'}
            </button>
            <button
              type="button"
              onClick={onReset}
              aria-label="清除結果並解碼其他圖片"
              className="hud-btn flex items-center gap-1.5 cursor-pointer"
              style={{ padding: '0.4rem 0.875rem', fontSize: '0.78rem' }}
            >
              清除
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
