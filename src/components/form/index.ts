import { useRef } from 'react'

import InternalForm, { FormSubscribe, useWatch } from './Form'
import { FormItem } from './FormItem'
import { FormList } from './FormList'
import type { FormInstance } from './types'

const Form = Object.assign(InternalForm, {
  Item: FormItem,
  List: FormList,
  useForm: () => useRef<FormInstance | null>(null),
  Subscribe: FormSubscribe,
  useWatch,
})

export default Form
export { Form, FormItem, FormList, FormSubscribe, useWatch }
export type { FormProps, FormInstance, FormSubscribeProps } from './types'
export type { FormItemRule } from './FormItem'
export type { FormListProps, FormListField, FormListOperation } from './FormList'
export type { NamePath } from './types'
