import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import daisyui from 'daisyui'; // Correctly import DaisyUI

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // daisyui, // DaisyUI should be used here without parentheses
  ],
  safelist: [
    'bg-[rgb(153,21,75)]', // Safelist the background color
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
