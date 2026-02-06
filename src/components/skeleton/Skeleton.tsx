import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native'
import { nativeDriverEnabled } from '../../platform'
import { isFiniteNumber, isString } from '../../utils'
import type { SkeletonProps } from './types'
import { useSkeletonTokens } from './tokens'

const normalize = (value: number | string | undefined, fallback: number | string): number | string => isFiniteNumber(value) ? Math.max(0, value) : isString(value) && value.trim() ? value.trim() : fallback

const resolveSeries = (count: number, input: number | string | Array<number | string> | undefined, fallback: number | string): Array<number | string> => Array.from({ length: count }, (_, idx) => normalize(Array.isArray(input) ? input[idx] : input, fallback))

const SkeletonImpl = (props: SkeletonProps, ref: React.ForwardedRef<View>) => {
  const { tokensOverride, isLoaded, loading: loadingProp, animate: animateProp, startColor, speed: speedProp, avatar: avatarProp, avatarSize: avatarSizeProp, avatarShape: avatarShapeProp, title: titleProp, titleWidth: titleWidthProp, row: rowProp, rowWidth: rowWidthProp, rowHeight, round: roundProp, style, children, ...rest } = props
  const tokens = useSkeletonTokens(tokensOverride)
  const loading = loadingProp ?? (isLoaded != null ? !isLoaded : true)
  const animate = animateProp ?? true
  const avatar = avatarProp ?? false
  const avatarSize = avatarSizeProp ?? tokens.defaults.avatarSize
  const avatarShape = avatarShapeProp ?? 'round'
  const title = titleProp ?? false
  const titleWidth = titleWidthProp ?? tokens.defaults.titleWidth
  const row = rowProp ?? tokens.defaults.rowCount
  const rowWidth = rowWidthProp ?? tokens.defaults.rowWidth
  const round = roundProp ?? false
  const speed = isFiniteNumber(speedProp) ? Math.max(0.01, speedProp) : isString(speedProp) && Number.isFinite(Number(speedProp)) && Number(speedProp) > 0 ? Number(speedProp) : 1
  const duration = Math.max(0, tokens.animation.duration / speed)
  const blockColor = startColor ?? tokens.colors.block
  const rows = isFiniteNumber(row) ? Math.max(0, Math.floor(row)) : 0

  const rowWidths = useMemo(() => {
    const widths = resolveSeries(rows, rowWidth, tokens.defaults.rowWidth)
    if (!Array.isArray(rowWidth) && rows > 1 && (props.rowWidth === undefined || (isString(props.rowWidth) && props.rowWidth.trim() === '100%'))) widths[rows - 1] = tokens.defaults.lastRowWidth
    return widths
  }, [props.rowWidth, rowWidth, rows, tokens.defaults.lastRowWidth, tokens.defaults.rowWidth])
  const rowHeights = useMemo(() => resolveSeries(rows, rowHeight, tokens.defaults.rowHeight), [rowHeight, rows, tokens.defaults.rowHeight])

  const titleHeight = rowHeights[0] ?? tokens.defaults.rowHeight
  const resolvedAvatarSize = normalize(avatarSize, tokens.defaults.avatarSize)
  const resolvedTitleWidth = normalize(titleWidth, tokens.defaults.titleWidth)
  const animated = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!loading || !animate || duration <= 0) { animated.setValue(0); return }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(animated, { toValue: 1, duration: duration / 2, useNativeDriver: nativeDriverEnabled }),
      Animated.timing(animated, { toValue: 0, duration: duration / 2, useNativeDriver: nativeDriverEnabled }),
    ]))
    loop.start()
    return () => loop.stop()
  }, [animate, animated, duration, loading])

  const animatedStyle = useMemo(() => (!loading || !animate ? undefined : ({ opacity: animated.interpolate({ inputRange: [0, 1], outputRange: [tokens.animation.minOpacity, tokens.animation.maxOpacity] }) } as unknown as ViewStyle)), [animate, animated, loading, tokens.animation.maxOpacity, tokens.animation.minOpacity])
  const containerStyles = [S.ctr, { gap: tokens.spacing.containerGap }, style]
  const avatarNode = useMemo(() => (!avatar ? null : <Animated.View style={[{ width: resolvedAvatarSize as ViewStyle['width'], height: resolvedAvatarSize as ViewStyle['height'], borderRadius: avatarShape === 'round' ? 999 : tokens.radius, backgroundColor: blockColor }, animatedStyle]} />), [animatedStyle, avatar, avatarShape, blockColor, resolvedAvatarSize, tokens.radius])
  const titleNode = useMemo(() => (!title ? null : <Animated.View style={[{ width: resolvedTitleWidth as ViewStyle['width'], height: titleHeight as ViewStyle['height'], backgroundColor: blockColor, borderRadius: round ? tokens.radius : 0 }, animatedStyle]} />), [animatedStyle, blockColor, resolvedTitleWidth, round, title, titleHeight, tokens.radius])
  const rowNodes = useMemo(() => (rows <= 0 ? null : <View style={S.rows}>{rowWidths.map((width, index) => <Animated.View key={index} testID={`rv-skeleton-row-${index}`} style={[{ width: width as ViewStyle['width'], height: rowHeights[index] as ViewStyle['height'], marginTop: index === 0 && !title ? 0 : tokens.spacing.rowGap, backgroundColor: blockColor, borderRadius: round ? tokens.radius : 0 }, animatedStyle]} />)}</View>), [animatedStyle, blockColor, rowHeights, rowWidths, rows, round, title, tokens.radius, tokens.spacing.rowGap])

  if (!loading) return <View ref={ref} style={style} {...rest}>{children}</View>
  return <View ref={ref} style={containerStyles} {...rest}>{avatarNode}<View style={S.cnt}>{titleNode}{rowNodes}</View></View>
}

const S = StyleSheet.create({ ctr: { flexDirection: 'row', alignItems: 'flex-start' }, cnt: { flex: 1 }, rows: { width: '100%' } })
const SkeletonForwardRef = React.forwardRef<View, SkeletonProps>(SkeletonImpl)
SkeletonForwardRef.displayName = 'Skeleton'
const Skeleton = React.memo(SkeletonForwardRef)
export default Skeleton
