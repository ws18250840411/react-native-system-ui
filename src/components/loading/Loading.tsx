import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { isText } from '../../utils/validate'
import type { LoadingProps } from './types'
import { useLoadingTokens } from './tokens'

const LoadingImpl: React.FC<LoadingProps> = props => {
  const {
    tokensOverride,
    color: colorProp,
    size: sizeProp,
    textSize: textSizeProp,
    textColor: textColorProp,
    vertical: verticalProp,
    accessibilityLabel,
    ['aria-label']: ariaLabel,
    style,
    textStyle,
    contentStyle,
    children,
    ...rest
  } = props

  const tokens = useLoadingTokens(tokensOverride)
  const color = colorProp ?? tokens.colors.indicator
  const size = sizeProp ?? tokens.defaults.size
  const textSize = textSizeProp ?? tokens.defaults.textSize
  const textColor = textColorProp ?? tokens.colors.text
  const vertical = verticalProp ?? tokens.defaults.vertical
  const resolvedAccessibilityLabel = ariaLabel ?? accessibilityLabel ?? 'loading'
  const indicator = (
    <ActivityIndicator
      testID="rv-loading-spinner"
      size={size}
      color={color}
      accessibilityLabel={resolvedAccessibilityLabel}
    />
  )

  const hasChildren = children !== undefined && children !== null && children !== false
  const textSpacingStyle = {
    marginLeft: vertical ? 0 : tokens.spacing.gap,
    marginTop: vertical ? tokens.spacing.gap : 0,
  }
  const textNode = hasChildren && (isText(children) ? (
    <Text
      style={[
        tokens.layout.text,
        textSpacingStyle,
        {
          fontSize: textSize,
          color: textColor,
        },
        textStyle,
      ]}
    >
      {children}
    </Text>
  ) : (
    <View style={textSpacingStyle}>{children}</View>
  ))

  return (
    <View
      accessibilityRole="progressbar"
      style={[
        tokens.layout.container,
        {
          flexDirection: vertical ? 'column' : 'row',
          justifyContent: vertical ? 'center' : 'flex-start',
        },
        style,
      ]}
      {...rest}
    >
      <View style={contentStyle}>{indicator}</View>
      {textNode}
    </View>
  )
}

export const Loading = React.memo(LoadingImpl)
Loading.displayName = 'Loading'
