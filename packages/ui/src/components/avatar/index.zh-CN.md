# Avatar 头像

### 基本用法

通过以下方式来全局注册组件，更多注册方式请参考[组件注册]

```jsx
import { Avatar } from 'react-native-system-ui';

ReactDOM.render(
  <div className="demo-button">
    <Avatar uri="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"  />
  </div>,
  mountNode,
);
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `info` `warning` `danger` | _string_ | `default` |
| size | 尺寸，可选值为 `large` `small` `mini` | _string_ | `normal` |
| color | 按钮颜色，支持传入 `linear-gradient` 渐变色 | _string_ | - |
| icon | 图标名称 | _string_ | - |
| iconSize | 加载图标大小 | _string_ | `16px` |
| iconPosition | 图标展示位置，可选值为 `right` | _string_ | `left` |
| block | 是否为块级元素 | _boolean_ | `false` |
| plain | 是否为朴素按钮 | _boolean_ | `false` |
| square | 是否为方形按钮 | _boolean_ | `false` |
| round | 是否为圆形按钮 | _boolean_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| hairline | 是否使用 0.5px 边框 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean_ | `false` |
| loadingText | 加载状态提示文字 | _string_ | - |
| loadingIndicator | 自定加载指示符 | _string_ | - |
| loadingType | 加载图标类型 | _string_ | `circular` |
| loadingSize | 加载图标大小 | _string_ | `20px` |
| className | 附加类名 | _string_ | `--` |
| style | 附加样式 | _objcet_ | `--` |

### Events

| 事件名     | 说明                                     | 回调参数            |
| ---------- | ---------------------------------------- | ------------------- |
| click      | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: Event_      |
| touchstart | 开始触摸按钮时触发                       | _event: TouchEvent_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |
