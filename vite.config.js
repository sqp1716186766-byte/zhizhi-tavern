import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/zhizhi-tavern/',
  plugins: [react(), tailwindcss()],
})

