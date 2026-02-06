import React from 'react'
import { ActivityIndicator, Text, View, type StyleProp, type TextStyle } from 'react-native'
import { renderTextOrNode } from '../../utils'
import { isRenderable, isText } from '../../utils/validate'
import type { LoadingProps } from './types'
import { useLoadingTokens } from './tokens'

const LoadingImpl: React.FC<LoadingProps> = props => {
  const { tokensOverride, color: colorProp, size: sizeProp, textSize: textSizeProp, textColor: textColorProp, vertical: verticalProp, accessibilityLabel: accessibilityLabelProp, ['aria-label']: ariaLabelProp, style, textStyle, contentStyle, children, ...rest } = props
  const tokens = useLoadingTokens(tokensOverride)
  const color = colorProp ?? tokens.colors.indicator
  const size = sizeProp ?? tokens.defaults.size
  const textSize = textSizeProp ?? tokens.defaults.textSize
  const textColor = textColorProp ?? tokens.colors.text
  const vertical = verticalProp ?? tokens.defaults.vertical
  const resolvedAccessibilityLabel = ariaLabelProp ?? accessibilityLabelProp ?? 'loading'
  const indicator = <ActivityIndicator testID="rv-loading-spinner" size={size} color={color} accessibilityLabel={resolvedAccessibilityLabel} />
  const textStyleSpacing = { marginLeft: vertical ? 0 : tokens.spacing.gap, marginTop: vertical ? tokens.spacing.gap : 0 }
  const textNode = isRenderable(children) && <View style={isText(children) ? undefined : textStyleSpacing}>{renderTextOrNode(children, [tokens.layout.text, textStyleSpacing, { fontSize: textSize, color: textColor }, textStyle].filter(Boolean) as StyleProp<TextStyle>)}</View>
  return <View accessibilityRole="progressbar" style={[tokens.layout.container, { flexDirection: vertical ? 'column' : 'row', justifyContent: vertical ? 'center' : 'flex-start' }, style]} {...rest}><View style={contentStyle}>{indicator}</View>{textNode}</View>
}

export const Loading = React.memo(LoadingImpl)
Loading.displayName = 'Loading'
