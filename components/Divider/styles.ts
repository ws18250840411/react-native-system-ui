import { StyleSheet } from 'react-native';
import { Theme } from '../types';
import { pt } from '../theme/utils';

export const createDividerStyles = (theme: Theme, orientation: 'horizontal' | 'vertical' = 'horizontal', thickness: number = 1) => {
  return StyleSheet.create({
    horizontal: {
      height: thickness,
      width: '100%',
    },
    
    vertical: {
      width: thickness,
      height: '100%',
    },
    
    containerWithText: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    
    containerLeft: {
      justifyContent: 'flex-start',
    },
    
    containerRight: {
      justifyContent: 'flex-end',
    },
    
    lineWithText: {
      flex: 1,
      height: thickness,
    },
    
    lineHidden: {
      flex: 0,
      width: 0,
    },
    
    text: {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.textSecondary,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
  });
};