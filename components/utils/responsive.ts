import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

// 响应式设计基准
const baseWidth = 375; // iPhone 6/7/8 宽度作为基准

// 响应式尺寸计算
export const responsive = (size: number): number => {
  return (size * screenWidth) / baseWidth;
};

// 像素转换
export const px = (size: number): number => {
  return size / pixelRatio;
};

// 获取尺寸值
export const getSizeValue = (size: 'small' | 'medium' | 'large' | number): number => {
  if (typeof size === 'number') {
    return responsive(size);
  }
  
  const sizeMap = {
    small: responsive(24),
    medium: responsive(32),
    large: responsive(40),
  };
  
  return sizeMap[size];
};

// 获取字体大小
export const getFontSizeValue = (size: 'small' | 'medium' | 'large' | number): number => {
  if (typeof size === 'number') {
    return responsive(size);
  }
  
  const fontSizeMap = {
    small: responsive(12),
    medium: responsive(14),
    large: responsive(16),
  };
  
  return fontSizeMap[size];
};

// 获取间距值
export const getSpacingValue = (spacing: 'small' | 'medium' | 'large' | number): number => {
  if (typeof spacing === 'number') {
    return responsive(spacing);
  }
  
  const spacingMap = {
    small: responsive(4),
    medium: responsive(8),
    large: responsive(16),
  };
  
  return spacingMap[spacing];
};

// 导出屏幕尺寸
export { pixelRatio, screenHeight, screenWidth };