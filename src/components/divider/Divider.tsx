import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useDividerTokens } from './useDividerTokens'
import { dividerStyles } from './styles'
import type { DividerProps } from './types'

const flexRatioMap = {
  left: { left: 0.3, right: 1 },
  center: { left: 1, right: 1 },
  right: { left: 1, right: 0.3 },
} as const

export const Divider: React.FC<DividerProps> = props => {
  const tokens = useDividerTokens()
  const {
    children,
    type = tokens.defaults.type,
    dashed = tokens.defaults.dashed,
    hairline = tokens.defaults.hairline,
    contentPosition = tokens.defaults.contentPosition,
    textStyle,
    contentStyle,
    lineColor,
    style,
    ...rest
  } = props

  const resolvedColor = lineColor ?? tokens.colors.line
  const lineThickness = hairline ? StyleSheet.hairlineWidth : tokens.line.thickness
  const borderStyle = dashed ? 'dashed' : 'solid'

  const renderContent = () => {
    if (children === null || children === undefined) {
      return null
    }

    if (typeof children === 'string' || typeof children === 'number') {
      return (
        <Text
          style={[
            dividerStyles.text,
            {
              color: tokens.colors.text,
              fontSize: tokens.typography.fontSize,
              lineHeight: tokens.typography.lineHeight,
              fontFamily: tokens.typography.fontFamily,
              fontWeight: tokens.typography.fontWeight,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )
    }

    return children
  }

  if (type === 'vertical') {
    return (
      <View
        style={[
          dividerStyles.verticalContainer,
          { marginHorizontal: tokens.spacing.horizontal, minHeight: tokens.vertical.minHeight },
          style,
        ]}
        {...rest}
      >
        <View
          style={[
            dividerStyles.verticalLine,
            {
              borderLeftColor: resolvedColor,
              borderLeftWidth: lineThickness,
              borderStyle,
            },
          ]}
        />
      </View>
    )
  }

  const hasContent = children !== null && children !== undefined
  const ratios = flexRatioMap[contentPosition]

  const lineBaseStyle = [
    dividerStyles.line,
    {
      borderBottomColor: resolvedColor,
      borderBottomWidth: lineThickness,
      borderStyle,
    },
  ]

  return (
    <View
      style={[
        dividerStyles.horizontal,
        { marginVertical: tokens.spacing.vertical },
        style,
      ]}
      {...rest}
    >
      {hasContent ? (
        <>
          <View
            style={[
              ...lineBaseStyle,
              {
                flexGrow: ratios.left,
                flexShrink: 1,
              },
            ]}
          />
          <View
            style={[
              dividerStyles.contentWrapper,
              { paddingHorizontal: tokens.spacing.contentPadding },
              contentStyle,
            ]}
          >
            {renderContent()}
          </View>
          <View
            style={[
              ...lineBaseStyle,
              {
                flexGrow: ratios.right,
                flexShrink: 1,
              },
            ]}
          />
        </>
      ) : (
        <View style={[...lineBaseStyle, { flexGrow: 1 }]} />
      )}
    </View>
  )
}

Divider.displayName = 'Divider'
