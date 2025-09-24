import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    // This section ensures the HMR connection works correctly through ngrok
    hmr: {
      protocol: 'wss', // Use secure WebSocket protocol
      host: 'ed95139e8cf5.ngrok-free.app', // Your ngrok hostname
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Your Django server's address
        changeOrigin: true,
        secure: false,
      },
    },
  },
});