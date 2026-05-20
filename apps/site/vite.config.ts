import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: true },
  resolve: {
    alias: {
      ruun: resolve(__dirname, '../../packages/ruune/src/index.ts'),
      'ruun-react': resolve(__dirname, '../../packages/ruune-react/src/index.ts'),
    }
  }
})
