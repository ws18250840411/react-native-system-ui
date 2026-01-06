import type { StepperTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    stepper: StepperTokens
  }
}
