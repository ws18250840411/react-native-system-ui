import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import type { IndexAnchorProps } from './types'

const IndexAnchor: React.FC<IndexAnchorProps> = props => {
  const { index, title, children, active, highlightColor, onLayoutCapture, style, onLayout, ...rest } = props

  const handleLayout = React.useCallback(
    (event: any) => {
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
      style={[styles.container, active ? [styles.active, highlightColor ? { borderLeftColor: highlightColor } : null] : null, style]}
    >
      <Text style={[styles.title, active && highlightColor ? { color: highlightColor } : null]}>{title ?? index}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 0,
  },
  active: {
    borderLeftWidth: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
})

IndexAnchor.displayName = 'IndexBar.Anchor'

export default IndexAnchor
