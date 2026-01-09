# 组件重构与对齐标准指南

本文档详细说明了组件重构的架构设计标准。所有组件在后续优化中必须严格遵循此规范，以确保代码库的一致性、可维护性和高性能。

## 1. 核心架构原则：全 Token 驱动 (Full Tokens-Driven)

组件的**所有样式**（包括结构性布局）和**默认配置**必须统一收归至 Tokens 管理。组件源码 (`Component.tsx`) 中原则上不应包含硬编码的 `StyleSheet` 或魔法数值。

### 关键要求
*   **结构样式 Token 化**：`layout` 属性必须包含在 Tokens 中，用于定义 `container`, `wrapper`, `text` 等的静态样式（flex布局、对齐方式、overflow等）。
*   **逻辑与样式分离**：组件逻辑只处理 Props 映射和动态样式（如基于 `width/height` 的计算），静态样式直接引用 `tokens.layout`。
*   **配置集中化**：组件的默认 Props (`defaults`) 也由 Tokens 提供，而非 React 组件的 `defaultProps`。

---

## 2. Tokens 文件规范 (`tokens.ts`)

Tokens 文件必须保持高内聚，禁止为了拆分而拆分（如单独拆分 `layout.ts` 导致管理混乱）。

### 属性排序标准 (语义优先级)
必须严格按照以下顺序排列属性，以保持语义一致性：

1.  **`defaults`** (元数据): 组件默认 Props 配置。
2.  **`layout`** (结构): 静态布局样式 (`ViewStyle`, `TextStyle`, `ImageStyle`)。
3.  **`colors`** (视觉): 语义化颜色配置。
4.  **`typography`** (内容): 字体相关样式。
5.  **`sizing`** (空间): 尺寸映射表和具体数值。
6.  **`radii` / `borders` / `spacing`** (修饰): 圆角、边框、间距等原子配置。

### 代码示例 (以 Avatar 为例)

```typescript
export const createAvatarTokens = (foundations: Foundations): AvatarTokens => ({
    // 1. Defaults
    defaults: {
        size: "medium",
        shape: "circle",
    },
    // 2. Layout (结构性样式)
    layout: {
        container: {
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        text: {
            includeFontPadding: false,
            textAlignVertical: "center",
        },
    },
    // 3. Colors
    colors: {
        background: foundations.palette.default[100],
        text: foundations.palette.default[800],
    },
    // 4. Typography
    typography: {
        fontWeight: "600",
        fallbackTextScale: 0.5,
    },
    // 5. Sizing
    sizing: {
        sizes: {
            small: 24,
            medium: 32,
            large: 40,
        },
        iconMaxSize: 32,
    },
    // 6. Radii
    radii: {
        squareMin: 6,
        squareDivisor: 6,
    },
});
```

---

## 3. 类型定义规范 (`types.d.ts`)

类型定义必须与 `tokens.ts` 的结构完全对应。

### 关键要求
*   **类型定义位置**：`ComponentTokens` 接口必须定义在 `types.d.ts` 中。
*   **禁止混用**：禁止在 `tokens.ts` 中直接 `export interface`，`tokens.ts` 应从 `types.d.ts` 导入类型。

```typescript
// types.d.ts
export interface AvatarTokens {
    defaults: { ... }
    layout: {
        container: ViewStyle
        text: TextStyle
        // ...
    }
    colors: { ... }
    typography: { ... }
    sizing: { ... }
    radii: { ... }
}
```

```typescript
// tokens.ts
import type { AvatarTokens } from './types' // ✅ 正确：从 types 导入

export const createAvatarTokens = (...): AvatarTokens => ({ ... })
```

---

## 4. 主题注册规范 (Theme Registration)

禁止在每个组件目录下创建单独的 `theme.d.ts` 文件。所有组件的 Theme 类型扩展必须统一在 `src/components/theme.d.ts` 中注册。

### 注册方式
修改 `src/components/theme.d.ts`：

```typescript
import type { AvatarTokens } from './avatar/types'
// 引入其他组件...

declare module '../design-system' {
    interface ThemeComponentTokensMap {
        avatar: AvatarTokens
        // 注册其他组件...
    }
}
```

---

## 5. 组件实现规范 (`Component.tsx`)

*   **移除 StyleSheet**：删除 `StyleSheet.create`。
*   **引用 Token**：直接使用 `tokens.layout.container` 等。
*   **动态样式**：仅在行内处理必要的动态计算（如 `width`, `height`, `borderRadius`）。

```typescript
// ❌ 错误做法
const styles = StyleSheet.create({ container: { ... } })

// ✅ 正确做法
<View style={[tokens.layout.container, { width: size }, style]}>
    ...
</View>
```

---

## 6. 验收标准 checklist

- [ ] `tokens.ts` 是否包含 `layout` 字段？
- [ ] `tokens.ts` 属性顺序是否符合标准？
- [ ] Token 接口是否已抽离至 `types.d.ts`？
- [ ] 组件目录内是否已删除 `theme.d.ts`？
- [ ] `src/components/theme.d.ts` 是否已注册该组件？
- [ ] 组件源码中是否移除了 `StyleSheet.create`？
- [ ] 单元测试是否通过？
