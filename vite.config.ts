// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'],  // 반드시 소문자
    force: true,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
