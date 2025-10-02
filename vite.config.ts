import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Otimizações do React
      fastRefresh: true,
    })
  ],
  base: '/Binomial',
  
  // Otimizações de build
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendors em chunks menores
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          utils: ['lucide-react', 'katex', 'react-katex'],
        },
        // Otimizar nomes dos arquivos
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Otimizar tamanho do bundle
    chunkSizeWarningLimit: 1000,
  },
  
  // Otimizações de dependências
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'chart.js',
      'react-chartjs-2',
      'katex',
      'react-katex'
    ],
    exclude: ['lucide-react'],
  },
  
  // Otimizações do servidor de desenvolvimento
  server: {
    hmr: {
      overlay: false
    }
  },
  
  // CSS code splitting
  css: {
    devSourcemap: true,
  },
  
  // Pre-bundling otimizado
  esbuild: {
    target: 'es2015',
    drop: ['console', 'debugger'],
  },
});
