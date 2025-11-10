import React from 'react'
import { StyleSheet, View } from 'react-native'

import { gridStyles } from './styles'
import { GridContext } from './GridContext'
import type { GridProps } from './types'
import { useGridTokens } from './useGridTokens'

export const Grid: React.FC<GridProps> = props => {
  const tokens = useGridTokens()
  const {
    children,
    columnNum = tokens.defaults.columnNum,
    gutter = tokens.defaults.gutter,
    border = tokens.defaults.border,
    center = tokens.defaults.center,
    square = tokens.defaults.square,
    direction = tokens.defaults.direction,
    reverse = tokens.defaults.reverse,
    clickable = tokens.defaults.clickable,
    iconSize = tokens.defaults.iconSize,
    iconColor,
    style,
    ...rest
  } = props

  const childArray = React.Children.toArray(children).filter(
    child => child !== null && child !== undefined && child !== false,
  )

  const containerStyle = [
    gridStyles.container,
    gutter
      ? {
          marginHorizontal: -gutter / 2,
          marginVertical: -gutter / 2,
        }
      : null,
    border
      ? {
          borderLeftWidth: StyleSheet.hairlineWidth,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: tokens.colors.border,
        }
      : null,
    style,
  ]

  const contextValue = React.useMemo(
    () => ({
      columnNum,
      gutter,
      border,
      center,
      square,
      direction,
      reverse,
      clickable,
      iconSize,
      iconColor,
      count: childArray.length,
      tokens,
    }),
    [
      columnNum,
      gutter,
      border,
      center,
      square,
      direction,
      reverse,
      clickable,
      iconSize,
      iconColor,
      childArray.length,
      tokens,
    ],
  )

  return (
    <GridContext.Provider value={contextValue}>
      <View style={containerStyle} {...rest}>
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) {
            return null
          }

          const key = child.key ?? index
          return React.cloneElement(child as React.ReactElement<any>, {
            gridItemIndex: index,
            key,
          })
        })}
      </View>
    </GridContext.Provider>
  )
}

Grid.displayName = 'Grid'
