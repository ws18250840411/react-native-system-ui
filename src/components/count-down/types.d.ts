import type { ViewProps } from 'react-native'
import type { CountDownCurrentTime } from '../../hooks'

import type { DeepPartial } from '../../types'
import type { CountDownTokens } from './tokens'

export type CountDownInstance = {
  start: () => void
  pause: () => void
  reset: () => void
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
