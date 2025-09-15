// components/Chat/EmptyChatState.tsx
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string; // 예: "메시지를 시작해보세요"
  subtitle?: string; // 예: "거래 관련 문의를 남기면 상대에게 알림이 가요."
  ctaLabel?: string; // 예: "첫 메시지 보내기"
  onPress?: () => void; // CTA 클릭(입력창 포커스 등)
  productThumb?: string; // 상단 상품 카드 썸네일(옵션)
  productTitle?: string; // 상품명(옵션)
  productPrice?: string; // 가격(옵션)
};

export default function EmptyChatState({
  title = "채팅을 시작해보세요!",
  subtitle = "거래 관련 문의를 남기면 상대에게 알림이 가요.",
  onPress,
  productThumb,
  productTitle,
  productPrice,
}: Props) {
  return (
    <View style={styles.wrap}>
      {/* (옵션) 상단 상품 요약 */}
      {(productThumb || productTitle || productPrice) && (
        <View style={styles.productCard}>
          <Image
            source={{
              uri:
                productThumb ||
                "https://via.placeholder.com/56x56.png?text=%20",
            }}
            style={styles.thumb}
          />
          <View style={{ flex: 1 }}>
            {!!productTitle && (
              <Text style={styles.prodTitle} numberOfLines={1}>
                {productTitle}
              </Text>
            )}
            {!!productPrice && (
              <Text style={styles.prodPrice}>{productPrice}</Text>
            )}
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.colors.gray[400]}
          />
        </View>
      )}

      <View style={styles.iconCircle}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={28}
          color={theme.colors.primary}
        />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing["2xl"],
  },
  productCard: {
    position: "absolute",
    top: 0,
    left: theme.spacing["2xl"],
    right: theme.spacing["2xl"],
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray[200],
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[200],
  },
  prodTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  prodPrice: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.gray[100],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing["5xl"], // 상품 카드와 간격
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: theme.spacing["2xl"],
    lineHeight: theme.typography.lineHeight.relaxed,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
  },
  ctaText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
