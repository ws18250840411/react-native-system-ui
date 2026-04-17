import type { AccessibilityProps } from 'react-native'
import { filterDOMProps, mergeProps } from '@react-aria/utils'
import type { AriaCheckboxGroupItemProps, AriaCheckboxGroupProps, AriaCheckboxProps } from '@react-types/checkbox'
import type { CheckboxGroupState } from '@react-stately/checkbox'
import { useToggleState, type ToggleState } from '@react-stately/toggle'
import type { RefObject } from 'react'
import { useToggle } from '../../internal/aria/toggle'

const getLabel = (props: { ['aria-label']?: string; label?: unknown }) => {
  const label = props['aria-label']
  return label || (typeof props.label === 'string' ? props.label : undefined)
}

export const useCheckbox = (
  props: AriaCheckboxProps,
  state: ToggleState,
  inputRef: RefObject<HTMLInputElement>,
) => {
  const { inputProps } = useToggle(props, state, inputRef)
  const { isSelected } = state
  const { isIndeterminate } = props
  return {
    inputProps: mergeProps(inputProps, {
      checked: isSelected,
      role: 'checkbox',
      'aria-checked': isIndeterminate ? 'mixed' : isSelected,
      'aria-disabled': props.isDisabled,
    }),
  } as AccessibilityProps & { inputProps: any }
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

export const useCheckboxGroupItem = (
  props: AriaCheckboxGroupItemProps,
  state: CheckboxGroupState,
  inputRef: RefObject<any>,
) => {
  const toggleState = useToggleState({
    isReadOnly: props.isReadOnly || state.isReadOnly,
    // @ts-ignore react-stately checkbox group runtime supports this
    isSelected: state.isSelected(props.value),
    onChange(isSelected) {
      if (isSelected) {
        // @ts-ignore react-stately checkbox group runtime supports this
        state.addValue(props.value)
      } else {
        // @ts-ignore react-stately checkbox group runtime supports this
        state.removeValue(props.value)
      }
      props.onChange?.(isSelected)
    },
  })
  const { inputProps } = useCheckbox(
    {
      ...props,
      isReadOnly: props.isReadOnly || state.isReadOnly,
      isDisabled: props.isDisabled || state.isDisabled,
    },
    toggleState,
    inputRef,
  )
  return { inputProps }
}
