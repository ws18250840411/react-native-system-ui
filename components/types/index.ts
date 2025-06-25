
import { ReactNode, CSSProperties } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

// 基础组件接口
export interface BaseComponent {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

// 主题类型
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    light: string;
    dark: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    disabled: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

// 组件尺寸
export type ComponentSize = 'small' | 'medium' | 'large';

// 组件变体
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

// 按钮类型
export interface ButtonProps extends BaseComponent {
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  onPress?: () => void;
  title?: string;
}

// 输入框类型
export interface InputProps extends BaseComponent {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// 图标类型
export interface IconProps extends BaseComponent {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

// 卡片类型
export interface CardProps extends BaseComponent {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

// 标签类型
export interface TagProps extends BaseComponent {
  variant?: ComponentVariant;
  size?: ComponentSize;
  closable?: boolean;
  onClose?: () => void;
}

// 头像类型
export interface AvatarProps extends BaseComponent {
  size?: ComponentSize | number;
  source?: { uri: string } | number;
  name?: string;
  onPress?: () => void;
}

// 徽章类型
export interface BadgeProps extends BaseComponent {
  count?: number;
  dot?: boolean;
  max?: number;
  showZero?: boolean;
}

// 分割线类型
export interface DividerProps extends BaseComponent {
  orientation?: 'horizontal' | 'vertical';
  dashed?: boolean;
}

// 空状态类型
export interface EmptyProps extends BaseComponent {
  image?: ReactNode;
  description?: string;
  action?: ReactNode;
}

// 加载类型
export interface LoadingProps extends BaseComponent {
  size?: ComponentSize;
  color?: string;
  text?: string;
  vertical?: boolean;
}

// 进度条类型
export interface ProgressProps extends BaseComponent {
  percent: number;
  showInfo?: boolean;
  status?: 'normal' | 'success' | 'error';
  strokeWidth?: number;
}

// 开关类型
export interface SwitchProps extends BaseComponent {
  value?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  activeColor?: string;
  inactiveColor?: string;
  onChange?: (value: boolean) => void;
}

// 复选框类型
export interface CheckboxProps extends BaseComponent {
  checked?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

// 单选框类型
export interface RadioProps extends BaseComponent {
  checked?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  onChange?: (value: any) => void;
  label?: string;
  value?: any;
}

// 评分类型
export interface RateProps extends BaseComponent {
  value?: number;
  count?: number;
  allowHalf?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

// 滑块类型
export interface SliderProps extends BaseComponent {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

// 步骤条类型
export interface StepsProps extends BaseComponent {
  current?: number;
  direction?: 'horizontal' | 'vertical';
  size?: ComponentSize;
}

export interface StepProps extends BaseComponent {
  title?: string;
  description?: string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  icon?: ReactNode;
}

// 标签页类型
export interface TabsProps extends BaseComponent {
  activeKey?: string;
  onChange?: (key: string) => void;
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TabPaneProps extends BaseComponent {
  key: string;
  tab: ReactNode;
  disabled?: boolean;
}

// 折叠面板类型
export interface CollapseProps extends BaseComponent {
  activeKey?: string | string[];
  accordion?: boolean;
  onChange?: (key: string | string[]) => void;
}

export interface CollapsePanelProps extends BaseComponent {
  key: string;
  header: ReactNode;
  disabled?: boolean;
}

// 抽屉类型
export interface DrawerProps extends BaseComponent {
  visible?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  width?: number | string;
  height?: number | string;
  title?: string;
  closable?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
}

// 模态框类型
export interface ModalProps extends BaseComponent {
  visible?: boolean;
  title?: string;
  closable?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  onOk?: () => void;
  onCancel?: () => void;
  footer?: ReactNode;
}

// 弹出框类型
export interface PopoverProps extends BaseComponent {
  content?: ReactNode;
  title?: string;
  trigger?: 'click' | 'hover';
  placement?: 'top' | 'left' | 'right' | 'bottom';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

// 工具提示类型
export interface TooltipProps extends BaseComponent {
  title?: string;
  placement?: 'top' | 'left' | 'right' | 'bottom';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

// 消息提示类型
export interface MessageConfig {
  content: string;
  duration?: number;
  type?: 'info' | 'success' | 'error' | 'warning' | 'loading';
  onClose?: () => void;
}

// 通知类型
export interface NotificationConfig {
  title: string;
  description?: string;
  duration?: number;
  type?: 'info' | 'success' | 'error' | 'warning';
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  onClose?: () => void;
}