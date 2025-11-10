import React from 'react'
import { View } from 'react-native'
import type { FlexStyle, ViewProps, ViewStyle } from 'react-native'

import { createFC } from '../../foundation/createFC'

export type FlexDirection = NonNullable<FlexStyle['flexDirection']>
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

export type FlexProps = ViewProps & {
  direction?: FlexDirection
  justify?: FlexJustify
  align?: FlexAlign
  wrap?: NonNullable<FlexStyle['flexWrap']>
  gap?: number
}

const justifyMap: Record<FlexJustify, FlexStyle['justifyContent']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const alignMap: Record<FlexAlign, FlexStyle['alignItems']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
}

const Flex = createFC<FlexProps>(({ props, ref }) => {
  return () => {
    const {
      direction = 'row',
      justify = 'start',
      align = 'stretch',
      wrap = 'nowrap',
      gap,
      style,
      ...rest
    } = props

    const resolved: ViewStyle = {
      display: 'flex',
      flexDirection: direction,
      justifyContent: justifyMap[justify],
      alignItems: alignMap[align],
      flexWrap: wrap,
    }

    if (typeof gap === 'number') {
      ;(resolved as any).gap = gap
      ;(resolved as any).rowGap = gap
      ;(resolved as any).columnGap = gap
    }

    return <View ref={ref} style={[resolved, style]} {...rest} />
  }
})

export default Flex
