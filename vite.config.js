import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/foxtrail/', // Repository name for GitHub Pages
  build: {
    outDir: 'dist',
  },
})