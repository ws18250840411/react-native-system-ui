import { StyleSheet } from 'react-native';
import { Theme, Size } from '../types';
import { pt, getSizeValue } from '../theme/utils';

const getRadioDimensions = (size: Size) => {
  switch (size) {
    case 'sm':
      return { size: pt(16), dotSize: pt(8) };
    case 'lg':
      return { size: pt(24), dotSize: pt(12) };
    default: // md
      return { size: pt(20), dotSize: pt(10) };
  }
};

export const createRadioStyles = (theme: Theme, size: Size = 'md') => {
  const dimensions = getRadioDimensions(size);
  
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    containerReverse: {
      flexDirection: 'row-reverse',
    },
    
    radio: {
      width: dimensions.size,
      height: dimensions.size,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: dimensions.size / 2,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    radioDisabled: {
      opacity: 0.5,
    },
    
    dot: {
      width: dimensions.dotSize,
      height: dimensions.dotSize,
      borderRadius: dimensions.dotSize / 2,
    },
    
    dotHidden: {
      opacity: 0,
    },
    
    label: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      flex: 1,
    },
    
    labelDisabled: {
      color: theme.colors.textSecondary,
    },
  });
};