import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Custom plugin to simulate Nginx User-Agent switching locally
const mobileSwitchPlugin = (): Plugin => ({
  name: 'mobile-switch',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const ua = req.headers['user-agent'] || ''
      const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua)
      
      // If mobile and requesting a page (not an asset like .js/.css)
      if (isMobile && req.url && !req.url.includes('.') && !req.url.startsWith('/@')) {
        req.url = '/mobile.html'
      }
      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mobileSwitchPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mobile: resolve(__dirname, 'mobile.html'),
      },
    },
  },
})
