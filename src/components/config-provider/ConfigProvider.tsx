import React, { useContext } from 'react'
import { I18nManager } from 'react-native'
import { ThemeProvider } from '../../design-system/ThemeProvider'
import { PortalHost } from '../portal'
import { DirectionContext } from './DirectionContext'
import { LocaleContext } from './LocaleContext'
import type { ConfigProviderProps } from './types'

const ConfigProviderBase: React.FC<ConfigProviderProps> = ({ theme, locale, direction, children }) => { const ctxLocale = useContext(LocaleContext); const ctxDir = useContext(DirectionContext); const rLocale = locale ?? ctxLocale; const rDir = direction ?? ctxDir ?? (I18nManager.isRTL ? 'rtl' : 'ltr'); return <ThemeProvider value={theme}><DirectionContext.Provider value={rDir}><LocaleContext.Provider value={rLocale}><PortalHost>{children}</PortalHost></LocaleContext.Provider></DirectionContext.Provider></ThemeProvider>
}

export const ConfigProvider = React.memo(ConfigProviderBase)
