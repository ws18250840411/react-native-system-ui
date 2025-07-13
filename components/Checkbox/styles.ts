import { StyleSheet } from 'react-native';
import { Theme, Size } from '../types';
import { pt, getSizeValue } from '../theme/utils';

const getCheckboxDimensions = (size: Size) => {
  switch (size) {
    case 'sm':
      return { size: pt(16), iconSize: 10 };
    case 'lg':
      return { size: pt(24), iconSize: 16 };
    default: // md
      return { size: pt(20), iconSize: 14 };
  }
};

export const createCheckboxStyles = (theme: Theme, size: Size = 'md') => {
  const dimensions = getCheckboxDimensions(size);
  
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    containerReverse: {
      flexDirection: 'row-reverse',
    },
    
    checkbox: {
      width: dimensions.size,
      height: dimensions.size,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.sm,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    checkboxDisabled: {
      opacity: 0.5,
    },
    
    icon: {
      fontSize: dimensions.iconSize,
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