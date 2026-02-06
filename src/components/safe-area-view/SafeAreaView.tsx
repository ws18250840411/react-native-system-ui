import React from 'react'
import { View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native'
import { useSafeAreaPadding } from '../../hooks/useSafeAreaPadding'

export interface SafeAreaViewProps {
  edge?: 'top' | 'bottom'
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  onLayout?: (event: LayoutChangeEvent) => void
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto'
}

const SafeAreaViewImpl: React.FC<SafeAreaViewProps> = ({
  edge,
  style,
  children,
  onLayout,
  pointerEvents,
}) => {
  const p = useSafeAreaPadding({})
  if (edge === 'top') {
    return <View style={[{ width: '100%', minHeight: p.paddingTop } as ViewStyle, style]} onLayout={onLayout} pointerEvents={pointerEvents ?? 'none'} />
  }
  if (edge === 'bottom') {
    return <View style={[{ width: '100%', minHeight: p.paddingBottom } as ViewStyle, style]} pointerEvents={pointerEvents ?? 'none'} />
  }
  return <View style={[{ width: '100%', paddingTop: p.paddingTop, paddingBottom: p.paddingBottom, paddingLeft: p.paddingLeft, paddingRight: p.paddingRight } as ViewStyle, style]} onLayout={onLayout} pointerEvents={pointerEvents}>{children}</View>
}

export const SafeAreaView = React.memo(SafeAreaViewImpl)
SafeAreaView.displayName = 'SafeAreaView'
