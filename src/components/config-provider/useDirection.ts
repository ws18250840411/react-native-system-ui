import { useContext } from 'react'

import { DirectionContext } from './DirectionContext'

export const useDirection = () => useContext(DirectionContext)
