# Avatar

Avatars display a user profile photo or initials to help people recognize an identity.

## Import

```tsx
import { Avatar } from 'react-native-system-ui';
```

### With Image

Provide a remote `uri` to render a circular profile image.

```tsx
import React from 'react';
import { Avatar } from 'react-native-system-ui';

export default Example = () => (
  <Avatar uri="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
);
```

### With Initials

When no `uri` is supplied the component builds an initials placeholder from `name`.

```tsx
import React from 'react';
import { Avatar, Space } from 'react-native-system-ui';

export default Example = () => (
  <Space direction="horizontal">
    <Avatar name="React Native" />
    <Avatar name="System UI" size={64} />
    <Avatar name="Design" size={40} />
  </Space>
);
```

## API

### Avatar Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| uri | Image source url | `string` | `-` |
| size | Diameter of the avatar | `number` | `48` |
| name | Name used for initials and accessibility label | `string` | `-` |
| style | Container style | `StyleProp<ViewStyle>` | `-` |
| imageStyle | Image style override | `StyleProp<ImageStyle>` | `-` |
| textStyle | Placeholder text style | `StyleProp<TextStyle>` | `-` |
| accessibilityLabel | Custom accessibility label | `string` | `name` |

