import React from 'react'

import type { Direction } from './types'

export const DirectionContext = React.createContext<Direction>('ltr')
