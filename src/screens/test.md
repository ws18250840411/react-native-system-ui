# Button 按钮

### 基本用法

通过以下方式来全局注册组件，更多注册方式请参考[组件注册]

```jsx
import Button from "@/components/button";

function Example() {
  return (
    <Button title="点击我" />
  );
}
```

## API

### Props

| 参数         | 说明                                               | 类型     | 默认值    |
| ------------ | -------------------------------------------------- | -------- | --------- |
| type         | 类型，可选值为 `primary` `info` `warning` `danger` | _string_ | `default` |
| size         | 尺寸，可选值为 `large` `small` `mini`              | _string_ | `normal`  |
| color        | 按钮颜色，支持传入 `linear-gradient` 渐变色        | _string_ | -         |
| icon         | 图标名称                                           | _string_ | -         |
| iconSize     | 加载图标大小                                       | _string_ | `16px`    |
| iconPosition | 图标展示位置，可选值为 `right`                     | _string_ | `left`    |
