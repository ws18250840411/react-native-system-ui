import React, { useMemo, useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { IconProps } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { responsive } from '../utils';

// 内置图标映射
const iconMap: Record<string, string> = {
  // 基础图标
  'arrow-left': '←',
  'arrow-right': '→',
  'arrow-up': '↑',
  'arrow-down': '↓',
  'close': '×',
  'check': '✓',
  'plus': '+',
  'minus': '−',
  'search': '🔍',
  'home': '🏠',
  'user': '👤',
  'setting': '⚙️',
  'heart': '♡',
  'heart-filled': '♥',
  'star': '☆',
  'star-filled': '★',
  'location': '📍',
  'phone': '📞',
  'mail': '✉️',
  'camera': '📷',
  'image': '🖼️',
  'video': '🎥',
  'music': '🎵',
  'file': '📄',
  'folder': '📁',
  'download': '⬇️',
  'upload': '⬆️',
  'share': '📤',
  'edit': '✏️',
  'delete': '🗑️',
  'refresh': '🔄',
  'loading': '⏳',
  'warning': '⚠️',
  'error': '❌',
  'success': '✅',
  'info': 'ℹ️',
  'question': '❓',
  'lock': '🔒',
  'unlock': '🔓',
  'eye': '👁️',
  'eye-off': '🙈',
  'calendar': '📅',
  'clock': '🕐',
  'bookmark': '🔖',
  'tag': '🏷️',
  'filter': '🔽',
  'sort': '↕️',
  'menu': '☰',
  'more': '⋯',
  'dots': '⋮',
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color,
  onPress,
  style,
}) => {
  const theme = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const iconSize = responsive(size);
    const iconColor = color || theme.colors.text;

    const containerStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      width: iconSize,
      height: iconSize,
    };

    const iconStyle: TextStyle = {
      fontSize: iconSize * 0.8, // 图标稍小于容器
      color: iconColor,
      textAlign: 'center',
      lineHeight: iconSize,
    };

    return { containerStyle, iconStyle };
  }, [size, color, theme]);

  // 处理点击事件
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  // 获取图标字符
  const getIconChar = () => {
    return iconMap[name] || name;
  };

  // 渲染内容
  const renderContent = () => {
    if (children) {
      return children;
    }
    
    return (
      <Text style={styles.iconStyle}>
        {getIconChar()}
      </Text>
    );
  };

  // 如果有点击事件，使用TouchableOpacity包装
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, style]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // 否则直接渲染
  return (
    <Text style={[styles.iconStyle, style]}>
      {getIconChar()}
    </Text>
  );
};

export default React.memo(Icon);

// 导出图标名称列表
export const iconNames = Object.keys(iconMap);

// 导出图标映射
export { iconMap };