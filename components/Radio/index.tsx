import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { RadioProps, ComponentSize } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { getSizeValue, getFontSizeValue, responsive } from '../utils';

const Radio: React.FC<RadioProps> = ({
  checked = false,
  size = 'medium',
  disabled = false,
  label,
  value,
  onChange,
  style,
  children,
}) => {
  const theme = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const radioSize = getSizeValue(size) * 0.6;
    const fontSize = getFontSizeValue(size);
    const innerSize = radioSize * 0.5;
    
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: disabled ? 0.5 : 1,
    };

    const radioStyle: ViewStyle = {
      width: radioSize,
      height: radioSize,
      borderRadius: radioSize / 2,
      borderWidth: responsive(2),
      borderColor: checked ? theme.colors.primary : theme.colors.border,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (label || children) ? theme.spacing.sm : 0,
    };

    const innerCircleStyle: ViewStyle = {
      width: innerSize,
      height: innerSize,
      borderRadius: innerSize / 2,
      backgroundColor: checked ? theme.colors.primary : 'transparent',
    };

    const labelStyle: TextStyle = {
      fontSize,
      color: theme.colors.text,
      flex: 1,
    };

    return {
      containerStyle,
      radioStyle,
      innerCircleStyle,
      labelStyle,
    };
  }, [theme, size, checked, disabled, label, children]);

  // 处理点击事件
  const handlePress = useCallback(() => {
    if (disabled || !onChange) return;
    onChange(value);
  }, [disabled, onChange, value]);

  // 渲染标签
  const renderLabel = () => {
    if (children) {
      return children;
    }

    if (label) {
      return (
        <Text style={styles.labelStyle}>
          {label}
        </Text>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.containerStyle, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.radioStyle}>
        <View style={styles.innerCircleStyle} />
      </View>
      {renderLabel()}
    </TouchableOpacity>
  );
};

export default React.memo(Radio);