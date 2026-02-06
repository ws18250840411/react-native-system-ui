import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  FlatList,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type PressableStateCallbackType,
} from "react-native"
import { Checked, Cross } from "react-native-system-icon"

import { useControllableValue } from "../../hooks"
import { shallowEqualArray } from "../../utils"
import { isFunction, isNumber, isRenderable, isText } from "../../utils/validate"
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
  CascaderTokens,
  CascaderValue,
} from "./types"
import { useCascaderExtend } from "./useCascaderExtend"

type FieldKeys = {
  textKey: string
  valueKey: string
  childrenKey: string
}

const getFieldKeys = (fieldNames?: CascaderFieldNames) => ({
  textKey: fieldNames?.text ?? "text",
  valueKey: fieldNames?.value ?? "value",
  childrenKey: fieldNames?.children ?? "children",
})

const resolveSelectedRows = (
  options: CascaderOption[] = [],
  keys: { textKey: string; valueKey: string; childrenKey: string },
  value: CascaderValue[],
): CascaderOption[] => {
  const selected: CascaderOption[] = []
  let current: CascaderOption[] | undefined = options
  value.forEach(val => {
    if (!current || !current.length) return
    const match = current.find(option => option[keys.valueKey] === val)
    if (match) {
      selected.push(match)
      current = (match[keys.childrenKey] as CascaderOption[] | undefined) ?? []
    }
  })
  return selected
}

const Cascader: React.FC<CascaderProps> = props => {
  const {
    tokensOverride,
    options = [],
    title: titleProp,
    placeholder: placeholderProp,
    activeColor: activeColorProp,
    fieldNames,
    optionRender,
    showHeader: showHeaderProp,
    closeable,
    closeIcon,
    onChange,
    onClose,
    onFinish,
    onClickTab,
    onTabChange,
    swipeable: swipeableProp,
    style,
    testID,
    children,
    poppable: poppableProp,
    visible: _visible,
    defaultVisible: _defaultVisible,
    onVisibleChange: _onVisibleChange,
    closeOnClickOverlay: closeOnClickOverlayProp,
    closeOnFinish: closeOnFinishProp,
    popupPlacement: popupPlacementProp,
    popupRound: popupRoundProp,
    popupProps: popupPropsOverrides,
    loadingText: loadingTextProp,
    ...rest
  } = props

  const tokens = useCascaderTokens(tokensOverride)
  const title = titleProp ?? tokens.defaults.title
  const placeholder = placeholderProp ?? tokens.defaults.placeholder
  const activeColor = activeColorProp ?? tokens.colors.tabActive
  const showHeader = showHeaderProp ?? tokens.defaults.showHeader
  const swipeable = swipeableProp ?? tokens.defaults.swipeable
  const poppable = poppableProp ?? tokens.defaults.poppable
  const closeOnClickOverlay = closeOnClickOverlayProp ?? tokens.defaults.closeOnClickOverlay
  const closeOnFinish = closeOnFinishProp ?? tokens.defaults.closeOnFinish
  const popupPlacement = popupPlacementProp ?? tokens.defaults.popupPlacement
  const popupRound = popupRoundProp ?? tokens.defaults.popupRound
  const loadingText = loadingTextProp ?? tokens.defaults.loadingText

  const [value, setValue] = useControllableValue<CascaderValue[]>(props, {
    defaultValue: [],
    trigger: "onChange",
  })

  const keys = getFieldKeys(fieldNames)

  const cascaderValue = Array.isArray(value) ? value : []
  const [panelValue, setPanelValue] = useState<CascaderValue[]>(cascaderValue)
  const resolvedCloseable = closeable ?? tokens.defaults.closeable

  const [popupVisible, setPopupVisible] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: "visible",
    defaultValuePropName: "defaultVisible",
    trigger: "onVisibleChange",
  })

  const currentValue = poppable ? panelValue : cascaderValue
  const { tabs, items, depth } = useCascaderExtend(options, keys, currentValue)
  const { width: windowWidth } = useWindowDimensions()
  const [measuredWidth, setMeasuredWidth] = useState(0)

  const handleTabsLayout = useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width
    if (!width) return
    setMeasuredWidth(prev => (prev === width ? prev : width))
  }, [])

  const confirmedRows = resolveSelectedRows(options, keys, cascaderValue)

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const currentLength = Array.isArray(currentValue) ? currentValue.length : 0
    let tabIndex = currentLength
    if (tabIndex >= depth) tabIndex = Math.max(depth - 1, 0)
    setActiveTab(prev => (prev === tabIndex ? prev : tabIndex))
  }, [currentValue.length, depth])

  useEffect(() => {
    if (!poppable || !popupVisible) {
      setPanelValue(prev => (shallowEqualArray(prev, cascaderValue) ? prev : cascaderValue))
    }
  }, [cascaderValue, poppable, popupVisible])

  const openPopup = useCallback(() => {
    if (!poppable || popupVisible) return
    setPanelValue(prev => (shallowEqualArray(prev, cascaderValue) ? prev : cascaderValue))
    setPopupVisible(true)
  }, [cascaderValue, poppable, popupVisible, setPopupVisible])

  const closePopup = useCallback(
    (notify?: boolean) => {
      if (!poppable || !popupVisible) return
      setPopupVisible(false)
      if (notify) onClose?.()
    },
    [onClose, poppable, popupVisible, setPopupVisible],
  )

  const togglePopup = useCallback(() => {
    if (!poppable) return
    popupVisible ? closePopup(true) : openPopup()
  }, [closePopup, openPopup, poppable, popupVisible])

  const isRenderProp = isFunction(children)
  const renderProp = isRenderProp ? (children as CascaderRenderProps) : null

  const handleClickTab = useCallback(
    (event: TabsClickEvent) => {
      const index = isNumber(event.index) ? event.index : Number(event.name)
      if (Number.isNaN(index)) return
      const titleNode = items[index]?.[keys.textKey] as React.ReactNode
      const titleText = isText(titleNode) ? String(titleNode) : placeholder
      onClickTab?.(index, titleText)
    },
    [items, keys.textKey, onClickTab, placeholder],
  )

  const handleTabChange = useCallback(
    (tabValue: TabsValue, indexFromEvent?: number) => {
      const index = isNumber(indexFromEvent) ? indexFromEvent : Number(tabValue)
      if (Number.isNaN(index)) return
      setActiveTab(index)
      onTabChange?.(index)
    },
    [onTabChange],
  )

  const handleSelect = useCallback(
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

  const getEmptyText = useCallback(
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

  const renderTabs = () => {
    if (!tabs.length) {
      return (
        <CascaderOptionList
          optionList={[]}
          tabIndex={0}
          selectedValue={currentValue[0]}
          activeColor={activeColor}
          keys={keys}
          optionRender={optionRender}
          onSelect={handleSelect}
          tokens={tokens}
          emptyText={getEmptyText(0)}
        />
      )
    }
    const swipeableEnabled = !!swipeable
    const resolvedTabsWidth = measuredWidth || windowWidth || undefined
    const tabBarStyle = {
      height: tokens.sizing.headerHeight,
      paddingHorizontal: tokens.spacing.tabNavPaddingHorizontal,
      paddingVertical: tokens.spacing.tabNavPaddingVertical,
      backgroundColor: tokens.colors.background,
    }

    return (
      <View style={tokens.layout.tabsWrapper} onLayout={handleTabsLayout}>
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
          tabStyle={[tokens.layout.tabsItem, { paddingHorizontal: tokens.spacing.tabPaddingHorizontal }]}
          titleStyle={[tokens.layout.tabsTitle, { fontSize: tokens.typography.tabsTitleSize }]}
          contentStyle={!swipeableEnabled ? tokens.layout.tabsContentStatic : undefined}
        >
          {tabs.map((optionList, index) => {
            const selectedOption = items[index]
            const labelValue = selectedOption?.[keys.textKey]
            const labelText = isText(labelValue) ? String(labelValue) : ""
            const unselected = !labelText
            const titleNode = (_active: boolean) => (
              <Text
                style={[
                  tokens.layout.tabTitleNode,
                  {
                    color: unselected ? tokens.colors.tabInactive : tokens.colors.tabText,
                    fontWeight: unselected
                      ? tokens.typography.tabTitlePlaceholderWeight
                      : tokens.typography.tabTitleWeight,
                  },
                ]}
              >
                {unselected ? placeholder : labelText}
              </Text>
            )

            return (
              <Tabs.TabPane key={index} name={index} title={titleNode}>
                <CascaderOptionList
                  optionList={optionList}
                  tabIndex={index}
                  selectedValue={currentValue[index]}
                  activeColor={activeColor}
                  keys={keys}
                  optionRender={optionRender}
                  onSelect={handleSelect}
                  tokens={tokens}
                  emptyText={getEmptyText(index)}
                />
              </Tabs.TabPane>
            )
          })}
        </Tabs>
      </View>
    )
  }

  const inlineChildren = !poppable && !isRenderProp ? children : null

  const content = (
    <View
      testID={testID}
      style={[tokens.layout.container, { backgroundColor: tokens.colors.background }, style]}
      {...rest}
    >
      {showHeader ? (
        <View
          style={[
            tokens.layout.header,
            {
              height: tokens.sizing.headerHeight,
              paddingHorizontal: tokens.spacing.headerPaddingHorizontal,
            },
          ]}
        >
          {isText(title) ? (
            <Text
              style={[
                tokens.layout.title,
                {
                  color: tokens.colors.headerText,
                  fontSize: tokens.typography.titleSize,
                  fontWeight: tokens.typography.titleWeight,
                },
              ]}
            >
              {title}
            </Text>
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
              style={[tokens.layout.closeButton, { marginLeft: tokens.spacing.closeButtonMarginLeft }]}
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
        <View
          style={[
            tokens.layout.inlineChildren,
            {
              paddingVertical: tokens.spacing.inlineChildrenPaddingVertical,
              paddingHorizontal: tokens.spacing.headerPaddingHorizontal,
            },
          ]}
        >
          {inlineChildren}
        </View>
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

  const cascaderActions = {
    open: openPopup,
    close: () => closePopup(true),
    toggle: togglePopup,
  }

  const enhanceTriggerNode = useCallback(
    (node: React.ReactNode) => {
      if (!React.isValidElement(node)) return node
      const props = node.props as { onPress?: () => void; onClick?: () => void }
      const handlePress = () => {
        props.onPress?.()
        props.onClick?.()
        openPopup()
      }
      return React.cloneElement(node as React.ReactElement<Record<string, unknown>>, {
        onPress: handlePress,
        onClick: handlePress,
      })
    },
    [openPopup],
  )

  const triggerNode = renderProp
    ? renderProp(cascaderValue, confirmedRows, cascaderActions)
    : (isRenderProp ? null : children || null)
  const resolvedTriggerNode = enhanceTriggerNode(triggerNode)

  return (
    <>
      {resolvedTriggerNode}
      <Popup
        visible={popupVisible}
        placement={popupPlacement}
        round={popupRound}
        closeOnOverlayPress={resolvedCloseOnOverlayPress}
        overlay={resolvedOverlay}
        safeAreaInsetTop={
          popupRestProps?.safeAreaInsetTop !== undefined
            ? popupRestProps.safeAreaInsetTop
            : showHeader && resolvedCloseable
        }
        safeAreaInsetBottom={
          popupRestProps?.safeAreaInsetBottom !== undefined
            ? popupRestProps.safeAreaInsetBottom
            : popupPlacement === 'bottom'
        }
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
    selected,
    activeColor,
    keys,
    optionRender,
    onSelect,
    tokens,
  }: {
    option: CascaderOption
    tabIndex: number
    selected: boolean
    activeColor: string
    keys: FieldKeys
    optionRender?: CascaderProps['optionRender']
    onSelect: (option: CascaderOption, tabIndex: number) => void
    tokens: CascaderTokens
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
          <Text
            style={[
              tokens.layout.optionText,
              { color: textColor, fontSize: tokens.typography.optionTextSize },
              selected && { fontWeight: tokens.typography.optionTextActiveWeight },
            ]}
          >
            {label}
          </Text>
        )
        : isRenderable(label)
          ? (label as React.ReactNode)
          : null

    return (
      <Pressable
        testID={`cascader-option-${tabIndex}-${String(optionValue)}`}
        style={({ pressed }) => [
          tokens.layout.option,
          {
            minHeight: tokens.sizing.optionMinHeight,
            paddingVertical: tokens.spacing.optionPaddingVertical,
            paddingHorizontal: tokens.spacing.optionPaddingHorizontal,
          },
          pressed && !disabled && { backgroundColor: tokens.colors.optionActiveBackground },
        ]}
        onPress={() => onSelect(option, tabIndex)}
        disabled={disabled}
      >
        <View style={tokens.layout.optionContent}>
          <View style={[tokens.layout.optionLabel, { marginRight: tokens.spacing.optionLabelMarginRight }]}>
            {content}
          </View>
          {selected ? (
            <Checked size={tokens.sizing.selectedIconSize} fill={activeColor} color={activeColor} />
          ) : null}
        </View>
      </Pressable>
    )
  }
)

const CascaderOptionList = React.memo(
  ({
    optionList,
    tabIndex,
    selectedValue,
    activeColor,
    keys,
    optionRender,
    onSelect,
    tokens,
    emptyText,
  }: {
    optionList: CascaderOption[]
    tabIndex: number
    selectedValue?: CascaderValue
    activeColor: string
    keys: FieldKeys
    optionRender?: CascaderProps['optionRender']
    onSelect: (option: CascaderOption, tabIndex: number) => void
    tokens: CascaderTokens
    emptyText: string
  }) => {
    const renderItem = useCallback(
      ({ item }: { item: CascaderOption }) => (
        <CascaderOptionItem
          option={item}
          tabIndex={tabIndex}
          selected={selectedValue === item[keys.valueKey]}
          activeColor={activeColor}
          keys={keys}
          optionRender={optionRender}
          onSelect={onSelect}
          tokens={tokens}
        />
      ),
      [activeColor, keys, onSelect, optionRender, selectedValue, tabIndex, tokens],
    )

    const keyExtractor = useCallback(
      (item: CascaderOption) => String(item[keys.valueKey]),
      [keys.valueKey],
    )

    if (!optionList.length) {
      return (
        <View style={[tokens.layout.optionList, { height: tokens.sizing.optionListHeight }]}>
          <Text
            style={[
              tokens.layout.empty,
              {
                color: tokens.colors.placeholder,
                paddingVertical: tokens.spacing.emptyPaddingVertical,
                fontSize: tokens.typography.emptyTextSize,
              },
            ]}
          >
            {emptyText}
          </Text>
        </View>
      )
    }

    return (
      <FlatList
        data={optionList}
        style={[tokens.layout.optionList, { height: tokens.sizing.optionListHeight }]}
        contentContainerStyle={{
          paddingTop: tokens.spacing.optionListPaddingTop,
          paddingBottom: tokens.spacing.optionListPaddingBottom,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews
        initialNumToRender={20}
        windowSize={5}
      />
    )
  },
)

export default Cascader
