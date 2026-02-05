import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface DatetimePickerTokens { }

const createDatetimePickerTokens = (_foundations: Foundations): DatetimePickerTokens => {
  return {}
}

export const useDatetimePickerTokens = createComponentTokensHook(
  'datetimePicker',
  createDatetimePickerTokens
)
