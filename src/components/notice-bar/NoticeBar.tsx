import React from 'react'
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native'

import Icon from '../icon'
import type { NoticeBarProps } from './types'

const AnimatedText = Animated.createAnimatedComponent(Text)

if (Platform.OS === 'web') {
  const globalObj = typeof globalThis !== 'undefined' ? globalThis : (window as any)
  if (globalObj && globalObj.global === undefined) {
    globalObj.global = globalObj
  }
}

export const NoticeBar: React.FC<NoticeBarProps> = props => {
  const {
    text,
    children,
    color = '#f97316',
    background = '#fff7cc',
    leftIcon,
    rightIcon,
    mode,
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
    textProps,
    style,
    ...rest
  } = props

  const content = text ?? children
  const isVertical = direction === 'vertical'
  const [visible, setVisible] = React.useState(true)

  const [contentWidth, setContentWidth] = React.useState(0)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const translateX = React.useRef(new Animated.Value(0)).current
  const shouldScroll = React.useMemo(() => {
    if (isVertical || wrapable) return false
    if (scrollable !== undefined) return scrollable
    return contentWidth > containerWidth
  }, [isVertical, wrapable, scrollable, contentWidth, containerWidth])

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
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished && !cancelled) {
          props.onReplay?.()
          run(false)
        }
      })
    }

    run(true)

    return () => {
      cancelled = true
      translateX.stopAnimation()
    }
  }, [shouldScroll, translateX, delay, speed, contentWidth, containerWidth, props, isVertical])

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
          useNativeDriver: true,
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

  const renderLeft = () => {
    if (leftIcon === null || leftIcon === undefined) return null
    return <View style={styles.leftSection}>{leftIcon}</View>
  }

  const renderRight = () => {
    if (mode === 'closeable') {
      return (
        <Pressable onPress={handleClose} hitSlop={8}>
          <Icon name="close" size={16} color={color} />
        </Pressable>
      )
    }
    if (mode === 'link') {
      return <Icon name="arrow-right" size={16} color={color} />
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
  const hasLeft = leftIcon !== null && leftIcon !== undefined
  const hasRight = Boolean(rightNode)

  const handleItemLayout = (event: any) => {
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
            style={[styles.text, { color }]}
            numberOfLines={1}
            ellipsizeMode="tail"
            {...textProps}
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
                  style={[styles.text, { color }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  {...textProps}
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
        wrapable && styles.wrapContainer,
        { backgroundColor: background },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      {renderLeft()}
      <View
        onLayout={event => setContainerWidth(event.nativeEvent.layout.width)}
        style={[
          styles.content,
          wrapable && styles.contentWrap,
          hasLeft && styles.contentLeftPadding,
          hasRight && styles.contentRightPadding,
        ]}
        pointerEvents="none"
      >
        {isVertical ? (
          renderVerticalContent()
        ) : shouldScroll ? (
          <AnimatedText
            onLayout={event => setContentWidth(event.nativeEvent.layout.width)}
            style={[styles.text, styles.scrollText, { color }, { transform: [{ translateX }] }]}
            {...(Platform.OS === 'web'
              ? {}
              : { numberOfLines: 1 as const, ellipsizeMode: 'clip' as const })}
            {...textProps}
          >
            {content}
          </AnimatedText>
        ) : (
          <Text
            onLayout={event => setContentWidth(event.nativeEvent.layout.width)}
            style={[styles.text, { color }, wrapable && styles.wrapText]}
            numberOfLines={wrapable ? undefined : 1}
            ellipsizeMode={wrapable ? 'tail' : 'clip'}
            {...textProps}
          >
            {content}
          </Text>
        )}
      </View>
      {rightNode ? <View style={styles.rightSection}>{rightNode}</View> : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 40,
    borderRadius: 8,
  },
  leftSection: {
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  wrapContainer: {
    paddingVertical: 12,
  },
  text: {
    fontSize: 14,
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
  contentLeftPadding: {
    paddingLeft: 12,
  },
  contentRightPadding: {
    paddingRight: 12,
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
