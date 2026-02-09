import React, { memo, type ReactElement } from 'react'
import { View, StyleSheet, type StyleProp, type ViewStyle, type ViewProps } from 'react-native'
import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'

export interface SwiperPagIndicatorTokens { colors: { active: string; inactive: string }; sizing: { dotSizeActive: number; dotSizeInactive: number }; spacing: { dotMargin: number }; offset: { horizontalBottom: number; verticalRight: number }; layer: { zIndex: number; elevation: number } }

const createSwiperPagIndicatorTokens = (f: Foundations): SwiperPagIndicatorTokens => ({ colors: { active: f.palette.primary.foreground ?? '#ffffff', inactive: 'rgba(255,255,255,0.5)' }, sizing: { dotSizeActive: 8, dotSizeInactive: 6 }, spacing: { dotMargin: f.spacing.xs }, offset: { horizontalBottom: f.spacing.lg, verticalRight: f.spacing.lg }, layer: { zIndex: 10, elevation: 10 } })

export const useSwiperPagIndicatorTokens = createComponentTokensHook('swiperPagIndicator', createSwiperPagIndicatorTokens)

export interface SwiperPagIndicatorProps extends ViewProps { total: number; current: number; vertical?: boolean; style?: StyleProp<ViewStyle>; activeColor?: string; inactiveColor?: string; tokensOverride?: DeepPartial<SwiperPagIndicatorTokens> }

const SwiperPagIndicator = memo<SwiperPagIndicatorProps>(({ total, current, vertical = false, style, activeColor, inactiveColor, tokensOverride, ...rest }) => { const tokens = useSwiperPagIndicatorTokens(tokensOverride); const dots: ReactElement[] = []; const ac = activeColor || tokens.colors.active; const ic = inactiveColor || tokens.colors.inactive; const posStyle = vertical ? [S.cv, { right: tokens.offset.verticalRight }] : [S.ch, { bottom: tokens.offset.horizontalBottom }]; for (let i = 0; i < total; i++) { const a = current === i; const sz = a ? tokens.sizing.dotSizeActive : tokens.sizing.dotSizeInactive; dots.push(<View key={i} style={{ marginHorizontal: tokens.spacing.dotMargin, marginVertical: tokens.spacing.dotMargin, backgroundColor: a ? ac : ic, width: sz, height: sz, borderRadius: sz / 2 }} />) }; return <View style={[S.c, { zIndex: tokens.layer.zIndex, elevation: tokens.layer.elevation }, posStyle, style]} {...rest}>{dots}</View>
})

const S = StyleSheet.create({ c: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, ch: { position: 'absolute', left: 0, right: 0 }, cv: { position: 'absolute', top: 0, bottom: 0, flexDirection: 'column' } })
export default SwiperPagIndicator
