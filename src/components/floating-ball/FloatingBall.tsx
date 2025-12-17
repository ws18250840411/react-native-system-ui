import React from 'react'
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'

import { useControllableValue } from '../../hooks'
import { useFloatingBallTokens } from './tokens'
import type {
  FloatingBallAdsorbProps,
  FloatingBallInstance,
  FloatingBallMenuDirection,
  FloatingBallProps,
  FloatingBallPosition,
} from './types'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

const DEFAULT_OFFSET = { right: 0, bottom: '30vh' }

const parseLength = (
  value: number | string | undefined,
  axis: 'x' | 'y',
  viewport: { width: number; height: number },
) => {
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return undefined
  const raw = value.trim()
  const number = Number.parseFloat(raw)
  if (!Number.isFinite(number)) return undefined

  if (raw.endsWith('vh')) {
    return (viewport.height * number) / 100
  }
  if (raw.endsWith('vw')) {
    return (viewport.width * number) / 100
  }
  if (raw.endsWith('%')) {
    const base = axis === 'x' ? viewport.width : viewport.height
    return (base * number) / 100
  }
  return number
}

const resolveDefaultPosition = (
  options: {
    offset?: FloatingBallProps['offset']
    size: number
    viewport: { width: number; height: number }
  },
): FloatingBallPosition => {
  const { offset, size, viewport } = options
  const resolvedOffset = offset ?? DEFAULT_OFFSET

  const left = parseLength(resolvedOffset.left, 'x', viewport)
  const right = parseLength(resolvedOffset.right, 'x', viewport)
  const top = parseLength(resolvedOffset.top, 'y', viewport)
  const bottom = parseLength(resolvedOffset.bottom, 'y', viewport)

  const x = left !== undefined ? left : right !== undefined ? viewport.width - size - right : viewport.width - size
  const y = top !== undefined ? top : bottom !== undefined ? viewport.height - size - bottom : viewport.height * 0.7 - size

  return { x, y }
}

const resolveAdsorbConfig = (adsorb: boolean | FloatingBallAdsorbProps | undefined, magnetic?: boolean) => {
  const base = adsorb !== undefined ? adsorb : magnetic !== undefined ? magnetic : true
  if (typeof base === 'boolean') {
    return { enabled: base, distance: 0 }
  }
  const distance = typeof base.distance === 'number' && Number.isFinite(base.distance) ? Math.max(0, base.distance) : 0
  return { enabled: true, distance }
}

const getMenuDirection = (direction?: FloatingBallMenuDirection): FloatingBallMenuDirection => {
  if (direction === 'vertical' || direction === 'horizontal' || direction === 'around') return direction
  return 'around'
}

const FloatingBall = React.forwardRef<FloatingBallInstance, FloatingBallProps>((props, ref) => {
  const {
    defaultPosition,
    position,
    adsorb,
    magnetic,
    draggable = true,
    boundary = true,
    disabled = false,
    size: sizeProp,
    padding,
    onChange,
    onPress,
    offset,
    menu,
    children,
    style,
    ...rest
  } = props

  const tokens = useFloatingBallTokens()
  const size = sizeProp ?? tokens.size
  const paddingValue = padding ?? tokens.padding
  const { width, height } = useWindowDimensions()
  const viewport = React.useMemo(() => ({ width, height }), [height, width])

  const [menuActive, triggerMenuChange] = useControllableValue<boolean>(menu ?? {}, {
    valuePropName: 'active',
    defaultValuePropName: 'defaultActive',
    trigger: 'onChange',
    defaultValue: false,
  })

  const bounds = React.useMemo(() => ({
    minX: paddingValue,
    maxX: Math.max(paddingValue, width - size - paddingValue),
    minY: paddingValue,
    maxY: Math.max(paddingValue, height - size - paddingValue),
  }), [paddingValue, width, height, size])

  const clampPosition = React.useCallback(
    (next: FloatingBallPosition) => {
      if (!boundary) return next
      return {
        x: clamp(next.x, bounds.minX, bounds.maxX),
        y: clamp(next.y, bounds.minY, bounds.maxY),
      }
    },
    [boundary, bounds.maxX, bounds.maxY, bounds.minX, bounds.minY],
  )

  const resolvedDefaultFromOffset = React.useMemo(
    () => resolveDefaultPosition({ offset, size, viewport }),
    [offset, size, viewport],
  )

  const [mergedPosition, triggerPositionChange] = useControllableValue<FloatingBallPosition>(props, {
    valuePropName: 'position',
    defaultValuePropName: 'defaultPosition',
    trigger: 'onChange',
    defaultValue: resolvedDefaultFromOffset,
  })

  const renderPosition = React.useMemo(
    () => clampPosition(mergedPosition),
    [clampPosition, mergedPosition],
  )

  const hasMenu = React.useMemo(() => {
    const items = menu?.items
    return Array.isArray(items) && items.some(item => item !== null && item !== undefined && item !== false)
  }, [menu?.items])

  const effectiveMenuActive = hasMenu && !disabled ? Boolean(menuActive) : false

  const indenting = false

  const initial = renderPosition

  const lastPosition = React.useRef<FloatingBallPosition>(initial)
  const animated = React.useRef(new Animated.ValueXY(initial)).current

  React.useEffect(() => {
    // bounds changes (e.g. rotation): clamp current position without emitting onChange
    const next = clampPosition(lastPosition.current)
    lastPosition.current = next
    animated.setValue(next)
  }, [animated, clampPosition])

  React.useEffect(() => {
    const next = clampPosition(mergedPosition)
    lastPosition.current = next
    Animated.timing(animated, {
      toValue: next,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }, [animated, clampPosition, mergedPosition])

  const closeMenu = React.useCallback(() => {
    if (!hasMenu) return
    triggerMenuChange(false)
  }, [hasMenu, triggerMenuChange])

  const openMenu = React.useCallback(() => {
    if (!hasMenu || disabled) return
    triggerMenuChange(true)
  }, [disabled, hasMenu, triggerMenuChange])

  React.useImperativeHandle(
    ref,
    () => ({
      open: openMenu,
      close: closeMenu,
    }),
    [closeMenu, openMenu],
  )

  const adsorbConfig = React.useMemo(() => resolveAdsorbConfig(adsorb, magnetic), [adsorb, magnetic])

  const settlePosition = React.useCallback(
    (next: FloatingBallPosition) => {
      const clamped = clampPosition(next)
      if (adsorbConfig.enabled) {
        const snapToRight = clamped.x + size / 2 > width / 2
        const distance = adsorbConfig.distance
        const snapX = snapToRight ? bounds.maxX - distance : bounds.minX + distance
        clamped.x = clamp(snapX, bounds.minX, bounds.maxX)
      }
      lastPosition.current = clamped
      Animated.timing(animated, {
        toValue: clamped,
        duration: 180,
        useNativeDriver: false,
      }).start()
      triggerPositionChange(clamped)
    },
    [adsorbConfig.distance, adsorbConfig.enabled, animated, bounds.maxX, bounds.minX, clampPosition, size, triggerPositionChange, width],
  )

  const startRef = React.useRef<FloatingBallPosition>(lastPosition.current)

  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, gesture) => draggable && !disabled && (Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2),
    onPanResponderGrant: () => {
      startRef.current = lastPosition.current
      if (effectiveMenuActive) {
        closeMenu()
      }
    },
    onPanResponderMove: (_, gesture) => {
      if (!draggable || disabled) return
      const next = {
        x: startRef.current.x + gesture.dx,
        y: startRef.current.y + gesture.dy,
      }
      animated.setValue(clampPosition(next))
    },
    onPanResponderRelease: (_, gesture) => {
      if (!draggable || disabled) return
      const next = {
        x: startRef.current.x + gesture.dx,
        y: startRef.current.y + gesture.dy,
      }
      settlePosition(next)
    },
  }), [animated, clampPosition, closeMenu, disabled, draggable, effectiveMenuActive, settlePosition])

  const handlePress = React.useCallback(() => {
    if (disabled) return
    if (hasMenu) {
      triggerMenuChange(!effectiveMenuActive)
    }
    onPress?.()
  }, [disabled, effectiveMenuActive, hasMenu, onPress, triggerMenuChange])

  const shadowStyle = {
    shadowColor: tokens.colors.shadow,
    shadowOpacity: tokens.shadow.opacity,
    shadowRadius: tokens.shadow.radius,
    shadowOffset: { width: 0, height: tokens.shadow.offsetY },
    elevation: 6,
  }

  const renderBase = () => {
    if (typeof children === 'function') {
      return children({ active: effectiveMenuActive, indenting })
    }
    if (children !== undefined && children !== null && children !== false) return children
    return <Text style={{ color: tokens.colors.text, fontWeight: '600' }}>+</Text>
  }

  const menuItems = React.useMemo(() => {
    const raw = menu?.items
    if (!Array.isArray(raw)) return []
    return raw.filter(item => item !== null && item !== undefined && item !== false).slice(0, 5)
  }, [menu?.items])

  const itemClickClose = menu?.itemClickClose ?? true

  const menuMeta = React.useMemo(() => {
    const centerX = renderPosition.x + size / 2
    const centerY = renderPosition.y + size / 2
    const sideX = centerX < width / 2 ? 'left' : 'right'
    const sideY = centerY < height / 2 ? 'top' : 'bottom'
    const insideX = sideX === 'left' ? 1 : -1
    const insideY = sideY === 'top' ? 1 : -1
    return { centerX, centerY, sideX, sideY, insideX, insideY }
  }, [height, renderPosition.x, renderPosition.y, size, width])

  const menuLayout = React.useMemo(() => {
    const direction = getMenuDirection(menu?.direction)
    const itemSize = Math.max(28, Math.round(size * 0.8))
    const gap = 12
    const step = itemSize + gap
    const radius = size + gap + itemSize / 2

    const buildPosition = (dx: number, dy: number) => ({
      x: size / 2 - itemSize / 2 + dx,
      y: size / 2 - itemSize / 2 + dy,
    })

    const positions: Array<{ x: number; y: number }> = []
    const count = menuItems.length
    if (count === 0) {
      return { itemSize, positions, direction }
    }

    if (direction === 'vertical') {
      for (let i = 0; i < count; i += 1) {
        const dy = menuMeta.insideY * step * (i + 1)
        positions.push(buildPosition(0, dy))
      }
      return { itemSize, positions, direction }
    }

    if (direction === 'horizontal') {
      for (let i = 0; i < count; i += 1) {
        const dx = menuMeta.insideX * step * (i + 1)
        positions.push(buildPosition(dx, 0))
      }
      return { itemSize, positions, direction }
    }

    const horizontalAngle = menuMeta.insideX === 1 ? 0 : menuMeta.insideY === -1 ? -Math.PI : Math.PI
    const verticalAngle = menuMeta.insideY === 1 ? Math.PI / 2 : -Math.PI / 2
    const startAngle = verticalAngle
    const endAngle = horizontalAngle
    const total = endAngle - startAngle

    for (let i = 0; i < count; i += 1) {
      const t = (i + 1) / (count + 1)
      const angle = startAngle + total * t
      const dx = radius * Math.cos(angle)
      const dy = radius * Math.sin(angle)
      positions.push(buildPosition(dx, dy))
    }

    return { itemSize, positions, direction }
  }, [menu?.direction, menuItems.length, menuMeta, size])

  const renderMenuItem = (node: React.ReactNode, index: number) => {
    if (!effectiveMenuActive) return null

    const pos = menuLayout.positions[index]
    if (!pos) return null

    const containerStyle = {
      width: menuLayout.itemSize,
      height: menuLayout.itemSize,
      borderRadius: menuLayout.itemSize / 2,
      left: pos.x,
      top: pos.y,
    }

    const closeAfterPress = () => {
      if (!itemClickClose) return
      closeMenu()
    }

    let content: React.ReactNode = node

    if (itemClickClose && React.isValidElement(node)) {
      const propsAny = node.props as Record<string, any>
      const onPressProp = typeof propsAny.onPress === 'function' ? 'onPress' : undefined
      const onClickProp = typeof propsAny.onClick === 'function' ? 'onClick' : undefined
      const handlerKey = onPressProp ?? onClickProp

      if (handlerKey) {
        const original = propsAny[handlerKey] as (...args: any[]) => void
        content = React.cloneElement(node, {
          [handlerKey]: (...args: any[]) => {
            original?.(...args)
            closeAfterPress()
          },
        })
      } else {
        content = (
          <Pressable style={styles.menuItemPressable} onPress={closeAfterPress}>
            {node}
          </Pressable>
        )
      }
    } else if (itemClickClose && (typeof node === 'string' || typeof node === 'number')) {
      content = (
        <Pressable style={styles.menuItemPressable} onPress={closeAfterPress}>
          <Text>{node}</Text>
        </Pressable>
      )
    } else if (itemClickClose && (node === null || node === undefined || node === false)) {
      content = null
    }

    return (
      <View
        key={index}
        testID={`rv-floating-ball-menu-item-${index}`}
        pointerEvents="box-none"
        style={[styles.menuItem, containerStyle]}
      >
        {content}
      </View>
    )
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
      {effectiveMenuActive ? (
        <Pressable
          testID="rv-floating-ball-overlay"
          style={StyleSheet.absoluteFillObject}
          onPress={closeMenu}
        />
      ) : null}

      <Animated.View
        style={[
          styles.container,
          shadowStyle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: tokens.colors.background,
            transform: [{ translateX: animated.x }, { translateY: animated.y }],
            opacity: disabled ? 0.5 : 1,
            zIndex: 8,
          },
          style,
        ]}
        {...rest}
        {...panResponder.panHandlers}
      >
        {effectiveMenuActive ? (
          <View pointerEvents="box-none" style={styles.menu}>
            {menuItems.map((node, index) => renderMenuItem(node, index))}
          </View>
        ) : null}

        <Pressable style={styles.pressable} onPress={handlePress} testID="rv-floating-ball">
          {renderBase()}
        </Pressable>
      </Animated.View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuItem: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemPressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

FloatingBall.displayName = 'FloatingBall'

export default FloatingBall
