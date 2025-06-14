import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { replace } from "@/utils/navigation";

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
