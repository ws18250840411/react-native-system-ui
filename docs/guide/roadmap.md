# 路线图

里程碑划分与组件状态表，用于跟踪进度与规划。

> 目标：在 React Native 上交付高质量移动端组件集，提供一致的无障碍能力，并同步文档与测试。

## 1. 当前基线

- **已交付组件**：基础与展示：Button、Badge、Cell、Collapse、Divider、Empty、Flex、Grid、Space、Tag、Typography、Loading、NoticeBar、Popup、Portal、Progress、Slider、Toast、Dialog 等；表单与输入：Form、Field、Input、Checkbox、Radio、Switch、Stepper、Rate、Picker、Calendar、Search 等；导航与反馈：Tabs、NavBar、Tabbar、ActionSheet、Notify、Overlay 等；设计系统：ConfigProvider、ThemeProvider、themePresets。均已提供文档与 demo。详细列表见仓库 README「已交付能力」。
- **设计系统**：ThemeProvider 下发 foundations 与 components overrides；themePresets 提供 light / dark / aurora 三套预设。
- **待补齐能力**
  1. **A11y**：useAriaPress / useAriaToggle / useAriaListBox / useAriaOverlay 已抽象并补文档与单测，待在更多组件中接入。
  2. **Overlay**：Portal 与栈管理、BackHandler、滚动锁已就绪，动画预设与焦点锁定待落地。
  3. **手势与动画**：显隐动效目前由组件内实现（淡入淡出），弹性/弹簧预设与手势同步待补充。
  4. **表单**：Form、useFormContext、校验策略待定，状态管理方案待选型。

## 2. 里程碑

| 阶段 | 时间 | 目标 | 关键产出 |
| --- | --- | --- | --- |
| M0 基建 | Week 0-1 | tokens / overlay / aria hooks 统一，主题文档补全 | useAria* 集合、Overlay 管理、动画预设、架构文档 |
| M1 表单与输入 | Week 1-3 | Field/Input/Form 及 Checkbox/Radio/Switch/Stepper/Rate/Search/Selector/NumberKeyboard | 组件 + 单测 + 文档（≥3 demo） |
| M2 导航与行为 | Week 3-5 | Tabs/Tabbar/NavBar/Sidebar/IndexBar/DropdownMenu/ActionSheet/ShareSheet | Overlay 与手势复用、弹层交互一致 |
| M3 数据与列表 | Week 5-7 | Picker/DatetimePicker/Calendar/Cascader/Area/List/PullRefresh/SwipeCell/Swiper/Image/ImagePreview/Uploader/Skeleton | 列表滚动、懒加载、图片占位 |
| M4 业务与发行 | Week 7+ | SubmitBar/Sku/ProductCard/Coupon/FloatingPanel/WaterMark 等；beta/GA 准备 | 业务 demo、性能调优、Release Note |

## 3. 组件状态

| 分类 | 组件 | 状态 | 优先级 | 依赖/前置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 基础展示 | Button, Badge, Cell, Collapse, Divider, Empty, Flex, Grid, Loading, NoticeBar, Popup, Portal, Progress, Slider, Space, Tag, Toast, Typography | ✅ 已完成 | - | 设计系统 | 需持续补全单测覆盖率 |
| 设计/主题 | ConfigProvider, ThemeProvider, tokens | ✅ 已完成 | - | - | 已内置 themePresets.light/dark/aurora |
| a11y Hooks | useAriaPress, useAriaToggle, useAriaListBox, useAriaOverlay | ⏳ 进行中 | P0 | aria hooks | hooks + 文档 + 单测已就位，等待批量接入 |
| Overlay 能力 | OverlayStack, BackHandler 管理, SafeArea helper, 动画 preset | ⏳ 进行中 | P0 | Portal | 栈管理/BackHandler/滚动锁 + 单测完成，需继续完善动画、SafeArea |
| 表单容器 | Form, Form.Item, useFormContext | ⏳ 计划中 | P0 | Tokens + Hook | 设计对齐既定表单交互 |
| 输入控件 | Field, Input, TextArea | ⏳ 计划中 | P0 | Form, useAriaPress | 先实现受控 + 校验态 |
| 选择控件 | Checkbox, CheckboxGroup, Radio, RadioGroup, Switch | ⏳ 进行中 | P0 | useAriaToggle | Checkbox/Radio 已完成，Switch 复用 aria toggle |
| 数值控件 | Stepper, Rate, Selector, NumberKeyboard | ⏳ 计划中 | P1 | 输入控件 | Rate 依赖手势与动画 |
| 搜索 | Search | ✅ 已完成 | P1 | Field | 2025-11-29 交付，支持键盘搜索、取消按钮与自定义操作 |
| 导航 | Tabs, Tabbar, NavBar, Sidebar, IndexBar | ⏳ 计划中 | P1 | Gesture/Scroll | Sticky 单独组件已下线，优先保障 Scrollspy 与 Tabbar SafeArea |
| 弹层扩展 | ActionSheet, ShareSheet, DropdownMenu | ⏳ 计划中 | P1 | OverlayStack | 与 Popup 保持 API 一致 |
| 数据选择 | Picker, DatetimePicker, Calendar, Cascader, Area | ⏳ 计划中 | P1 | useAriaListBox | 大部分依赖列滚动 |
| 列表/刷新 | List, PullRefresh, SwipeCell, Swiper | ⏳ 计划中 | P1 | Gesture | SwipeCell 需左右滑手势 |
| 媒体 | Image, ImagePreview, Uploader, Skeleton | ⏳ 计划中 | P1 | 基础动画 | Image 需占位/失败态 |
| 业务组件 | SubmitBar, Sku, ProductCard, Coupon, CouponCell, CountDown, Pagination, FloatingPanel, WaterMark | ⏳ 计划中 | P2 | 依赖输入 & 弹层 | 可与业务需求同步迭代 |
| 其他 | Hooks（useCountdown、useFloatingPanel 等） | ⏳ 计划中 | P2 | 组件完成度 | 与业务组件并行 |

> 图例：✅ 已完成 / ⏳ 进行中或计划中。优先级 P0（阻塞）/ P1（高）/ P2（中）。

## 4. 工作流约定

1. **组件交付**：Token → Props → 实现 → Docs → Demo → Test → 主题可调 → 多端验证（iOS/Android/Web）。
2. **文档**：新增组件同步维护 `docs/components/<component>`，描述与 API 表统一规范。
3. **测试**：逻辑层 `react-test-renderer`；手势类补 e2e 或录屏；Overlay/动画用快照与定时器测试。
4. **版本**：每里程碑发布 alpha.x；M3 后试 beta，M4 后 1.0.0。
