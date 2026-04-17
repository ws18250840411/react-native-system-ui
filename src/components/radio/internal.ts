import type { AccessibilityProps } from 'react-native'
import { mergeProps } from '@react-aria/utils'
import type { AriaRadioProps, AriaRadioGroupProps } from '@react-types/radio'
import type { RefObject, ReactNode } from 'react'
import type { RadioGroupState } from '@react-stately/radio'
import { usePress } from '../../internal/aria/interactions'

type RadioAriaProps = AriaRadioProps &
  AccessibilityProps & {
    isRequired?: boolean
    isReadOnly?: boolean
  }

type RadioGroupAriaProps = AriaRadioGroupProps & {
  children?: ReactNode
}

const getLabel = (props: { ['aria-label']?: string; label?: unknown }) => {
  const label = props['aria-label']
  return label || (typeof props.label === 'string' ? props.label : undefined)
}

export const useRadio = (
  props: RadioAriaProps,
  state: RadioGroupState,
  _ref: RefObject<HTMLElement>,
) => {
  const { value, isReadOnly, isDisabled, children } = props
  const label = getLabel(props)
  if (children == null && !label) {
    console.warn(
      'If you do not provide children, you must specify an aria-label for accessibility',
    )
  }
  const preventChanges = Boolean(isDisabled || isReadOnly)
  const checked = state.selectedValue === value
  const { pressProps } = usePress({
    isDisabled: preventChanges,
    onPress: () => state.setSelectedValue(value),
  })
  return {
    inputProps: mergeProps(props, {
      ...pressProps,
      checked,
      disabled: preventChanges,
      value,
      'aria-label': label,
      role: 'radio',
      'aria-disabled': preventChanges,
      'aria-checked': checked,
    }),
  }
}

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
