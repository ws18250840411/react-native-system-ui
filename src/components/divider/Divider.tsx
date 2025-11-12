import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { DividerProps } from './types'
import type { DividerContentPosition, DividerType } from './types'

interface DividerTokens {
  defaults: {
    type: DividerType
    dashed: boolean
    hairline: boolean
    contentPosition: DividerContentPosition
  }
  colors: {
    line: string
    text: string
  }
  typography: {
    fontSize: number
    lineHeight: number
    fontFamily: string
    fontWeight: string
  }
  spacing: {
    vertical: number
    horizontal: number
    contentPadding: number
  }
  line: {
    thickness: number
    sideMinFlex: number
  }
  vertical: {
    minHeight: number
  }
}

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

const useDividerTokens = (overrides?: DeepPartial<DividerTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createDividerTokens(foundations)
    const globalOverrides = components?.divider as DeepPartial<DividerTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}

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
      )
    }

    return children
  }

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
    styles.line,
    {
      borderBottomColor: resolvedColor,
      borderBottomWidth: lineThickness,
      borderStyle,
    },
  ]

  return (
    <View
      style={[
        styles.horizontal,
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
              styles.contentWrapper,
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

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
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
    borderLeftWidth: 1,
    alignSelf: 'stretch',
  },
})
