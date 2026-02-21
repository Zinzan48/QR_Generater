import { useRef } from 'react'
import { useQrGenerator, type QrOptions } from '../../hooks/useQrGenerator'

// Returns ref and download function for imperative use in GeneratorTab
export function useQrPreviewRef(options: QrOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { download } = useQrGenerator(containerRef, options)
  return { containerRef, download }
}
