import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { Platform, Pressable, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import type {
  SpaceAlign,
  SpaceDirection,
  SpaceGap,
  SpaceJustify,
  SpaceProps,
  SpaceSizePreset,
} from './types'
import { resolveGapInput, useSpaceTokens } from './tokens'

export type {
  SpaceAlign,
  SpaceDirection,
  SpaceJustify,
  SpaceGap,
  SpaceProps,
  SpaceSizePreset,
} from './types'

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

export const Space: React.FC<SpaceProps> = props => {
  const {
    children,
    gap,
    size,
    direction: directionProp,
    align,
    justify = 'start',
    wrap: wrapProp,
    block = false,
    fill = false,
    divider,
    style,
    onClick,
    ...rest
  } = props

  const tokens = useSpaceTokens()
  const direction = directionProp ?? tokens.defaults.direction
  const wrap = wrapProp ?? tokens.defaults.wrap

  const gapInput = resolveGapInput(gap, size, tokens.defaults.gapPreset)
  const [horizontalGap, verticalGap] = React.useMemo(
    () => parseGap(gapInput, tokens.presets),
    [gapInput, tokens.presets]
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

    const child = typeof node === 'string' || typeof node === 'number'
      ? <Text>{node}</Text>
      : node

    return (
      <View key={index} style={itemStyle}>
        {child}
      </View>
    )
  }

  const interactive = typeof onClick === 'function'
  const { interactionProps, states } = useAriaPress({
    disabled: !interactive,
    onPress: onClick,
    extraProps: interactive ? { accessibilityRole: 'button' } : undefined,
  })

  const content = composedChildren.map((item, index) =>
    renderItem(
      item.node,
      index,
      item.isDivider,
      item.isDivider ? false : index === composedChildren.length - 1
    )
  )

  if (interactive) {
    return (
      <Pressable
        style={({ pressed }) => [
          containerStyle,
          pressed || states.pressed ? { opacity: 0.85 } : null,
        ]}
        {...interactionProps}
        {...rest}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={containerStyle} {...rest}>
      {content}
    </View>
  )
}
