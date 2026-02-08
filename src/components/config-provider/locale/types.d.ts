export interface Locale {
  [key: string]: any

  /** Common */
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

  /** Form */
  vanForm?: { validationFailed?: string }

  /** Popup */
  vanPopup?: { closeOverlay?: string; closeHint?: string }

  /** Toast */
  vanToast?: { closeHint?: string }

  /** ShareSheet */
  vanShareSheet?: { cancel?: string }

  /** NumberKeyboard */
  vanNumberKeyboard?: { close?: string }

  /** NoticeBar */
  vanNoticeBar?: { close?: string }

  /** NavBar */
  vanNavBar?: { back?: string; action?: string }

  /** Image */
  vanImage?: { loading?: string; error?: string }

  /** Cascader */
  vanCascader?: { placeholder?: string; loading?: string; close?: string }

  /** Calendar */
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

  /** Picker */
  vanPicker?: { select?: string }

  /** ContactCard */
  vanContactCard?: { addText?: string }

  /** ContactList */
  vanContactList?: { addText?: string }

  /** Pagination */
  vanPagination?: { prev?: string; next?: string }

  /** PullRefresh */
  vanPullRefresh?: { pulling?: string; loosing?: string; loading?: string }

  /** SubmitBar */
  vanSubmitBar?: { label?: string }

  /** Coupon */
  vanCoupon?: {
    unlimited?: string
    discount?: (discount: number) => string
    condition?: (condition: number) => string
  }

  /** CouponCell */
  vanCouponCell?: {
    title?: string
    count?: (count: number) => string
  }

  /** CouponList */
  vanCouponList?: {
    exchange?: string
    close?: string
    enable?: string
    disabled?: string
    placeholder?: string
  }

  /** AddressEdit */
  vanAddressEdit?: {
    area?: string
    postal?: string
    areaEmpty?: string
    addressEmpty?: string
    postalEmpty?: string
    defaultAddress?: string
  }

  /** AddressEditDetail */
  vanAddressEditDetail?: { label?: string; placeholder?: string }

  /** AddressList */
  vanAddressList?: { add?: string }
}
