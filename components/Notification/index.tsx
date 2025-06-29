import React, { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import Icon from '../Icon';
import { useTheme } from '../theme/ThemeProvider';
import { NotificationProps } from '../types';
import { responsive } from '../utils';

const { width: screenWidth } = Dimensions.get('window');

const Notification: React.FC<NotificationProps> = ({
  visible = false,
  type = 'info',
  title,
  message,
  duration = 3000,
  closable = true,
  position = 'top',
  onClose,
  style,
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(visible);
  const translateY = React.useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  // 获取类型对应的颜色和图标
  const getTypeConfig = useCallback(() => {
    switch (type) {
      case 'success':
        return {
          color: theme.colors.success,
          backgroundColor: `${theme.colors.success}15`,
          borderColor: theme.colors.success,
          icon: 'check-circle',
        };
      case 'warning':
        return {
          color: theme.colors.warning,
          backgroundColor: `${theme.colors.warning}15`,
          borderColor: theme.colors.warning,
          icon: 'alert-triangle',
        };
      case 'error':
        return {
          color: theme.colors.danger,
          backgroundColor: `${theme.colors.danger}15`,
          borderColor: theme.colors.danger,
          icon: 'x-circle',
        };
      default:
        return {
          color: theme.colors.primary,
          backgroundColor: `${theme.colors.primary}15`,
          borderColor: theme.colors.primary,
          icon: 'info',
        };
    }
  }, [type, theme]);

  const typeConfig = getTypeConfig();

  // 计算样式
  const styles = React.useMemo(() => {
    const containerStyle: ViewStyle = {
      position: 'absolute',
      left: responsive(16),
      right: responsive(16),
      zIndex: 9999,
      ...(position === 'top' ? { top: responsive(50) } : { bottom: responsive(50) }),
    };

    const notificationStyle: ViewStyle = {
      backgroundColor: typeConfig.backgroundColor,
      borderLeftWidth: responsive(4),
      borderLeftColor: typeConfig.borderColor,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    };

    const iconContainerStyle: ViewStyle = {
      marginRight: theme.spacing.sm,
      paddingTop: responsive(2),
    };

    const contentStyle: ViewStyle = {
      flex: 1,
    };

    const titleStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: message ? theme.spacing.xs : 0,
    };

    const messageStyle: TextStyle = {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      lineHeight: theme.fontSize.sm * 1.4,
    };

    const closeButtonStyle: ViewStyle = {
      padding: responsive(4),
      marginLeft: theme.spacing.sm,
    };

    return {
      containerStyle,
      notificationStyle,
      iconContainerStyle,
      contentStyle,
      titleStyle,
      messageStyle,
      closeButtonStyle,
    };
  }, [theme, typeConfig, position, message]);

  // 显示动画
  const showNotification = useCallback(() => {
    setIsVisible(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  // 隐藏动画
  const hideNotification = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      onClose?.();
    });
  }, [translateY, opacity, position, onClose]);

  // 处理关闭
  const handleClose = useCallback(() => {
    hideNotification();
  }, [hideNotification]);

  // 监听visible变化
  useEffect(() => {
    if (visible) {
      showNotification();
    } else {
      hideNotification();
    }
  }, [visible, showNotification, hideNotification]);

  // 自动关闭
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        hideNotification();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, hideNotification]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.containerStyle, style]}>
      <Animated.View
        style={[
          styles.notificationStyle,
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        <View style={styles.iconContainerStyle}>
          <Icon
            name={typeConfig.icon}
            size={20}
            color={typeConfig.color}
          />
        </View>
        
        <View style={styles.contentStyle}>
          {title && (
            <Text style={styles.titleStyle}>{title}</Text>
          )}
          {message && (
            <Text style={styles.messageStyle}>{message}</Text>
          )}
        </View>
        
        {closable && (
          <TouchableOpacity
            style={styles.closeButtonStyle}
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="x"
              size={16}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

// 静态方法
let notificationInstance: React.RefObject<any> | null = null;

const NotificationManager = {
  show: (config: Omit<NotificationProps, 'visible'>) => {
    // 这里可以实现全局通知管理逻辑
    console.log('Show notification:', config);
  },
  
  success: (title: string, message?: string, duration?: number) => {
    NotificationManager.show({
      type: 'success',
      title,
      message,
      duration,
    });
  },
  
  error: (title: string, message?: string, duration?: number) => {
    NotificationManager.show({
      type: 'error',
      title,
      message,
      duration,
    });
  },
  
  warning: (title: string, message?: string, duration?: number) => {
    NotificationManager.show({
      type: 'warning',
      title,
      message,
      duration,
    });
  },
  
  info: (title: string, message?: string, duration?: number) => {
    NotificationManager.show({
      type: 'info',
      title,
      message,
      duration,
    });
  },
};

export { NotificationManager };
export default Notification;