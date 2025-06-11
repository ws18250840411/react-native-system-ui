declare module "*.md" {
  import React from "react";
  import { CustomComponentsProp } from "react-native";
  const Component: React.FC<{
    components?: CustomComponentsProp;
  }>;
  export default Component;
}
