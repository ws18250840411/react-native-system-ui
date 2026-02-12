import React from 'react'
import { Text as RNText, type StyleProp, type TextProps, type TextStyle } from 'react-native'
import { useTheme } from './useTheme'
export const Text = React.forwardRef<RNText, TextProps>(({ style, ...rest }, ref) => { const { foundations } = useTheme(); return <RNText ref={ref} style={([{ fontFamily: foundations.typography.fontFamily }, style] as StyleProp<TextStyle>)} {...rest} /> })
Text.displayName = 'Text'
