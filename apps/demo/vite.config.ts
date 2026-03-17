import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      springsvg: resolve(__dirname, '../../packages/springsvg/src/index.ts')
    }
  }
})
