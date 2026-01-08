import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { createHairlineView } from '../../utils/hairline'
import { isRenderable, isText } from '../../utils/validate'
import type { DividerProps, DividerTokens } from './types'

const createDividerTokens = (foundations: Foundations): DividerTokens => {
  const { palette, fontSize, typography, spacing } = foundations

  return {
    defaults: {
      dashed: false,
      hairline: true,
      contentPosition: 'center',
    },
    colors: {
      line: palette.default[200],
      text: palette.default[600],
    },
    typography: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.sm * typography.lineHeightMultiplier,
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.medium,
    },
    spacing: {
      vertical: spacing.md,
      horizontal: spacing.none,
      contentPadding: spacing.sm,
    },
    line: {
      thickness: 1,
      sideMinFlex: 0.18,
    },
  }
}

const useDividerTokens = createComponentTokensHook('divider', createDividerTokens)

export const Divider: React.FC<DividerProps> = props => {
  const tokens = useDividerTokens(props.tokensOverride)
  const {
    children,
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
  const borderStyle = dashed ? 'dashed' : 'solid'

  const hasContent = isRenderable(children)
  const content =
    !hasContent ? null : isText(children) ? (
      <Text
        style={[
          styles.text,
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
    ) : (
      children
    )

  const leftGrow = contentPosition === 'left' ? tokens.line.sideMinFlex : 1
  const rightGrow = contentPosition === 'right' ? tokens.line.sideMinFlex : 1

  const renderLine = (grow: number) => {
    if (hairline) {
      return (
        <View style={{ flexGrow: grow, flexShrink: 1, height: 1, position: 'relative' }}>
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
          height: tokens.line.thickness,
          borderBottomWidth: tokens.line.thickness,
          borderBottomColor: resolvedColor,
          borderStyle,
        }}
      />
    )
  }

  return (
    <View
      style={[
        styles.horizontal,
        { marginVertical: tokens.spacing.vertical },
        style,
      ]}
      {...rest}
    >
      {renderLine(hasContent ? leftGrow : 1)}
      {hasContent ? (
        <>
          <View
            style={[
              styles.contentWrapper,
              { paddingHorizontal: tokens.spacing.contentPadding },
              contentStyle,
            ]}
          >
            {content}
          </View>
          {renderLine(rightGrow)}
        </>
      ) : null}
    </View>
  )
}

Divider.displayName = 'Divider'

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
})
