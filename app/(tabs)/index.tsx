// app/(tabs)/index.tsx
import Header from "@/components/Common/Header";
import Category from "@/components/Home/Category";
import ProductGrid from "@/components/Home/ProductGrid";
import { theme } from "@/styles/theme";
import type { Product } from "@/types/product";
import {
  handleNotificationPress,
  handleSearchPress,
} from "@/utils/Header/handleNotification";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "피치패드 PC 정리 합니다.",
    price: "12,340,000원",
    location: "서울시 육계동",
    timeAgo: "6분전",
    isLiked: false,
    chatCount: 0,
  },
  {
    id: 2,
    title: "피치패드 PC 정리 합니다.",
    price: "12,340,000원",
    location: "서울시 육계동",
    timeAgo: "6분전",
    isLiked: false,
    chatCount: 0,
  },
  {
    id: 3,
    title: "피치패드 PC 정리 합니다.",
    price: "12,340,000원",
    location: "서울시 육계동",
    timeAgo: "6분전",
    isLiked: false,
    chatCount: 0,
  },
  {
    id: 4,
    title: "피치패드 PC 정리 합니다.",
    price: "12,340,000원",
    location: "서울시 육계동",
    timeAgo: "6분전",
    isLiked: false,
    chatCount: 0,
  },
  {
    id: 5,
    title: "피치패드 PC 정리 합니다.",
    price: "12,340,000원",
    location: "서울시 육계동",
    timeAgo: "6분전",
    isLiked: false,
    chatCount: 0,
  },
  {
    id: 6,
    title: "피치패드 PC 정리 합니다.",
    price: "12,340,000원",
    location: "서울시 육계동",
    timeAgo: "6분전",
    isLiked: false,
    chatCount: 0,
  },
];

const categories = ["인기", "대량판매", "특별찬스", "운송", "인테리어", ""];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // 실제로는 fetch API 같은 비동기 호출
    setTimeout(() => {
      // 카테고리별로 데이터 필터링 가능
      const filtered = mockProducts.filter((p) =>
        selectedCategory === "인기" ? true : p.title.includes(selectedCategory)
      );
      setProducts(filtered);
      setLoading(false);
    }, 1000); // 1초 로딩 시뮬레이션
  }, [selectedCategory]);

  const toggleLike = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked } : p))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="옥계동"
        notificationCount={100}
        onNotificationPress={handleNotificationPress}
        onSearchPress={handleSearchPress}
      />

      {/* Category Navigation */}
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        loading={loading}
        onToggleLike={toggleLike}
        onPressItem={(id) =>
          router.push({ pathname: "/product/[id]", params: { id: String(id) } })
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons
          name="add"
          size={theme.layout.iconSize.md}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing["2xl"],
    right: theme.spacing["2xl"],
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.xl,
  },
});
