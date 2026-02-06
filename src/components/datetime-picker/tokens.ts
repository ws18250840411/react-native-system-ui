import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface DatetimePickerTokens {
  defaults: {
    yearRangeOffset: number
    dateInteractionMode: 'freeze' | 'sync'
    timeInteractionMode: 'freeze' | 'sync'
    minHour: number
    maxHour: number
    minMinute: number
    maxMinute: number
    popupPlacement: 'bottom' | 'top' | 'left' | 'right'
    popupRound: boolean
    popupSafeAreaInsetBottom: boolean
  }
}

const createDatetimePickerTokens = (_foundations: Foundations): DatetimePickerTokens => ({
  defaults: {
    yearRangeOffset: 10,
    dateInteractionMode: 'freeze',
    timeInteractionMode: 'freeze',
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    popupPlacement: 'bottom',
    popupRound: true,
    popupSafeAreaInsetBottom: true,
  },
})

export const useDatetimePickerTokens = createComponentTokensHook(
  'datetimePicker',
  createDatetimePickerTokens,
)
