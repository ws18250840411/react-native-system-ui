import React, { useMemo } from 'react'
import { View } from 'react-native'

import { createHairlineView } from '../../utils'
import { GridContext } from './GridContext'
import { useGridTokens } from './tokens'
import type { GridProps } from './types'

export const Grid: React.FC<GridProps> = props => {
  const {
    tokensOverride,
    children,
    columnNum: columnNumProp,
    gutter: gutterProp,
    border: borderProp,
    center: centerProp,
    square: squareProp,
    direction: directionProp,
    reverse: reverseProp,
    clickable: clickableProp,
    iconSize: iconSizeProp,
    iconColor,
    style,
    ...rest
  } = props

  const tokens = useGridTokens(tokensOverride)

  const columnNumValue = columnNumProp ?? tokens.defaults.columnNum
  const columnNum = Number.isFinite(columnNumValue) && columnNumValue > 0
    ? Math.floor(columnNumValue)
    : tokens.defaults.columnNum

  const gutterValue = gutterProp ?? tokens.defaults.gutter
  const gutter = Number.isFinite(gutterValue) && gutterValue > 0 ? gutterValue : 0
  const border = borderProp ?? tokens.defaults.border
  const center = centerProp ?? tokens.defaults.center
  const square = squareProp ?? tokens.defaults.square
  const direction = directionProp ?? tokens.defaults.direction
  const reverse = reverseProp ?? tokens.defaults.reverse
  const clickable = clickableProp ?? tokens.defaults.clickable
  const iconSizeValue = iconSizeProp ?? tokens.defaults.iconSize
  const iconSize = Number.isFinite(iconSizeValue) && iconSizeValue > 0 ? iconSizeValue : tokens.defaults.iconSize

  const childArray = React.Children.toArray(children).filter((child): child is React.ReactElement<any> => React.isValidElement(child))
  const showBorder = border && !gutter
  const borderColor = tokens.colors.border

  const topBorder = showBorder && (
    <View
      style={[
        tokens.layout.border,
        tokens.layout.borderTop,
        createHairlineView({ position: 'top', color: borderColor, left: 0, right: 0, top: 0 }),
      ]}
    />
  )

  const bottomBorder = showBorder && (
    <View
      style={[
        tokens.layout.border,
        tokens.layout.borderBottom,
        createHairlineView({ position: 'bottom', color: borderColor, left: 0, right: 0, bottom: 0 }),
      ]}
    />
  )

  const contextValue = useMemo(
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
      border,
      center,
      childArray.length,
      clickable,
      columnNum,
      direction,
      gutter,
      iconColor,
      iconSize,
      reverse,
      square,
      tokens,
    ]
  )

  return (
    <GridContext.Provider value={contextValue}>
      <View
        style={[
          tokens.layout.container,
          gutter ? { paddingLeft: gutter } : undefined,
          style,
        ]}
        {...rest}
      >
        {topBorder}
        {childArray.map((child, index) =>
          React.cloneElement(child, {
            gridItemIndex: index,
            key: child.key ?? index,
          })
        )}
        {bottomBorder}
      </View>
    </GridContext.Provider>
  )
}

Grid.displayName = 'Grid'
