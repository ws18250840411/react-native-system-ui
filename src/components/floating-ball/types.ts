import type { ViewProps } from 'react-native'

export interface FloatingBallPosition {
  x: number
  y: number
}

export interface FloatingBallProps extends ViewProps {
  defaultPosition?: FloatingBallPosition
  position?: FloatingBallPosition
  magnetic?: boolean
  draggable?: boolean
  disabled?: boolean
  size?: number
  padding?: number
  onChange?: (position: FloatingBallPosition) => void
  onPress?: () => void
  children?: React.ReactNode
}
