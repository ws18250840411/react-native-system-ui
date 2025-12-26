import React from "react"
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions, type LayoutChangeEvent } from "react-native"
import { Checked, Close } from "react-native-system-icon"

import { useControllableValue } from "../../hooks"
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

const isTextLike = (node: React.ReactNode): node is string | number =>
  typeof node === "string" || typeof node === "number"

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
    onClickTab,
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
  const resolvedCloseable = closeable ?? true

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
  const [pendingPath, setPendingPath] = React.useState<CascaderValue[] | null>(null)
  const selectedValuesRef = React.useRef<CascaderValue[]>([])
  const window = useWindowDimensions()
  const [measuredWidth, setMeasuredWidth] = React.useState(0)

  const resolvedPath = React.useMemo(() => {
    const rows = resolveSelectedRows(options, keys, currentValue)
    const values = rows
      .map(row => row?.[keys.valueKey] as CascaderValue | undefined)
      .filter((v): v is CascaderValue => v !== undefined && v !== null)
    selectedValuesRef.current = values
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
      // 兼容类型：CascaderOption 约束 value 为必填，同时也支持 fieldNames 自定义 valueKey
      value: PENDING_VALUE as unknown as CascaderValue,
      text: loadingText,
      [keys.textKey]: loadingText,
      [keys.valueKey]: PENDING_VALUE,
      disabled: true,
    }
    return [...tabs, [loadingOption]]
  }, [keys.textKey, keys.valueKey, loadingText, pendingActive, pendingPath, tabs])

  // 对齐官方：当选中值变化时，自动将 activeTab 设置为 value.length（即下一个待选列）
  // 但如果用户刚手动点击了 tab，则不要自动覆盖
  React.useEffect(() => {
    if (tabChangeByUserRef.current) {
      // 用户刚点击了 tab，不要自动调整，但重置标记供下次使用
      tabChangeByUserRef.current = false
      return
    }
    // 根据当前选中值计算应该显示的 tab 索引
    let nextIndex = currentValue.length
    // 如果已经选满所有层级，停留在最后一列
    if (nextIndex >= displayTabs.length) {
      nextIndex = Math.max(displayTabs.length - 1, 0)
    }
    // 只在需要时更新，避免不必要的 setState 触发重渲染
    setActiveTab(prev => {
      if (prev === nextIndex) {
        return prev
      }
      return nextIndex
    })
    // 注意：不要把 activeTab 放进依赖，否则用户手动点击 tab 后会被该 effect 立刻“改回去”
  }, [currentValue.length, displayTabs.length])

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

  // 关闭弹层时清理占位，避免下次打开仍显示 loading 列。
  React.useEffect(() => {
    if (!popupVisible && pendingPath) {
      setPendingPath(null)
    }
  }, [popupVisible, pendingPath])

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
      // onClickTab: tabIndex + title（尽可能提供可读 title）
      const titleNode = items[index]?.[keys.textKey] as React.ReactNode
      const titleText =
        typeof titleNode === "string" || typeof titleNode === "number"
          ? String(titleNode)
          : placeholder
      onClickTab?.(index, titleText)
      onTabChange?.(index)
    },
    [currentValue, items, keys.textKey, onClickTab, onTabChange, placeholder],
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
        onChange?.(nextValue, rows)
      } else {
        setValue(nextValue, rows)
      }

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
        ? optionList.map((item, idx) => (
          <CascaderOptionItem
            key={String(item[keys.valueKey])}
            option={item}
            tabIndex={tabIndex}
            isLast={idx === optionList.length - 1}
            selected={selectedValuesRef.current[tabIndex] === item[keys.valueKey]}
            activeColor={activeColor}
            keys={keys}
            optionRender={optionRender}
            onSelect={handleSelect}
            tokens={tokens}
          />
        ))
        : <Text style={[styles.empty, { color: tokens.colors.placeholder }]}>{placeholder}</Text>}
    </ScrollView>
  )

  const renderTabs = () => {
    if (!displayTabs.length) return renderOptionsList([], 0)
    // 交给 Tabs 自身根据容器宽度决定是否能滑动（宽度为 0 时 Tabs 内部会自动不执行 scrollTo）
    const swipeableEnabled = !!swipeable
    // 关键：给 Tabs 一个确定的宽度，避免在 Popup/文档容器中布局阶段 width=0 导致无法 scrollTo 切换
    const resolvedTabsWidth = measuredWidth || window.width || undefined
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
          align="center"
          swipeable={swipeableEnabled}
          swipeThreshold={0}
          scrollable
          animated
          duration={300}
          color={activeColor}
          lineHeight={tokens.sizing.indicatorHeight}
          titleInactiveColor={tokens.colors.tabInactive}
          tabBarStyle={tabBarStyle}
          tabStyle={styles.tabsItem}
          titleStyle={styles.tabsTitle}
          contentStyle={!swipeableEnabled ? styles.tabsContentStatic : undefined}
        >
          {displayTabs.map((optionList, index) => {
            const selectedOption = items[index]
            const labelValue =
              pendingActive && index === displayTabs.length - 1
                ? loadingText
                : selectedOption
                  ? selectedOption[keys.textKey]
                  : placeholder
            // 关键：未选中的占位文案只在「非激活」时使用灰色，激活时让 Tabs 自己应用 activeColor，
            // 否则会出现“已切到下一列但标题仍是灰色，看起来像下划线没移动”的错觉。
            const titleNode =
              (labelValue === undefined || labelValue === null || labelValue === "")
                ? ((active: boolean) => (active ? placeholder : <Text style={{ color: tokens.colors.placeholder }}>{placeholder}</Text>))
                : typeof labelValue === "string" || typeof labelValue === "number"
                  ? ((active: boolean) => {
                    if (!selectedOption && !active) {
                      return <Text style={{ color: tokens.colors.placeholder }}>{String(labelValue)}</Text>
                    }
                    return String(labelValue)
                  })
                  : ((active: boolean) => (active ? placeholder : <Text style={{ color: tokens.colors.placeholder }}>{placeholder}</Text>))

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

  const inlineChildren = !poppable && typeof children !== "function" ? children : null

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
          {isTextLike(title) ? (
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
              {closeIcon ?? (
                <Close size={18} fill={tokens.colors.placeholder} color={tokens.colors.placeholder} />
              )}
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
    : (typeof children === "function" ? null : children ?? null)

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
        ? option.color ?? tokens.colors.optionActiveText
        : baseColor

    const content = optionRender
      ? optionRender({ option, selected })
      : isTextLike(label)
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
            borderColor: tokens.colors.divider,
            borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
          },
          pressed && !disabled ? { backgroundColor: tokens.colors.optionActiveBackground } : null,
        ]}
        onPress={() => onSelect(option, tabIndex)}
        disabled={disabled}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionLabel}>{content}</View>
          {selected ? (
            <Checked size={16} fill={activeColor} color={activeColor} />
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
    alignItems: "center",
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
