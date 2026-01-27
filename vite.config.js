import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    cors: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Configuración simplificada para Railway
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  base: '/',
  preview: {
    port: 3001,
    host: true
  }
})