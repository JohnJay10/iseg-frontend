import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      jsxImportSource: 'react',
    })
  ],
  base: '/',
  server: {
    port: 5173,
    host: 'localhost',
    strictPort: false,
    middlewareMode: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
    fs: {
      strict: false,
    },
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
      usePolling: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    minify: 'terser',
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'forms': ['formik', 'yup'],
          'ui': ['sweetalert2'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'formik', 'yup'],
    exclude: ['node_modules'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
})
