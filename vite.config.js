import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["stepanie-truceless-absentmindedly.ngrok-free.dev"]
  },
  optimizeDeps: {
    include: ['tslib', '@supabase/supabase-js'],
  },
})
