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
import { TagProps } from '../types';
import { getFontSizeValue, getSizeValue, hexToRgba } from '../utils';

const Tag: React.FC<TagProps> = ({
  variant = 'primary',
  size = 'medium',
  closable = false,
  onClose,
  children,
  style,
}) => {
  const { theme } = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const height = getSizeValue(size) * 0.7; // 标签高度比按钮小
    const fontSize = getFontSizeValue(size) * 0.9;
    const paddingHorizontal = theme.spacing.sm;
    
    const variantColors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      warning: theme.colors.warning,
      danger: theme.colors.danger,
      info: theme.colors.info,
    };

    const backgroundColor = variantColors[variant];
    const lightBackgroundColor = hexToRgba(backgroundColor, 0.1);
    const textColor = backgroundColor;

    const containerStyle: ViewStyle = {
      height,
      backgroundColor: lightBackgroundColor,
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: hexToRgba(backgroundColor, 0.3),
    };

    const textStyle: TextStyle = {
      fontSize,
      fontWeight: '500',
      color: textColor,
    };

    const closeButtonStyle: ViewStyle = {
      marginLeft: theme.spacing.xs,
      padding: 2,
    };

    return {
      containerStyle,
      textStyle,
      closeButtonStyle,
    };
  }, [theme, variant, size]);

  // 处理关闭事件
  const handleClose = useCallback((e: any) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // 渲染关闭按钮
  const renderCloseButton = () => {
    if (!closable) return null;

    return (
      <TouchableOpacity
        style={styles.closeButtonStyle}
        onPress={handleClose}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      >
        <Icon
          name="close"
          size={12}
          color={styles.textStyle.color}
        />
      </TouchableOpacity>
    );
  };

  // 渲染内容
  const renderContent = () => {
    if (typeof children === 'string') {
      return (
        <Text style={styles.textStyle}>
          {children}
        </Text>
      );
    }
    return children;
  };

  return (
    <View style={[styles.containerStyle, style]}>
      {renderContent()}
      {renderCloseButton()}
    </View>
  );
};

export default React.memo(Tag);