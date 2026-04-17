

import { AriaToggleProps } from "@react-types/checkbox";
import { filterDOMProps, mergeProps } from "@react-aria/utils";
import { InputHTMLAttributes, RefObject } from "react";
import { ToggleState } from "@react-stately/toggle";
import { useFocusable } from "@react-aria/focus";
import { usePress } from "../interactions";

export interface ToggleAria {
  
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}


export function useToggle(
  props: AriaToggleProps,
  state: ToggleState,
  ref: RefObject<HTMLElement>
): ToggleAria {
  let {
    isDisabled = false,
    isRequired,
    isReadOnly,
    value,
    name,
    children,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    validationState = "valid",
  } = props;

  let onChange = (e: any) => {
    e.stopPropagation();
    state.setSelected(e.target.checked);
  };

  let hasChildren = children != null;
  let hasAriaLabel = ariaLabel != null || ariaLabelledby != null;
  if (!hasChildren && !hasAriaLabel) {
    console.warn(
      "If you do not provide children, you must specify an aria-label for accessibility"
    );
  }
  let { pressProps } = usePress({
    isDisabled,
  });

  let { focusableProps } = useFocusable(props, ref);
  let interactions = mergeProps(pressProps, focusableProps);
  let domProps = filterDOMProps(props, { labelable: true });

  return {
    inputProps: mergeProps(domProps, {
      "aria-invalid": validationState === "invalid" || undefined,
      "aria-errormessage": props["aria-errormessage"],
      "aria-controls": props["aria-controls"],
      "aria-readonly": isReadOnly || undefined,
      onChange,
      disabled: isDisabled,
      required: isRequired,
      value,
      name,
      type: "checkbox",
      ...interactions,
    }),
  };
}
