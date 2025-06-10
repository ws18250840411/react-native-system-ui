import React from "react";
import { StyleSheet } from "react-native";

import { replace } from "@/src/utils/navigation";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export function NotFound() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText
          type="link"
          onPress={() => {
            replace("/home");
          }}
        >
          返回首页
        </ThemedText>
      </ThemedView>
    </>
  );
}
export default NotFound;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
