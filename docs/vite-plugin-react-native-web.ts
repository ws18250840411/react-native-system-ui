import type { Plugin } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

export interface ReactNativeWebOptions {
  alias?: Record<string, string>
  exclude?: string[]
}

export function reactNativeWeb(options: ReactNativeWebOptions = {}): Plugin {
  const { alias: customAlias = {}, exclude: customExclude = [] } = options
  const development = process.env.NODE_ENV === 'development'
  const pluginDir = path.dirname(fileURLToPath(import.meta.url))
  const polyfillsDir = path.resolve(pluginDir, '.vite-plugin-rn-web')
  const extensions = [
    '.web.mjs', '.web.js', '.web.mts', '.web.ts', '.web.jsx', '.web.tsx',
    '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json',
  ]

  return {
    name: 'vite-plugin-react-native-web',
    enforce: 'pre',

    config() {
      return {
        define: {
          global: 'globalThis',
          __DEV__: JSON.stringify(development),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        resolve: {
          extensions,
          alias: [
            { find: /^react-native$/, replacement: path.resolve(polyfillsDir, 'react-native-web-wrapper.js') },
            { find: /^react-native\/Libraries\/(.+)$/, replacement: path.resolve(polyfillsDir, 'react-native-libraries.js') },
            { find: /^react-native\/(.+)$/, replacement: 'react-native-web/$1' },
            ...Object.entries(customAlias).map(([find, replacement]) => ({ find, replacement })),
          ],
        },
        build: {
          commonjsOptions: {
            transformMixedEsModules: true,
          },
        },
        optimizeDeps: {
          exclude: customExclude,
        },
      }
    },
  }
}
