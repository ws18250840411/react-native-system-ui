# Button 按钮

### 基本用法

通过以下方式来全局注册组件，更多注册方式请参考[组件注册]

```jsx
import { Button } from "mooli-mobile";

ReactDOM.render(
  <div className="demo-button">
    <Button type="primary">主要按钮</Button>
    <Button type="info">信息按钮</Button>
    <Button type="default">默认按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
  </div>,
  mountNode
);
```
