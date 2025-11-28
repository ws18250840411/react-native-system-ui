import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'

import type { FlexContextValue, FlexDirection } from './FlexContext'
import { FlexContext } from './FlexContext'
import { useFlexTokens } from './tokens'

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
export type FlexAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type FlexJustify = 'start' | 'end' | 'center' | 'around' | 'between'

export interface FlexProps {
  children?: React.ReactNode
  direction?: FlexDirection
  wrap?: FlexWrap
  gutter?: number | [number, number]
  align?: FlexAlign
  justify?: FlexJustify
  style?: StyleProp<ViewStyle>
  columns?: number
}

const alignMap: Record<FlexAlign, ViewStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
}

const justifyMap: Record<FlexJustify, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  around: 'space-around',
  between: 'space-between',
}

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
}) => {
  const tokens = useFlexTokens()
  const resolvedDirection = direction ?? tokens.defaults.direction
  const resolvedWrap = wrap ?? tokens.defaults.wrap
  const resolvedAlign = align ?? tokens.defaults.align
  const resolvedJustify = justify ?? tokens.defaults.justify
  const resolvedColumns = columns ?? tokens.defaults.columns
  const gutterInput = gutter ?? tokens.defaults.gutter

  const [horizontalGap, verticalGap] = React.useMemo(() => {
    if (Array.isArray(gutterInput)) {
      return [gutterInput[0] ?? 0, gutterInput[1] ?? 0]
    }
    return [gutterInput, 0]
  }, [gutterInput])

  const contextValue = React.useMemo<FlexContextValue>(
    () => ({
      horizontalGap,
      verticalGap,
      columns: resolvedColumns,
      direction: resolvedDirection,
    }),
    [horizontalGap, resolvedColumns, resolvedDirection, verticalGap]
  )

  const containerStyle: StyleProp<ViewStyle> = [
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
  ]

  return (
    <FlexContext.Provider value={contextValue}>
      <View style={containerStyle}>{children}</View>
    </FlexContext.Provider>
  )
}
