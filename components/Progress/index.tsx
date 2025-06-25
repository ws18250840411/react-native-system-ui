import { View, Text } from 'react-native';
import { useTheme } from '../theme';
import { ProgressProps } from '../types';
import { getResponsiveSize } from '../utils';

export const Progress: React.FC<ProgressProps> = ({
  percent,
  showInfo = true,
  status = 'normal',
  strokeWidth = 8,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  
  // 确保百分比在0-100之间
  const normalizedPercent = Math.max(0, Math.min(100, percent));
  
  // 根据状态获取颜色
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.danger;
      default:
        return theme.colors.primary;
    }
  };
  
  const progressBarStyle = {
    height: strokeWidth * responsiveSize,
    backgroundColor: theme.colors.border,
    borderRadius: strokeWidth * responsiveSize / 2,
    overflow: 'hidden' as const,
  };
  
  const progressFillStyle = {
    height: '100%',
    width: `${normalizedPercent}%`,
    backgroundColor: getStatusColor(),
    borderRadius: strokeWidth * responsiveSize / 2,
  };
  
  const containerStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.sm * responsiveSize,
  };
  
  const textStyle = {
    fontSize: theme.fontSize.sm * responsiveSize,
    color: theme.colors.text,
    minWidth: 40 * responsiveSize,
    textAlign: 'right' as const,
  };
  
  return (
    <View style={[containerStyle, style]}>
      <View style={{ flex: 1 }}>
        <View style={progressBarStyle}>
          <View style={progressFillStyle} />
        </View>
      </View>
      {showInfo && (
        <Text style={textStyle}>
          {status === 'success' ? '✓' : `${Math.round(normalizedPercent)}%`}
        </Text>
      )}
      {children}
    </View>
  );
};

export default Progress;