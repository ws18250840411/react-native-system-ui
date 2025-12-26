import React from 'react'

import InternalForm, { FormSubscribe, useWatch } from './Form'
import { FormItem } from './FormItem'
import { FormList } from './FormList'
import type { FormInstance, FormProps } from './Form'

type FormComponent = React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<FormInstance>
> & {
  Item: typeof FormItem
  List: typeof FormList
  useForm: () => React.MutableRefObject<FormInstance | null>
  Subscribe: typeof FormSubscribe
  useWatch: typeof useWatch
}

const Form = InternalForm as FormComponent
Form.Item = FormItem
Form.List = FormList
Form.useForm = () => React.useRef<FormInstance | null>(null)
Form.Subscribe = FormSubscribe
Form.useWatch = useWatch

export default Form
export { Form, FormItem, FormList, FormSubscribe, useWatch }
export type { FormProps, FormInstance, FormSubscribeProps } from './Form'
export type { FormItemRule } from './FormItem'
export type { FormListProps, FormListField, FormListOperation } from './FormList'
export type { NamePath } from './types'
