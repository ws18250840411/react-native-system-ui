import type { RefObject } from 'react';
import type { ToggleState } from '@react-stately/toggle';
import { mergeProps } from '@react-aria/utils';
import type { AccessibilityProps } from 'react-native';
import { useToggle } from '../toggle';
import { AriaCheckboxProps } from '@react-types/checkbox';

export interface CheckboxAria extends AccessibilityProps {
  
  inputProps: any;
}


export function useCheckbox(
  props: AriaCheckboxProps,
  state: ToggleState,
  inputRef: RefObject<HTMLInputElement>
): CheckboxAria {
  let { inputProps } = useToggle(props, state, inputRef);
  let { isSelected } = state;

  let { isIndeterminate } = props;

  return {
    inputProps: mergeProps(inputProps, {
      'checked': isSelected,
      'role': 'checkbox',
      'aria-checked': isIndeterminate ? 'mixed' : isSelected,
      'aria-disabled': props.isDisabled,
    }),
  };
}
