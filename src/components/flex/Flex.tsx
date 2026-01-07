import React from 'react'
import { StyleSheet, View } from 'react-native'

import { FlexContext } from './FlexContext'
import { useFlexTokens } from './tokens'
import type { FlexProps } from './types'

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export const Flex: React.FC<FlexProps> = ({
  children,
  direction,
  wrap,
  gutter,
  align,
  justify,
  style,
  columns,
  tokensOverride,
}) => {
  const tokens = useFlexTokens(tokensOverride)
  const resolvedDirection = direction ?? tokens.defaults.direction
  const resolvedWrap = wrap ?? tokens.defaults.wrap
  const resolvedAlign = align ?? tokens.defaults.align
  const resolvedJustify = justify ?? tokens.defaults.justify
  const resolvedColumns = Math.max(1, columns ?? tokens.defaults.columns)
  const gutterInput = gutter ?? tokens.defaults.gutter

  let horizontalGap = 0
  let verticalGap = 0
  if (Array.isArray(gutterInput)) {
    horizontalGap = gutterInput[0] ?? 0
    verticalGap = gutterInput[1] ?? 0
  } else {
    horizontalGap = gutterInput
  }
  horizontalGap = Math.max(0, horizontalGap)
  verticalGap = Math.max(0, verticalGap)

  return (
    <FlexContext.Provider value={{ horizontalGap, verticalGap, columns: resolvedColumns }}>
      <View
        style={[
          styles.container,
          {
            flexDirection: resolvedDirection,
            flexWrap: resolvedWrap,
            alignItems: alignMap[resolvedAlign],
            justifyContent: justifyMap[resolvedJustify],
            marginHorizontal: horizontalGap ? -horizontalGap / 2 : undefined,
            marginVertical: verticalGap ? -verticalGap / 2 : undefined,
          },
          style,
        ]}
      >
        {children}
      </View>
    </FlexContext.Provider>
  )
}
