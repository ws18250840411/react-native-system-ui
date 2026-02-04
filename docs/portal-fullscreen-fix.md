# 修复弹窗全屏覆盖问题

## 🎯 问题描述

弹窗（Popup/Dialog/Toast 等）在 Web 端显示时没有覆盖整个屏幕，看起来范围被限制在了某个容器内。

## 🔍 问题根因

PortalHost 的 `webFixedStyle` 只设置了 `position: 'fixed'`，但没有明确指定全屏覆盖的尺寸和定位属性。

### 修复前代码

```tsx
const webFixedStyle: ViewStyle | undefined =
  Platform.OS === 'web'
    ? ({ position: 'fixed' } as unknown as ViewStyle)
    : undefined
```

**问题**：
- 仅有 `position: fixed` 不足以确保元素覆盖全屏
- 缺少 `top`, `left`, `right`, `bottom` 定位
- 缺少 `width`, `height` 尺寸声明
- 可能被父容器的尺寸限制影响

## ✅ 修复方案

### 修改文件

`src/components/portal/PortalHost.tsx`

### 修复后代码

```tsx
const webFixedStyle: ViewStyle | undefined =
  Platform.OS === 'web'
    ? ({ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
      } as unknown as ViewStyle)
    : undefined
```

**改进**：
- ✅ `position: fixed` - 相对于视口定位
- ✅ `top: 0, left: 0, right: 0, bottom: 0` - 四个方向都定位到视口边缘
- ✅ `width: '100%', height: '100%'` - 明确设置全屏尺寸
- ✅ 确保弹窗层覆盖整个浏览器视口

## 📊 修复效果

### 修复前

```
浏览器视口
┌─────────────────────┐
│  父容器              │
│  ┌───────────────┐  │
│  │ Portal 内容   │  │  ← 被父容器尺寸限制
│  │ (弹窗)        │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

### 修复后

```
浏览器视口
┌─────────────────────┐
│█████████████████████│
│█    Portal 内容     █│  ← 覆盖整个视口
│█    (弹窗)          █│
│█████████████████████│
└─────────────────────┘
```

## 🎨 技术细节

### CSS `position: fixed` 的特性

在 Web 端，`position: fixed` 的元素：
- 相对于**浏览器视口**定位，而不是父元素
- 不受父元素的 `overflow`, `transform`, `perspective` 等属性影响（除非父元素有这些属性）
- 需要明确指定位置和尺寸才能正确覆盖全屏

### 完整的全屏覆盖需要

```css
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
height: 100%;
```

或者

```css
position: fixed;
inset: 0; /* 相当于 top: 0; right: 0; bottom: 0; left: 0; */
width: 100vw; /* 视口宽度 */
height: 100vh; /* 视口高度 */
```

## 🔧 影响范围

此修复影响所有使用 Portal 的组件在 Web 端的表现：

- ✅ Popup - 弹窗现在正确覆盖全屏
- ✅ Dialog - 对话框正确覆盖全屏
- ✅ Toast - 提示现在正确覆盖全屏
- ✅ Notify - 通知现在正确覆盖全屏
- ✅ ImagePreview - 图片预览正确覆盖全屏
- ✅ ActionSheet - 动作面板正确覆盖全屏
- ✅ ShareSheet - 分享面板正确覆盖全屏
- ✅ DropdownMenu - 下拉菜单正确覆盖全屏（Portal 部分）
- ✅ NumberKeyboard - 数字键盘正确覆盖全屏

## 📝 PortalHost 的 fixed 属性说明

```tsx
<PortalHost fixed={Platform.OS === 'web'}>
  {children}
</PortalHost>
```

**`fixed` 属性的作用**：
- 在 Web 端启用 `position: fixed` 定位
- 在 Native 端无效（使用默认的 absolute 定位）
- 确保弹窗层始终相对于视口定位，不受页面滚动影响

**为什么只在 Web 端使用**：
- Web: 需要 fixed 定位来脱离文档流，覆盖整个视口
- iOS/Android: Native 组件的 Portal 实现本身就是全屏覆盖的

## ✅ 验证方法

1. **视觉验证**：打开任何弹窗组件，确认：
   - 蒙层覆盖整个浏览器窗口
   - 弹窗内容居中显示
   - 边缘没有留白或被裁剪

2. **滚动验证**：
   - 页面滚动到任意位置
   - 打开弹窗
   - 确认弹窗始终相对于视口定位，不随页面滚动

3. **响应式验证**：
   - 调整浏览器窗口大小
   - 确认弹窗始终覆盖整个视口

## 🎉 总结

- ✅ 修复了 Web 端弹窗不能全屏覆盖的问题
- ✅ 确保所有 Portal 组件在 Web 端正确显示
- ✅ 不影响 Native 端的表现
- ✅ 代码改动最小化，仅修改了 PortalHost 的样式定义
