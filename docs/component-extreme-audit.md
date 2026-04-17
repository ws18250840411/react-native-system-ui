# 组件极致审计基线

最后更新：2026-04-17

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

- `Field`：将 [`src/hooks/field/renderers.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/field/renderers.tsx) 内聚回 [`src/components/field/Field.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/field/Field.tsx)
- `Slider`：将 [`src/hooks/slider/utils.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/slider/utils.tsx) 内聚回 [`src/components/slider/Slider.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/slider/Slider.tsx)
- `Form`：将 [`src/hooks/form/utils.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/hooks/form/utils.ts) 内聚回 [`src/components/form/Form.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/form/Form.tsx)
- `aria`：将旧的 `src/hooks/aria/rn-aria` 体系整体迁到 [`src/internal/aria`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/aria)，公开层只保留真正对外的 hook
- `radio`：私有 aria 桥接收回到 [`src/components/radio/internal.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/radio/internal.ts) 和 [`src/components/radio/internal.web.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/radio/internal.web.ts)
- `checkbox`：私有 aria 桥接收回到 [`src/components/checkbox/internal.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/checkbox/internal.ts) 和 [`src/components/checkbox/internal.web.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/checkbox/internal.web.ts)
- `toast / notify / image-preview`：把重复的 `Portal + visible state + close registry` 命令式挂载逻辑抽到共享内部模块 [`src/internal/imperativePortal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/imperativePortal.tsx)，减少重复 runtime 实现
- `toast / notify`：把共同的最新回调引用、自动关闭、打开关闭生命周期收敛到 [`src/internal/feedback.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/internal/feedback.ts)
- `image-preview`：合并分散的最新索引/回调引用，并补上 `requestAnimationFrame` 缺失时的 `swipeTo` 兜底，避免某些环境复开后索引不同步
- `button`：删除纯内部中转层 [`src/components/button/ButtonContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/button/ButtonContext.ts)，直接从 [`src/components/button/ButtonGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/button/ButtonGroup.tsx) 引用上下文
- `grid`：删除纯内部中转层 [`src/components/grid/GridContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/GridContext.ts)，直接从 [`src/components/grid/Grid.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/grid/Grid.tsx) 引用上下文
- `cell / sidebar / tabbar`：删除纯内部中转层 [`src/components/cell/CellContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cell/CellContext.ts)、[`src/components/sidebar/SidebarContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/sidebar/SidebarContext.ts)、[`src/components/tabbar/TabbarContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabbar/TabbarContext.ts)，分别内聚回宿主组件文件，缩短导入链并减少产物文件数

## 当前验证与统计

- `npm run build`：通过
- `npm run check:imports`：通过
- `npm run typecheck`：当前未通过，但阻塞来自既有旧问题，不是本轮新增
  - [`src/components/checkbox/CheckboxGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/checkbox/CheckboxGroup.tsx)
  - [`src/components/picker/internal.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/picker/internal.tsx)
  - [`src/components/radio/RadioGroup.tsx`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/radio/RadioGroup.tsx)

当前目录统计：

- `src/hooks`：`22`
- `src/hooks/aria`：`5`
- `src/internal/aria`：`25`
- `src/utils`：`10`
- `dist/cjs` 文件数：`250`

说明：

- `dist/cjs` 文件数当前回落到 `250`。在保留前面共享内部模块收益的基础上，这一轮又继续删除 [`src/components/cell/CellContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/cell/CellContext.ts)、[`src/components/sidebar/SidebarContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/sidebar/SidebarContext.ts)、[`src/components/tabbar/TabbarContext.ts`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/tabbar/TabbarContext.ts) 三层纯内部中转文件。
- 本轮复测源码目录 gzip：
  - `button`：`5528 -> 5447`
  - `cell`：`5035 -> 4925`
  - `grid`：`4505 -> 4432`
  - `sidebar`：`3537 -> 3419`
  - `tabbar`：`4306 -> 4142`
  - `toast`：`5202 -> 5044 -> 4843`
  - `notify`：`5370 -> 5196 -> 5045`
  - `image-preview`：`5449 -> 5270 -> 5268`

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
| `dialog` | 85 | B | 组件本体不算差，但 imperative + overlay 成本偏高 | 继续压静态调用层与按钮/内容组合逻辑 |
| `swiper` | 84 | B | 手势与自动播放逻辑天然较重，当前实现仍有优化余地 | 继续压定时器、索引同步、分页渲染 |
| `slider` | 84 | B | 私有 utils 已回收，但拖拽包装与无障碍桥接仍偏重 | 继续压 handler 包装和 visual percent 计算 |
| `form` | 81 | B | 私有 utils 已回收，但验证、依赖图、订阅更新仍偏重 | 继续拆掉重复路径处理与不必要的通知 |
| `field` | 79 | C | 私有 renderers 已回收，但 API 面很大、分支密度高 | 继续压 affix/icon/message/word-limit 的重复渲染路径 |

## 全量组件当前分数

| 组件 | 分数 | 等级 | gzip | 行数 | 审计状态 |
| --- | ---: | --- | ---: | ---: | --- |
| `action-sheet` | 85 | B | 4238 | 211 | 基线 |
| `area` | 93 | A | 2100 | 114 | 基线 |
| `avatar` | 93 | A | 2397 | 164 | 基线 |
| `badge` | 91 | A | 2805 | 118 | 基线 |
| `button` | 83 | B | 5447 | 270 | 专项优化 |
| `calendar` | 86 | B | 6398 | 255 | 已深审 |
| `cascader` | 90 | A | 7310 | 311 | 已深审 |
| `cell` | 86 | B | 4925 | 247 | 专项优化 |
| `checkbox` | 88 | A | 6570 | 336 | 结构已优化 |
| `circle` | 88 | A | 3280 | 162 | 基线 |
| `collapse` | 85 | B | 4432 | 170 | 基线 |
| `config-provider` | 88 | A | 4001 | 375 | 基线 |
| `count-down` | 95 | S | 1666 | 88 | 基线 |
| `datetime-picker` | 88 | A | 3903 | 184 | 基线 |
| `dialog` | 85 | B | 6814 | 263 | 已深审 |
| `divider` | 93 | A | 2081 | 102 | 基线 |
| `empty` | 93 | A | 2066 | 97 | 基线 |
| `error-boundary` | 97 | S | 929 | 40 | 基线 |
| `field` | 79 | C | 7847 | 1042 | 已深审 |
| `flex` | 91 | A | 2433 | 109 | 基线 |
| `form` | 81 | B | 7724 | 209 | 已深审 |
| `grid` | 86 | B | 4432 | 164 | 专项优化 |
| `image` | 85 | B | 4280 | 167 | 基线 |
| `image-preview` | 83 | B | 5268 | 228 | 专项优化 |
| `input` | 93 | A | 2215 | 120 | 基线 |
| `loading` | 95 | S | 1534 | 92 | 基线 |
| `nav-bar` | 88 | A | 3235 | 135 | 基线 |
| `notice-bar` | 88 | A | 4171 | 136 | 基线 |
| `notify` | 84 | B | 5045 | 254 | 专项优化 |
| `number-keyboard` | 90 | A | 5838 | 213 | 已深审 |
| `overlay` | 95 | S | 1326 | 60 | 基线 |
| `password-input` | 88 | A | 3990 | 189 | 基线 |
| `picker` | 88 | A | 10725 | 394 | 已深审 |
| `popup` | 91 | A | 5699 | 215 | 已深审 |
| `portal` | 88 | A | 3202 | 122 | 基线 |
| `progress` | 88 | A | 3369 | 128 | 基线 |
| `radio` | 89 | A | 6721 | 340 | 结构已优化 |
| `safe-area-view` | 97 | S | 869 | 43 | 基线 |
| `search` | 88 | A | 3281 | 179 | 基线 |
| `selector` | 88 | A | 3719 | 141 | 基线 |
| `share-sheet` | 88 | A | 3353 | 130 | 基线 |
| `sidebar` | 89 | A | 3419 | 157 | 专项优化 |
| `skeleton` | 91 | A | 2782 | 100 | 基线 |
| `slider` | 84 | B | 6800 | 539 | 已深审 |
| `space` | 91 | A | 2593 | 112 | 基线 |
| `stepper` | 86 | B | 5619 | 187 | 已深审 |
| `swiper` | 84 | B | 5822 | 290 | 已深审 |
| `switch` | 93 | A | 1817 | 89 | 基线 |
| `tabbar` | 86 | B | 4142 | 168 | 专项优化 |
| `tabs` | 87 | B | 10343 | 345 | 已深审 |
| `tag` | 91 | A | 2853 | 135 | 基线 |
| `toast` | 84 | B | 4843 | 182 | 专项优化 |
| `typography` | 88 | A | 3462 | 209 | 基线 |
| `water-mark` | 91 | A | 2721 | 111 | 基线 |

## 当前结论

- 目前真正接近“极致状态”的是 `count-down / error-boundary / loading / overlay / safe-area-view` 这类小而纯的组件。
- 当前还没有任何组件达到稳定可信的 `98+`，这一点必须诚实记录。
- 现阶段最需要继续深挖的仍是高复杂度、高分支密度组件：`field / form / slider / swiper / dialog / tabs / picker`。
- 第二梯队是本轮已经开始压缩、但还没到底的组件：`toast / notify / image-preview / button / cell / grid / tabbar / sidebar / notice-bar / password-input`。
- 当前全量组件 `54` 个，其中已进入专项优化或深审状态的 `22` 个，仍处于 `基线` 状态的还有 `32` 个。

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

1. 继续深审 `image-preview`，优先判断内容点击关闭这套自定义触摸判断是否还能在不影响 `Swiper` 手势的前提下进一步变轻。
2. 继续深审 `button`，优先评估图标/label/render 闭包和 tokens 公开面中哪些是真正运行时需要、哪些只是历史包袱。
3. 继续深审 `cell / tabbar / sidebar / notice-bar / password-input`，重点查重复样式拼装、`children/render` 闭包和上下文透传。
4. 继续看 `grid`，评估 `GridItem` 内部 icon/text/badge 组合路径是否还能进一步减少闭包和重复样式拼装。
5. 回到 `field / form / slider / swiper / dialog / tabs / picker` 这些核心重组件，逐项向 `90+`、`95+` 推。
