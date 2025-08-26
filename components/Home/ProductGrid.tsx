// components/Home/ProductGrid.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../styles/theme";

interface Product {
  id: number;
  title: string;
  price: string;
  location: string;
  timeAgo: string;
  image?: string;
  isLiked?: boolean;
  chatCount?: number;
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onToggleLike: (id: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onToggleLike,
}) => {
  if (loading) {
    // skeleton UI 6개 자리만 표시
    return (
      <View style={styles.productGrid}>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={styles.skeletonCard}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonLine} />
            <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.productGrid}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productImage}>
            {product.image ? (
              <Image source={{ uri: product.image }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage}>
                <Ionicons
                  name="image-outline"
                  size={theme.layout.iconSize.xxl}
                  color={theme.colors.placeholder}
                />
              </View>
            )}
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productTitle} numberOfLines={2}>
              {product.title}
            </Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <View style={styles.productMeta}>
              <Text style={styles.location}>{product.location}</Text>
              <Text style={styles.timeAgo}>{product.timeAgo}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => onToggleLike(product.id)}>
                <Ionicons
                  name={product.isLiked ? "heart" : "heart-outline"}
                  size={theme.layout.iconSize.sm}
                  color={
                    product.isLiked
                      ? theme.colors.heartRed
                      : theme.colors.textSecondary
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: theme.spacing.md,
  },
  productCard: {
    width: "50%",
    padding: theme.spacing.md,
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.gray[100],
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: theme.typography.lineHeight.normal,
  },
  productPrice: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  productMeta: {
    marginBottom: theme.spacing.md,
  },
  location: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  timeAgo: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  // skeleton styles
  skeletonCard: {
    width: "50%",
    padding: theme.spacing.md,
  },
  skeletonImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  skeletonLine: {
    height: 12,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  skeletonLineShort: {
    width: "60%",
  },
});

export default ProductGrid;
