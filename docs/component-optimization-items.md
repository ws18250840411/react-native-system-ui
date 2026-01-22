# 组件优化项统一清单

> 生成日期：2026-01-21  
> 来源：`docs/component-review-all.md` + `docs/component-priority-review.md`  
> 目的：把“审查结论 + 优先级”合并成可执行的优化项清单

---

## 执行顺序

1. **P0**：overlay → portal → popup → swiper → tabs  
2. **P1**：slider → swipe-cell → pull-refresh → index-bar → picker  
3. **P2**：skeleton → stepper → input → password-input → number-keyboard  
4. **P3**：toast → dialog → action-sheet → share-sheet → uploader  
5. **P4**：tabbar → calendar → datetime-picker → form  

> 说明：P2/P3/P4 尚未进入审查，本清单仅列出“待审查”占位项。

---

## P0 优化项（已审查）

### Overlay

- **完成情况**
  - 已完成：useOverlayStack 依赖项补全、zIndex 边界处理
- **必须修复**
  - useOverlayStack 依赖项补全（含 `options.meta`）
  - zIndex 负数/Infinity/NaN 边界处理
- **建议修复**
  - 滚动锁定扩展至非 body 容器
  - useOverlayStack / Overlay memo 化（可选）
- **测试补充**
  - zIndex 边界
  - BackHandler 清理
  - 多 Overlay 栈顺序
  - 滚动锁定恢复
- **文档补充**
  - Web/Native 差异
  - zIndex 规则
  - 何时使用 Overlay vs Popup

---

### Portal

- **完成情况**
  - 已完成：Portal 更新策略优化（避免 children 引用相同跳过更新）
- **必须修复**
  - 无（以文档/测试为主）
- **建议修复**
  - `PortalLayer.setEntries` 更新策略优化（可选）
- **测试补充**
  - children 引用不变但内部变化
  - 多 Host 切换保留行为
  - Web 自动 Host 竞态
- **文档补充**
  - Web 自动挂载依赖 `react-dom`
  - Host 生命周期（卸载即清空）
  - zIndex 规则说明

---

### Popup

- **完成情况**
  - 已完成：动画竞态保护、safeAreaInsetTop 改为 onLayout 测量
- **必须修复**
  - 竞态：`visible` 快速切换导致动画/挂载不一致
- **建议修复**
  - `safeAreaInsetTop` 使用 `onLayout` 替代 `measure`（可选）
  - `contentAnimationStyle` 约束文档化
- **测试补充**
  - `destroyOnClose + beforeClose` 组合
  - 快速切换（race）
  - safeArea 动态变化
- **文档补充**
  - overlay 点击回调顺序
  - 动画样式约束

---

### Swiper

- **完成情况**
  - 已完成：RAF 缺失降级、handleContainerLayout useCallback
- **必须修复**
  - `requestAnimationFrame` 缺失时的降级策略
- **建议修复**
  - `handleContainerLayout` useCallback
  - loopData 构造频率优化（可选）
- **测试补充**
  - Web drag + momentum
  - RAF 不可用时的稳定性
  - preventScroll 对外层滚动影响
- **文档补充**
  - preventScroll 副作用
  - loop 模式数据要求

---

### Tabs

- **完成情况**
  - 已完成：swipeable 走 beforeChange、Promise 竞态保护、scrollEndDrag 覆盖
- **必须修复**
  - swipeable 模式需走 `beforeChange`（语义一致）
  - `beforeChange` Promise 竞态保护
- **建议修复**
  - onScrollEndDrag 覆盖无 momentum 场景
  - layoutMap 清理策略（可选）
- **测试补充**
  - swipeable + beforeChange
  - Promise 竞态
  - onScrollEndDrag 场景
- **文档补充**
  - 点击/滑动行为差异说明

---

## P1 优化项（已审查/部分已审查）

### Picker

- **完成情况**
  - 已完成：受控同步使用 ref，减少重复对比
- **必须修复**
  - 无（主要为行为说明与测试补齐）
- **建议修复**
  - Web 端 onChange 高频触发可加轻量去抖（可选）
  - `interactionMode` 文档与实现对齐
- **测试补充**
  - Web wheel 频繁触发 onChange
  - 受控模式下级联快速切换
- **文档补充**
  - `interactionMode` 实际行为
  - Web 端滚轮触发策略

---

### IndexBar

- **完成情况**
  - 已完成：滚动定位二分查找、PanResponder 捕获条件收敛
- **建议补充**
  - 拖动连续选择与 sticky 行为测试

---

### Slider

- **完成情况**
  - 已完成：Web 端测量节流（避免频繁 measureInWindow）

---

### PullRefresh

- **完成情况**
  - 已完成：Web 拖拽节流（减少 setState 频率）

---

### SwipeCell

- **完成情况**
  - 已完成：open 行为收敛（无操作区不触发打开）

---

## P2（动画 + 输入）

### Skeleton

- **完成情况**
  - 已完成：动画时长为 0 时不启用循环

---

### Stepper

- **完成情况**
  - 已完成：disabled/changing 时自动清理长按计时

---

### Input

- **状态**：已检查（无需改动）  

---

### PasswordInput

- **状态**：已检查（无需改动）  

---

### NumberKeyboard

- **完成情况**
  - 已完成：显示/隐藏动画竞态保护

---

## P3（弹层 + 队列）

### Toast

- **状态**：已检查（无需改动）  

---

### Dialog

- **完成情况**
  - 已完成：beforeClose Promise 竞态保护

---

### ActionSheet

- **完成情况**
  - 已完成：close 过程防重入

---

### ShareSheet

- **状态**：已检查（无需改动）  

---

### Uploader

- **状态**：已检查（无需改动）  

---

## P4（布局 + 展示）

### Tabbar

- **状态**：已检查（无需改动）  

---

### Calendar

- **状态**：已检查（无需改动）  

---

### DatetimePicker

- **状态**：已检查（无需改动）  

---

### Form

- **状态**：已检查（无需改动）  

---

## 使用方式（建议）

1. 以 P0 顺序逐项实现“必须修复”
2. 每项完成后补测试与文档
3. 若出现业务阻塞，优先修复“必须修复”
