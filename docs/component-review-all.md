# 组件审查汇总

> 生成日期：2026-01-21  
> 汇总范围：P0 + P1 已审查组件（Overlay / Portal / Popup / Swiper / Tabs / Picker）

---

## 目录
- Overlay 组件审查报告
- Portal 组件审查报告
- Popup 组件审查报告
- Swiper 组件审查报告
- Tabs 组件审查报告
- Picker 组件审查报告

---

# Overlay 组件审查报告

> 审查日期：2026-01-21  
> 审查人：AI Assistant  
> 优先级：P0（基础设施组件）

---

## 📊 总体评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码质量 | ⭐⭐⭐⭐ | 代码结构清晰，逻辑相对简洁 |
| 多端兼容性 | ⭐⭐⭐⭐ | Web/Native 差异处理较好 |
| 性能优化 | ⭐⭐⭐ | 基本优化到位，有改进空间 |
| 测试覆盖 | ⭐⭐⭐⭐ | 核心逻辑有测试，边界情况可补充 |
| 文档完整性 | ⭐⭐⭐ | 需要补充多端差异说明 |

---

## 🔍 详细审查

### 1. 代码质量

#### ✅ 优点
- 代码结构清晰，职责分离明确
- 使用了 `useSyncExternalStore` 模式，符合 React 18+ 最佳实践
- 单例模式管理栈，避免多实例冲突
- 类型定义完整，无 `any` 类型

#### ⚠️ 发现的问题

**问题 1：useOverlayStack 依赖项不完整**

**位置**：`src/components/overlay/useOverlayStack.ts:53`

```typescript
React.useEffect(() => {
  if (!visible || !entryRef.current) {
    return
  }
  overlayStackStore.update(entryRef.current.key, options)
}, [visible, options.onClose, options.closeOnBack, options.lockScroll, options.zIndex, options.type])
```

**问题**：
- 依赖项只列出了部分 `options` 属性，如果 `options.meta` 或其他属性变化，不会触发更新
- 如果 `options` 对象引用变化但属性值相同，会导致不必要的更新

**建议修复**：
```typescript
React.useEffect(() => {
  if (!visible || !entryRef.current) {
    return
  }
  overlayStackStore.update(entryRef.current.key, options)
}, [
  visible,
  options.onClose,
  options.closeOnBack,
  options.lockScroll,
  options.zIndex,
  options.type,
  options.meta, // 添加 meta
])
```

或者使用 `useMemo` 稳定 options 对象：
```typescript
const stableOptions = React.useMemo(() => options, [
  options.onClose,
  options.closeOnBack,
  options.lockScroll,
  options.zIndex,
  options.type,
  options.meta,
])

React.useEffect(() => {
  if (!visible || !entryRef.current) {
    return
  }
  overlayStackStore.update(entryRef.current.key, stableOptions)
}, [visible, stableOptions])
```

---

**问题 2：zIndex 计算逻辑边界情况**

**位置**：`src/components/overlay/OverlayStackStore.ts:99-111`

```typescript
private resolveZIndex = (provided?: number) => {
  if (isNumber(provided)) {
    if (!Number.isFinite(provided)) {
      return this.baseZIndex
    }
    return provided >= this.baseZIndex ? provided : this.baseZIndex + provided
  }
  // ...
}
```

**问题**：
- 当 `provided < 0` 时，会返回 `baseZIndex + provided`，可能导致 zIndex 小于 baseZIndex
- 例如：`baseZIndex = 1000, provided = -100`，会返回 `900`，这可能不是预期行为

**建议修复**：
```typescript
private resolveZIndex = (provided?: number) => {
  if (isNumber(provided)) {
    if (!Number.isFinite(provided) || provided < 0) {
      return this.baseZIndex
    }
    return provided >= this.baseZIndex ? provided : this.baseZIndex + provided
  }
  // ...
}
```

---

**问题 3：BackHandler 清理时机**

**位置**：`src/components/overlay/OverlayStackStore.ts:122-146`

**问题**：
- `backHandlerSubscription` 是模块级变量，在多个测试用例之间可能不会正确清理
- 如果应用中有多个 OverlayStackStore 实例（虽然当前是单例），可能会有问题

**建议**：
- 当前实现是单例，问题不大，但建议在测试中确保清理
- 考虑添加清理方法，在应用退出时调用

---

**问题 4：滚动锁定只处理 body**

**位置**：`src/platform/scrollLock.ts`

**问题**：
- Web 端只锁定了 `document.body`，如果页面中有其他滚动容器（如 `overflow: auto` 的 div），不会被锁定
- 某些移动端浏览器可能需要额外的处理

**建议**：
- 考虑支持锁定特定滚动容器
- 添加对移动端浏览器的特殊处理（如 iOS Safari）

---

### 2. 多端兼容性

#### ✅ 优点
- Web/Native 差异处理清晰（BackHandler 只在 Native 端使用）
- Portal 渲染统一处理
- 动画使用 `usePresenceAnimation`，已处理 Native Driver

#### ⚠️ 潜在问题

**问题 5：Web 端 touchAction 处理**

**位置**：`src/components/overlay/Overlay.tsx:93`

```typescript
touchAction: lockScroll ? 'none' : undefined,
```

**问题**：
- `touchAction` 是 Web 专用属性，在 Native 端会被忽略，但类型检查可能报错

**当前处理**：已使用 `as unknown as ViewStyle` 类型断言，可以接受

**建议**：考虑使用 Platform 条件判断，提高类型安全性

---

### 3. 性能优化

#### ✅ 优点
- 使用 `useSyncExternalStore` 避免不必要的重渲染
- `usePresenceAnimation` 处理动画性能
- Portal 渲染优化

#### ⚠️ 优化建议

**建议 1：useOverlayStack 优化**

**位置**：`src/components/overlay/useOverlayStack.ts`

**当前问题**：
- 每次 `visible` 变化都会重新 mount/unmount，即使 options 相同

**建议**：
- 考虑在 options 变化时只更新，不重新 mount
- 使用 `useMemo` 稳定 options 对象引用

---

**建议 2：Overlay 组件 memo 优化**

**位置**：`src/components/overlay/Overlay.tsx`

**建议**：
- 考虑使用 `React.memo` 包装组件，避免父组件重渲染导致的不必要渲染
- 但需要注意 props 比较逻辑

---

### 4. 测试覆盖

#### ✅ 已有测试
- Overlay 基础功能测试（渲染、点击、动画）
- OverlayStackStore 栈管理测试
- useOverlayStack Hook 测试

#### ⚠️ 需要补充的测试

**测试 1：zIndex 边界情况**
- `zIndex < 0` 的情况
- `zIndex = Infinity` 的情况
- `zIndex = NaN` 的情况

**测试 2：多实例栈管理**
- 多个 Overlay 同时显示时的栈顺序
- 中间层 Overlay 关闭时的栈调整

**测试 3：BackHandler 清理**
- 所有 Overlay 关闭后，BackHandler 是否正确移除
- 快速打开/关闭多个 Overlay 时的 BackHandler 状态

**测试 4：滚动锁定**
- 多个 Overlay 同时锁定滚动
- 部分 Overlay 锁定，部分不锁定的情况
- Web 端滚动锁定的恢复

**测试 5：动画性能**
- 快速切换 visible 时的动画表现
- 动画未完成时再次切换的处理

---

### 5. 文档完整性

#### ⚠️ 需要补充的文档

**文档 1：多端差异说明**
- Web 端使用 `touchAction: 'none'` 锁定滚动
- Native 端使用 BackHandler 处理返回键
- Portal 渲染的差异

**文档 2：zIndex 使用指南**
- zIndex 计算规则
- 何时需要手动指定 zIndex
- 栈管理的自动递增机制

**文档 3：性能注意事项**
- 避免频繁切换 visible
- 大量 Overlay 同时显示的性能影响
- 动画时长设置建议

**文档 4：最佳实践**
- 何时使用 Overlay vs Popup
- 滚动锁定的使用场景
- BackHandler 的处理建议

---

## 🔧 修复建议优先级

### P0 - 必须修复
1. **useOverlayStack 依赖项不完整** - 可能导致更新不及时
2. **zIndex 计算边界情况** - 可能导致 zIndex 错误

### P1 - 建议修复
3. **滚动锁定增强** - 支持更多场景
4. **测试补充** - 提高测试覆盖率

### P2 - 可选优化
5. **性能优化** - useMemo 稳定 options
6. **文档补充** - 提高可维护性

---

## 📝 修复代码示例

### 修复 1：useOverlayStack 依赖项

```typescript
// src/components/overlay/useOverlayStack.ts

export const useOverlayStack = ({
  visible,
  ...options
}: UseOverlayStackOptions): UseOverlayStackResult => {
  const entries = useOverlayEntries()
  const entryRef = React.useRef<OverlayStackEntry | null>(null)

  // 稳定 options 对象引用
  const stableOptions = React.useMemo(
    () => options,
    [
      options.onClose,
      options.closeOnBack,
      options.lockScroll,
      options.zIndex,
      options.type,
      options.meta,
    ]
  )

  React.useEffect(() => {
    if (!visible) {
      if (entryRef.current) {
        overlayStackStore.unmount(entryRef.current.key)
        entryRef.current = null
      }
      return
    }
    const entry = overlayStackStore.mount(stableOptions)
    entryRef.current = entry
    return () => {
      if (entryRef.current) {
        overlayStackStore.unmount(entryRef.current.key)
        entryRef.current = null
      }
    }
  }, [visible, stableOptions])

  React.useEffect(() => {
    if (!visible || !entryRef.current) {
      return
    }
    overlayStackStore.update(entryRef.current.key, stableOptions)
  }, [visible, stableOptions])

  // ... 其余代码
}
```

### 修复 2：zIndex 计算边界情况

```typescript
// src/components/overlay/OverlayStackStore.ts

private resolveZIndex = (provided?: number) => {
  if (isNumber(provided)) {
    if (!Number.isFinite(provided) || provided < 0) {
      return this.baseZIndex
    }
    return provided >= this.baseZIndex ? provided : this.baseZIndex + provided
  }
  const top = this.peek()
  if (!top) {
    return this.baseZIndex
  }
  return top.zIndex + this.zIndexStep
}
```

---

## ✅ 审查结论

Overlay 组件整体质量较高，代码结构清晰，多端兼容性处理较好。主要需要修复的是：

1. **依赖项管理**：确保 options 变化时正确更新
2. **边界情况处理**：zIndex 计算的边界情况
3. **测试补充**：提高测试覆盖率，特别是边界情况
4. **文档完善**：补充多端差异说明和最佳实践

修复这些问题后，组件可以进入稳定期。

---

## 📋 下一步行动

- [ ] 修复 useOverlayStack 依赖项问题
- [ ] 修复 zIndex 计算边界情况
- [ ] 补充边界情况测试
- [ ] 更新文档，补充多端差异说明
- [ ] 性能优化（可选）
- [ ] 代码审查通过后，标记为"已审查"

---

# Portal 组件审查报告

> 审查日期：2026-01-21  
> 审查人：AI Assistant  
> 优先级：P0（基础设施组件）

---

## 📊 总体评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码质量 | ⭐⭐⭐⭐ | 结构清晰，职责明确 |
| 多端兼容性 | ⭐⭐⭐⭐ | Web/Native 处理完整 |
| 性能优化 | ⭐⭐⭐ | 有快照缓存，仍可优化 |
| 测试覆盖 | ⭐⭐⭐⭐ | 核心场景覆盖较全 |
| 文档完整性 | ⭐⭐⭐ | 多端差异说明可补充 |

---

## 🔍 详细审查

### 1. 代码质量

#### ✅ 优点
- `PortalHost`/`Portal`/`PortalContext` 职责清晰
- `hostStack` 管理多 host 场景，避免状态错乱
- `portalEntries` 快照缓存，避免频繁数组创建
- zIndex 传播逻辑（递归取最大值）简洁可靠

#### ⚠️ 发现的问题

**问题 1：Portal 更新只比较引用，可能跳过深层变更**

**位置**：`src/components/portal/Portal.tsx`

```typescript
if (lastChildrenRef.current === children) return
manager.update(keyRef.current, children ?? null)
```

**问题**：
- 当 `children` 引用不变，但其内部状态变化时（例如 memoized element 内部更新），可能不会触发 update。
- 虽然 React 会触发渲染，但这里的更新逻辑依赖于引用变化。

**建议**：
- 保持现状可接受（多数情况下 children 引用会变），但应在文档中提示：Portal 内容建议传递新的 ReactNode（避免共享引用）。

---

**问题 2：PortalHost 切换时清空 portals 可能过于激进**

**位置**：`src/components/portal/PortalHost.tsx`

```typescript
if (hostStack.length === 0) {
  clearPortals()
  return
}
```

**问题**：
- 当最后一个 Host 卸载时，会清空所有 portals（包含静态 portals）。
- 如果应用有“延迟挂载新 Host”的场景，可能导致 portals 被清空。

**建议**：
- 当前逻辑合理，但建议在文档中明确：Portal 依赖 Host 的持续存在，Host 被卸载会清理 portals。

---

### 2. 多端兼容性

#### ✅ 优点
- Web 端支持自动挂载 PortalHost（`ensureGlobalPortalHost`）
- Native 端提示 warn，避免静态 API 静默失效
- `fixed` 模式仅 Web 生效（`position: fixed`）

#### ⚠️ 潜在问题

**问题 3：自动挂载依赖 react-dom**

**位置**：`ensureGlobalPortalHost`

```typescript
const { createRoot } = await import('react-dom/client')
```

**问题**：
- Web 端没有 `react-dom` 会抛异常（已 catch）
- 异步挂载过程中可能存在竞态（已通过 hostPromise 规避）

**建议**：
- 文档中明确：Web 端若使用静态 API，需确保 `react-dom` 可用。

---

### 3. 性能优化

#### ✅ 优点
- `snapshotCache` + `snapshotDirty` 机制避免频繁构造数组
- `PortalLayer` 使用 `PureComponent` 降低重渲染

#### ⚠️ 优化建议

**建议 1：PortalLayer.setEntries 避免 setState(null)**

**位置**：`PortalLayer.setEntries`

```typescript
this.setState(prev => (prev.entries === entries ? null : { entries }))
```

**建议**：
- 返回 `null` 会跳过更新，但这里 `entries` 是数组，引用变化频繁。
- 可考虑在 `PortalHost` 中做 shallow compare，避免不必要更新。

---

### 4. 测试覆盖

#### ✅ 已有测试
- mount/update/unmount 生命周期
- zIndex 传播
- 多 Host 行为
- 静态 API 清理
- 自动 Host 清理
- 无 Host 时 warn

#### ⚠️ 建议补充

**测试 1：children 引用不变但内部变化**
- 验证 Portal 更新逻辑是否能正确刷新

**测试 2：多 Host 切换场景**
- Host A 卸载后 Host B 挂载，Portal 是否正确保留

**测试 3：Web 自动 Host 竞态**
- 模拟连续调用 `ensureGlobalPortalHost` 的稳定性

---

### 5. 文档补充建议

- **Web 自动挂载说明**：依赖 `react-dom`，未安装会降级
- **Host 生命周期**：Host 卸载会清空 portals
- **zIndex 规则**：Portal 会取子树最大 zIndex 作为 wrapper zIndex
- **性能建议**：Portal 内容尽量避免传入引用稳定但内部变化的 ReactNode

---

## ✅ 审查结论

Portal 组件整体质量较高，核心逻辑稳定，多端兼容完善。主要关注点在于：

1. Portal 更新依赖 children 引用变化（行为可接受，但需文档说明）
2. Host 卸载会清空 portals（需明确约束）
3. 自动挂载依赖 `react-dom`（需文档提示）

修复建议以文档补充为主，无需大规模改动。

---

## 📋 下一步建议

- [ ] 补充 Portal 文档（Web 自动挂载、Host 生命周期、zIndex 规则）
- [ ] 增补测试（children 引用不变的更新场景）
- [ ] 评估是否需要优化 setEntries 的更新策略

---

# Popup 组件审查报告

> 审查日期：2026-01-21  
> 审查人：AI Assistant  
> 优先级：P0（基础设施组件）

---

## 📊 总体评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码质量 | ⭐⭐⭐⭐ | 逻辑清晰，分层合理 |
| 多端兼容性 | ⭐⭐⭐⭐ | Web/Native 兼容点覆盖 |
| 性能优化 | ⭐⭐⭐ | 动画/测量稳定，仍可收敛 |
| 测试覆盖 | ⭐⭐⭐⭐ | 关键交互覆盖较全 |
| 文档完整性 | ⭐⭐⭐ | 交互/行为契约需补充 |

---

## 🔍 详细审查

### 1. 代码质量

#### ✅ 优点
- 关闭链路（overlay/close-icon/back/popstate）集中在 `requestClose`，语义清晰
- 动画状态与可见性分离（`mounted` / `interactionVisible` / `visible`）
- Tokens 驱动完整，布局与样式可配置
- overlay 可达性处理合理（可关闭时才开放 a11y）

#### ⚠️ 发现的问题

**问题 1：`visible` 与 `interactionVisible` 的状态竞态风险**  
**位置**：`Popup.tsx`  

- `visible` 变为 `false` 时，`interactionVisible` 会在动画结束后置 `false`。  
- 如果快速开关（visible 迅速 true/false），可能出现动画状态与 `mounted` 不一致的短暂窗口。  

**建议**：
- 增加一个“当前动画方向”的 guard，避免同一帧内重复启动动画。
- 对 `visible` 快速切换的用例补单测。

---

**问题 2：`destroyOnClose` + `beforeClose` 的组合缺少测试**  
**位置**：`Popup.tsx`  

- `beforeClose` 可以异步阻止关闭，但如果同时 `destroyOnClose` 开启，需要确保生命周期回调顺序正确。  

**建议**：
- 补测试覆盖：`beforeClose` 失败时不销毁，成功时销毁。

---

**问题 3：`safeAreaInsetTop` 测量依赖 `measure`，可能存在布局延迟**  
**位置**：`Popup.tsx`  

- `safeAreaTopRef.measure` 依赖视图渲染完成，有延迟风险。
- 对于首帧动画，可能导致 closeIconTop 位置跳动。  

**建议**：
- 可考虑在 `SafeAreaView` 上用 `onLayout` 替代 `measure`，减少异步测量。
- 在 Web 端优先读取布局高度（若有）。

---

**问题 4：`overlay` 关闭时会触发 `onClickOverlay` 再 `requestClose`**  
**位置**：`Popup.tsx`  

- 目前顺序是：`onClickOverlay` → `requestClose('overlay')`。  
- 若业务在 `onClickOverlay` 里做阻断逻辑，需要明确该顺序。  

**建议**：
- 文档明确回调顺序。
- 考虑支持 `onClickOverlay` 返回 `false` 来阻止关闭（可选增强）。

---

### 2. 多端兼容性

#### ✅ 优点
- Web 端支持 `popstate` 关闭
- Native 端支持 `BackHandler`
- `touchAction` 与锁滚动处理兼容 Web

#### ⚠️ 潜在问题

**问题 5：`useNativeDriver` 兼容**  
**位置**：`Popup.tsx`  

- 已通过 `nativeDriverEnabled` 处理 Web/Native 差异。  
- 但内容动画 `contentAnimationStyle` 若传入 `opacity/transform` 之外的属性，在 Web 端可能不可用。  

**建议**：
- 文档注明 `contentAnimationStyle` 建议只传 `transform/opacity`。

---

### 3. 性能优化

#### ✅ 优点
- 动画使用 `Animated.timing` 并复用 `progress` 值
- `useMemo` 计算样式，避免多余构造

#### ⚠️ 优化建议

**建议 1：减少 `Dimensions.get('window')` 调用**  
**位置**：`translateDistance` 计算  

- 每次 placement 改变都会读 `Dimensions`，但缺少 `Dimensions` 监听。  

**建议**：
- 可用 `useWindowDimensions()` 替代。
- 或增加 `Dimensions.addEventListener` 监听窗口变化。

---

**建议 2：Overlay 与内容动画可复用一个 `Animated.Value`**  
目前 `overlayOpacity` 与 `progress` 分离，虽然合理，但可考虑统一驱动，减少动画同步风险。

---

### 4. 测试覆盖

#### ✅ 已有测试
- overlay 可达性
- beforeClose 同步/异步
- back press
- popstate
- safe area inset
- 渲染 placements
  
#### ⚠️ 建议补充

1. `visible` 快速切换（竞态）
2. `destroyOnClose + beforeClose` 组合
3. `contentAnimationStyle` 与 placement 的 transform 合并逻辑
4. `safeAreaInsetTop` 动态变化时 closeIcon 位置正确性

---

### 5. 文档补充建议

- **回调顺序**：overlay 点击时 `onClickOverlay` 与 `beforeClose/onClose` 的顺序
- **contentAnimationStyle 约束**：建议仅传 `transform/opacity`
- **visible 快速切换行为**：动画与渲染是否保留
- **safeAreaInsetTop/Bottom** 的行为说明

---

## ✅ 审查结论

Popup 组件整体成熟，逻辑闭环完整，且已覆盖核心交互与多端差异。  
主要的稳定性提升空间集中在：

1. 竞态与快速切换处理（动画一致性）
2. `beforeClose` + `destroyOnClose` 组合测试
3. SafeArea 测量方式优化

修复这些点后，Popup 可以达到生产级别稳定性。

---

## 📋 下一步建议

- [ ] 补充快速切换与销毁逻辑测试
- [ ] safeAreaInsetTop 测量优化（可选）
- [ ] 文档补充回调顺序与动画约束

---

# Swiper 组件审查报告

> 审查日期：2026-01-21  
> 审查人：AI Assistant  
> 优先级：P0（高复杂交互组件）

---

## 📊 总体评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码质量 | ⭐⭐⭐ | 逻辑复杂但结构清晰 |
| 多端兼容性 | ⭐⭐⭐⭐ | Web/Native 双实现，差异处理充分 |
| 性能优化 | ⭐⭐⭐ | 有节流与批处理，仍有优化空间 |
| 测试覆盖 | ⭐⭐⭐ | 核心路径覆盖，边界场景可补 |
| 文档完整性 | ⭐⭐⭐ | 行为契约需补充 |

---

## 🔍 详细审查

### 1. 代码质量

#### ✅ 优点
- Web/Native 分离逻辑清晰（`useSwiperWeb` + FlatList）
- 循环模式处理完整（复制首尾 + jump）
- Ref 命令与滚动状态有队列兜底
- autoHeight 支持通过测量缓存提升稳定性

#### ⚠️ 发现的问题

**问题 1：`handleContainerLayout` 未 memo，可能频繁重建**  
**位置**：`Swiper.tsx`  

```ts
const handleContainerLayout = (e: LayoutChangeEvent) => { ... }
```

**影响**：
频繁重建函数虽影响不大，但在高频布局变化场景会增加闭包重建。

**建议**：改为 `useCallback`（轻量优化）。

---

**问题 2：`scheduleIndicator` 在 RAF 环境缺少降级**  
**位置**：`Swiper.tsx`  

```ts
indicatorRafIdRef.current = requestAnimationFrame(...)
```

**问题**：
如果运行环境不支持 `requestAnimationFrame`，可能抛错。

**建议**：
在 SSR 或某些非浏览器环境中做兜底判断。

---

**问题 3：`useSwiperWeb` 内部依赖 `requestAnimationFrame`，但没有统一降级策略**  
**位置**：`useSwiperWeb.ts`  

**影响**：
非浏览器环境下可能触发异常，虽然多数场景只在 Web 使用，但仍建议加保护。

---

### 2. 多端兼容性

#### ✅ 优点
- Web 使用 PanResponder + transform，自定义拖拽逻辑完整
- Native 使用 FlatList + snapToOffsets，兼容性好
- `preventScroll` 控制 nestedScroll / directionalLock

#### ⚠️ 风险点

**问题 4：Web 滚动阻止策略可能误伤外层滚动**  
**位置**：`useSwiperWeb`  

```ts
if (latest.preventScroll) stopWebEvent(event)
```

**影响**：
Web 端外层滚动可能被完全阻止，特别是横向 Swiper 嵌套纵向页面时。

**建议**：
文档明确 `preventScroll` 的副作用，或增加方向判断（只阻止主轴滚动）。

---

### 3. 性能优化

#### ✅ 优点
- Web 端拖拽更新用 RAF 合并
- Native 端 FlatList 设置 batch/window 优化

#### ⚠️ 可优化点

**建议 1：loopData 构造频率**  
当前 `loopData` 每次 `itemsData` 变化都会重建数组，数量较多时开销显著。  

---

### 4. 测试覆盖

#### ✅ 已有测试
- 循环模式基础行为
- autoHeight
- onIndexChange/onChange 回调
- 指示器与滚动同步

#### ⚠️ 建议补充

1. `preventScroll` 对外层滚动影响  
2. `requestAnimationFrame` 不存在时的降级  
3. Web 端 drag + momentum 组合场景  
4. loop 模式下快速切换的稳定性  

---

### 5. 文档补充建议

- `preventScroll` 的副作用说明  
- loop 模式对数据长度的要求  
- autoHeight 的测量规则与缓存  

---

## ✅ 审查结论

Swiper 组件结构清晰、能力完整，但在 **Web 拖拽阻止策略** 与 **非 RAF 环境降级** 上需要补强。  
补齐测试与文档后，可达到稳定标准。

---

## 📋 下一步建议

- [ ] handleContainerLayout 使用 useCallback  
- [ ] requestAnimationFrame 降级保护  
- [ ] 文档补充 preventScroll 与 loop 规则  
- [ ] 测试补齐 Web 拖拽与降级路径  

---

# Tabs 组件审查报告

> 审查日期：2026-01-21  
> 审查人：AI Assistant  
> 优先级：P0（高复杂交互组件）

---

## 📊 总体评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码质量 | ⭐⭐⭐⭐ | 结构清晰、功能完备 |
| 多端兼容性 | ⭐⭐⭐⭐ | Web/Native 兼容点充分 |
| 性能优化 | ⭐⭐⭐ | 动画与滚动稳定，但仍可优化 |
| 测试覆盖 | ⭐⭐⭐⭐ | 核心交互覆盖较全 |
| 文档完整性 | ⭐⭐⭐ | 行为契约需补充 |

---

## 🔍 详细审查

### 1. 代码质量

#### ✅ 优点
- TabPane 解析逻辑清晰，支持 Fragment/自定义 displayName
- `useTabsAnimation` 与 `useTabsScroll` 分离，职责明确
- `beforeChange` 异步处理有异常兜底
- swipeable + autoHeight 逻辑完整

#### ⚠️ 发现的问题

**问题 1：`beforeChange` 在 swipeable 模式下未生效**  
**位置**：`Tabs.tsx`  

```ts
const handleSwipeMomentumScrollEnd = (...) => {
  // ...
  setActiveValue(nextPane.name, nextPane.index)
}
```

**问题**：  
滑动切换时直接 `setActiveValue`，绕过 `beforeChange`。  
这会导致点击与滑动的拦截行为不一致。

**建议**：  
在 swipeable 模式下也走 `runBeforeChange`，或明确文档说明“滑动不走 beforeChange”。

---

**问题 2：`beforeChange` Promise 竞态**  
**位置**：`Tabs.tsx`  

当用户快速点击多个 Tab 时，先触发的 `beforeChange` Promise 可能在后触发后才 resolve，导致“旧选择覆盖新选择”。

**建议**：  
增加“序列号/时间戳”机制，只处理最后一次触发的结果。

---

**问题 3：Swipeable ScrollView 只监听 `onMomentumScrollEnd`**  
**位置**：`Tabs.tsx`  

```ts
onMomentumScrollEnd={handleSwipeMomentumScrollEnd}
```

**问题**：  
某些平台（或短距离拖动）可能不会触发 momentum end，导致切换不同步。

**建议**：  
补充 `onScrollEndDrag` 或在 `onScroll` 中节流检测 pageIndex。

---

### 2. 多端兼容性

#### ✅ 优点
- Web 端 `requestFrame` 有 fallback（setTimeout）
- Nav 滚动在 Web/Native 行为一致
- `preventScroll` 统一处理 nestedScroll/directionalLock

#### ⚠️ 风险点

**问题 4：`navScrollX` 驱动 ScrollView 的 setValue 监听在 Web 端可能抖动**  
**位置**：`useTabsScroll.ts`  

```ts
navScrollX.addListener(({ value }) => {
  navScrollRef.current?.scrollTo({ x: value, y: 0, animated: false })
})
```

**问题**：  
Web 端 ScrollView 可能会与 `onScroll` 产生抖动，虽然当前有 `navAutoScrollingRef` 保护，但仍需关注边界场景。

---

### 3. 性能优化

#### ✅ 优点
- 指示器动画与滚动同步，避免频繁 setState
- scrollIntoView 有动画与非动画分支

#### ⚠️ 可优化点

**建议 1：`layoutMap` 与 `paneLayoutMap` 清理策略**  
当前只在 panes 变化时清理不再存在的 key。  
可考虑对 `paneLayoutMap` 添加 LRU/size 控制，避免长生命周期累积（尤其动态 Tab 数量场景）。

---

### 4. 测试覆盖

#### ✅ 已有测试
- 点击切换与 onChange
- lazyRender / placeholder
- beforeChange 阻断
- tab disabled
- indicator 动画/scrollView 滚动互不干扰
- panes 动态追加

#### ⚠️ 建议补充

1. **Swipeable + beforeChange**：验证滑动切换是否遵守 beforeChange  
2. **Promise 竞态**：连续点击多个 Tab 的结果一致性  
3. **onScrollEndDrag 场景**：无 momentum 时是否能更新  
4. **autoHeight + lazyRender**：高度更新是否正确

---

### 5. 文档补充建议

- `beforeChange` 在点击/滑动的差异说明  
- swipeable 模式的事件触发顺序  
- autoHeight 的测量机制与性能建议

---

## ✅ 审查结论

Tabs 组件整体质量较高，功能完整，但在 **滑动切换与 beforeChange 一致性** 方面存在潜在语义差异，这是需要优先对齐的风险点。  
补齐竞态处理与测试后可达稳定标准。

---

## 📋 下一步建议

- [ ] 统一点击与滑动切换的 beforeChange 语义  
- [ ] 添加 Promise 竞态保护  
- [ ] 补充 swipeable 相关测试  
- [ ] 文档明确滑动与点击的行为差异

---

# Picker 组件审查报告

> 审查日期：2026-01-21  
> 审查人：AI Assistant  
> 优先级：P1（高交互风险组件）

---

## 📊 总体评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码质量 | ⭐⭐⭐⭐ | 结构清晰，拆分合理 |
| 多端兼容性 | ⭐⭐⭐⭐ | Web/Native 逻辑分离完善 |
| 性能优化 | ⭐⭐⭐⭐ | 虚拟化与节奏优化到位 |
| 测试覆盖 | ⭐⭐⭐⭐ | 级联、disabled、归一化覆盖 |
| 文档完整性 | ⭐⭐⭐ | 交互策略需补充 |

---

## 🔍 详细审查

### 1. 代码质量

#### ✅ 优点
- `usePickerValue` 将受控/非受控、级联逻辑集中  
- `normalizePicker` 覆盖 cascade/multiple/single  
- `WheelPicker` 封装清晰，Web/Native 分支独立  
- 级联 key 处理避免列重用导致的状态错乱  

#### ⚠️ 发现的问题

**问题 1：`interactionMode` 在 API 中保留但实际不生效**  
**位置**：`Picker.tsx` / `types.d.ts`  

**问题**：  
`interactionMode` 仍作为 props 暴露，但内部逻辑已不再使用。  
可能造成文档/行为错配。

**建议**：  
文档明确该字段目前等同于默认行为，或考虑完全移除/实现。

---

**问题 2：Web 端 WheelPicker 总是触发 onChange**  
**位置**：`WheelPicker.tsx`  

```ts
onChange(index) // 即使 index 相同
```

**原因**：  
为修复级联场景“索引相同但仍需触发更新”的问题，取消了索引比较。  

**风险**：  
可能导致频繁重复 onChange（尤其在滚轮停留时）。  

**建议**：  
可在上层 `handleSelect` 里增加轻量去抖（仅针对相同 index 的快速重复）。

---

### 2. 多端兼容性

#### ✅ 优点
- Web 端 PanResponder + transition 机制稳定  
- Native 端 FlatList + snapToInterval  
- Web 虚拟渲染根据速度动态 buffer  

#### ⚠️ 风险点

**问题 3：Web 端 `touchAction: none` 可能阻断外层滚动**  
**位置**：`WheelPicker.tsx`  

```ts
touchAction: 'none'
```

**建议**：  
文档提醒嵌套滚动场景需谨慎。

---

### 3. 性能优化

#### ✅ 优点
- Web 端动态虚拟渲染 buffer  
- Native 端 batch/windowSize 参数优化  
- Wheel 滚轮节流处理  

#### ⚠️ 可优化点

**建议 1：`emitIndexFromOffset` 多次触发 onChange**  
在惯性滚动中可能触发多次 `onChange`，建议考虑节流或只在稳定时触发（需权衡交互响应）。

---

### 4. 测试覆盖

#### ✅ 已有测试
- 级联路径稳定性  
- disabled 选项跳过  
- normalize 边界值  
- optionRender active 状态  

#### ⚠️ 建议补充

1. Web 端 wheel 触发频繁 onChange 的行为约束  
2. 受控模式下 cascade 快速切换一致性  
3. interactionMode 文档与实现一致性测试  

---

### 5. 文档补充建议

- `interactionMode` 当前行为说明  
- Web 端滚轮/拖拽的 onChange 触发策略  
- 级联选项快速切换的规则  

---

## ✅ 审查结论

Picker 组件整体质量较高，级联逻辑和多端兼容已达生产级。  
主要关注点在于：  
1. `interactionMode` 文档与实现一致性  
2. Web 端 onChange 触发频率  
3. 嵌套滚动场景的 touchAction 影响  

---

## 📋 下一步建议

- [ ] 明确 `interactionMode` 行为或移除  
- [ ] 补充 Web 滚轮频率测试  
- [ ] 文档补齐交互策略  
