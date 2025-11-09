import { defineConfig } from 'rndoc-cli';

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
});
