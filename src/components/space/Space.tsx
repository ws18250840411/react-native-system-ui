import React from 'react'
import type { ViewProps, StyleProp, ViewStyle } from 'react-native'
import { Pressable, View } from 'react-native'

export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'
export type SpaceJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch'

export type SpaceGap = number | string | [number | string, number | string]

export interface SpaceProps extends ViewProps {
  children?: React.ReactNode
  gap?: SpaceGap
  direction?: SpaceDirection
  align?: SpaceAlign
  justify?: SpaceJustify
  wrap?: boolean
  block?: boolean
  divider?: React.ReactNode
  onClick?: ViewProps['onTouchEnd']
}

const alignMap: Record<SpaceAlign, ViewStyle['alignItems']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
}

const justifyMap: Record<SpaceJustify, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
}

const parseGapValue = (value?: number | string) => {
  if (value === undefined) return 0
  if (typeof value === 'number') return value
  const parsed = parseFloat(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

const parseGap = (gap?: SpaceGap): [number, number] => {
  if (Array.isArray(gap)) {
    return [parseGapValue(gap[0]), parseGapValue(gap[1])]
  }
  const parsed = parseGapValue(gap)
  return [parsed, parsed]
}

export const Space: React.FC<SpaceProps> = ({
  children,
  gap,
  direction = 'horizontal',
  align = 'center',
  justify = 'start',
  wrap = false,
  block = false,
  divider,
  style,
  onClick,
  ...rest
}) => {
  const [horizontalGap, verticalGap] = React.useMemo(() => parseGap(gap), [gap])
  const isHorizontal = direction === 'horizontal'

  const childArray = React.Children.toArray(children).filter(
    child => child !== null && child !== undefined && child !== false
  )

  const composedChildren: Array<{ node: React.ReactNode; isDivider: boolean }> = []
  childArray.forEach((child, index) => {
    composedChildren.push({ node: child, isDivider: false })
    if (divider && index < childArray.length - 1) {
      composedChildren.push({ node: divider, isDivider: true })
    }
  })

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: isHorizontal ? 'row' : 'column',
      flexWrap: isHorizontal && wrap ? 'wrap' : 'nowrap',
      alignItems: alignMap[align],
      justifyContent: justifyMap[justify],
      width: block ? '100%' : undefined,
    },
    style,
  ]

  const renderItem = (
    node: React.ReactNode,
    index: number,
    isDivider: boolean,
    isLastContent: boolean
  ) => {
    const itemStyle: ViewStyle = {}

    if (isDivider) {
      itemStyle.marginHorizontal = isHorizontal ? horizontalGap / 2 : 0
      itemStyle.marginVertical = !isHorizontal ? verticalGap / 2 : 0
    } else {
      if (isHorizontal) {
        itemStyle.marginRight = wrap || divider ? horizontalGap : isLastContent ? 0 : horizontalGap
        itemStyle.marginBottom = verticalGap
      } else {
        itemStyle.marginBottom = isLastContent ? 0 : verticalGap
      }
      if (!isHorizontal && block) {
        itemStyle.width = '100%'
      }
    }

    return (
      <View key={index} style={itemStyle}>
        {node}
      </View>
    )
  }

  const interactive = typeof onClick === 'function'
  const WrapperComponent = interactive ? Pressable : View

  return (
    <WrapperComponent
      style={containerStyle}
      onPress={interactive ? onClick : undefined}
      {...rest}
    >
      {composedChildren.map((item, index) =>
        renderItem(
          item.node,
          index,
          item.isDivider,
          item.isDivider ? false : index === composedChildren.length - 1
        )
      )}
    </WrapperComponent>
  )
}
