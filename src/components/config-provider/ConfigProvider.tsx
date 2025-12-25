import React from 'react'

import type { ThemeProviderValue } from '../../design-system/ThemeProvider'
import { ThemeProvider } from '../../design-system/ThemeProvider'
import { PortalHost } from '../portal'
import { LocaleContext } from './LocaleContext'
import { zhCN } from './locale/zh-CN'
import type { Locale } from './locale/base'

export interface ConfigProviderProps {
  theme?: ThemeProviderValue
  locale?: Locale
  children: React.ReactNode
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  theme,
  locale,
  children,
}) => {
  const parentLocale = React.useContext(LocaleContext)
  
  // 使用 useMemo 缓存 locale，如果传入了新的 locale 则使用新的，否则使用父级的或默认的
  const localeValue = React.useMemo(() => {
    if (locale) return locale
    if (parentLocale && parentLocale !== zhCN) return parentLocale
    return zhCN
  }, [locale, parentLocale])

  return (
    <ThemeProvider value={theme}>
      <LocaleContext.Provider value={localeValue}>
        <PortalHost>
          {children}
        </PortalHost>
      </LocaleContext.Provider>
    </ThemeProvider>
  )
}
