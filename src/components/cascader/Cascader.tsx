import React from "react"
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import { useControllableValue } from "../../hooks"
import { useCascaderTokens } from "./tokens"
import type {
  CascaderOption,
  CascaderProps,
  CascaderRenderProps,
  CascaderValue,
} from "./types"
import { useCascaderExtend } from "./useCascaderExtend"
import { resolveSelectedRows } from "./utils"
import Popup from "../popup"
import Icon from "../icon"
import Tabs from "../tabs"
import type { TabsValue } from "../tabs"

const DEFAULT_PLACEHOLDER = "请选择"

const Cascader: React.FC<CascaderProps> = props => {
  const tokens = useCascaderTokens()
  const [value, commitValue] = useControllableValue<CascaderValue[]>(props, {
    defaultValue: [],
    trigger: "__cascaderCommit",
  })

  const {
    options = [],
    title = "请选择",
    placeholder = DEFAULT_PLACEHOLDER,
    activeColor = tokens.colors.tabActive,
    fieldNames,
    optionRender,
    showHeader = true,
    closeable,
    closeIcon,
    onClose,
    onChange,
    onFinish,
    onTabChange,
    swipeable = false,
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
    ...rest
  } = props

  const keys = React.useMemo(
    () => ({
      textKey: fieldNames?.text ?? "text",
      valueKey: fieldNames?.value ?? "value",
      childrenKey: fieldNames?.children ?? "children",
    }),
    [fieldNames],
  )

  const cascaderValue = React.useMemo(() => (Array.isArray(value) ? value : []), [value])
  const [panelValue, setPanelValue] = React.useState<CascaderValue[]>(cascaderValue)
  const resolvedCloseable = closeable ?? poppable

  const currentValue = poppable ? panelValue : cascaderValue
  const { tabs, items } = useCascaderExtend(options, keys, currentValue)
  const panelSelectedRows = React.useMemo(
    () => resolveSelectedRows(options, keys, currentValue),
    [currentValue, keys, options]
  )
  const confirmedRows = React.useMemo(
    () => resolveSelectedRows(options, keys, cascaderValue),
    [cascaderValue, keys, options]
  )

  const emitChange = React.useCallback(
    (nextValue: CascaderValue[], rows: CascaderOption[], commit: boolean) => {
      onChange?.(nextValue, rows)
      if (commit) {
        commitValue(nextValue, rows)
      }
    },
    [commitValue, onChange],
  )

  const [activeTab, setActiveTab] = React.useState(() => Math.min(cascaderValue.length, Math.max(tabs.length - 1, 0)))
  const tabChangeByUserRef = React.useRef(false)

  React.useEffect(() => {
    const nextIndex = Math.min(currentValue.length, Math.max(tabs.length - 1, 0))
    const wasUserTriggered = tabChangeByUserRef.current
    setActiveTab(prev => {
      if (prev > nextIndex) {
        return nextIndex
      }
      if (!wasUserTriggered && prev < nextIndex) {
        return nextIndex
      }
      return prev
    })
    tabChangeByUserRef.current = false
  }, [currentValue.length, tabs.length])

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
      if (notify) {
        onClose?.()
      }
    },
    [onClose, poppable, popupVisible, setPopupVisible]
  )

  const togglePopup = React.useCallback(() => {
    if (!poppable) return
    if (popupVisible) {
      closePopup(true)
    } else {
      openPopup()
    }
  }, [closePopup, openPopup, poppable, popupVisible])

  const renderProp = React.useMemo(
    () => (typeof children === "function" ? (children as CascaderRenderProps) : null),
    [children]
  )

  const handleTabChange = React.useCallback(
    (tabValue: TabsValue) => {
      const index = typeof tabValue === "number" ? tabValue : Number(tabValue)
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
      if (option.disabled) {
        return
      }
      const optionValue = option[keys.valueKey]
      if (optionValue === undefined || optionValue === null) {
        return
      }
      const current = (poppable ? panelValue : cascaderValue).slice(0, tabIndex)
      const nextValue = [...current, optionValue as CascaderValue]
      const resolved = resolveSelectedRows(options, keys, nextValue)
      const childrenOptions = (option[keys.childrenKey] as CascaderOption[] | undefined) ?? []
      const isLeaf = !childrenOptions.length

      if (poppable) {
        setPanelValue(nextValue)
      }

      const shouldCommit = !poppable || isLeaf
      emitChange(nextValue, resolved, shouldCommit)

      if (isLeaf) {
        onFinish?.(nextValue, resolved)
        if (poppable && closeOnFinish) {
          closePopup(true)
        }
      }
    },
    [cascaderValue, closeOnFinish, closePopup, emitChange, keys, onFinish, options, panelValue, poppable],
  )

  const renderOption = (option: CascaderOption, tabIndex: number, isLast: boolean) => {
    const optionValue = option[keys.valueKey]
    const label = option[keys.textKey]
    const selected = currentValue[tabIndex] === optionValue
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
      <Text
        style={[
          styles.optionText,
          selected ? styles.optionTextActive : null,
          { color: textColor },
        ]}
      >
        {label}
      </Text>
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
          {option.loading ? (
            <ActivityIndicator size="small" color={activeColor} />
          ) : selected ? (
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
      {optionList.length ? (
        optionList.map((item, index) => renderOption(item, tabIndex, index === optionList.length - 1))
      ) : (
        <Text style={[styles.empty, { color: tokens.colors.placeholder }]}>{placeholder}</Text>
      )}
    </ScrollView>
  )

  const renderTabs = () => {
    if (!tabs.length) {
      return renderOptionsList([], 0)
    }
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
      <Tabs
        active={activeTab}
        onChange={handleTabChange}
        swipeable={swipeable}
        swipeThreshold={0}
        scrollable={false}
        animated
        color={activeColor}
        tabBarStyle={tabBarStyle}
        tabStyle={styles.tabsItem}
        titleStyle={styles.tabsTitle}
      >
        {tabs.map((optionList, index) => {
          const selectedOption = items[index]
          const labelValue = selectedOption ? selectedOption[keys.textKey] : placeholder
          let titleNode: React.ReactNode = labelValue
          if (typeof labelValue === "string" || typeof labelValue === "number") {
            titleNode = (
              <Text style={!selectedOption ? { color: tokens.colors.placeholder } : undefined}>
                {labelValue || placeholder}
              </Text>
            )
          } else if (!labelValue) {
            titleNode = <Text style={{ color: tokens.colors.placeholder }}>{placeholder}</Text>
          }
          return (
            <Tabs.TabPane key={index} name={index} title={titleNode ?? placeholder}>
              {renderOptionsList(optionList, index)}
            </Tabs.TabPane>
          )
        })}
      </Tabs>
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
        <View style={[styles.inlineChildren, { paddingHorizontal: tokens.spacing.padding }]}>
          {inlineChildren}
        </View>
      ) : null}
    </View>
  )

  if (!poppable) {
    return content
  }

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
    [closePopup, openPopup, togglePopup]
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
        onOpen={() => {
          popupOnOpen?.()
        }}
        onOpened={() => {
          popupOnOpened?.()
        }}
        onClose={() => {
          popupOnClose?.()
          closePopup(true)
        }}
        onClosed={() => {
          popupOnClosed?.()
        }}
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
