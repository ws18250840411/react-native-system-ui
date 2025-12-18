import React from 'react'
import {
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type PanResponderGestureState,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

export type SwipeCellSide = 'left' | 'right'
export type SwipeCellPosition = SwipeCellSide | 'closed'

export interface SwipeCellRef {
  open: (side: SwipeCellSide) => void
  close: () => void
  getPosition: () => SwipeCellPosition
}

export interface SwipeCellProps {
  left?: React.ReactNode
  right?: React.ReactNode
  leftWidth?: number
  rightWidth?: number
  disabled?: boolean
  /**
   * 触发打开的阈值比例（0-1），默认 0.3
   */
  threshold?: number
  /**
   * 动画时长（ms）
   * @default 180
   */
  duration?: number
  /**
   * 打开某一侧时触发
   */
  onOpen?: (side: SwipeCellSide) => void
  /**
   * 关闭时触发（从 left/right 关闭）
   */
  onClose?: (side: SwipeCellSide) => void
  /**
   * 位置变化时触发
   */
  onChange?: (position: SwipeCellPosition) => void
  style?: StyleProp<ViewStyle>
  leftStyle?: StyleProp<ViewStyle>
  rightStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

const isHorizontalSwipe = (gesture: PanResponderGestureState) => {
  const dx = Math.abs(gesture.dx)
  const dy = Math.abs(gesture.dy)
  return dx > 6 && dx > dy
}

export const SwipeCell = React.forwardRef<SwipeCellRef, SwipeCellProps>((props, ref) => {
  const {
    left,
    right,
    leftWidth: leftWidthProp,
    rightWidth: rightWidthProp,
    disabled = false,
    threshold = 0.3,
    duration = 180,
    onOpen,
    onClose,
    onChange,
    style,
    leftStyle,
    rightStyle,
    contentStyle,
    children,
  } = props

  const translateX = React.useRef(new Animated.Value(0)).current
  const positionRef = React.useRef<SwipeCellPosition>('closed')
  const startXRef = React.useRef(0)

  const [measuredLeftWidth, setMeasuredLeftWidth] = React.useState(0)
  const [measuredRightWidth, setMeasuredRightWidth] = React.useState(0)

  const leftWidth = Math.max(0, leftWidthProp ?? measuredLeftWidth)
  const rightWidth = Math.max(0, rightWidthProp ?? measuredRightWidth)

  const emitPositionChange = React.useCallback(
    (next: SwipeCellPosition) => {
      if (positionRef.current !== next) {
        positionRef.current = next
        onChange?.(next)
      }
    },
    [onChange]
  )

  const animateTo = React.useCallback(
    (target: number, nextPosition: SwipeCellPosition) => {
      const prevPosition = positionRef.current
      translateX.stopAnimation()
      Animated.timing(translateX, {
        toValue: target,
        duration: Math.max(0, duration),
        useNativeDriver: Platform.OS !== 'web',
      }).start(({ finished }) => {
        if (!finished) return
        if (nextPosition !== prevPosition) {
          if (prevPosition === 'left') onClose?.('left')
          if (prevPosition === 'right') onClose?.('right')
          if (nextPosition === 'left') onOpen?.('left')
          if (nextPosition === 'right') onOpen?.('right')
        }
        emitPositionChange(nextPosition)
      })
    },
    [duration, emitPositionChange, onClose, onOpen, translateX]
  )

  const open = React.useCallback(
    (side: SwipeCellSide) => {
      if (disabled) return
      if (side === 'left' && leftWidth > 0) {
        animateTo(leftWidth, 'left')
      } else if (side === 'right' && rightWidth > 0) {
        animateTo(-rightWidth, 'right')
      }
    },
    [animateTo, disabled, leftWidth, rightWidth]
  )

  const close = React.useCallback(() => {
    animateTo(0, 'closed')
  }, [animateTo])

  React.useImperativeHandle(
    ref,
    () => ({
      open,
      close,
      getPosition: () => positionRef.current,
    }),
    [close, open]
  )

  const handleLeftLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (leftWidthProp != null) return
      const width = event.nativeEvent.layout.width
      if (width && width !== measuredLeftWidth) setMeasuredLeftWidth(width)
    },
    [leftWidthProp, measuredLeftWidth]
  )

  const handleRightLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (rightWidthProp != null) return
      const width = event.nativeEvent.layout.width
      if (width && width !== measuredRightWidth) setMeasuredRightWidth(width)
    },
    [measuredRightWidth, rightWidthProp]
  )

  const decideTarget = React.useCallback(
    (current: number, gesture: PanResponderGestureState) => {
      const velocityX = gesture.vx ?? 0
      const hasLeft = leftWidth > 0 && !!left
      const hasRight = rightWidth > 0 && !!right

      const safeThreshold = clamp(threshold, 0, 1)
      const leftThreshold = leftWidth * safeThreshold
      const rightThreshold = rightWidth * safeThreshold

      if (velocityX > 0.35 && hasLeft) return { target: leftWidth, position: 'left' as const }
      if (velocityX < -0.35 && hasRight) return { target: -rightWidth, position: 'right' as const }

      if (current > leftThreshold && hasLeft) return { target: leftWidth, position: 'left' as const }
      if (current < -rightThreshold && hasRight) return { target: -rightWidth, position: 'right' as const }

      return { target: 0, position: 'closed' as const }
    },
    [left, leftWidth, right, rightWidth, threshold]
  )

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_evt, gesture) => !disabled && isHorizontalSwipe(gesture),
        onPanResponderGrant: () => {
          translateX.stopAnimation(value => {
            startXRef.current = value
          })
        },
        onPanResponderMove: (_evt, gesture) => {
          const next = startXRef.current + gesture.dx
          const clamped = clamp(next, -rightWidth, leftWidth)
          translateX.setValue(clamped)
        },
        onPanResponderRelease: (_evt, gesture) => {
          translateX.stopAnimation(value => {
            const decided = decideTarget(value, gesture)
            animateTo(decided.target, decided.position)
          })
        },
        onPanResponderTerminate: (_evt, gesture) => {
          translateX.stopAnimation(value => {
            const decided = decideTarget(value, gesture)
            animateTo(decided.target, decided.position)
          })
        },
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => false,
      }),
    [animateTo, decideTarget, disabled, leftWidth, rightWidth, translateX]
  )

  return (
    <View style={[styles.root, style]}>
      {left ? (
        <View
          style={[styles.left, leftStyle]}
          pointerEvents="box-none"
          onLayout={handleLeftLayout}
        >
          {left}
        </View>
      ) : null}

      {right ? (
        <View
          style={[styles.right, rightStyle]}
          pointerEvents="box-none"
          onLayout={handleRightLayout}
        >
          {right}
        </View>
      ) : null}

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          contentStyle,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  )
})

SwipeCell.displayName = 'SwipeCell'

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  left: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: undefined,
    justifyContent: 'center',
  },
  right: {
    ...StyleSheet.absoluteFillObject,
    right: 0,
    left: undefined,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    width: '100%',
  },
})

export default SwipeCell

