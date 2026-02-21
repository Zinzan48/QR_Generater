import { useEffect, useCallback } from 'react'
import { DropZone } from './DropZone'
import { DecodeResult } from './DecodeResult'
import { useQrDecoder } from '../../hooks/useQrDecoder'

export function DecoderTab() {
  const { state, decode, reset } = useQrDecoder()

  // Paste event — Ctrl+V anywhere on this tab
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = Array.from(e.clipboardData?.items ?? [])
    const imageItem = items.find(item => item.type.startsWith('image/'))
    if (imageItem) {
      const blob = imageItem.getAsFile()
      if (blob) decode(blob)
    }
  }, [decode])

  useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [handlePaste])

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }} className="space-y-4">
      <div className="space-y-1" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text)', fontWeight: 600 }}>
          <span style={{ color: 'var(--primary)' }}>&lt;</span>
          解碼器
          <span style={{ color: 'var(--text-dim)' }}> /&gt;</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          // 拖曳圖片 · 點擊選取 · 貼上剪貼簿
        </p>
      </div>
      <DropZone onFile={decode} isLoading={state.status === 'loading'} />
      <DecodeResult state={state} onReset={reset} />
    </div>
  )
}
