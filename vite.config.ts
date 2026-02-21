import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function normalizeSiteUrl(rawUrl: string): string {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new Error(
      `Invalid VITE_SITE_URL "${rawUrl}". Expected full URL, e.g. https://qr.example.com`,
    )
  }

  const normalizedPath = parsed.pathname.replace(/\/+$/, '')
  return `${parsed.origin}${normalizedPath}/`
}

function createSeoAssetsPlugin(siteUrl: string): Plugin {
  const siteBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl
  const socialImageUrl = `${siteBase}/social-preview.png`
  const lastMod = new Date().toISOString().split('T')[0]

  return {
    name: 'seo-assets',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', siteUrl)
        .replaceAll('%SOCIAL_IMAGE_URL%', socialImageUrl)
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${siteBase}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      })
    },
  }
}

// https://vite.dev/guide/build
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configuredSiteUrl = env.VITE_SITE_URL || env.SITE_URL
  const cloudflarePagesUrl = env.CF_PAGES_URL
    ? (env.CF_PAGES_URL.startsWith('http') ? env.CF_PAGES_URL : `https://${env.CF_PAGES_URL}`)
    : null
  const fallbackSiteUrl =
    command === 'serve' ? 'http://localhost:5173' : (cloudflarePagesUrl || 'https://example.com')

  if (command === 'build' && !configuredSiteUrl && !cloudflarePagesUrl) {
    console.warn(
      '[seo-assets] VITE_SITE_URL is not set. Build metadata will use https://example.com. Configure VITE_SITE_URL before production deploy.',
    )
  }

  const siteUrl = normalizeSiteUrl(configuredSiteUrl || fallbackSiteUrl)

  return {
    plugins: [react(), createSeoAssetsPlugin(siteUrl)],
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
  }
})
