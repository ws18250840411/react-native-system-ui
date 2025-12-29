import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { Cell as CellBase } from './Cell'
import { CellGroupContext } from './CellContext'
import type { CellGroupProps } from './types'
import { useCellTokens } from './tokens'

const styles = StyleSheet.create({
  container: {},
  title: {},
  body: {},
  inset: {
    overflow: 'hidden',
  },
})

export const CellGroup: React.FC<CellGroupProps> = ({
  children,
  title,
  border,
  inset,
  card,
  style,
  bodyStyle,
}) => {
  const tokens = useCellTokens()
  const resolvedBorder = border ?? tokens.defaults.groupBorder
  const resolvedInset = inset ?? tokens.defaults.groupInset
  const resolvedCard = card ?? tokens.defaults.groupCard

  const containerStyle = [
    styles.container,
    { marginBottom: resolvedCard ? 0 : tokens.group.marginBottom },
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
  const showInset = resolvedInset || resolvedCard
  const bodyStyles = [
    styles.body,
    {
      backgroundColor: tokens.group.bodyBackground,
    },
    showInset && styles.inset,
    showInset && {
      borderRadius: tokens.group.insetRadius,
      marginHorizontal: tokens.group.insetMarginHorizontal,
      backgroundColor: tokens.container.background,
    },
    resolvedCard ? createPlatformShadow(tokens.group.cardShadow) : null,
    bodyStyle,
  ]

  const childArray = React.Children.toArray(children)
  const lastCellIndex = (() => {
    for (let i = childArray.length - 1; i >= 0; i--) {
      const child = childArray[i]
      if (React.isValidElement(child) && child.type === CellBase) return i
    }
    return -1
  })()

  return (
    <View style={containerStyle}>
      {title ? <Text style={titleStyle}>{title}</Text> : null}
      <View style={bodyStyles}>
        {childArray.map((child, index) => {
          const key = React.isValidElement(child) && child.key != null ? child.key : index
          const isCell = React.isValidElement(child) && child.type === CellBase

          return (
            <CellGroupContext.Provider
              key={key}
              value={{
                border: resolvedBorder,
                inset: resolvedInset || resolvedCard,
                isLast: isCell ? index === lastCellIndex : false,
              }}
            >
              {child}
            </CellGroupContext.Provider>
          )
        })}
      </View>
    </View>
  )
}
