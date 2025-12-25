import React from 'react'
import { StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native'

import type { IndexAnchorProps } from './types'
import { useIndexBarTokens } from './tokens'

const IndexAnchor: React.FC<IndexAnchorProps> = props => {
  const { index, title, children, active, highlightColor, onLayoutCapture, style, onLayout, ...rest } = props
  const tokens = useIndexBarTokens()

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      const layoutY = event?.nativeEvent?.layout?.y ?? 0
      onLayoutCapture?.(index, layoutY)
      onLayout?.(event)
    },
    [index, onLayout, onLayoutCapture]
  )

  return (
    <View
      {...rest}
      onLayout={handleLayout}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.header,
          {
            height: tokens.layout.anchorHeight,
            backgroundColor: tokens.colors.anchorBackground,
          },
        ]}
      >
        <Text style={[styles.title, { color: active && highlightColor ? highlightColor : tokens.colors.anchorText }]}>
          {title ?? index}
        </Text>
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
})

IndexAnchor.displayName = 'IndexBar.Anchor'

export default IndexAnchor
