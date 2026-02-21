import { useRef } from 'react'
import { useQrGenerator, type QrOptions } from '../../hooks/useQrGenerator'

// Returns ref, download function, and getBlob for imperative use in GeneratorTab
export function useQrPreviewRef(options: QrOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { download, getBlob } = useQrGenerator(containerRef, options)
  return { containerRef, download, getBlob }
}
