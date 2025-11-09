import React from 'react'

import type {
  ButtonIconPosition,
  ButtonShadowLevel,
  ButtonSize,
  ButtonType,
} from './tokens'

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
}

export const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null
)
