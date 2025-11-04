# Search 搜索

> 集成搜索图标、按钮、返回箭头等能力的输入框，用于快速构建搜索头部。

## 何时使用

- 列表或首页顶部提供关键词搜索入口。
- 需要内置“取消/返回”按钮并触发搜索事件。
- 希望输入变化后自动触发搜索或自定义前后缀内容。

## 引入

```tsx
import { Search } from 'react-native-system-ui';
```

## 代码演示

### 基础搜索

```tsx
import React from 'react';
import { Search } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState('');

  return (
    <Search
      value={value}
      placeholder="搜索目的地"
      onChangeText={setValue}
      onSearch={keyword => console.log('search', keyword)}
    />
  );
}

export default Example;
```

### 自动搜索与返回按钮

```tsx
import React from 'react';
import { Search, Space } from 'react-native-system-ui';

function Example() {
  const [value, setValue] = React.useState('');

  return (
    <Space>
      <Search
        value={value}
        placeholder="输入后自动搜索"
        autoSearch
        onChangeText={setValue}
        onSearch={keyword => console.log('auto search', keyword)}
      />
      <Search
        placeholder="带返回按钮"
        showBack
        onPressBack={() => console.log('back')}
      />
    </Space>
  );
}

export default Example;
```

## API

继承 `TextInput` 的 `value`、`defaultValue`、`placeholder`、`placeholderTextColor`、`autoFocus`、`onChangeText` 等属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| iconSize | 搜索图标大小（px） | `number` | `20` |
| iconColor | 搜索图标颜色 | `ColorValue` | `text_input_placeholder_text_color` |
| onSearch | 点击搜索按钮或触发自动搜索时回调 | `(value: string) => void` | `-` |
| showBack | 是否显示返回箭头 | `boolean` | `false` |
| onPressBack | 点击返回箭头回调 | `() => void` | `-` |
| autoSearch | 文本改变时是否自动调用 `onSearch` | `boolean` | `false` |
| onSearchDebounceWait | 自动搜索节流时间（毫秒） | `number` | `300` |
| searchText | 搜索按钮文案 | `string` | `'搜索'` |
| extra | 搜索按钮右侧自定义内容 | `React.ReactNode` | `-` |
| prefix | 输入框内的自定义前缀 | `React.ReactNode` | `-` |
| suffix | 输入框内的自定义后缀 | `React.ReactNode` | `-` |
| showSearchButton | 是否显示搜索按钮 | `boolean` | `true` |
| theme | 主题变量覆盖 | `Partial<SearchTheme>` | `-` |

> 将 `Search` 放入 `ScrollView` 时，如需在键盘弹出状态下直接点击清除按钮，请为 `ScrollView` 设置 `keyboardShouldPersistTaps="handled"`。
