import React from 'react'
import { ActivityIndicator, View, type StyleProp, type TextStyle } from 'react-native'
import { renderTextOrNode } from '../../utils'
import { isRenderable, isText } from '../../utils/validate'
import type { LoadingProps } from './types'
import { useLoadingTokens } from './tokens'

const LoadingImpl: React.FC<LoadingProps> = props => {
  const { tokensOverride, color: clrP, size: sizeP, textSize: tsP, textColor: tcP, vertical: vertP, accessibilityLabel: accP, ['aria-label']: ariaP, style, textStyle, contentStyle, children, ...rest } = props; const tokens = useLoadingTokens(tokensOverride)
  const clr = clrP ?? tokens.colors.indicator; const size = sizeP ?? tokens.defaults.size; const ts = tsP ?? tokens.defaults.textSize; const tc = tcP ?? tokens.colors.text; const vert = vertP ?? tokens.defaults.vertical; const acc = ariaP ?? accP ?? 'loading'
  const ind = <ActivityIndicator testID="rv-loading-spinner" size={size} color={clr} accessibilityLabel={acc} />; const txtSp = { marginLeft: vert ? 0 : tokens.spacing.gap, marginTop: vert ? tokens.spacing.gap : 0 }; const txtNode = isRenderable(children) && <View style={isText(children) ? undefined : txtSp}>{renderTextOrNode(children, [tokens.layout.text, txtSp, { fontSize: ts, color: tc }, textStyle].filter(Boolean) as StyleProp<TextStyle>)}</View>
  return <View accessibilityRole="progressbar" style={[tokens.layout.container, { flexDirection: vert ? 'column' : 'row', justifyContent: vert ? 'center' : 'flex-start' }, style]} {...rest}><View style={contentStyle}>{ind}</View>{txtNode}</View>
}

export const Loading = React.memo(LoadingImpl)
Loading.displayName = 'Loading'
