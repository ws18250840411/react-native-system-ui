import React from 'react'
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import Portal from '../portal/Portal'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { usePopoverTokens } from './tokens'
import type { PopoverProps } from './types'

interface AnchorRect {
  x: number
  y: number
  width: number
  height: number
}

const Popover: React.FC<PopoverProps> = props => {
  const {
    trigger,
    children,
    visible,
    defaultVisible,
    placement = 'bottom',
    offset = 8,
    showArrow = true,
    overlay = true,
    onVisibleChange,
    onOpen,
    onClose,
    contentStyle,
    style,
    ...rest
  } = props

  const tokens = usePopoverTokens()
  const wrapperRef = React.useRef<View | null>(null)
  const layoutRef = React.useRef<AnchorRect | null>(null)
  const [anchor, setAnchor] = React.useState<AnchorRect | null>(null)
  const [panelSize, setPanelSize] = React.useState({ width: 0, height: 0 })
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const [internalVisible, setInternalVisible] = useControllableValue<boolean>(
    { value: visible, defaultValue: defaultVisible },
    {
      defaultValue: false,
      trigger: 'onVisibleChange',
      valuePropName: 'visible',
      defaultValuePropName: 'defaultVisible',
    }
  )

  const open = React.useCallback(() => {
    const node = wrapperRef.current
    const onResolved = (rect: AnchorRect) => {
      setAnchor(rect)
      setInternalVisible(true)
      onOpen?.()
      onVisibleChange?.(true)
    }

    if (node && typeof node.measureInWindow === 'function') {
      node.measureInWindow((x: number, y: number, width: number, height: number) => {
        onResolved({ x, y, width, height })
      })
      return
    }

    if (layoutRef.current) {
      onResolved(layoutRef.current)
      return
    }

    setInternalVisible(true)
    onOpen?.()
    onVisibleChange?.(true)
  }, [onOpen, onVisibleChange, setInternalVisible])

  const close = React.useCallback(() => {
    setInternalVisible(false)
    onClose?.()
    onVisibleChange?.(false)
  }, [onClose, onVisibleChange, setInternalVisible])

  const handleTriggerPress = React.useCallback(
    (event: any) => {
      trigger.props?.onPress?.(event)
      if (internalVisible) {
        close()
      } else {
        open()
      }
    },
    [close, internalVisible, open, trigger.props]
  )

  const clonedTrigger = React.cloneElement(trigger, {
    onPress: handleTriggerPress,
  })

  const position = React.useMemo(() => {
    if (!anchor) {
      return null
    }
    const width = panelSize.width || anchor.width || 0
    const height = panelSize.height || anchor.height || 0
    let left = anchor.x + anchor.width / 2 - width / 2
    left = Math.max(8, Math.min(left, windowWidth - width - 8))
    let top = placement === 'bottom'
      ? anchor.y + anchor.height + offset
      : anchor.y - height - offset
    top = Math.max(8, Math.min(top, windowHeight - height - 8))
    return { top, left }
  }, [anchor, offset, panelSize, placement, windowHeight, windowWidth])

  const arrowStyle = React.useMemo(() => {
    if (!anchor || !position || !showArrow) return null
    const arrowSize = 10
    const centerX = anchor.x + anchor.width / 2
    const left = Math.max(arrowSize, Math.min(centerX - arrowSize, windowWidth - arrowSize * 2))
    return {
      width: 0,
      height: 0,
      borderLeftWidth: arrowSize,
      borderRightWidth: arrowSize,
      borderBottomWidth: placement === 'top' ? arrowSize : 0,
      borderTopWidth: placement === 'bottom' ? arrowSize : 0,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: placement === 'bottom' ? tokens.colors.background : 'transparent',
      borderBottomColor: placement === 'top' ? tokens.colors.background : 'transparent',
      position: 'absolute' as const,
      top: placement === 'bottom' ? position.top - arrowSize : position.top + (panelSize.height || 0),
      left,
    }
  }, [anchor, panelSize.height, placement, position, showArrow, tokens.colors.background, windowWidth])

  return (
    <>
      <View
        ref={wrapperRef}
        collapsable={false}
        onLayout={event => {
          const { x, y, width, height } = event.nativeEvent.layout
          layoutRef.current = { x, y, width, height }
        }}
        testID="rv-popover-wrapper"
      >
        {clonedTrigger}
      </View>
      {internalVisible ? (
        <Portal>
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {overlay ? <Pressable style={[styles.overlay, { backgroundColor: tokens.colors.overlay }]} onPress={close} /> : null}
            {position ? (
              <View
                style={[
                  styles.content,
                  {
                    top: position.top,
                    left: position.left,
                    backgroundColor: tokens.colors.background,
                    borderRadius: tokens.radii.panel,
                    shadowColor: tokens.colors.shadow,
                    ...createPlatformShadow({
                      color: tokens.colors.shadow,
                      opacity: tokens.shadow.opacity,
                      radius: tokens.shadow.radius,
                      offsetY: tokens.shadow.offsetY,
                    }),
                  },
                  contentStyle,
                ]}
                onLayout={event => {
                  const { width, height } = event.nativeEvent.layout
                  setPanelSize({ width, height })
                }}
              >
                <View {...rest} style={style}>
                  {children}
                </View>
                {arrowStyle ? <View style={arrowStyle} /> : null}
              </View>
            ) : null}
          </View>
        </Portal>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'absolute',
    minWidth: 160,
    padding: 12,
  },
})

Popover.displayName = 'Popover'

export default Popover
