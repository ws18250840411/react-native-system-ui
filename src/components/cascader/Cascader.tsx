import React from "react"
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import { useControllableValue } from "../../hooks"
import { useCascaderTokens } from "./tokens"
import type { CascaderOption, CascaderProps, CascaderValue } from "./types"
import { useCascaderExtend } from "./useCascaderExtend"
import { resolveSelectedRows } from "./utils"

const DEFAULT_PLACEHOLDER = "请选择"

const Cascader: React.FC<CascaderProps> = props => {
  const tokens = useCascaderTokens()
  const [value, triggerChange] = useControllableValue<CascaderValue[]>(props, {
    defaultValue: [],
    trigger: "onChange",
  })

  const {
    options = [],
    title = "请选择",
    placeholder = DEFAULT_PLACEHOLDER,
    activeColor = tokens.colors.tabActive,
    fieldNames,
    optionRender,
    showHeader = true,
    onFinish,
    onTabChange,
    style,
    testID,
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

  const { tabs, items } = useCascaderExtend(options, keys, cascaderValue)

  const [activeTab, setActiveTab] = React.useState(() => Math.min(cascaderValue.length, Math.max(tabs.length - 1, 0)))

  React.useEffect(() => {
    const nextIndex = Math.min(cascaderValue.length, Math.max(tabs.length - 1, 0))
    if (nextIndex !== activeTab) {
      setActiveTab(nextIndex)
    }
  }, [activeTab, cascaderValue.length, tabs.length])

  const handleTabPress = React.useCallback(
    (tabIndex: number) => {
      setActiveTab(tabIndex)
      onTabChange?.(tabIndex)
    },
    [onTabChange],
  )

  const handleSelect = React.useCallback(
    (option: CascaderOption, tabIndex: number) => {
      if (option.disabled) {
        return
      }
      const optionValue = option[keys.valueKey]
      if (optionValue === undefined || optionValue === null) {
        return
      }
      const nextValue = cascaderValue.slice(0, tabIndex)
      nextValue[tabIndex] = optionValue as CascaderValue
      const resolved = resolveSelectedRows(options, keys, nextValue)
      triggerChange(nextValue, resolved)
      const children = (option[keys.childrenKey] as CascaderOption[] | undefined) ?? []
      if (!children.length) {
        onFinish?.(nextValue, resolved)
        return
      }
      setActiveTab(Math.min(tabIndex + 1, tabs.length))
    },
    [cascaderValue, keys, onFinish, options, tabs.length, triggerChange],
  )

  const currentOptions = tabs[activeTab] ?? []

  const renderOption = (option: CascaderOption) => {
    const optionValue = option[keys.valueKey]
    const label = option[keys.textKey]
    const selected = cascaderValue[activeTab] === optionValue
    const disabled = !!option.disabled
    const baseColor = option.color ?? tokens.colors.optionText
    const textColor = disabled ? tokens.colors.optionDisabled : selected ? option.color ?? tokens.colors.optionActiveText : baseColor
    const content = optionRender ? (
      optionRender({ option, selected })
    ) : (
      <Text
        style={[
          styles.optionText,
          { color: textColor },
        ]}
      >
        {label}
      </Text>
    )

    return (
      <Pressable
        key={String(optionValue)}
        testID={`cascader-option-${activeTab}-${String(optionValue)}`}
        style={[
          styles.option,
          {
            minHeight: tokens.sizing.optionMinHeight,
            paddingVertical: tokens.spacing.optionPaddingVertical,
            paddingHorizontal: tokens.spacing.optionPaddingHorizontal,
            borderColor: tokens.colors.divider,
            borderRadius: tokens.radii.option,
          },
          selected && { backgroundColor: tokens.colors.optionActiveBackground },
        ]}
        onPress={() => handleSelect(option, activeTab)}
        disabled={disabled}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionLabel}>{content}</View>
          {option.loading ? <ActivityIndicator size="small" color={activeColor} /> : null}
        </View>
      </Pressable>
    )
  }

  const renderTabs = () => (
    <View style={styles.tabBar}>
      {tabs.map((_, index) => {
        const selectedOption = items[index]
        const labelValue = selectedOption ? selectedOption[keys.textKey] : placeholder
        const label = typeof labelValue === "string" || typeof labelValue === "number" ? labelValue : placeholder
        const isActive = index === activeTab
        return (
          <Pressable
            key={index}
            testID={`cascader-tab-${index}`}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedOption ? tokens.colors.tabInactive : tokens.colors.placeholder },
                isActive && { color: tokens.colors.tabActive },
              ]}
            >
              {label ?? placeholder}
            </Text>
            <View
              style={[
                styles.tabIndicator,
                {
                  height: tokens.sizing.indicatorHeight,
                  backgroundColor: isActive ? activeColor : "transparent",
                },
              ]}
            />
          </Pressable>
        )
      })}
    </View>
  )

  return (
    <View testID={testID} style={[styles.container, { backgroundColor: tokens.colors.background, padding: tokens.spacing.padding }, style]} {...rest}>
      {showHeader ? (
        <Text style={[styles.title, { color: tokens.colors.headerText }]}>{title}</Text>
      ) : null}
      {renderTabs()}
      <ScrollView style={styles.optionList} showsVerticalScrollIndicator={false}>
        {currentOptions.length ? currentOptions.map(renderOption) : (
          <Text style={[styles.empty, { color: tokens.colors.placeholder }]}>{placeholder}</Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tab: {
    flex: 1,
  },
  activeTab: {},
  tabText: {
    textAlign: "center",
    fontSize: 14,
    paddingBottom: 6,
  },
  tabIndicator: {
    width: "100%",
    borderRadius: 2,
  },
  optionList: {
    maxHeight: 320,
  },
  option: {
    borderWidth: 1,
    marginBottom: 8,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 15,
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
})

export default Cascader
