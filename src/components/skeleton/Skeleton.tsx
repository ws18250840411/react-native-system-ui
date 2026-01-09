import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { isFiniteNumber, isString } from '../../utils/validate'
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

  const rows = isFiniteNumber(row) ? Math.max(0, Math.floor(row)) : 0
  const rowWidths = resolveSeries(rows, rowWidth, tokens.defaults.rowWidth)
  const rowHeights = resolveSeries(rows, rowHeight, tokens.defaults.rowHeight)

  if (
    !Array.isArray(rowWidth) &&
    rows > 1 &&
    (props.rowWidth === undefined || (isString(props.rowWidth) && props.rowWidth.trim() === '100%'))
  ) {
    rowWidths[rows - 1] = tokens.defaults.lastRowWidth
  }

  const titleHeight = rowHeights[0] ?? tokens.defaults.rowHeight
  const resolvedAvatarSize = normalize(avatarSize, tokens.defaults.avatarSize)
  const resolvedTitleWidth = normalize(titleWidth, tokens.defaults.titleWidth)

  const animated = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (!loading || !animate) {
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

  const animatedStyle =
    !loading || !animate
      ? undefined
      : ({
        opacity: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [tokens.animation.minOpacity, tokens.animation.maxOpacity],
        }),
      } as any)

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
          style={[
            {
              width: resolvedAvatarSize,
              height: resolvedAvatarSize,
              borderRadius: avatarShape === 'round' ? 999 : tokens.radius,
              backgroundColor: tokens.colors.block,
            },
            animatedStyle,
          ]}
        />
      ) : null}
      <View style={styles.content}>
        {title ? (
          <Animated.View
            style={[
              {
                width: resolvedTitleWidth,
                height: titleHeight,
                backgroundColor: tokens.colors.block,
                borderRadius: round ? tokens.radius : 0,
              },
              animatedStyle,
            ]}
          />
        ) : null}
        {rows > 0 ? (
          <View style={styles.rows}>
            {rowWidths.map((width, index) => (
              <Animated.View
                key={index}
                testID={`rv-skeleton-row-${index}`}
                style={[
                  {
                    width,
                    height: rowHeights[index],
                    marginTop: index === 0 && !title ? 0 : tokens.spacing.rowGap,
                    backgroundColor: tokens.colors.block,
                    borderRadius: round ? tokens.radius : 0,
                  },
                  animatedStyle,
                ]}
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
  rows: {
    width: '100%',
  },
})

Skeleton.displayName = 'Skeleton'

export default Skeleton
