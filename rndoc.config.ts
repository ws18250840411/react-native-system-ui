import { defineConfig } from 'rndoc-cli'
import { createRequire } from 'module'
import path from 'path'

const workspaceRoot = process.cwd()
const require = createRequire(import.meta.url)
const rndocCliRoot = path.dirname(require.resolve('rndoc-cli/package.json'))
const resolveFromRndoc = (name: string) => require.resolve(name, { paths: [rndocCliRoot] })
const codegenNativeComponentMock = path.join(workspaceRoot, 'scripts/shims/codegenNativeComponent.tsx')
const reactNativeSvgShim = path.join(workspaceRoot, 'scripts/shims/react-native-svg')
const reactNativeSafeAreaContextShim = path.join(workspaceRoot, 'scripts/shims/react-native-safe-area-context.ts')
const reactNativeResolveExtensions = [
  '.web.mjs',
  '.web.js',
  '.web.ts',
  '.web.tsx',
  '.web.jsx',
  '.native.mjs',
  '.native.js',
  '.native.ts',
  '.native.tsx',
  '.native.jsx',
  '.mjs',
  '.js',
  '.ts',
  '.tsx',
  '.jsx',
  '.json',
]

const manualChunks = (id: string) => {
  if (id.includes('node_modules')) {
    if (id.includes('react-dom') || id.includes('react/jsx-runtime') || id.includes('scheduler')) {
      return 'react-runtime'
    }
    if (id.includes('react-native-web')) {
      return 'react-native-web'
    }
    if (id.includes('@react-native-aria') || id.includes('@react-stately')) {
      return 'aria-kits'
    }
    return 'vendor'
  }

  if (id.includes('/src/components/')) {
    return 'rnui-components'
  }

  if (id.includes('/src/hooks/')) {
    return 'rnui-hooks'
  }

  if (id.includes('/docs/components/')) {
    return 'docs-demos'
  }

  return undefined
}

export default defineConfig({
  title: 'SysUI',
  description: '面向 React Native 的设计系统级组件库，Tokens + ThemeProvider 主题体系，按需引入、体积小；API 统一可组合、高效可靠，支持可访问性与多端一致。',
  locales: false,
  build: {
    rn: true,
    entry: 'src/index.ts',
    disableTypeCheck: true,
    extraBabelPresets: [
      resolveFromRndoc('@babel/preset-typescript'),
      resolveFromRndoc('@babel/preset-react'),
    ],
    configureVite: (config: any) => {
      // 解决 react-native-svg 等依赖在 Web 端引入 codegenNativeComponent 导致的 Vite optimizeDeps 报错
      const resolve = config.resolve ?? {}
      const alias = resolve.alias ?? []
      const extensions = resolve.extensions ?? []

      const normalized = Array.isArray(alias)
        ? alias.slice()
        : Object.entries(alias).map(([find, replacement]) => ({ find, replacement }))

      // 确保优先命中更具体的 alias，避免被 `react-native -> react-native-web` 前缀替换
      const nextAlias = [
        // 文档站点开发时直接指向源码，避免依赖 dist 的导出是否最新
        { find: /^react-native-system-ui$/, replacement: path.join(workspaceRoot, 'src/index.ts') },
        { find: 'react-native/Libraries/Utilities/codegenNativeComponent', replacement: codegenNativeComponentMock },
        // 将 react-native-svg 替换为包装模块，Vite 会根据扩展名自动选择 .web.ts 或 .native.ts
        { find: 'react-native-svg', replacement: reactNativeSvgShim },
        // 文档构建时使用 Web 用 shim，避免 react-native-safe-area-context 引入 TurboModuleRegistry（react-native-web 未导出）
        { find: 'react-native-safe-area-context', replacement: reactNativeSafeAreaContextShim },
        ...normalized.filter(item => item?.find !== 'react-native/Libraries/Utilities/codegenNativeComponent' && item?.find !== 'react-native-svg' && item?.find !== 'react-native-safe-area-context'),
      ]

      return {
        ...config,
        define: {
          ...(config.define ?? {}),
          // 浏览器环境没有 global，react-native-web Animated 等会用到 global，用 globalThis 替代
          global: 'globalThis',
        },
        resolve: {
          ...resolve,
          alias: nextAlias,
          extensions: reactNativeResolveExtensions.concat(
            extensions.filter((ext: string) => !reactNativeResolveExtensions.includes(ext)),
          ),
        },
      }
    },
  },
  site: {
    themeConfig: {
      simulator: {
        include: ['/components'],
        compact: true,
      },
    },
  },
  navs: [
    {
      title: '首页',
      path: '/',
    },
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: '组件',
      path: '/components',
    },
    {
      title: '了解更多',
      children: [
        {
          title: '在线体验',
          path: 'https://codesandbox.io/s/uelmz4?resolutionWidth=320&resolutionHeight=675',
        },
        {
          title: 'Issues',
          path: 'https://gitee.com/ws18250840411/rndoc/issues',
        }
      ],
    },
  ],
  menus: {
    '/components': [
      {
        title: '布局组件',
        children: ['/components/flex', '/components/space'],
      },
      {
        title: '基础组件',
        children: [
          '/components/button',
          '/components/cell',
          '/components/config-provider',
          '/components/typography',
          '/components/icon',
          '/components/image',
          '/components/popup',
          '/components/portal',
          '/components/toast',
        ],
      },
      {
        title: '表单组件',
        children: [
          '/components/calendar',
          '/components/cascader',
          '/components/checkbox',
          '/components/datetime-picker',
          '/components/form',
          '/components/input',
          '/components/number-keyboard',
          '/components/password-input',
          '/components/picker',
          '/components/radio',
          '/components/rate',
          '/components/search',
          '/components/selector',
          '/components/slider',
          '/components/stepper',
          '/components/switch',
          '/components/uploader',
        ],
      },
      {
        title: '反馈组件',
        children: [
          '/components/action-sheet',
          '/components/dialog',
          '/components/dropdown-menu',
          '/components/loading',
          '/components/notify',
          '/components/overlay',
          '/components/pull-refresh',
          '/components/share-sheet',
        ],
      },
      {
        title: '展示组件',
        children: [
          '/components/avatar',
          '/components/badge',
          '/components/circle',
          '/components/collapse',
          '/components/count-down',
          '/components/divider',
          '/components/empty',
          '/components/field',
          '/components/image-preview',
          '/components/list',
          '/components/notice-bar',
          '/components/progress',
          '/components/swiper',
          '/components/skeleton',
          '/components/tag',
          '/components/water-mark',
        ],
      },
      {
        title: '导航组件',
        children: [
          '/components/grid',
          '/components/index-bar',
          '/components/nav-bar',
          '/components/pagination',
          '/components/sidebar',
          '/components/tabs',
          '/components/tabbar',
        ],
      },
      {
        title: '业务组件',
        children: ['/components/area'],
      },
    ],
  },
  vite: {
    plugins: [
      {
        name: 'rnui-docs-manual-chunks',
        configResolved(config) {
          if (!config.build.rollupOptions) {
            config.build.rollupOptions = {}
          }
          if (!config.build.rollupOptions.output) {
            config.build.rollupOptions.output = {}
          }
          if (Array.isArray(config.build.rollupOptions.output)) {
            config.build.rollupOptions.output = config.build.rollupOptions.output.map(output => ({
              ...output,
              manualChunks: output.manualChunks ?? manualChunks,
            }))
          } else {
            config.build.rollupOptions.output = {
              ...config.build.rollupOptions.output,
              manualChunks:
                (config.build.rollupOptions.output as any)?.manualChunks ?? manualChunks,
            }
          }
          config.build.chunkSizeWarningLimit = Math.max(config.build.chunkSizeWarningLimit ?? 500, 900)
        },
      },
    ],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
      // Icon 组件在 Native 端才会用到 react-native-svg，Web 文档站点无需预构建它
      exclude: ['react-native-svg'],
    },
    server: {
      fs: {
        allow: [workspaceRoot],
      },
    },
  },
})
