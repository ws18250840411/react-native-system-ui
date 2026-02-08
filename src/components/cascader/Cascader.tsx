import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlatList, Pressable, Text, View, useWindowDimensions, type LayoutChangeEvent, type PressableStateCallbackType } from "react-native"
import { Checked, Cross } from "react-native-system-icon"
import { useControllableValue } from "../../hooks"
import { shallowEqualArray, renderTextOrNode } from "../../utils"
import { isFunction, isNumber, isText } from "../../utils/validate"
import Popup from "../popup"
import Tabs from "../tabs"
import type { TabsValue } from "../tabs"
import type { TabsClickEvent } from "../tabs/types"
import { useLocale } from "../config-provider/useLocale"
import { useCascaderTokens } from "./tokens"
import type { CascaderFieldNames, CascaderOption, CascaderProps, CascaderRenderProps, CascaderTokens, CascaderValue } from "./types"
import { useCascaderExtend } from "./useCascaderExtend"

type FieldKeys = { textKey: string; valueKey: string; childrenKey: string }
const getFieldKeys = (fieldNames?: CascaderFieldNames) => ({ textKey: fieldNames?.text ?? "text", valueKey: fieldNames?.value ?? "value", childrenKey: fieldNames?.children ?? "children" })
const resolveRows = (options: CascaderOption[] = [], keys: FieldKeys, values: CascaderValue[]): CascaderOption[] => {
  const selected: CascaderOption[] = []
  let current: CascaderOption[] | undefined = options
  values.forEach(val => {
    if (!current || !current.length) return
    const matched = current.find(o => o[keys.valueKey] === val)
    if (matched) { selected.push(matched); current = (matched[keys.childrenKey] as CascaderOption[] | undefined) ?? [] }
  })
  return selected
}

const CascaderImpl: React.FC<CascaderProps> = props => {
  const { tokensOverride, options = [], title, placeholder, activeColor, fieldNames, optionRender, showHeader, closeable, closeIcon, onChange, onClose, onFinish, onClickTab, onTabChange, swipeable, style, testID, children, poppable, visible: _visible, defaultVisible: _defaultVisible, onVisibleChange: _onVisibleChange, closeOnClickOverlay, closeOnFinish, popupPlacement, popupRound, popupProps, loadingText, ...rest } = props
  const locale = useLocale()
  const tokens = useCascaderTokens(tokensOverride)
  const resolvedTitle = title ?? (locale?.vanCascader?.placeholder ?? tokens.defaults.title)
  const resolvedPlaceholder = placeholder ?? (locale?.vanCascader?.placeholder ?? tokens.defaults.placeholder)
  const resolvedActiveColor = activeColor ?? tokens.colors.tabActive
  const resolvedShowHeader = showHeader ?? tokens.defaults.showHeader
  const resolvedSwipeable = swipeable ?? tokens.defaults.swipeable
  const resolvedPoppable = poppable ?? tokens.defaults.poppable
  const resolvedCloseOnClickOverlay = closeOnClickOverlay ?? tokens.defaults.closeOnClickOverlay
  const resolvedCloseOnFinish = closeOnFinish ?? tokens.defaults.closeOnFinish
  const resolvedPopupPlacement = popupPlacement ?? tokens.defaults.popupPlacement
  const resolvedPopupRound = popupRound ?? tokens.defaults.popupRound
  const resolvedLoadingText = loadingText ?? tokens.defaults.loadingText
  const [value, setValue] = useControllableValue<CascaderValue[]>(props, { defaultValue: [], trigger: "onChange" })
  const keys = getFieldKeys(fieldNames)
  const currentValue = Array.isArray(value) ? value : []
  const [pendingValue, setPendingValue] = useState<CascaderValue[]>(currentValue)
  const showClose = closeable ?? tokens.defaults.closeable
  const [popupVisible, setPopupVisible] = useControllableValue<boolean>(props, { defaultValue: false, valuePropName: "visible", defaultValuePropName: "defaultVisible", trigger: "onVisibleChange" })
  const current = resolvedPoppable ? pendingValue : currentValue
  const { tabs, items, depth } = useCascaderExtend(options, keys, current)
  const { width: windowWidth } = useWindowDimensions()
  const [measuredWidth, setMeasuredWidth] = useState(0)
  const handleTabsLayout = useCallback((e: LayoutChangeEvent) => { const width = e.nativeEvent.layout.width; if (!width) return; setMeasuredWidth(prev => (prev === width ? prev : width)) }, [])
  const currentRows = resolveRows(options, keys, currentValue)
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => { const currentLength = Array.isArray(current) ? current.length : 0; let tabIndex = currentLength; if (tabIndex >= depth) tabIndex = Math.max(depth - 1, 0); setActiveTab(prev => (prev === tabIndex ? prev : tabIndex)) }, [current.length, depth])
  useEffect(() => { if (!resolvedPoppable || !popupVisible) setPendingValue(prev => (shallowEqualArray(prev, currentValue) ? prev : currentValue)) }, [currentValue, resolvedPoppable, popupVisible])
  const openPopup = useCallback(() => { if (!resolvedPoppable || popupVisible) return; setPendingValue(prev => (shallowEqualArray(prev, currentValue) ? prev : currentValue)); setPopupVisible(true) }, [currentValue, resolvedPoppable, popupVisible, setPopupVisible])
  const onCloseRef = useRef(onClose), onChangeRef = useRef(onChange), onFinishRef = useRef(onFinish), onClickTabRef = useRef(onClickTab), onTabChangeRef = useRef(onTabChange)
  onCloseRef.current = onClose; onChangeRef.current = onChange; onFinishRef.current = onFinish; onClickTabRef.current = onClickTab; onTabChangeRef.current = onTabChange
  const closePopup = useCallback((notify?: boolean) => { if (!resolvedPoppable || !popupVisible) return; setPopupVisible(false); if (notify) onCloseRef.current?.() }, [resolvedPoppable, popupVisible, setPopupVisible])
  const togglePopup = useCallback(() => { if (!resolvedPoppable) return; popupVisible ? closePopup(true) : openPopup() }, [closePopup, openPopup, resolvedPoppable, popupVisible])
  const isRenderProps = isFunction(children)
  const renderProps = isRenderProps ? (children as CascaderRenderProps) : null
  const handleClickTab = useCallback((e: TabsClickEvent) => { const index = isNumber(e.index) ? e.index : Number(e.name); if (Number.isNaN(index)) return; const tabName = items[index]?.[keys.textKey] as React.ReactNode; const tabText = isText(tabName) ? String(tabName) : resolvedPlaceholder; onClickTabRef.current?.(index, tabText) }, [items, keys.textKey, resolvedPlaceholder])
  const handleTabChange = useCallback((tabValue: TabsValue, indexExplicit?: number) => { const index = isNumber(indexExplicit) ? indexExplicit : Number(tabValue); if (Number.isNaN(index)) return; setActiveTab(index); onTabChangeRef.current?.(index) }, [])
  const handleSelect = useCallback((option: CascaderOption, tabIndex: number) => {
    if (option.disabled) return
    const optionValue = option[keys.valueKey]
    if (optionValue == null) return
    const base = (resolvedPoppable ? pendingValue : currentValue).slice(0, tabIndex)
    const nextValue = [...base, optionValue as CascaderValue]
    const rows = resolveRows(options, keys, nextValue)
    const children = (option[keys.childrenKey] as CascaderOption[] | undefined) ?? []
    const hasChildrenProp = Object.prototype.hasOwnProperty.call(option, keys.childrenKey)
    const hasChildren = children.length > 0
    const isAsync = hasChildrenProp && !hasChildren
    const reachedDepth = nextValue.length >= depth
    const isLeaf = !hasChildren && !isAsync
    if (resolvedPoppable) { setPendingValue(nextValue); onChangeRef.current?.(nextValue, rows) } else setValue(nextValue, rows)
    if (isLeaf || reachedDepth) { if (resolvedPoppable) { setValue(nextValue, rows); if (resolvedCloseOnFinish) closePopup(true) } onFinishRef.current?.(nextValue, rows) }
  }, [currentValue, resolvedCloseOnFinish, closePopup, depth, keys, options, pendingValue, resolvedPoppable, setValue])
  const getEmptyText = useCallback((tabIndex: number) => { if (tabIndex <= 0) return resolvedPlaceholder; const parent = items[tabIndex - 1]; if (!parent) return resolvedPlaceholder; const hasChildrenProp = Object.prototype.hasOwnProperty.call(parent, keys.childrenKey); if (!hasChildrenProp) return resolvedPlaceholder; const children = (parent[keys.childrenKey] as CascaderOption[] | undefined) ?? []; const isAsync = children.length === 0 && current.length === tabIndex; return isAsync ? resolvedLoadingText : resolvedPlaceholder }, [current.length, items, keys.childrenKey, resolvedLoadingText, resolvedPlaceholder])
  const renderTabs = () => {
    if (!tabs.length) return <CascaderOptionList optionList={[]} tabIndex={0} selectedValue={current[0]} activeColor={resolvedActiveColor} keys={keys} optionRender={optionRender} onSelect={handleSelect} tokens={tokens} emptyText={getEmptyText(0)} />
    const swipeEnabled = !!resolvedSwipeable
    const renderTabsWidth = measuredWidth || windowWidth || undefined
    const tabBarStyle = { height: tokens.sizing.headerHeight, paddingHorizontal: tokens.spacing.tabNavPaddingHorizontal, paddingVertical: tokens.spacing.tabNavPaddingVertical, backgroundColor: tokens.colors.background }
    return <View style={tokens.layout.tabsWrapper} onLayout={handleTabsLayout}><Tabs style={renderTabsWidth ? { width: renderTabsWidth } : undefined} active={activeTab} onChange={handleTabChange} onClickTab={handleClickTab} align="center" swipeable={swipeEnabled} swipeThreshold={0} scrollable animated duration={300} color={resolvedActiveColor} lineHeight={tokens.sizing.indicatorHeight} titleActiveColor={tokens.colors.tabText} titleInactiveColor={tokens.colors.tabInactive} tabBarStyle={tabBarStyle} tabStyle={[tokens.layout.tabsItem, { paddingHorizontal: tokens.spacing.tabPaddingHorizontal }]} titleStyle={[tokens.layout.tabsTitle, { fontSize: tokens.typography.tabsTitleSize }]} contentStyle={!swipeEnabled ? tokens.layout.tabsContentStatic : undefined}>{tabs.map((optionList, i) => { const selectedOption = items[i]; const labelValue = selectedOption?.[keys.textKey]; const label = isText(labelValue) ? String(labelValue) : ""; const usePlaceholder = !label; const titleNode = (_: boolean) => <Text style={[tokens.layout.tabTitleNode, { color: usePlaceholder ? tokens.colors.tabInactive : tokens.colors.tabText, fontWeight: usePlaceholder ? tokens.typography.tabTitlePlaceholderWeight : tokens.typography.tabTitleWeight }]}>{usePlaceholder ? resolvedPlaceholder : label}</Text>; return <Tabs.TabPane key={i} name={i} title={titleNode}><CascaderOptionList optionList={optionList} tabIndex={i} selectedValue={current[i]} activeColor={resolvedActiveColor} keys={keys} optionRender={optionRender} onSelect={handleSelect} tokens={tokens} emptyText={getEmptyText(i)} /></Tabs.TabPane> })}</Tabs></View>
  }
  const inlineChildren = !resolvedPoppable && !isRenderProps ? children : null
  const content = <View testID={testID} style={[tokens.layout.container, { backgroundColor: tokens.colors.background }, style]} {...rest}>{resolvedShowHeader ? <View style={[tokens.layout.header, { height: tokens.sizing.headerHeight, paddingHorizontal: tokens.spacing.headerPaddingHorizontal }]}>{renderTextOrNode(resolvedTitle, [tokens.layout.title, { color: tokens.colors.headerText, fontSize: tokens.typography.titleSize, fontWeight: tokens.typography.titleWeight }])}{showClose ? <Pressable hitSlop={8} onPress={() => { if (resolvedPoppable) closePopup(true); else onCloseRef.current?.() }} style={[tokens.layout.closeButton, { marginLeft: tokens.spacing.closeButtonMarginLeft }]} accessibilityRole="button" accessibilityLabel={locale?.vanCascader?.close ?? 'Close'}>{closeIcon ?? ((state: PressableStateCallbackType) => <Cross size={tokens.sizing.closeIconSize} fill={state.pressed ? tokens.colors.closeIconActive : tokens.colors.closeIcon} color={state.pressed ? tokens.colors.closeIconActive : tokens.colors.closeIcon} />)}</Pressable> : null}</View> : null}{renderTabs()}{inlineChildren ? <View style={[tokens.layout.inlineChildren, { paddingVertical: tokens.spacing.inlineChildrenPaddingVertical, paddingHorizontal: tokens.spacing.headerPaddingHorizontal }]}>{inlineChildren}</View> : null}</View>
  if (!resolvedPoppable) return content
  const { closeOnOverlayPress: overlayCloseOnPress, overlay: popupOverlay, onOpen: popupOnOpen, onOpened: popupOnOpened, onClose: popupOnClose, onClosed: popupOnClosed, ...popupRestProps } = popupProps ?? {}
  const renderOverlay = popupOverlay ?? true
  const renderCloseOnPress = overlayCloseOnPress ?? resolvedCloseOnClickOverlay
  const popupOnCloseRef = useRef(popupOnClose)
  popupOnCloseRef.current = popupOnClose
  const handlePopupClose = useCallback(() => { popupOnCloseRef.current?.(); closePopup(true) }, [closePopup])
  const controlActions = { open: openPopup, close: () => closePopup(true), toggle: togglePopup }
  const enhanceTriggerNode = useCallback((node: React.ReactNode) => { if (!React.isValidElement(node)) return node; const props = node.props as { onPress?: () => void; onClick?: () => void }; const handlePress = () => { props.onPress?.(); props.onClick?.(); openPopup() }; return React.cloneElement(node as React.ReactElement<Record<string, unknown>>, { onPress: handlePress, onClick: handlePress }) }, [openPopup])
  const triggerNode = renderProps ? renderProps(currentValue, currentRows, controlActions) : (isRenderProps ? null : children || null)
  const renderTriggerNode = enhanceTriggerNode(triggerNode)
  return <>{renderTriggerNode}<Popup visible={popupVisible} placement={resolvedPopupPlacement} round={resolvedPopupRound} closeOnOverlayPress={renderCloseOnPress} overlay={renderOverlay} safeAreaInsetTop={popupRestProps?.safeAreaInsetTop != null ? popupRestProps.safeAreaInsetTop : resolvedShowHeader && showClose} safeAreaInsetBottom={popupRestProps?.safeAreaInsetBottom != null ? popupRestProps.safeAreaInsetBottom : resolvedPopupPlacement === 'bottom'} onOpen={popupOnOpen} onOpened={popupOnOpened} onClose={handlePopupClose} onClosed={popupOnClosed} {...popupRestProps} style={{ paddingLeft: 0, paddingRight: 0 }}>{content}</Popup></>
}

const CascaderOptionItem = React.memo(({ option, tabIndex, selected, activeColor, keys, optionRender, onSelect, tokens }: { option: CascaderOption; tabIndex: number; selected: boolean; activeColor: string; keys: FieldKeys; optionRender?: CascaderProps['optionRender']; onSelect: (option: CascaderOption, tabIndex: number) => void; tokens: CascaderTokens }) => {
  const optionValue = option[keys.valueKey]
  const label = option[keys.textKey]
  const disabled = !!option.disabled
  const baseColor = option.color ?? tokens.colors.optionText
  const textColor = disabled ? tokens.colors.optionDisabled : selected ? option.color ?? activeColor : baseColor
  const optionTextStyle = [tokens.layout.optionText, { color: textColor, fontSize: tokens.typography.optionTextSize }, selected ? { fontWeight: tokens.typography.optionTextActiveWeight } : null]
  const content = optionRender ? optionRender({ option, selected }) : renderTextOrNode(label as React.ReactNode, optionTextStyle as any)
  return <Pressable testID={`cascader-option-${tabIndex}-${String(optionValue)}`} style={({ pressed }) => [tokens.layout.option, { minHeight: tokens.sizing.optionMinHeight, paddingVertical: tokens.spacing.optionPaddingVertical, paddingHorizontal: tokens.spacing.optionPaddingHorizontal }, pressed && !disabled && { backgroundColor: tokens.colors.optionActiveBackground }]} onPress={() => onSelect(option, tabIndex)} disabled={disabled}><View style={tokens.layout.optionContent}><View style={[tokens.layout.optionLabel, { marginRight: tokens.spacing.optionLabelMarginRight }]}>{content}</View>{selected ? <Checked size={tokens.sizing.selectedIconSize} fill={activeColor} color={activeColor} /> : null}</View></Pressable>
})

const CascaderOptionList = React.memo(({ optionList, tabIndex, selectedValue, activeColor, keys, optionRender, onSelect, tokens, emptyText }: { optionList: CascaderOption[]; tabIndex: number; selectedValue?: CascaderValue; activeColor: string; keys: FieldKeys; optionRender?: CascaderProps['optionRender']; onSelect: (option: CascaderOption, tabIndex: number) => void; tokens: CascaderTokens; emptyText: string }) => {
  const renderItem = useCallback(({ item }: { item: CascaderOption }) => <CascaderOptionItem option={item} tabIndex={tabIndex} selected={selectedValue === item[keys.valueKey]} activeColor={activeColor} keys={keys} optionRender={optionRender} onSelect={onSelect} tokens={tokens} />, [activeColor, keys, onSelect, optionRender, selectedValue, tabIndex, tokens])
  const keyExtractor = useCallback((item: CascaderOption) => String(item[keys.valueKey]), [keys.valueKey])
  if (!optionList.length) return <View style={[tokens.layout.optionList, { height: tokens.sizing.optionListHeight }]}><Text style={[tokens.layout.empty, { color: tokens.colors.placeholder, paddingVertical: tokens.spacing.emptyPaddingVertical, fontSize: tokens.typography.emptyTextSize }]}>{emptyText}</Text></View>
  return <FlatList data={optionList} style={[tokens.layout.optionList, { height: tokens.sizing.optionListHeight }]} contentContainerStyle={{ paddingTop: tokens.spacing.optionListPaddingTop, paddingBottom: tokens.spacing.optionListPaddingBottom }} showsVerticalScrollIndicator={false} renderItem={renderItem} keyExtractor={keyExtractor} removeClippedSubviews initialNumToRender={20} windowSize={5} />
})

const Cascader = React.memo(CascaderImpl)
Cascader.displayName = 'Cascader'
export default Cascader
