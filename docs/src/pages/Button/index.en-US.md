# Button

### Overview

Buttons represent actions users can take in forms, dialogs, or standalone UI blocks.

### Import

```jsx
import React from 'react'
import { Button } from 'react-native-system-ui'
```

### Basic Usage

```jsx
import React from 'react'
import { Button } from 'react-native-system-ui'

const Example = () => {
  const handlePress = () => {
    console.log('confirm click')
  }

  return (
    <Button text="Confirm" type="primary" onPress={handlePress} />
  )
}

export default Example
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Visual style | `'default' \| 'primary' \| 'danger'` | `'default'` |
| `disabled` | Disable interaction | `boolean` | `false` |
| `loading` | Display loading state | `boolean` | `false` |
| `onPress` | Fired when the button is pressed | `(event: GestureResponderEvent) => void` | `-` |

### Events

| Event | Description | Payload |
| --- | --- | --- |
| `onPress` | Triggered on tap/click | `event: GestureResponderEvent` |
