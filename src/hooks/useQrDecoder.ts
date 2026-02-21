import { useState, useCallback, useRef } from 'react'
import QrScanner from 'qr-scanner'

export type DecodeStatus = 'idle' | 'loading' | 'success' | 'error'

export interface DecodeState {
  status: DecodeStatus
  result: string
  error: string
}

export function useQrDecoder() {
  const [state, setState] = useState<DecodeState>({ status: 'idle', result: '', error: '' })
  const isDecoding = useRef(false)

  const decode = useCallback(async (source: File | Blob) => {
    if (isDecoding.current) return
    isDecoding.current = true
    setState({ status: 'loading', result: '', error: '' })
    try {
      const result = await QrScanner.scanImage(source, { returnDetailedScanResult: true })
      setState({ status: 'success', result: result.data, error: '' })
    } catch {
      setState({ status: 'error', result: '', error: '圖片中未找到 QR Code。' })
    } finally {
      isDecoding.current = false
    }
  }, [])

  const reset = useCallback(() => {
    setState({ status: 'idle', result: '', error: '' })
  }, [])

  return { state, decode, reset }
}
