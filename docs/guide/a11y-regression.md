# A11y / 交互回归清单（Aria/Stately 相关）

本文用于提升 `@react-native-aria/* + @react-stately/*` 相关二次封装组件的“可验证稳定性”，包含：自动化回归点、真机走查步骤、以及性能/压力测试建议。

## 覆盖范围

- 组件：`Checkbox/Checkbox.Group`、`Radio/RadioGroup`、`Slider`、（以及使用 `useAriaOverlay` 的 Popup 类组件）
- Hooks：`src/hooks/aria/*`

## 自动化回归（Jest）

1. 运行全量单测：

```bash
pnpm test
```

2. 重点用例（已补回归覆盖）：

- Slider：`reverse + vertical + RTL` 方向一致性、thumb 居中、频繁更新不崩溃
- Checkbox.Group：`aria-disabled`、`toggleAll` 边界（空字符串 value）
- RadioGroup：`accessibilityHint -> aria-describedby`
- useAriaListBox：hook 透传/返回值稳定

## 真机/多端走查（建议）

建议使用 `RnSystemUi`（Expo）跑 demo 进行走查：

```bash
cd RnSystemUi
npm start
```

### iOS（VoiceOver）

1. 打开 VoiceOver
2. 逐个进入 Checkbox/Radio/Slider demo：
   - 组件可聚焦、读屏能读到 label（无 children 时必须有 `aria-label`）
   - disabled 时不会触发切换，且读屏能明确“不可用”
   - Group 场景下读屏信息合理（label/hint）
3. Slider：
   - 滑动时读屏能读到当前值（increment/decrement 动作可用）
   - `vertical + reverse` 表现与视觉一致（向上/向下与数值变化一致）

### Android（TalkBack）

同 iOS，重点确认：
- RadioGroup 单选互斥正确
- CheckboxGroup `max` 限制下不会超过上限
- Slider 快速拖拽无异常、TalkBack 可调整

### Web（键盘 + 可访问性）

1. 打开 docs 或 web demo
2. 只用键盘操作：
   - Tab 可进入可交互组件
   - Space/Enter 可触发（Checkbox/Radio/Switch）
   - Slider 可通过键盘/无障碍动作调整
3. RTL（如需强校验）：
   - 在需要 RTL 的页面容器上设置 `dir="rtl"`（或在 RN 中启用 RTL 后重启）
   - 确认 Slider 水平轨道方向与数值一致

## 性能/压力测试（建议）

### Slider 压测点

- 受控模式（`value + onChange`）下快速拖拽 10~20 秒：
  - UI 无明显掉帧/卡顿
  - `onChangeAfter` 只在结束拖拽触发
- 列表场景：在 `FlatList`/`ScrollView` 中渲染多个 Slider，快速滚动与拖拽切换：
  - 无明显内存增长/掉帧

如需进一步自动化，可新增：
- RN 端 performance profiling 指引（Flipper / Xcode Instruments / Android Studio profiler）
- Web 端 Performance trace 模板

