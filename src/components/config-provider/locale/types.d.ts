export interface Locale {
  [key: string]: any
  vanForm?: { validationFailed?: string }
  vanPopup?: { closeOverlay?: string; closeHint?: string }
  vanToast?: { closeHint?: string }
  vanShareSheet?: { cancel?: string }
  vanNumberKeyboard?: { close?: string }
  vanNoticeBar?: { close?: string }
  vanNavBar?: { back?: string; action?: string }
  vanImage?: { loading?: string; error?: string }
  vanCascader?: { placeholder?: string; loading?: string; close?: string }
  vanCalendar?: {
    title?: string
    confirm?: string
    weekdays?: string[]
    monthTitle?: (year: number, month: number) => string
  }
}
