import type { Plugin } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Vite 插件：支持 react-native-web
 * 
 * 功能：
 * 1. 将 react-native 映射到 react-native-web（带 polyfill）
 * 2. 支持本地组件库开发（react-native-system-ui/utils）
 * 3. 配置 React Native 所需的全局变量
 * 4. 支持 .web.* 平台特定文件
 */
export function reactNativeWeb(options?: { 
  // 本地开发的组件库路径（可选）
  uiPackagePath?: string
  utilsPackagePath?: string
}): Plugin {
  const development = process.env.NODE_ENV === 'development'
  const pluginDir = path.dirname(fileURLToPath(import.meta.url))
  
  // 默认路径
  const uiPath = options?.uiPackagePath || path.resolve(pluginDir, '../packages/ui/src/index.ts')
  const utilsPath = options?.utilsPackagePath || path.resolve(pluginDir, '../packages/utils/src/index.ts')
  const polyfillsDir = path.resolve(pluginDir, './src/polyfills')

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
    enforce: 'pre',

    config() {
      return {
        define: {
          // React Native 全局变量
          global: 'globalThis',
          __DEV__: JSON.stringify(development),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        resolve: {
          extensions,
          alias: [
            // react-native 主包映射到包含 polyfill 的 wrapper
            {
              find: /^react-native$/,
              replacement: path.resolve(polyfillsDir, 'react-native-web-wrapper.tsx'),
            },
            // react-native/Libraries/* 映射到 polyfill（第三方库需要）
            {
              find: /^react-native\/Libraries\/(.+)$/,
              replacement: path.resolve(polyfillsDir, 'react-native-libraries.ts'),
            },
            // react-native/* 其他子路径映射到 react-native-web/*
            {
              find: /^react-native\/(.+)$/,
              replacement: 'react-native-web/$1',
            },
            // 本地组件库映射
            {
              find: 'react-native-system-ui',
              replacement: uiPath,
            },
            {
              find: 'react-native-system-utils',
              replacement: utilsPath,
            },
          ],
        },
        build: {
          commonjsOptions: {
            transformMixedEsModules: true,
          },
        },
        optimizeDeps: {
          // 排除本地包，直接处理源码
          exclude: ['react-native-system-ui', 'react-native-system-utils'],
        },
        server: {
          fs: {
            // 允许访问 packages 目录
            allow: ['..'],
          },
        },
      }
    },
  }
}
