import React, { useMemo, useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ButtonProps, ComponentSize, ComponentVariant } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { getSizeValue, getFontSizeValue, getSpacingValue, hexToRgba } from '../utils';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  block = false,
  onPress,
  title,
  children,
  style,
}) => {
  const theme = useTheme();

  // 计算样式
  const buttonStyles = useMemo(() => {
    const baseHeight = getSizeValue(size);
    const fontSize = getFontSizeValue(size);
    const paddingHorizontal = getSpacingValue(size) * 2;
    
    const variantColors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      warning: theme.colors.warning,
      danger: theme.colors.danger,
      info: theme.colors.info,
    };

    const backgroundColor = variantColors[variant];
    const textColor = '#FFFFFF';

    const containerStyle: ViewStyle = {
      height: baseHeight,
      backgroundColor: disabled ? theme.colors.disabled : backgroundColor,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.6 : 1,
      ...(block && { width: '100%' }),
    };

    const textStyle: TextStyle = {
      fontSize,
      fontWeight: '600',
      color: disabled ? theme.colors.textSecondary : textColor,
      marginLeft: loading ? theme.spacing.sm : 0,
    };

    return { containerStyle, textStyle };
  }, [theme, variant, size, disabled, loading, block]);

  // 处理按压事件
  const handlePress = useCallback(() => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  }, [disabled, loading, onPress]);

  // 渲染加载指示器
  const renderLoadingIndicator = () => {
    if (!loading) return null;
    
    return (
      <ActivityIndicator
        size="small"
        color={buttonStyles.textStyle.color}
      />
    );
  };

  // 渲染文本内容
  const renderContent = () => {
    if (children) {
      return children;
    }
    
    if (title) {
      return (
        <Text style={buttonStyles.textStyle}>
          {title}
        </Text>
      );
    }
    
    return null;
  };

  return (
    <TouchableOpacity
      style={[buttonStyles.containerStyle, style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderLoadingIndicator()}
      {renderContent()}
    </TouchableOpacity>
  );
};

export default React.memo(Button);