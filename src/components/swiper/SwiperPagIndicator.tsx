import React, { memo, type ReactElement } from 'react'
import { View, StyleSheet, type StyleProp, type ViewStyle, type ViewProps } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'

export interface SwiperPagIndicatorTokens {
  colors: {
    active: string
    inactive: string
  }
  sizing: {
    dotSizeActive: number
    dotSizeInactive: number
  }
  spacing: {
    dotMargin: number
  }
  offset: {
    horizontalBottom: number
    verticalRight: number
  }
  layer: {
    zIndex: number
    elevation: number
  }
}

const createSwiperPagIndicatorTokens = (
  foundations: Foundations
): SwiperPagIndicatorTokens => ({
  colors: {
    active: foundations.palette.primary.foreground ?? '#ffffff',
    inactive: 'rgba(255,255,255,0.5)',
  },
  sizing: {
    dotSizeActive: 8,
    dotSizeInactive: 6,
  },
  spacing: {
    dotMargin: foundations.spacing.xs,
  },
  offset: {
    horizontalBottom: foundations.spacing.lg,
    verticalRight: foundations.spacing.lg,
  },
  layer: {
    zIndex: 10,
    elevation: 10,
  },
})

export const useSwiperPagIndicatorTokens = createComponentTokensHook(
  'swiperPagIndicator',
  createSwiperPagIndicatorTokens
)

export interface SwiperPagIndicatorProps extends ViewProps {
  total: number
  current: number
  vertical?: boolean
  style?: StyleProp<ViewStyle>
  activeColor?: string
  inactiveColor?: string
  tokensOverride?: DeepPartial<SwiperPagIndicatorTokens>
}

const SwiperPagIndicator = memo<SwiperPagIndicatorProps>(
  ({
    total,
    current,
    vertical = false,
    style,
    activeColor,
    inactiveColor,
    tokensOverride,
    ...rest
  }) => {
    const tokens = useSwiperPagIndicatorTokens(tokensOverride)
    const dots: ReactElement[] = []
    const resolvedActiveColor = activeColor || tokens.colors.active
    const resolvedInactiveColor = inactiveColor || tokens.colors.inactive
    const dotMargin = tokens.spacing.dotMargin

    const containerPositionStyle = vertical
      ? [styles.containerVertical, { right: tokens.offset.verticalRight }]
      : [styles.containerHorizontal, { bottom: tokens.offset.horizontalBottom }]

    for (let i = 0; i < total; i++) {
      const isActive = current === i
      const size = isActive ? tokens.sizing.dotSizeActive : tokens.sizing.dotSizeInactive
      dots.push(
        <View
          key={i}
          style={[{
            marginHorizontal: dotMargin,
            marginVertical: dotMargin,
            backgroundColor: isActive ? resolvedActiveColor : resolvedInactiveColor,
            width: size,
            height: size,
            borderRadius: size / 2,
          }]}
        />
      )
    }

    return (
      <View
        style={[
          styles.container,
          { zIndex: tokens.layer.zIndex, elevation: tokens.layer.elevation },
          containerPositionStyle,
          style,
        ]}
        {...rest}
      >
        {dots}
      </View>
    )
  }
)

SwiperPagIndicator.displayName = 'SwiperPagIndicator'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  containerVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'column',
  },
})

export default SwiperPagIndicator
