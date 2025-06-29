import React, { useCallback, useMemo } from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { CardProps } from '../types';
import { hexToRgba } from '../utils';

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  onPress,
  children,
  style,
}) => {
  const { theme } = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const containerStyle: ViewStyle = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      shadowColor: theme.colors.dark,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // Android阴影
      borderWidth: 1,
      borderColor: hexToRgba(theme.colors.border, 0.1),
    };

    const titleStyle: TextStyle = {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: subtitle ? theme.spacing.xs : 0,
    };

    const subtitleStyle: TextStyle = {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: children ? theme.spacing.md : 0,
    };

    const contentStyle: ViewStyle = {
      marginTop: (title || subtitle) ? theme.spacing.md : 0,
    };

    return {
      containerStyle,
      titleStyle,
      subtitleStyle,
      contentStyle,
    };
  }, [theme, title, subtitle, children]);

  // 处理点击事件
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  // 渲染标题区域
  const renderHeader = () => {
    if (!title && !subtitle) return null;

    return (
      <View>
        {title && (
          <Text style={styles.titleStyle}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={styles.subtitleStyle}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  // 渲染内容区域
  const renderContent = () => {
    if (!children) return null;

    return (
      <View style={styles.contentStyle}>
        {children}
      </View>
    );
  };

  // 如果有点击事件，使用TouchableOpacity包装
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, style]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        {renderHeader()}
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // 否则直接渲染View
  return (
    <View style={[styles.containerStyle, style]}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

export default React.memo(Card);