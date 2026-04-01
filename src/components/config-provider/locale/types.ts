export interface Locale {
  [key: string]: any

  name?: string
  tel?: string
  save?: string
  confirm?: string
  cancel?: string
  delete?: string
  loading?: string
  noCoupon?: string
  nameEmpty?: string
  telInvalid?: string

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
    end?: string
    start?: string
    title?: string
    confirm?: string
    startEnd?: string
    weekdays?: string[]
    monthTitle?: (year: number, month: number) => string
    rangePrompt?: (maxRange: number) => string
  }

  vanPicker?: { select?: string }

  vanContactCard?: { addText?: string }

  vanContactList?: { addText?: string }

  vanPagination?: { prev?: string; next?: string }

  vanPullRefresh?: { pulling?: string; loosing?: string; loading?: string }

  vanSubmitBar?: { label?: string }

  vanCoupon?: {
    unlimited?: string
    discount?: (discount: number) => string
    condition?: (condition: number) => string
  }

  vanCouponCell?: {
    title?: string
    count?: (count: number) => string
  }

  vanCouponList?: {
    exchange?: string
    close?: string
    enable?: string
    disabled?: string
    placeholder?: string
  }

  vanAddressEdit?: {
    area?: string
    postal?: string
    areaEmpty?: string
    addressEmpty?: string
    postalEmpty?: string
    defaultAddress?: string
  }

  vanAddressEditDetail?: { label?: string; placeholder?: string }

  vanAddressList?: { add?: string }
}
