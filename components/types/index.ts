// 基础类型定义
export interface BaseComponentProps {
  style?: any;
  className?: string;
  testID?: string;
}

// 尺寸类型
export type Size = 'xs' | 'small' | 'medium' | 'large' | 'xl';

// 颜色类型
export type ColorType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

// 按钮相关类型
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'ghost';
export type ButtonShape = 'square' | 'round';
export type ButtonSize = 'small' | 'medium' | 'large';

// 标签相关类型
export type TagVariant = 'filled' | 'outlined';
export type TagShape = 'square' | 'rounded' | 'round';
export type AvatarShape = 'circle' | 'square';

export interface ButtonProps extends BaseComponentProps {
  title?: string;
  variant?: ButtonVariant;
  color?: ColorType | string;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  plain?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  activeStyle?: any;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  children?: React.ReactNode;
}

// 输入框相关类型
export type InputType = 'text' | 'password' | 'email' | 'number' | 'phone';
export type InputAlign = 'left' | 'center' | 'right';

export interface InputProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: InputType;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: string;
  rightIcon?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  textAlign?: InputAlign;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
}

// 卡片相关类型
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  headerExtra?: React.ReactNode;
  footerExtra?: React.ReactNode;
  bordered?: boolean;
  shadow?: boolean;
  children?: React.ReactNode;
}

// 开关相关类型
export interface SwitchProps extends BaseComponentProps {
  value?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  size?: Size;
  color?: ColorType;
  onChange?: (value: boolean) => void;
}

// 复选框相关类型
export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  value?: any;
  onChange?: (checked: boolean) => void;
}

// 单选框相关类型
export interface RadioProps extends BaseComponentProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
}

export interface RadioGroupProps extends BaseComponentProps {
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  onChange?: (value: any) => void;
  children?: React.ReactNode;
}

// 图标相关类型
export interface IconProps extends BaseComponentProps {
  name: string;
  size?: number;
  color?: string;
}

// 头像相关类型
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: Size | number;
  shape?: AvatarShape;
  icon?: string;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

// 徽章相关类型
export interface BadgeProps extends BaseComponentProps {
  count?: number;
  max?: number;
  dot?: boolean;
  showZero?: boolean;
  overflowCount?: number;
  color?: ColorType;
  textColor?: string;
  size?: Size;
  offset?: [number, number];
  children?: React.ReactNode;
}

// 标签相关类型
export interface TagProps extends BaseComponentProps {
  color?: ColorType;
  variant?: TagVariant;
  size?: Size;
  shape?: TagShape;
  closable?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  children?: React.ReactNode;
}

// 分割线相关类型
export interface DividerProps extends BaseComponentProps {
  direction?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
  dashed?: boolean;
  color?: string;
  thickness?: number;
  textAlign?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

// 加载相关类型
export interface LoadingProps extends BaseComponentProps {
  size?: Size | number;
  color?: string;
  text?: string;
  vertical?: boolean;
}

// 空状态相关类型
export interface EmptyProps extends BaseComponentProps {
  image?: string | React.ReactNode;
  imageStyle?: any;
  icon?: string;
  title?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
}

// 主题相关类型
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    background: string;
    backgroundSecondary: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    borderLight: string;
    disabled: string;
    white: string;
    black: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadows: {
    sm: any;
    md: any;
    lg: any;
  };
}

export interface ThemeProviderProps {
  theme?: Partial<Theme>;
  children: React.ReactNode;
}