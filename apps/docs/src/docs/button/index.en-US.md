# Button Component

### Basic Usage
Register the component globally using the method below. For more registration methods, please refer to [Component Registration].

```jsx
import { Button } from 'react-native-system-ui';

ReactDOM.render(
  <div className="demo-button">
    <Button title="Default Button" onPress={() => console.log('go to quick start')} />
  </div>,
  mountNode,
);
```

