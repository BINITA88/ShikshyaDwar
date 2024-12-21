import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  safelist: [
    'bg-[rgb(153,21,75)]', // Add this line
  ],
  server:{
   proxy:{
    '/api':{
      target:"http://localhost:9000",
      changeOrigin:true,
      secure:false
    }
   }
  }
})
