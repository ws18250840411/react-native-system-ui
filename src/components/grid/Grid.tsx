import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
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
      text: palette.default[700],
      background: '#ffffff',
      active: palette.default[100],
    },
    spacing: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.md,
    },
    typography: {
      fontSize: fontSize.sm,
      fontFamily: typography.fontFamily,
      lineHeight: fontSize.sm * typography.lineHeightMultiplier,
      fontWeight: typography.weight.regular,
    },
  }
}

const useGridTokens = (overrides?: DeepPartial<GridTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createGridTokens(foundations)
    const globalOverrides = components?.grid as DeepPartial<GridTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}

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
    styles.container,
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
