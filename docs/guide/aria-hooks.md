# Aria Hooks 使用手册

> `src/hooks/aria` 汇总了所有依赖 `@react-native-aria` / `@react-stately` 的交互封装，目标是让组件在 RN / Web 多端具备一致的可访问性行为，并避免在每个组件里重复 wiring。

## 统一约束

1. **集中导出**：所有 hook 通过 `src/hooks/aria/index.ts` 暴露，组件层统一从 `react-native-system-ui/hooks` 导入。
2. **状态结构一致**：`useAriaPress` 输出 `interactionProps + states`，`useAriaToggle` 输出 `state + inputProps + inputRef`，保证组件之间的可替换性。
3. **必须配套测试与文档**：新增 hook 需要在 `src/hooks/aria/__tests__` 补单测，并在本文档更新用法说明。

## useAriaPress

封装 `usePress + useHover + useFocus + useFocusRing`，返回统一的交互状态，组件无需关心不同端的事件差异。

```tsx | pure
import { Pressable, Text } from 'react-native'
import { useAriaPress } from 'react-native-system-ui'

export const PrimaryButton = ({ disabled, text }: { disabled?: boolean; text: string }) => {
  const { interactionProps, states } = useAriaPress({
    disabled,
    extraProps: { accessibilityRole: 'button' },
  })

  return (
    <Pressable
      {...interactionProps}
      style={{ opacity: states.disabled ? 0.45 : states.pressed ? 0.85 : 1 }}
    >
      <Text>{text}</Text>
    </Pressable>
  )
}
```

## useAriaToggle

基于 `useToggleState` + `useToggle` 输出 selection state 与 input props，适用于 Checkbox/Radio/Switch 等所有“可选中”交互。

```tsx | pure
import { useAriaToggle } from 'react-native-system-ui'

export const SwitchBase = (props: any) => {
  const { state, inputProps, inputRef } = useAriaToggle(props)

  return (
    <Pressable
      ref={inputRef}
      role="switch"
      aria-checked={state.isSelected}
      {...inputProps}
    />
  )
}
```

## useAriaOverlay

负责弹层的关闭策略（遮罩点击、BackHandler、外部点击），返回 `overlayRef + overlayProps`，供 Popup/Dialog/Toast 公用。

```tsx | pure
import { Animated, View } from 'react-native'
import { useAriaOverlay } from 'react-native-system-ui'

export const OverlayContainer = ({ isOpen, onClose, children }) => {
  const { overlayProps, overlayRef } = useAriaOverlay({
    isOpen,
    onClose,
    isDismissable: true,
    overlayProps: { pointerEvents: 'box-none' },
  })

  return (
    <Animated.View ref={overlayRef} {...overlayProps}>
      <View>{children}</View>
    </Animated.View>
  )
}
```

## useAriaListBox

结合 `useListState` + `useListBox` 抽象 Picker/Dropdown 等“列表选择”场景，统一获得 `state + listBoxProps + labelProps + ref`。

```tsx | pure
import { FlatList, Text } from 'react-native'
import { useAriaListBox } from 'react-native-system-ui'

export const OptionList = ({ options, selectedKeys, onSelectionChange }) => {
  const { state, listBoxProps, ref } = useAriaListBox({
    items: options,
    selectedKeys,
    onSelectionChange,
    disallowEmptySelection: true,
    label: '选项',
  })

  return (
    <FlatList
      {...listBoxProps}
      ref={ref}
      data={Array.from(state.collection)}
      keyExtractor={item => String(item.key)}
      renderItem={({ item }) => <Text>{item.rendered}</Text>}
    />
  )
}
```

> 如需新增 hook，请先在 `plan-board` 中登记，并补充：① 类型定义；② 对应 `__tests__`；③ 使用示例，保持与 react-vant 语义一致。
