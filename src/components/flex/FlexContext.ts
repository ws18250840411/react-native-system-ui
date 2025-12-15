import React from 'react'

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

export interface FlexContextValue {
  horizontalGap: number
  verticalGap: number
  columns: number
}

export const FlexContext = React.createContext<FlexContextValue>({
  horizontalGap: 0,
  verticalGap: 0,
  columns: 24,
})
