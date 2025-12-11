import type React from 'react'
import type {
  ViewProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'

export type PasswordInputType = 'text' | 'number'

export interface PasswordInputProps extends ViewProps {
  /** 受控值 */
  value?: string
  /** 默认值（非受控） */
  defaultValue?: string
  /** 输入框长度 */
  length?: number
  /** 是否使用掩码显示 */
  mask?: boolean
  /** 单元格之间的间距 */
  gutter?: number
  /** 输入类型，决定键盘与过滤规则 */
  type?: PasswordInputType
  /** 是否自动聚焦 */
  autoFocus?: boolean
  /** 禁用状态 */
  disabled?: boolean
  /** 自定义信息提示 */
  info?: React.ReactNode
  /** 错误提示，优先级高于 info */
  errorInfo?: React.ReactNode
  /** 是否展示输入光标 */
  showCursor?: boolean
  /** 输入值校验函数，返回 true 才会更新值 */
  validator?: (value: string) => boolean
  /** 单元格基础样式 */
  cellStyle?: StyleProp<ViewStyle>
  /** 单元格文字样式 */
  cellTextStyle?: StyleProp<TextStyle>
  /** 单元格填充后的样式（覆盖 cellStyle） */
  cellFilledStyle?: StyleProp<ViewStyle>
  /** 自定义掩码样式 */
  maskStyle?: StyleProp<ViewStyle>
  /** 光标样式 */
  cursorStyle?: StyleProp<ViewStyle>
  /** 明文模式下字符高亮样式 */
  highlightTextStyle?: StyleProp<TextStyle>
  /** 输入变化回调 */
  onChange?: (value: string) => void
  /** 输入完成（长度满足时调用） */
  onSubmit?: (value: string) => void
  /** 聚焦/失焦回调 */
  onFocus?: () => void
  onBlur?: () => void
}

export interface PasswordInputRef {
  focus: () => void
  blur: () => void
  clear: () => void
}
