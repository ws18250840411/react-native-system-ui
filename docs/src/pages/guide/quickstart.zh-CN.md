# 快速上手

几分钟内完成安装与配置，体验 RN System UI 的组件能力。

## 安装依赖

```bash
npm install react-native-system-ui
```

## 注册主题 Provider

在应用入口处包裹 `Provider` 并设置主题：

```tsx
import { Provider } from 'react-native-system-ui';

export default function App() {
  return (
    <Provider>
      {/* 应用内容 */}
    </Provider>
  );
}
```

## 引入组件

```tsx
import { Button } from 'react-native-system-ui';

export default function Example() {
  return <Button title="开始使用" />;
}
```
