# 安全区域灵活配置说明

## 📋 概述

所有使用全屏布局的组件现在都支持灵活的安全区域配置：
- **默认行为**: 安全区域默认开启，确保内容不被刘海屏和 Home Indicator 遮挡
- **全屏模式**: 可以通过 props 显式设置为 `false` 来禁用安全区域，实现全屏显示

---

## 🎯 组件配置方式

### 1. ImagePreview（图片预览）

**Props**:
- `safeAreaInsetTop?: boolean` - 内容顶部是否预留安全区域（默认 `true`）
- `safeAreaInsetBottom?: boolean` - 内容底部是否预留安全区域（默认 `true`）

**示例**:
```tsx
// 默认开启安全区域（推荐）
<ImagePreview visible={true} images={images} />

// 全屏显示（禁用安全区域）
<ImagePreview 
  visible={true} 
  images={images}
  safeAreaInsetTop={false}
  safeAreaInsetBottom={false}
/>

// 只禁用顶部安全区域
<ImagePreview 
  visible={true} 
  images={images}
  safeAreaInsetTop={false}
/>
```

### 2. Cascader（级联选择器）

**配置方式**: 通过 `popupProps` 传递

**默认行为**:
- 当有 `showHeader` 和 `closeable` 时，`safeAreaInsetTop` 默认为 `true`
- 当 `popupPlacement === 'bottom'` 时，`safeAreaInsetBottom` 默认为 `true`

**示例**:
```tsx
// 默认开启安全区域（推荐）
<Cascader 
  visible={true} 
  options={options}
  showHeader={true}
  closeable={true}
/>

// 全屏显示（禁用安全区域）
<Cascader 
  visible={true} 
  options={options}
  popupProps={{
    safeAreaInsetTop: false,
    safeAreaInsetBottom: false,
  }}
/>

// 只禁用顶部安全区域
<Cascader 
  visible={true} 
  options={options}
  popupProps={{
    safeAreaInsetTop: false,
  }}
/>
```

### 3. Calendar（日历）

**配置方式**: 通过 `popupProps` 传递

**默认行为**:
- 当有 `showHeader` 时，`safeAreaInsetTop` 默认为 `true`
- 当 `popupPlacement === 'bottom'` 时，`safeAreaInsetBottom` 默认为 `true`

**示例**:
```tsx
// 默认开启安全区域（推荐）
<Calendar 
  visible={true} 
  showHeader={true}
/>

// 全屏显示（禁用安全区域）
<Calendar 
  visible={true} 
  popupProps={{
    safeAreaInsetTop: false,
    safeAreaInsetBottom: false,
  }}
/>
```

### 4. Toast（提示）

**Props**:
- `safeAreaInsetTop?: boolean` - 内容顶部是否预留安全区域（默认根据 `position` 自动设置）
- `safeAreaInsetBottom?: boolean` - 内容底部是否预留安全区域（默认根据 `position` 自动设置）

**默认行为**:
- 当 `position === 'top'` 时，`safeAreaInsetTop` 默认为 `true`
- 当 `position === 'bottom'` 时，`safeAreaInsetBottom` 默认为 `true`

**示例**:
```tsx
// 默认开启安全区域（推荐）
<Toast visible={true} message="提示" position="top" />

// 全屏显示（禁用安全区域）
<Toast 
  visible={true} 
  message="提示" 
  position="top"
  safeAreaInsetTop={false}
/>
```

### 5. ActionSheet（动作面板）

**Props**: 已有 `safeAreaInsetBottom` prop

**默认行为**:
- 当有 `title` 和 `closeable` 时，`safeAreaInsetTop` 默认为 `true`
- `safeAreaInsetBottom` 可通过 prop 配置（默认从 tokens 读取）

**示例**:
```tsx
// 默认开启安全区域（推荐）
<ActionSheet 
  visible={true} 
  title="标题"
  closeable={true}
/>

// 全屏显示（禁用安全区域）
<ActionSheet 
  visible={true} 
  title="标题"
  closeable={true}
  popupProps={{
    safeAreaInsetTop: false,
    safeAreaInsetBottom: false,
  }}
/>
```

### 6. ShareSheet（分享面板）

**Props**: 已有 `safeAreaInsetBottom` prop（默认 `true`）

**示例**:
```tsx
// 默认开启安全区域（推荐）
<ShareSheet visible={true} options={options} />

// 全屏显示（禁用安全区域）
<ShareSheet 
  visible={true} 
  options={options}
  safeAreaInsetBottom={false}
/>
```

### 7. DatetimePicker（日期时间选择器）

**配置方式**: 通过 `popupProps` 传递

**默认行为**: `safeAreaInsetBottom` 默认为 `true`（从底部弹出）

**示例**:
```tsx
// 默认开启安全区域（推荐）
<DatetimePicker popup={true} />

// 全屏显示（禁用安全区域）
<DatetimePicker 
  popup={true}
  popupProps={{
    safeAreaInsetBottom: false,
  }}
/>
```

---

## 🎨 使用场景

### 推荐使用安全区域（默认）

- ✅ **大多数场景**: 确保内容不被刘海屏和 Home Indicator 遮挡
- ✅ **用户体验**: 符合 iOS 和 Android 的设计规范
- ✅ **兼容性**: 在不同设备上都能正常显示

### 全屏模式使用场景

- 🎬 **沉浸式体验**: 图片预览、视频播放等需要全屏显示的场景
- 🎨 **自定义设计**: 需要自定义布局，不遵循系统安全区域
- 📱 **特定需求**: 某些特殊场景需要内容延伸到屏幕边缘

---

## 📝 注意事项

1. **默认行为**: 所有组件默认开启安全区域，确保最佳用户体验
2. **显式配置**: 如果需要全屏显示，需要显式设置 `safeAreaInsetTop={false}` 和/或 `safeAreaInsetBottom={false}`
3. **关闭按钮**: 即使禁用安全区域，关闭按钮的位置仍然会考虑安全区域（通过 Popup 的优化）
4. **蒙层**: 蒙层始终撑满整个屏幕，不受安全区域设置影响

---

## 🔧 技术实现

### Popup 组件

- 支持 `safeAreaInsetTop` 和 `safeAreaInsetBottom` props
- 关闭按钮自动考虑安全区域高度
- SafeAreaView 设置 `pointerEvents="none"`，不拦截点击事件

### 组件层级

1. **直接支持**: ImagePreview, Toast - 直接通过 props 配置
2. **通过 popupProps**: Cascader, Calendar, DatetimePicker - 通过 `popupProps` 传递
3. **已有支持**: ActionSheet, ShareSheet - 已有相关 props

---

## ✅ 总结

所有使用全屏布局的组件现在都支持灵活的安全区域配置：
- ✅ **默认开启**: 确保最佳用户体验
- ✅ **可配置**: 支持全屏模式
- ✅ **向后兼容**: 所有现有代码无需修改
- ✅ **统一标准**: 所有组件使用统一的配置方式
