import { StyleSheet } from 'react-native';
import { Theme } from '../types';

export const createIconStyles = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      fontFamily: 'System', // 可以根据需要替换为自定义字体
      textAlign: 'center',
    },
  });