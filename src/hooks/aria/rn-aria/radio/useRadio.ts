import type { AriaRadioProps } from '@react-types/radio';
import { mergeProps } from '@react-aria/utils';
import type { RefObject } from 'react';
import type { RadioGroupState } from '@react-stately/radio';
import { usePress } from '../interactions';
import type { AccessibilityProps } from 'react-native';
import { getLabel } from '../utils';

export interface RadioAriaProps extends AriaRadioProps, AccessibilityProps {
  
  isRequired?: boolean;
  
  isReadOnly?: boolean;
}

export interface RadioAria extends AccessibilityProps {
  
  inputProps: any;
}


export function useRadio(
  props: RadioAriaProps,
  state: RadioGroupState,
  _ref: RefObject<HTMLElement>
): RadioAria {
  let { value, isReadOnly, isDisabled, children } = props;

  let hasChildren = children != null;
  const label = getLabel(props);

  if (!hasChildren && !label) {
    console.warn(
      'If you do not provide children, you must specify an aria-label for accessibility'
    );
  }

  let preventChanges = isDisabled || isReadOnly;
  preventChanges = preventChanges ?? false;

  let checked = state.selectedValue === value;

  let onPress = () => {
    state.setSelectedValue(value);
  };

  let { pressProps } = usePress({
    isDisabled: preventChanges,
    onPress,
  });

  return {
    inputProps: mergeProps(props, {
      ...pressProps,
      checked,
      'disabled': preventChanges,
      value,
      'aria-label': label,
      'role': 'radio',
      'aria-disabled': preventChanges,
      'aria-checked': checked,
    }),
  };
}
