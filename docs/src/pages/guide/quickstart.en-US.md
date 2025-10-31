# Quick Start

Get RN System UI running in just a few minutes.

## Install

```bash
npm install react-native-system-ui
```

## Register the Provider

Wrap your root component with `Provider` and configure the theme:

```tsx
import { Provider } from 'react-native-system-ui';

export default function App() {
  return (
    <Provider>
      {/* app content */}
    </Provider>
  );
}
```

## Import Components

```tsx
import { Button } from 'react-native-system-ui';

export default function Example() {
  return <Button title="Get Started" />;
}
```
