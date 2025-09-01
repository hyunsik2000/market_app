// components/Chat/ChatEmptyState.tsx
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChatEmptyState: React.FC = () => {
  const handleGoToHome = () => {
    // 홈 화면(상품 목록)으로 이동
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="chatbubbles-outline"
        size={64}
        color={theme.colors.gray[400]}
      />
      <Text style={styles.title}>아직 채팅이 없어요</Text>
      <Text style={styles.subtitle}>관심있는 상품에 대해 문의해보세요</Text>

      {/* 보러가기 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoToHome}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>둘러보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing["6xl"],
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginTop: theme.spacing.xl,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing["sm"],
    paddingVertical: theme.spacing["sm"],
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing["sm"],
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
});

export default ChatEmptyState;
