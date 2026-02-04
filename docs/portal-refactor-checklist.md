# Portal 重构后组件对齐检查清单

## 问题背景

Portal 重构后，需要确保所有使用 Portal 的组件都正确对齐，避免出现双层 Portal 嵌套的问题。

**重要原则：弹窗组件默认应该在关闭后销毁 DOM 节点，而不是仅隐藏，除非用户明确设置 `destroyOnClose={false}`。**

### 双层 Portal 问题说明

**错误模式：**
```tsx
// 组件内部有 Portal
export const Component = () => (
  <Portal>
    <ComponentContent />
  </Portal>
)

// imperative API 又包了一层 Portal
const key = Portal.add(null)
Portal.update(key, <Component />) // ❌ 双层 Portal！
```

**正确模式（Toast/Notify 模式）：**
```tsx
// 1. 分离内容组件（不含 Portal）
export const ComponentContent = () => (
  <View>{/* ... */}</View>
)

// 2. 导出带 Portal 的组件
export const Component = (props) => (
  <Portal>
    <ComponentContent {...props} />
  </Portal>
)

// 3. imperative API 直接使用内容组件
const key = Portal.add(null)
Portal.update(key, <ComponentContent {...props} />) // ✅ 单层 Portal
```

## 组件检查结果

### ✅ 已修复组件

#### 1. Toast
- **文件**: `src/components/toast/Toast.tsx`
- **实现**:
  - `ToastContent`: 纯内容组件，不含 Portal
  - `Toast`: 包裹 `ToastContent` 的 Portal 组件
- **imperative API**: `src/components/toast/imperative.tsx`
  - 使用 `<ToastContent>` ✅
- **节点销毁**: ✅ 默认在动画结束后销毁节点 (`setMounted(false)`)

#### 2. Notify
- **文件**: `src/components/notify/Notify.tsx`
- **实现**:
  - `NotifyContent`: 纯内容组件，不含 Portal
  - `Notify`: 包裹 `NotifyContent` 的 Portal 组件
- **imperative API**: `src/components/notify/imperative.tsx`
  - 使用 `<NotifyContent>` ✅
- **节点销毁**: ✅ 默认在动画结束后销毁节点 (`setMounted(false)`)

### ✅ 无 imperative API，直接使用正常

#### 3. Popup
- **文件**: `src/components/popup/Popup.tsx`
- **实现**: 组件内部包含 `<Portal>`
- **使用方式**: JSX 形式直接使用 `<Popup visible={...}>` ✅
- **无 imperative API**
- **节点销毁**: ✅ 修改 `destroyOnClose` 默认值为 `true`
  - 动画结束后：`destroyOnClose ? setMounted(false) : setInteractionVisible(false)`
  - **之前默认值是 `false` ❌，已修复为 `true` ✅**

#### 4. DropdownMenu
- **文件**: `src/components/dropdown-menu/DropdownMenu.tsx`
- **实现**: 组件内部条件渲染 `{mounted ? <Portal>...</Portal> : null}`
- **使用方式**: JSX 形式直接使用 `<DropdownMenu>` ✅
- **无 imperative API**
- **节点销毁**: ✅ 默认在动画结束后销毁节点
  - 关闭时: `runAnimation(0, () => { setMounted(false); setPanel(null); onClosed?.() })`

#### 5. NumberKeyboard
- **文件**: `src/components/number-keyboard/NumberKeyboard.tsx`
- **实现**: 组件内部包含 `<Portal>`
- **使用方式**: JSX 形式直接使用 `<NumberKeyboard visible={...}>` ✅
- **无 imperative API**
- **节点销毁**: ✅ 默认在动画结束后销毁节点
  - 动画回调: `if (finished && !visible) { setShouldRender(false) }`
  - 提前退出: `if (!shouldRender && !visible) return null`

### ✅ 通过 Popup 间接使用 Portal（正确）

#### 6. Dialog
- **文件**: `src/components/dialog/Dialog.tsx`
- **实现**: `<Dialog>` → `<Popup>` → `<Portal>` ✅
- **imperative API**: `src/components/dialog/imperative.tsx`
  - 渲染 `<Dialog>` → 间接得到单层 Portal ✅
- **节点销毁**: ✅ 继承 Popup 的 `destroyOnClose` 行为（默认 `true`）

#### 7. ImagePreview
- **文件**: `src/components/image-preview/ImagePreview.tsx`
- **实现**: `<ImagePreview>` → `<Popup>` → `<Portal>` ✅
- **imperative API**: `src/components/image-preview/imperative.tsx`
  - 渲染 `<ImagePreview>` → 间接得到单层 Portal ✅
- **节点销毁**: ✅ 继承 Popup 的 `destroyOnClose` 行为（默认 `true`）

#### 8. ActionSheet
- **实现**: 通过 `<Popup>` 实现 ✅
- **无独立 imperative API**
- **节点销毁**: ✅ 继承 Popup 的 `destroyOnClose` 行为（默认 `true`）

#### 9. ShareSheet
- **实现**: 通过 `<Popup>` 实现 ✅
- **无独立 imperative API**
- **节点销毁**: ✅ 继承 Popup 的 `destroyOnClose` 行为（默认 `true`）

---

## 节点销毁策略总结

### 🎯 核心原则

**弹窗组件默认应该在关闭后销毁 DOM 节点，而不是仅隐藏。**

**理由：**
1. **性能优化**：避免大量隐藏的 DOM 节点占用内存
2. **状态清理**：确保组件每次打开时都是全新的状态
3. **事件清理**：避免隐藏节点的事件监听器继续占用资源
4. **符合用户直觉**：关闭 = 销毁，打开 = 重新创建

**例外情况：**
- 用户明确设置 `destroyOnClose={false}` 时才保留节点（用于性能优化场景，如频繁开关的弹窗）

### 实现模式

#### 模式 1: 使用 `mounted` 状态 + 条件 return

```tsx
export const Component = (props) => {
  const [mounted, setMounted] = useState(visible)
  
  useEffect(() => {
    if (visible) {
      setMounted(true)
      // 播放进入动画
      runAnimation(1)
    } else {
      // 播放退出动画
      runAnimation(0, () => {
        setMounted(false) // 动画结束后销毁节点
      })
    }
  }, [visible])
  
  if (!mounted) return null // 彻底不渲染
  
  return <View>{/* ... */}</View>
}
```

**适用组件**: Toast, Notify

#### 模式 2: 使用 `destroyOnClose` 属性

```tsx
export const Component = (props) => {
  const { destroyOnClose = true } = props // 默认为 true
  const [mounted, setMounted] = useState(visible)
  const [interactionVisible, setInteractionVisible] = useState(visible)
  
  const runAnimation = (show) => {
    // 动画逻辑
    animation.start(() => {
      if (!show) {
        setInteractionVisible(false)
        if (destroyOnClose) {
          setMounted(false) // 销毁节点
        }
      }
    })
  }
  
  const shouldRender = mounted || visible
  if (!shouldRender) return null
  
  return <View style={{ display: interactionVisible ? 'flex' : 'none' }}>{/* ... */}</View>
}
```

**适用组件**: Popup

#### 模式 3: 条件渲染 Portal

```tsx
export const Component = (props) => {
  const [mounted, setMounted] = useState(false)
  
  // 关闭时 setMounted(false)
  
  return (
    <View>
      {/* 主体内容 */}
      {mounted ? (
        <Portal>
          {/* 弹出内容 */}
        </Portal>
      ) : null}
    </View>
  )
}
```

**适用组件**: DropdownMenu

## 设计原则总结

### 原则 1: 组件拆分策略

对于需要 **同时提供 JSX 用法和 imperative API** 的组件（如 Toast、Notify），必须拆分：

```tsx
// 1. 纯内容组件（导出）
export const ComponentContent: React.FC<Props> = props => {
  // ... 所有逻辑和渲染
  return <View>{/* ... */}</View>
}

// 2. Portal 包裹组件（导出为默认）
export const Component: React.FC<Props> = props => (
  <Portal>
    <ComponentContent {...props} />
  </Portal>
)

ComponentContent.displayName = 'ComponentContent'
Component.displayName = 'Component'

export default Component
```

### 原则 2: imperative API 实现

```tsx
// imperative.tsx
import { ComponentContent } from './Component'

const ComponentPortal = ({ id, options }) => {
  const [visible, setVisible] = useState(true)
  
  // ... 状态管理逻辑
  
  return <ComponentContent {...options} visible={visible} /* ... */ />
}

const show = (options) => {
  const key = Portal.add(null)
  Portal.update(key, <ComponentPortal id={key} options={options} />)
  return { clear: () => Portal.remove(key) }
}
```

### 原则 3: 组合组件策略

对于复合组件（如 Dialog、ImagePreview），可以通过已有的带 Portal 组件（如 Popup）来实现：

```tsx
// Dialog.tsx
export const Dialog = (props) => (
  <Popup {...popupProps}>
    {/* Dialog 特有内容 */}
  </Popup>
)

// imperative.tsx - 直接渲染 Dialog 即可
Portal.add(<Dialog {...options} />)
```

### 原则 4: 纯 JSX 组件

对于只通过 JSX 使用的组件（如 Popup、DropdownMenu、NumberKeyboard），直接在组件内部使用 Portal：

```tsx
export const Component = (props) => {
  // ... 逻辑
  return (
    <Portal>
      {/* ... */}
    </Portal>
  )
}
```

## 测试要点

### 1. 功能测试
- [ ] 组件正常显示和隐藏
- [ ] 动画流畅无卡顿
- [ ] 生命周期回调正常触发

### 2. 视觉测试
- [ ] 无闪烁（特别是 Web 端）
- [ ] z-index 层级正确
- [ ] 蒙层和内容动画同步

### 3. 边界测试
- [ ] 快速连续调用 show/hide
- [ ] allowMultiple 场景
- [ ] StrictMode 双调用场景
- [ ] 路由切换时的清理

## 后续维护

### 添加新的 overlay 组件时

1. **确定使用方式**
   - 仅 JSX？→ 直接在组件内使用 `<Portal>`
   - 需要 imperative API？→ 拆分为 Content + Portal 包裹组件
   - 复合其他组件？→ 使用已有的 Popup 等带 Portal 组件

2. **参考实现**
   - Toast/Notify：imperative API 模式
   - Popup/NumberKeyboard：纯 JSX 模式
   - Dialog/ImagePreview：组合模式

3. **测试清单**
   - 运行 `npm run test` 确保单测通过
   - Web/iOS/Android 三端验证
   - 检查 linter 错误

## 相关文件

- Portal 核心: `src/components/portal/Portal.tsx`
- PortalHost: `src/components/portal/PortalHost.tsx`
- ConfigProvider: `src/components/config-provider/ConfigProvider.tsx` (全局 PortalHost)
- 迁移计划: `docs/gluestack-migration-plan.md`
