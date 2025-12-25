# 组件审查计划：Button 按钮组件

根据 `component-audit-checklist.md` 的要求，我们将优先审查并优化 **Button** 组件。

## 1. 现状分析
- **状态**：⏳ 进行中
- **优先级**：高（核心组件）
- **现有问题**：
  - `icon` 渲染函数缺乏 `try-catch` 保护，不符合代码质量要求。
  - 样式计算逻辑（如 `baseContainerStyle`）在每次渲染时重新执行，可使用 `useMemo` 优化。
  - 需确认测试覆盖率是否包含边界情况和错误处理。

## 2. 实施步骤

### 第一步：运行现有测试
- 执行 `npm test src/components/button/__tests__/button.test.tsx` 确保基准状态正常。

### 第二步：代码优化 (Button.tsx)
1.  **错误处理**：
    - 在 `renderIcon` 中为自定义 icon 渲染函数添加 `try-catch` 保护，防止用户代码导致组件崩溃。
2.  **性能优化**：
    - 使用 `useMemo` 缓存 `baseContainerStyle`、`sharedTextStyle` 和 `shadowStyle` 等复杂样式计算，减少不必要的重计算。
    - 确保 `useCallback` 正确用于事件处理（如需）。

### 第三步：增强测试 (button.test.tsx)
1.  **错误边界测试**：添加测试用例，模拟 `icon` 渲染函数抛出错误，确保组件能优雅降级（如不渲染图标或渲染占位符，而不是崩溃）。
2.  **覆盖率补充**：检查并补充缺失的边界情况测试。

### 第四步：文档与清单更新
1.  检查 `docs/components/button.md`（如果存在），确保 API 文档与代码一致。
2.  更新 `docs/component-audit-checklist.md`，将 Button 组件状态标记为 ✅，并记录审查日期。

## 3. 验证
- 再次运行所有测试确保无回归。
- 确认 TypeScript 类型检查通过。

请确认是否开始执行此计划？