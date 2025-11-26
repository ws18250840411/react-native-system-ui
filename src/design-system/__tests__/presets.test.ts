import { defaultTokens } from '../tokens'
import { getThemePreset, themePresets } from '../presets'

describe('themePresets', () => {
  it('exposes light preset equal to default tokens', () => {
    expect(themePresets.light).toBe(defaultTokens)
  })

  it('provides a dark preset with night-friendly palette', () => {
    const dark = themePresets.dark

    expect(dark.palette.default[50]).toBe('#05070b')
    expect(dark.palette.default.foreground).toBe('#f4f6fb')
    expect(dark.palette.primary[600]).toBe('#4c6ef5')
  })

  it('provides a branded aurora preset with custom radii', () => {
    const aurora = themePresets.aurora

    expect(aurora.palette.primary[500]).toBe('#18b8f2')
    expect(aurora.radii.lg).toBe(18)
    expect(aurora.typography.lineHeightMultiplier).toBe(1.25)
  })

  it('allows lookup through helper', () => {
    expect(getThemePreset('dark')).toBe(themePresets.dark)
  })
})
