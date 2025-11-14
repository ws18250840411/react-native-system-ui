import React from 'react'

import { LocaleContext } from './LocaleContext'

export const useLocale = () => React.useContext(LocaleContext)
