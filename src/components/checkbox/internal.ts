import { filterDOMProps, mergeProps } from '@react-aria/utils'
import type { AriaCheckboxGroupProps } from '@react-types/checkbox'
import type { CheckboxGroupState } from '@react-stately/checkbox'
export { useCheckbox, useCheckboxGroupItem } from './shared'

const getLabel = (props: { ['aria-label']?: string; label?: unknown }) => {
  const label = props['aria-label']
  return label || (typeof props.label === 'string' ? props.label : undefined)
}

export const useCheckboxGroup = (
  props: AriaCheckboxGroupProps,
  _state: CheckboxGroupState,
) => {
  const { isDisabled } = props
  const domProps = filterDOMProps(props, { labelable: true })
  return {
    groupProps: mergeProps(domProps, {
      'aria-disabled': isDisabled,
      'aria-label': getLabel(props),
    }),
    labelProps: {},
  }
}
