import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import type { IndexAnchorProps } from './types'
import { useIndexBarTokens } from './tokens'

const IndexAnchor: React.FC<IndexAnchorProps> = props => {
  const { index, title, children, active, highlightColor, onLayoutCapture, style, onLayout, tokensOverride, ...rest } = props
  const { colors, layout, typography } = useIndexBarTokens(tokensOverride)
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
            paddingHorizontal: layout.anchorPaddingHorizontal,
          },
        ]}
      >
        <Text style={[styles.title, { color: textColor, fontSize: typography.anchorTitleSize }]}>
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
  },
  title: {
    fontWeight: '600',
  },
})

IndexAnchor.displayName = 'IndexBar.Anchor'

export default IndexAnchor
