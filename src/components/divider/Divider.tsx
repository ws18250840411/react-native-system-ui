import React from 'react'
import { Platform, Text, View } from 'react-native'

import { createHairlineView, isRenderable, isText } from '../../utils'
import { useDividerTokens } from './tokens'
import type { DividerProps } from './types'

export const Divider: React.FC<DividerProps> = props => {
  const {
    tokensOverride,
    children,
    type: typeProp,
    orientation: orientationProp,
    dashed: dashedProp,
    hairline: hairlineProp,
    contentPosition: contentPositionProp,
    textStyle,
    contentStyle,
    lineColor,
    style,
    ...rest
  } = props

  const tokens = useDividerTokens(tokensOverride)
  const dashed = dashedProp ?? tokens.defaults.dashed
  const hairline = hairlineProp ?? tokens.defaults.hairline
  const contentPosition = contentPositionProp ?? tokens.defaults.contentPosition
  const orientation = typeProp ?? orientationProp ?? 'horizontal'

  const resolvedColor = lineColor ?? tokens.colors.line
  const borderStyle = dashed ? 'dashed' : 'solid'

  const hasContent = orientation === 'horizontal' && isRenderable(children)
  const content = !hasContent ? null : isText(children) ? (
    <Text
      style={[
        tokens.layout.text,
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
  ) : children

  const leftGrow = contentPosition === 'left' ? tokens.sizing.sideMinFlex : 1
  const rightGrow = contentPosition === 'right' ? tokens.sizing.sideMinFlex : 1

  const renderLine = (grow: number) => {
    if (hairline) {
      return (
        <View style={[tokens.layout.hairlineWrapper, { flexGrow: grow }]}>
          <View
            style={[
              createHairlineView({
                position: 'bottom',
                color: resolvedColor,
                left: 0,
                right: 0,
                bottom: 0,
              }),
              { borderStyle },
            ]}
          />
        </View>
      )
    }

    return (
      <View
        style={{
          flexGrow: grow,
          flexShrink: 1,
          height: tokens.borders.thickness,
          borderBottomWidth: tokens.borders.thickness,
          borderBottomColor: resolvedColor,
          borderStyle,
        }}
      />
    )
  }

  const accessibilityRole = Platform.OS === 'web' ? 'separator' : undefined

  if (orientation === 'vertical') {
    const line =
      hairline
        ? (
          <View style={[tokens.layout.hairlineWrapper, { width: tokens.borders.thickness, height: '100%' }]}>
            <View
              style={[
                createHairlineView({
                  position: 'left',
                  color: resolvedColor,
                  top: 0,
                  bottom: 0,
                  left: 0,
                }),
                { borderStyle },
              ]}
            />
          </View>
        )
        : (
          <View
            style={{
              width: tokens.borders.thickness,
              height: '100%',
              borderLeftWidth: tokens.borders.thickness,
              borderLeftColor: resolvedColor,
              borderStyle,
            }}
          />
        )

    return (
      <View
        style={[
          tokens.layout.container,
          { marginVertical: tokens.spacing.vertical, flexDirection: 'column' },
          style,
        ]}
        accessibilityRole={accessibilityRole}
        // @ts-expect-error web-only aria prop
        aria-orientation={orientation}
        {...rest}
      >
        {line}
      </View>
    )
  }

  return (
    <View
      style={[
        tokens.layout.container,
        { marginVertical: tokens.spacing.vertical },
        style,
      ]}
      accessibilityRole={accessibilityRole}
      // @ts-expect-error web-only aria prop
      aria-orientation={orientation}
      {...rest}
    >
      {renderLine(hasContent ? leftGrow : 1)}
      {hasContent && (
        <>
          <View
            style={[
              tokens.layout.contentWrapper,
              { paddingHorizontal: tokens.spacing.contentPadding },
              contentStyle,
            ]}
          >
            {content}
          </View>
          {renderLine(rightGrow)}
        </>
      )}
    </View>
  )
}

Divider.displayName = 'Divider'
