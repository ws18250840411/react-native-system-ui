import { useCheckboxGroup as useCheckboxGroupWeb } from '@react-aria/checkbox';
import { AriaCheckboxGroupProps } from '@react-types/checkbox';
import { CheckboxGroupState } from '@react-stately/checkbox';
import { mapDomPropsToRN } from '../utils';

interface CheckboxGroupAria {
  
  groupProps: any;
  
  labelProps: any;
}


export function useCheckboxGroup(
  props: AriaCheckboxGroupProps,
  state: CheckboxGroupState
): CheckboxGroupAria {
  const params = useCheckboxGroupWeb(props, state);
  return {
    labelProps: {
      ...params.labelProps,
      ...mapDomPropsToRN(params.labelProps),
    },
    groupProps: {
      ...params.groupProps,
      ...mapDomPropsToRN(params.groupProps),
    },
  };
}
