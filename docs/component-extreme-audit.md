# 组件极致审计基线

最后更新：2026-04-22

## 目标

这份文档用于跟踪组件库的“极致压缩 + 极致实现”审计进度，核心目标只有一件事：

- 按组件逐行深审，把重复逻辑、私有 helper、冗余状态、重复样式拼装、无意义中间层持续压掉。
- 目标是逐轮向 `98+` 甚至满分逼近，但文档必须记录真实现状，不虚报分数。

## 评分规则

- `S`：`95-100`，已非常接近极致状态。
- `A`：`88-94`，整体优秀，仍有明确可继续压缩点。
- `B`：`80-87`，实现可靠，但离“压无可压”还有明显空间。
- `C`：`<80`，仍有较重历史包袱，需要优先治理。

说明：

- 全量组件都给当前分数，方便统一排优先级。
- `已深审` 组件表示已经做过逐行阅读和人工校正，置信度更高。
- `基线` 组件分数来自当前源码 gzip、代码行数、目录收口程度、重复逻辑密度和实现复杂度的综合判断。

## 本轮已完成

- `calendar`：修正 [`src/components/calendar/Calendar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/calendar/Calendar.tsx) 内联 `clampMonth` 超出 `maxDate` 所在月时误返回完整 `max` 的问题，改为返回 `maxMonth`（与 `minMonth` 对称）
- `tabs`：[`src/components/tabs/Tabs.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabs/Tabs.tsx) 可滑动内容在容器宽度从 0 变为有效值时横向 `scrollTo` 不带动画，减少弹层内多余滑动
- `cascader`：[`src/components/cascader/Cascader.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cascader/Cascader.tsx) 仅在路径/列结构变化时同步 `active`；`poppable` 重开恢复上次列；选项 `FlatList` 关闭 `removeClippedSubviews`
- `Field`：将 [`src/hooks/field/renderers.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/field/renderers.tsx) 内聚回 [`src/components/field/Field.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/field/Field.tsx)
- `Slider`：将 [`src/hooks/slider/utils.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/slider/utils.tsx) 内聚回 [`src/components/slider/Slider.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/slider/Slider.tsx)
- `Form`：将 [`src/hooks/form/utils.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/form/utils.ts) 内聚回 [`src/components/form/Form.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/form/Form.tsx)
- `aria`：将旧的 `src/hooks/aria/rn-aria` 体系整体迁到 [`src/internal/aria`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria)，公开层只保留真正对外的 hook
- `radio`：私有 aria 桥接收回到 [`src/components/radio/internal.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/radio/internal.ts) 和 [`src/components/radio/internal.web.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/radio/internal.web.ts)
- `checkbox`：私有 aria 桥接收回到 [`src/components/checkbox/internal.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/checkbox/internal.ts) 和 [`src/components/checkbox/internal.web.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/checkbox/internal.web.ts)
- `checkbox / radio`：修复 web 平台 `internal.web.ts -> ./internal` re-export 导致的 Vite 名称解析循环；新增组件本地 [`shared.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/checkbox/shared.ts) 承载公共 hook，`internal.ts` 与 `internal.web.ts` 分别引用，避免平台后缀解析回到自身
- `toast / notify / image-preview`：把重复的 `Portal + visible state + close registry` 命令式挂载逻辑抽到共享内部模块 [`src/internal/imperativePortal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/imperativePortal.tsx)，减少重复 runtime 实现
- `toast / notify`：把共同的最新回调引用、自动关闭、打开关闭生命周期收敛到 [`src/internal/feedback.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/feedback.ts)
- `image-preview`：合并分散的最新索引/回调引用，并补上 `requestAnimationFrame` 缺失时的 `swipeTo` 兜底，避免某些环境复开后索引不同步
- `button`：删除纯内部中转层 [`src/components/button/ButtonContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/button/ButtonContext.ts)，直接从 [`src/components/button/ButtonGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/button/ButtonGroup.tsx) 引用上下文
- `grid`：删除纯内部中转层 [`src/components/grid/GridContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/GridContext.ts)，直接从 [`src/components/grid/Grid.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/Grid.tsx) 引用上下文
- `cell / sidebar / tabbar`：删除纯内部中转层 [`src/components/cell/CellContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cell/CellContext.ts)、[`src/components/sidebar/SidebarContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/sidebar/SidebarContext.ts)、[`src/components/tabbar/TabbarContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabbar/TabbarContext.ts)，分别内聚回宿主组件文件，缩短导入链并减少产物文件数
- `cell / grid / sidebar / tabbar`：继续把宿主文件里剩余的运行时 `Context Provider/Consumer` 链路压掉，改成父组件在 [`src/components/cell/CellGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cell/CellGroup.tsx)、[`src/components/grid/Grid.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/Grid.tsx)、[`src/components/sidebar/Sidebar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/sidebar/Sidebar.tsx)、[`src/components/tabbar/Tabbar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabbar/Tabbar.tsx) 直接注入内部运行时 props；子项 [`Cell.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cell/Cell.tsx)、[`GridItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/GridItem.tsx)、[`SidebarItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/sidebar/SidebarItem.tsx)、[`TabbarItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabbar/TabbarItem.tsx) 不再依赖 `useContext`，缩短渲染路径并减少上下文参与
- `toast / notify`：继续压组件本体里的 `useMemo / useCallback / latestRef` 包装层，直接在 [`src/components/toast/Toast.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/toast/Toast.tsx)、[`src/components/notify/Notify.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/notify/Notify.tsx) 内联简单样式派生和交互回调；命令式桥接 [`src/components/toast/imperative.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/toast/imperative.tsx)、[`src/components/notify/imperative.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/notify/imperative.tsx) 也去掉了仅为稳定引用存在的 `useCallback` 包装
- `image-preview`：继续压 [`src/components/image-preview/ImagePreview.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/image-preview/ImagePreview.tsx) 和 [`src/components/image-preview/imperative.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/image-preview/imperative.tsx)，去掉自定义 memo 比较器、外部 `useLatestRef` 依赖和多余 `useCallback` 包装；保留懒加载、触摸位移阈值、`beforeClose` 和命令式关闭语义
- `button`：继续压 [`src/components/button/Button.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/button/Button.tsx) 内部无收益 `useMemo` 派生，保留 `ButtonGroup` 运行时 Context 语义，避免上轮父级 clone 注入导致的体积反弹
- `build`：修复 [`scripts/prune-dist.mjs`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/scripts/prune-dist.mjs) 对压缩后 `import{...}from` 语法的依赖识别，避免 ESM 子路径实现文件被误删
- `size`：修复 [`scripts/generate-docs-size-data.mjs`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/scripts/generate-docs-size-data.mjs) 的目标目录选择，优先使用完整的 `dist/es/components`，必要时回退到 `dist/cjs/components`，重新生成 [`docs/component-sizes.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/component-sizes.ts) 和 [`README.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/README.md)
- `typecheck`：修复 [`src/components/checkbox/CheckboxGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/checkbox/CheckboxGroup.tsx)、[`src/components/picker/internal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/picker/internal.tsx)、[`src/components/radio/RadioGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/radio/RadioGroup.tsx) 三处历史类型阻塞，现在 `npm run typecheck` 可通过
- `picker`：继续压 [`src/components/picker/Picker.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/picker/Picker.tsx)，删除未挂载的 `FlatList` 引用和无效 `scrollToOffset` 分支，简化列选中索引计算，减少 `Map/useMemo` 派生
- `picker`：继续压 wheel 层低收益 `useMemo/useCallback` 样式派生，去掉 spacer 包装、indicator/web transform/native container style 缓存，保持 web/native 滚动和手势语义不变
- `picker`：继续压 [`src/components/picker/internal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/picker/internal.tsx) 的列准备与多列归一化分支，减少重复变量和中间判断
- `form`：继续压 [`src/components/form/Form.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/form/Form.tsx)、[`src/components/form/FormItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/form/FormItem.tsx)、[`src/components/form/FormList.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/form/FormList.tsx)，删除无用内部强制 rerender、简化 `FormList` 操作函数和 `FormItem` 值注入路径
- `slider`：继续压 [`src/components/slider/Slider.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/slider/Slider.tsx) 中的低成本派生缓存，把 thumb percent、active range、track style 等改为直接计算，保留 aria/drag handler 主路径不变
- `dialog`：继续压 [`src/components/dialog/Dialog.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/dialog/Dialog.tsx) 中无收益样式缓存，把标题、内容、footer、popup 样式派生改为直接计算，保留 `beforeClose`、Popup 组合和静态 API 语义不变
- `field`：继续压 [`src/components/field/Field.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/field/Field.tsx)，将单用的 `FieldSlot / FieldControlRow` 包装改为本地函数/内联结构，去掉低收益 `useMemo` 派生，保留输入、清除、格式化和 tooltip 语义
- `tabs`：继续压 [`src/components/tabs/Tabs.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabs/Tabs.tsx) 和 [`src/components/tabs/internal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabs/internal.tsx)，去掉 tab name 到 index 的 `Map` 中间层，指示器动画直接从 panes 查找当前索引
- `tabs`：继续压 [`src/components/tabs/internal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabs/internal.tsx) 中 `TabBarItem` 的样式数组构造，去掉运行时 `.filter(Boolean)`，保留 header 渲染语义
- `swiper`：继续压 [`src/components/swiper/Swiper.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/swiper/Swiper.tsx) 和 [`src/components/swiper/SwiperPagIndicator.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/swiper/SwiperPagIndicator.tsx)，内联单用 web mouse handler，压掉低收益尺寸缓存和类型导入，保留 loop/autoplay/FlatList 主路径
- `collapse`：继续压 [`src/components/collapse/Collapse.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/collapse/Collapse.tsx)，将单用 `Hairline` 组件改为本地渲染函数，并直接计算内容/动画样式派生
- `action-sheet`：继续压 [`src/components/action-sheet/ActionSheet.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/action-sheet/ActionSheet.tsx)，去掉低收益 popup style 缓存和 item press 嵌套 `useCallback`
- `image`：继续压 [`src/components/image/Image.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/image/Image.tsx)，压平 `actualSource / sourceKey / uri / containerStyle` 等小对象缓存，保留 SVG/loading/error 语义
- `notice-bar`：继续压 [`src/components/notice-bar/NoticeBar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/notice-bar/NoticeBar.tsx)，去掉纵向内容/track 的低收益 `useMemo`，保留横向滚动和纵向轮播逻辑
- `password-input`：继续压 [`src/components/password-input/PasswordInput.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/password-input/PasswordInput.tsx)，减少中间 `cells` 对象数组，直接按 index 渲染单元格
- `typography`：继续压 [`src/components/typography/Typography.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/typography/Typography.tsx)，去掉颜色 key 判断 helper，直接使用 `in` 判断颜色 token
- `progress`：继续压 [`src/components/progress/Progress.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/progress/Progress.tsx)，去掉 filled track 里低收益 `useMemo` 样式缓存
- `selector`：继续压 [`src/components/selector/Selector.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/selector/Selector.tsx)，删除 `optionsByVal` Map，中选项回传改为从 options 过滤
- `search`：继续压 [`src/components/search/Search.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/search/Search.tsx)，去掉样式/图标/extra props 的低收益 `useMemo` 缓存，保留 Field 组合与搜索/取消回调语义
- `nav-bar`：继续压 [`src/components/nav-bar/NavBar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/nav-bar/NavBar.tsx)，去掉 placeholder layout 的低收益 `useCallback` 包装
- `share-sheet`：继续压 [`src/components/share-sheet/ShareSheet.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/share-sheet/ShareSheet.tsx)，去掉 header/popup style 等低收益 `useMemo` 缓存
- `circle`：继续压 [`src/components/circle/Circle.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/circle/Circle.tsx)，去掉 base/content/content node 的低收益 `useMemo` 派生，保留 web/native 绘制路径
- `badge`：继续压 [`src/components/badge/Badge.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/badge/Badge.tsx)，去掉 visible/content/样式派生的低收益 `useMemo` 缓存，保留测量和 offset 逻辑
- `water-mark`：继续压 [`src/components/water-mark/WaterMark.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/water-mark/WaterMark.tsx)，去掉 zIndex/cell/mark/image/text 样式的低收益 `useMemo` 缓存
- `space`：继续压 [`src/components/space/Space.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/space/Space.tsx) 和 [`src/components/space/tokens.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/space/tokens.ts)，内联单用 `resolveGapInput`
- `avatar`：继续压 [`src/components/avatar/Avatar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/avatar/Avatar.tsx)，复用 `minSide` 派生并去掉一次中间透明样式常量
- `input`：继续压 [`src/components/input/Input.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/input/Input.tsx)，去掉 Field 外层样式的低收益 `useMemo` 缓存
- `flex`：继续压 [`src/components/flex/Flex.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/flex/Flex.tsx) 和 [`src/components/flex/FlexItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/flex/FlexItem.tsx)，把只传 `columns` 的 Context 从对象改为数字，并删除纯中转文件 `FlexContext.ts`
- `skeleton`：继续压 [`src/components/skeleton/Skeleton.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/skeleton/Skeleton.tsx)，去掉节点级 `useMemo` 缓存，保留 reduced-motion 与 Animated opacity 语义
- `datetime-picker`：继续压 [`src/components/datetime-picker/DatetimePicker.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/datetime-picker/DatetimePicker.tsx)，去掉 popup 包装回调、过期回调 ref 和无用 `PopupProps` 类型导入，保留 Date/Time Picker 边界归一化逻辑
- `area`：继续压 [`src/components/area/Area.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/area/Area.tsx)，删除低收益 `cols`/normalize 包装层，保留级联值修正
- `tag / loading / count-down / switch`：压掉 [`Tag.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tag/Tag.tsx)、[`Loading.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/loading/Loading.tsx)、[`CountDown.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/count-down/CountDown.tsx)、[`Switch.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/switch/Switch.tsx) 中重复 import、低收益 `useMemo` 和样式过滤包装
- `switch`：补齐 [`src/components/switch/Switch.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/switch/Switch.tsx) 对 `value` 受控别名的支持，并使用 RN 原生 `onValueChange` 传入的新 checked 值，避免 Web/RN 受控状态不同步
- `config-provider`：删除空 token hook 文件，并把 `useLocale / useDirection` 收回到更短的内部入口 [`src/components/config-provider/loc.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/config-provider/loc.ts) 与 [`src/components/config-provider/dir.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/config-provider/dir.ts)，减少导入层级与产物文件数
- `portal / safe-area-view`：删除空 token hook 文件，`PortalHost` 进一步把 manager view 的内部 `useCallback` 链收进 imperative handle factory，减少 Portal runtime 包装
- `button`：把 `ButtonGroupContext` 收回 [`src/components/button/Button.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/button/Button.tsx)，避免 Button 本体反向导入 Group 模块；[`ButtonGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/button/ButtonGroup.tsx) 去掉低收益 style memo，保留 Context value memo
- `notify`：继续压 [`src/components/notify/Notify.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/notify/Notify.tsx)，去掉 `isFunction` 依赖和每次渲染重建的 `addOffset`
- `image-preview`：继续压 [`src/components/image-preview/ImagePreview.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/image-preview/ImagePreview.tsx)，复用 `imgLen` 传递 slide 总数，保留触摸阈值和 Swiper 语义
- `grid`：继续压 [`src/components/grid/Grid.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/Grid.tsx) 与 [`GridItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/GridItem.tsx)，去掉数字归一化/边框节点的低收益 memo 和 `isFunction` 工具依赖
- `cell`：继续压 [`src/components/cell/Cell.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cell/Cell.tsx) 与 [`CellGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cell/CellGroup.tsx)，保留 hairline 所需容器 memo，去掉 content/group title/style 的低收益 memo
- `tabbar`：继续压 [`src/components/tabbar/Tabbar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabbar/Tabbar.tsx) 与 [`TabbarItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabbar/TabbarItem.tsx)，删除 `itemNames` 中间数组、layout callback 和 `isFunction` 工具依赖
- `sidebar`：继续压 [`src/components/sidebar/Sidebar.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/sidebar/Sidebar.tsx)，去掉当前索引与内容文字样式的低收益 memo，保留 children clone memo
- `internal`：继续压 [`src/internal/imperativePortal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/imperativePortal.tsx)，去掉 ManagedPortal 内只调用 `setVisible(false)` 的 `useCallback`
- `form`：继续压 [`src/components/form/FormItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/form/FormItem.tsx)，去掉 `isFunction` 依赖并复用 `child.props`，不动注册、依赖校验和订阅状态机
- `dialog`：继续压 [`src/components/dialog/Dialog.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/dialog/Dialog.tsx) 和 [`imperative.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/dialog/imperative.tsx)，将只读 ref 的关闭/确认/取消 handler 改为普通函数，保留 `beforeClose` 同步/异步语义
- `slider`：继续压 [`src/components/slider/Slider.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/slider/Slider.tsx)，去掉 track style 的低收益 `useCallback` 和 button 函数判断中间变量，未动拖拽增强主路径
- `tabs`：继续压 [`src/components/tabs/internal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabs/internal.tsx)，去掉 `TabBarItem` 标题/描述函数判断的 `isFunction` 工具依赖，保留测量和滚动状态机
- `picker`：继续压 [`src/components/picker/Picker.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/picker/Picker.tsx)，把只返回 `!readOnly` 的 responder capture 从 `useCallback` 改为普通函数，保留 wheel/pan responder 主路径
- `shared runtime`：继续压 [`src/hooks/useControllableValue.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/useControllableValue.ts)、[`src/hooks/useCountDown.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/useCountDown.ts)、[`src/hooks/aria/useAriaPress.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/aria/useAriaPress.ts)、[`src/hooks/animation/useAnimatedTransition.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/animation/useAnimatedTransition.ts)、[`src/platform/measure.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/platform/measure.ts)、[`src/utils/color.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/utils/color.ts)，去掉低收益 hook 包装和单点工具依赖
- `feedback runtime`：修复 [`src/internal/feedback.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/feedback.ts) 中 `useVisibilityLifecycle` 的关闭完成触发条件，确保 `Notify / Toast` 静态调用关闭后一定执行 `onClosed/remove`，避免 Portal 节点残留遮挡页面
- `design-system`：继续压 [`src/design-system/ThemeProvider.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/design-system/ThemeProvider.tsx) 与 [`src/design-system/createComponentTokensHook.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/design-system/createComponentTokensHook.ts)，复用内部 WeakMap 缓存，去掉重复 `useMemo`
- `internal/aria`：继续压 [`src/internal/aria/utils/index.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria/utils/index.ts)、[`src/internal/aria/interactions/usePress.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria/interactions/usePress.ts)、[`src/internal/aria/interactions/useKeyboardDismisssable.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria/interactions/useKeyboardDismisssable.ts)、[`src/internal/aria/interactions/useBackHandler.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria/interactions/useBackHandler.ts)、[`src/internal/aria/overlays/Portal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria/overlays/Portal.tsx)，并让 web BackHandler 在 `enabled=false` 时不再监听 Escape
- `internal/aria/slider`：继续压 [`src/internal/aria/slider/useMove.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria/slider/useMove.ts)，用 ref 记录 native 拖拽起点，避免 setState 重渲染和旧起点读取；修复 [`useSliderThumb.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria/slider/useSliderThumb.ts) 无障碍 increment/decrement 的 min/max 取反与 `state.step` 优先级问题
- `scripts`：继续压 [`scripts/prune-dist.mjs`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/scripts/prune-dist.mjs) 删除未使用 helper；[`scripts/analyze-component-sizes.mjs`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/scripts/analyze-component-sizes.mjs) 从 `eval` 改为 `JSON.parse`，提升体积分析脚本安全性
- `field`：继续压 [`src/components/field/Field.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/field/Field.tsx)，删除 `FieldClearButton.show` 永真 prop、去掉单点工具依赖并收短 slot 类型，不碰输入/清除/textarea 状态机
- `swiper`：删除纯中转文件 [`src/components/swiper/SwiperItem.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/swiper/SwiperItem.tsx)，[`index.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/swiper/index.ts) 直接从 `Swiper.tsx` 引用 `SwiperItem`
- `dialog`：修复 [`src/components/dialog/imperative.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/dialog/imperative.tsx) 静态 `alert` 在 close/clear 路径 Promise 悬挂的问题，并避免静态包装层重复执行 `beforeClose`
- `test runtime`：补齐 [`package.json`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/package.json) 的 `test` 脚本与 Jest/Babel transform 直接依赖，现可执行全量测试
- `pointerEvents / a11y`：将 `badge / checkbox / notify / notice-bar / picker / slider` 中需要命中 RN 运行时的 `pointerEvents` 从样式对象移回 prop；`radio` 恢复 `radiogroup` role 透传
- `form`：修复 `FormItem.initialValue` 在首屏注册前注入值不稳定的问题，保持重复 `resetFields` 仍回到字段初始值

## 当前验证与统计

- `npm run build`：通过
- `npm run check:imports`：通过
- `npm run typecheck`：通过
- `npm test -- --runInBand`：通过（`70` 个 test suites，`533` 通过，`8` skipped）
- `npm run docs:update-size`：通过；当前使用完整的 `dist/es/components` 统计，README 均值约 `2.7 KB gzip`

当前目录统计：

- `src/hooks`：`22`
- `src/hooks/aria`：`5`
- `src/internal/aria`：`25`
- `src/utils`：`10`
- `dist/es` 文件数：`245`
- `dist/cjs` 文件数：`245`
- `dist/types` 文件数：`257`
- 共享 runtime gzip：`src/hooks 7890`、`src/internal 16363`、`src/platform 1273`、`src/design-system 4469`、`src/utils 5566`

说明：

- `dist/es` 与 `dist/cjs` 当前都保留 `245` 个文件；`checkbox / radio` 为修复源码 Web 平台解析循环新增 shared 私有文件，最终 dist 仍可被 prune 到当前文件数。
- 本轮复测源码目录 gzip：
  - `button`：`5528 -> 5447 -> 5438 -> 5321`
  - `cell`：`5035 -> 4925 -> 4874 -> 4816`
  - `checkbox`：`6773 -> 6810`
  - `grid`：`4505 -> 4432 -> 4391 -> 4353`
  - `sidebar`：`3537 -> 3419 -> 3322 -> 3298`
  - `tabbar`：`4306 -> 4142 -> 4112 -> 4083`
  - `toast`：`5202 -> 5044 -> 4843 -> 4618`
  - `notify`：`5370 -> 5196 -> 5045 -> 4844 -> 4822 -> 4819`
  - `image-preview`：`5449 -> 5270 -> 5268 -> 4977 -> 4993 -> 4990`
  - `picker`：`10725 -> 10711 -> 10560 -> 10526 -> 10485 -> 10511 -> 10498 -> 10502`
  - `form`：`7724 -> 7710 -> 7634 -> 7655 -> 7644 -> 7653`
  - `slider`：`6800 -> 6793 -> 6705 -> 6716 -> 6654`
  - `dialog`：`6814 -> 6824 -> 6682 -> 6670 -> 6647 -> 6670`
  - `field`：`7847 -> 7838 -> 7661 -> 7632`
  - `tabs`：`10343 -> 10327 -> 10254 -> 10242 -> 10261 -> 10254`
  - `swiper`：`5822 -> 5826 -> 5651 -> 5656 -> 5593`
  - `collapse`：`4432 -> 4359`
  - `action-sheet`：`4238 -> 4184`
  - `image`：`4280 -> 4195`
  - `notice-bar`：`4171 -> 4164 -> 4102 -> 4118`
  - `password-input`：`3990 -> 3973 -> 3921`
  - `typography`：`3462 -> 3457 -> 3384`
  - `progress`：`3369 -> 3366 -> 3344`
  - `radio`：`6944 -> 6933`
  - `selector`：`3719 -> 3713 -> 3651 -> 3659`
  - `search`：`3281 -> 3196`
  - `nav-bar`：`3235 -> 3223 -> 3207`
  - `share-sheet`：`3353 -> 3356 -> 3289`
  - `circle`：`3280 -> 3269 -> 3237`
  - `badge`：`2805 -> 2811 -> 2676 -> 2670`
  - `water-mark`：`2721 -> 2671`
  - `space`：`2593 -> 2576 -> 2496`
  - `avatar`：`2397 -> 2386 -> 2379`
  - `input`：`2215 -> 2218 -> 2203`
  - `config-provider`：`4001 -> 3816 -> 3662`
  - `portal`：`3202 -> 3038 -> 2992`
  - `safe-area-view`：`869 -> 698`
  - `overlay`：`1326 -> 1115`
  - `flex`：`2433 -> 2262 -> 2272`
  - `skeleton`：`2782 -> 2657`
  - `datetime-picker`：`3903 -> 3761`
  - `tag`：`2853 -> 2813`
  - `loading`：`1534 -> 1503`
  - `switch`：`1817 -> 1803 -> 1874`
  - `count-down`：`1666 -> 1663`
  - `area`：`2100 -> 2083`
- 共享 runtime 本轮复测 gzip：
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

## 已深审重点组件

| 组件 | 分数 | 等级 | 当前判断 | 下一轮重点 |
| --- | ---: | --- | --- | --- |
| `popup` | 91 | A | 结构已经很紧，私有逻辑收口良好，接近极致状态 | 继续盯 overlay 依赖传递与样式重复 |
| `cascader` | 90 | A | 多级联动逻辑已较集中，重复 helper 已明显减少 | 再检查列渲染和选中映射是否还能共用 |
| `number-keyboard` | 90 | A | 运行时负担可控，私有工具已回收，结构比较干净 | 再看按键矩阵和事件封装能否继续收缩 |
| `picker` | 88 | A | 复杂度高但已可控，内部逻辑已经比原来紧凑 | 继续压 wheel/column 计算路径 |
| `tabs` | 87 | B | 内部拆分方向正确，但滚动、测量、指示器仍偏重 | 继续审查 tab header 计算与渲染分支 |
| `calendar` | 86 | B | 日期状态机清晰，但范围选择和禁用判断仍较重 | 再看日期归一化与列表渲染分支 |
| `stepper` | 86 | B | 逻辑边界清楚，体积控制还不错 | 继续看按钮渲染与格式化处理的重复点 |
| `dialog` | 86 | B | 组件本体不算差，但 imperative + overlay 成本偏高 | 继续压静态调用层与按钮/内容组合逻辑 |
| `swiper` | 85 | B | 手势与自动播放逻辑天然较重，当前实现仍有优化余地 | 继续压定时器、索引同步、分页渲染 |
| `slider` | 85 | B | 私有 utils 已回收，但拖拽包装与无障碍桥接仍偏重 | 继续压 handler 包装和 visual percent 计算 |
| `form` | 82 | B | 私有 utils 已回收，但验证、依赖图、订阅更新仍偏重 | 继续拆掉重复路径处理与不必要的通知 |
| `field` | 81 | B | 私有 renderers 已回收，但 API 面很大、分支密度高 | 继续压 affix/icon/message/word-limit 的重复渲染路径 |

## 全量组件当前分数

| 组件 | 分数 | 等级 | gzip | 行数 | 审计状态 |
| --- | ---: | --- | ---: | ---: | --- |
| `action-sheet` | 86 | B | 4198 | 211 | 专项优化 |
| `area` | 94 | A | 2083 | 114 | 专项优化 |
| `avatar` | 93 | A | 2390 | 164 | 专项优化 |
| `badge` | 92 | A | 2670 | 118 | 专项优化 |
| `button` | 84 | B | 5321 | 268 | 专项优化 |
| `calendar` | 86 | B | 6399 | 255 | 已深审 |
| `cascader` | 90 | A | 7310 | 311 | 已深审 |
| `cell` | 88 | A | 4816 | 239 | 专项优化 |
| `checkbox` | 88 | A | 6810 | 345 | 结构已优化 |
| `circle` | 89 | A | 3251 | 162 | 专项优化 |
| `collapse` | 86 | B | 4363 | 170 | 专项优化 |
| `config-provider` | 90 | A | 3662 | 351 | 专项优化 |
| `count-down` | 95 | S | 1663 | 87 | 专项优化 |
| `datetime-picker` | 89 | A | 3761 | 184 | 专项优化 |
| `dialog` | 86 | B | 6670 | 264 | 已深审 |
| `divider` | 94 | A | 2081 | 102 | 确认极限 |
| `empty` | 94 | A | 2066 | 97 | 确认极限 |
| `error-boundary` | 97 | S | 929 | 40 | 确认极限 |
| `field` | 81 | B | 7632 | 988 | 已深审 |
| `flex` | 93 | A | 2272 | 105 | 专项优化 |
| `form` | 82 | B | 7653 | 209 | 已深审 |
| `grid` | 87 | B | 4353 | 177 | 专项优化 |
| `image` | 86 | B | 4213 | 167 | 专项优化 |
| `image-preview` | 85 | B | 4990 | 223 | 专项优化 |
| `input` | 93 | A | 2199 | 120 | 专项优化 |
| `loading` | 95 | S | 1503 | 92 | 专项优化 |
| `nav-bar` | 89 | A | 3218 | 135 | 专项优化 |
| `notice-bar` | 89 | A | 4118 | 136 | 专项优化 |
| `notify` | 85 | B | 4819 | 255 | 专项优化 |
| `number-keyboard` | 90 | A | 5838 | 213 | 已深审 |
| `overlay` | 96 | S | 1115 | 45 | 专项优化 |
| `password-input` | 89 | A | 3940 | 189 | 专项优化 |
| `picker` | 88 | A | 10502 | 389 | 已深审 |
| `popup` | 91 | A | 5699 | 215 | 已深审 |
| `portal` | 90 | A | 2992 | 110 | 专项优化 |
| `progress` | 89 | A | 3349 | 128 | 专项优化 |
| `radio` | 88 | A | 6933 | 342 | 结构已优化 |
| `safe-area-view` | 97 | S | 698 | 31 | 专项优化 |
| `search` | 89 | A | 3196 | 179 | 专项优化 |
| `selector` | 89 | A | 3659 | 141 | 专项优化 |
| `share-sheet` | 89 | A | 3287 | 130 | 专项优化 |
| `sidebar` | 90 | A | 3298 | 152 | 专项优化 |
| `skeleton` | 93 | A | 2657 | 100 | 专项优化 |
| `slider` | 85 | B | 6654 | 529 | 已深审 |
| `space` | 92 | A | 2511 | 107 | 专项优化 |
| `stepper` | 86 | B | 5620 | 187 | 已深审 |
| `swiper` | 85 | B | 5593 | 264 | 已深审 |
| `switch` | 94 | A | 1874 | 90 | 专项优化 |
| `tabbar` | 88 | A | 4083 | 163 | 专项优化 |
| `tabs` | 87 | B | 10254 | 344 | 已深审 |
| `tag` | 92 | A | 2813 | 134 | 专项优化 |
| `toast` | 86 | B | 4612 | 187 | 专项优化 |
| `typography` | 89 | A | 3395 | 206 | 专项优化 |
| `water-mark` | 92 | A | 2672 | 111 | 专项优化 |

## 当前结论

- 目前真正接近“极致状态”的是 `count-down / error-boundary / loading / overlay / safe-area-view` 这类小而纯的组件。
- 当前还没有任何组件达到稳定可信的 `98+`，这一点必须诚实记录。
- 现阶段最需要继续深挖的仍是高复杂度、高分支密度组件：`field / form / slider / swiper / dialog / tabs / picker`。
- 第二梯队是本轮已经开始压缩、但还没到底的组件：`toast / notify / image-preview / button / cell / grid / tabbar / sidebar / notice-bar / password-input`。
- `cell / grid / sidebar / tabbar` 这一轮继续变紧，收益主要来自低收益 memo、工具函数依赖和中间数组回收；其中 `cell` 与 `tabbar` 已进入 A 档边缘。
- `toast / notify` 这一轮继续拿到了真实 gzip 收益，说明组件本体和共享 imperative runtime 仍有小幅压缩空间；但命令式 options merge 还没到终局。
- `image-preview` 仍保持在 `5KB` 以下，但 `Swiper` 手势、内容点击关闭和命令式挂载仍然让它不可能直接进入高分段。
- `button` 这轮把 `ButtonGroupContext` 收回本体，避免 Button 反向依赖 Group；保留 Context value memo，避免为了几字节牺牲 Group 子项稳定性。
- `picker` 本轮继续删除一个低收益 responder callback，仍然是全库最重组件之一，下一步要继续针对 web wheel / pan responder / 虚拟渲染路径深挖。
- `form` 这一轮修复了 `FormItem.initialValue` 首屏注入与重复 reset 稳定性，验证状态机未重写；依赖图、订阅通知和批量校验仍然是后续重点。
- `slider` 这一轮只压了 track style 和 button 函数判断外围路径，并修正 disabled thumb 的 `pointerEvents` 运行时 prop；后续重点仍是拖拽包装和无障碍桥接。
- `dialog` 这一轮修复了静态调用层 `alert` Promise 悬挂和 `beforeClose` 重复执行；后续重点仍是静态调用层和按钮组合逻辑。
- `field` 已从 `C` 档进入 `B` 档，本轮继续压了低风险类型/工具/clear wrapper，但 API 面和渲染分支依然很大，后续还需要继续压 affix/icon/message/word-limit 路径。
- `tabs` 本轮继续去掉 TabBarItem 的 `isFunction` 工具依赖，收益较小；测量、滚动和 swipe 状态机仍是高风险主战场。
- `swiper` 已删除纯中转 `SwiperItem.tsx` 并明显收缩 web mouse handler 包装，但自动播放、loop 索引同步和 FlatList 失败兜底仍是后续重点。
- 构建链路本轮有实质修复：ESM 子路径产物不再被 prune 误删，`docs:update-size` 也恢复为可信 ESM 口径。
- `config-provider / portal / safe-area-view / swiper / overlay` 本轮删除了空 token hook 或纯中转文件，运行时产物降到 `245`；`checkbox / radio` 的 web cycle 修复只影响源码解析路径，最终 dist 仍能被 prune 到当前文件数。
- `overlay` 本轮删除固定 zIndex token hook 文件，源码 gzip `1326 -> 1115`，并让运行时产物文件数继续下降。
- `divider / empty / error-boundary` 已逐个尝试低风险改写并复测，结果反涨或无收益，当前标记为“确认极限”，不再作为基线遗留项。
- `flex` 本轮删除了纯中转 `FlexContext.ts` 并把 Context 值收窄为数字；后续看到同类“只传一个值”的 Context 可优先沿这个方向评估。
- `skeleton / datetime-picker / area / tag / loading / count-down / switch` 已从基线进入专项优化状态，但其中 `datetime-picker` 仍依赖 `Picker` 的重逻辑，不宜虚高评分。
- 组件外共享 runtime 本轮也完成一轮收口：`hooks / internal/aria / platform / design-system / utils` 共减少约 `456B gzip`（单文件源码口径）；本轮为了绕开测试环境下 `internal/aria/utils` re-export 解析差异，`useAriaPress / useAriaOverlay` 改为直接引用 `@react-aria/utils` 的 `mergeProps`。
- 测试链路已经补齐：`npm test -- --runInBand` 当前 `70` 个 suites 全部通过，后续组件改动必须把全量 Jest 纳入发布前门槛。
- `Notify / Toast` 的静态 Portal 生命周期已修复，关闭完成后会在 `mounted=false` 时触发 `onClosed/remove`，避免不可见节点继续留在 PortalHost 中影响页面交互。
- 构建/分析脚本继续收口：`prune-dist` 删除未使用 helper，`analyze-component-sizes` 去掉 `eval`；`generate-docs-size-data / generate-exports` 曾尝试改写但实测 gzip 反涨，已回退。
- `dist/types` 先因 `ButtonGroupContext` 类型随本体导出变化从 `257` 到 `258`，随后删除 `swiper/SwiperItem.tsx` 纯中转后回到 `257`；当前运行时 `dist/es` 和 `dist/cjs` 文件数为 `245`。
- 当前全量组件 `54` 个已全部进入专项优化、结构优化、深审或确认极限状态；剩余 `基线` 组件为 `0`。

## 交接入口

后续模型接手这项工作时，除了先读本文档，还必须读取：

- [`skills/react-native-system-ui-extreme-audit/references/project-state.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/references/project-state.md)
- [`skills/react-native-system-ui-extreme-audit/references/handoff-playbook.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/references/handoff-playbook.md)

其中 `handoff-playbook.md` 负责记录：

- 后续优化的固定要求
- 优先级排序
- 每个重点组件的切入点
- 验证和记账口径

## 下一轮重点

1. 回到 `field / form / slider / swiper / dialog / tabs / picker`，优先处理高体积、高分支密度路径；其中 `tabs / picker` 仍是体积榜前两位。
2. 继续深审 `button / image-preview / toast / notify`，重点看命令式入口、默认配置覆盖、icon/label/render 分支是否还能继续收敛。
3. 继续深审 `cell / grid / tabbar / sidebar`，重点看去掉运行时 Context 之后，`badge / title / children / render` 这些分支能否继续内聚。
4. 继续抽查组件外 `hooks / utils / internal / platform / design-system / scripts`，优先处理会进入 runtime 产物的低收益 wrapper、单点工具依赖和旧迁移代码。
5. `divider / empty / error-boundary` 已确认无安全正收益点，后续除非有新设计需求或能删除文件，否则不优先投入。
6. 后续每轮仍以 `npm run build`、`npm run check:imports`、`npm run typecheck`、`npm run docs:update-size` 为完整验证闭环。
