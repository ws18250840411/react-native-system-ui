# vite-plugin-react-native-web

一个生产级的 Vite 插件，用于在 Web 项目中使用 React Native 组件。

## 设计对比

### vs babel-plugin-react-native-web

| 特性 | babel-plugin-react-native-web | vite-plugin-react-native-web |
|------|------------------------------|------------------------------|
| **工作原理** | 编译时重写 import 语句 | Vite alias + wrapper 文件 |
| **实现方式** | 将每个 import 改为从 `react-native-web/dist/exports/{module}` 导入 | 通过 wrapper 文件统一处理 |
| **配置复杂度** | 需要 Babel 配置 | 零配置，开箱即用 |
| **Tree-shaking** | 依赖 Babel | 依赖 Vite（效果相同） |
| **开发体验** | 标准 Babel 插件 | 原生 Vite 插件，HMR 更快 |
| **维护成本** | 需要维护 AST 转换逻辑 | 简单的 alias 配置 |
| **扩展性** | 通过 Babel 生态 | 通过 Vite 生态 |

**结论：** 两种方法能力等价，但我们的方法更适合 Vite 生态，更简洁高效。

## 核心功能

### 1. 模块映射

```typescript
// import { View, Text } from 'react-native'
// ↓ 转换为 ↓
// import { View, Text } from '.vite-plugin-rn-web/react-native-web-wrapper.js'
```

### 2. 子路径透传

```typescript
// import { Platform } from 'react-native/Libraries/Utilities/Platform'
// ↓ 转换为 ↓
// import { Platform } from 'react-native-web/Libraries/Utilities/Platform'
```

### 3. Polyfills

自动提供缺失的组件和 API：
- `InputAccessoryView` - iOS 特定组件
- `TurboModuleRegistry` - React Native 新架构 API
- `codegenNativeComponent` - 原生组件代码生成工具

### 4. 平台特定文件

自动识别 `.web.*` 扩展名：
```
Button.tsx          # 通用实现
Button.web.tsx      # Web 特定实现（优先使用）
```

### 5. 全局变量

自动注入：
- `global` → `globalThis`
- `__DEV__` → `process.env.NODE_ENV === 'development'`
- `process.env.NODE_ENV`

## 使用方法

### 基础使用

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { reactNativeWeb } from './vite-plugin-react-native-web'

export default defineConfig({
  plugins: [
    reactNativeWeb(), // 零配置
  ],
})
```

### 高级配置

```typescript
export default defineConfig({
  plugins: [
    reactNativeWeb({
      // 自定义 alias（映射本地开发的组件库）
      alias: {
        'my-ui-lib': path.resolve(__dirname, '../packages/ui/src'),
        'my-utils': path.resolve(__dirname, '../packages/utils/src'),
      },
      // 排除依赖优化（本地开发的包）
      exclude: ['my-ui-lib', 'my-utils'],
    }),
  ],
  server: {
    fs: {
      // 如果访问项目外的文件，需要配置
      allow: ['..'],
    },
  },
})
```

## 技术实现

### 内置 Polyfills

插件自动创建并管理 `.vite-plugin-rn-web/` 目录：

```
.vite-plugin-rn-web/
├── react-native-web-wrapper.js    # 主 wrapper
└── react-native-libraries.js      # Libraries polyfill
```

这些文件由插件自动生成和维护，用户无需关心。

### Alias 配置

```typescript
alias: [
  // 精确匹配：react-native
  { find: /^react-native$/, replacement: 'wrapper.js' },
  
  // 特殊路径：react-native/Libraries/*
  { find: /^react-native\/Libraries\/(.+)$/, replacement: 'libraries.js' },
  
  // 通用路径：react-native/*
  { find: /^react-native\/(.+)$/, replacement: 'react-native-web/$1' },
]
```

**顺序很重要！** 从具体到通用，避免误匹配。

## 依赖要求

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "react-native-web": "^0.19.0 || ^0.20.0 || ^0.21.0"
}
```

## 兼容性

- ✅ Vite 5.x / Vite 6.x
- ✅ Rolldown Vite (rolldown-vite)
- ✅ React 18 / React 19
- ✅ TypeScript
- ✅ HMR
- ✅ SSR (理论上支持，未测试)

## 已知限制

1. **不支持的 API**
   - 平台特定原生模块（通过 polyfill 提供空实现）
   - 部分 iOS/Android 特定组件

2. **第三方库兼容性**
   - 部分 React Native 库可能依赖原生代码，需要寻找 web 替代方案
   - 推荐使用明确支持 web 的库（如 `react-native-svg`）

## 最佳实践

### 1. 条件渲染

```typescript
import { Platform } from 'react-native'

if (Platform.OS === 'web') {
  // Web 特定逻辑
}
```

### 2. 平台特定文件

优先使用平台特定文件而不是条件判断：
```
✅ Button.web.tsx      # 推荐
❌ Button.tsx + Platform.OS 判断
```

### 3. 样式适配

```typescript
const styles = StyleSheet.create({
  container: {
    // Web 自动支持 flexbox
    display: 'flex',
  }
})
```

## 故障排查

### 模块找不到

确保 `react-native-web` 已安装：
```bash
npm install react-native-web
```

### HMR 不工作

检查是否配置了 `server.fs.allow`（如果访问项目外文件）。

### 类型错误

安装类型定义：
```bash
npm install -D @types/react-native
```

## License

MIT

