import React from 'react'
import { Animated, Platform, StyleSheet, View } from 'react-native'

import type { SkeletonProps } from './types'
import { useSkeletonTokens } from './tokens'

const DEFAULT_ROW_WIDTH = '100%'
const DEFAULT_LAST_ROW_WIDTH = '60%'

const normalizeValue = (value: number | string | undefined, fallback: number | string): number | string => {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && value.length > 0) return value
  return fallback
}

const resolveSeries = (
  count: number,
  input: number | string | Array<number | string> | undefined,
  fallback: number | string,
): Array<number | string> => {
  if (Array.isArray(input)) {
    return Array.from({ length: count }).map((_, idx) => normalizeValue(input[idx], fallback))
  }
  return Array.from({ length: count }).map(() => normalizeValue(input, fallback))
}

const Skeleton = React.forwardRef<View, SkeletonProps>((props, ref) => {
  const {
    loading = true,
    animate = true,
    avatar = false,
    avatarSize = 32,
    avatarShape = 'round',
    title = false,
    titleWidth = '40%',
    row = 3,
    rowWidth = '100%',
    rowHeight,
    round = false,
    style,
    children,
    ...rest
  } = props

  const tokens = useSkeletonTokens()
  const rows = Math.max(0, row ?? 0)
  const rowWidths = resolveSeries(rows, rowWidth, DEFAULT_ROW_WIDTH)
  const rowHeights = resolveSeries(rows, rowHeight, 16)
  if (
    !Array.isArray(rowWidth) &&
    rows > 1 &&
    (typeof rowWidth === 'undefined' || rowWidth === DEFAULT_ROW_WIDTH)
  ) {
    rowWidths[rows - 1] = DEFAULT_LAST_ROW_WIDTH
  }
  const titleHeight = rowHeights[0] ?? 16

  const animated = React.useRef(new Animated.Value(0)).current
  const loopRef = React.useRef<Animated.CompositeAnimation | null>(null)

  React.useEffect(() => {
    if (loading && animate) {
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(animated, {
            toValue: 1,
            duration: tokens.animation.duration / 2,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(animated, {
            toValue: 0,
            duration: tokens.animation.duration / 2,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]),
      )
      loopRef.current.start()
    } else {
      loopRef.current?.stop()
      animated.setValue(0)
    }
    return () => {
      loopRef.current?.stop()
    }
  }, [animate, animated, loading, tokens.animation.duration])

  const animatedStyle = animate && loading
    ? {
      opacity: animated.interpolate({
        inputRange: [0, 1],
        outputRange: [tokens.animation.minOpacity, tokens.animation.maxOpacity],
      }),
    }
    : null

  if (!loading) {
    return (
      <View ref={ref} style={style} {...rest}>
        {children}
      </View>
    )
  }

  return (
    <View ref={ref} style={[styles.container, { gap: tokens.spacing.containerGap }, style]} {...rest}>
      {avatar ? (
        <Animated.View
          style={
            [
              {
                width: normalizeValue(avatarSize, 32),
                height: normalizeValue(avatarSize, 32),
                borderRadius: avatarShape === 'round' ? 999 : tokens.radius,
                backgroundColor: tokens.colors.block,
              },
              animatedStyle,
            ] as any
          }
        />
      ) : null}
      <View style={styles.content}>
        {title ? (
          <Animated.View
            style={
              [
                styles.title,
                {
                  width: normalizeValue(titleWidth, '40%'),
                  height: titleHeight,
                  backgroundColor: tokens.colors.block,
                  borderRadius: round ? tokens.radius : 0,
                },
                animatedStyle,
              ] as any
            }
          />
        ) : null}
        {rows > 0 ? (
          <View style={styles.rows}>
            {rowWidths.map((width, index) => (
              <Animated.View
                key={index}
                testID={`rv-skeleton-row-${index}`}
                style={
                  [
                    styles.row,
                    {
                      width,
                      height: rowHeights[index],
                      marginTop: index === 0 && !title ? 0 : tokens.spacing.rowGap,
                      backgroundColor: tokens.colors.block,
                      borderRadius: round ? tokens.radius : 0,
                    },
                    animatedStyle,
                  ] as any
                }
              />
            ))}
          </View>
        ) : null}
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
  title: {
    height: 16,
  },
  rows: {
    width: '100%',
  },
  row: {
    height: 16,
  },
})

Skeleton.displayName = 'Skeleton'

export default Skeleton
