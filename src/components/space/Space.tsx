import React from 'react'
import { Platform, Pressable, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import type { SpaceAlign, SpaceGap, SpaceJustify, SpaceProps, SpaceSizePreset } from './types'
import { resolveGapInput, useSpaceTokens } from './tokens'

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
} as const

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const

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
    const verticalGap = parseValue(value[0], presets)
    const horizontalGap = parseValue(value[1], presets)
    return [horizontalGap, verticalGap]
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
    block,
    fill,
    divider,
    tokensOverride,
    style,
    onClick,
    ...rest
  } = props

  const tokens = useSpaceTokens(tokensOverride)
  const isHorizontal = (directionProp ?? tokens.defaults.direction) === 'horizontal'
  const wrap = wrapProp ?? tokens.defaults.wrap

  const gapInput = resolveGapInput(gap, size, tokens.defaults.gapPreset)
  const [rawHorizontalGap, rawVerticalGap] = parseGap(gapInput, tokens.presets)
  const horizontalGap = Math.max(0, rawHorizontalGap)
  const verticalGap = Math.max(0, rawVerticalGap)

  const shouldStretchJustify = justify === 'stretch'
  const justifyForStyle: Exclude<SpaceJustify, 'stretch'> = shouldStretchJustify
    ? 'start'
    : justify
  const shouldBlock = block ?? !isHorizontal
  const resolvedAlign: SpaceAlign = align ?? (isHorizontal ? 'center' : 'stretch')
  const supportsGap = Platform.OS === 'web'
  const shouldFillMainAxis = isHorizontal && ((fill ?? false) || shouldStretchJustify)

  const containerBaseStyle: any = {
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: isHorizontal && wrap ? 'wrap' : 'nowrap',
    alignItems: alignMap[resolvedAlign],
    justifyContent: justifyMap[justifyForStyle],
    width: shouldBlock ? '100%' : undefined,
  }

  const spacingStyle: any = supportsGap
    ? null
    : isHorizontal
      ? { paddingHorizontal: horizontalGap / 2, paddingVertical: verticalGap / 2 }
      : { paddingVertical: verticalGap / 2 }

  if (supportsGap) {
    containerBaseStyle.columnGap = isHorizontal ? horizontalGap : undefined
    containerBaseStyle.rowGap = verticalGap
  } else {
    containerBaseStyle.marginHorizontal = isHorizontal && horizontalGap ? -horizontalGap / 2 : undefined
    containerBaseStyle.marginVertical = verticalGap ? -verticalGap / 2 : undefined
  }

  const childArray = React.Children.toArray(children).filter(child => child != null && child !== false)
  const content: React.ReactNode[] = []
  childArray.forEach((child, index) => {
    const key = React.isValidElement(child) && child.key !== null ? child.key : index
    const fillStyle = shouldFillMainAxis
      ? { flexGrow: 1, flexBasis: 0, minWidth: 0 }
      : !isHorizontal && (fill || shouldBlock)
        ? { width: '100%' }
        : null
    const node = typeof child === 'string' || typeof child === 'number' ? <Text>{child}</Text> : child
    content.push(
      <View key={key as any} style={[spacingStyle, fillStyle]}>
        {node}
      </View>,
    )

    if (divider && index < childArray.length - 1) {
      const dividerNode =
        typeof divider === 'string' || typeof divider === 'number' ? <Text>{divider}</Text> : divider
      content.push(
        <View key={`divider-${String(key)}`} style={spacingStyle}>
          {dividerNode}
        </View>,
      )
    }
  })

  const interactive = typeof onClick === 'function'
  const { interactionProps, states } = useAriaPress({
    disabled: !interactive,
    onPress: onClick,
    extraProps: interactive ? { accessibilityRole: 'button' } : undefined,
  })

  if (interactive) {
    return (
      <Pressable
        style={[containerBaseStyle, style, states.pressed ? { opacity: 0.85 } : null]}
        {...interactionProps}
        {...rest}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={[containerBaseStyle, style]} {...rest}>
      {content}
    </View>
  )
}
