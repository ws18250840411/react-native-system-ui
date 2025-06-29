import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { ButtonProps } from '../types';
import { createButtonStyle } from '../utils';

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
  const { theme } = useTheme();

  // 计算样式
  const buttonStyles = useMemo(() => {
    return createButtonStyle({
      variant,
      size,
      disabled,
      loading,
      block,
      theme
    });
  }, [variant, size, disabled, loading, block, theme]);

  // 处理点击事件
  const handlePress = React.useCallback(() => {
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