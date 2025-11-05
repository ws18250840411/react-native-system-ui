# Button 按钮

### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import React from 'react'
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
```
### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
```
### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
```
### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
```
### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
```
### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
```
### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
```
### 函数组件

支持函数组件写法，组件名称必须是 `Example`

```jsx
import { Button } from 'react-native-system-ui';

const Example = () => {
  const [nums, setNums] = useState(1);
  console.log(nums)
  return (
    <div className="demo-button">
      <Button text="默认按钮" onPress={() => setNums(10)} />
    </div>
  );
};
export default Example;
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

### Events

| 事件名     | 说明                                     | 回调参数            |
| ---------- | ---------------------------------------- | ------------------- |
| click      | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: Event_      |
| touchstart | 开始触摸按钮时触发                       | _event: TouchEvent_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |