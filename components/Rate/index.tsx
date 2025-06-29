import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { RateProps } from '../types';
import { responsive } from '../utils';

export const Rate: React.FC<RateProps> = ({
  value = 0,
  count = 5,
  allowHalf = false,
  disabled = false,
  onChange,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = responsive(1);
  
  const handlePress = (index: number) => {
    if (disabled) return;
    
    const newValue = allowHalf ? index + 0.5 : index + 1;
    onChange?.(newValue);
  };
  
  const handleHalfPress = (index: number) => {
    if (disabled || !allowHalf) return;
    
    onChange?.(index + 0.5);
  };
  
  const renderStar = (index: number) => {
    const isFilled = value > index;
    const isHalfFilled = allowHalf && value > index && value < index + 1;
    
    const starSize = 20 * responsiveSize;
    const starColor = isFilled || isHalfFilled ? theme.colors.warning : theme.colors.border;
    
    const starStyle = {
      fontSize: starSize,
      color: starColor,
      lineHeight: starSize,
    };
    
    const containerStyle = {
      position: 'relative' as const,
      marginRight: theme.spacing.xs * responsiveSize,
    };
    
    return (
      <View key={index} style={containerStyle}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => handlePress(index)}
          style={{
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Text style={starStyle}>★</Text>
        </TouchableOpacity>
        
        {allowHalf && (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => handleHalfPress(index)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '50%',
              height: '100%',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            <View style={{
              overflow: 'hidden',
              width: '100%',
              height: '100%',
            }}>
              <Text style={[starStyle, {
                color: isHalfFilled ? theme.colors.warning : 'transparent',
              }]}>★</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  const containerStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  };
  
  return (
    <View style={[containerStyle, style]}>
      {Array.from({ length: count }, (_, index) => renderStar(index))}
      {children}
    </View>
  );
};

export default Rate;