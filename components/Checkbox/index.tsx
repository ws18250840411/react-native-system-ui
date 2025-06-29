import React, { useCallback, useMemo } from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import Icon from '../Icon';
import { useTheme } from '../theme/ThemeProvider';
import { CheckboxProps } from '../types';
import { getFontSizeValue, getSizeValue, responsive } from '../utils';

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  size = 'medium',
  disabled = false,
  label,
  indeterminate = false,
  onChange,
  style,
  children,
}) => {
  const { theme } = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const checkboxSize = getSizeValue(size) * 0.6;
    const fontSize = getFontSizeValue(size);
    
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: disabled ? 0.5 : 1,
    };

    const checkboxStyle: ViewStyle = {
      width: checkboxSize,
      height: checkboxSize,
      borderRadius: theme.borderRadius.sm,
      borderWidth: responsive(2),
      borderColor: checked || indeterminate ? theme.colors.primary : theme.colors.border,
      backgroundColor: checked || indeterminate ? theme.colors.primary : 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (label || children) ? theme.spacing.sm : 0,
    };

    const labelStyle: TextStyle = {
      fontSize,
      color: theme.colors.text,
      flex: 1,
    };

    return {
      containerStyle,
      checkboxStyle,
      labelStyle,
      checkboxSize,
    };
  }, [theme, size, checked, indeterminate, disabled, label, children]);

  // 处理点击事件
  const handlePress = useCallback(() => {
    if (disabled || !onChange) return;
    onChange(!checked);
  }, [disabled, onChange, checked]);

  // 渲染复选框图标
  const renderCheckIcon = () => {
    if (indeterminate) {
      return (
        <Icon
          name="minus"
          size={styles.checkboxSize * 0.6}
          color="#FFFFFF"
        />
      );
    }

    if (checked) {
      return (
        <Icon
          name="check"
          size={styles.checkboxSize * 0.6}
          color="#FFFFFF"
        />
      );
    }

    return null;
  };

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
      <View style={styles.checkboxStyle}>
        {renderCheckIcon()}
      </View>
      {renderLabel()}
    </TouchableOpacity>
  );
};

export default React.memo(Checkbox);