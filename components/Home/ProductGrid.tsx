// components/Home/ProductGrid.tsx
import { theme } from "@/styles/theme";
import type { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import React, { memo, useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onToggleLike: (id: number) => void;
  onPressItem?: (id: number) => void;
  onEndReached?: () => void; // 무한스크롤
  refreshing?: boolean; // 당겨새로고침
  onRefresh?: () => void;
}

const ProductCard = memo(function ProductCard({
  item,
  onToggleLike,
  onPressItem,
}: {
  item: Product;
  onToggleLike: (id: number) => void;
  onPressItem?: (id: number) => void;
}) {
  const handlePress = useCallback(
    () => onPressItem?.(item.id),
    [item.id, onPressItem]
  );

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.imageWrap}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="image-outline"
              size={theme.layout.iconSize.xxl}
              color={theme.colors.placeholder}
            />
          </View>
        )}

        {/* 좋아요 버튼 (우상단 오버레이) */}
        <TouchableOpacity
          style={styles.likeBtn}
          onPress={() => onToggleLike(item.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={item.isLiked ? "heart" : "heart-outline"}
            size={18}
            color={item.isLiked ? theme.colors.heartRed : theme.colors.white}
          />
        </TouchableOpacity>

        {/* 채팅 수 뱃지(있을 때만, 우하단) */}
        {!!item.chatCount && item.chatCount > 0 && (
          <View style={styles.chatBadge}>
            <Ionicons
              name="chatbubble-ellipses"
              size={12}
              color={theme.colors.white}
            />
            <Text style={styles.chatBadgeText}>{item.chatCount}</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.meta}>
          <Text style={styles.location} numberOfLines={1}>
            {item.location}
          </Text>
          <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </View>
      </View>
    </Pressable>
  );
});

const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={styles.skelImage} />
    <View style={styles.skelLine} />
    <View style={[styles.skelLine, styles.skelLineShort]} />
  </View>
);

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onToggleLike,
  onPressItem,
  onEndReached,
  refreshing,
  onRefresh,
}) => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      item={item}
      onToggleLike={onToggleLike}
      onPressItem={onPressItem}
    />
  );

  // 최초 로딩 시 스켈레톤
  if (loading && products.length === 0) {
    return (
      <View style={styles.listContent}>
        <View style={styles.skeletonRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.column}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      initialNumToRender={8}
      windowSize={10}
      removeClippedSubviews
      ListFooterComponent={
        loading && products.length > 0 ? (
          <View style={styles.footerLoading}>
            <View style={[styles.skelLine, { width: "40%" }]} />
          </View>
        ) : null
      }
    />
  );
};

const CARD_GAP = theme.spacing.md;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: CARD_GAP,
    paddingTop: CARD_GAP,
    paddingBottom: 96, // FAB와 겹치지 않게 여유
  },
  column: {
    // 두 카드 사이 가로 간격
    justifyContent: "space-between",
  },
  card: {
    // 2열 균등폭
    width: "48%", // columnWrapperStyle: space-between과 조합
    marginBottom: CARD_GAP,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    backgroundColor: theme.colors.gray[100],
    position: "relative",
    marginBottom: theme.spacing.sm,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  likeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  chatBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chatBadgeText: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: "700",
  },

  info: {},
  title: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    lineHeight: theme.typography.lineHeight.normal,
  },
  price: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  timeAgo: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Skeleton
  skeletonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skelImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  skelLine: {
    height: 12,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  skelLineShort: { width: "60%" },

  footerLoading: {
    alignItems: "center",
    paddingVertical: theme.spacing.lg,
  },
});

export default ProductGrid;
