import React from "react"
import { Pressable, ScrollView, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native"

import { useControllableValue } from "../../hooks"
import Icon from "../icon"
import Popup from "../popup"
import Tabs from "../tabs"
import type { TabsValue } from "../tabs"
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
const PENDING_VALUE = "__cascader_pending__"

const getFieldKeys = (fieldNames?: CascaderFieldNames) => ({
  textKey: fieldNames?.text ?? "text",
  valueKey: fieldNames?.value ?? "value",
  childrenKey: fieldNames?.children ?? "children",
})

const Cascader: React.FC<CascaderProps> = props => {
  const tokens = useCascaderTokens()
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
    onTabChange,
    swipeable = true,
    style,
    testID,
    children,
    poppable = false,
    visible: popupVisibleProp,
    defaultVisible: popupDefaultVisible,
    onVisibleChange,
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
  const resolvedCloseable = closeable ?? poppable

  const popupVisibilityProps: Record<string, any> = {}
  if (Object.prototype.hasOwnProperty.call(props, "visible")) {
    popupVisibilityProps.value = popupVisibleProp
  }
  if (Object.prototype.hasOwnProperty.call(props, "defaultVisible")) {
    popupVisibilityProps.defaultValue = popupDefaultVisible
  }
  if (typeof onVisibleChange === "function") {
    popupVisibilityProps.onChange = onVisibleChange
  }
  const [popupVisible, setPopupVisible] = useControllableValue<boolean>(popupVisibilityProps, { defaultValue: false })

  const currentValue = poppable ? panelValue : cascaderValue
  const { tabs, items, depth } = useCascaderExtend(options, keys, currentValue)
  const [tabsWidth, setTabsWidth] = React.useState(0)
  const [pendingPath, setPendingPath] = React.useState<CascaderValue[] | null>(null)

  const resolvedPath = React.useMemo(() => {
    const rows = resolveSelectedRows(options, keys, currentValue)
    const values = rows
      .map(row => row?.[keys.valueKey] as CascaderValue | undefined)
      .filter((v): v is CascaderValue => v !== undefined && v !== null)
    return { rows, values }
  }, [currentValue, keys, options])

  const confirmedRows = React.useMemo(
    () => resolveSelectedRows(options, keys, cascaderValue),
    [cascaderValue, keys, options],
  )

  const [activeTab, setActiveTab] = React.useState(() =>
    Math.min(resolvedPath.values.length, Math.max(tabs.length - 1, 0)),
  )
  const tabChangeByUserRef = React.useRef(false)

  const pendingActive = React.useMemo(() => {
    if (!pendingPath) return false
    const match = pendingPath.every((v, i) => currentValue[i] === v)
    return match && tabs.length <= pendingPath.length
  }, [currentValue, pendingPath, tabs.length])

  const displayTabs = React.useMemo(() => {
    if (!pendingActive || !pendingPath) return tabs
    const loadingOption: CascaderOption = {
      [keys.textKey]: loadingText,
      [keys.valueKey]: PENDING_VALUE,
      disabled: true,
    }
    return [...tabs, [loadingOption]]
  }, [keys.textKey, keys.valueKey, loadingText, pendingActive, pendingPath, tabs])

  React.useEffect(() => {
    const totalTabs = pendingActive && pendingPath ? Math.max(displayTabs.length, pendingPath.length + 1) : displayTabs.length
    const nextIndex = Math.min(resolvedPath.values.length, Math.max(totalTabs - 1, 0))
    const userTriggered = tabChangeByUserRef.current
    setActiveTab(prev => {
      if (prev > nextIndex) return nextIndex
      if (!userTriggered && prev < nextIndex) return nextIndex
      return prev
    })
    tabChangeByUserRef.current = false
  }, [displayTabs.length, pendingActive, pendingPath, resolvedPath.values.length])

  React.useEffect(() => {
    if (!pendingPath) return
    const pathStillMatch = pendingPath.every((v, i) => currentValue[i] === v)
    const hasMoreTabs = tabs.length > pendingPath.length
    if (!pathStillMatch || hasMoreTabs) {
      setPendingPath(null)
      return
    }
    // options 更新后：如果已填充子级或找不到节点，也清理 pending
    const rows = resolveSelectedRows(options, keys, pendingPath)
    const matched = rows.length === pendingPath.length
    const last = rows[rows.length - 1]
    const children = (last?.[keys.childrenKey] as CascaderOption[] | undefined) ?? []
    if (!matched || children.length > 0) {
      setPendingPath(null)
    }
  }, [currentValue, keys, options, pendingPath, tabs.length])

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

  const renderProp = React.useMemo(() => (typeof children === "function" ? (children as CascaderRenderProps) : null), [children])

  const handleTabChange = React.useCallback(
    (tabValue: TabsValue, indexFromEvent?: number) => {
      const index = typeof indexFromEvent === "number" ? indexFromEvent : Number(tabValue)
      if (Number.isNaN(index)) return
      tabChangeByUserRef.current = true
      setActiveTab(index)
      onTabChange?.(index)
    },
    [onTabChange],
  )

  const handleSelect = React.useCallback(
    (option: CascaderOption, tabIndex: number) => {
      tabChangeByUserRef.current = false
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
      } else {
        setValue(nextValue, rows)
      }

      // 与 React Vant 对齐：每次选择都触发 onChange
      onChange?.(nextValue, rows)

      if (asyncBranch) {
        setPendingPath(nextValue)
        setActiveTab(tabIndex + 1)
        return
      }

      if (isLeaf || reachDepth) {
        // 最终提交一次
        if (poppable) {
          setValue(nextValue, rows)
          if (closeOnFinish) closePopup(true)
        }
        onFinish?.(nextValue, rows)
      } else {
        setPendingPath(null)
        setActiveTab(tabIndex + 1)
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

  const renderOption = (option: CascaderOption, tabIndex: number, isLast: boolean) => {
    const optionValue = option[keys.valueKey]
    const label = option[keys.textKey]
      const selected = resolvedPath.values[tabIndex] === optionValue
    const disabled = !!option.disabled
    const baseColor = option.color ?? tokens.colors.optionText
    const textColor = disabled
      ? tokens.colors.optionDisabled
      : selected
        ? option.color ?? tokens.colors.optionActiveText
        : baseColor

    const content = optionRender ? (
      optionRender({ option, selected })
    ) : (
      <Text style={[styles.optionText, selected && styles.optionTextActive, { color: textColor }]}>{label}</Text>
    )

    return (
      <Pressable
        key={String(optionValue)}
        testID={`cascader-option-${tabIndex}-${String(optionValue)}`}
        style={({ pressed }) => [
          styles.option,
          {
            minHeight: tokens.sizing.optionMinHeight,
            paddingVertical: tokens.spacing.optionPaddingVertical,
            paddingHorizontal: tokens.spacing.optionPaddingHorizontal,
            borderColor: tokens.colors.divider,
            borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
          },
          pressed && !disabled ? { backgroundColor: tokens.colors.optionActiveBackground } : null,
        ]}
        onPress={() => handleSelect(option, tabIndex)}
        disabled={disabled}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionLabel}>{content}</View>
          {selected ? (
            <Icon name="check" size={16} color={activeColor} />
          ) : null}
        </View>
      </Pressable>
    )
  }

  const renderOptionsList = (optionList: CascaderOption[], tabIndex: number) => (
    <ScrollView
      style={[styles.optionList, { height: tokens.sizing.optionListHeight }]}
      contentContainerStyle={{
        paddingTop: tokens.spacing.optionListPaddingTop,
        paddingBottom: tokens.spacing.optionPaddingVertical,
      }}
      showsVerticalScrollIndicator={false}
    >
      {optionList.length
        ? optionList.map((item, idx) => renderOption(item, tabIndex, idx === optionList.length - 1))
        : <Text style={[styles.empty, { color: tokens.colors.placeholder }]}>{placeholder}</Text>}
    </ScrollView>
  )

  const handleTabsLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    if (width && width !== tabsWidth) {
      setTabsWidth(width)
    }
  }, [tabsWidth])

  const renderTabs = () => {
    if (!displayTabs.length) return renderOptionsList([], 0)
    const swipeableEnabled = swipeable && tabsWidth > 0
    const tabBarStyle = [
      styles.tabsNav,
      {
        paddingHorizontal: tokens.spacing.padding,
        paddingBottom: tokens.spacing.tabGap,
        borderColor: tokens.colors.divider,
        backgroundColor: tokens.colors.background,
      },
    ]

    return (
      <View onLayout={handleTabsLayout} style={styles.tabsWrapper}>
        <Tabs
          active={activeTab}
          onChange={handleTabChange}
          align="start"
          swipeable={swipeableEnabled}
          swipeThreshold={0}
          scrollable={false}
          animated
          duration={300}
          color={activeColor}
          lineHeight={tokens.sizing.indicatorHeight}
          titleInactiveColor={tokens.colors.tabInactive}
          tabBarStyle={tabBarStyle}
          tabStyle={styles.tabsItem}
          titleStyle={styles.tabsTitle}
          contentStyle={!swipeableEnabled ? styles.tabsContentStatic : undefined}
          contentContainerStyle={!swipeableEnabled ? styles.tabsContentStatic : undefined}
        >
          {displayTabs.map((optionList, index) => {
            const selectedOption = items[index]
            const labelValue = selectedOption ? selectedOption[keys.textKey] : placeholder
            const titleNode = (labelValue === undefined || labelValue === null || labelValue === "")
              ? <Text style={{ color: tokens.colors.placeholder }}>{placeholder}</Text>
              : typeof labelValue === "string" || typeof labelValue === "number"
                ? (
                  <Text style={!selectedOption ? { color: tokens.colors.placeholder } : undefined}>
                    {labelValue}
                  </Text>
                )
                : labelValue

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

  const inlineChildren = !poppable && !renderProp ? children : null

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
              paddingHorizontal: tokens.spacing.padding,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: tokens.colors.divider,
            },
          ]}
        >
          {typeof title === "string" ? (
            <Text style={[styles.title, { color: tokens.colors.headerText }]}>{title}</Text>
          ) : (
            title
          )}
          {resolvedCloseable && poppable ? (
            <Pressable
              hitSlop={8}
              onPress={() => closePopup(true)}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="关闭"
            >
              {closeIcon ?? <Icon name="close" size={18} color={tokens.colors.placeholder} />}
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {renderTabs()}
      {inlineChildren ? (
        <View style={[styles.inlineChildren, { paddingHorizontal: tokens.spacing.padding }]}>{inlineChildren}</View>
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
    : children ?? null

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
      >
        {content}
      </Popup>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
    paddingVertical: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  tabsNav: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabsWrapper: {
    width: "100%",
  },
  tabsContentStatic: {
    width: "100%",
  },
  tabsItem: {
    alignItems: "flex-start",
  },
  tabsTitle: {
    fontSize: 15,
    fontWeight: "600",
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
    fontSize: 15,
  },
  optionTextActive: {
    fontWeight: "600",
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
