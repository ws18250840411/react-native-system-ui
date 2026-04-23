# 路线图

里程碑划分与组件状态表，用于跟踪进度与规划。

> 目标：在 React Native 上交付高质量移动端组件集，提供一致的无障碍能力与国际化支持，并同步文档与测试。

## 1. 当前基线（v1.0.9）

- **已交付 55+ 组件**，覆盖基础展示、表单输入、反馈弹层、导航、数据选择、媒体等全部核心分类。
- **设计系统**：ThemeProvider / ConfigProvider 下发 foundations 与 components overrides；内置 light / dark / aurora 三套主题预设。
- **国际化（i18n）**：ConfigProvider `locale` 属性支持切换语言，内置 `zhCN`（中文）与 `enUS`（英文）两套语言包，覆盖 Toast、Dialog、Picker、Calendar、Cascader、Image、Form、NumberKeyboard、ShareSheet、NoticeBar、NavBar 等组件文案。
- **RTL 布局**：ConfigProvider `direction` 属性支持 LTR / RTL 布局，NavBar、Cell、Popup、Sidebar、Tag、Stepper、NoticeBar 等组件已适配镜像翻转。
- **无障碍（A11y）**：useAriaPress / useAriaToggle / useAriaListBox / useAriaOverlay / useFocus / useFocusRing 已抽象并集成到核心组件。
- **Overlay 系统**：Portal / OverlayStack 栈管理、BackHandler（Android）、popstate（Web）、滚动锁已就绪。
- **错误边界**：ErrorBoundary 组件支持自定义 fallback、onError 回调与命令式 reset。
- **平台适配**：createPlatformShadow（跨平台阴影）、nativeDriverEnabled（动画驱动）、measureInWindow（测量）、setBodyScrollLocked（滚动锁）等平台工具完备。
- **测试**：72 个测试套件 / 522 个测试用例全部通过。

## 2. 里程碑

| 阶段 | 时间 | 目标 | 关键产出 |
| --- | --- | --- | --- |
| M0 基建 | ✅ 已完成 | tokens / overlay / aria hooks 统一，主题文档补全 | useAria* 集合、Overlay 管理、动画预设、架构文档 |
| M1 表单与输入 | ✅ 已完成 | Field/Input/Form 及 Checkbox/Radio/Switch/Stepper/Search/Selector/NumberKeyboard | 组件 + 单测 + 文档（≥3 demo） |
| M2 导航与行为 | ✅ 已完成 | Tabs/Tabbar/NavBar/Sidebar/ActionSheet/ShareSheet | Overlay 与手势复用、弹层交互一致 |
| M3 数据与列表 | ✅ 已完成 | Picker/DatetimePicker/Calendar/Cascader/Area/Swiper/Image/ImagePreview/Skeleton | 列表滚动、懒加载、图片占位 |
| M4 工程化与发行 | ✅ v1.0.2 已发布 | i18n / RTL / ErrorBoundary / 测试覆盖 / 文档完善 | 生产可用，72 套件 / 522 用例 |
| M5 增强与扩展 | 🔜 规划中 | 动画/手势性能优化、更多业务组件 | 弹性动画预设、SubmitBar、Sku 等 |

## 3. 组件状态

| 分类 | 组件 | 状态 | 备注 |
| --- | --- | --- | --- |
| 布局 | Flex, Space | ✅ 已完成 | |
| 基础展示 | Button, Badge, Cell, Collapse, Divider, Empty, Grid, Loading, NoticeBar, Popup, Portal, Progress, Slider, Tag, Toast, Typography, Icon, Image, Circle, CountDown, WaterMark, Avatar, Skeleton | ✅ 已完成 | 均有文档与 demo |
| 设计/主题 | ConfigProvider, ThemeProvider, Text, themePresets, createTokens | ✅ 已完成 | 含 light/dark/aurora 预设、i18n、RTL |
| 表单容器 | Form, Form.Item | ✅ 已完成 | 字段注册、校验、依赖追踪 |
| 输入控件 | Field, Input, Search, PasswordInput | ✅ 已完成 | 受控 + 校验态 |
| 选择控件 | Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, Selector | ✅ 已完成 | 集成 useAriaToggle |
| 数值控件 | Stepper, NumberKeyboard, Slider | ✅ 已完成 | RTL 适配 |
| 数据选择 | Picker, DatetimePicker, Calendar, Cascader, Area | ✅ 已完成 | i18n 适配 |
| 弹层/反馈 | Dialog, ActionSheet, ShareSheet, Notify, Overlay, Popup | ✅ 已完成 | Portal 栈管理 |
| 导航 | Tabs, Tabbar, NavBar, Sidebar | ✅ 已完成 | RTL 适配 |
| 媒体 | Image, ImagePreview, Swiper | ✅ 已完成 | 占位/失败态 |
| 安全区 | SafeAreaView | ✅ 已完成 | |
| 错误处理 | ErrorBoundary | ✅ 已完成 | fallback + reset + onError |
| a11y Hooks | useAriaPress, useAriaToggle, useAriaListBox, useAriaOverlay, useFocus, useFocusRing | ✅ 已完成 | hooks + 文档 + 单测 |
| Overlay 能力 | OverlayStack, BackHandler 管理, 滚动锁 | ✅ 已完成 | Portal + OverlayStack |
| 业务组件 | SubmitBar, Sku, ProductCard, Coupon, FloatingPanel | ⏳ 计划中 | 可与业务需求迭代 |
| 动画性能 | 弹性/弹簧预设、手势同步动画 | ⏳ 计划中 | nativeDriver 已就绪 |
| 其他 Hooks | useCountdown, useFloatingPanel 等 | ⏳ 计划中 | 与业务组件并行 |

> 图例：✅ 已完成 / ⏳ 计划中。

## 4. 工作流约定

1. **组件交付**：Token → Props → 实现 → Docs → Demo → Test → 主题可调 → i18n 适配 → RTL 验证 → 多端验证（iOS/Android/Web）。
2. **文档**：新增组件同步维护 `docs/components/<component>`，描述与 API 表统一规范。
3. **测试**：逻辑层 `react-test-renderer`；手势类补 e2e 或录屏；Overlay/动画用快照与定时器测试。
4. **国际化**：所有用户可见文案通过 locale 系统引用，token 默认值使用英文。
5. **版本**：v1.1.2 已发布。后续遵循 SemVer 语义化版本。
