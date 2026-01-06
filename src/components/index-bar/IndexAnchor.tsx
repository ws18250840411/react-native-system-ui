import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import type { IndexAnchorProps } from './types'
import { useIndexBarTokens } from './tokens'

const IndexAnchor: React.FC<IndexAnchorProps> = props => {
  const { index, title, children, active, highlightColor, onLayoutCapture, style, onLayout, tokensOverride, ...rest } = props
  const { colors, layout } = useIndexBarTokens(tokensOverride)
  const textColor = active && highlightColor ? highlightColor : colors.anchorText

  return (
    <View
      {...rest}
      onLayout={event => {
        onLayoutCapture?.(index, event?.nativeEvent?.layout?.y ?? 0)
        onLayout?.(event)
      }}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.header,
          {
            height: layout.anchorHeight,
            backgroundColor: colors.anchorBackground,
          },
        ]}
      >
        <Text style={[styles.title, { color: textColor }]}>
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
