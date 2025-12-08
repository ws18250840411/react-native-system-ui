export type FormRuleValidateTrigger = string | string[]

export type FormRuleValidator = (
  value: any,
  values: Record<string, any>
) => void | boolean | string | Promise<void | boolean | string>

export interface FormItemRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  len?: number
  min?: number
  max?: number
  whitespace?: boolean
  validator?: FormRuleValidator
  validateTrigger?: FormRuleValidateTrigger
}

export interface RegisteredFieldOptions {
  rules?: FormItemRule[]
  dependencies?: string[]
}
