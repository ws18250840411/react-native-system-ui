import React from 'react'

export interface CellGroupContextValue {
  border: boolean
  inset: boolean
}

export const CellGroupContext = React.createContext<CellGroupContextValue>({
  border: true,
  inset: false,
})
