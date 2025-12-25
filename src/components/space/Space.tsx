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

const justifyMap: Record<Exclude<SpaceJustify, 'stretch'>, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
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
    // 对齐 CSS gap 语义：`gap: <row-gap> <column-gap>`，数组写法为 [vertical, horizontal]
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
    style,
    onClick,
    ...rest
  } = props

  const tokens = useSpaceTokens()
  const direction = directionProp ?? tokens.defaults.direction
  const wrap = wrapProp ?? tokens.defaults.wrap

  const gapInput = resolveGapInput(gap, size, tokens.defaults.gapPreset)
  const [rawHorizontalGap, rawVerticalGap] = parseGap(gapInput, tokens.presets)
  const horizontalGap = Math.max(0, rawHorizontalGap)
  const verticalGap = Math.max(0, rawVerticalGap)

  const isHorizontal = direction === 'horizontal'
  const shouldStretchJustify = justify === 'stretch'
  const justifyForStyle: Exclude<SpaceJustify, 'stretch'> = shouldStretchJustify
    ? 'start'
    : justify
  const shouldBlock = block ?? !isHorizontal
  const resolvedAlign: SpaceAlign = align ?? (isHorizontal ? 'center' : 'stretch')
  const supportsGap = Platform.OS === 'web'
  const shouldFillMainAxis = isHorizontal && ((fill ?? false) || shouldStretchJustify)

  const childArray = React.Children.toArray(children).filter(
    child => child !== null && child !== undefined && child !== false
  )

  const composedChildren: Array<{
    node: React.ReactNode
    isDivider: boolean
    key: React.Key
  }> = []
  childArray.forEach((child, index) => {
    const key =
      React.isValidElement(child) && child.key !== null ? child.key : index
    composedChildren.push({ node: child, isDivider: false, key })
    if (divider && index < childArray.length - 1) {
      composedChildren.push({ node: divider, isDivider: true, key: `divider-${String(key)}` })
    }
  })

  const containerBaseStyle = React.useMemo<ViewStyle>(() => {
    const base: ViewStyle = {
      flexDirection: isHorizontal ? 'row' : 'column',
      flexWrap: isHorizontal && wrap ? 'wrap' : 'nowrap',
      alignItems: alignMap[resolvedAlign],
      justifyContent: justifyMap[justifyForStyle],
      width: shouldBlock ? '100%' : undefined,
    }

    if (supportsGap) {
      base.columnGap = isHorizontal ? horizontalGap : undefined
      base.rowGap = verticalGap
    } else {
      base.marginHorizontal =
        isHorizontal && horizontalGap ? -horizontalGap / 2 : undefined
      base.marginVertical = verticalGap ? -verticalGap / 2 : undefined
    }

    return base
  }, [isHorizontal, wrap, resolvedAlign, justifyForStyle, shouldBlock, supportsGap, horizontalGap, verticalGap])

  const spacingStyle = React.useMemo<ViewStyle | undefined>(() => {
    if (supportsGap) return undefined
    if (isHorizontal) {
      return {
        paddingHorizontal: horizontalGap / 2,
        paddingVertical: verticalGap / 2,
      }
    }
    return {
      paddingVertical: verticalGap / 2,
    }
  }, [supportsGap, isHorizontal, horizontalGap, verticalGap])

  const renderItem = React.useCallback((item: (typeof composedChildren)[number]) => {
    const fillStyle: ViewStyle | undefined = item.isDivider
      ? undefined
      : {
          ...(shouldFillMainAxis
            ? {
                flexGrow: 1,
                flexBasis: 0,
                minWidth: 0,
              }
            : {}),
          ...(!isHorizontal && (fill || shouldBlock) ? { width: '100%' } : {}),
        }

    const child =
      typeof item.node === 'string' || typeof item.node === 'number' ? (
        <Text>{item.node}</Text>
      ) : (
        item.node
      )

    return (
      <View key={item.key} style={[spacingStyle, fillStyle]}>
        {child}
      </View>
    )
  }, [shouldFillMainAxis, isHorizontal, fill, shouldBlock, spacingStyle])

  const interactive = typeof onClick === 'function'
  const { interactionProps, states } = useAriaPress({
    disabled: !interactive,
    onPress: onClick,
    extraProps: interactive ? { accessibilityRole: 'button' } : undefined,
  })

  const content = composedChildren.map(renderItem)

  if (interactive) {
    const pressableStyle: StyleProp<ViewStyle> = [
      containerBaseStyle,
      style,
      states.pressed ? { opacity: 0.85 } : null,
    ]
    return (
      <Pressable
        style={pressableStyle}
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
