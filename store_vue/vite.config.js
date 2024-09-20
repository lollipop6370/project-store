import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server:{
    port:80,
    open:true,
    proxy: {
      '/app-dev': {
        target: 'http://34.44.233.80:8002/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app-dev/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
