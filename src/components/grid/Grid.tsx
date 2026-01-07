import React from 'react'
import { StyleSheet, View } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { createHairlineView } from '../../utils/hairline'
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

  const showBorder = border && !gutter
  const borderColor = tokens.colors.border

  const containerStyle = [
    styles.container,
    gutter ? { paddingLeft: gutter } : null,
    showBorder ? styles.containerWithBorder : null,
    style,
  ] as any

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

  const renderBorder = (position: 'top' | 'bottom') => {
    if (!showBorder) return null
    return (
      <View
        style={[
          styles.border,
          position === 'top' ? styles.borderTop : styles.borderBottom,
          createHairlineView({
            position,
            color: borderColor,
            left: 0,
            right: 0,
            [position]: 0,
          }),
        ]}
      />
    )
  }

  return (
    <GridContext.Provider value={contextValue}>
      <View style={containerStyle} {...rest}>
        {renderBorder('top')}
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) return null
          return React.cloneElement(child as React.ReactElement<any>, {
            gridItemIndex: index,
            key: child.key ?? index,
          })
        })}
        {renderBorder('bottom')}
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
  containerWithBorder: {
    position: 'relative',
  },
  border: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    zIndex: 1,
  },
  borderTop: {
    top: 0,
  },
  borderBottom: {
    bottom: 0,
  },
})
