import type { RadioGroupState } from '@react-stately/radio'
import { getLabel, type RadioGroupAriaProps } from './shared'
export { useRadio } from './shared'

export const useRadioGroup = (
  props: RadioGroupAriaProps,
  _state: RadioGroupState,
) => {
  const { isDisabled } = props
  return {
    radioGroupProps: {
      'aria-label': getLabel(props),
      role: 'radiogroup',
      'aria-disabled': isDisabled,
    },
    labelProps: {},
  }
}
