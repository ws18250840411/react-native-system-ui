

import type { AriaCheckboxGroupItemProps } from '@react-types/checkbox';
import { CheckboxAria, useCheckbox } from './useCheckbox';
import type { CheckboxGroupState } from '@react-stately/checkbox';
import type { RefObject } from 'react';
import { useToggleState } from '@react-stately/toggle';


export function useCheckboxGroupItem(
  props: AriaCheckboxGroupItemProps,
  state: CheckboxGroupState,
  inputRef: RefObject<any>
): CheckboxAria {
  const toggleState = useToggleState({
    isReadOnly: props.isReadOnly || state.isReadOnly,
    //@ts-ignore
    isSelected: state.isSelected(props.value),
    onChange(isSelected) {
      if (isSelected) {
        //@ts-ignore
        state.addValue(props.value);
      } else {
        //@ts-ignore
        state.removeValue(props.value);
      }

      if (props.onChange) {
        props.onChange(isSelected);
      }
    },
  });

  let { inputProps } = useCheckbox(
    {
      ...props,
      isReadOnly: props.isReadOnly || state.isReadOnly,
      isDisabled: props.isDisabled || state.isDisabled,
    },
    toggleState,
    inputRef
  );

  return { inputProps };
}
