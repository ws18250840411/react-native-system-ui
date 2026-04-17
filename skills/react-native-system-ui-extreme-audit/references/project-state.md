# React Native System UI Extreme Audit State

最后更新：2026-04-17

## 当前定位

这个 skill 服务于当前仓库的长期任务：逐组件极致压缩、极致实现审计、共享目录收口、真实分数维护。

它不是通用 UI 组件库优化模板，而是这一个项目的持续作业上下文。

后续模型接手时，除了本文件，还必须同步读取 `references/handoff-playbook.md`。

## 当前已确认进展

- `Field`：将 `src/hooks/field/renderers.tsx` 内聚回 `src/components/field/Field.tsx`
- `Slider`：将 `src/hooks/slider/utils.tsx` 内聚回 `src/components/slider/Slider.tsx`
- `Form`：将 `src/hooks/form/utils.ts` 内聚回 `src/components/form/Form.tsx`
- `aria`：将旧的 `src/hooks/aria/rn-aria` 体系整体迁到 `src/internal/aria`
- `radio` / `checkbox`：私有 aria 桥接分别收回到组件目录下的 `internal.ts` / `internal.web.ts`
- `toast` / `notify` / `image-preview`：共享命令式挂载逻辑收敛到 `src/internal/imperativePortal.tsx`
- `toast` / `notify`：最新回调引用、自动关闭、打开关闭生命周期收敛到 `src/internal/feedback.ts`
- `image-preview`：合并分散的最新索引与回调引用，并补充 `requestAnimationFrame` 缺失时的滑动兜底
- `button`：删除纯内部中转层 `src/components/button/ButtonContext.ts`
- `grid`：删除纯内部中转层 `src/components/grid/GridContext.ts`
- `cell` / `sidebar` / `tabbar`：删除纯内部中转层 `src/components/cell/CellContext.ts`、`src/components/sidebar/SidebarContext.ts`、`src/components/tabbar/TabbarContext.ts`

## 当前验证基线

- `npm run build`：通过
- `npm run check:imports`：通过
- `npm run typecheck`：未通过，但当前确认是既有旧问题

当前旧问题文件：

- `src/components/checkbox/CheckboxGroup.tsx`
- `src/components/picker/internal.tsx`
- `src/components/radio/RadioGroup.tsx`

## 当前目录与体积基线

- `src/hooks`：`22`
- `src/hooks/aria`：`5`
- `src/internal/aria`：`25`
- `src/utils`：`10`
- `dist/cjs` 文件数：`250`
- 当前组件状态统计：总数 `54`，已进入专项优化或深审 `22`，仍为 `基线` `32`

专项复测 gzip：

- `button`：`5447`
- `cell`：`4925`
- `grid`：`4432`
- `sidebar`：`3419`
- `tabbar`：`4142`
- `toast`：`4843`
- `notify`：`5045`
- `image-preview`：`5268`

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
- `grid`
- `tabbar`
- `sidebar`
- `notice-bar`
- `password-input`

## 执行约束

- 必须逐行阅读目标组件及其关联私有 helper。
- 不追求“抽象得更漂亮”，只追求更少文件、更少重复、更小体积、更稳行为。
- 每轮真实修改后，必须同步更新 `docs/component-extreme-audit.md`。
- 每轮真实修改后，必须同步更新本文件。
- 如果优先级、切入点或固定执行要求发生变化，还要同步更新 `references/handoff-playbook.md`。
- 如果工作流或触发条件发生变化，还要同步更新 `SKILL.md` 和 `agents/openai.yaml`。
