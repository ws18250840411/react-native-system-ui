import { I18nManager } from 'react-native';

export const getLabel = (props: any) =>
  props['aria-label'] || (typeof props.label === 'string' ? props.label : undefined);

export { mapDomPropsToRN } from './ariaToAccessibilityMap';
export { mergeProps } from '@react-aria/utils';

export const isRTL = (): any =>
  I18nManager.isRTL ?? (I18nManager as any).getConstants?.().isRTL;
