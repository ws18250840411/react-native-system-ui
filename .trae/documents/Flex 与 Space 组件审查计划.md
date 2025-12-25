# 组件审查计划：Flex 与 Space 组件

根据用户要求，我们将按照 `component-audit-checklist.md` 的顺序，依次审查 **Flex** 和 **Space** 组件。

## 1. Flex 组件审查
**状态**：⏳ 进行中

### 现状分析
- **文件**：`Flex.tsx` (FC), `FlexItem.tsx` (FC), `FlexContext.ts`
- **代码质量**：
  - `Flex` 组件使用了 `useMemo` 缓存 context 值，但 `containerStyle` 的计算逻辑在每次渲染时都会执行。
  - `FlexItem` 中存在复杂的 `parseFlex` 逻辑，缺乏明确的错误处理或边界值测试。
- **测试**：
  - `flex.test.tsx` 覆盖了 gutter、span、flex keywords 等基础功能，但缺乏对错误输入（如非法 flex 字符串）的测试。

### 实施步骤
1.  **代码优化 (`Flex.tsx`, `FlexItem.tsx`)**：
    - 在 `Flex` 组件中，使用 `useMemo` 缓存 `containerStyle`。
    - 检查 `FlexItem` 的 `parseFlex` 逻辑，确保对非法输入的稳健性（目前返回 `undefined`，符合预期，但可增强类型安全性）。
2.  **测试增强 (`flex.test.tsx`)**：
    - 补充边界测试：`span` 为负数或 0 的情况。
    - 补充非法 flex 字符串的解析测试。
3.  **文档更新**：
    - 检查 `docs/components/flex.md`（如果存在），确保 API 一致。
    - 更新审查清单状态。

## 2. Space 组件审查
**状态**：⏳ 进行中

### 现状分析
- **文件**：`Space.tsx` (FC), `tokens.ts`, `types.ts`
- **代码质量**：
  - 使用了 `useSpaceTokens` 和 `useAriaPress`。
  - `renderItem` 是定义在组件内部的函数，每次渲染都会重新创建，导致列表项重新渲染。
  - `childArray.forEach` 和 `composedChildren` 的逻辑稍显冗余，可优化。
  - 存在 Web 端 `span` 标签的测试代码（在 `space.test.tsx` 中），但在 React Native 环境下 `span` 是无效的（除非是 react-native-web），需要确认测试环境。
- **测试**：
  - `space.test.tsx` 使用了 `span` 标签，这在纯 RN 测试环境中可能会报错或行为不符合预期（通常应使用 `Text` 或 `View`）。
  - 需补充 `onClick` 交互测试。

### 实施步骤
1.  **代码优化 (`Space.tsx`)**：
    - 优化 `renderItem`：将其提取到组件外部或使用 `useCallback`（虽然 `composedChildren.map` 每次都会执行，但保持 `renderItem` 引用稳定有助于后续优化）。
    - 优化 `composedChildren` 生成逻辑，使用 `React.Children.map` 配合 `Fragment` 可能更简洁。
    - 使用 `useMemo` 缓存 `containerBaseStyle` 和 `spacingStyle`。
2.  **测试修复与增强 (`space.test.tsx`)**：
    - 将测试用例中的 `span` 替换为 `Text` 或 `View`，以符合 React Native 规范。
    - 添加 `onClick` 交互测试。
3.  **文档更新**：
    - 检查 `docs/components/space.md`（如果存在）。
    - 更新审查清单状态。

## 3. 执行顺序
1.  运行 Flex 和 Space 的现有测试。
2.  优化 Flex 组件并补充测试。
3.  优化 Space 组件并修复/补充测试。
4.  更新文档和审查清单。

请确认是否开始执行此计划？