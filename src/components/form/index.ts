import React from 'react'

import InternalForm, { FormSubscribe, useWatch } from './Form'
import { FormItem } from './FormItem'
import type { FormInstance, FormProps } from './Form'

type FormComponent = React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<FormInstance>
> & {
  Item: typeof FormItem
  useForm: () => React.MutableRefObject<FormInstance | null>
  Subscribe: typeof FormSubscribe
  useWatch: typeof useWatch
}

const Form = InternalForm as FormComponent
Form.Item = FormItem
Form.useForm = () => React.useRef<FormInstance | null>(null)
Form.Subscribe = FormSubscribe
Form.useWatch = useWatch

export default Form
export { Form, FormItem }
export type { FormProps, FormInstance, FormSubscribeProps } from './Form'
export type { FormItemRule } from './FormItem'
