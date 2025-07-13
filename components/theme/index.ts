import React, { createContext, useContext } from 'react';
import { Theme, ThemeProviderProps } from '../types';
import { defaultTheme } from './defaultTheme';

// 创建主题上下文
const ThemeContext = createContext<Theme>(defaultTheme);

// 主题提供者组件
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const mergedTheme = { ...defaultTheme, ...theme };
  
  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的Hook
export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};

// 创建主题函数
export const createTheme = (customTheme: Partial<Theme>): Theme => {
  return { ...defaultTheme, ...customTheme };
};

export { defaultTheme } from './defaultTheme';
export { darkTheme } from './darkTheme';
export * from './utils';