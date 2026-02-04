## Gluestack 对齐迁移清单（草案）

目标：核心实现对齐 Gluestack UI；对外 API 与样式保持 React Vant 风格。

### 已完成（对齐记录）

| 组件 | 状态 | 对齐目标 | 关键改动 | 影响范围 |
| --- | --- | --- | --- | --- |
| Loading | ✅ 完成 | Spinner | 用 `ActivityIndicator` 作为统一指示器；移除 `type` | `src/components/loading/*` + 文档 + demo + 单测 |
| Button | ✅ 完成（loading 子项） | Spinner | Loading 指示器直接用 `ActivityIndicator`；移除 `loadingType` | `src/components/button/*` + 文档 + demo + 单测 |
| Toast | ✅ 完成（loading 子项） | Spinner | 移除 `loadingType`；移除 `ball` 单测 | `src/components/toast/*` + 文档 |
| Switch | ✅ 完成 | Switch | 使用 RN `Switch` 作为核心实现；保留现有 API 与 loading 行为 | `src/components/switch/*` + 文档 + 单测 |
| Portal | ✅ 完成（结构对齐） | Overlay/Portal | PortalLayer 空队列不渲染，减少层级开销 | `src/components/portal/PortalHost.tsx` |
| Overlay | ✅ 完成（对齐核心机制） | Overlay | 基于 Gluestack Overlay 机制重构 | `src/components/overlay/*` + 文档 + 单测 |
| Input | ✅ 完成 | Input | 补齐键盘类型映射与输入逻辑收敛 | `src/components/input/Input.tsx` |
| Field | ✅ 完成（内部结构对齐） | Input 组合思路 | 内部结构按 Slot/Input 思路重构并收敛 | `src/components/field/Field.tsx` |

### 改动明细（便于追溯）

| 日期 | 组件 | 改动点 | 文件 |
| --- | --- | --- | --- |
| 2026-02-02 | Loading | 移除 `circular/ball` 实现，统一 `ActivityIndicator` | `src/components/loading/Loading.tsx` |
| 2026-02-02 | Loading | 移除 `type`/多余 sizing 配置 | `src/components/loading/types.d.ts`, `src/components/loading/tokens.ts`, `src/components/loading/index.ts`, `src/components/index.ts`, `src/components/types.ts` |
| 2026-02-02 | Loading | 文档与 demo 同步更新 | `docs/components/loading.md`, `docs/components/loading/demo/*` |
| 2026-02-02 | Button | 移除 `loadingType`，指示器改为 `ActivityIndicator` | `src/components/button/Button.tsx`, `src/components/button/types.d.ts`, `src/components/button/tokens.ts`, `src/components/button/__tests__/button.test.tsx`, `docs/components/button.md` |
| 2026-02-02 | Button | 文档与 demo 同步更新 | `docs/components/button.md`, `docs/components/button/demo/loading.tsx` |
| 2026-02-02 | Button | 单测调整为 `ActivityIndicator` | `src/components/button/__tests__/button.test.tsx` |
| 2026-02-02 | Button | 提升默认按压可见度（pressedOpacity） | `src/components/button/tokens.ts` |
| 2026-02-02 | Button | 移除渐变色处理，收敛实现复杂度 | `src/components/button/Button.tsx`, `src/components/button/__tests__/button.test.tsx`, `docs/components/button.md` |
| 2026-02-02 | Button | 移除 `buttonColor/dark` 兼容能力 | `src/components/button/Button.tsx`, `src/components/button/types.d.ts`, `docs/components/button.md` |
| 2026-02-02 | Button | 移除 `autoInsertSpace/uppercase` 兼容能力 | `src/components/button/Button.tsx`, `src/components/button/types.d.ts`, `src/components/button/tokens.ts`, `docs/components/button.md`, `src/components/button/__tests__/button.test.tsx` |
| 2026-02-02 | Button | 移除 `mode` 能力并简化分支 | `src/components/button/Button.tsx`, `src/components/button/types.d.ts`, `src/components/button/tokens.ts`, `src/components/button/ButtonContext.ts`, `src/components/button/ButtonGroup.tsx`, `src/components/button/index.ts`, `src/components/button/__tests__/button.test.tsx`, `docs/components/button.md` |
| 2026-02-02 | Toast | 移除 `loadingType`（默认 loading 指示器） | `src/components/toast/Toast.tsx`, `src/components/toast/__tests__/toast.test.tsx`, `docs/components/toast.md` |
| 2026-02-02 | Toast | 单测移除 `ball` | `src/components/toast/__tests__/toast.test.tsx` |
| 2026-02-02 | Switch | 核心实现切到 RN `Switch`，保留 onClick/onChange 行为 | `src/components/switch/Switch.tsx` |
| 2026-02-02 | Switch | 单测适配新的尺寸缩放方式 | `src/components/switch/__tests__/switch.test.tsx` |
| 2026-02-02 | Switch | 文档说明基于 RN `Switch` | `docs/components/switch.md` |
| 2026-02-02 | Switch | 清理未使用 tokens 字段 | `src/components/switch/types.d.ts`, `src/components/switch/tokens.ts` |
| 2026-02-02 | Switch | 移除 loading 指示器（仅保留 loading 行为） | `src/components/switch/Switch.tsx`, `src/components/switch/types.d.ts`, `src/components/switch/tokens.ts` |
| 2026-02-02 | Switch | 取消 `thumbColor`（与 Gluestack 一致） | `src/components/switch/Switch.tsx`, `src/components/switch/types.d.ts`, `docs/components/switch.md`, `docs/components/switch/demo/color.tsx` |
| 2026-02-02 | Switch | 移除外层容器，与 Gluestack 结构对齐 | `src/components/switch/Switch.tsx`, `src/components/switch/types.d.ts`, `src/components/switch/tokens.ts` |
| 2026-02-02 | Switch | 移除 `loading` 属性与 Demo | `src/components/switch/Switch.tsx`, `src/components/switch/types.d.ts`, `src/components/switch/__tests__/switch.test.tsx`, `docs/components/switch.md`, `docs/components/switch/demo/loading.tsx` |
| 2026-02-02 | Switch | 移除 ViewProps 透传说明 | `docs/components/switch.md`, `src/components/switch/types.d.ts` |
| 2026-02-02 | Switch | 对齐 Gluestack 的 size 缩放（sm/md/lg） | `src/components/switch/Switch.tsx`, `src/components/switch/types.d.ts`, `docs/components/switch.md`, `docs/components/switch/demo/size.tsx` |
| 2026-02-02 | Input | 补齐 `inputStyle` 透传并简化计算 | `src/components/input/Input.tsx`, `docs/components/input.md` |
| 2026-02-02 | Checkbox | 去除冗余 useMemo，收敛计算 | `src/components/checkbox/Checkbox.tsx` |
| 2026-02-03 | Portal | PortalLayer 空队列不渲染，减少层级开销 | `src/components/portal/PortalHost.tsx` |
| 2026-02-03 | Portal | 补齐 OverlayContainer/Modal 行为与键盘关闭能力 | `src/components/portal/Portal.tsx`, `docs/components/portal.md`, `src/components/portal/__tests__/portal.test.tsx` |
| 2026-02-03 | Portal | Portal 组件改为 Overlay 包装，静态 API 继续通过 Host 管理 | `src/components/portal/Portal.tsx`, `docs/components/portal.md`, `src/components/portal/__tests__/portal.test.tsx` |
| 2026-02-03 | Portal | 事件总线驱动 Host 挂载，移除 auto host，收敛为单 Host 模式 | `src/components/portal/PortalHost.tsx`, `docs/components/portal.md`, `src/components/portal/__tests__/portal.test.tsx` |
| 2026-02-03 | Portal | 移除 Portal/Host 多余告警逻辑，压缩实现体积 | `src/components/portal/Portal.tsx`, `src/components/portal/PortalHost.tsx` |
| 2026-02-03 | Popup | 文档 demo 内部显式挂载 PortalHost，保证 Web 可展示 | `docs/components/popup/demo/*` |
| 2026-02-03 | Popup | 动画标记为非交互，减少真机动画卡顿 | `src/components/popup/Popup.tsx` |
| 2026-02-03 | Popup | 弹层与遮罩启用栅格化/硬件纹理加速 | `src/components/popup/Popup.tsx` |
| 2026-02-03 | Popup | 遮罩透明度复用弹层动画进度，减少动画分支 | `src/components/popup/Popup.tsx` |
| 2026-02-03 | Toast | 文档 demo 内部显式挂载 PortalHost，保证 Web 可展示 | `docs/components/toast/demo/*` |
| 2026-02-03 | Overlay | 基于 OverlayContainer/Modal 重构实现 | `src/components/overlay/Overlay.tsx`, `src/components/overlay/types.d.ts` |
| 2026-02-03 | Overlay | 对齐 Gluestack API（isOpen/Modal/keyboard） | `docs/components/overlay.md`, `src/components/overlay/__tests__/overlay.test.tsx` |
| 2026-02-03 | Field | 内部结构按 Slot/Input 思路重构并收敛 | `src/components/field/Field.tsx` |
| 2026-02-03 | Field | 修复 clearable 真机清除与失焦时序 | `src/components/field/Field.tsx` |
| 2026-02-03 | Field | 数字输入拦截逻辑收敛（number/digit） | `src/components/field/Field.tsx` |
| 2026-02-03 | Input | 补齐 `digit/tel` 键盘类型映射 | `src/components/input/Input.tsx` |
| 2026-02-04 | Popup | 动画回退为内部实现，保持弹层与蒙层同步 | `src/components/popup/Popup.tsx` |

### 迁移优先级（先替换基础/通用）

#### P0（影响面最大、替换收益高）
- Button
- Input
- Checkbox / Radio
- Switch
- Slider
- Progress
- Toast
- Badge
- Avatar
- Image
- Loading（对应 Spinner）
- Divider
- Grid
- Skeleton
- Portal

#### P1（常用但需适配）
- Popup / Dialog / Overlay（映射 Modal / AlertDialog / Popover）
- Tabs（若能找到近似实现，否则保留）
- ActionSheet

#### P2（保留现状，后续评估）
- Picker / NumberKeyboard（交互差异大，需专项验证）
- Calendar / DatetimePicker / Cascader / Area
- List / PullRefresh / Swiper / ImagePreview / Uploader
- Stepper / Rate / Selector / Search / PasswordInput
- Tabbar / NavBar / Sidebar / IndexBar
- NoticeBar / Circle / Empty / CountDown / WaterMark / Pagination / Notify
- Form / Field（可能需要基于 FormControl 自行封装）

### 组件对齐映射（核心实现 → 我们 API）

#### Forms
- Button → Gluestack Button
- Input → Gluestack Input
- Checkbox → Gluestack Checkbox
- Radio → Gluestack Radio / RadioGroup
- Switch → Gluestack Switch
- Slider → Gluestack Slider

#### Feedback
- Toast → Gluestack Toast
- Progress → Gluestack Progress
- Loading → Gluestack Spinner

#### Data Display
- Badge → Gluestack Badge
- Avatar → Gluestack Avatar
- Image → Gluestack Image
- Divider → Gluestack Divider
- Grid → Gluestack Grid
- Skeleton → Gluestack Skeleton

#### Overlay
- Portal → Gluestack Portal
- Popup / Dialog / Overlay → Modal / AlertDialog / Popover（按场景选择）
- ActionSheet → Gluestack ActionSheet

### API 适配层原则

- 对外 API 保持 React Vant 风格：参数名、默认值、行为一致。
- 仅在实现层做映射；不暴露 Gluestack 原生 props。
- 单个组件一套 `adapter`：将外部 props 归一为 Gluestack props。
- 样式全部走 tokens：外观由我们控制，Gluestack 只负责结构和交互。

### 优化要求与步骤（每个组件）

- 先走读组件目录内所有文件（组件、tokens、types、index、tests、docs、demo）
- 核心实现以 Gluestack 源码为主，优先复用其结构与交互，完善我们的api
- 若现有 API 不被 Gluestack 支持：先评估补逻辑适配，否则删除并记录
- 优化以可量化证据为依据：基准脚本或可复现实验结果
- 只做实现层优化：对外 API 尽量保持不变（除非删除项）
- 代码必须极致精简与高性能：保证体积小且符合 RN 开发规范
- 同步更新文档、demo、类型与单测
- 单测必须通过后再进入下一个组件
- 变更记录写入 `gluestack-migration-plan.md`

### 迁移流程

1. 选定组件（P0 逐个），建立 adapter。
2. 对齐现有 API 与行为（包含边界/默认值）。
3. 在 RN demo 里验证交互/性能。
4. 通过基准脚本做 A/B。
5. 合并替换，保留回滚开关（如需要）。

### 需要补齐的 Gluestack 组件（可选）

如后续需要：FormControl / Select / Textarea / Alert / AlertDialog / Modal / Popover / Menu / Tooltip / Drawer / BottomSheet / Card / Table / Icon / Heading / Text / Box / Center / HStack / VStack / Fab / Link / Pressable
