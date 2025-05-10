import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  optimizeDeps: {
    include: ['react-simple-typewriter']
  },
  server: {
    hmr: {
      protocol: 'ws',
      clientPort: 5173,
      path: '/vite-hmr',
      timeout: 30000,
      overlay: false
    },
    watch: {
      usePolling: true
    }
  }
  
})
