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
  const localeValue = React.useMemo(() => locale ?? zhCN, [locale])

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
