import { useEffect, useRef, useCallback } from 'react'
import QRCodeStyling from 'qr-code-styling'
import type { ErrorCorrectionLevel } from '../components/generator/ErrorCorrectionPicker'
import type { DotType } from '../components/generator/DotStylePicker'
import type { CornerSquareType } from '../components/generator/CornerStylePicker'

export interface QrOptions {
  data: string
  size: number
  errorCorrectionLevel: ErrorCorrectionLevel
  dotType: DotType
  cornerSquareType: CornerSquareType
  dotColor: string
  bgColor: string
  logoUrl: string | null
}

export function useQrGenerator(containerRef: React.RefObject<HTMLDivElement | null>, options: QrOptions) {
  const qrRef = useRef<QRCodeStyling | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitialized = useRef(false)

  const buildConfig = useCallback((opts: QrOptions): ConstructorParameters<typeof QRCodeStyling>[0] => ({
    width: opts.size,
    height: opts.size,
    type: 'svg',
    data: opts.data || 'https://example.com',
    image: opts.logoUrl ?? undefined,
    margin: 16, // quiet zone — required by QR spec, also looks much better
    qrOptions: {
      errorCorrectionLevel: opts.errorCorrectionLevel,
    },
    dotsOptions: {
      color: opts.dotColor,
      type: opts.dotType,
    },
    cornersSquareOptions: {
      color: opts.dotColor,
      type: opts.cornerSquareType,
    },
    cornersDotOptions: {
      color: opts.dotColor,
    },
    backgroundOptions: {
      color: opts.bgColor,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 8,
    },
  }), [])

  // Initialize QR instance once
  useEffect(() => {
    if (!containerRef.current || isInitialized.current) return
    isInitialized.current = true
    qrRef.current = new QRCodeStyling(buildConfig(options))
    qrRef.current.append(containerRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced update on option changes
  useEffect(() => {
    if (!qrRef.current || !isInitialized.current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      qrRef.current?.update(buildConfig(options))
    }, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [options, buildConfig])

  const download = useCallback((format: 'svg' | 'png') => {
    qrRef.current?.download({ name: 'qr-forge', extension: format })
  }, [])

  const getBlob = useCallback(async (format: 'png' | 'svg'): Promise<Blob | null> => {
    return qrRef.current?.getRawData(format) ?? null
  }, [])

  return { download, getBlob }
}
