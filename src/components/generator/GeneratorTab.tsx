import { useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { RotateCcw, RefreshCw, Maximize2 } from 'lucide-react'
import { TextInput } from './TextInput'
import { ErrorCorrectionPicker, type ErrorCorrectionLevel } from './ErrorCorrectionPicker'
import { SizePicker } from './SizePicker'
import { DotStylePicker, type DotType } from './DotStylePicker'
import { CornerStylePicker, type CornerSquareType } from './CornerStylePicker'
import { ColorPicker } from './ColorPicker'
import { LogoUploader } from './LogoUploader'
import { DownloadButtons } from './DownloadButtons'
import { Collapsible } from './Collapsible'
import { QrModal } from './QrModal'
import { useQrPreviewRef } from './QrPreview'
import type { QrOptions } from '../../hooks/useQrGenerator'

// UA-based mobile detection (evaluated once at module level; SPA only, no SSR)
const IS_MOBILE = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const STYLE_DEFAULTS = {
  errorLevel: 'M' as ErrorCorrectionLevel,
  size: 300,
  dotType: 'rounded' as DotType,
  cornerType: 'extra-rounded' as CornerSquareType,
  dotColor: '#000000',
  bgColor: '#ffffff',
  logoUrl: null as string | null,
}

export function GeneratorTab() {
  const [text, setText] = useState('https://example.com')
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>(STYLE_DEFAULTS.errorLevel)
  const [size, setSize] = useState(STYLE_DEFAULTS.size)
  const [dotType, setDotType] = useState<DotType>(STYLE_DEFAULTS.dotType)
  const [cornerType, setCornerType] = useState<CornerSquareType>(STYLE_DEFAULTS.cornerType)
  const [dotColor, setDotColor] = useState(STYLE_DEFAULTS.dotColor)
  const [bgColor, setBgColor] = useState(STYLE_DEFAULTS.bgColor)
  const [logoUrl, setLogoUrl] = useState<string | null>(STYLE_DEFAULTS.logoUrl)

  // Loading states
  const [shareLoading, setShareLoading] = useState(false)
  const [copyLoading, setCopyLoading] = useState(false)

  // Toast
  const [toast, setToast] = useState<string | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null)
  const modalBlobUrlRef = useRef<string | null>(null)

  const resetStyle = () => {
    setErrorLevel(STYLE_DEFAULTS.errorLevel)
    setSize(STYLE_DEFAULTS.size)
    setDotType(STYLE_DEFAULTS.dotType)
    setCornerType(STYLE_DEFAULTS.cornerType)
    setDotColor(STYLE_DEFAULTS.dotColor)
    setBgColor(STYLE_DEFAULTS.bgColor)
    setLogoUrl(STYLE_DEFAULTS.logoUrl)
  }

  const resetAll = () => {
    setText('https://example.com')
    resetStyle()
  }

  const options: QrOptions = {
    data: text,
    size,
    errorCorrectionLevel: errorLevel,
    dotType,
    cornerSquareType: cornerType,
    dotColor,
    bgColor,
    logoUrl,
  }

  const { containerRef, download, getBlob } = useQrPreviewRef(options)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(null), 2200)
  }, [])

  // Share (mobile Web Share API → fallback <a download>)
  const handleShare = useCallback(async () => {
    if (shareLoading) return
    setShareLoading(true)
    try {
      const blob = await getBlob('png')
      if (!blob) { download('png'); return }
      const file = new File([blob], 'qr-forge.png', { type: 'image/png' })
      if ('share' in navigator && 'canShare' in navigator && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'QR Code — QR Forge' })
      } else {
        const url = URL.createObjectURL(blob)
        Object.assign(document.createElement('a'), { href: url, download: 'qr-forge.png' }).click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') download('png')
    } finally {
      setShareLoading(false)
    }
  }, [shareLoading, getBlob, download])

  // Copy PNG to clipboard (desktop)
  const handleCopy = useCallback(async () => {
    if (copyLoading) return
    setCopyLoading(true)
    try {
      const blob = await getBlob('png')
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      showToast('已複製到剪貼簿 ✓')
    } catch {
      showToast('複製失敗，請改用下載')
    } finally {
      setCopyLoading(false)
    }
  }, [copyLoading, getBlob, showToast])

  // Open fullscreen modal — show modal immediately, then load blob
  const openModal = useCallback(async () => {
    setModalOpen(true)
    const blob = await getBlob('png')
    if (!blob) { setModalOpen(false); return }
    if (modalBlobUrlRef.current) URL.revokeObjectURL(modalBlobUrlRef.current)
    const url = URL.createObjectURL(blob)
    modalBlobUrlRef.current = url
    setModalImgSrc(url)
  }, [getBlob])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setTimeout(() => {
      if (modalBlobUrlRef.current) {
        URL.revokeObjectURL(modalBlobUrlRef.current)
        modalBlobUrlRef.current = null
        setModalImgSrc(null)
      }
    }, 300)
  }, [])

  const downloadBtnsProps = {
    isMobile: IS_MOBILE,
    shareLoading,
    copyLoading,
    onShare: handleShare,
    onDownloadPng: () => download('png'),
    onDownloadSvg: () => download('svg'),
    onCopy: handleCopy,
  }

  return (
    <>
      {/* Main grid — pb-20 on mobile so FAB doesn't cover bottom content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start pb-20 sm:pb-0">
        {/* Left — Controls */}
        <div className="glass-card p-5 sm:p-6 space-y-5">
          {/* Section 01: Content — always visible */}
          <section className="space-y-3" aria-label="QR 內容輸入">
            <div className="hud-label">01 / 輸入內容</div>
            <TextInput value={text} onChange={setText} />
          </section>

          <div className="hud-divider" />

          {/* Section 02: Basic Settings — collapsible, open by default */}
          <section aria-label="QR 基本設定">
            <Collapsible label="02 / 基本設定" defaultOpen>
              <ErrorCorrectionPicker value={errorLevel} onChange={setErrorLevel} />
              <SizePicker value={size} onChange={setSize} />
            </Collapsible>
          </section>

          <div className="hud-divider" />

          {/* Section 03: Style — collapsible, closed by default */}
          <section aria-label="QR 外觀樣式">
            <Collapsible label="03 / 外觀樣式">
              <DotStylePicker value={dotType} onChange={setDotType} />
              <CornerStylePicker value={cornerType} onChange={setCornerType} />
              <ColorPicker
                dotColor={dotColor}
                bgColor={bgColor}
                onDotColorChange={setDotColor}
                onBgColorChange={setBgColor}
              />
            </Collapsible>
          </section>

          <div className="hud-divider" />

          {/* Section: Logo — collapsible, closed by default */}
          <section aria-label="中央 Logo">
            <Collapsible label="04 / 中央 Logo">
              <LogoUploader logoUrl={logoUrl} onLogoChange={setLogoUrl} />
            </Collapsible>
          </section>

          <div className="hud-divider" />

          {/* Reset actions */}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={resetStyle}
              aria-label="恢復預設風格設定"
              className="hud-btn flex items-center gap-1.5"
              style={{ padding: '0.4rem 0.875rem', fontSize: '0.75rem' }}
            >
              <RotateCcw size={12} aria-hidden="true" />
              預設風格
            </button>
            <button
              type="button"
              onClick={resetAll}
              aria-label="重新開始，清除所有設定"
              className="hud-btn flex items-center gap-1.5"
              style={{ padding: '0.4rem 0.875rem', fontSize: '0.75rem', borderColor: 'rgba(239,68,68,0.35)', color: 'rgba(252,165,165,0.9)' }}
            >
              <RefreshCw size={12} aria-hidden="true" />
              重新開始
            </button>
          </div>
        </div>

        {/* Right — Preview (sticky on large screens) */}
        <div className="lg:w-80 xl:w-96 order-first lg:order-last">
          <div className="preview-sticky space-y-2">
            <div className="hud-label">即時預覽</div>

            {/* Clickable QR preview frame */}
            <button
              type="button"
              onClick={openModal}
              aria-label="點擊放大 QR Code 全螢幕"
              className="w-full text-left hud-frame-4c group"
              style={{ borderRadius: 'var(--radius-lg)', padding: '2px', cursor: 'zoom-in', background: 'transparent', border: 'none', display: 'block' }}
            >
              <div
                className="flex items-center justify-center relative"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  minHeight: '280px',
                  overflow: 'hidden',
                }}
              >
                <div
                  ref={containerRef}
                  className="qr-preview-container"
                  role="img"
                  aria-label="QR Code 即時預覽 — 設定變更時自動更新"
                  style={{ lineHeight: 0, maxWidth: '100%' }}
                />
                {/* Expand hint overlay */}
                <div
                  className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ fontSize: '0.6rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)', pointerEvents: 'none' }}
                  aria-hidden="true"
                >
                  <Maximize2 size={10} />
                  全螢幕
                </div>
              </div>
            </button>

            <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
              // 點擊放大 · 即時自動更新
            </p>

            {/* Desktop download section */}
            <div className="beam-border hidden sm:block">
              <div className="beam-border-inner">
                <DownloadButtons {...downloadBtnsProps} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen QR Modal — portal to body, immune to stacking context */}
      <QrModal
        open={modalOpen}
        imgSrc={modalImgSrc}
        isMobile={IS_MOBILE}
        shareLoading={shareLoading}
        copyLoading={copyLoading}
        onClose={closeModal}
        onShare={handleShare}
        onDownloadPng={() => { download('png'); closeModal() }}
        onDownloadSvg={() => { download('svg'); closeModal() }}
        onCopy={async () => { await handleCopy(); closeModal() }}
      />

      {/* Mobile FAB — portal to body: position:fixed immune to parent containing blocks */}
      {createPortal(
        <div
          className="sm:hidden"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
            background: 'var(--glass-bg-heavy)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '0.75rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
          }}
        >
          <DownloadButtons {...downloadBtnsProps} />
        </div>,
        document.body
      )}

      {/* Toast — portal to body for same reason */}
      {createPortal(
        <div
          className={`toast${toast ? ' toast-visible' : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {toast}
        </div>,
        document.body
      )}
    </>
  )
}

