import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        secure: false,
        // Rewrite cookie domain so cookies set by backend
        // are scoped to localhost:3000
        cookieDomainRewrite: {
          '*': ''
        }
      }
    }
  },
  envDir: path.resolve(__dirname, 'config'),
  envPrefix: 'VITE_',
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
