import { Radio as RadioBase } from './Radio'
import { RadioGroup } from './RadioGroup'

const Radio = RadioBase as typeof RadioBase & {
  Group: typeof RadioGroup
}

Radio.Group = RadioGroup

export { Radio, RadioGroup }
export type { RadioProps, RadioGroupProps } from './types'
