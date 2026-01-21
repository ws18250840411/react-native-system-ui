# 全屏布局安全区域优化计划

## 优化目标

统一优化所有使用全屏布局的组件，确保：
1. 蒙层撑满整个屏幕（包括顶部和底部）
2. 内容区域正确考虑安全区域
3. 关闭按钮（如果有）正确定位，考虑安全区域

## 组件检查清单

### ✅ 已优化
- **ImagePreview** - 已优化，有 `safeAreaInsetTop` 和 `safeAreaInsetBottom`，关闭按钮已考虑安全区域

### 🔄 需要优化

#### 1. Dialog（居中弹窗）
- **现状**: 使用 Popup，placement="center"，没有设置安全区域
- **问题**: 关闭按钮在顶部，没有考虑安全区域
- **优化方案**: 
  - Dialog 是居中显示的，通常不需要全屏安全区域
  - 但如果用户在全屏模式下使用，关闭按钮可能需要考虑安全区域
  - **建议**: 保持现状（Dialog 不是全屏组件）

#### 2. ActionSheet（底部弹出）
- **现状**: 使用 Popup，placement="bottom"，有 `safeAreaInsetBottom`，没有 `safeAreaInsetTop`
- **问题**: 关闭按钮在 header 中，可能不需要顶部安全区域
- **优化方案**: 
  - ActionSheet 从底部弹出，通常不需要顶部安全区域
  - 但关闭按钮如果在顶部，可能需要考虑安全区域
  - **需要检查**: 关闭按钮的实际位置

#### 3. ShareSheet（底部弹出）
- **现状**: 使用 Popup，placement="bottom"，有 `safeAreaInsetBottom`，没有 `safeAreaInsetTop`
- **问题**: 没有关闭按钮在顶部，只有取消按钮在底部
- **优化方案**: 
  - ShareSheet 从底部弹出，不需要顶部安全区域
  - **建议**: 保持现状

#### 4. Cascader（级联选择器）
- **现状**: 使用 Popup，通过 `popupProps` 传递配置
- **问题**: 需要检查是否有安全区域设置
- **优化方案**: 
  - 检查 Cascader 的 popupProps 是否有安全区域设置
  - 如果没有，需要添加

#### 5. Calendar（日历）
- **现状**: 使用 Popup，通过 `popupProps` 传递配置
- **问题**: 需要检查是否有安全区域设置
- **优化方案**: 
  - 检查 Calendar 的 popupProps 是否有安全区域设置
  - 如果没有，需要添加

#### 6. NumberKeyboard（数字键盘）
- **现状**: 使用 Portal 和 SafeAreaView，有 `safeAreaInsetBottom`，没有 `safeAreaInsetTop`
- **问题**: 从底部弹出，没有关闭按钮在顶部
- **优化方案**: 
  - NumberKeyboard 从底部弹出，不需要顶部安全区域
  - **建议**: 保持现状

#### 7. Toast（提示）
- **现状**: 使用 Portal 和 Overlay，position 可以是 top/middle/bottom，没有安全区域处理
- **问题**: 当 position 是 top 时，可能需要安全区域
- **优化方案**: 
  - 当 position 是 top 时，添加 `safeAreaInsetTop`
  - 当 position 是 bottom 时，添加 `safeAreaInsetBottom`

#### 8. Notify（通知）
- **现状**: 使用 Portal 和 SafeAreaView，有 `safeAreaInsetTop` 和 `safeAreaInsetBottom`，根据 position 自动设置
- **问题**: 已正确处理
- **优化方案**: 
  - **建议**: 保持现状

#### 9. DropdownMenu（下拉菜单）
- **现状**: 使用 Portal，没有安全区域处理
- **问题**: 下拉菜单通常不是全屏，可能不需要安全区域
- **优化方案**: 
  - **建议**: 保持现状（下拉菜单不是全屏组件）

## 优化优先级

### 高优先级（全屏组件）
1. ✅ **ImagePreview** - 已完成
2. **Toast** (position="top" 时) - 需要优化
3. **Cascader** - 需要检查并优化
4. **Calendar** - 需要检查并优化

### 中优先级（底部弹出组件）
5. **ActionSheet** - 需要检查关闭按钮位置
6. **ShareSheet** - 已正确（只有底部安全区域）
7. **NumberKeyboard** - 已正确（只有底部安全区域）

### 低优先级（非全屏组件）
8. **Dialog** - 居中显示，不需要全屏安全区域
9. **DropdownMenu** - 下拉菜单，不需要全屏安全区域

## 优化标准

### 全屏组件标准
1. **蒙层**: 必须撑满整个屏幕（包括顶部和底部）
2. **内容区域**: 
   - 顶部内容需要 `safeAreaInsetTop={true}`
   - 底部内容需要 `safeAreaInsetBottom={true}`
3. **关闭按钮**: 
   - 如果关闭按钮在顶部，必须考虑安全区域
   - 使用 Popup 的关闭按钮会自动考虑安全区域（已优化）

### 底部弹出组件标准
1. **蒙层**: 必须撑满整个屏幕
2. **内容区域**: 
   - 底部内容需要 `safeAreaInsetBottom={true}`
   - 顶部内容通常不需要安全区域（除非有关闭按钮）

### 顶部弹出组件标准
1. **蒙层**: 必须撑满整个屏幕
2. **内容区域**: 
   - 顶部内容需要 `safeAreaInsetTop={true}`
   - 底部内容通常不需要安全区域

## 实施步骤

1. ✅ 优化 ImagePreview（已完成）
2. 优化 Toast（position="top" 时）
3. 检查并优化 Cascader
4. 检查并优化 Calendar
5. 检查 ActionSheet 的关闭按钮位置
6. 验证所有优化
