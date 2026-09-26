import { defineConfig } from 'vite';

/**
 * Vite configuration optimized for serverless/static deployment (Vercel).
 * - No server-side code; pure client-side SPA.
 * - WASM assets (Rapier3D) are correctly handled via assetsInclude.
 * - Base path is relative for flexible hosting.
 */
export default defineConfig({
  base: './',
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsInlineLimit: 0, // Keep WASM as separate files
    rollupOptions: {
      output: {
        // Ensure consistent chunk naming for caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // Rapier3D WASM needs special handling
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    exclude: ['@dimforge/rapier3d-compat']
  },
  server: {
    port: 5173,
    open: true
  }
});
