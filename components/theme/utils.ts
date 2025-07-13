import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const designWidth = 375; // 设计稿宽度

// 响应式尺寸转换
export const responsive = (size: number): number => {
  return (size * screenWidth) / designWidth;
};

// 像素密度转换
export const px = (size: number): number => {
  return size / PixelRatio.get();
};

// 设计稿尺寸转换
export const pt = (size: number): number => {
  return responsive(size);
};

// 获取尺寸值
export const getSizeValue = (size: 'small' | 'medium' | 'large', values = { small: 32, medium: 40, large: 48 }): number => {
  return values[size];
};

// 获取字体大小值
export const getFontSizeValue = (size: 'small' | 'medium' | 'large', values = { small: 12, medium: 14, large: 16 }): number => {
  return values[size];
};

// 获取间距值
export const getSpacingValue = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl', values = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }): number => {
  return values[size];
};

// 平台判断
export const isIOS = (): boolean => Platform.OS === 'ios';
export const isAndroid = (): boolean => Platform.OS === 'android';

// 颜色处理函数
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// 判断是否为深色
export const isDarkColor = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

// 获取对比色
export const getContrastColor = (backgroundColor: string): string => {
  return isDarkColor(backgroundColor) ? '#FFFFFF' : '#000000';
};

// 屏幕尺寸
export const screenDimensions = {
  width: screenWidth,
  height: screenHeight,
};