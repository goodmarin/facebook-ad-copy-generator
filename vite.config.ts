import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 本地开发使用根路径
  plugins: [react()],
  // 添加HTML元标记配置
  define: {
    __VITE_APP_TITLE__: JSON.stringify('爆款 Facebook 广告文案生成器'),
  },
  root: '.', // 明确指定根目录
  build: {
    // 优化构建
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // 代码分割优化
    rollupOptions: {
      output: {
        // 优化文件名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // 更好的代码分割
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    // 启用源码映射（生产环境可选）
    sourcemap: false,
    // 设置块大小警告阈值
    chunkSizeWarningLimit: 1000,
    // 启用CSS代码分割
    cssCodeSplit: true,
  },
  // 开发服务器优化
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
  // 预构建优化
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: [],
  },
  // CSS优化
  css: {
    devSourcemap: false,
  },
  // 资源处理优化
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  // 预加载优化
  preview: {
    port: 4173,
  },
}) 