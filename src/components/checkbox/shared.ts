import type { AccessibilityProps } from 'react-native'
import { mergeProps } from '@react-aria/utils'
import type { AriaCheckboxGroupItemProps, AriaCheckboxProps } from '@react-types/checkbox'
import type { CheckboxGroupState } from '@react-stately/checkbox'
import { useToggleState, type ToggleState } from '@react-stately/toggle'
import type { RefObject } from 'react'
import { usePress } from '../../internal/aria/interactions'

export const useCheckbox = (
  props: AriaCheckboxProps,
  state: ToggleState,
  inputRef: RefObject<HTMLInputElement>,
) => {
  const { isSelected } = state
  const { isIndeterminate } = props
  const { pressProps } = usePress({
    isDisabled: props.isDisabled || props.isReadOnly,
    onPress: () => state.setSelected(!state.isSelected),
  })
  return {
    inputProps: mergeProps(props, {
      ...pressProps,
      checked: isSelected,
      role: 'checkbox',
      'aria-checked': isIndeterminate ? 'mixed' : isSelected,
      'aria-disabled': props.isDisabled,
    }),
  } as AccessibilityProps & { inputProps: any }
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
