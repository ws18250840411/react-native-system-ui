import type { CheckboxGroupState } from '@react-stately/checkbox';
import { mergeProps, filterDOMProps } from '@react-aria/utils';
import { getLabel } from '../utils';
import { AriaCheckboxGroupProps } from '@react-types/checkbox';

interface CheckboxGroupAria {
  
  groupProps: any;
  
  labelProps: any;
}


export function useCheckboxGroup(
  props: AriaCheckboxGroupProps,
  _state: CheckboxGroupState
): CheckboxGroupAria {
  let { isDisabled } = props;

  let domProps = filterDOMProps(props, { labelable: true });

  return {
    groupProps: mergeProps(domProps, {
      'aria-disabled': isDisabled,
      'aria-label': getLabel(props),
    }),
    labelProps: {},
  };
}
