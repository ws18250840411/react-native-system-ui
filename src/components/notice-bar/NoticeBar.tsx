import React from 'react'
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native'

import Icon from '../icon'
import type { NoticeBarProps } from './types'

const AnimatedText = Animated.createAnimatedComponent(Text)

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
    onPress,
    onClose,
    textProps,
    style,
    ...rest
  } = props

  const content = text ?? children

  const [contentWidth, setContentWidth] = React.useState(0)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const translateX = React.useRef(new Animated.Value(0)).current
  const shouldScroll = React.useMemo(() => {
    if (wrapable) return false
    if (scrollable !== undefined) return scrollable
    return contentWidth > containerWidth
  }, [wrapable, scrollable, contentWidth, containerWidth])

  React.useEffect(() => {
    translateX.setValue(0)
    if (!shouldScroll || contentWidth === 0 || containerWidth === 0) {
      return
    }
    let cancelled = false
    const distance = contentWidth + containerWidth
    const duration = (distance / speed) * 1000

    const run = () => {
      translateX.setValue(containerWidth)
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
          run()
        }
      })
    }

    run()

    return () => {
      cancelled = true
      translateX.stopAnimation()
    }
  }, [shouldScroll, translateX, delay, speed, contentWidth, containerWidth, props])

  const renderRight = () => {
    if (mode === 'closeable') {
      return (
        <Pressable onPress={onClose} hitSlop={8}>
          <Icon name="close" size={16} color={color} />
        </Pressable>
      )
    }
    if (mode === 'link') {
      return <Icon name="arrow-right" size={16} color={color} />
    }
    return rightIcon ?? null
  }

  return (
    <Pressable
      style={[styles.container, { backgroundColor: background }, style]}
      onPress={onPress}
      {...rest}
    >
      {leftIcon ?? (
        <View style={[styles.iconWrapper, { backgroundColor: background }] }>
          <Icon name="info" size={16} color={color} />
        </View>
      )}
      <View
        onLayout={event => setContainerWidth(event.nativeEvent.layout.width)}
        style={[styles.content, wrapable && styles.wrapable]}
        pointerEvents="none"
      >
        {shouldScroll ? (
          <AnimatedText
            onLayout={event => setContentWidth(event.nativeEvent.layout.width)}
            style={[styles.text, { color }, { transform: [{ translateX }] }]}
            {...textProps}
          >
            {content}
          </AnimatedText>
        ) : (
          <Text
            onLayout={event => setContentWidth(event.nativeEvent.layout.width)}
            style={[styles.text, { color }, wrapable && styles.wrapText]}
            {...textProps}
          >
            {content}
          </Text>
        )}
      </View>
      {renderRight()}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 40,
    gap: 12,
    borderRadius: 8,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  wrapable: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 14,
  },
  wrapText: {
    flexWrap: 'wrap',
  },
})

NoticeBar.displayName = 'NoticeBar'
