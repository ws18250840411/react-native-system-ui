# Switch 开关

> 用于在开启与关闭两个状态之间切换，可自定义颜色、尺寸与内容。

## 何时使用

- 替代复选框表示即时生效的布尔设置，例如通知开关、隐身模式。
- 需要在切换前拦截（`beforeChange`）或展示加载状态时。
- 与 `Field.Switch` 结合，在表单中保持统一排版。

## 引入

```tsx
import { Switch } from 'react-native-system-ui';
```

## 代码演示

### 基础与受控

```tsx
import React from 'react';
import { Switch, Space } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState(true);

  return (
    <Space>
      <Switch value={value} onChange={setValue} />
      <Switch defaultValue={false} />
    </Space>
  );
}

export default Example;
```

### 加载、禁用与拦截

```tsx
import React from 'react';
import { Switch, Space } from 'react-native-system-ui';

function Example() {
  return (
    <Space>
      <Switch loading />
      <Switch disabled defaultValue={true} />
      <Switch
        defaultValue={false}
        beforeChange={next => {
          console.log('before change', next);
          return new Promise(resolve => setTimeout(() => resolve(true), 500));
        }}
      />
    </Space>
  );
}

export default Example;
```

### 自定义颜色与文案

```tsx
import React from 'react';
import { Switch } from 'react-native-system-ui';

function Example() {
  return (
    <Switch
      defaultValue
      activeColor="#10b981"
      inactiveColor="#d1d5db"
      activeChildren="ON"
      inactiveChildren="OFF"
    />
  );
}

export default Example;
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `ActiveValueT \| InactiveValueT` | `-` |
| defaultValue | 非受控初始值 | `ActiveValueT \| InactiveValueT` | `-` |
| onChange | 状态切换回调 | `(value: ActiveValueT \| InactiveValueT) => void` | `-` |
| beforeChange | 切换前拦截，返回 `false`/`Promise<false>` 阻止状态切换 | `(value: ActiveValueT \| InactiveValueT) => boolean \| Promise<boolean>` | `-` |
| loading | 加载状态，禁止再次点击 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| size | 开关尺寸（px） | `number` | `switch_size` |
| activeColor | 开启时背景色 | `ColorValue` | `switch_on_background_color` |
| inactiveColor | 关闭时背景色 | `ColorValue` | `switch_background_color` |
| activeValue / inactiveValue | 开启/关闭时输出值 | `ActiveValueT` / `InactiveValueT` | `true` / `false` |
| activeChildren / inactiveChildren | 开启/关闭时的内容（0.3.17+） | `React.ReactNode` | `-` |
| onPress | 点击时（即使未切换）触发 | `() => void` | `-` |
| theme | 主题变量 | `Partial<SwitchTheme>` | `-` |

> 主题变量见 `packages/ui/src/components/switch/index.md`。
