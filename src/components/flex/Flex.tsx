import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'

import type { FlexContextValue, FlexDirection } from './FlexContext'
import { FlexContext } from './FlexContext'

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
  direction = 'row',
  wrap = 'wrap',
  gutter = 0,
  align = 'start',
  justify = 'start',
  style,
  columns = 24,
}) => {
  const [horizontalGap, verticalGap] = React.useMemo(() => {
    if (Array.isArray(gutter)) {
      return [gutter[0] ?? 0, gutter[1] ?? 0]
    }
    return [gutter, 0]
  }, [gutter])

  const contextValue = React.useMemo<FlexContextValue>(
    () => ({
      horizontalGap,
      verticalGap,
      columns,
      direction,
    }),
    [columns, direction, horizontalGap, verticalGap]
  )

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: alignMap[align],
      justifyContent: justifyMap[justify],
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
