import { Dimensions, PixelRatio, Platform } from 'react-native';
import { ComponentSize } from '../types';

// 获取屏幕尺寸
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 设计稿基准宽度
const DESIGN_WIDTH = 375;

// 像素密度
const pixelRatio = PixelRatio.get();

// 响应式尺寸转换
export const responsive = (size: number): number => {
  return (size * screenWidth) / DESIGN_WIDTH;
};

// 像素转换
export const px = (size: number): number => {
  return size / pixelRatio;
};

// 获取尺寸值
export const getSizeValue = (size: ComponentSize): number => {
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 48,
  };
  return responsive(sizeMap[size]);
};

// 获取字体大小
export const getFontSizeValue = (size: ComponentSize): number => {
  const sizeMap = {
    small: 12,
    medium: 14,
    large: 16,
  };
  return responsive(sizeMap[size]);
};

// 获取间距值
export const getSpacingValue = (size: ComponentSize): number => {
  const sizeMap = {
    small: 8,
    medium: 12,
    large: 16,
  };
  return responsive(sizeMap[size]);
};

// 判断是否为iOS
export const isIOS = Platform.OS === 'ios';

// 判断是否为Android
export const isAndroid = Platform.OS === 'android';

// 获取状态栏高度
export const getStatusBarHeight = (): number => {
  if (isIOS) {
    // iPhone X系列的状态栏高度
    if (screenHeight >= 812) {
      return 44;
    }
    return 20;
  }
  return 24;
};

// 获取底部安全区域高度
export const getBottomSafeAreaHeight = (): number => {
  if (isIOS && screenHeight >= 812) {
    return 34;
  }
  return 0;
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// 颜色处理函数
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// 判断颜色是否为深色
export const isDarkColor = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

// 生成随机ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// 深度合并对象
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T => {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key] as any);
    } else {
      result[key] = source[key] as any;
    }
  }
  
  return result;
};

// 格式化数字
export const formatNumber = (num: number, precision: number = 2): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(precision) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(precision) + 'K';
  }
  return num.toString();
};

// 验证邮箱
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证手机号
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// 获取屏幕信息
export const getScreenInfo = () => {
  return {
    width: screenWidth,
    height: screenHeight,
    pixelRatio,
    isIOS,
    isAndroid,
    statusBarHeight: getStatusBarHeight(),
    bottomSafeAreaHeight: getBottomSafeAreaHeight(),
  };
};