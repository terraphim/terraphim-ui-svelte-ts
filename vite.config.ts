import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: undefined,
  //       assetFileNames: 'public/[name].[ext]',
  //       chunkFileNames: 'public/[name].[hash].js',
  //       entryFileNames: 'public/[name].[hash].js',
  //     },
  //   },
  // },
})
