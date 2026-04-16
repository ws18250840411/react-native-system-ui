import type { ReactNode } from 'react';
import type { AriaRadioGroupProps } from '@react-types/radio';
import type { RadioGroupState } from '@react-stately/radio';
import { getLabel } from '../utils';

export interface RNAriaRadioGroupProps extends AriaRadioGroupProps {
  children?: ReactNode;
}

export interface RadioGroupAria {
  
  radioGroupProps: any;
  
  labelProps: any;
}


export function useRadioGroup(
  props: RNAriaRadioGroupProps,
  _state: RadioGroupState
): RadioGroupAria {
  let { isDisabled } = props;

  return {
    radioGroupProps: {
      'aria-label': getLabel(props),
      'role': 'radiogroup',
      'aria-disabled': isDisabled,
    },
    labelProps: {},
  };
}
