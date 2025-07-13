import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { DividerProps } from '../types';
import { useTheme } from '../theme';
import { createDividerStyles } from './styles';

export const Divider: React.FC<DividerProps> = memo(({
  orientation = 'horizontal',
  color,
  thickness = 1,
  children,
  textAlign = 'center',
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createDividerStyles(theme, orientation, thickness);
  
  const dividerColor = color || theme.colors.border;
  
  const dividerStyle = [
    orientation === 'horizontal' ? styles.horizontal : styles.vertical,
    { backgroundColor: dividerColor },
    style,
  ];
  
  // 如果没有文字内容，直接返回分割线
  if (!children) {
    return (
      <View style={dividerStyle} testID={testID} {...rest} />
    );
  }
  
  // 垂直分割线不支持文字
  if (orientation === 'vertical') {
    return (
      <View style={dividerStyle} testID={testID} {...rest} />
    );
  }
  
  // 水平分割线带文字
  const containerStyle = [
    styles.containerWithText,
    textAlign === 'left' && styles.containerLeft,
    textAlign === 'right' && styles.containerRight,
  ];
  
  const leftLineStyle = [
    styles.lineWithText,
    { backgroundColor: dividerColor },
    textAlign === 'left' && styles.lineHidden,
  ];
  
  const rightLineStyle = [
    styles.lineWithText,
    { backgroundColor: dividerColor },
    textAlign === 'right' && styles.lineHidden,
  ];
  
  return (
    <View style={containerStyle} testID={testID} {...rest}>
      <View style={leftLineStyle} />
      <Text style={styles.text}>{children}</Text>
      <View style={rightLineStyle} />
    </View>
  );
});

Divider.displayName = 'Divider';