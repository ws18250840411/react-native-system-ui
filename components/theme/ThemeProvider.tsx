import React, { createContext, ReactNode, useContext } from 'react';
import { Theme } from '../types';
import { defaultTheme } from './index';

// 主题上下文
const ThemeContext = createContext<Theme>(defaultTheme);

// 主题Provider接口
interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

// 主题Provider组件
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  theme = defaultTheme, 
  children 
}) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的Hook
export const useTheme = (): { theme: Theme } => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { theme };
};

// 高阶组件：为组件注入主题
export const withTheme = <P extends object>(Component: React.ComponentType<P & { theme: Theme }>) => {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => {
    const { theme } = useTheme();
    return <Component {...(props as P)} theme={theme} ref={ref} />;
  });
  return WrappedComponent;
};