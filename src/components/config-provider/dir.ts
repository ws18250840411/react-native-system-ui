import React, { useContext } from 'react'
import type { Direction } from './types'

export const DirectionContext = React.createContext<Direction>('ltr')
export const useDirection = () => useContext(DirectionContext)
