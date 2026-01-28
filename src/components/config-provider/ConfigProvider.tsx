import React, { useContext, useMemo } from 'react'

import { ThemeProvider } from '../../design-system/ThemeProvider'
import { PortalHost } from '../portal'
import { LocaleContext } from './LocaleContext'
import type { ConfigProviderProps } from './types'

const ConfigProviderBase: React.FC<ConfigProviderProps> = ({
  theme,
  locale,
  children,
}) => {
  const parentLocale = useContext(LocaleContext)
  const resolvedLocale = useMemo(() => locale ?? parentLocale, [locale, parentLocale])

  return (
    <ThemeProvider value={theme}>
      <LocaleContext.Provider value={resolvedLocale}>
        <PortalHost>{children}</PortalHost>
      </LocaleContext.Provider>
    </ThemeProvider>
  )
}

export const ConfigProvider = React.memo(ConfigProviderBase)
