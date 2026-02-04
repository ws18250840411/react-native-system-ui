import React, { useMemo } from 'react'
import { Platform, View, type ViewStyle } from 'react-native'

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

  const columnNum = useMemo(() => {
    const columnNumValue = columnNumProp ?? tokens.defaults.columnNum
    return Number.isFinite(columnNumValue) && columnNumValue > 0
      ? Math.floor(columnNumValue)
      : tokens.defaults.columnNum
  }, [columnNumProp, tokens.defaults.columnNum])

  const gutter = useMemo(() => {
    const gutterValue = gutterProp ?? tokens.defaults.gutter
    return Number.isFinite(gutterValue) && gutterValue > 0 ? gutterValue : 0
  }, [gutterProp, tokens.defaults.gutter])
  const border = useMemo(() => borderProp ?? tokens.defaults.border, [borderProp, tokens.defaults.border])
  const center = useMemo(() => centerProp ?? tokens.defaults.center, [centerProp, tokens.defaults.center])
  const square = useMemo(() => squareProp ?? tokens.defaults.square, [squareProp, tokens.defaults.square])
  const direction = useMemo(
    () => directionProp ?? tokens.defaults.direction,
    [directionProp, tokens.defaults.direction]
  )
  const reverse = useMemo(() => reverseProp ?? tokens.defaults.reverse, [reverseProp, tokens.defaults.reverse])
  const clickable = useMemo(
    () => clickableProp ?? tokens.defaults.clickable,
    [clickableProp, tokens.defaults.clickable]
  )
  const iconSize = useMemo(() => {
    const iconSizeValue = iconSizeProp ?? tokens.defaults.iconSize
    return Number.isFinite(iconSizeValue) && iconSizeValue > 0 ? iconSizeValue : tokens.defaults.iconSize
  }, [iconSizeProp, tokens.defaults.iconSize])

  const childArray = useMemo(
    () => React.Children.toArray(children).filter((child): child is React.ReactElement<any> => React.isValidElement(child)),
    [children]
  )
  const showBorder = border && !gutter
  const borderColor = tokens.colors.border

  const topBorder = useMemo(() => (showBorder ? (
    <View
      style={[
        tokens.layout.border,
        tokens.layout.borderTop,
        createHairlineView({ position: 'top', color: borderColor, left: 0, right: 0, top: 0 }),
      ]}
    />
  ) : null), [borderColor, showBorder, tokens.layout.border, tokens.layout.borderTop])

  const bottomBorder = useMemo(() => (showBorder ? (
    <View
      style={[
        tokens.layout.border,
        tokens.layout.borderBottom,
        createHairlineView({ position: 'bottom', color: borderColor, left: 0, right: 0, bottom: 0 }),
      ]}
    />
  ) : null), [borderColor, showBorder, tokens.layout.border, tokens.layout.borderBottom])

  const contextValue = useMemo(() => ({
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
  }), [
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
  ])

  const webGridStyle = useMemo(
    () =>
      Platform.OS === 'web'
        ? ({
            display: 'grid',
            gridTemplateColumns: `repeat(${columnNum}, minmax(0, 1fr))`,
            columnGap: gutter,
            rowGap: gutter,
          } as unknown as ViewStyle)
        : undefined,
    [columnNum, gutter]
  )

  const containerStyle = useMemo(
    () => [
      tokens.layout.container,
      Platform.OS === 'web' ? webGridStyle : gutter ? { paddingLeft: gutter } : undefined,
      style,
    ],
    [gutter, style, tokens.layout.container, webGridStyle]
  )

  const renderedChildren = useMemo(
    () =>
      childArray.map((child, index) =>
        React.cloneElement(child, {
          gridItemIndex: index,
          key: child.key ?? index,
        })
      ),
    [childArray]
  )

  return (
    <GridContext.Provider value={contextValue}>
      <View style={containerStyle} {...rest}>
        {topBorder}
        {renderedChildren}
        {bottomBorder}
      </View>
    </GridContext.Provider>
  )
}

Grid.displayName = 'Grid'
