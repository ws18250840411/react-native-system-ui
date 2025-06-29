import { Theme } from '../types';

// 默认主题配置
export const defaultTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    info: '#5AC8FA',
    light: '#F2F2F7',
    dark: '#1C1C1E',
    background: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    disabled: '#D1D1D6',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
};

// 暗色主题
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    disabled: '#48484A',
  },
};

// 主题工具函数
export const createTheme = (customTheme: Partial<Theme>): Theme => {
  return {
    colors: { ...defaultTheme.colors, ...customTheme.colors },
    spacing: { ...defaultTheme.spacing, ...customTheme.spacing },
    borderRadius: { ...defaultTheme.borderRadius, ...customTheme.borderRadius },
    fontSize: { ...defaultTheme.fontSize, ...customTheme.fontSize },
  };
};

// 获取颜色值
export const getColor = (theme: Theme, color: string): string => {
  return (theme.colors as any)[color] || color;
};

// 获取间距值
export const getSpacing = (theme: Theme, spacing: keyof Theme['spacing'] | number): number => {
  if (typeof spacing === 'number') return spacing;
  return theme.spacing[spacing];
};

// 获取字体大小
export const getFontSize = (theme: Theme, size: keyof Theme['fontSize'] | number): number => {
  if (typeof size === 'number') return size;
  return theme.fontSize[size];
};

// 获取圆角值
export const getBorderRadius = (theme: Theme, radius: keyof Theme['borderRadius'] | number): number => {
  if (typeof radius === 'number') return radius;
  return theme.borderRadius[radius];
};
