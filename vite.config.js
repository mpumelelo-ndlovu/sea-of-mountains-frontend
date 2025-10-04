import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'; // 1. Added visualizer import

// Define the Content Security Policy rules based on the console errors:
// 2. CSP definition for dev server
const cspDirectives = {
  // Added 'blob:' and 'data:' for default-src for development compatibility
  'default-src': ["'self'", 'blob:', 'data:'],
  // Explicitly allowing Google domains for reCAPTCHA scripts and using 'unsafe-inline' for development styles/scripts.
  'script-src': [
    "'self'", 
    "'unsafe-inline'", 
    "'unsafe-eval'", 
    'https://www.google.com', 
    'https://www.gstatic.com'
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https://www.google.com', 'https://www.gstatic.com'], // Added Google image sources
  'connect-src': [
    "'self'",
    'https://sea-of-mountains-backend.onrender.com', // Your backend API
    'https://ingesteer.services-prod.nsvcs.net',      // The external network monitoring service
    'https://www.google.com', // Needed for reCAPTCHA network calls
    'https://www.gstatic.com' // Needed for reCAPTCHA network calls
  ],
  // Needed for reCAPTCHA iframes
  'frame-src': ["'self'", 'https://www.google.com', 'https://www.gstatic.com'], 
};

// Convert directives to CSP header string
const cspHeader = Object.entries(cspDirectives)
  .map(([key, sources]) => `${key} ${sources.join(' ')}`)
  .join('; ');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({ // Note: Changed to function to access 'mode'
  plugins: [
    react(),
    // 3. Conditional visualizer plugin for 'npm run analyze'
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
    }),
  ].filter(Boolean),

  server: {
    host: 'localhost',
    port: 5173,
    // 4. Added CSP headers to development server config
    headers: {
      'Content-Security-Policy': cspHeader,
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  build: {
    // Optimize build
    rollupOptions: {
      output: {
        // 5. Updated manual chunks for better organization and to support lazy loading
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group react and router together
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // Group core utilities
            if (id.includes('axios') || id.includes('dayjs')) {
              return 'vendor-core';
            }
            // All other node_modules go into a 'vendor' chunk
            return 'vendor';
          }
        },
      },
    },
    // The rest of your original build configuration is preserved
    // Enable source maps for production debugging
    sourcemap: process.env.NODE_ENV === 'development',
    // Use esbuild for minification (built-in, no extra dependencies)
    minify: 'esbuild',
    target: 'es2015',
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
}));