# ErrorBoundary

ErrorBoundary catches rendering errors in its child subtree and renders a graceful fallback.

## When To Use

- Wrap the root of your app to prevent a blank screen when unexpected errors occur.
- Provide a retry button and custom messaging for network-heavy screens.

## Import

```tsx
import { ErrorBoundary } from 'react-native-system-ui';
```

## Example

```tsx
import React from 'react';
import { Button, ErrorBoundary } from 'react-native-system-ui';

const Broken = () => {
  throw new Error('Boom');
};

function Example() {
  return (
    <ErrorBoundary
      title="加载失败，请稍后再试~"
      reloadText="重新加载"
      onError={error => console.log(error)}
    >
      <Broken />
    </ErrorBoundary>
  );
}

export default Example;
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Message shown when an error is caught | `string` | `'加载失败，请稍后再试~'` |
| reloadText | Label for the reset button | `string` | `'重新加载'` |
| onError | Callback with the error and component stack | `(error: Error, info: ErrorInfo) => void` | `-` |
| renderError | Custom fallback renderer | `(opts: { name: string; message: string; onReset: () => void }) => React.ReactNode` | `-` |
