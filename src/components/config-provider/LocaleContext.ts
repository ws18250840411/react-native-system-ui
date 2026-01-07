import React from 'react'

import type { Locale } from './locale/types'
import { zhCN } from './locale/zh-CN'

export const LocaleContext = React.createContext<Locale>(zhCN)
