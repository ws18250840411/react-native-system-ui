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
      type: 'horizontal',
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
    vertical: {
      minHeight: 24,
    },
  }
}

const useDividerTokens = createComponentTokensHook('divider', createDividerTokens)

export const Divider: React.FC<DividerProps> = props => {
  const tokens = useDividerTokens(props.tokensOverride)
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

  if (type === 'vertical') {
    return (
      <View
        style={[
          styles.verticalContainer,
          { marginHorizontal: tokens.spacing.horizontal, minHeight: tokens.vertical.minHeight },
          style,
        ]}
        {...rest}
      >
        <View
          style={[
            styles.verticalLine,
            { width: hairline ? 1 : tokens.line.thickness },
          ]}
        >
          {hairline ? (
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
          ) : (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                borderLeftWidth: tokens.line.thickness,
                borderLeftColor: resolvedColor,
                borderStyle,
              }}
            />
          )}
        </View>
      </View>
    )
  }

  const leftGrow = contentPosition === 'left' ? 0.3 : 1
  const rightGrow = contentPosition === 'right' ? 0.3 : 1

  const renderLine = () => (
    <View style={[styles.line, { height: hairline ? 1 : tokens.line.thickness }]}>
      {hairline ? (
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
      ) : (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottomWidth: tokens.line.thickness,
            borderBottomColor: resolvedColor,
            borderStyle,
          }}
        />
      )}
    </View>
  )

  return (
    <View
      style={[
        styles.horizontal,
        { marginVertical: tokens.spacing.vertical },
        style,
      ]}
      {...rest}
    >
      <View style={{ flexGrow: hasContent ? leftGrow : 1, flexShrink: 1 }}>
        {renderLine()}
      </View>
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
          <View style={{ flexGrow: rightGrow, flexShrink: 1 }}>
            {renderLine()}
          </View>
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
  line: {
    position: 'relative',
  },
  contentWrapper: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  verticalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  verticalLine: {
    position: 'relative',
    alignSelf: 'stretch',
  },
})
