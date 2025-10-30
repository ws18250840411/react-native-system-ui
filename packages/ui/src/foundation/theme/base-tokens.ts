export type DesignTokens = {
  space_1: number;
  space_2: number;
  space_3: number;
  space_4: number;
  space_6: number;
  border_radius_xs: number;
  border_radius_s: number;
  border_radius_m: number;
  border_radius_xl: number;
  border_radius_max: number;
  font_size_1: number;
  font_size_2: number;
  font_size_3: number;
  font_size_4: number;
  font_size_5: number;
  font_size_7: number;
  line_height_1: number;
  line_height_2: number;
  line_height_3: number;
  line_height_4: number;
  opacity_10: number;
  opacity_40: number;
  opacity_60: number;
  opacity_70: number;
  brand_6: string;
  gray_1: string;
  gray_2: string;
  gray_3: string;
  gray_4: string;
  gray_5: string;
  gray_6: string;
  gray_7: string;
  gray_8: string;
  green_6: string;
  red_6: string;
  white: string;
  yellow_6: string;
};

/**
 * Baseline design tokens derived from the original Xiaoshu defaults.
 * Values are tuned to provide sensible defaults while keeping the
 * semantics identical to the upstream package.
 */
const TOKENS: DesignTokens = {
  space_1: 4,
  space_2: 8,
  space_3: 12,
  space_4: 16,
  space_6: 24,
  border_radius_xs: 4,
  border_radius_s: 8,
  border_radius_m: 12,
  border_radius_xl: 24,
  border_radius_max: 999,
  font_size_1: 12,
  font_size_2: 14,
  font_size_3: 16,
  font_size_4: 18,
  font_size_5: 20,
  font_size_7: 28,
  line_height_1: 16,
  line_height_2: 20,
  line_height_3: 24,
  line_height_4: 28,
  opacity_10: 0.1,
  opacity_40: 0.4,
  opacity_60: 0.6,
  opacity_70: 0.7,
  brand_6: '#2563EB',
  gray_1: '#F9FAFB',
  gray_2: '#F3F4F6',
  gray_3: '#E5E7EB',
  gray_4: '#D1D5DB',
  gray_5: '#9CA3AF',
  gray_6: '#6B7280',
  gray_7: '#4B5563',
  gray_8: '#374151',
  green_6: '#10B981',
  red_6: '#EF4444',
  white: '#FFFFFF',
  yellow_6: '#F59E0B',
};

export default TOKENS;
