import React from 'react'
import { Text, View } from 'react-native'

import { createHairlineView } from '../../utils'
import { Cell as CellBase } from './Cell'
import { CellGroupContext } from './CellContext'
import type { CellGroupProps } from './types'
import { useCellTokens } from './tokens'

export const CellGroup: React.FC<CellGroupProps> = ({
  children,
  title,
  border,
  inset,
  card,
  style,
  bodyStyle,
  tokensOverride,
  }) => {
  const tokens = useCellTokens(tokensOverride)
  const resolvedBorder = border ?? tokens.defaults.groupBorder
  const resolvedInset = inset ?? tokens.defaults.groupInset
  const resolvedCard = card ?? tokens.defaults.groupCard

  const showInset = resolvedInset || resolvedCard
  const showOuterBorder = resolvedBorder && !showInset
  const childArray = React.Children.toArray(children)
  const isCellElement = (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return false
    if (child.type === CellBase) return true
    const type = child.type as unknown as { displayName?: string }
    return type.displayName === 'Cell'
  }
  const lastCellIndex = (() => {
    for (let i = childArray.length - 1; i >= 0; i--) {
      const child = childArray[i]
      if (isCellElement(child)) return i
    }
    return -1
  })()

  return (
    <View style={[{ marginBottom: resolvedCard ? 0 : tokens.sizing.groupMarginBottom }, style]}>
      {title ? (
        <Text
          style={{
            color: tokens.colors.groupTitle,
            fontSize: tokens.typography.groupTitleSize,
            paddingHorizontal: tokens.sizing.groupTitlePaddingHorizontal,
            paddingVertical: tokens.sizing.groupTitlePaddingVertical,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View
        style={[
          { backgroundColor: tokens.colors.groupBodyBackground },
          showInset && {
            overflow: 'hidden',
            borderRadius: tokens.radii.groupInset,
            marginHorizontal: tokens.sizing.groupInsetMarginHorizontal,
            backgroundColor: tokens.colors.background,
          },
          resolvedCard ? tokens.layout.groupCardShadow : null,
          bodyStyle,
        ]}
      >
        {childArray.map((child, index) => {
          const key = React.isValidElement(child) && child.key != null ? child.key : index
          const isCell = isCellElement(child)

          return (
            <CellGroupContext.Provider
              key={key}
              value={{
                border: resolvedBorder,
                inset: showInset,
                isLast: isCell ? index === lastCellIndex : false,
              }}
            >
              {child}
            </CellGroupContext.Provider>
          )
        })}
          {showOuterBorder ? (
            <>
              <View
                style={createHairlineView({
                  position: 'top',
                  color: tokens.colors.border,
                  left: 0,
                  right: 0,
                  enabled: tokens.borders.width > 0,
                  width: tokens.borders.width,
                })}
              />
              <View
                style={createHairlineView({
                  position: 'bottom',
                  color: tokens.colors.border,
                  left: 0,
                  right: 0,
                  enabled: tokens.borders.width > 0,
                  width: tokens.borders.width,
                })}
              />
            </>
          ) : null}
        </View>
    </View>
  )
}
