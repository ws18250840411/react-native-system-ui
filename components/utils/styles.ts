import { ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../types';
import { ComponentSize, ComponentVariant } from '../types';
import { getSizeValue, getFontSizeValue, getSpacingValue } from './responsive';

// 样式选项接口
export interface ContainerStyleOptions {
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  block?: boolean;
  bordered?: boolean;
  rounded?: boolean;
}

export interface TextStyleOptions {
  size?: ComponentSize;
  variant?: ComponentVariant;
  disabled?: boolean;
  weight?: 'normal' | 'bold' | '600';
}

// 创建通用容器样式
export const createContainerStyle = (
  theme: Theme,
  options: ContainerStyleOptions = {}
): ViewStyle => {
  const {
    variant = 'primary',
    size = 'medium',
    disabled = false,
    block = false,
    bordered = false,
    rounded = true
  } = options;

  const variantColors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    info: theme.colors.info,
  };

  const baseHeight = getSizeValue(size);
  const paddingHorizontal = getSpacingValue(size) * 2;
  const backgroundColor = variantColors[variant];

  return {
    height: baseHeight,
    backgroundColor: disabled ? theme.colors.disabled : backgroundColor,
    borderRadius: rounded ? theme.borderRadius.md : 0,
    paddingHorizontal,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: disabled ? 0.6 : 1,
    borderWidth: bordered ? 1 : 0,
    borderColor: bordered ? theme.colors.border : 'transparent',
    ...(block && { width: '100%' }),
  };
};

// 创建通用文本样式
export const createTextStyle = (
  theme: Theme,
  options: TextStyleOptions = {}
): TextStyle => {
  const {
    size = 'medium',
    variant = 'primary',
    disabled = false,
    weight = 'normal'
  } = options;

  const fontSize = getFontSizeValue(size);
  const variantColors = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    success: '#FFFFFF',
    warning: '#FFFFFF',
    danger: '#FFFFFF',
    info: '#FFFFFF',
  };

  const fontWeights = {
    normal: 'normal' as const,
    bold: 'bold' as const,
    '600': '600' as const,
  };

  return {
    fontSize,
    fontWeight: fontWeights[weight],
    color: disabled ? theme.colors.textSecondary : variantColors[variant],
  };
};

// 创建按钮样式
export const createButtonStyle = (
  options: {
    variant?: string;
    size?: string;
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
    theme: any;
  }
): { containerStyle: ViewStyle; textStyle: TextStyle } => {
  const { variant = 'primary', size = 'medium', disabled = false, loading = false, block = false, theme } = options;

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: disabled ? theme.colors.light : theme.colors.secondary,
          borderColor: disabled ? theme.colors.border : theme.colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? theme.colors.border : theme.colors.primary,
          borderWidth: 1,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      default: // primary
        return {
          backgroundColor: disabled ? theme.colors.light : theme.colors.primary,
          borderColor: disabled ? theme.colors.border : theme.colors.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 32,
          paddingHorizontal: theme.spacing.sm,
          fontSize: theme.fontSize.sm,
        };
      case 'large':
        return {
          height: 48,
          paddingHorizontal: theme.spacing.lg,
          fontSize: theme.fontSize.lg,
        };
      default: // medium
        return {
          height: 40,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.fontSize.md,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return theme.colors.textSecondary;
    }
    
    switch (variant) {
      case 'outline':
      case 'text':
        return theme.colors.primary;
      default:
        return theme.colors.white;
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerStyle: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    opacity: loading ? 0.7 : 1,
    width: block ? '100%' : undefined,
    ...variantStyles,
    ...sizeStyles,
  };

  const textStyle: TextStyle = {
    fontSize: sizeStyles.fontSize,
    fontWeight: '600',
    color: getTextColor(),
  };

  return { containerStyle, textStyle };
};

// 创建输入框样式
export const createInputStyle = (
  options: {
    size?: string;
    error?: boolean;
    isFocused?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    theme: any;
  }
): { containerStyle: ViewStyle; inputStyle: TextStyle } => {
  const { size = 'medium', error = false, isFocused = false, disabled = false, multiline = false, theme } = options;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 32,
          paddingHorizontal: theme.spacing.sm,
          fontSize: theme.fontSize.sm,
        };
      case 'large':
        return {
          height: 48,
          paddingHorizontal: theme.spacing.lg,
          fontSize: theme.fontSize.lg,
        };
      default: // medium
        return {
          height: 40,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.fontSize.md,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const containerStyle: ViewStyle = {
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    backgroundColor: disabled ? theme.colors.light : theme.colors.white,
    borderColor: error
      ? theme.colors.error
      : isFocused
      ? theme.colors.primary
      : theme.colors.border,
    opacity: disabled ? 0.6 : 1,
    height: multiline ? undefined : sizeStyles.height,
    minHeight: multiline ? sizeStyles.height : undefined,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: sizeStyles.fontSize,
    color: theme.colors.text,
    paddingHorizontal: sizeStyles.paddingHorizontal,
    height: multiline ? undefined : sizeStyles.height,
    minHeight: multiline ? sizeStyles.height : undefined,
    textAlignVertical: multiline ? 'top' : 'center',
  };

  return { containerStyle, inputStyle };
};

// 原有的createInputStyle函数（重命名为createInputStyleOld）
export const createInputStyleOld = (
  theme: Theme,
  options: {
    error?: boolean;
    focused?: boolean;
    disabled?: boolean;
    multiline?: boolean;
  } = {}
): { containerStyle: ViewStyle; inputStyle: TextStyle } => {
  const { error = false, focused = false, disabled = false, multiline = false } = options;

  const containerStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: error
      ? theme.colors.danger
      : focused
      ? theme.colors.primary
      : theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: disabled ? theme.colors.light : theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: multiline ? theme.spacing.md : theme.spacing.sm,
    minHeight: multiline ? 80 : 44,
  };

  const inputStyle: TextStyle = {
    fontSize: theme.fontSize.md,
    color: disabled ? theme.colors.textSecondary : theme.colors.text,
    flex: 1,
    textAlignVertical: multiline ? 'top' : 'center',
    padding: 0,
  };

  return { containerStyle, inputStyle };
};

// 创建卡片样式
export const createCardStyle = (
  theme: Theme,
  options: {
    shadow?: boolean;
    bordered?: boolean;
    padding?: keyof Theme['spacing'];
  } = {}
): ViewStyle => {
  const { shadow = true, bordered = false, padding = 'md' } = options;

  return {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[padding],
    borderWidth: bordered ? 1 : 0,
    borderColor: bordered ? theme.colors.border : 'transparent',
    ...(shadow && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    }),
  };
};

// 创建图标容器样式
export const createIconContainerStyle = (
  theme: Theme,
  options: {
    size?: number;
    variant?: ComponentVariant;
    rounded?: boolean;
  } = {}
): ViewStyle => {
  const { size = 24, variant, rounded = false } = options;

  const variantColors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    info: theme.colors.info,
  };

  return {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: variant ? variantColors[variant] : 'transparent',
    borderRadius: rounded ? size / 2 : 0,
  };
};