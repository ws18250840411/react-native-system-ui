import type { TextProps, ViewProps } from 'react-native'

import type { DeepPartial } from '../../types'
import type { NoticeBarTokens } from './tokens'

export type NoticeBarMode = 'closeable' | 'link'

export interface NoticeBarProps extends ViewProps {
  text?: React.ReactNode
  children?: React.ReactNode
  color?: string
  background?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  mode?: NoticeBarMode
  tokensOverride?: DeepPartial<NoticeBarTokens>
  delay?: number
  speed?: number
  scrollable?: boolean
  wrapable?: boolean
  direction?: 'horizontal' | 'vertical'
  items?: React.ReactNode[]
  verticalInterval?: number
  verticalDuration?: number
  onPress?: () => void
  onClose?: () => void
  onReplay?: () => void
  textProps?: TextProps
}
