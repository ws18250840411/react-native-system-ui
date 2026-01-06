import React from 'react'
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  type LayoutChangeEvent,
} from 'react-native'
import { Arrow, Close } from 'react-native-system-icon'
import { useAriaPress } from '../../hooks'

import { nativeDriverEnabled } from '../../platform'
import type { NoticeBarProps } from './types'
import { useNoticeBarTokens } from './tokens'

const AnimatedText = Animated.createAnimatedComponent(Text)
const IS_WEB = Platform.OS === 'web'
const isRenderableNode = (node: React.ReactNode) => node != null && node !== false

if (IS_WEB) {
  const globalObj = typeof globalThis !== 'undefined' ? globalThis : (window as any)
  if (globalObj && globalObj.global === undefined) {
    globalObj.global = globalObj
  }
}

export const NoticeBar: React.FC<NoticeBarProps> = props => {
  const {
    text,
    children,
    color,
    background,
    leftIcon,
    rightIcon,
    mode,
    tokensOverride,
    delay = 1,
    speed = 60,
    scrollable,
    wrapable = false,
    direction = 'horizontal',
    items,
    verticalInterval = 3000,
    verticalDuration = 300,
    onPress,
    onClose,
    onReplay,
    textProps,
    style,
    ...rest
  } = props

  const tokens = useNoticeBarTokens(tokensOverride)
  const resolvedColor = color ?? tokens.colors.text
  const resolvedBackground = background ?? tokens.colors.background
  const content = text ?? children
  const isTextContent = typeof content === 'string' || typeof content === 'number'
  const isVertical = direction === 'vertical'
  const [visible, setVisible] = React.useState(true)

  const { onLayout: textOnLayout, ...restTextProps } = textProps ?? {}

  const [contentWidth, setContentWidth] = React.useState(0)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const translateX = React.useRef(new Animated.Value(0)).current
  const shouldScroll = !isVertical && !wrapable && (scrollable ?? contentWidth > containerWidth)

  const verticalItems = React.useMemo(() => {
    if (!isVertical) return []
    if (items && items.length) return items
    const childArray = React.Children.toArray(children)
    if (childArray.length) return childArray
    return text !== undefined ? [text] : []
  }, [children, isVertical, items, text])

  const hasVerticalLoop = isVertical && verticalItems.length > 1
  const verticalTrackItems = React.useMemo(
    () => (hasVerticalLoop ? [...verticalItems, verticalItems[0]] : verticalItems),
    [hasVerticalLoop, verticalItems]
  )
  const verticalTranslateY = React.useRef(new Animated.Value(0)).current
  const [itemHeight, setItemHeight] = React.useState(0)

  React.useEffect(() => {
    if (isVertical) {
      translateX.stopAnimation()
      return
    }
    if (!shouldScroll || contentWidth === 0 || containerWidth === 0) {
      translateX.setValue(0)
      return
    }
    let cancelled = false
    const duration = ((contentWidth + containerWidth) / speed) * 1000

    const run = (initial: boolean) => {
      translateX.setValue(initial ? 0 : containerWidth)
      Animated.sequence([
        Animated.delay(delay * 1000),
        Animated.timing(translateX, {
          toValue: -contentWidth,
          duration,
          easing: Easing.linear,
          useNativeDriver: nativeDriverEnabled,
        }),
      ]).start(({ finished }) => {
        if (finished && !cancelled) {
          onReplay?.()
          run(false)
        }
      })
    }

    run(true)

    return () => {
      cancelled = true
      translateX.stopAnimation()
    }
  }, [shouldScroll, translateX, delay, speed, contentWidth, containerWidth, onReplay, isVertical])

  React.useEffect(() => {
    if (!hasVerticalLoop || itemHeight === 0) {
      verticalTranslateY.setValue(0)
      return
    }
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | null = null
    let nextIndex = 1

    const schedule = () => {
      timeout = setTimeout(() => {
        Animated.timing(verticalTranslateY, {
          toValue: -itemHeight * nextIndex,
          duration: verticalDuration,
          easing: Easing.linear,
          useNativeDriver: nativeDriverEnabled,
        }).start(({ finished }) => {
          if (cancelled || !finished) {
            return
          }
          nextIndex += 1
          if (nextIndex > verticalItems.length) {
            verticalTranslateY.setValue(0)
            nextIndex = 1
          }
          schedule()
        })
      }, verticalInterval)
    }

    schedule()

    return () => {
      cancelled = true
      if (timeout) {
        clearTimeout(timeout)
      }
      verticalTranslateY.stopAnimation()
    }
  }, [hasVerticalLoop, itemHeight, verticalDuration, verticalInterval, verticalItems, verticalTranslateY])

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  const closePress = useAriaPress({
    disabled: mode !== 'closeable' || !visible,
    onPress: handleClose,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityLabel: '关闭',
    },
  })

  const barPress = useAriaPress({
    disabled: !onPress || !visible,
    onPress,
    extraProps: onPress ? { accessibilityRole: 'button' } : undefined,
  })

  const renderRight = () => {
    if (mode === 'closeable') {
      return (
        <Pressable hitSlop={8} {...closePress.interactionProps}>
          <Close size={16} fill={resolvedColor} color={resolvedColor} />
        </Pressable>
      )
    }
    if (mode === 'link') {
      return <Arrow size={16} fill={resolvedColor} color={resolvedColor} />
    }
    if (rightIcon) {
      return rightIcon
    }
    return null
  }

  if (!visible) {
    return null
  }

  const rightNode = renderRight()
  const hasLeft = isRenderableNode(leftIcon)
  const hasRight = Boolean(rightNode)

  const handleItemLayout = (event: LayoutChangeEvent) => {
    if (itemHeight === 0) {
      const height = event?.nativeEvent?.layout?.height
      if (height) {
        setItemHeight(height)
      }
    }
  }

  const renderVerticalContent = () => {
    if (!isVertical) return null
    if (verticalTrackItems.length === 0) {
      return null
    }

    if (!hasVerticalLoop) {
      const single = verticalTrackItems[0]
      if (typeof single === 'string' || typeof single === 'number') {
        return (
          <Text
            onLayout={textOnLayout}
            style={[
              styles.text,
              { color: resolvedColor, fontSize: tokens.typography.fontSize },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
            {...restTextProps}
          >
            {single}
          </Text>
        )
      }
      return single
    }

    return (
      <View
        style={[styles.verticalViewport, itemHeight ? { height: itemHeight } : null]}
        pointerEvents="none"
      >
        <Animated.View
          style={[styles.verticalTrack, { transform: [{ translateY: verticalTranslateY }] }]}
        >
          {verticalTrackItems.map((item, index) => (
            <View
              key={index}
              onLayout={index === 0 ? handleItemLayout : undefined}
              style={styles.verticalItem}
            >
              {typeof item === 'string' || typeof item === 'number' ? (
                <Text
                  onLayout={textOnLayout}
                  style={[
                    styles.text,
                    { color: resolvedColor, fontSize: tokens.typography.fontSize },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  {...restTextProps}
                >
                  {item}
                </Text>
              ) : (
                item
              )}
            </View>
          ))}
        </Animated.View>
      </View>
    )
  }

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: resolvedBackground,
          paddingHorizontal: tokens.spacing.paddingHorizontal,
          paddingVertical: wrapable ? tokens.spacing.wrapPaddingVertical : tokens.spacing.paddingVertical,
          minHeight: tokens.layout.minHeight,
          borderRadius: tokens.layout.radius,
        },
        style,
      ]}
      disabled={barPress.states.disabled}
      {...barPress.interactionProps}
      {...rest}
    >
      {hasLeft ? (
        <View style={[styles.sideSection, { minWidth: tokens.layout.sideMinWidth }]}>
          {leftIcon}
        </View>
      ) : null}
      <View
        onLayout={event => setContainerWidth(event.nativeEvent.layout.width)}
        style={[
          styles.content,
          wrapable && styles.contentWrap,
          hasLeft && { paddingLeft: tokens.spacing.sidePadding },
          hasRight && { paddingRight: tokens.spacing.sidePadding },
        ]}
        pointerEvents="none"
      >
        {isVertical ? (
          renderVerticalContent()
        ) : shouldScroll ? (
          isTextContent ? (
            <AnimatedText
              onLayout={event => {
                setContentWidth(event.nativeEvent.layout.width)
                textOnLayout?.(event)
              }}
              style={[
                styles.text,
                styles.scrollText,
                {
                  color: resolvedColor,
                  fontSize: tokens.typography.fontSize,
                  transform: [{ translateX }],
                },
              ]}
              {...(IS_WEB
                ? {}
                : { numberOfLines: 1 as const, ellipsizeMode: 'clip' as const })}
              {...restTextProps}
            >
              {content}
            </AnimatedText>
          ) : (
            <Animated.View
              onLayout={event => setContentWidth(event.nativeEvent.layout.width)}
              style={[
                styles.text,
                { transform: [{ translateX }] },
              ]}
            >
              {content}
            </Animated.View>
          )
        ) : (
          isTextContent ? (
            <Text
              onLayout={event => {
                setContentWidth(event.nativeEvent.layout.width)
                textOnLayout?.(event)
              }}
              style={[
                styles.text,
                { color: resolvedColor, fontSize: tokens.typography.fontSize },
                wrapable && styles.wrapText,
              ]}
              numberOfLines={wrapable ? undefined : 1}
              ellipsizeMode={wrapable ? 'tail' : 'clip'}
              {...restTextProps}
            >
              {content}
            </Text>
          ) : (
            <View
              onLayout={event => setContentWidth(event.nativeEvent.layout.width)}
              style={[
                styles.text,
                wrapable && styles.wrapText,
              ]}
            >
              {content}
            </View>
          )
        )}
      </View>
      {rightNode ? (
        <View style={[styles.sideSection, { minWidth: tokens.layout.sideMinWidth }]}>
          {rightNode}
        </View>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  text: {
    flexShrink: 0,
  },
  scrollText: Platform.select({
    web: {
      whiteSpace: 'nowrap',
      textOverflow: 'clip',
    },
    default: {},
  }) as any,
  wrapText: {
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  contentWrap: {
    flexDirection: 'column',
  },
  verticalViewport: {
    width: '100%',
    overflow: 'hidden',
  },
  verticalTrack: {
    flexDirection: 'column',
    width: '100%',
  },
  verticalItem: {
    width: '100%',
    justifyContent: 'center',
  },
})

NoticeBar.displayName = 'NoticeBar'
