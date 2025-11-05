export const defaultLocale = 'zh-CN' as const

export const locales = [
  ['zh-CN', '中文'],
  ['en-US', 'English'],
] as const

export type LocaleCode = typeof locales[number][0]

export const siteConfig = {
  title: 'React Native System UI',
  description: 'React Native System UI component documentation',
  logo: '',
  github: 'https://github.com/wangwenshan/react-native-system-ui',
}

export const navs = [
  {
    id: 'components',
    path: '/components',
    titles: {
      'zh-CN': '组件',
      'en-US': 'Components',
    },
  },
] as const

export const repository = {
  url: 'https://github.com/wangwenshan/react-native-system-ui',
  branch: 'main',
  packageRoot: '',
}
