# Extreme Audit Handoff Playbook

最后更新：2026-04-21

## 用途

这份文件给后续接手的模型直接使用，目标是减少重复摸索。

它回答 4 件事：

1. 先优化谁
2. 每类组件该从哪里下手
3. 哪些规则不能破
4. 修改后怎么验证和记账

## 当前盘点

- 总组件数：`54`
- 已进入专项优化、结构优化、深审或确认极限状态：`54`
- 仍处于 `基线` 状态：`0`
- 确认极限组件：`divider / empty / error-boundary`

## 固定要求

- 全程中文交流。
- 质量优先，不追求快答，必须逐行阅读目标组件及其关联私有 helper。
- 默认自主推进，不要反复确认；除非遇到高风险冲突或无法从仓库判断的决策。
- 不为“抽象更漂亮”而拆文件；只为更少文件、更少导入、更少重复、更小体积、更稳行为服务。
- 优先删除纯内部中转层、只被单组件使用的 helper、没有实质复用价值的上下文和桥接文件。
- `src/hooks` 只保留真正跨多个公开组件复用的 hook。
- `src/hooks/aria` 必须保持很薄；私有 aria 逻辑优先下沉到 `src/internal/aria` 或组件本地 `internal.ts` / `internal.web.ts`。
- `src/utils` 不要保留很多一次性小文件；能并、能回收、能靠近组件的优先处理。
- `src/internal` 只放多组件共享的私有 runtime 逻辑；单组件专用逻辑不要硬塞这里。
- 组件外 runtime 也纳入同等审计范围：`hooks / utils / internal / platform / design-system / scripts` 只要进入产物或影响构建，都要一起量化和收口。
- 没有运行时调用的空 token hook 文件优先删除，只把空 token 类型保留到对应 `types.ts`。
- 只传递一个 primitive 的私有 Context 优先收窄为 primitive Context；纯 re-export Context 文件优先删除。
- 不新增依赖，不把 peerDependencies 里的核心库重新打进组件库。
- 不虚报分数。分数必须跟真实代码状态、复杂度、体积和验证结果一致。
- 每次真实修改后，必须同步更新：
  - `docs/component-extreme-audit.md`
  - `references/project-state.md`
- 如果优先级、执行规范或默认切入点发生变化，还必须同步更新本文件。

## 判断标准

优先视为有效优化的变化：

- 文件数减少
- 纯内部导入链缩短
- 单组件目录 gzip 下降
- 运行时分支减少
- 一次性 helper 回收到组件本体
- 多组件重复逻辑收敛到真正共享的私有模块
- token 公开面和 props 正常收窄

不应被当成有效优化的变化：

- 只是把代码从组件挪到更多 helper 文件
- 只是重排格式或改名
- 只是增加“通用抽象”但没有减少总代码
- 没有真实验证就提高分数

## 验证与记账口径

每轮真实改动后至少执行：

- `npm run build`
- `npm run check:imports`
- `npm run typecheck`
- `npm run docs:update-size`

当前已知旧问题，不算本轮新增回归：

- 暂无。历史阻塞 `CheckboxGroup`、`picker/internal`、`RadioGroup` 已修复，当前 `npm run typecheck` 应通过。

组件 gzip 和行数记账口径要跟审计文档一致：

- 目标目录：`src/components/<name>`
- 统计文件：`.ts` / `.tsx` / `.js`
- 排除目录：`__tests__`、`__snapshots__`、`demo`、`style`、`test`
- gzip 规则参考：`scripts/generate-docs-size-data.mjs`

同时持续观察：

- `dist/cjs` 文件数
- `dist/es` 文件数
- `src/hooks` / `src/hooks/aria` / `src/utils` / `src/internal/aria` / `src/platform` / `src/design-system` 的目录规模

当前额外注意：

- `npm run docs:update-size` 当前已修复为优先读取完整 `dist/es/components`，如果 ES 实现缺失才回退到 `dist/cjs/components`。
- 同时继续观察：源码目录 gzip、目录行数、`dist/es` / `dist/cjs` 文件数，以及构建后共享 runtime 是否继续收口。
- 当前 `dist/es` 与 `dist/cjs` 文件数为 `245`；`checkbox / radio` web 平台解析循环通过源码 shared 私有文件修复，最终 dist 仍可被 prune 到当前文件数。
- 当前 `dist/types` 文件数为 `257`；`ButtonGroupContext` 收回 `Button.tsx` 后类型产物曾多 1 个文件，删除 `swiper/SwiperItem.tsx` 后已回到 `257`。
- 当前共享 runtime 口径：`src/hooks 7883 gzip`、`src/internal 16363 gzip`、`src/platform 1273 gzip`、`src/design-system 4469 gzip`、`src/utils 5566 gzip`。`src/internal` 的轻微回升来自 slider 无障碍正确性修复，保留。

## 优先级顺序

### P0 核心重组件

这些组件体积、分支密度和历史包袱都最重，优先级最高：

1. `field`
2. `form`
3. `slider`
4. `swiper`
5. `dialog`
6. `tabs`
7. `picker`

### P1 已经动过但还没压到底

这些组件已经开始收口，但还明显没到终局：

1. `image-preview`
2. `button`
3. `toast`
4. `notify`
5. `grid`
6. `cell`
7. `tabbar`
8. `sidebar`
9. `notice-bar`
10. `password-input`

### P2 已专项但仍有中型空间

这些组件已经过一轮专项，但仍可在 P1 之后继续找低风险收益：

1. `collapse`
2. `image`
3. `action-sheet`
4. `config-provider`
5. `datetime-picker`
6. `selector`
7. `typography`
8. `progress`
9. `share-sheet`
10. `search`
11. `skeleton`
12. `tag`
13. `flex`
14. `portal`

### P3 低优先级组件

这些组件当前分数较高或实现相对纯，除非发现明确冗余，否则暂不优先投入重审：

- `area`
- `avatar`
- `badge`
- `circle`
- `count-down`
- `divider`
- `empty`
- `error-boundary`
- `input`
- `loading`
- `nav-bar`
- `overlay`
- `safe-area-view`
- `space`
- `switch`
- `water-mark`

### P4 组件外 runtime

这些不归属单个组件，但会影响全库体积和运行时路径，必须持续纳入审计：

- `src/hooks`
- `src/hooks/aria`
- `src/internal`
- `src/internal/aria`
- `src/platform`
- `src/design-system`
- `src/utils`
- `scripts`

## 组件切入点

### P0 组件切入点

- `field`
  优先压 `affix / icon / message / word-limit` 的重复渲染路径，继续减少条件分支和重复样式拼装；`FieldClearButton.show` 永真 prop 和单点工具依赖已压掉。
- `form`
  优先查验证流程、依赖图、路径归一化、订阅通知是否有重复处理和不必要中间层；`FormItem` 的 `isFunction` 依赖和重复 `child.props` 读取已压掉。
- `slider`
  优先查拖拽 handler 包装、百分比计算、aria 桥接和视觉状态转换是否还能收缩；track style callback 与 button 函数判断中间变量已压掉。
- `swiper`
  优先查自动播放定时器、索引同步、分页器渲染和循环分支是否能继续共享路径；纯中转 `SwiperItem.tsx` 已删除。
- `dialog`
  优先查静态调用层、imperative 挂载、overlay 依赖和按钮区组合逻辑；本体 handler 包装已继续压缩，`beforeClose` 语义必须保守。
- `tabs`
  优先查 header 测量、滚动同步、指示器计算和 tab item 渲染分支；TabBarItem 的 `isFunction` 工具依赖已删除。
- `picker`
  优先查 wheel / column 计算路径、值归一化和 web/native 分叉桥接；只返回 `!readOnly` 的 responder capture callback 已压掉。

### P1 组件切入点

- `image-preview`
  重点看内容点击关闭与 `Swiper` 手势共存的触摸判断是否还能变轻，以及头尾区域 render 分支。
- `button`
  重点看 icon/label/render 闭包、loading 路径、token 公开面和颜色样式派生。
- `toast` / `notify`
  重点看命令式入口、props 归一化、生命周期回调和共享 internal 是否还能继续收敛。
- `cell`
  重点看 `title / value / label / extra / children` 的重复渲染路径；保留 hairline 所需容器 memo，不要盲删关键稳定样式。
- `grid`
  重点看 `icon / text / badge` 组合、Pressable/View 双分支、边框和宽度计算；父层简单数字归一化 memo 已经删除。
- `tabbar`
  重点看 icon 渲染、children 函数分支、badge/dot 分支和 fixed/placeholder 逻辑；`itemNames` 中间数组已删除。
- `sidebar`
  重点看 active content 渲染、badge/title/dot 分支和 children 克隆透传；当前索引和内容文字样式 memo 已删除。
- `notice-bar`
  重点看横向与纵向动画是否能进一步共用回调引用、动画启动条件和文本/节点渲染路径。
- `password-input`
  重点看光标闪烁定时器、隐藏输入同步、单元格边框分支和 mask/text 双渲染路径。

### P2 组件切入点

- `collapse`
  重点看 item 上下文、展开状态、图标和边框渲染分支。
- `image`
  重点看 loading/error/placeholder 三态和 web/native 包装。
- `action-sheet`
  重点看 action item、取消区、popup/portal 组合路径。
- `config-provider`
  重点看 locale/direction/theme merge 路径和上下文层级。
- `datetime-picker`
  重点看与 `picker` 的复用边界、日期归一化和格式化路径。
- `config-provider`
  不要为了体积删除 locale 字段；优先看 context/hook 中转层和主题类型文件是否还有空壳。
- `portal`
  重点看 imperative manager、全局 emitter 和 Host 队列是否还能减少包装；注意不要破坏多 Host 警告与主动清理语义。
- `selector / search / share-sheet / typography / progress`
  重点看重复样式拼装、条件渲染和 token 公开面的历史包袱。

### 确认极限组件切入点

- `divider / empty`
  当前已经很小，只做明确 gzip 下降且语义不变的改动；尝试反涨就回退。
- `error-boundary`
  已接近极限，除非能删除文件或明显减少 runtime wrapper，否则保持确认极限记录即可。
- `overlay`
  固定 zIndex token hook 已删除，当前进入专项优化状态；后续只在 overlay/portal 组合路径有明确收益时继续。

### 共享 runtime 切入点

- `hooks / hooks/aria`
  优先看低收益 `useMemo/useCallback`、只服务一个调用点的 hook、以及单点工具依赖；`useHairline / utils/number / overlayStack` 去 base 依赖曾反涨，遇到类似点先量化再保留。
- `internal/aria`
  优先压旧迁移代码中的冗余 fallback、旧式 `&&` 调用、无效 disabled 分支和重复 DOM/RN 映射；注意不要破坏 web/native 行为差异。`internal/aria/slider` 手势主路径必须保守，native `useMove` 已改用 ref 记录起点，`useSliderThumb` 已修复无障碍增减值边界。
- `*.web.ts` 平台文件
  禁止从同目录 `./internal` 做 re-export；Web/Vite 解析会优先命中 `.web.ts`，可能形成自引用循环。需要共享逻辑时，拆到无平台后缀的 `shared.ts` 或更明确的私有文件。
- `design-system`
  优先复用现有 WeakMap 缓存，不重复加外层 memo；不要牺牲主题覆盖和 token identity 稳定性。
- `platform / utils`
  优先去除单点工具导入和重复 wrapper；保留会被多个组件共享且实测更小的 helper。
- `scripts`
  优先优化构建正确性和体积统计可信度；脚本本身体积不是 runtime 指标，但会影响产物真实性。`analyze-component-sizes` 已去掉 `eval`，`prune-dist` 已删未用 helper；`generate-docs-size-data / generate-exports` 的改写尝试曾反涨，后续要先量化再保留。

## 推荐执行节奏

每次只拿一个组件或一个高度相关的小簇：

1. 先读目标组件目录或共享 runtime 目录的全部源码
2. 再追它依赖的 `hooks / utils / internal / internal/aria / platform / design-system`
3. 找能删除文件的点，再找能减少重复分支的点
4. 改完立刻验证
5. 立刻同步审计文档、本文件和 `project-state.md`

不要一口气同时改很多大组件，否则很难判断收益和回归边界。
