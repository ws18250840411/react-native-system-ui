# React Native System UI Extreme Audit State

最后更新：2026-04-22

## 当前定位

这个 skill 服务于当前仓库的长期任务：逐组件极致压缩、极致实现审计、共享目录收口、真实分数维护。

它不是通用 UI 组件库优化模板，而是这一个项目的持续作业上下文。

后续模型接手时，除了本文件，还必须同步读取 `references/handoff-playbook.md`。

## 当前已确认进展

- `calendar`：`Calendar.tsx` 内联 `clampMonth` 超出 max 月时改为返回 `maxMonth`
- `tabs`：可滑动内容区宽度从 0 恢复时 `scrollTo` 不带动画
- `cascader`：路径未变不强制改列；弹层重开恢复上次列；`FlatList` 关闭 `removeClippedSubviews`
- `Field`：将 `src/hooks/field/renderers.tsx` 内聚回 `src/components/field/Field.tsx`
- `Slider`：将 `src/hooks/slider/utils.tsx` 内聚回 `src/components/slider/Slider.tsx`
- `Form`：将 `src/hooks/form/utils.ts` 内聚回 `src/components/form/Form.tsx`
- `aria`：将旧的 `src/hooks/aria/rn-aria` 体系整体迁到 `src/internal/aria`
- `radio` / `checkbox`：私有 aria 桥接分别收回到组件目录下的 `internal.ts` / `internal.web.ts`
- `checkbox` / `radio`：修复 web 平台 `internal.web.ts -> ./internal` re-export 导致的 Vite 名称解析循环，新增组件本地 `shared.ts` 承载公共 hook，避免平台后缀解析回到自身
- `toast` / `notify` / `image-preview`：共享命令式挂载逻辑收敛到 `src/internal/imperativePortal.tsx`
- `toast` / `notify`：最新回调引用、自动关闭、打开关闭生命周期收敛到 `src/internal/feedback.ts`
- `image-preview`：合并分散的最新索引与回调引用，并补充 `requestAnimationFrame` 缺失时的滑动兜底
- `button`：删除纯内部中转层 `src/components/button/ButtonContext.ts`
- `grid`：删除纯内部中转层 `src/components/grid/GridContext.ts`
- `cell` / `sidebar` / `tabbar`：删除纯内部中转层 `src/components/cell/CellContext.ts`、`src/components/sidebar/SidebarContext.ts`、`src/components/tabbar/TabbarContext.ts`
- `cell` / `grid` / `sidebar` / `tabbar`：继续把组件宿主文件内部残留的运行时 Context 链路压掉，改成父组件直接 clone 注入内部运行时 props；对应子项不再依赖 `useContext`
- `toast` / `notify`：继续压组件本体里的 `useMemo / useCallback / latestRef` 包装层，并把命令式入口里的 Portal 包装回调改回最短路径实现
- `image-preview`：继续压自定义 memo 比较器、`useLatestRef` 依赖和多余稳定回调，源码 gzip 已压到 `5KB` 以下
- `button`：压掉本体里无收益 `useMemo` 派生，保留 `ButtonGroup` Context 语义，避免父级 clone 注入导致体积反弹
- `build`：修复 `scripts/prune-dist.mjs` 对压缩后 `import{...}from` 语法的识别，恢复 ESM 子路径实现文件
- `size`：修复 `scripts/generate-docs-size-data.mjs` 的目标目录选择，优先统计完整 `dist/es/components`，必要时回退 `dist/cjs/components`
- `typecheck`：修复 `CheckboxGroup`、`picker/internal`、`RadioGroup` 三处旧类型阻塞
- `picker`：删除未挂载的 `FlatList` 引用和无效 `scrollToOffset` 分支，简化列选中索引计算
- `picker`：继续压 wheel 层低收益样式派生和 spacer 包装，保持 web/native 滚动语义不变
- `picker`：继续压 `internal.tsx` 的列准备和多列归一化分支，减少中间变量
- `form`：删除无用内部强制 rerender，简化 `FormList` 操作函数和 `FormItem` 值注入路径
- `slider`：压掉低成本派生缓存，thumb percent、active range、track style 改为直接计算，未动 aria/drag handler 主路径
- `dialog`：压掉本体无收益样式缓存，保留 `beforeClose`、Popup 组合和静态 API 语义
- `field`：将单用的 `FieldSlot / FieldControlRow` 包装改为本地函数/内联结构，去掉低收益 `useMemo` 派生
- `tabs`：去掉 tab name 到 index 的 `Map` 中间层，指示器动画直接从 panes 查找当前索引
- `tabs`：压掉 `TabBarItem` 样式数组构造中的运行时 `.filter(Boolean)`
- `swiper`：内联单用 web mouse handler，压掉低收益尺寸缓存和类型导入，保留 loop/autoplay/FlatList 主路径
- `collapse`：将单用 `Hairline` 组件改为本地渲染函数，直接计算内容/动画样式派生
- `action-sheet`：去掉低收益 popup style 缓存和 item press 嵌套 `useCallback`
- `image`：压平 `actualSource / sourceKey / uri / containerStyle` 小对象缓存，保留 SVG/loading/error 语义
- `notice-bar`：去掉纵向内容/track 的低收益 `useMemo`，保留横向滚动和纵向轮播逻辑
- `password-input`：减少中间 `cells` 对象数组，直接按 index 渲染单元格
- `typography`：去掉颜色 key 判断 helper，直接使用 `in` 判断颜色 token
- `progress`：去掉 filled track 里低收益 `useMemo` 样式缓存
- `selector`：删除 `optionsByVal` Map，中选项回传改为从 options 过滤
- `search`：去掉样式/图标/extra props 的低收益 `useMemo` 缓存，保留 Field 组合语义
- `nav-bar`：去掉 placeholder layout 的低收益 `useCallback` 包装
- `share-sheet`：去掉 header/popup style 等低收益 `useMemo` 缓存
- `circle`：去掉 base/content/content node 的低收益 `useMemo` 派生，保留 web/native 绘制路径
- `badge`：去掉 visible/content/样式派生的低收益 `useMemo` 缓存，保留测量和 offset 逻辑
- `water-mark`：去掉 zIndex/cell/mark/image/text 样式的低收益 `useMemo` 缓存
- `space`：内联单用 `resolveGapInput`
- `avatar`：复用 `minSide` 派生并去掉一次中间透明样式常量
- `input`：去掉 Field 外层样式的低收益 `useMemo` 缓存
- `flex`：删除纯中转 `FlexContext.ts`，Context 值从 `{ columns, horizontalGap, verticalGap }` 收窄为数字 `columns`
- `skeleton`：去掉节点级 `useMemo` 缓存，直接渲染 avatar/title/rows，保留 Animated opacity 与 reduced-motion 语义
- `datetime-picker`：去掉 popup 包装回调、顶层 onConfirm/onCancel ref、无用 `PopupProps` 类型导入，保留 Date/Time 边界归一化
- `area`：删除低收益 `cols`/normalize 包装层，保留级联值修正
- `tag` / `loading` / `count-down` / `switch`：压掉重复 import、样式过滤包装和低收益 size scale `useMemo`
- `switch`：补齐 `value` 作为 `checked` 的兼容别名，并使用 RN 原生 `onValueChange` 传入的新 checked 值，避免 Web/RN 受控状态不同步
- `config-provider`：删除空 token hook 文件，并把 `useLocale / useDirection` 收回到 `loc.ts` / `dir.ts` 私有短入口
- `portal`：删除空 token hook 文件，并把 `PortalManagerView` 内部 callback 链收进 imperative handle factory
- `safe-area-view`：删除空 token hook 文件，类型保留在 `types.ts`
- `button`：把 `ButtonGroupContext` 收回到 `Button.tsx`，避免 Button 本体反向导入 Group 模块；`ButtonGroup` 去掉低收益 style memo，保留 Context value memo
- `notify`：去掉本体里的 `isFunction` 依赖和每次渲染重建的 `addOffset`
- `image-preview`：复用 `imgLen` 传递 slide 总数，保留触摸阈值和 Swiper 语义
- `grid`：去掉父层数字归一化/边框节点的低收益 memo，并在 item 里移除 `isFunction` 工具依赖
- `cell`：保留 hairline 所需容器 memo，去掉 content/group title/style 的低收益 memo
- `tabbar`：删除 `itemNames` 中间数组、layout callback 和 item 里的 `isFunction` 工具依赖
- `sidebar`：去掉当前索引与内容文字样式的低收益 memo，保留 children clone memo
- `internal/imperativePortal`：去掉 ManagedPortal 内只调用 `setVisible(false)` 的 `useCallback`
- `form`：去掉 `FormItem` 里的 `isFunction` 依赖并复用 `child.props`，未动注册、依赖校验和订阅状态机
- `dialog`：将只读 ref 的关闭/确认/取消 handler 改为普通函数，并压掉 imperative 层纯 `setVisible(false)` callback，保留 `beforeClose` 同步/异步语义
- `slider`：去掉 track style 的低收益 `useCallback` 和 button 函数判断中间变量，未动拖拽增强主路径
- `tabs`：去掉 `TabBarItem` 标题/描述函数判断的 `isFunction` 工具依赖，未动测量/滚动状态机
- `picker`：把只返回 `!readOnly` 的 responder capture 从 `useCallback` 改为普通函数，保留 wheel/pan responder 主路径
- `shared runtime`：压缩 `useControllableValue / useCountDown / useAriaPress / useAnimatedTransition / platform/measure / utils/color / internal/feedback`，去掉低收益 hook 包装和单点工具依赖
- `feedback runtime`：修复 `useVisibilityLifecycle` 关闭完成触发条件，确保 `Notify / Toast` 静态调用关闭后执行 `onClosed/remove`，避免 Portal 节点残留遮挡页面
- `design-system`：压缩 `ThemeProvider` 与 `createComponentTokensHook`，复用内部 WeakMap 缓存，去掉重复 `useMemo`
- `internal/aria`：压缩 `utils/index`、`usePress`、`useKeyboardDismissable`、`useBackHandler`、`overlays/Portal`、`useOverlay.web`；web BackHandler 现在 `enabled=false` 时不再监听 Escape
- `internal/aria/slider`：`useMove` 改用 ref 记录 native 拖拽起点，避免 setState 重渲染和旧起点读取；`useSliderThumb` 修复无障碍 increment/decrement 的 min/max 取反与 `state.step` 优先级问题
- `scripts`：`prune-dist` 删除未使用 helper；`analyze-component-sizes` 从 `eval` 改为 `JSON.parse`；`generate-docs-size-data / generate-exports` 的脚本改写尝试因 gzip 反涨已回退
- `field`：删除 `FieldClearButton.show` 永真 prop、去掉单点工具依赖并收短 slot 类型，未动输入/清除/textarea 状态机
- `swiper`：删除纯中转 `SwiperItem.tsx`，`index.ts` 直接从 `Swiper.tsx` 引用 `SwiperItem`
- `overlay`：删除固定 zIndex token hook 文件，改为组件本体常量，类型保留在 `types.ts`
- `divider` / `empty` / `error-boundary`：逐个尝试低风险改写并复测，结果反涨或无收益，标记为确认极限
- `README`：重写项目定位、核心优势和架构说明，改为结果导向的专业工程化表达，突出轻量、性能、跨端一致和生产级基础设施，并保留自动生成的组件体积表区块
- `dialog`：修复静态 `alert` close/clear 路径 Promise 悬挂，并避免静态包装层重复执行 `beforeClose`
- `test runtime`：补齐 `test` 脚本、直接 `jest` 依赖和 Babel transform，当前全量 Jest 可执行且通过
- `pointerEvents / a11y`：将 `badge / checkbox / notify / notice-bar / picker / slider` 的运行时 `pointerEvents` 改回 RN prop；`radio` 恢复 `radiogroup` role 透传
- `form`：修复 `FormItem.initialValue` 首屏注入不稳定，重复 `resetFields` 可稳定回到字段初始值

## 当前验证基线

- `npm run build`：通过
- `npm run check:imports`：通过
- `npm run typecheck`：通过
- `npm test -- --runInBand`：通过（`70` 个 test suites，`533` 通过，`8` skipped）
- `npm run docs:update-size`：通过，当前读取完整 `dist/es/components`

## 当前目录与体积基线

- `src/hooks`：`22`
- `src/hooks/aria`：`5`
- `src/internal/aria`：`25`
- `src/utils`：`10`
- `dist/es` 文件数：`245`
- `dist/cjs` 文件数：`245`
- `dist/types` 文件数：`257`
- 共享 runtime gzip：`src/hooks 7890`、`src/internal 16363`、`src/platform 1273`、`src/design-system 4469`、`src/utils 5566`
- README 当前打包体积均值：约 `2.7 KB gzip`
- 当前组件状态统计：总数 `54`，已全部进入专项优化、结构优化、深审或确认极限；仍为 `基线` `0`

专项复测 gzip：

- `button`：`5321`
- `cell`：`4816`
- `checkbox`：`6810`
- `grid`：`4353`
- `sidebar`：`3298`
- `tabbar`：`4083`
- `toast`：`4612`
- `notify`：`4819`
- `image-preview`：`4990`
- `picker`：`10502`
- `form`：`7653`
- `slider`：`6654`
- `dialog`：`6670`
- `field`：`7632`
- `tabs`：`10254`
- `swiper`：`5593`
- `collapse`：`4363`
- `action-sheet`：`4198`
- `image`：`4213`
- `notice-bar`：`4118`
- `password-input`：`3940`
- `typography`：`3395`
- `progress`：`3349`
- `radio`：`6933`
- `selector`：`3659`
- `search`：`3196`
- `nav-bar`：`3218`
- `share-sheet`：`3287`
- `circle`：`3251`
- `badge`：`2670`
- `water-mark`：`2672`
- `space`：`2511`
- `avatar`：`2390`
- `input`：`2199`
- `config-provider`：`3662`
- `portal`：`2992`
- `safe-area-view`：`698`
- `overlay`：`1115`
- `flex`：`2272`
- `skeleton`：`2657`
- `datetime-picker`：`3761`
- `tag`：`2813`
- `loading`：`1503`
- `switch`：`1874`
- `count-down`：`1663`
- `area`：`2083`

共享 runtime 复测 gzip：

- `useControllableValue`：`599 -> 556`
- `useAriaPress`：`497 -> 439 -> 443`
- `useAriaOverlay`：`469`
- `useAnimatedTransition`：`758 -> 700`
- `ThemeProvider`：`710 -> 671`
- `createComponentTokensHook`：`757 -> 723`
- `internal/aria/utils`：`313 -> 250`
- `useBackHandler.native`：`332 -> 271`
- `useKeyboardDismissable`：`370 -> 337`
- `internal/aria Portal`：`1021 -> 994`
- `platform/measure`：`450 -> 433`
- `internal/aria slider useMove`：`509 -> 507`
- `prune-dist`：`1611 -> 1588`

## 当前重点组件

第一梯队：

- `field`
- `form`
- `slider`
- `swiper`
- `dialog`
- `tabs`
- `picker`

第二梯队：

- `image-preview`
- `button`
- `cell`
- `tabbar`
- `sidebar`
- `grid`
- `notice-bar`
- `password-input`

确认极限：

- `divider`
- `empty`
- `error-boundary`

## 执行约束

- 必须逐行阅读目标组件及其关联私有 helper。
- 不追求“抽象得更漂亮”，只追求更少文件、更少重复、更小体积、更稳行为。
- 每轮真实修改后，必须同步更新 `docs/component-extreme-audit.md`。
- 每轮真实修改后，必须同步更新本文件。
- 本轮已经验证：父组件直接注入内部运行时 props，比在同一组件族里继续保留运行时 Context Provider/Consumer 更适合 `cell / grid / sidebar / tabbar` 这类直系子项结构；后续看到类似模式时优先考虑沿这个方向压缩。
- 本轮新增验证结论：`docs:update-size` 失真根因是 ESM prune 误删实现文件；已通过修复 `prune-dist` 和 size 脚本恢复可信 ESM 口径。
- 本轮新增验证结论：空 token hook 文件或纯中转组件文件如果没有运行时价值，应删除或改为直接引用；`config-provider / portal / safe-area-view / swiper` 已按此收口，产物文件数从 `250` 降到 `246`。
- 本轮新增验证结论：`.web.ts` 文件不能 re-export `./internal`，否则 Vite/Web 平台解析可能把 `./internal` 解析回自身并触发 name resolution cycle；`checkbox / radio` 已通过本地 `shared.ts` 打断循环。
- 本轮新增验证结论：`overlay` 的固定 zIndex 不值得保留 token hook 文件，删除后源码 gzip `1326 -> 1115`，产物文件数继续下降。
- 本轮新增验证结论：`divider / empty / error-boundary` 已尝试低风险改写并确认无安全正收益点，后续不再作为基线遗留项。
- 本轮新增验证结论：`flex` 这类只给子项传一个数值的 Context，可优先改为 primitive Context 并删除 re-export 中转文件。
- 本轮新增验证结论：组合型组件中，保留 children clone 或 Context value 的关键 memo，但删除只包样式对象、当前索引、边框节点和工具函数判断的低收益 memo，通常能同时保住行为与体积收益。
- 本轮新增验证结论：P0 重组件可继续安全清理外围 hook 包装和工具依赖，但 `form` 状态机、`slider` 拖拽增强、`tabs` 测量滚动、`picker` wheel/pan responder 仍应避免大改。
- 本轮新增验证结论：组件外 runtime 也需要持续纳入审计；优先处理 `hooks / internal/aria / platform / design-system / utils` 中会进入产物的 wrapper、单点工具依赖和旧迁移代码。
- 本轮新增验证结论：反馈类静态 API 必须确保 `onClosed/remove` 在实际卸载后触发；`Notify / Toast` 依赖 `useVisibilityLifecycle`，该 hook 的 mounted 判断不可反向。
- 本轮新增验证结论：静态 `Dialog.alert` 在 close/clear 路径也必须 settle Promise；静态包装层不能二次执行已经由 `Dialog/Popup` 处理过的 `beforeClose`。
- 本轮新增验证结论：`pointerEvents` 必须作为 RN prop 传递，不能只塞进 style；`badge / checkbox / notify / notice-bar / picker / slider` 已按此修正并用全量 Jest 覆盖。
- 本轮新增验证结论：测试链路已恢复，`npm test -- --runInBand` 当前 `70` 个 suites 全部通过；后续发布前验证必须包含全量 Jest。
- 本轮新增验证结论：测试环境下 `internal/aria/utils` re-export `mergeProps` 可能被解析成非函数；`useAriaPress / useAriaOverlay` 已改为直接从 `@react-aria/utils` 引入。
- 本轮新增验证结论：`useHairline / utils/number / overlayStack` 尝试去 base 工具依赖反而变大，已回退；后续遇到类似点必须先量化再保留。
- 本轮新增验证结论：scripts 的“更现代写法”不一定更小；`generate-docs-size-data / generate-exports` 改写反涨后已回退，只保留 `prune-dist` 的正收益和 `analyze-component-sizes` 的安全修正。
- 本轮新增验证结论：`internal/aria/slider` 里可以做小幅正确性修复，但 web/native 手势主路径仍需保守，任何大改必须配合交互测试。
- 本轮新增边界：`ButtonGroupContext` 收回 `Button.tsx` 后类型产物曾从 `257` 到 `258`；删除 `swiper/SwiperItem.tsx` 后 `dist/types` 回到 `257`。为修复 `checkbox / radio` web cycle 新增 shared 文件，但最终 dist 仍可 prune 到 `245`。
- 剩余 `divider / empty / error-boundary / overlay` 体积已经很小；如果尝试后 gzip 反涨，应回退而不是硬凑“优化记录”。
- 如果优先级、切入点或固定执行要求发生变化，还要同步更新 `references/handoff-playbook.md`。
- 如果工作流或触发条件发生变化，还要同步更新 `SKILL.md` 和 `agents/openai.yaml`。
