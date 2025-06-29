import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { LoadingProps } from '../types';
import { getSizeValue, responsive } from '../utils';

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  color,
  text,
  vertical = false,
  style,
}) => {
  const { theme } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  // 启动旋转动画
  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  // 计算样式
  const styles = useMemo(() => {
    const spinnerSize = getSizeValue(size) * 0.6;
    const loadingColor = color || theme.colors.primary;
    
    const containerStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: vertical ? 'column' : 'row',
    };

    const spinnerStyle: ViewStyle = {
      width: spinnerSize,
      height: spinnerSize,
      borderRadius: spinnerSize / 2,
      borderWidth: responsive(2),
      borderColor: 'transparent',
      borderTopColor: loadingColor,
      marginRight: vertical ? 0 : (text ? theme.spacing.sm : 0),
      marginBottom: vertical ? (text ? theme.spacing.sm : 0) : 0,
    };

    const textStyle: TextStyle = {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    };

    return {
      containerStyle,
      spinnerStyle,
      textStyle,
    };
  }, [theme, size, color, vertical, text]);

  // 旋转插值
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // 渲染加载指示器
  const renderSpinner = () => {
    return (
      <Animated.View
        style={[
          styles.spinnerStyle,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    );
  };

  // 渲染文本
  const renderText = () => {
    if (!text) return null;

    return (
      <Text style={styles.textStyle}>
        {text}
      </Text>
    );
  };

  return (
    <View style={[styles.containerStyle, style]}>
      {renderSpinner()}
      {renderText()}
    </View>
  );
};

// Loading管理器
class LoadingManager {
  private static instance: LoadingManager;
  private isVisible = false;
  private listeners: ((visible: boolean, props?: LoadingProps) => void)[] = [];

  static getInstance(): LoadingManager {
    if (!LoadingManager.instance) {
      LoadingManager.instance = new LoadingManager();
    }
    return LoadingManager.instance;
  }

  show(props: LoadingProps = {}) {
    this.isVisible = true;
    this.notifyListeners(true, props);
  }

  hide() {
    this.isVisible = false;
    this.notifyListeners(false);
  }

  addListener(listener: (visible: boolean, props?: LoadingProps) => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: (visible: boolean, props?: LoadingProps) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(visible: boolean, props?: LoadingProps) {
    this.listeners.forEach(listener => listener(visible, props));
  }
}

// Loading容器组件
export const LoadingContainer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [loadingProps, setLoadingProps] = useState<LoadingProps>({});

  useEffect(() => {
    const manager = LoadingManager.getInstance();
    const listener = (isVisible: boolean, props?: LoadingProps) => {
      setVisible(isVisible);
      if (props) {
        setLoadingProps(props);
      }
    };

    manager.addListener(listener);
    return () => manager.removeListener(listener);
  }, []);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Loading {...loadingProps} />
      </View>
    </View>
  );
};

export const LoadingService = {
  show: (props?: LoadingProps) => LoadingManager.getInstance().show(props),
  hide: () => LoadingManager.getInstance().hide(),
};

export { LoadingService as Loading };
export default React.memo(Loading);