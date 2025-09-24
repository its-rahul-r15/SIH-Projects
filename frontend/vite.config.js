import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',  // service worker auto update
      workbox: {
        navigateFallback: '/offline.html', // fallback page for offline
        navigateFallbackDenylist: [/^\/api\//, /^\/_/, /.*\.js$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-endpoint\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
            },
          },
        ],
      },
      manifest: {
        name: 'Career_Path',
        short_name: 'Career',
        description: 'My awesome PWA app By Griffin_byte',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4f46e5',
        icons: [
          {
            src: 'img2.png', // ye tumhare public folder me hona chahiye
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img1.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'img1.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: false, // dev me service worker disable
      },
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
  

});
