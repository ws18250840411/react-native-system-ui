# React Native System UI 路线图

> 目标：在 2026 Q1 前用 React Native 交付一套高质量的移动端组件集，依托 `@react-native-aria` 提供一致的可访问能力，并同步交付文档与测试。

## 1. 当前基线（2025-11-25）

- **已完成功能**：`Button、Badge、Cell、Collapse、ConfigProvider、Dialog、Divider、Empty、Flex、Grid、Loading、NoticeBar、Popup、Portal、Progress、Slider、Space、Tag、Toast、Typography`，均已提供 docs + demo。
- **设计系统**：`ThemeProvider` 下发 foundations + `components` overrides；`themePresets` 已提供 light/dark/aurora 三套示例便于切换。
- **基础设施缺口**
  1. `@react-native-aria` 统一封装：`useAriaPress/useAriaToggle/useAriaListBox/useAriaOverlay` 已抽象并补文档+单测，但需要在更多组件中验证。
  2. Overlay 栈：Portal 已具雏形，堆叠管理/BackHandler/滚动锁 + 单测已补齐，但动画预设与焦点锁定仍未落地。
  3. 手势与动画：现仅有 `usePresenceAnimation`（淡入淡出），缺通用的弹性/弹簧预设、手势同步（可能依赖 `react-native-gesture-handler`/`reanimated`）。
  4. 表单上下文：尚无 `Form`、`useFormContext`、校验策略，需要确定状态管理（优先考虑 `react-hook-form` 还是轻量自研）。

## 2. 里程碑切分

| Milestone | 时间窗口 | 目标 | 关键输出 |
| --- | --- | --- | --- |
| M0 基建封装 | Week 0-1 | 统一 tokens、overlay、aria hooks，补充主题文档 | `useAria*` Hook 集合、Overlay 管理器、动画预设、`docs/guide/architecture.md` 增补 |
| M1 表单与输入 | Week 1-3 | 完成 Field/Input/Form + Checkbox/Radio/Switch/Stepper/Rate/Search/Selector/NumberKeyboard | 组件实现 + 单测 + docs（≥3 demo） |
| M2 导航 & 行为 | Week 3-5 | Tabs/Tabbar/NavBar/Sidebar/IndexBar/DropdownMenu/Popover/ActionSheet/ShareSheet | Overlay/手势复用验证；通知/弹层交互一致 |
| M3 数据选择 & 列表 | Week 5-7 | Picker/DatetimePicker/Calendar/Cascader/Area/List/PullRefresh/SwipeCell/Swiper/Image/ImagePreview/Uploader/Skeleton | 列表滚动、懒加载、图片占位策略 |
| M4 业务组件 & 发行 | Week 7+ | SubmitBar/Sku/ProductCard/Coupon/FloatingPanel/Ball/WaterMark 等；准备 beta/GA | 业务 demo、性能调优、Release Note、主题示例 |

## 3. 组件状态表

| 分类 | 组件 | 状态 | 优先级 | 依赖/前置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 基础展示 | Button, Badge, Cell, Collapse, Divider, Empty, Flex, Grid, Loading, NoticeBar, Popup, Portal, Progress, Slider, Space, Tag, Toast, Typography | ✅ 已完成 | - | 设计系统 | 需持续补全单测覆盖率 |
| 设计/主题 | ConfigProvider, ThemeProvider, tokens | ✅ 已完成 | - | - | 已内置 themePresets.light/dark/aurora |
| a11y Hooks | useAriaPress, useAriaToggle, useAriaListBox, useAriaOverlay | ⏳ 进行中 | P0 | `@react-native-aria/*` | hooks + 文档 + 单测已就位，等待批量接入 |
| Overlay 能力 | OverlayStack, BackHandler 管理, SafeArea helper, 动画 preset | ⏳ 进行中 | P0 | Portal | 栈管理/BackHandler/滚动锁 + 单测完成，需继续完善动画、SafeArea |
| 表单容器 | Form, Form.Item, useFormContext | ⏳ 计划中 | P0 | Tokens + Hook | 设计对齐既定表单交互 |
| 输入控件 | Field, Input, TextArea | ⏳ 计划中 | P0 | Form, useAriaPress | 先实现受控 + 校验态 |
| 选择控件 | Checkbox, CheckboxGroup, Radio, RadioGroup, Switch | ⏳ 进行中 | P0 | useAriaToggle | Checkbox/Radio 已完成，Switch 复用 aria toggle |
| 数值控件 | Stepper, Rate, Selector, NumberKeyboard | ⏳ 计划中 | P1 | 输入控件 | Rate 依赖手势与动画 |
| 搜索 | Search | ✅ 已完成 | P1 | Field | 2025-11-29 交付，支持键盘搜索、取消按钮与自定义操作 |
| 导航 | Tabs, Tabbar, NavBar, Sidebar, IndexBar | ⏳ 计划中 | P1 | Gesture/Scroll | Sticky 单独组件已下线，优先保障 Scrollspy 与 Tabbar SafeArea |
| 弹层扩展 | ActionSheet, ShareSheet, DropdownMenu, Popover | ⏳ 计划中 | P1 | OverlayStack | 与 Popup 保持 API 一致 |
| 数据选择 | Picker, DatetimePicker, Calendar, Cascader, Area | ⏳ 计划中 | P1 | useAriaListBox | 大部分依赖列滚动 |
| 列表/刷新 | List, PullRefresh, SwipeCell, Swiper | ⏳ 计划中 | P1 | Gesture | SwipeCell 需左右滑手势 |
| 媒体 | Image, ImagePreview, Uploader, Skeleton | ⏳ 计划中 | P1 | 基础动画 | Image 需占位/失败态 |
| 业务组件 | SubmitBar, Sku, ProductCard, Coupon, CouponCell, CountDown, Pagination, FloatingBall, FloatingPanel, WaterMark | ⏳ 计划中 | P2 | 依赖输入 & 弹层 | 可与业务需求同步迭代 |
| 其他 | Hooks（useCountdown、useFloatingPanel 等） | ⏳ 计划中 | P2 | 组件完成度 | 与业务组件并行 |

> 状态说明：✅ 已完成 / ⏳ 进行中或计划中。优先级：P0（阻塞性）、P1（高）、P2（中）。

## 4. 工作流约定

1. **组件 Checklist**：Token → Props → 实现 → Docs → Demo → Test → 主题可调 → 交互验证（iOS/Android/Web）。
2. **文档同步**：新增组件时同步创建 `docs/components/<component>/*.md + demo`，中文描述 + API 表保持统一规范。
3. **测试策略**：逻辑层使用 `react-test-renderer`；涉及手势的组件需补 e2e（Detox）或录屏验证；Overlay/动画需快照 + 定时器测试。
4. **版本节奏**：每完成一个里程碑发布 `alpha.x`；在 M3 完成后尝试 `beta`，M4 完成后发布 `1.0.0`。
