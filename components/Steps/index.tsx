import { View, Text } from 'react-native';
import { useTheme } from '../theme';
import { StepsProps, StepProps } from '../types';
import { getResponsiveSize } from '../utils';

export const Step: React.FC<StepProps> = ({
  title,
  description,
  status = 'wait',
  icon,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  
  const getStatusColor = () => {
    switch (status) {
      case 'finish':
        return theme.colors.success;
      case 'process':
        return theme.colors.primary;
      case 'error':
        return theme.colors.danger;
      default:
        return theme.colors.border;
    }
  };
  
  const getStatusIcon = () => {
    if (icon) return icon;
    
    switch (status) {
      case 'finish':
        return '✓';
      case 'error':
        return '✗';
      default:
        return null;
    }
  };
  
  const iconSize = 24 * responsiveSize;
  const iconContainerStyle = {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    backgroundColor: getStatusColor(),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: getStatusColor(),
  };
  
  const iconTextStyle = {
    fontSize: theme.fontSize.sm * responsiveSize,
    color: status === 'wait' ? theme.colors.text : theme.colors.background,
    fontWeight: 'bold' as const,
  };
  
  const titleStyle = {
    fontSize: theme.fontSize.md * responsiveSize,
    color: status === 'wait' ? theme.colors.textSecondary : theme.colors.text,
    fontWeight: status === 'process' ? 'bold' as const : 'normal' as const,
    marginTop: theme.spacing.xs * responsiveSize,
  };
  
  const descriptionStyle = {
    fontSize: theme.fontSize.sm * responsiveSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs * responsiveSize / 2,
  };
  
  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <View style={iconContainerStyle}>
        {getStatusIcon() ? (
          <Text style={iconTextStyle}>{getStatusIcon()}</Text>
        ) : (
          <View style={{
            width: 8 * responsiveSize,
            height: 8 * responsiveSize,
            borderRadius: 4 * responsiveSize,
            backgroundColor: status === 'wait' ? theme.colors.border : theme.colors.background,
          }} />
        )}
      </View>
      
      {title && <Text style={titleStyle}>{title}</Text>}
      {description && <Text style={descriptionStyle}>{description}</Text>}
      {children}
    </View>
  );
};

export const Steps: React.FC<StepsProps> = ({
  current = 0,
  direction = 'horizontal',
  size = 'medium',
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[];
  
  const renderConnector = (index: number) => {
    if (index === steps.length - 1) return null;
    
    const isActive = index < current;
    const connectorStyle = {
      backgroundColor: isActive ? theme.colors.primary : theme.colors.border,
    };
    
    if (direction === 'horizontal') {
      return (
        <View style={[
          {
            flex: 1,
            height: 2 * responsiveSize,
            marginHorizontal: theme.spacing.sm * responsiveSize,
          },
          connectorStyle,
        ]} />
      );
    } else {
      return (
        <View style={[
          {
            width: 2 * responsiveSize,
            height: theme.spacing.lg * responsiveSize,
            marginVertical: theme.spacing.sm * responsiveSize,
            alignSelf: 'center',
          },
          connectorStyle,
        ]} />
      );
    }
  };
  
  const containerStyle = {
    flexDirection: direction === 'horizontal' ? 'row' as const : 'column' as const,
    alignItems: direction === 'horizontal' ? 'center' as const : 'flex-start' as const,
  };
  
  return (
    <View style={[containerStyle, style]}>
      {steps.map((step, index) => {
        const stepStatus = index < current ? 'finish' : index === current ? 'process' : 'wait';
        
        return (
          <React.Fragment key={index}>
            {React.cloneElement(step, {
              ...step.props,
              status: step.props.status || stepStatus,
            })}
            {renderConnector(index)}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default Steps;