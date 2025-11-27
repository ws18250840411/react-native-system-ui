import React, { memo } from 'react'
import type { SvgProps } from 'react-native-svg'

const DEFAULT_COLOR = '#111827'

export interface IconRenderConfig {
  size: number
  color: string | string[]
  colors: string[]
  primaryColor: string
  strokeWidth?: number
}

export type IconRender = (
  config: IconRenderConfig,
  svgProps: SvgProps,
) => React.ReactElement

export interface IconProps extends SvgProps {
  size?: number
  color?: string | string[]
  strokeWidth?: number
}

const ensureColors = (value?: string | string[]): string[] => {
  if (Array.isArray(value)) {
    return value.length ? value : [DEFAULT_COLOR]
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    return [value]
  }

  return [DEFAULT_COLOR]
}

export const createIcon = (render: IconRender) => {
  const IconComponent: React.FC<IconProps> = ({
    size = 24,
    color,
    strokeWidth,
    ...svgProps
  }) => {
    const colors = ensureColors(color)
    const primaryColor = colors[0] ?? DEFAULT_COLOR

    return render(
      {
        size,
        color: color ?? primaryColor,
        colors,
        primaryColor,
        strokeWidth,
      },
      svgProps,
    )
  }

  IconComponent.displayName = 'VectorIcon'

  return memo(IconComponent)
}

export type VectorIconComponent = ReturnType<typeof createIcon>
