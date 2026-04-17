import { useCheckboxGroup as useCheckboxGroupWeb } from '@react-aria/checkbox'
import type { AriaCheckboxGroupProps } from '@react-types/checkbox'
import type { CheckboxGroupState } from '@react-stately/checkbox'

export { useCheckbox, useCheckboxGroupItem } from './internal'

const mapDomPropsToRN = (props: Record<string, unknown>) => {
  const next: Record<string, unknown> = { ...props }
  for (const key in props) {
    if (!key.startsWith('data-')) continue
    if (!next.dataSet || typeof next.dataSet !== 'object') {
      next.dataSet = {}
    }
    ;(next.dataSet as Record<string, unknown>)[key.slice(5)] = props[key]
  }
  return next
}

export const useCheckboxGroup = (
  props: AriaCheckboxGroupProps,
  state: CheckboxGroupState,
) => {
  const params = useCheckboxGroupWeb(props, state)
  return {
    labelProps: {
      ...params.labelProps,
      ...mapDomPropsToRN(params.labelProps as Record<string, unknown>),
    },
    groupProps: {
      ...params.groupProps,
      ...mapDomPropsToRN(params.groupProps as Record<string, unknown>),
    },
  }
}
