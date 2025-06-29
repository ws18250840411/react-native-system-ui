
import { ReactNode } from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';

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
    backgroundSecondary: string;
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
  type?: ComponentVariant;
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
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// 图标类型
export interface IconProps extends BaseComponent {
  name: string;
  size?: number;
  color?: ColorValue;
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
  type?: ComponentVariant;
  size?: ComponentSize;
  text?: string;
  closable?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

// Calendar 组件
export interface CalendarProps extends BaseComponent {
  visible?: boolean;
  type?: 'single' | 'range';
  title?: string;
  defaultValue?: string | string[];
  startDate?: string;
  endDate?: string;
  showToday?: boolean;
  confirmText?: string;
  showTitle?: boolean;
  poppable?: boolean;
  onClose?: () => void;
  onConfirm?: (date: Date | Date[]) => void;
  onChange?: (date: string | string[]) => void;
}

// Swiper 组件
export interface SwiperProps extends BaseComponent {
  width?: number;
  height?: number;
  autoPlay?: number;
  duration?: number;
  initPage?: number;
  direction?: 'horizontal' | 'vertical';
  loop?: boolean;
  showIndicators?: boolean;
  indicatorColor?: string;
  indicatorActiveColor?: string;
  children?: React.ReactNode;
  onChange?: (index: number) => void;
}

// Table 组件
export interface TableColumn {
  key: string;
  title: string;
  dataIndex?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface TableProps extends BaseComponent {
  columns: TableColumn[];
  data: any[];
  bordered?: boolean;
  striped?: boolean;
  sortable?: boolean;
  loading?: boolean;
  emptyText?: string;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onRowPress?: (record: any, index: number) => void;
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
  children?: React.ReactNode;
}

// 开关类型
export interface SwitchProps extends BaseComponent {
  value?: boolean;
  size?: ComponentSize;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  onChange?: (value: boolean) => void;
}

// 复选框类型
export interface CheckboxProps extends BaseComponent {
  checked?: boolean;
  size?: ComponentSize;
  disabled?: boolean;
  label?: string;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

// 单选框类型
export interface RadioProps extends BaseComponent {
  checked?: boolean;
  size?: ComponentSize;
  disabled?: boolean;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  children?: React.ReactNode;
}

// 评分类型
export interface RateProps extends BaseComponent {
  value?: number;
  count?: number;
  allowHalf?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  children?: React.ReactNode;
}

// Slider 组件
export interface SliderProps extends BaseComponent {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  children?: React.ReactNode;
}

// Notification 组件
export interface NotificationProps extends BaseComponent {
  visible?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  duration?: number;
  closable?: boolean;
  position?: 'top' | 'bottom';
  onClose?: () => void;
}

// ActionSheet 相关类型
export interface ActionSheetOption {
  label: string;
  title: string;
  value?: any;
  icon?: string;
  disabled?: boolean;
  destructive?: boolean;
}

export interface ActionSheetProps extends BaseComponent {
  visible: boolean;
  title?: string;
  description?: string;
  options: ActionSheetOption[];
  cancelText?: string;
  showCancel?: boolean;
  destructiveIndex?: number;
  onSelect?: (option: ActionSheetOption, index: number) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

// Toast 相关类型
export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  duration?: number;
  position?: 'top' | 'bottom';
  closable?: boolean;
}

// Drawer 相关类型
export interface DrawerProps extends BaseComponent {
  visible?: boolean;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  title?: string;
  closable?: boolean;
  maskClosable?: boolean;
  mask?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  onShow?: () => void;
  onHide?: () => void;
}



// Picker 相关类型
export interface PickerOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface PickerProps extends BaseComponent {
  visible: boolean;
  title?: string;
  columns: PickerOption[][];
  value?: any[];
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (values: any[]) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

// DatePicker 相关类型
export interface DatePickerProps extends BaseComponent {
  visible?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  onConfirm?: (date: Date) => void;
  onCancel?: () => void;
  onClose?: () => void;
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



// 模态框类型
export interface ModalProps extends BaseComponent {
  visible?: boolean;
  title?: string;
  closable?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
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