import React from 'react'
import type { ViewProps, StyleProp, ViewStyle } from 'react-native'
import { Platform, Pressable, View } from 'react-native'

import { useTheme } from '../../design-system'

export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type SpaceJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch'

export type SpaceGap = number | string | [number | string, number | string]
export type SpaceSizePreset = 'mini' | 'small' | 'normal' | 'large'

export interface SpaceProps extends ViewProps {
  children?: React.ReactNode
  gap?: SpaceGap
  size?: SpaceGap | SpaceSizePreset
  direction?: SpaceDirection
  align?: SpaceAlign
  justify?: SpaceJustify
  wrap?: boolean
  block?: boolean
  fill?: boolean
  divider?: React.ReactNode
  onClick?: ViewProps['onTouchEnd']
}

const alignMap: Record<SpaceAlign, ViewStyle['alignItems']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
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

const parseValue = (
  value: number | string | undefined,
  presets: Record<SpaceSizePreset, number>
) => {
  if (value === undefined) return presets.normal
  if (typeof value === 'number') return value

  const presetValue = presets[value as SpaceSizePreset]
  if (presetValue !== undefined) return presetValue

  const parsed = parseFloat(value)
  return Number.isNaN(parsed) ? presets.normal : parsed
}

const parseGap = (
  value: SpaceGap | undefined,
  presets: Record<SpaceSizePreset, number>
): [number, number] => {
  if (Array.isArray(value)) {
    return [parseValue(value[0], presets), parseValue(value[1], presets)]
  }
  const parsed = parseValue(value, presets)
  return [parsed, parsed]
}

export const Space: React.FC<SpaceProps> = ({
  children,
  gap,
  size,
  direction = 'horizontal',
  align,
  justify = 'start',
  wrap = false,
  block = false,
  fill = false,
  divider,
  style,
  onClick,
  ...rest
}) => {
  const { foundations } = useTheme()
  const presets = React.useMemo(
    () => ({
      mini: foundations.spacing.xxs ?? foundations.spacing.xs ?? 4,
      small: foundations.spacing.xs,
      normal: foundations.spacing.sm,
      large: foundations.spacing.md,
    }),
    [foundations.spacing]
  )

  const gapInput = gap ?? size ?? 'normal'
  const [horizontalGap, verticalGap] = React.useMemo(
    () => parseGap(gapInput, presets),
    [gapInput, presets]
  )

  const isHorizontal = direction === 'horizontal'
  const shouldBlock = block ?? !isHorizontal
  const resolvedAlign: SpaceAlign = align ?? (isHorizontal ? 'center' : 'stretch')
  const supportsGap = Platform.OS === 'web'

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
      alignItems: alignMap[resolvedAlign],
      justifyContent: justifyMap[justify],
      width: shouldBlock ? '100%' : undefined,
      ...(supportsGap
        ? {
            columnGap: isHorizontal ? horizontalGap : undefined,
            rowGap: verticalGap,
          }
        : null),
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

    if (supportsGap) {
      // gap handles spacing in web; divider just renders inline
    } else if (isDivider) {
      itemStyle.marginHorizontal = isHorizontal ? horizontalGap / 2 : 0
      itemStyle.marginVertical = !isHorizontal ? verticalGap / 2 : 0
    } else {
      if (isHorizontal) {
        itemStyle.marginRight = wrap || divider ? horizontalGap : isLastContent ? 0 : horizontalGap
        itemStyle.marginBottom = verticalGap
        if (fill) {
          itemStyle.flexGrow = 1
          itemStyle.flexBasis = 0
          itemStyle.minWidth = 0
        }
      } else {
        itemStyle.marginBottom = isLastContent ? 0 : verticalGap
        if (fill || shouldBlock) {
          itemStyle.width = '100%'
        }
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
