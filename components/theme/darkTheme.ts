import { Theme } from '../types';
import { defaultTheme } from './defaultTheme';

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    success: '#30D158',
    warning: '#FF9F0A',
    danger: '#FF453A',
    info: '#64D2FF',
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    borderLight: '#2C2C2E',
    disabled: '#48484A',
    white: '#FFFFFF',
    black: '#000000',
  },
};