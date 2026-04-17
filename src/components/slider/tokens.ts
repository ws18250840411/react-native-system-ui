import { createComponentTokensHook } from '../../design-system/createComponentTokensHook'
import { type Foundations } from '../../design-system/tokens'
export interface SliderTokens {
  track: {
    height: number
    radius: number
  }
  thumb: {
    size: number
    indicatorSize: number
    elevation: number
  }
  colors: {
    active: string
    inactive: string
    thumbBackground: string
    thumbIndicator: string
  }
  spacing: {
    containerPaddingVertical: number
  }
  layout: {
    verticalMinHeight: number
    verticalWidth: number
  }
  states: {
    disabledOpacity: number
  }
}
const createSliderTokens = (foundations: Foundations): SliderTokens => {
  return {
    track: { height: 2, radius: foundations.radii.pill, },
    thumb: { size: foundations.spacing.lg + foundations.spacing.sm, indicatorSize: foundations.spacing.sm, elevation: 1, },
    colors: { active: foundations.palette.primary[500], inactive: foundations.palette.default[300], thumbBackground: '#ffffff', thumbIndicator: '#ffffff', },
    spacing: { containerPaddingVertical: foundations.spacing.md, },
    layout: { verticalMinHeight: 150, verticalWidth: 40, },
    states: { disabledOpacity: foundations.opacity.disabled, },
  }
}
export const useSliderTokens = createComponentTokensHook('slider', createSliderTokens)
