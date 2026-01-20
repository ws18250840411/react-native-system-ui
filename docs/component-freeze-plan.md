# 组件分层与冻结清单（草案）

> 目标：把“低风险、三端差异少”的组件集中做一次优化与精简，然后**冻结**（稳定住，避免后续改动频繁影响这些组件）；把主要精力投入到“高风险/复杂组件”（多端差异、手势、弹层、测量、输入等）。
>
> **重要重构方针（2026.01 更新）**：
> 全面推行 **"全 Tokens 驱动架构"**。即：**不仅是颜色字号（皮肤），连组件的默认结构布局（骨架）也应尽量通过 Tokens 管理**。
> - 目的：消除“配置在 Tokens，结构在 StyleSheet”的割裂感，实现极致的统一管理。
> - 标准：组件内部应尽量减少硬编码样式，所有默认行为（如对齐、间距、布局模式）都应从 `tokens.defaults` 读取。
>
> 组件列表来源：`src/components/*` 与 `docs/component-audit-checklist.md`。
> 优化要求：代码极致精简+性能好。至简即稳定的组件，才是“冻结”的基础。再次检查下代码 代码复用是否极致 是否足够精简 足够稳定可靠 性能好 去掉注释没有冗余代码 达到生产级别水平 
## 术语

- **全 Tokens 驱动**：指组件的 `Props 默认值` 和 `核心布局规则` 统一收敛到 Tokens 文件中。
  - **Before**: `Tokens` 管颜色/字号，`StyleSheet` 管 `alignItems: 'center'`。
  - **After**: `Tokens` 包含 `defaults: { align: 'center' }` 或 `layout: { alignItems: 'center' }`，组件内部只负责消费 Tokens。
- **冻结**：组件 API/行为进入稳定期；原则上只接受 bugfix（不加新功能、不改交互语义、不做重构），除非走“变更评审/升级”流程。
- **三端差异判断**：需要根据 `Platform.OS` 或 Web/Native 事件/样式差异做特殊处理（例如：手势、滚动冲突、动画 driver、测量定位、键盘/输入法、文件选择等）。

## 分层规则（简版）

> 不是“代码行数”唯一标准，更多看：**跨端差异敏感度 + 交互复杂度 + 影响面**。

- **S（简单/低风险）**：纯布局/展示/轻交互；基本不涉及 Platform 分支、手势/弹层/测量/输入法等高风险点。
- **M（中风险/可冻结候选）**：存在少量跨端差异点或交互细节（但差异点明确、可被单测覆盖），适合“复核后冻结”。
- **C（复杂/持续优化）**：满足任一高风险条件：
  - 手势/拖拽/滑动/滚动冲突（如 `PanResponder`）
  - 动画/布局测量（`Animated` + 测量 + 状态机）
  - 弹层/定位/Portal/zIndex（`Popup/Overlay/Portal`、`measureInWindow`）
  - 输入/键盘/输入法（`TextInput` 行为差异、composition、键盘避让）
  - 文件/媒体选择（`Uploader` 等）
  - 基础设施组件（影响面大：`ConfigProvider/Portal/Popup/Overlay` 等）

## 组件分层（建议版）

> 说明：这是一份“先验分层”，后续可以根据实际体验/维护成本调整。

### S 组（优先冻结）

先把这一组做一次集中优化与精简（API/文档/测试），确认没问题后进入冻结期。

| 组件（目录） | 冻结建议 | 主要原因（简述） |
| --- | --- | --- |
| avatar | 已冻结 ✅ | 极致精简版：分离 src/source 属性，移除运行时判断，代码结构最小化 |
| badge | 已冻结 ✅ | 极致精简版：展示组件，交互/跨端差异少 |
| cell | 已冻结 ✅ | 极致精简版：基础展示/点击结构稳定 |
| count-down | 已冻结 ✅ | 极致精简版：逻辑相对独立，跨端差异少 |
| divider | 已冻结 ✅ | 极致精简版：纯展示组件（已极致精简） |
| empty | 已冻结 ✅ | 极致精简版：移除硬编码 CDN，改为 System Icon，代码最小化 |
| flex | 已冻结 ✅ | 极致精简版：保留 Tokens 架构，逻辑优化 |
| grid | 已冻结 ✅ | 极致精简版：iOS 布局适配、图标/Badge居中修复、全 Tokens 驱动、逻辑最小化 |
| pagination | 已冻结 ✅ | 极致精简版：受控/非受控、越界 clamp、多模式 multi/simple、ellipsis 跳转、非文本节点安全渲染 |
| tag | 已冻结 ✅ | 极致精简版：tokens 驱动、支持点击与关闭且阻止冒泡、plain hairline 边框、非文本子节点安全渲染 |
| water-mark | 已冻结 ✅ | 极致精简版：全 Tokens 驱动、数值安全归一、Memo优化渲染、逻辑最小化 |

### M 组（复核后冻结）

这一组通常只有“少量差异点/交互细节”，建议把差异点明确写进文档并用测试守护，通过后冻结。

| 组件（目录） | 冻结建议 | 主要原因（简述） |
| --- | --- | --- |
| action-sheet | 已冻结 ✅ | 极致精简版：默认蒙层可关闭且可关闭开关；onClose/onCancel 语义清晰；0 any；Item 回调稳定避免无谓重渲染 |
| button | 已冻结 ✅ | 极致精简版：全 Tokens 驱动、真实 Hairline、Android 波纹裁剪、无障碍完善、ButtonGroup 协同优化 |
| checkbox | 已冻结 ✅ | 极致精简版：全 Tokens 驱动、组选逻辑、Ref转发+无障碍/交互一致性 |
| image | 已冻结 ✅ | 极致精简版：全 Tokens 驱动、映射表优化、Web/Native SVG 统一、无障碍精修 |
| list | 已冻结 ✅ | 极致精简版：全 Tokens 驱动、横纵向支持、ScrollComponent 注入、无障碍精修、逻辑最小化 |
| loading | 已冻结 ✅ | 极致精简版：全 Tokens 驱动、Native Driver 动画、无 ActivityIndicator 依赖 |
| nav-bar | 已冻结 ✅ | 极致精简版：全 Tokens 驱动，自动处理 SafeArea，移除冗余交互分支，代码结构最小化 |
| notify | 已冻结 ✅ | 极致精简版：全 Tokens 驱动，默认不拦截交互，OverlayStack+Portal 承载，静态 API 单例/多例，代码结构最小化 |
| progress | 已冻结 ✅ | 极致精简版：百分比动画；Pivot 仅在需要时测量；Web 渐变限定；动画 stop 清理 |
| radio | 已冻结 ✅ | 极致精简版：Group 原始值回传（注册表映射）；labelDisabled 语义清晰；Web gap/Native margin 分支最小化；iconRender 异常兜底 |
| rate | 已冻结 ✅ | 极致精简版：受控/非受控统一；半星点击与滑动只在 touchable 时启用；自定义图标无 StyleSheet.flatten；禁用/只读语义清晰 |
| dialog | 已冻结 ✅ | 极致精简版：弹层/Portal/动画/关闭链路稳定；逻辑分支收敛；渲染结构最小化 |
| number-keyboard | 已冻结 ✅ | 极致精简版：弹层+输入联动+交互细节稳定；回调/渲染节点最小化；无冗余分支 |
| selector | 已冻结 ✅ | 极致精简版：Set/Map 驱动选择态；items 回传 O(k)；受控/非受控统一；无障碍与布局分支最小化 |
| sidebar | 已冻结 ✅ | 极致精简版：children 扫描单次 for 循环；受控/非受控统一；无 any；onChange items 无多余分配 |
| space | 已冻结 ✅ | 极致精简版：Web 使用 gap；Native 用 margin/padding 模拟；children 过滤+for 循环；0 any |
| switch | 已冻结 ✅ | 极致精简版：泛型 value；0 any；动画 stop 清理；禁用/加载/受控语义清晰 |
| typography | 已冻结 ✅ | 极致精简版：Text 渲染安全、ellipsis 展开/收起性能回归单测、无障碍角色、includeFontPadding 统一 |
| portal | 已冻结 ✅ | 极致精简版：Host 栈+快照缓存；zIndex 透传；Web 自动挂载/回收；render 无副作用 |
| popup | 已冻结 ✅ | 极致精简版：关闭链路去重；布局测量等待；动画/安全区稳定；单测 0 any |
| area | 已冻结 ✅ | 极致精简版：areaList→级联列；排序缓存；回调值归一；单测守护 |
| picker | 已冻结 ✅ | 滚动边界收敛；嵌套滚动可用；核心逻辑单测补齐 |

### C 组（持续优化）

这一组属于回归高发区：手势/弹层/测量/动画/输入等，建议作为长期优化主战场，暂不冻结。

> 标记说明：`✅` 表示已完成本轮优化并通过测试；但仍属于高风险组件，暂不进入冻结期。

| 组件（目录） | 冻结建议 | 主要原因（简述） |
| --- | --- | --- |
| calendar | 持续优化 ✅ | 日期逻辑+渲染复杂度高，边界多 |
| cascader | 持续优化 ✅ | 多级联动与性能/状态复杂 |
| circle | 持续优化 ✅ | Web/Native 渲染方案差异（svg/gradient）+动画 |
| collapse | 持续优化 ✅ | 测量+展开动画+性能敏感 |
| config-provider | 持续优化 ✅ | 全局基础设施，影响面大 |
| datetime-picker | 持续优化 ✅ | Picker+日期逻辑，三端细节多 |
| dropdown-menu | 持续优化 ✅ | 定位测量/滚动场景多端差异 |
| field | 持续优化 ✅ | 输入/键盘/输入法差异的核心承载 |
| form | 持续优化 ✅ | 校验/依赖/异步校验与边界多 |
| image-preview | 持续优化 ✅ | Portal+Swiper+手势/关闭链路 |
| index-bar | 持续优化 ✅ | 手势/滚动/定位，三端一致性敏感 |
| input | 持续优化 ✅ | TextInput/autoSize/composition 等差异 |
| notice-bar | 持续优化 ✅ | 动画/滚动/重播，差异点多 |
| overlay | 持续优化 ✅ | 弹层基础设施（栈/zIndex/遮罩） |
| password-input | 持续优化 ✅ | 输入+自绘 UI+动画/光标等 |
| pull-refresh | 持续优化 ✅ | 手势/滚动冲突，差异点多 |
| search | 持续优化 ✅ | 基于 Field/Input，输入链路复杂 |
| share-sheet | 持续优化 ✅ | 弹层+复杂内容布局 |
| skeleton | 持续优化 ✅ | 动画/driver/性能敏感 |
| slider | 持续优化 ✅ | 拖拽手势与滚动冲突，高风险 |
| stepper | 持续优化 ✅ | TextInput+长按/边界与交互多 |
| swipe-cell | 持续优化 ✅ | 滑动手势/点击回收/滚动冲突，高风险 |
| swiper | 持续优化 ✅ | 滑动/循环/指示器/虚拟化，多端差异 |
| tabbar | 持续优化 ✅ | 动画/安全区/fixed 布局与交互 |
| tabs | 持续优化 ✅ | swipeable/指示器/滚动/测量复杂 |
| toast | 持续优化 ✅ | 弹层/队列/静态 API/关闭链路 |
| uploader | 持续优化 ✅ | 文件选择/预览/清理与三端差异明显 |

## 冻结执行建议（流程）

1. **先挑 S 组**：统一做一次“API/实现精简 + 单测补齐 + 文档校对”，然后标记为“冻结”。
2. **再挑 M 组**：把“少量差异点”写清楚（文档/测试），通过后进入冻结。
3. **C 组持续优化**：重点投入在 `手势/弹层/输入/测量/动画` 这些“回归高发区”。

## 冻结后的门禁建议

- 冻结组件：只允许 **bugfix**（且必须补测试）；任何行为/交互语义变化都要走评审（必要时走 major/minor）。
- 对 S/M 组建议补充“关键交互快照/核心逻辑单测”，避免“顺手改动”引入回归。
