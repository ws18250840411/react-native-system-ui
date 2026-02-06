import React from 'react'
import { Pressable, Text, View, type ViewStyle } from 'react-native'

import { useAriaPress } from '../../hooks'
import type { SpaceAlign, SpaceGap, SpaceJustify, SpaceProps, SpaceSizePreset } from './types'
import { resolveGapInput, useSpaceTokens } from './tokens'
import { parseNumberLike, isFiniteNumber, isFunction, isRenderable, isText } from '../../utils'

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

const parseSpaceSize = (
  value: number | string | undefined,
  presets: Record<SpaceSizePreset, number>
) => {
  if (value === undefined) return presets.normal
  if (isFiniteNumber(value)) return value
  if (typeof value === 'string' && value in presets) {
    return presets[value as SpaceSizePreset]
  }
  return parseNumberLike(value, presets.normal) ?? presets.normal
}

const parseGap = (
  value: SpaceGap | undefined,
  presets: Record<SpaceSizePreset, number>
): [number, number] => {
  if (Array.isArray(value)) {
    return [
      parseSpaceSize(value[0], presets),
      parseSpaceSize(value[1], presets),
    ]
  }
  const parsed = parseSpaceSize(value, presets)
  return [parsed, parsed]
}

export const Space = React.memo((props: SpaceProps) => {
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
  const [rawHorizontalGap, rawVerticalGap] = parseGap(
    gapInput,
    tokens.sizing.presets
  )
  const horizontalGap = Math.max(0, rawHorizontalGap)
  const verticalGap = Math.max(0, rawVerticalGap)

  const shouldStretchJustify = justify === 'stretch'
  const justifyForStyle: Exclude<SpaceJustify, 'stretch'> = shouldStretchJustify
    ? 'start'
    : justify
  const shouldBlock = block ?? !isHorizontal
  const resolvedAlign: SpaceAlign = align ?? (isHorizontal ? 'center' : 'stretch')
  const shouldFillMainAxis = isHorizontal && ((fill ?? false) || shouldStretchJustify)

  // Use native gap — RN >=0.79 supports gap on all platforms
  const containerBaseStyle: ViewStyle = {
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: isHorizontal && wrap ? 'wrap' : 'nowrap',
    alignItems: alignMap[resolvedAlign],
    justifyContent: justifyMap[justifyForStyle],
    width: shouldBlock ? '100%' : undefined,
    columnGap: isHorizontal ? horizontalGap : undefined,
    rowGap: verticalGap,
  }

  const childArray = React.Children.toArray(children).filter(isRenderable)
  const content: React.ReactNode[] = []
  for (let i = 0; i < childArray.length; i++) {
    const child = childArray[i]
    const key: React.Key =
      React.isValidElement(child) && child.key != null ? child.key : i

    const fillStyle: ViewStyle | undefined = shouldFillMainAxis
      ? { flexGrow: 1, flexBasis: 0, minWidth: 0 }
      : !isHorizontal && (fill || shouldBlock)
        ? { width: '100%' }
        : undefined

    const node = isText(child) ? <Text>{child}</Text> : child
    content.push(
      <View key={key} style={fillStyle}>
        {node}
      </View>,
    )

    if (divider && i < childArray.length - 1) {
      const dividerNode = isText(divider) ? <Text>{divider}</Text> : divider
      content.push(
        <View key={`divider-${String(key)}`}>
          {dividerNode}
        </View>,
      )
    }
  }

  const interactive = isFunction(onClick)
  const { interactionProps, states } = useAriaPress({
    disabled: !interactive,
    onPress: onClick,
    extraProps: interactive ? { accessibilityRole: 'button' } : undefined,
  })

  if (interactive) {
    return (
      <Pressable
        style={[
          tokens.layout.container,
          containerBaseStyle,
          style,
          states.pressed && { opacity: 0.85 },
        ]}
        {...interactionProps}
        {...rest}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View
      style={[tokens.layout.container, containerBaseStyle, style]}
      {...rest}
    >
      {content}
    </View>
  )
})

Space.displayName = 'Space'
