import React from 'react'

import type {
  ButtonIconPosition,
  ButtonMode,
  ButtonShadowLevel,
  ButtonSize,
  ButtonType,
} from './types'

export interface ButtonGroupContextValue {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  block?: boolean
  round?: boolean
  square?: boolean
  shadow?: boolean | ButtonShadowLevel
  disabled?: boolean
  iconPosition?: ButtonIconPosition
  hairline?: boolean
  mode?: ButtonMode
}

export const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null
)
