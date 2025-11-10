import React from 'react'

import { ThemeProvider } from '../theme/ThemeProvider'
import type { ThemeOverride } from '../theme/tokens'
import { ToastContainer } from '../components/Toast'

export type UIProviderProps = {
  theme?: ThemeOverride
  children?: React.ReactNode
}

export const UIProvider: React.FC<UIProviderProps> = ({ theme, children }) => {
  return (
    <ThemeProvider value={theme}>
      {children}
      <ToastContainer />
    </ThemeProvider>
  )
}

export default UIProvider
