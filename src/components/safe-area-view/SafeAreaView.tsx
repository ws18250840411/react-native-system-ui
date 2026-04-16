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

const SafeAreaViewImpl: React.FC<SafeAreaViewProps> = ({ edge, style, children, onLayout, pointerEvents }) => {
  const pad = useSafeAreaPadding({})
  const pe = { pointerEvents: (pointerEvents ?? 'none') as ViewStyle['pointerEvents'] }
  if (edge === 'top') return <View style={[{ width: '100%', minHeight: pad.paddingTop } as ViewStyle, style, pe]} onLayout={onLayout} />
  if (edge === 'bottom') return <View style={[{ width: '100%', minHeight: pad.paddingBottom } as ViewStyle, style, pe]} onLayout={onLayout} />
  const peRoot = pointerEvents != null ? { pointerEvents } as ViewStyle : undefined
  return <View style={[{ width: '100%', paddingTop: pad.paddingTop, paddingBottom: pad.paddingBottom, paddingLeft: pad.paddingLeft, paddingRight: pad.paddingRight } as ViewStyle, style, peRoot]} onLayout={onLayout}>{children}</View>
}

export const SafeAreaView = React.memo(SafeAreaViewImpl)
SafeAreaView.displayName = 'SafeAreaView'
