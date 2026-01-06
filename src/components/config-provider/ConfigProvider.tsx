import React from 'react'

import type { ThemeProviderValue } from '../../design-system/ThemeProvider'
import { ThemeProvider } from '../../design-system/ThemeProvider'
import { PortalHost } from '../portal'
import { LocaleContext } from './LocaleContext'
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
  const localeValue = locale ?? parentLocale

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
