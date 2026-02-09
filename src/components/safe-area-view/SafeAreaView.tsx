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

const SafeAreaViewImpl: React.FC<SafeAreaViewProps> = ({ edge, style, children, onLayout, pointerEvents }) => { const pad = useSafeAreaPadding({}); if (edge === 'top') return <View style={[{ width: '100%', minHeight: pad.paddingTop } as ViewStyle, style]} onLayout={onLayout} pointerEvents={pointerEvents ?? 'none'} />; if (edge === 'bottom') return <View style={[{ width: '100%', minHeight: pad.paddingBottom } as ViewStyle, style]} pointerEvents={pointerEvents ?? 'none'} />; return <View style={[{ width: '100%', paddingTop: pad.paddingTop, paddingBottom: pad.paddingBottom, paddingLeft: pad.paddingLeft, paddingRight: pad.paddingRight } as ViewStyle, style]} onLayout={onLayout} pointerEvents={pointerEvents}>{children}</View>
}

export const SafeAreaView = React.memo(SafeAreaViewImpl)
SafeAreaView.displayName = 'SafeAreaView'
