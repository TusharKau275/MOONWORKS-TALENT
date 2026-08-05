import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to make Vite-injected CSS async to eliminate render-blocking
const asyncCssPlugin = () => ({
  name: 'async-css',
  enforce: 'post',
  transformIndexHtml(html) {
    return html.replace(
      /<link rel="stylesheet"(.*?)href="(.*?\.css)"(.*?)>/g,
      `<link rel="preload" as="style" href="$2" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="$2"></noscript>`
    );
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), asyncCssPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react@') || id.includes('react-dom@')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
