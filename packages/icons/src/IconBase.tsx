import React from 'react'
import Svg, { Path } from 'react-native-svg'

export type IconProps = {
  size?: number
  color?: string | string[]
  strokeWidth?: number
} & Omit<React.ComponentProps<typeof Svg>, 'color'>

type IconDefinition = {
  viewBox: string
  paths: Array<{ d: string; fill?: boolean; stroke?: boolean }>
}

export type IconComponent = React.FC<IconProps>

export const createIcon = (definition: IconDefinition, displayName: string): IconComponent => {
  const Icon: IconComponent = ({ size = 24, color = '#111827', strokeWidth = 2, ...rest }) => {
    const colors = Array.isArray(color) ? color : [color]
    return (
      <Svg width={size} height={size} viewBox={definition.viewBox} fill="none" stroke="none" {...rest}>
        {definition.paths.map((path, index) => (
          <Path
            key={index}
            d={path.d}
            fill={path.fill ? colors[index] ?? colors[0] : 'none'}
            stroke={path.stroke ? colors[index] ?? colors[0] : 'none'}
            strokeWidth={path.stroke ? strokeWidth : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    )
  }

  Icon.displayName = displayName

  return React.memo(Icon)
}
