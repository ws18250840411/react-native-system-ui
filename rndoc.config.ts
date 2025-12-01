import { defineConfig } from 'rndoc-cli'

const workspaceRoot = process.cwd()

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
  title: 'react-native-system-ui',
  description: '基于rndoc打造的React组件库',
  locales: false,
  site: {
    themeConfig: {
      simulator: {
        include: ['/components'],
        compact: false,
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
    },
    server: {
      fs: {
        allow: [workspaceRoot],
      },
    },
  },
})
