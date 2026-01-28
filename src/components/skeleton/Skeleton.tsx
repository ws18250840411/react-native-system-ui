import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { isFiniteNumber, isString } from '../../utils'
import type { SkeletonProps } from './types'
import { useSkeletonTokens } from './tokens'

const normalize = (
  value: number | string | undefined,
  fallback: number | string,
): number | string =>
  isFiniteNumber(value)
    ? Math.max(0, value)
    : isString(value) && value.trim()
      ? value.trim()
      : fallback

const resolveSeries = (
  count: number,
  input: number | string | Array<number | string> | undefined,
  fallback: number | string,
): Array<number | string> => {
  return Array.from({ length: count }, (_, idx) =>
    normalize(Array.isArray(input) ? input[idx] : input, fallback),
  )
}

const Skeleton = React.forwardRef<View, SkeletonProps>((props, ref) => {
  const {
    tokensOverride,
    loading: loadingProp,
    animate: animateProp,
    avatar: avatarProp,
    avatarSize: avatarSizeProp,
    avatarShape: avatarShapeProp,
    title: titleProp,
    titleWidth: titleWidthProp,
    row: rowProp,
    rowWidth: rowWidthProp,
    rowHeight,
    round: roundProp,
    style,
    children,
    ...rest
  } = props

  const tokens = useSkeletonTokens(tokensOverride)
  const loading = loadingProp ?? true
  const animate = animateProp ?? true
  const avatar = avatarProp ?? false
  const avatarSize = avatarSizeProp ?? tokens.defaults.avatarSize
  const avatarShape = avatarShapeProp ?? 'round'
  const title = titleProp ?? false
  const titleWidth = titleWidthProp ?? tokens.defaults.titleWidth
  const row = rowProp ?? tokens.defaults.rowCount
  const rowWidth = rowWidthProp ?? tokens.defaults.rowWidth
  const round = roundProp ?? false

  const rows = useMemo(
    () => (isFiniteNumber(row) ? Math.max(0, Math.floor(row)) : 0),
    [row],
  )
  const rowWidths = useMemo(() => {
    const widths = resolveSeries(rows, rowWidth, tokens.defaults.rowWidth)
    if (
      !Array.isArray(rowWidth) &&
      rows > 1 &&
      (props.rowWidth === undefined || (isString(props.rowWidth) && props.rowWidth.trim() === '100%'))
    ) {
      widths[rows - 1] = tokens.defaults.lastRowWidth
    }
    return widths
  }, [props.rowWidth, rowWidth, rows, tokens.defaults.lastRowWidth, tokens.defaults.rowWidth])
  const rowHeights = useMemo(
    () => resolveSeries(rows, rowHeight, tokens.defaults.rowHeight),
    [rowHeight, rows, tokens.defaults.rowHeight],
  )

  const titleHeight = useMemo(
    () => rowHeights[0] ?? tokens.defaults.rowHeight,
    [rowHeights, tokens.defaults.rowHeight],
  )
  const resolvedAvatarSize = useMemo(
    () => normalize(avatarSize, tokens.defaults.avatarSize),
    [avatarSize, tokens.defaults.avatarSize],
  )
  const resolvedTitleWidth = useMemo(
    () => normalize(titleWidth, tokens.defaults.titleWidth),
    [titleWidth, tokens.defaults.titleWidth],
  )

  const animated = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!loading || !animate || tokens.animation.duration <= 0) {
      animated.setValue(0)
      return
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animated, {
          toValue: 1,
          duration: tokens.animation.duration / 2,
          useNativeDriver: nativeDriverEnabled,
        }),
        Animated.timing(animated, {
          toValue: 0,
          duration: tokens.animation.duration / 2,
          useNativeDriver: nativeDriverEnabled,
        }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [animate, animated, loading, tokens.animation.duration])

  const animatedStyle = useMemo(() => {
    if (!loading || !animate) return undefined
    return {
      opacity: animated.interpolate({
        inputRange: [0, 1],
        outputRange: [tokens.animation.minOpacity, tokens.animation.maxOpacity],
      }),
    } as unknown as ViewStyle
  }, [animate, animated, loading, tokens.animation.maxOpacity, tokens.animation.minOpacity])

  const containerStyles = useMemo(
    () => [styles.container, { gap: tokens.spacing.containerGap }, style],
    [style, tokens.spacing.containerGap],
  )

  const avatarNode = useMemo(() => {
    if (!avatar) return null
    return (
      <Animated.View
        style={[
          {
            width: resolvedAvatarSize as ViewStyle['width'],
            height: resolvedAvatarSize as ViewStyle['height'],
            borderRadius: avatarShape === 'round' ? 999 : tokens.radius,
            backgroundColor: tokens.colors.block,
          },
          animatedStyle,
        ]}
      />
    )
  }, [animatedStyle, avatar, avatarShape, resolvedAvatarSize, tokens.colors.block, tokens.radius])

  const titleNode = useMemo(() => {
    if (!title) return null
    return (
      <Animated.View
        style={[
          {
            width: resolvedTitleWidth as ViewStyle['width'],
            height: titleHeight as ViewStyle['height'],
            backgroundColor: tokens.colors.block,
            borderRadius: round ? tokens.radius : 0,
          },
          animatedStyle,
        ]}
      />
    )
  }, [animatedStyle, round, resolvedTitleWidth, title, titleHeight, tokens.colors.block, tokens.radius])

  const rowNodes = useMemo(() => {
    if (rows <= 0) return null
    return (
      <View style={styles.rows}>
        {rowWidths.map((width, index) => (
          <Animated.View
            key={index}
            testID={`rv-skeleton-row-${index}`}
            style={[
              {
                width: width as ViewStyle['width'],
                height: rowHeights[index] as ViewStyle['height'],
                marginTop: index === 0 && !title ? 0 : tokens.spacing.rowGap,
                backgroundColor: tokens.colors.block,
                borderRadius: round ? tokens.radius : 0,
              },
              animatedStyle,
            ]}
          />
        ))}
      </View>
    )
  }, [animatedStyle, rowHeights, rowWidths, round, rows, title, tokens.colors.block, tokens.radius, tokens.spacing.rowGap])

  if (!loading) {
    return (
      <View ref={ref} style={style} {...rest}>
        {children}
      </View>
    )
  }

  return (
    <View ref={ref} style={containerStyles} {...rest}>
      {avatarNode}
      <View style={styles.content}>
        {titleNode}
        {rowNodes}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  rows: {
    width: '100%',
  },
})

Skeleton.displayName = 'Skeleton'

export default Skeleton
