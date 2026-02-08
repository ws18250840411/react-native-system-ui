import React, { useContext } from 'react'
import { I18nManager } from 'react-native'
import { ThemeProvider } from '../../design-system/ThemeProvider'
import { PortalHost } from '../portal'
import { DirectionContext } from './DirectionContext'
import { LocaleContext } from './LocaleContext'
import type { ConfigProviderProps } from './types'

const ConfigProviderBase: React.FC<ConfigProviderProps> = ({ theme, locale, direction, children }) => {
  const ctxLocale = useContext(LocaleContext)
  const ctxDirection = useContext(DirectionContext)
  const resolvedLocale = locale ?? ctxLocale
  const resolvedDirection = direction ?? ctxDirection ?? (I18nManager.isRTL ? 'rtl' : 'ltr')
  return (
    <ThemeProvider value={theme}>
      <DirectionContext.Provider value={resolvedDirection}>
        <LocaleContext.Provider value={resolvedLocale}>
          <PortalHost>{children}</PortalHost>
        </LocaleContext.Provider>
      </DirectionContext.Provider>
    </ThemeProvider>
  )
}

export const ConfigProvider = React.memo(ConfigProviderBase)
