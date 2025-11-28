import React from 'react'

import InternalForm from './Form'
import { FormItem } from './FormItem'
import type { FormInstance, FormProps } from './Form'

type FormComponent = React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<FormInstance>
> & {
  Item: typeof FormItem
  useForm: () => React.MutableRefObject<FormInstance | null>
}

const Form = InternalForm as FormComponent
Form.Item = FormItem
Form.useForm = () => React.useRef<FormInstance | null>(null)

export default Form
export { Form, FormItem }
export type { FormProps, FormInstance } from './Form'
export type { FormItemRule } from './FormItem'
