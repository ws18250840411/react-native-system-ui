import type { Plugin } from 'vite'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export interface ReactNativeWebOptions {
  alias?: Record<string, string>
  exclude?: string[]
}

/**
 * Vite 插件：React Native Web
 * 
 * 与 babel-plugin-react-native-web 功能对等，使用 Vite 的 alias 机制实现
 * 参考：https://github.com/necolas/react-native-web/blob/master/packages/babel-plugin-react-native-web
 */
export function reactNativeWeb(options: ReactNativeWebOptions = {}): Plugin {
  const { alias: customAlias = {}, exclude: customExclude = [] } = options

  // 缓存目录路径
  const pluginDir = dirname(fileURLToPath(import.meta.url))
  const cacheDir = resolve(pluginDir, 'node_modules/.vite-plugin-rn-web')
  const wrapperPath = resolve(cacheDir, 'wrapper.js')
  const librariesPath = resolve(cacheDir, 'libraries.js')

  // Polyfill 代码（内嵌）
  const wrapperCode = `export*from"react-native-web";import React from"react";import{View}from"react-native-web";export const InputAccessoryView=({children,...props})=>React.createElement(View,props,children);export const TurboModuleRegistry={get(n){return process.env.NODE_ENV==="development"&&console.warn(\`[TurboModuleRegistry] "\${n}" not available\`),null},getEnforcing(n){throw new Error(\`[TurboModuleRegistry] "\${n}" not available\`)}};`
  
  const librariesCode = `export default function codegenNativeComponent(){return function(){return null}}`

  // 平台特定文件扩展名
  const extensions = ['.web.mjs','.web.js','.web.mts','.web.ts','.web.jsx','.web.tsx','.mjs','.js','.mts','.ts','.jsx','.tsx','.json']

  return {
    name: 'vite-plugin-react-native-web',
    enforce: 'pre',

    buildStart() {
      if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true })
      writeFileSync(wrapperPath, wrapperCode)
      writeFileSync(librariesPath, librariesCode)
    },

    config() {
      return {
        define: {
          global: 'globalThis',
          __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        resolve: {
          extensions,
          alias: [
            { find: /^react-native$/, replacement: wrapperPath },
            { find: /^react-native\/Libraries\/(.+)$/, replacement: librariesPath },
            { find: /^react-native\/(.+)$/, replacement: 'react-native-web/$1' },
            ...Object.entries(customAlias).map(([find, replacement]) => ({ find, replacement })),
          ],
        },
        build: {
          commonjsOptions: { transformMixedEsModules: true },
        },
        optimizeDeps: {
          exclude: customExclude,
        },
      }
    },
  }
}
