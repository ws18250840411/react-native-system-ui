import React from 'react'
import { StyleSheet, View } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { createHairlineBorderTop } from '../../utils/hairline'
import { GridContext, type GridTokens } from './GridContext'
import type { GridProps } from './types'

const createGridTokens = (foundations: Foundations): GridTokens => {
  const { palette, spacing, fontSize, typography } = foundations

  return {
    defaults: {
      columnNum: 4,
      gutter: 0,
      border: true,
      center: true,
      square: false,
      direction: 'vertical',
      reverse: false,
      clickable: false,
      iconSize: 28,
    },
    colors: {
      border: palette.default[200],
      text: palette.default[600],
      background: palette.default[50] ?? '#ffffff',
      active: palette.default[100],
    },
    spacing: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.md,
    },
    typography: {
      fontSize: fontSize.sm,
      fontFamily: typography.fontFamily,
      lineHeight: Math.round(fontSize.sm * typography.lineHeightMultiplier),
      fontWeight: String(typography.weight.regular),
    },
  }
}

const useGridTokens = createComponentTokensHook('grid', createGridTokens)

export const Grid: React.FC<GridProps> = props => {
  const tokens = useGridTokens(props.tokensOverride)
  const {
    tokensOverride: _tokensOverride,
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
    child => child !== null && child !== undefined,
  )

  const containerStyle = [
    styles.container,
    gutter
      ? {
        paddingLeft: gutter,
      }
      : null,
    border && !gutter
      ? createHairlineBorderTop(tokens.colors.border)
      : null,
    style,
  ]

  const contextValue = {
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
  }

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
