import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { reactNativeWeb } from './vite-plugin-react-native-web'
import { markedPlugin } from './vite-plugin-marked'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    markedPlugin(),
    react(),
    reactNativeWeb(),
  ],
  resolve: {
    alias: {
      'react-native-system-ui': path.resolve(__dirname, '../packages/ui/src/index.ts'),
      'react-native-system-utils': path.resolve(__dirname, '../packages/utils/src/index.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['react-native-system-ui', 'react-native-system-utils'],
  },
  server: {
    fs: {
      // 允许访问 packages 目录
      allow: ['..'],
    },
  },
  build: {
    rollupOptions: {
      // 外部化 React Native 特定的模块
      external: [
        '@react-native/assets-registry/registry',
      ],
    },
  },
})
