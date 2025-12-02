import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { CellGroupContext } from './CellContext'
import type { CellGroupProps } from './types'
import { useCellTokens } from './tokens'

const styles = StyleSheet.create({
  container: {},
  title: {},
  body: {},
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
    { marginBottom: card ? 0 : tokens.group.marginBottom },
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
    border && inset && {
      borderColor: tokens.border.color,
      borderTopWidth: tokens.border.width,
      borderBottomWidth: tokens.border.width,
    },
    {
      backgroundColor: tokens.group.bodyBackground,
    },
    showInset && styles.inset,
    showInset && {
      borderColor: tokens.border.color,
      borderRadius: tokens.group.insetRadius,
      marginHorizontal: inset ? tokens.group.insetMarginHorizontal : 0,
      backgroundColor: tokens.container.background,
    },
    card
      ? createPlatformShadow({
          color: tokens.group.cardShadow.color,
          opacity: tokens.group.cardShadow.opacity,
          radius: tokens.group.cardShadow.radius,
          offsetY: tokens.group.cardShadow.offsetY,
          elevation: tokens.group.cardShadow.elevation,
        })
      : null,
    bodyStyle,
  ]

  const childArray = React.Children.toArray(children)

  return (
    <View style={containerStyle}>
      {title ? <Text style={titleStyle}>{title}</Text> : null}
      <View style={bodyStyles}>
        {childArray.map((child, index) => (
          <CellGroupContext.Provider
            key={index}
            value={{ border, inset: inset || card, isLast: index === childArray.length - 1 }}
          >
            {child}
          </CellGroupContext.Provider>
        ))}
      </View>
    </View>
  )
}
