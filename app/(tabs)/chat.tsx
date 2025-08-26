// app/(tabs)/chat.tsx
import { theme } from "@/styles/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>채팅 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
