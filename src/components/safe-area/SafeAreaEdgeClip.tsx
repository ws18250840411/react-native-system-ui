import React from 'react'
import { View, type StyleProp, type ViewStyle } from 'react-native'

export interface SafeAreaEdgeClipProps {
  position: 'top' | 'bottom'
  height: number
  inset?: number
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  testID?: string
}

export const SafeAreaEdgeClip: React.FC<SafeAreaEdgeClipProps> = ({
  position,
  height,
  inset = 0,
  style,
  children,
  testID,
}) => {
  const baseStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
    height,
    ...(position === 'top' ? { top: inset } : { bottom: inset }),
  }

  return (
    <View testID={testID} style={[baseStyle, style]}>
      {children}
    </View>
  )
}

SafeAreaEdgeClip.displayName = 'SafeAreaEdgeClip'
