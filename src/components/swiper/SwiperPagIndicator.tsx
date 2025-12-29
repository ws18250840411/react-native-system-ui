import React from 'react'
import { View, StyleSheet } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

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

const useSwiperPagIndicatorTokens = (
  overrides?: DeepPartial<SwiperPagIndicatorTokens>,
): SwiperPagIndicatorTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSwiperPagIndicatorTokens(foundations)
    const componentOverrides = components?.swiperPagIndicator
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

export interface SwiperPagIndicatorProps {
  total: number
  current: number
  vertical?: boolean
  style?: any
  activeColor?: string
  inactiveColor?: string
}

const SwiperPagIndicator = React.memo<SwiperPagIndicatorProps>(
  ({
    total,
    current,
    vertical = false,
    style,
    activeColor,
    inactiveColor,
  }) => {
    const tokens = useSwiperPagIndicatorTokens()
    const dots: React.ReactElement[] = []
    const resolvedActiveColor = activeColor ?? tokens.colors.active
    const resolvedInactiveColor = inactiveColor ?? tokens.colors.inactive
    const dotMargin = tokens.spacing.dotMargin

    const containerPositionStyle = vertical
      ? [styles.containerVertical, { right: tokens.offset.verticalRight }]
      : [styles.containerHorizontal, { bottom: tokens.offset.horizontalBottom }]

    for (let i = 0; i < total; i++) {
      const isActive = current === i
      const size = isActive
        ? tokens.sizing.dotSizeActive
        : tokens.sizing.dotSizeInactive

      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            {
              marginHorizontal: dotMargin,
              marginVertical: dotMargin,
              backgroundColor: isActive
                ? resolvedActiveColor
                : resolvedInactiveColor,
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
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
    // 确保指示器始终覆盖在滑动轨道之上（web 下 transform 会创建 stacking context）
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
  dot: {},
})

export default SwiperPagIndicator
