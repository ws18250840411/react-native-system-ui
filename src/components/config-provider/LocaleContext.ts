import React from 'react'

import type { Locale } from './locale/base'
import { zhCN } from './locale/zh-CN'

export const LocaleContext = React.createContext<Locale>(zhCN)
