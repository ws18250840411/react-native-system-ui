export const enUS = {
  name: 'Name',
  tel: 'Phone',
  save: 'Save',
  confirm: 'Confirm',
  cancel: 'Cancel',
  delete: 'Delete',
  loading: 'Loading...',
  noCoupon: 'No coupons',
  nameEmpty: 'Please enter a name',
  telInvalid: 'Please enter a valid phone number',
  vanCalendar: {
      end: 'End',
      start: 'Start',
      title: 'Select Date',
      confirm: 'Confirm',
      startEnd: 'Start/End',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthTitle: (year: number, month: number) => `${year}/${month}`,
      rangePrompt: (maxRange: number) => `Select up to ${maxRange} days`,
  },
  vanPicker: {
      select: 'Please select',
  },
  vanContactCard: {
      addText: 'Add contact',
  },
  vanContactList: {
      addText: 'New contact',
  },
  vanPagination: {
      prev: 'Previous',
      next: 'Next',
  },
  vanPullRefresh: {
      pulling: 'Pull to refresh...',
      loosing: 'Release to refresh...',
      loading: 'Loading...',
  },
  vanSubmitBar: {
      label: 'Total:',
  },
  vanCoupon: {
      unlimited: 'No minimum spend',
      discount: (discount: number) => `${discount}% off`,
      condition: (condition: number) => `Valid on orders over ${condition}`,
  },
  vanCouponCell: {
      title: 'Coupon',
      count: (count: number) => `${count} available`,
  },
  vanCouponList: {
      exchange: 'Redeem',
      close: 'Do not use coupons',
      enable: 'Available',
      disabled: 'Unavailable',
      placeholder: 'Enter coupon code',
  },
  vanAddressEdit: {
      area: 'Area',
      postal: 'Postal code',
      areaEmpty: 'Please select an area',
      addressEmpty: 'Please enter the address',
      postalEmpty: 'Invalid postal code',
      defaultAddress: 'Set as default address',
  },
  vanAddressEditDetail: {
      label: 'Address',
      placeholder: 'Street, building, etc.',
  },
  vanAddressList: {
      add: 'Add address',
  },
  vanForm: {
    validationFailed: 'Validation failed',
  },
  vanPopup: {
    closeOverlay: 'Close overlay',
    closeHint: 'Double-tap to close',
  },
  vanToast: {
    closeHint: 'Double-tap to dismiss',
  },
  vanShareSheet: {
    cancel: 'Cancel',
  },
  vanNumberKeyboard: {
    close: 'Done',
  },
  vanNoticeBar: {
    close: 'Close',
  },
  vanNavBar: {
    back: 'Back',
    action: 'Actions',
  },
  vanImage: {
    loading: 'Loading...',
    error: 'Failed to load',
  },
  vanCascader: {
    placeholder: 'Select',
    loading: 'Loading...',
    close: 'Close',
  },
}
