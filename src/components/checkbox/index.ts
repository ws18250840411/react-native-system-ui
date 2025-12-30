import { Checkbox as CheckboxBase } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

const Checkbox = CheckboxBase as typeof CheckboxBase & {
  Group: typeof CheckboxGroup
}

Checkbox.Group = CheckboxGroup

export { Checkbox, CheckboxGroup }
export type { CheckboxProps, CheckboxGroupProps, CheckboxValue } from './types'
