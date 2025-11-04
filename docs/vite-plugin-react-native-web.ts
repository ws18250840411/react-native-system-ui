import type { Plugin } from 'vite'

/**
 * Vite 插件：支持 react-native-web
 * 参考：https://github.com/Bram-dc/vite-plugin-react-native-web
 */
export function reactNativeWeb(options?: { commonjs?: boolean }): Plugin {
  const development = process.env.NODE_ENV === 'development'

  // 支持的文件扩展名（包括 .web.* 平台特定文件）
  const extensions = [
    '.web.mjs',
    '.web.js',
    '.web.mts',
    '.web.ts',
    '.web.jsx',
    '.web.tsx',
    '.mjs',
    '.js',
    '.mts',
    '.ts',
    '.jsx',
    '.tsx',
    '.json',
  ]

  return {
    name: 'vite-plugin-react-native-web',
    enforce: 'pre', // 在其他插件之前执行

    // 使用 config hook 来配置 Vite
    config() {
      return {
        define: {
          // React Native Web 需要的全局变量
          global: 'globalThis',
          __DEV__: JSON.stringify(development),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.EXPO_OS': JSON.stringify('web'),
        },
        build: {
          commonjsOptions: {
            extensions,
            transformMixedEsModules: true,
          },
        },
        resolve: {
          // 支持平台特定文件扩展名
          extensions,
          alias: {
            // 将 react-native 映射到 react-native-web
            // react-native-web 会自己处理所有的导出，不需要手动转换导入路径
            'react-native': 'react-native-web',
          },
        },
        optimizeDeps: {
          esbuildOptions: {
            resolveExtensions: extensions,
          },
        },
      }
    },
  }
}
