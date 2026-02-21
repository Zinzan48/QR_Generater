import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/guide/build
export default defineConfig({
  plugins: [react()],
  build: {
    // Match .browserslistrc: iOS 15+ = Safari 15, modern Chrome/Edge/Firefox
    target: ['es2020', 'safari15', 'chrome107', 'edge107', 'firefox104'],

    // Suppress warning for qr-code-styling which is intentionally large
    chunkSizeWarningLimit: 500,

    // CSS extracted per-chunk for better caching
    cssCodeSplit: true,

    // No sourcemaps in production (Cloudflare Pages, no server-side debugging)
    sourcemap: false,

    rollupOptions: {
      output: {
        // Vendor chunk splitting — allows long-term browser caching:
        // react/react-dom changes rarely; qr libs change independently of app code
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-qr-gen': ['qr-code-styling'],
          'vendor-qr-scan': ['qr-scanner'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
