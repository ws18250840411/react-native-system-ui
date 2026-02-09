import React, { useCallback, useMemo, useRef } from 'react'
import { Pressable, StyleSheet, View, type DimensionValue, type ViewStyle } from 'react-native'
import { useAriaPress } from '../../hooks'
import { createHairlineView } from '../../utils/hairline'
import { isFiniteNumber, isText, isValidNode } from '../../utils/validate'
import { renderTextOrNode } from '../../utils'
import Popup from '../popup'
import { useLocale } from '../config-provider/useLocale'
import type { ShareSheetOption, ShareSheetOptions, ShareSheetProps } from './types'
import { useShareSheetTokens, type ShareSheetTokens } from './tokens'

const no = (o?: ShareSheetOptions): ShareSheetOption[][] => { if (!o || o.length === 0) return []; if (Array.isArray(o[0])) return o as ShareSheetOption[][]; return [o as ShareSheetOption[]] }

const ShareSheetOptionItem: React.FC<{ option: ShareSheetOption; index: number; columns: number; tokens: ShareSheetTokens; onSelect: (option: ShareSheetOption, index: number) => void }> = React.memo(({ option: o, index: i, columns: cols, tokens: t, onSelect: os }) => {
  const ows: ViewStyle = { width: `${100 / cols}%` as DimensionValue }
  const is = { width: t.sizing.icon, height: t.sizing.icon }
  const p = useAriaPress({ onPress: () => os(o, i), extraProps: { accessibilityRole: 'menuitem' as any, accessibilityLabel: isText(o.name) ? String(o.name) : undefined, testID: `rv-share-sheet-item-${i}` } })
  const iconNode = isText(o.icon) ? renderTextOrNode(o.icon as string | number, []) : o.icon
  return <Pressable style={[S.o, ows]} {...p.interactionProps}><View style={[S.ic, is, { marginHorizontal: t.spacing.iconMarginHorizontal }]}>{iconNode}</View>{isValidNode(o.name) && renderTextOrNode(o.name, [S.ot, { color: t.colors.option, fontFamily: t.typography.fontFamily, fontSize: t.typography.option, paddingHorizontal: t.spacing.optionTextPaddingHorizontal }])}{isValidNode(o.description) && (isText(o.description) ? renderTextOrNode(o.description, [S.od, { color: t.colors.optionDesc, fontFamily: t.typography.fontFamily, marginTop: t.spacing.gap, fontSize: t.typography.optionDesc, paddingHorizontal: t.spacing.optionDescPaddingHorizontal }]) : <View style={[S.odn, { marginTop: t.spacing.gap, paddingHorizontal: t.spacing.optionDescPaddingHorizontal }]}>{o.description}</View>)}</Pressable>
})

const ShareSheetCancel: React.FC<{ cancelText: React.ReactNode; tokens: ShareSheetTokens; onPress: () => void }> = React.memo(({ cancelText: ct, tokens: t, onPress: op }) => {
  const cp = useAriaPress({ onPress: op, extraProps: { testID: 'rv-share-sheet-cancel', accessibilityRole: 'button' } })
  return <View style={{ backgroundColor: t.colors.divider }}><Pressable style={[S.c, { backgroundColor: t.colors.background, paddingVertical: t.spacing.cancelPaddingVertical, marginTop: t.spacing.cancelMarginTop }]} {...cp.interactionProps}>{renderTextOrNode(ct, [S.ct, { color: t.colors.option, fontFamily: t.typography.fontFamily, fontSize: t.typography.cancel }])}</Pressable></View>
})

const ShareSheetImpl: React.FC<ShareSheetProps> = p => {
  const locale = useLocale()
  const { visible, title, description, cancelText = locale?.vanShareSheet?.cancel ?? locale?.cancel ?? 'Cancel', options, columns = 4, closeOnSelect = true, safeAreaInsetBottom = true, children, tokensOverride, onSelect, onCancel, onClose, lockScroll = true, overlay = true, round = true, style: ps, placement: _p, position: _pos, ...pp } = p
  const t = useShareSheetTokens(tokensOverride)
  const gs = no(options)
  const rc = isFiniteNumber(columns) ? Math.max(1, Math.floor(columns)) : 4
  const ht = isValidNode(title)
  const hd = isValidNode(description)
  const hc = isValidNode(cancelText)
  const ocr = useRef(onCancel), ocrr = useRef(onClose), osr = useRef(onSelect)
  ocr.current = onCancel; ocrr.current = onClose; osr.current = onSelect
  const cl = useCallback((ic?: boolean) => { if (ic) ocr.current?.(); ocrr.current?.() }, [])
  const hs = useCallback((o: ShareSheetOption, i: number) => { osr.current?.(o, i); o.onPress?.(o); if (closeOnSelect) cl() }, [cl, closeOnSelect])
  const opc = useCallback(() => cl(true), [cl])
  const ws = [S.w, { backgroundColor: t.colors.background }]
  const grs = [S.or, { paddingLeft: t.spacing.gap, paddingVertical: 12 }]
  const gn = useMemo(() => { if (!gs.length) return null; let gi = 0; return gs.map((g, gidx) => <View key={gidx}>{gidx > 0 && <View style={createHairlineView({ position: 'top', color: t.colors.border, left: t.spacing.horizontal, right: t.spacing.horizontal })} />}<View style={grs}>{g.map(o => { const ci = gi++; return <ShareSheetOptionItem key={o.key ?? ci} option={o} index={ci} columns={rc} tokens={t} onSelect={hs} /> })}</View></View>) }, [gs, grs, hs, rc, t])
  const hn = useMemo(() => { if (!ht && !hd) return null; return <View style={[S.h, { paddingTop: t.spacing.headerPaddingTop, paddingHorizontal: t.spacing.headerPaddingHorizontal, paddingBottom: t.spacing.headerPaddingBottom }]}>{ht && (isText(title) ? renderTextOrNode(title, [S.t, { color: t.colors.title, fontFamily: t.typography.fontFamily, fontSize: t.typography.title, marginTop: t.spacing.titleMarginTop }]) : <View style={[S.n, { marginTop: t.spacing.nodeMarginTop }]}>{title}</View>)}{hd && (isText(description) ? renderTextOrNode(description, [S.d, { color: t.colors.description, fontFamily: t.typography.fontFamily, fontSize: t.typography.description, marginTop: t.spacing.descriptionMarginTop }]) : <View style={[S.n, { marginTop: t.spacing.nodeMarginTop }]}>{description}</View>)}</View> }, [description, hd, ht, title, t.colors.description, t.colors.title, t.spacing.descriptionMarginTop, t.spacing.headerPaddingBottom, t.spacing.headerPaddingHorizontal, t.spacing.headerPaddingTop, t.spacing.nodeMarginTop, t.spacing.titleMarginTop, t.typography.description, t.typography.fontFamily, t.typography.title])
  const psm = [{ padding: t.spacing.popupPadding }, ps]
  return <Popup {...pp} visible={visible} placement="bottom" round={round} safeAreaInsetBottom={safeAreaInsetBottom} overlay={overlay} lockScroll={lockScroll} onClose={opc} style={psm}><View accessibilityRole="menu" style={ws}>{hn}{gn}{children}{hc && <ShareSheetCancel cancelText={cancelText} tokens={t} onPress={opc} />}</View></Popup>
}

const S = StyleSheet.create({
  w: { width: '100%' },
  h: { alignItems: 'center' },
  t: { fontWeight: 'normal', textAlign: 'center' },
  d: { textAlign: 'center' },
  n: { alignItems: 'center' },
  or: { flexDirection: 'row', flexWrap: 'wrap' },
  o: { alignItems: 'center', justifyContent: 'center' },
  ic: { alignItems: 'center', justifyContent: 'center' },
  ot: { fontWeight: '500', textAlign: 'center' },
  od: { textAlign: 'center' },
  odn: { alignItems: 'center' },
  c: { alignItems: 'center' },
  ct: { fontWeight: '500' },
})

const ShareSheet = React.memo(ShareSheetImpl)
ShareSheet.displayName = 'ShareSheet'

export default ShareSheet
