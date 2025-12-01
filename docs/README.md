# React Native System UI

> 让 react-vant 的体验以 React Native 方式重生。

```tsx | pure
import React from 'react'
import { ThemeProvider, Button } from 'react-native-system-ui'

export default () => (
  <ThemeProvider>
    <Button text="立即体验" type="primary" shadow />
  </ThemeProvider>
)
```

- 🌈 **一致语义**：API 尽量沿用 react-vant，减少学习负担。
- 🧱 **可组合设计系统**：tokens + hooks + 工具组成骨架，可被业务复用或扩展。
- ⚡️ **原生性能**：无多余 DOM、直连 React Native StyleSheet。

更多指南：参见 `Guide / 架构` 与 `Components / Button`。
