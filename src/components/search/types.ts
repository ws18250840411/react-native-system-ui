import type React from 'react'
import type {
  NativeSyntheticEvent,
  StyleProp,
  TextInputSubmitEditingEventData,
  ViewStyle,
} from 'react-native'

import type { FieldInputAlign, FieldProps } from '../field/types'

export type SearchShape = 'square' | 'round'

export interface SearchProps
  extends Omit<
    FieldProps,
    | 'style'
    | 'contentStyle'
    | 'label'
    | 'labelStyle'
    | 'labelWidth'
    | 'labelAlign'
    | 'required'
    | 'colon'
    | 'intro'
    | 'tooltip'
    | 'description'
    | 'border'
    | 'size'
    | 'center'
    | 'controlAlign'
    | 'clickable'
    | 'isLink'
    | 'arrowDirection'
    | 'prefix'
    | 'suffix'
    | 'button'
    | 'extra'
    | 'rows'
    | 'autosize'
    | 'autoSize'
    | 'showWordLimit'
    | 'type'
  > {
  /** 搜索框左侧文本 */
  label?: React.ReactNode
  /** 自定义容器样式 */
  style?: StyleProp<ViewStyle>
  /** 自定义内部 Field 容器样式 */
  fieldStyle?: FieldProps['style']
  /** 自定义内部 Field 内容区样式 */
  fieldContentStyle?: FieldProps['contentStyle']
  /** 取消按钮文字 */
  actionText?: React.ReactNode
  /** 自定义右侧操作区域 */
  action?: React.ReactNode
  /** 是否展示默认取消按钮 */
  showAction?: boolean
  /** 搜索框形状 */
  shape?: SearchShape
  /** 外层背景色 */
  background?: string
  /** 搜索框内容对齐方式 */
  align?: FieldInputAlign
  /** 输入内容变化时触发（推荐） */
  onChange?: (value: string) => void
  /** 点击键盘搜索时回调 */
  onSearch?: (value: string) => void
  /** 点击取消时回调 */
  onCancel?: () => void
  /** 提交事件（键盘回车） */
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void
}

export interface SearchRef {
  focus: () => void
  blur: () => void
  clear: () => void
}
