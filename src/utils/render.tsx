import React from 'react'
import type { StyleProp, TextStyle } from 'react-native'
import { Text } from '../design-system/Text'
import { isText } from './base'
export const renderTextOrNode = (content: React.ReactNode, textStyle?: StyleProp<TextStyle>, textProps?: { numberOfLines?: number }): React.ReactNode =>
  isText(content) ? <Text style={textStyle} {...textProps}>{content}</Text> : content
