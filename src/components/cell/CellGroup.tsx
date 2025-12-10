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
    border && showInset && {
      borderColor: tokens.border.color,
      borderWidth: tokens.border.width,
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
    card ? createPlatformShadow(tokens.group.cardShadow) : null,
    bodyStyle,
  ]

  const childArray = React.Children.toArray(children)

  return (
    <View style={containerStyle}>
      {title ? <Text style={titleStyle}>{title}</Text> : null}
      <View style={bodyStyles}>
        {childArray.map((child, index) => {
          const key = React.isValidElement(child) && child.key != null ? child.key : index

          return (
            <CellGroupContext.Provider
              key={key}
              value={{ border, inset: inset || card, isLast: index === childArray.length - 1 }}
            >
              {child}
            </CellGroupContext.Provider>
          )
        })}
      </View>
    </View>
  )
}
