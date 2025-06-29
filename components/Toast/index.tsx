import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../Icon';
import { useTheme } from '../theme/ThemeProvider';
import { ToastProps } from '../types';
import { getStatusBarHeight, responsive } from '../utils';

const { width: screenWidth } = Dimensions.get('window');

interface ToastInstance {
  id: string;
  props: ToastProps;
}

class ToastManager {
  private static instance: ToastManager;
  private toasts: ToastInstance[] = [];
  private listeners: ((toasts: ToastInstance[]) => void)[] = [];

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  show(props: ToastProps): string {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastInstance = { id, props };
    
    this.toasts.push(toast);
    this.notifyListeners();
    
    // 自动隐藏
    if (props.duration !== 0) {
      setTimeout(() => {
        this.hide(id);
      }, props.duration || 3000);
    }
    
    return id;
  }

  hide(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notifyListeners();
  }

  hideAll(): void {
    this.toasts = [];
    this.notifyListeners();
  }

  subscribe(listener: (toasts: ToastInstance[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  // 便捷方法
  static success(message: string, options?: Partial<ToastProps>): string {
    return ToastManager.getInstance().show({
      message,
      type: 'success',
      ...options,
    });
  }

  static error(message: string, options?: Partial<ToastProps>): string {
    return ToastManager.getInstance().show({
      message,
      type: 'error',
      ...options,
    });
  }

  static warning(message: string, options?: Partial<ToastProps>): string {
    return ToastManager.getInstance().show({
      message,
      type: 'warning',
      ...options,
    });
  }

  static info(message: string, options?: Partial<ToastProps>): string {
    return ToastManager.getInstance().show({
      message,
      type: 'info',
      ...options,
    });
  }

  static loading(message: string, options?: Partial<ToastProps>): string {
    return ToastManager.getInstance().show({
      message,
      type: 'loading',
      duration: 0, // 加载状态不自动隐藏
      ...options,
    });
  }

  static hide(id: string): void {
    ToastManager.getInstance().hide(id);
  }

  static hideAll(): void {
    ToastManager.getInstance().hideAll();
  }
}

const ToastItem: React.FC<{
  toast: ToastInstance;
  onHide: (id: string) => void;
}> = ({ toast, onHide }) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(true);

  const { message, type = 'info', position = 'top', closable = false } = toast.props;

  useEffect(() => {
    // 入场动画
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
  }, []);

  const handleHide = () => {
    setIsVisible(false);
    // 出场动画
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide(toast.id);
    });
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: theme.colors.success,
          icon: 'check-circle',
          iconColor: '#FFFFFF',
        };
      case 'error':
        return {
          backgroundColor: theme.colors.danger,
          icon: 'x-circle',
          iconColor: '#FFFFFF',
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
          icon: 'alert-triangle',
          iconColor: '#FFFFFF',
        };
      case 'loading':
        return {
          backgroundColor: theme.colors.text,
          icon: 'loader',
          iconColor: '#FFFFFF',
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          icon: 'info',
          iconColor: '#FFFFFF',
        };
    }
  };

  const typeConfig = getTypeConfig();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: responsive(16),
      right: responsive(16),
      zIndex: 9999,
      ...(position === 'top' ? { top: getStatusBarHeight() + responsive(16) } : { bottom: responsive(50) }),
    },
    toast: {
      backgroundColor: typeConfig.backgroundColor,
      borderRadius: responsive(8),
      paddingHorizontal: responsive(16),
      paddingVertical: responsive(12),
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: responsive(8),
    },
    message: {
      color: '#FFFFFF',
      fontSize: responsive(14),
      fontWeight: '500',
      flex: 1,
    },
    closeButton: {
      marginLeft: responsive(8),
      padding: responsive(4),
    },
  });

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.toast}>
        <View style={styles.content}>
          <Icon
            name={typeConfig.icon}
            size={responsive(16)}
            color={typeConfig.iconColor}
            style={styles.icon}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
        {closable && (
          <TouchableOpacity style={styles.closeButton} onPress={handleHide}>
            <Icon
              name="x"
              size={responsive(16)}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  useEffect(() => {
    const unsubscribe = ToastManager.getInstance().subscribe(setToasts);
    return unsubscribe;
  }, []);

  const handleHide = (id: string) => {
    ToastManager.getInstance().hide(id);
  };

  return (
    <>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onHide={handleHide}
        />
      ))}
    </>
  );
};

export const Toast = {
  show: (props: ToastProps) => ToastManager.getInstance().show(props),
  success: ToastManager.success,
  error: ToastManager.error,
  warning: ToastManager.warning,
  info: ToastManager.info,
  loading: ToastManager.loading,
  hide: ToastManager.hide,
  hideAll: ToastManager.hideAll,
};

export { ToastContainer as default };
