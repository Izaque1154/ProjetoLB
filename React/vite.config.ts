import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

const base = '/ProjetoLB/'

function useBaseRedirect(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((req, res, next) => {
    const url = (req as { url?: string }).url

    if (url === base.replace(/\/$/, '')) {
      res.statusCode = 302
      res.setHeader('Location', base)
      res.end()
      return
    }

    next()
  })
}

function redirectBaseWithoutSlash(): Plugin {
  return {
    name: 'redirect-base-without-slash',
    configureServer(server) {
      useBaseRedirect(server)
    },
    configurePreviewServer(server) {
      useBaseRedirect(server)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [redirectBaseWithoutSlash(), react()],
  base
})
