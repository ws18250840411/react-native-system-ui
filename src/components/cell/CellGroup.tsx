import React from 'react'
import { Text, View } from 'react-native'

import { createPlatformShadow } from '../../utils/createPlatformShadow'
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
  const childArray = React.Children.toArray(children)
  const isCellElement = (child: any) =>
    React.isValidElement(child) && child.type === CellBase
  const lastCellIndex = (() => {
    for (let i = childArray.length - 1; i >= 0; i--) {
      const child = childArray[i]
      if (isCellElement(child)) return i
    }
    return -1
  })()

  return (
    <View style={[{ marginBottom: resolvedCard ? 0 : tokens.group.marginBottom }, style]}>
      {title ? (
        <Text
          style={{
            color: tokens.group.titleColor,
            fontSize: tokens.group.titleSize,
            paddingHorizontal: tokens.group.titlePaddingHorizontal,
            paddingVertical: tokens.group.titlePaddingVertical,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View
        style={[
          { backgroundColor: tokens.group.bodyBackground },
          showInset && {
            overflow: 'hidden',
            borderRadius: tokens.group.insetRadius,
            marginHorizontal: tokens.group.insetMarginHorizontal,
            backgroundColor: tokens.container.background,
          },
          resolvedCard ? createPlatformShadow(tokens.group.cardShadow) : null,
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
      </View>
    </View>
  )
}
