import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/REPOSITORY_NAME/', // Ihren echten Repository-Namen hier einfügen
  build: {
    outDir: 'dist',
  },
})