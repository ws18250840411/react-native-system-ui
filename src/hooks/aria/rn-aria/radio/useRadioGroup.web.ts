import { useRadioGroup as useRadioGroupWeb } from '@react-aria/radio';
import { RadioGroupState } from '@react-stately/radio';
import { mergeProps } from '@react-aria/utils';
import { AriaRadioGroupProps } from '@react-types/radio';
import { mapDomPropsToRN } from '../utils';

interface RadioGroupAria {
  
  radioGroupProps: any;
  
  labelProps: any;
}


export function useRadioGroup(
  props: AriaRadioGroupProps,
  state: RadioGroupState
): RadioGroupAria {
  const params = useRadioGroupWeb(props, state);

  const newParams = {
    radioGroupProps: mergeProps(
      params.radioGroupProps,
      mapDomPropsToRN(params.radioGroupProps)
    ),
    labelProps: mergeProps(
      params.labelProps,
      mapDomPropsToRN(params.labelProps)
    ),
  };

  return newParams;
}
