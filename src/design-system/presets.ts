import type { DeepPartial } from '../types'
import { createTokens, defaultTokens, type ThemeTokens } from './tokens'

const darkOverrides: DeepPartial<ThemeTokens> = {
  palette: {
    default: { 50: '#05070b', 100: '#0b0f16', 200: '#131a23', 300: '#1c2632', 400: '#263342', 500: '#35455a', 600: '#4b5d73', 700: '#5f758c', 800: '#7e91a7', 900: '#b2c1cf', foreground: '#f4f6fb' },
    primary: { 50: '#141632', 100: '#161c49', 200: '#152262', 300: '#162d88', 400: '#1d3ca6', 500: '#3055d8', 600: '#4c6ef5', 700: '#7d93ff', 800: '#a8b5ff', 900: '#d8e0ff', foreground: '#f6f8ff' },
    info: { 50: '#101a2c', 100: '#0f203e', 200: '#0d2a55', 300: '#12376f', 400: '#1d4d9a', 500: '#2a66c3', 600: '#3f86ec', 700: '#69a6ff', 800: '#99c3ff', 900: '#d7e6ff', foreground: '#f4f8ff' },
    success: { 50: '#07160f', 100: '#0b2416', 200: '#123221', 300: '#15452c', 400: '#1d5e3a', 500: '#27784a', 600: '#32a064', 700: '#5ac68f', 800: '#8adeb1', 900: '#c8f3d9', foreground: '#effff5' },
    warning: { 50: '#2e1405', 100: '#3b1b08', 200: '#52260c', 300: '#6b3311', 400: '#8a4416', 500: '#ab561c', 600: '#cc6a1f', 700: '#e78a3a', 800: '#f5a85f', 900: '#ffd9a8', foreground: '#ffffff' },
    danger: { 50: '#2d090e', 100: '#3a0d13', 200: '#50121c', 300: '#6a1a27', 400: '#882434', 500: '#a92c40', 600: '#cb3750', 700: '#ef4b63', 800: '#ff7d8f', 900: '#ffc6d0', foreground: '#fff5f6' },
  },
}

const auroraOverrides: DeepPartial<ThemeTokens> = {
  palette: {
    default: { 50: '#f4fbff', 100: '#e3f5ff', 200: '#d1eef9', 300: '#b8e1ef', 400: '#a2d1e2', 500: '#89bbcf', 600: '#6ba3b8', 700: '#508aa0', 800: '#3a6f84', 900: '#254a57', foreground: '#0b1d23' },
    primary: { 50: '#e8fbff', 100: '#c1f4ff', 200: '#96e7ff', 300: '#6bdbff', 400: '#40cfff', 500: '#18b8f2', 600: '#1296d3', 700: '#0d74ad', 800: '#095885', 900: '#053658' },
    success: { 50: '#f1fff6', 100: '#cff9e3', 200: '#a2f0ca', 300: '#75e4b1', 400: '#45d799', 500: '#1dbe80', 600: '#129c67', 700: '#097852', 800: '#05583b', 900: '#033427' },
  },
  radii: { sm: 8, md: 12, lg: 18 },
  typography: { fontFamily: 'System, "Helvetica Neue", "PingFang SC"', lineHeightMultiplier: 1.25 },
}

export const themePresets = {
  light: defaultTokens,
  dark: createTokens(darkOverrides),
  aurora: createTokens(auroraOverrides),
} as const

export type ThemePresetName = keyof typeof themePresets

export const getThemePreset = (name: ThemePresetName): ThemeTokens => themePresets[name]
