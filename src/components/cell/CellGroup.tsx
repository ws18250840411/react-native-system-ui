import React, { useMemo } from 'react'
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
  const childArray = useMemo(() => React.Children.toArray(children), [children])
  const isCellElement = (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return false
    if (child.type === CellBase) return true
    const type = child.type as unknown as { displayName?: string }
    return type.displayName === 'Cell'
  }
  const lastCellIndex = useMemo(() => {
    for (let i = childArray.length - 1; i >= 0; i--) {
      const child = childArray[i]
      if (isCellElement(child)) return i
    }
    return -1
  }, [childArray])

  const containerStyle = useMemo(
    () => [{ marginBottom: resolvedCard ? 0 : tokens.sizing.groupMarginBottom }, style],
    [resolvedCard, style, tokens.sizing.groupMarginBottom]
  )

  const insetStyle = useMemo(
    () => ({
      overflow: 'hidden' as const,
      borderRadius: tokens.radii.groupInset,
      marginHorizontal: tokens.sizing.groupInsetMarginHorizontal,
      backgroundColor: tokens.colors.background,
    }),
    [
      tokens.colors.background,
      tokens.radii.groupInset,
      tokens.sizing.groupInsetMarginHorizontal,
    ]
  )

  const bodyContainerStyle = useMemo(() => ([
    { backgroundColor: tokens.colors.groupBodyBackground },
    showInset ? insetStyle : null,
    resolvedCard ? tokens.layout.groupCardShadow : null,
    bodyStyle,
  ]), [
    bodyStyle,
    resolvedCard,
    showInset,
    tokens.colors.background,
    tokens.colors.groupBodyBackground,
    tokens.layout.groupCardShadow,
    tokens.radii.groupInset,
    tokens.sizing.groupInsetMarginHorizontal,
    insetStyle,
  ])

  const renderedTitle = useMemo(
    () => (title ? (
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
    ) : null),
    [
      title,
      tokens.colors.groupTitle,
      tokens.sizing.groupTitlePaddingHorizontal,
      tokens.sizing.groupTitlePaddingVertical,
      tokens.typography.groupTitleSize,
    ]
  )

  const renderedChildren = useMemo(
    () =>
      childArray.map((child, index) => {
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
      }),
    [childArray, lastCellIndex, resolvedBorder, showInset]
  )

  return (
    <View style={containerStyle}>
      {renderedTitle}
      <View
        style={bodyContainerStyle}
      >
        {renderedChildren}
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
