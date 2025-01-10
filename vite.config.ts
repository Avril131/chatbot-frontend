import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [ react() ],
  // 配置Scss
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/common.scss";'
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
