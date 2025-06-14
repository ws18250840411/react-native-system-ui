import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// 按钮组件
export const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false,
  backgroundColor = '#2196F3',
  textColor = '#FFFFFF',
  borderRadius = 8,
  padding = 12
}) => {
  // 禁用状态样式
  const disabledStyle = disabled ? { opacity: 0.5 } : {};
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor, borderRadius, padding },
        style,
        disabledStyle
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Button;  