import React from 'react'

import { ThemeProvider } from '../../design-system/ThemeProvider'
import { PortalHost } from '../portal'
import { LocaleContext } from './LocaleContext'
import type { ConfigProviderProps } from './types'

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  theme,
  locale,
  children,
}) => {
  const parentLocale = React.useContext(LocaleContext)

  return (
    <ThemeProvider value={theme}>
      <LocaleContext.Provider value={locale ?? parentLocale}>
        <PortalHost>{children}</PortalHost>
      </LocaleContext.Provider>
    </ThemeProvider>
  )
}
