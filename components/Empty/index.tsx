import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { EmptyProps } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { responsive } from '../utils';
import Icon from '../Icon';

const Empty: React.FC<EmptyProps> = ({
  image,
  description = '暂无数据',
  action,
  style,
  children,
}) => {
  const theme = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const containerStyle: ViewStyle = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
    };

    const imageContainerStyle: ViewStyle = {
      marginBottom: theme.spacing.lg,
    };

    const descriptionStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: theme.fontSize.md * 1.4,
      marginBottom: action ? theme.spacing.lg : 0,
    };

    const actionContainerStyle: ViewStyle = {
      marginTop: theme.spacing.md,
    };

    return {
      containerStyle,
      imageContainerStyle,
      descriptionStyle,
      actionContainerStyle,
    };
  }, [theme, action]);

  // 渲染默认图片
  const renderDefaultImage = () => {
    return (
      <Icon
        name="file"
        size={80}
        color={theme.colors.textSecondary}
      />
    );
  };

  // 渲染图片区域
  const renderImage = () => {
    return (
      <View style={styles.imageContainerStyle}>
        {image || renderDefaultImage()}
      </View>
    );
  };

  // 渲染描述文本
  const renderDescription = () => {
    if (!description) return null;

    return (
      <Text style={styles.descriptionStyle}>
        {description}
      </Text>
    );
  };

  // 渲染操作区域
  const renderAction = () => {
    if (!action) return null;

    return (
      <View style={styles.actionContainerStyle}>
        {action}
      </View>
    );
  };

  return (
    <View style={[styles.containerStyle, style]}>
      {renderImage()}
      {renderDescription()}
      {renderAction()}
      {children}
    </View>
  );
};

export default React.memo(Empty);