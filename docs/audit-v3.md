# 三审：多端一致性审计（React Vant × RN Paper）

本轮审计目标：在 **Web / iOS / Android** 三端达成生产级一致性（交互、默认值、视觉、可达性、性能），并严格对齐参考文档与实现细节。

## 基准与优先级

- **官方文档（API/交互/默认值/Demo）：以 React Vant 为准**
- **RN 侧实现细节（可达性/交互手感/实现策略）：优先参考 React Native Paper**
- 若两者冲突：
  - **对外 API 与语义** 优先跟随 React Vant（避免迁移成本与认知分裂）
  - **RN 端可达性与交互细节** 优先跟随 RN Paper（更符合 RN 生态与系统行为）
  - 仍无法一致时：允许“平台差异”，但必须 **可控（可配置/可禁用）** 且 **在组件文档明确说明**

## 审计清单（每个组件必过）

### 1) API 与默认值
- props 命名/类型/默认值与 React Vant 对齐
- 受控/非受控行为一致（值来源、回调触发时机、边界值 clamp/normalize）
- 事件语义一致：`onClick/onPress`、`onChange/onConfirm/onCancel` 等在三端触发条件一致

### 2) 结构与渲染（跨端稳健）
- 避免 **View 嵌套 Text**（导致 RN 崩溃）：所有“文本类 props”允许 `ReactNode` 时需保证内部渲染安全
- `0/''/false` 等边界值渲染判定正确（避免被误判为“空”）
- `style` 合并策略一致：容器/内容层级稳定，布局相关样式不丢失

### 3) 弹层/层级/定位（高风险区域）
- 所有弹层类组件（Popup/Overlay/Dialog/ActionSheet/DropdownMenu/Toast/ImagePreview…）必须走 **Portal**
- zIndex 策略统一：OverlayStack 负责管理栈与“相对偏移”，避免小值污染全局层级
- 定位必须覆盖非顶端场景：优先 `measureInWindow`；Web 需考虑布局/滚动导致的差异与兜底

### 4) 动画与性能
- Web 下统一禁用 `useNativeDriver`（避免 react-native-web 行为差异与警告）
- 动画与测量避免卡顿：减少布局测量次数、避免在 render 中触发测量、关键路径避免不必要的 state 抖动

### 5) 输入/键盘/焦点（表单组件重点）
- TextInput：`onChangeText` / `onChange` / composition（中文输入法）/ focus/blur 时机一致
- 键盘：遮挡与避让策略明确；必要时提供“由业务层滚动容器处理”的建议与示例
- disabled/readOnly 行为一致：是否可聚焦、是否触发回调、样式是否降级（需与 React Vant 语义对齐）

### 6) 手势/滚动（手感与冲突）
- Swipe/drag/scroll 冲突策略一致（如 SwipeCell、Slider、Tabs、IndexBar）
- Web 端需要明确：是否 `preventDefault`、是否支持鼠标拖拽、是否支持触摸

### 7) 可达性（a11y）
- 角色与状态：`accessibilityRole`、`accessibilityState`、label/description 映射正确
- 组件在三端都可被读屏理解（尤其是按钮、开关、输入、弹层）

### 8) 体积与依赖
- 不新增重依赖；优先复用现有 hooks/utils
- 代码保持“薄封装”：可推导的类型从 props 推导、避免冗余适配层

## 产出要求（每个组件落到文档与进度表）
- `docs/components-progress.md`：更新三审状态（✅/⏳）与结论/阻塞
- `docs/components/<component>.md`：补齐 demo 与差异说明（必要时）
- `src/components/<component>`：实现修复与必要的单测（优先覆盖跨端差异点）
