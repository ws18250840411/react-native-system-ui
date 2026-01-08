import React from "react"
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type PressableStateCallbackType,
} from "react-native"
import { Checked, Cross } from "react-native-system-icon"

import { useControllableValue } from "../../hooks"
import { isFunction, isNumber, isText } from "../../utils/validate"
import Popup from "../popup"
import Tabs from "../tabs"
import type { TabsValue } from "../tabs"
import type { TabsClickEvent } from "../tabs/types"
import { useCascaderTokens } from "./tokens"
import type {
  CascaderFieldNames,
  CascaderOption,
  CascaderProps,
  CascaderRenderProps,
  CascaderValue,
} from "./types"
import { useCascaderExtend } from "./useCascaderExtend"
import { resolveSelectedRows } from "./utils"

const DEFAULT_PLACEHOLDER = "请选择"

const getFieldKeys = (fieldNames?: CascaderFieldNames) => ({
  textKey: fieldNames?.text ?? "text",
  valueKey: fieldNames?.value ?? "value",
  childrenKey: fieldNames?.children ?? "children",
})

const Cascader: React.FC<CascaderProps> = props => {
  const { tokensOverride } = props
  const tokens = useCascaderTokens(tokensOverride)
  const [value, setValue] = useControllableValue<CascaderValue[]>(props, {
    defaultValue: [],
    trigger: "onChange",
  })

  const {
    options = [],
    title = DEFAULT_PLACEHOLDER,
    placeholder = DEFAULT_PLACEHOLDER,
    activeColor = tokens.colors.tabActive,
    fieldNames,
    optionRender,
    showHeader = true,
    closeable,
    closeIcon,
    onChange,
    onClose,
    onFinish,
    onClickTab,
    onTabChange,
    swipeable = true,
    style,
    testID,
    children,
    poppable = false,
    visible: _visible,
    defaultVisible: _defaultVisible,
    onVisibleChange: _onVisibleChange,
    closeOnClickOverlay = true,
    closeOnFinish = true,
    popupPlacement = "bottom",
    popupRound = true,
    popupProps: popupPropsOverrides,
    loadingText = "加载中...",
    ...rest
  } = props

  const keys = React.useMemo(() => getFieldKeys(fieldNames), [fieldNames])

  const cascaderValue = React.useMemo(() => (Array.isArray(value) ? value : []), [value])
  const [panelValue, setPanelValue] = React.useState<CascaderValue[]>(cascaderValue)
  const resolvedCloseable = closeable ?? true

  const [popupVisible, setPopupVisible] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: "visible",
    defaultValuePropName: "defaultVisible",
    trigger: "onVisibleChange",
  })

  const currentValue = poppable ? panelValue : cascaderValue
  const { tabs, items, depth } = useCascaderExtend(options, keys, currentValue)
  const window = useWindowDimensions()
  const [measuredWidth, setMeasuredWidth] = React.useState(0)

  const selectedRows = React.useMemo(() => resolveSelectedRows(options, keys, currentValue), [currentValue, keys, options])

  const selectedValues = React.useMemo(
    () =>
      selectedRows
        .map(row => row?.[keys.valueKey] as CascaderValue | undefined)
        .filter((v): v is CascaderValue => v !== undefined && v !== null),
    [keys.valueKey, selectedRows],
  )

  const confirmedRows = React.useMemo(
    () => resolveSelectedRows(options, keys, cascaderValue),
    [cascaderValue, keys, options],
  )

  const [activeTab, setActiveTab] = React.useState(0)

  React.useEffect(() => {
    let tabIndex = Array.isArray(currentValue) ? currentValue.length : 0
    if (tabIndex >= depth) tabIndex = Math.max(depth - 1, 0)
    setActiveTab(prev => (prev === tabIndex ? prev : tabIndex))
  }, [currentValue, depth])

  React.useEffect(() => {
    if (!poppable) {
      setPanelValue(cascaderValue)
      return
    }
    if (!popupVisible) {
      setPanelValue(cascaderValue)
    }
  }, [cascaderValue, poppable, popupVisible])

  const openPopup = React.useCallback(() => {
    if (!poppable || popupVisible) return
    setPanelValue(cascaderValue)
    setPopupVisible(true)
  }, [cascaderValue, poppable, popupVisible, setPopupVisible])

  const closePopup = React.useCallback(
    (notify?: boolean) => {
      if (!poppable || !popupVisible) return
      setPopupVisible(false)
      if (notify) onClose?.()
    },
    [onClose, poppable, popupVisible, setPopupVisible],
  )

  const togglePopup = React.useCallback(() => {
    if (!poppable) return
    popupVisible ? closePopup(true) : openPopup()
  }, [closePopup, openPopup, poppable, popupVisible])

  const renderProp = React.useMemo(() => (isFunction(children) ? (children as CascaderRenderProps) : null), [children])

  const handleClickTab = React.useCallback(
    (event: TabsClickEvent) => {
      const index = isNumber(event.index) ? event.index : Number(event.name)
      if (Number.isNaN(index)) return
      const titleNode = items[index]?.[keys.textKey] as React.ReactNode
      const titleText = isText(titleNode) ? String(titleNode) : placeholder
      onClickTab?.(index, titleText)
    },
    [items, keys.textKey, onClickTab, placeholder],
  )

  const handleTabChange = React.useCallback(
    (tabValue: TabsValue, indexFromEvent?: number) => {
      const index = isNumber(indexFromEvent) ? indexFromEvent : Number(tabValue)
      if (Number.isNaN(index)) return
      setActiveTab(index)
      onTabChange?.(index)
    },
    [onTabChange],
  )

  const handleSelect = React.useCallback(
    (option: CascaderOption, tabIndex: number) => {
      if (option.disabled) return
      const optionValue = option[keys.valueKey]
      if (optionValue === undefined || optionValue === null) return

      const base = (poppable ? panelValue : cascaderValue).slice(0, tabIndex)
      const nextValue = [...base, optionValue as CascaderValue]
      const rows = resolveSelectedRows(options, keys, nextValue)
      const childrenOptions = (option[keys.childrenKey] as CascaderOption[] | undefined) ?? []
      const hasChildrenProp = Object.prototype.hasOwnProperty.call(option, keys.childrenKey)
      const hasChildren = childrenOptions.length > 0
      const asyncBranch = hasChildrenProp && !hasChildren
      const reachDepth = nextValue.length >= depth
      const isLeaf = !hasChildren && !asyncBranch

      if (poppable) {
        setPanelValue(nextValue)
        onChange?.(nextValue, rows)
      } else {
        setValue(nextValue, rows)
      }

      if (isLeaf || reachDepth) {
        if (poppable) {
          setValue(nextValue, rows)
          if (closeOnFinish) closePopup(true)
        }
        onFinish?.(nextValue, rows)
      }
    },
    [
      cascaderValue,
      closeOnFinish,
      closePopup,
      depth,
      keys,
      onChange,
      onFinish,
      options,
      panelValue,
      poppable,
      setValue,
    ],
  )

  const getEmptyText = React.useCallback(
    (tabIndex: number) => {
      if (tabIndex <= 0) return placeholder
      const parent = items[tabIndex - 1]
      if (!parent) return placeholder
      const hasChildrenProp = Object.prototype.hasOwnProperty.call(parent, keys.childrenKey)
      if (!hasChildrenProp) return placeholder
      const children = (parent[keys.childrenKey] as CascaderOption[] | undefined) ?? []
      const asyncBranch = children.length === 0 && currentValue.length === tabIndex
      return asyncBranch ? loadingText : placeholder
    },
    [currentValue.length, items, keys.childrenKey, loadingText, placeholder],
  )

  const renderOptionsList = (optionList: CascaderOption[], tabIndex: number) => (
    <ScrollView
      style={[styles.optionList, { height: tokens.sizing.optionListHeight }]}
      contentContainerStyle={{
        paddingTop: tokens.spacing.optionListPaddingTop,
        paddingBottom: tokens.spacing.optionListPaddingBottom,
      }}
      showsVerticalScrollIndicator={false}
    >
      {optionList.length
        ? optionList.map((item, idx) => (
          <CascaderOptionItem
            key={String(item[keys.valueKey])}
            option={item}
            tabIndex={tabIndex}
            isLast={idx === optionList.length - 1}
            selected={selectedValues[tabIndex] === item[keys.valueKey]}
            activeColor={activeColor}
            keys={keys}
            optionRender={optionRender}
            onSelect={handleSelect}
            tokens={tokens}
          />
        ))
        : <Text style={[styles.empty, { color: tokens.colors.placeholder }]}>{getEmptyText(tabIndex)}</Text>}
    </ScrollView>
  )

  const renderTabs = () => {
    if (!tabs.length) return renderOptionsList([], 0)
    const swipeableEnabled = !!swipeable
    const resolvedTabsWidth = measuredWidth || window.width || undefined
    const tabBarStyle = [
      styles.tabsNav,
      {
        height: tokens.sizing.headerHeight,
        paddingHorizontal: tokens.spacing.tabNavPaddingHorizontal,
        paddingVertical: tokens.spacing.tabNavPaddingVertical,
        backgroundColor: tokens.colors.background,
      },
    ]

    return (
      <View
        style={styles.tabsWrapper}
        onLayout={(e: LayoutChangeEvent) => {
          const w = e.nativeEvent.layout.width
          if (w && w !== measuredWidth) setMeasuredWidth(w)
        }}
      >
        <Tabs
          style={resolvedTabsWidth ? { width: resolvedTabsWidth } : undefined}
          active={activeTab}
          onChange={handleTabChange}
          onClickTab={handleClickTab}
          align="center"
          swipeable={swipeableEnabled}
          swipeThreshold={0}
          scrollable
          animated
          duration={300}
          color={activeColor}
          lineHeight={tokens.sizing.indicatorHeight}
          titleActiveColor={tokens.colors.tabText}
          titleInactiveColor={tokens.colors.tabInactive}
          tabBarStyle={tabBarStyle}
          tabStyle={[styles.tabsItem, { paddingHorizontal: tokens.spacing.tabPaddingHorizontal }]}
          titleStyle={styles.tabsTitle}
          contentStyle={!swipeableEnabled ? styles.tabsContentStatic : undefined}
        >
          {tabs.map((optionList, index) => {
            const selectedOption = items[index]
            const labelValue = selectedOption?.[keys.textKey]
            const labelText =
              isText(labelValue) && String(labelValue) !== "" ? String(labelValue) : ""
            const unselected = !labelText
            const titleNode = (_active: boolean) => (
              <Text
                style={{
                  color: unselected ? tokens.colors.tabInactive : tokens.colors.tabText,
                  fontWeight: unselected ? "400" : "500",
                  includeFontPadding: false,
                }}
              >
                {unselected ? placeholder : labelText}
              </Text>
            )

            return (
              <Tabs.TabPane key={index} name={index} title={titleNode ?? placeholder}>
                {renderOptionsList(optionList, index)}
              </Tabs.TabPane>
            )
          })}
        </Tabs>
      </View>
    )
  }

  const inlineChildren = !poppable && !isFunction(children) ? children : null

  const content = (
    <View
      testID={testID}
      style={[styles.container, { backgroundColor: tokens.colors.background }, style]}
      {...rest}
    >
      {showHeader ? (
        <View
          style={[
            styles.header,
            {
              height: tokens.sizing.headerHeight,
              paddingHorizontal: tokens.spacing.headerPaddingHorizontal,
            },
          ]}
        >
          {isText(title) ? (
            <Text style={[styles.title, { color: tokens.colors.headerText }]}>{title}</Text>
          ) : (
            title
          )}
          {resolvedCloseable ? (
            <Pressable
              hitSlop={8}
              onPress={() => {
                if (poppable) {
                  closePopup(true)
                } else {
                  onClose?.()
                }
              }}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="关闭"
            >
              {closeIcon ??
                ((state: PressableStateCallbackType) => (
                  <Cross
                    size={tokens.sizing.closeIconSize}
                    fill={state.pressed ? tokens.colors.closeIconActive : tokens.colors.closeIcon}
                    color={state.pressed ? tokens.colors.closeIconActive : tokens.colors.closeIcon}
                  />
                ))}
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {renderTabs()}
      {inlineChildren ? (
        <View style={[styles.inlineChildren, { paddingHorizontal: tokens.spacing.headerPaddingHorizontal }]}>{inlineChildren}</View>
      ) : null}
    </View>
  )

  if (!poppable) return content

  const {
    closeOnOverlayPress: overrideCloseOnOverlayPress,
    overlay: popupOverlay,
    onOpen: popupOnOpen,
    onOpened: popupOnOpened,
    onClose: popupOnClose,
    onClosed: popupOnClosed,
    ...popupRestProps
  } = popupPropsOverrides ?? {}

  const resolvedOverlay = popupOverlay ?? true
  const resolvedCloseOnOverlayPress = overrideCloseOnOverlayPress ?? closeOnClickOverlay

  const cascaderActions = React.useMemo(
    () => ({
      open: openPopup,
      close: () => closePopup(true),
      toggle: togglePopup,
    }),
    [closePopup, openPopup, togglePopup],
  )

  const triggerNode = renderProp
    ? renderProp(cascaderValue, confirmedRows, cascaderActions)
    : (isFunction(children) ? null : children ?? null)

  return (
    <>
      {triggerNode}
      <Popup
        visible={popupVisible}
        placement={popupPlacement}
        round={popupRound}
        closeOnOverlayPress={resolvedCloseOnOverlayPress}
        overlay={resolvedOverlay}
        onOpen={popupOnOpen}
        onOpened={popupOnOpened}
        onClose={() => {
          popupOnClose?.()
          closePopup(true)
        }}
        onClosed={popupOnClosed}
        {...popupRestProps}
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {content}
      </Popup>
    </>
  )
}

const CascaderOptionItem = React.memo(
  ({
    option,
    tabIndex,
    isLast,
    selected,
    activeColor,
    keys,
    optionRender,
    onSelect,
    tokens,
  }: {
    option: CascaderOption
    tabIndex: number
    isLast: boolean
    selected: boolean
    activeColor: string
    keys: { textKey: string; valueKey: string; childrenKey: string }
    optionRender?: CascaderProps['optionRender']
    onSelect: (option: CascaderOption, tabIndex: number) => void
    tokens: any
  }) => {
    const optionValue = option[keys.valueKey]
    const label = option[keys.textKey]
    const disabled = !!option.disabled
    const baseColor = option.color ?? tokens.colors.optionText
    const textColor = disabled
      ? tokens.colors.optionDisabled
      : selected
        ? option.color ?? activeColor
        : baseColor

    const content = optionRender
      ? optionRender({ option, selected })
      : isText(label)
        ? (
          <Text style={[styles.optionText, selected && styles.optionTextActive, { color: textColor }]}>
            {label}
          </Text>
        )
        : label ?? null

    return (
      <Pressable
        testID={`cascader-option-${tabIndex}-${String(optionValue)}`}
        style={({ pressed }) => [
          styles.option,
          {
            minHeight: tokens.sizing.optionMinHeight,
            paddingVertical: tokens.spacing.optionPaddingVertical,
            paddingHorizontal: tokens.spacing.optionPaddingHorizontal,
          },
          pressed && !disabled ? { backgroundColor: tokens.colors.optionActiveBackground } : null,
        ]}
        onPress={() => onSelect(option, tabIndex)}
        disabled={disabled}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionLabel}>{content}</View>
          {selected ? (
            <Checked size={tokens.sizing.selectedIconSize} fill={activeColor} color={activeColor} />
          ) : null}
        </View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    includeFontPadding: false,
  },
  closeButton: {
    marginLeft: 8,
  },
  tabsNav: {
  },
  tabsWrapper: {
    width: "100%",
  },
  tabsContentStatic: {
    width: "100%",
  },
  tabsItem: {
    alignItems: "center",
  },
  tabsTitle: {
    fontSize: 14,
    includeFontPadding: false,
  },
  optionList: {
    flexGrow: 0,
  },
  option: {
    justifyContent: "center",
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
  optionTextActive: {
    fontWeight: "500",
  },
  optionLabel: {
    flex: 1,
    marginRight: 12,
  },
  empty: {
    textAlign: "center",
    paddingVertical: 24,
    fontSize: 14,
  },
  inlineChildren: {
    paddingVertical: 12,
  },
})

export default Cascader
