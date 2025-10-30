import { attachPropertiesToComponent } from '../../foundation/helpers'

import DatePickerView from './date-picker-view'
import { formatDate } from './helper'
import useDateMinMax from './useDateMinMax'
import useDatePicker from './useDatePicker'

export default attachPropertiesToComponent(DatePickerView, {
  formatDate,
  useDateMinMax,
  useDatePicker,
})
