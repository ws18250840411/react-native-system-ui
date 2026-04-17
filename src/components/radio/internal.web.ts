import { mergeProps } from '@react-aria/utils'
import { useRadioGroup as useRadioGroupWeb } from '@react-aria/radio'
import type { AriaRadioGroupProps } from '@react-types/radio'
import type { RadioGroupState } from '@react-stately/radio'

export { useRadio } from './internal'

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

export const useRadioGroup = (
  props: AriaRadioGroupProps,
  state: RadioGroupState,
) => {
  const params = useRadioGroupWeb(props, state)
  return {
    radioGroupProps: mergeProps(
      params.radioGroupProps,
      mapDomPropsToRN(params.radioGroupProps as Record<string, unknown>),
    ),
    labelProps: mergeProps(
      params.labelProps,
      mapDomPropsToRN(params.labelProps as Record<string, unknown>),
    ),
  }
}
