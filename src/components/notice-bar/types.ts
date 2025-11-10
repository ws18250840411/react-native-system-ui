import type { TextProps, ViewProps } from 'react-native'

export type NoticeBarMode = 'closeable' | 'link'

export interface NoticeBarProps extends ViewProps {
  text?: React.ReactNode
  children?: React.ReactNode
  color?: string
  background?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  mode?: NoticeBarMode
  delay?: number
  speed?: number
  scrollable?: boolean
  wrapable?: boolean
  onClose?: () => void
  onReplay?: () => void
  textProps?: TextProps
}
