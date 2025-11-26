# React Native System UI 计划表

> 这份计划表统一记录架构约束、开发要求以及组件交付进度。后续开发新组件前，直接查阅本表即可，无需重复沟通背景。

## 1. 开发要求（必须遵守）

1. **API 对齐**：组件 props、事件、文档结构保持与 `react-vant` 一致，除非 React Native 无法实现，差异需在文档中单独注明。
2. **@react-native-aria 优先**：交互组件必须优先使用 `@react-native-aria` + `@react-stately`，若缺乏对应模块，再评估自研；统一封装存放于 `src/hooks/aria`。
3. **Token 驱动**：每个组件目录自带 `create<Component>Tokens` + `use<Component>Tokens`，通过 `deepMerge` 合并主题 overrides。
4. **无全局副作用**：组件只和自己的 Context 交互，Portal 与 Overlay 依赖 `PortalContext` 管理，不污染全局。
5. **文档同步**：实现组件的同时创建 `docs/components/<component>` 目录，至少提供 3 个 demo（基础、变体、自定义）。
6. **测试覆盖**：逻辑层用 Jest/React Test Renderer；涉及手势、动画、Overlay 的组件须补充交互测试或演示验证记录。

## 2. 框架设计概览

- **Design System**：`src/design-system` 提供 `ThemeProvider`，把 `foundations + components` 注入 Context；默认 tokens 见 `tokens.ts`。
- **组件层**：每个组件目录包含 `tokens.ts`/`useTokens.ts`/实现/测试/`index.ts`，并在 `src/components/index.ts` 统一导出。
- **Hooks 层**：`src/hooks` 下封装 `usePresenceAnimation`、`useAria*`，为各组件提供统一的动画与可访问性行为。
- **Overlay 体系**：`Portal` + “OverlayStack（规划中）” 管理遮罩、BackHandler、SafeArea 与动画，所有弹层组件复用。

## 3. 任务看板（2025-11-25）

| 分类 | 任务 | 说明 | 依赖 | 状态 |
| --- | --- | --- | --- | --- |
| 基线组件 | `Button/Badge/Cell/Collapse/ConfigProvider/Dialog/Divider/Empty/Flex/Grid/Icon/Loading/NoticeBar/Popup/Portal/Progress/Slider/Space/Tag/Toast/Typography` | 已实现，持续维护 | 设计系统 | ✅ 完成 |
| 主题扩展 | 夜间主题、品牌可配置示例 | 在 `ThemeProvider` 提供多套 preset（light/dark/aurora）+ 文档 | tokens | ✅ 完成 |
| Aria Hook 封装 | `useAriaPress / useAriaToggle / useAriaListBox / useAriaOverlay`（`src/hooks/aria`） | 提供统一交互/可访问封装，供所有组件复用 | @react-native-aria | ⏳ 进行中（已补文档与单测，等待更多组件接入） |
| Overlay 栈 | 遮罩堆叠、BackHandler、滚动锁、动画预设 | Popup/Dialog/ActionSheet 共享 | Portal | ⏳ 进行中（栈管理/BackHandler/滚动锁已实现并补单测，动画预设待办） |
| 交互组件 a11y 巡检 | Button/Cell/Collapse/Grid.Icon/Tag/NoticeBar 等 | 未接入 `@react-native-aria` 的 Pressable 组件需统一接入 `useAriaPress`/`useAriaButton`，减少冗余逻辑并控制包体积 | hooks | ⏳ 计划中 |
| 表单容器 | Form + Form.Item + useFormContext | 支撑 Field/Input 校验 | tokens + hooks | ⏳ 计划中 |
| Field/Input/TextArea | 受控输入、校验反馈、clear-icon | 依赖 Form | Form | ⏳ 计划中 |
| Checkbox/Radio/Switch | 组态与单选/多选控件 | Checkbox/Radio 已实现；Switch 依赖 useAriaToggle | hooks | ⏳ 进行中 |
| Stepper/Rate/Selector/NumberKeyboard | 数值/评分/多选 | 依赖 Input/Toggle/手势 | 前置组件 | ⏳ 计划中 |
| Search | 搜索组件（整合键盘事件） | 依赖 Field | Field | ⏳ 计划中 |
| Tabs/Tabbar/NavBar/Sidebar/IndexBar/Sticky | 导航体系 | 依赖手势 & Scroll 监听 | gesture kit | ⏳ 计划中 |
| ActionSheet/ShareSheet/DropdownMenu/Popover | 弹层扩展 | 依赖 Overlay 栈 | overlay | ⏳ 计划中 |
| Picker/DatetimePicker/Calendar/Cascader/Area | 数据选择组件 | 依赖 useAriaListBox | aria hooks | ⏳ 计划中 |
| List/PullRefresh/SwipeCell/Swiper | 滚动与手势组件 | 依赖 gesture kit | gesture kit | ⏳ 计划中 |
| Image/ImagePreview/Uploader/Skeleton | 媒体与加载态 | 依赖动画 + 占位策略 | infra | ⏳ 计划中 |
| 业务组件 | SubmitBar/Sku/ProductCard/Coupon/CouponCell/CountDown/Pagination/FloatingBall/FloatingPanel/WaterMark | 根据业务优先级推进 | 前置组件 | ⏳ 计划中 |

状态约定：✅ 完成 ｜ ⏳ 进行中 ｜ ⏳ 计划中（未开工）。

## 4. 组件开发 Checklist

1. 明确 props/API（参照 react-vant）并在 `types.ts` 定义。
2. 设计 tokens → `create<Component>Tokens` + `use<Component>Tokens`。
3. 编写组件实现，优先复用 hooks（主题、aria、动画、SafeArea）。
4. 增加单测（状态渲染、交互回调、主题覆盖）。
5. 更新导出：`src/components/<component>/index.ts` + `src/components/index.ts`。
6. 文档与 Demo：`docs/components/<component>/*.md` + `demo/*.tsx`，运行 `pnpm docs:build` 验证。
7. 如新增主题/配置项，更新 `docs/theme` 与 `docs/guide` 对应章节。

## 5. 文档 & 测试要求

- **文档**：中文优先，结构统一（介绍 → 引入 → 示例 → API 表）；特殊限制需在 “注意” 栏说明。
- **示例**：演示必须覆盖常规场景、强调场景、自定义主题/颜色；涉及手势的 demo 提供交互说明。
- **测试**：对关键逻辑使用快照 + 交互测试；复杂状态使用 `@testing-library/react-native`；弹层需模拟 BackHandler/动画关闭流程。
- **发布前校验**：运行 `pnpm test`、`pnpm docs:build`，并在真机或模拟器验证 iOS/Android/Web 行为。

---

如需了解更长周期路线，请参考 `docs/guide/roadmap.md`。每次迭代完毕，更新本表状态即可。***
