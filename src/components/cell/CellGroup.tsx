import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CellGroupContext } from './CellContext'
import type { CellGroupProps } from './types'
import { useCellTokens } from './tokens'

const styles = StyleSheet.create({
  container: {},
  title: {},
  body: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inset: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
})

export const CellGroup: React.FC<CellGroupProps> = ({
  children,
  title,
  border = true,
  inset = false,
  card = false,
  style,
  bodyStyle,
}) => {
  const tokens = useCellTokens()

  const containerStyle = [
    styles.container,
    { marginBottom: tokens.group.marginBottom },
    style,
  ]
  const titleStyle = [
    styles.title,
    {
      color: tokens.group.titleColor,
      fontSize: tokens.group.titleSize,
      paddingHorizontal: tokens.group.titlePaddingHorizontal,
      paddingVertical: tokens.group.titlePaddingVertical,
    },
  ]
  const showInset = inset || card
  const bodyStyles = [
    styles.body,
    {
      backgroundColor: tokens.group.bodyBackground,
      borderColor: tokens.border.color,
    },
    showInset && styles.inset,
    showInset && {
      borderColor: tokens.border.color,
      borderRadius: tokens.group.insetRadius,
      marginHorizontal: tokens.group.insetMarginHorizontal,
      backgroundColor: tokens.container.background,
    },
    bodyStyle,
  ]

  return (
    <CellGroupContext.Provider value={{ border, inset: inset || card }}>
      <View style={containerStyle}>
        {title ? <Text style={titleStyle}>{title}</Text> : null}
        <View style={bodyStyles}>{children}</View>
      </View>
    </CellGroupContext.Provider>
  )
}
