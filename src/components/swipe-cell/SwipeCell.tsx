import React from 'react'
import {
  Animated,
  Easing,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type PanResponderGestureState,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { clamp } from '../../utils/number'
import { isFunction, isNumber } from '../../utils/validate'

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
   * 点击操作区后是否自动关闭
   * @default true
   */
  closeOnActionPress?: boolean
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
    closeOnActionPress = true,
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

  const isWeb = Platform.OS === 'web'

  const translateX = React.useRef(new Animated.Value(0)).current
  const positionRef = React.useRef<SwipeCellPosition>('closed')
  const [position, setPosition] = React.useState<SwipeCellPosition>('closed')
  const startXRef = React.useRef(0)
  const panActiveRef = React.useRef(false)
  const actionTapStartRef = React.useRef<{ side: SwipeCellSide; x: number; y: number } | null>(null)
  const closeFromActionTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const [measuredLeftWidth, setMeasuredLeftWidth] = React.useState(0)
  const [measuredRightWidth, setMeasuredRightWidth] = React.useState(0)

  const dragRafIdRef = React.useRef<number | null>(null)
  const dragPendingRef = React.useRef<number | null>(null)

  const leftWidth = Math.max(0, leftWidthProp ?? measuredLeftWidth)
  const rightWidth = Math.max(0, rightWidthProp ?? measuredRightWidth)

  const clearCloseFromActionTimer = React.useCallback(() => {
    if (closeFromActionTimerRef.current != null) {
      clearTimeout(closeFromActionTimerRef.current)
    }
    closeFromActionTimerRef.current = null
  }, [])

  const cancelDragRaf = React.useCallback(() => {
    if (dragRafIdRef.current != null && isFunction(cancelAnimationFrame)) {
      cancelAnimationFrame(dragRafIdRef.current)
    }
    dragRafIdRef.current = null
    dragPendingRef.current = null
  }, [])

  const flushDrag = React.useCallback(() => {
    const pending = dragPendingRef.current
    if (pending == null) return
    dragPendingRef.current = null
    translateX.setValue(pending)
  }, [translateX])

  const scheduleDrag = React.useCallback(
    (next: number) => {
      if (!isFunction(requestAnimationFrame)) {
        translateX.setValue(next)
        return
      }
      dragPendingRef.current = next
      if (dragRafIdRef.current != null) return
      dragRafIdRef.current = requestAnimationFrame(() => {
        dragRafIdRef.current = null
        flushDrag()
      })
    },
    [flushDrag, translateX]
  )

  React.useEffect(() => {
    return () => {
      cancelDragRaf()
      clearCloseFromActionTimer()
    }
  }, [cancelDragRaf, clearCloseFromActionTimer])

  const emitPositionChange = React.useCallback(
    (next: SwipeCellPosition) => {
      if (positionRef.current !== next) {
        positionRef.current = next
        setPosition(next)
        onChange?.(next)
      }
    },
    [onChange]
  )

  const animateTo = React.useCallback(
    (target: number, nextPosition: SwipeCellPosition) => {
      const prevPosition = positionRef.current
      cancelDragRaf()
      translateX.stopAnimation()
      Animated.timing(translateX, {
        toValue: target,
        duration: Math.max(0, duration),
        easing: Easing.out(Easing.cubic),
        useNativeDriver: nativeDriverEnabled,
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
    [cancelDragRaf, duration, emitPositionChange, onClose, onOpen, translateX]
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

  const handleActionClick = React.useCallback(
    (side: SwipeCellSide) => {
      if (!closeOnActionPress) return
      if (positionRef.current !== side) return
      close()
    },
    [close, closeOnActionPress]
  )

  const handleActionTouchStart = React.useCallback(
    (side: SwipeCellSide, event: any) => {
      if (!closeOnActionPress) return
      if (positionRef.current !== side) return
      const x = event?.nativeEvent?.pageX
      const y = event?.nativeEvent?.pageY
      if (!isNumber(x) || !isNumber(y)) return
      actionTapStartRef.current = { side, x, y }
    },
    [closeOnActionPress]
  )

  const handleActionTouchEnd = React.useCallback(
    (side: SwipeCellSide, event: any) => {
      if (!closeOnActionPress) return
      if (positionRef.current !== side) return
      if (panActiveRef.current) return

      const start = actionTapStartRef.current
      actionTapStartRef.current = null
      if (!start || start.side !== side) return

      const x = event?.nativeEvent?.pageX
      const y = event?.nativeEvent?.pageY
      if (!isNumber(x) || !isNumber(y)) return

      const TAP_SLOP = 8
      if (Math.abs(x - start.x) > TAP_SLOP || Math.abs(y - start.y) > TAP_SLOP) return

      clearCloseFromActionTimer()
      closeFromActionTimerRef.current = setTimeout(() => {
        closeFromActionTimerRef.current = null
        if (positionRef.current === side) {
          close()
        }
      }, 0)
    },
    [clearCloseFromActionTimer, close, closeOnActionPress]
  )

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
      const leftCloseThreshold = leftWidth * (1 - safeThreshold)
      const rightCloseThreshold = rightWidth * (1 - safeThreshold)
      const position = positionRef.current

      const VELOCITY_THRESHOLD = 0.35

      if (position === 'closed') {
        if (velocityX > VELOCITY_THRESHOLD && hasLeft) return { target: leftWidth, position: 'left' as const }
        if (velocityX < -VELOCITY_THRESHOLD && hasRight) return { target: -rightWidth, position: 'right' as const }

        if (current > leftThreshold && hasLeft) return { target: leftWidth, position: 'left' as const }
        if (current < -rightThreshold && hasRight) return { target: -rightWidth, position: 'right' as const }

        return { target: 0, position: 'closed' as const }
      }

      if (position === 'left') {
        if (!hasLeft) return { target: 0, position: 'closed' as const }

        // 从左侧打开状态滑动到右侧：只有跨过 0 才允许打开右侧，避免快速滑动时“直接跳到另一侧”
        if (current < 0 && hasRight) {
          if (velocityX < -VELOCITY_THRESHOLD) return { target: -rightWidth, position: 'right' as const }
          if (current < -rightThreshold) return { target: -rightWidth, position: 'right' as const }
          return { target: 0, position: 'closed' as const }
        }

        if (velocityX > VELOCITY_THRESHOLD) return { target: leftWidth, position: 'left' as const }
        if (current > leftCloseThreshold) return { target: leftWidth, position: 'left' as const }
        return { target: 0, position: 'closed' as const }
      }

      if (position === 'right') {
        if (!hasRight) return { target: 0, position: 'closed' as const }

        if (current > 0 && hasLeft) {
          if (velocityX > VELOCITY_THRESHOLD) return { target: leftWidth, position: 'left' as const }
          if (current > leftThreshold) return { target: leftWidth, position: 'left' as const }
          return { target: 0, position: 'closed' as const }
        }

        if (velocityX < -VELOCITY_THRESHOLD) return { target: -rightWidth, position: 'right' as const }
        if (current < -rightCloseThreshold) return { target: -rightWidth, position: 'right' as const }
        return { target: 0, position: 'closed' as const }
      }

      return { target: 0, position: 'closed' as const }
    },
    [left, leftWidth, right, rightWidth, threshold]
  )

  const panResponder = React.useMemo(
    () => {
      const shouldSet = (_evt: any, gesture: PanResponderGestureState) => {
        if (disabled) return false
        if (!isHorizontalSwipe(gesture)) return false

        const dx = gesture.dx ?? 0
        const hasLeft = leftWidth > 0 && !!left
        const hasRight = rightWidth > 0 && !!right
        const position = positionRef.current

        // 关闭状态下：只在有对应侧操作区时才拦截，避免“滑了但没任何反馈/阻断列表滚动”
        if (position === 'closed') {
          if (dx > 0) return hasLeft
          if (dx < 0) return hasRight
          return false
        }

        // 打开状态下：允许从任意区域继续拖拽回中间或另一侧
        return true
      }
      const handleEnd = (_evt: any, gesture: PanResponderGestureState) => {
        panActiveRef.current = false
        flushDrag()
        cancelDragRaf()
        translateX.stopAnimation(value => {
          const decided = decideTarget(value, gesture)
          animateTo(decided.target, decided.position)
        })
      }

      return PanResponder.create({
        onMoveShouldSetPanResponder: shouldSet,
        onMoveShouldSetPanResponderCapture: shouldSet,
        onPanResponderGrant: () => {
          panActiveRef.current = true
          cancelDragRaf()
          translateX.stopAnimation(value => {
            startXRef.current = value
          })
        },
        onPanResponderMove: (_evt, gesture) => {
          const next = clamp(startXRef.current + gesture.dx, -rightWidth, leftWidth)
          scheduleDrag(next)
        },
        onPanResponderRelease: handleEnd,
        onPanResponderTerminate: handleEnd,
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => false,
      })
    },
    [
      animateTo,
      cancelDragRaf,
      decideTarget,
      disabled,
      flushDrag,
      left,
      leftWidth,
      right,
      rightWidth,
      scheduleDrag,
      translateX,
    ]
  )

  return (
    <View style={[styles.root, style]} {...panResponder.panHandlers}>
      {left ? (
        <View
          style={[styles.left, leftStyle]}
          pointerEvents="box-none"
          onLayout={handleLeftLayout}
          onTouchStart={closeOnActionPress ? (e) => handleActionTouchStart('left', e) : undefined}
          onTouchEnd={closeOnActionPress ? (e) => handleActionTouchEnd('left', e) : undefined}
          {...(isWeb ? ({ onClick: () => handleActionClick('left') } as any) : undefined)}
        >
          {left}
        </View>
      ) : null}

      {right ? (
        <View
          style={[styles.right, rightStyle]}
          pointerEvents="box-none"
          onLayout={handleRightLayout}
          onTouchStart={closeOnActionPress ? (e) => handleActionTouchStart('right', e) : undefined}
          onTouchEnd={closeOnActionPress ? (e) => handleActionTouchEnd('right', e) : undefined}
          {...(isWeb ? ({ onClick: () => handleActionClick('right') } as any) : undefined)}
        >
          {right}
        </View>
      ) : null}

      <Animated.View
        style={[
          styles.content,
          contentStyle,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {children}
        {position !== 'closed' ? (
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={close}
          />
        ) : null}
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
