import React, { useMemo } from 'react'
import { Platform, View } from 'react-native'

import { useFlexTokens } from './tokens'
import type { FlexProps } from './types'

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

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
} as const

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  around: 'space-around',
  between: 'space-between',
} as const

const FlexImpl: React.FC<FlexProps> = props => {
  const {
    tokensOverride,
    children,
    direction: directionProp,
    wrap: wrapProp,
    gutter: gutterProp,
    align: alignProp,
    justify: justifyProp,
    style,
    columns: columnsProp,
  } = props

  const tokens = useFlexTokens(tokensOverride)
  const direction = directionProp ?? tokens.defaults.direction
  const wrap = wrapProp ?? tokens.defaults.wrap
  const gutter = gutterProp ?? tokens.defaults.gutter
  const align = alignProp ?? tokens.defaults.align
  const justify = justifyProp ?? tokens.defaults.justify
  const columns = columnsProp ?? tokens.defaults.columns

  const resolvedColumns = Math.max(1, columns)
  const [hRaw, vRaw] = Array.isArray(gutter) ? gutter : [gutter, 0]
  const horizontalGap = Math.max(0, hRaw ?? 0)
  const verticalGap = Math.max(0, vRaw ?? 0)
  const supportsGap = Platform.OS === 'web'

  const contextValue = useMemo(
    () => ({ horizontalGap, verticalGap, columns: resolvedColumns }),
    [horizontalGap, verticalGap, resolvedColumns],
  )

  return (
    <FlexContext.Provider value={contextValue}>
      <View
        style={[
          tokens.layout.container,
          {
            flexDirection: direction,
            flexWrap: wrap,
            alignItems: alignMap[align],
            justifyContent: justifyMap[justify],
            marginHorizontal: !supportsGap && horizontalGap ? -horizontalGap / 2 : undefined,
            marginVertical: !supportsGap && verticalGap ? -verticalGap / 2 : undefined,
            columnGap: supportsGap ? horizontalGap : undefined,
            rowGap: supportsGap ? verticalGap : undefined,
          },
          style,
        ]}
      >
        {children}
      </View>
    </FlexContext.Provider>
  )
}

export const Flex = React.memo(FlexImpl)

Flex.displayName = 'Flex'
