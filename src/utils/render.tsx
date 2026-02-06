import React from 'react'
import { Text, type StyleProp, type TextStyle } from 'react-native'
import { isText } from './validate'

export const renderTextOrNode = (content: React.ReactNode, textStyle?: StyleProp<TextStyle>, textProps?: { numberOfLines?: number }): React.ReactNode =>
  isText(content) ? <Text style={textStyle} {...textProps}>{content}</Text> : content
