import type { TextStyle, ViewProps } from 'react-native'
import type { CountDownCurrentTime } from '../../hooks'

import type { DeepPartial } from '../../types'

export type CountDownInstance = {
  start: () => void
  pause: () => void
  reset: () => void
}

export interface CountDownTokens {
  defaults: {
    autoStart: boolean
    millisecond: boolean
    time: number
    format: string
  }
  layout: {
    text: TextStyle
  }
}

export interface CountDownProps extends Omit<ViewProps, 'children'> {
  autoStart?: boolean
  millisecond?: boolean
  time?: number | string
  format?: string
  children?: (current: CountDownCurrentTime) => React.ReactNode
  onChange?: (current: CountDownCurrentTime) => void
  onFinish?: () => void
  tokensOverride?: DeepPartial<CountDownTokens>
}
