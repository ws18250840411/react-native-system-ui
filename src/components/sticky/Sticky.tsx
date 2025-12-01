import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useStickyObserver } from '../../hooks'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import type { StickyProps } from './types'
import { useStickyTokens } from './tokens'

const Sticky: React.FC<StickyProps> = props => {
  const {
    children,
    scrollValue,
    offsetTop: offsetTopProp,
    zIndex: zIndexProp,
    disabled = false,
    enableShadow: enableShadowProp,
    backgroundColor,
    position = 'top',
    style,
    contentStyle,
    onChange,
    onScroll,
  } = props

  const tokens = useStickyTokens()
  const offsetTop = offsetTopProp ?? tokens.defaults.offsetTop
  const zIndex = zIndexProp ?? tokens.defaults.zIndex
  const enableShadow = enableShadowProp ?? tokens.defaults.enableShadow
  const resolvedBackground = backgroundColor ?? tokens.defaults.backgroundColor

  const stickyState = useStickyObserver({
    scrollValue,
    offset: offsetTop,
    position,
    disabled,
    onStateChange: onChange,
    onScroll,
  })

  const shadowStyle = enableShadow && stickyState.isSticky
    ? createPlatformShadow(tokens.shadow)
    : undefined

  const containerStyles = [
    styles.container,
    style,
    stickyState.isSticky && stickyState.placeholderHeight
      ? { height: stickyState.placeholderHeight }
      : null,
  ]

  const contentStyles = [
    styles.content,
    contentStyle,
    { backgroundColor: resolvedBackground },
    stickyState.isSticky
      ? [styles.fixed, { top: offsetTop, zIndex }]
      : null,
    shadowStyle,
  ]

  return (
    <View style={containerStyles}>
      <View onLayout={stickyState.onLayout} style={contentStyles}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
  },
  fixed: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
})

export default Sticky
