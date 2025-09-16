// app/product/[id].tsx
import { theme } from "@/styles/theme";
import { MIN_SKELETON_MS } from "@/utils/LoadingMs";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/** 하단 고정바 구성요소 치수 */
const CHAT_BUTTON_HEIGHT = 48;
const BOTTOM_PAD_TOP = 8;
const BOTTOM_PAD_BOTTOM = Platform.OS === "ios" ? 24 : 12;
/** 스크롤 패딩/고정바 높이(정확 매칭) */
const BOTTOM_BAR_HEIGHT =
  CHAT_BUTTON_HEIGHT + BOTTOM_PAD_TOP + BOTTOM_PAD_BOTTOM;

// TODO: API 연동 전 임시 더미(실제론 fetch로 교체)
const placeholder = {
  title: "피시방 PC 정리 합니다.",
  price: "12,340,000원",
  location: "구미시 옥계동",
  timeAgo: "6일전",
  image: null as string | null, // 이미지가 없으면 null
  isLiked: false,
  likeCount: 34,
  commentCount: 2,
  seller: {
    name: "이준성",
    avatar: undefined as string | undefined,
    area: "구미시 옥계동",
  },
  description:
    "구미시 옥계동 123-456 ZZ피시방 입니다.\n" +
    "XXX 본체, YYY 모니터 세트로 총 30대 있습니다.\n" +
    "낱개로 구매하시는 분들도 연락 주시면 감사하겠습니다.",
};

/** 비슷한 매물 더미 */
type MiniProduct = { id: number; title: string; price: string; image?: string };
const similarMock: MiniProduct[] = [
  { id: 101, title: "중고 모니터 27인치", price: "120,000원" },
  { id: 102, title: "게이밍 키보드 30개", price: "1,200,000원" },
  { id: 103, title: "그래픽카드 RTX 2060", price: "340,000원" },
  { id: 104, title: "중고 본체 일괄", price: "5,900,000원" },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = useMemo(() => placeholder, [id]);

  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [liked, setLiked] = useState(product.isLiked);
  const [likeCount, setLikeCount] = useState(product.likeCount);

  useEffect(() => {
    const t = setTimeout(() => setLoadingSkeleton(false), MIN_SKELETON_MS);
    return () => clearTimeout(t);
  }, []);

  const toggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
      return next;
    });
  };

  const handleOpenChat = () => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: `p-${id}`,
        productTitle: product.title,
        productPrice: product.price,
        productThumb: product.image ?? undefined,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      {/* 헤더 */}
      <View style={styles.header}>
        {/* 왼쪽: 뒤로가기 */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
        </TouchableOpacity>

        {/* 가운데: 빈 공간(스페이서) */}
        <View style={{ flex: 1 }} />

        {/* 오른쪽: 홈 → 공유 */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.push("/")} // 홈(탭 index)으로 이동
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Ionicons name="home-outline" size={26} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => {
              /* 공유 로직 */
            }}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Ionicons
              name="share-outline"
              size={26}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* 본문 스크롤 (고정바 높이만큼 패딩) */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.bodyContent,
            { paddingBottom: BOTTOM_BAR_HEIGHT },
          ]}
        >
          {/* 상단 대표 이미지 (풀블리드 + 스켈레톤) */}
          <View style={styles.imageWrap}>
            {loadingSkeleton ? (
              <View style={styles.skelImage} />
            ) : product.image ? (
              <Image source={{ uri: product.image }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons
                  name="image-outline"
                  size={48}
                  color={theme.colors.placeholder}
                />
              </View>
            )}
          </View>

          {/* 본문 패딩 영역 */}
          <View style={styles.contentPad}>
            {loadingSkeleton ? (
              <>
                {/* 판매자 블록 스켈레톤 */}
                <View style={styles.sellerRow}>
                  <View style={styles.skelCircle} />
                  <View style={{ flex: 1 }}>
                    <View style={[styles.skelLine, { width: "38%" }]} />
                    <View
                      style={[styles.skelLine, { width: "24%", marginTop: 6 }]}
                    />
                  </View>
                </View>

                {/* 타이틀/가격/설명 스켈레톤 */}
                <View
                  style={[styles.skelLine, { width: "30%", marginBottom: 8 }]}
                />
                <View
                  style={[
                    styles.skelLine,
                    { width: "80%", height: 18, marginBottom: 8 },
                  ]}
                />
                <View
                  style={[
                    styles.skelLine,
                    { width: "40%", height: 18, marginBottom: 16 },
                  ]}
                />
                <View
                  style={[styles.skelLine, { width: "100%", marginBottom: 6 }]}
                />
                <View
                  style={[styles.skelLine, { width: "92%", marginBottom: 6 }]}
                />
                <View style={[styles.skelLine, { width: "85%" }]} />
              </>
            ) : (
              <>
                {/* 판매자 정보 */}
                <View style={styles.sellerRow}>
                  <Image
                    source={{
                      uri:
                        product.seller.avatar ||
                        "https://i.pravatar.cc/100?img=12",
                    }}
                    style={styles.sellerAvatar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sellerName}>{product.seller.name}</Text>
                    <View style={styles.sellerMetaRow}>
                      <Text style={styles.sellerMetaText} numberOfLines={1}>
                        {product.seller.area}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* 타이틀/가격/지역·시간 */}
                <View style={styles.loctime}>
                  <Text style={styles.location}>{product.location}</Text>
                  <Text style={styles.sellerMetaText}>{product.timeAgo}</Text>
                </View>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{product.price}</Text>

                {/* 설명 */}
                <Text style={styles.description}>{product.description}</Text>

                {/* 반응(댓글/좋아요) */}
                <View style={styles.reactionRow}>
                  <View style={styles.reactionItem}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={18}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={styles.reactionText}>
                      {product.commentCount}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.reactionItem}
                    onPress={toggleLike}
                  >
                    <Ionicons
                      name={liked ? "heart" : "heart-outline"}
                      size={18}
                      color={
                        liked
                          ? theme.colors.heartRed
                          : theme.colors.textSecondary
                      }
                    />
                    <Text style={styles.reactionText}>{likeCount}</Text>
                  </TouchableOpacity>
                </View>

                {/* 비슷한 매물 */}
                <View style={styles.sectionBox}>
                  <Text style={styles.sectionTitle}>비슷한 매물</Text>
                  <FlatList
                    data={similarMock}
                    keyExtractor={(it) => String(it.id)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 12 }} />
                    )}
                    renderItem={({ item }) => (
                      <Pressable
                        style={styles.similarCard}
                        onPress={() =>
                          router.push({
                            pathname: "/product/[id]",
                            params: { id: String(item.id) },
                          })
                        }
                      >
                        <View style={styles.similarImage}>
                          {item.image ? (
                            <Image
                              source={{ uri: item.image }}
                              style={{ width: "100%", height: "100%" }}
                            />
                          ) : (
                            <View style={styles.similarPlaceholder}>
                              <Ionicons
                                name="image-outline"
                                size={28}
                                color={theme.colors.placeholder}
                              />
                            </View>
                          )}
                        </View>
                        <Text style={styles.similarTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.similarPrice}>{item.price}</Text>
                      </Pressable>
                    )}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>

        {/* 하단 고정: 채팅하기 버튼 */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.chatBtn} onPress={handleOpenChat}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              color="#fff"
            />
            <Text style={styles.chatBtnText}>채팅하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  /* 헤더 */
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray[200],
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: theme.typography.fontSize.lg,
    fontWeight:
      theme.typography?.fontWeight?.semiBold ??
      theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    fontWeight: theme.typography.fontWeight.black,
  },

  /* ScrollView content (배경/하단여백만) */
  bodyContent: {
    backgroundColor: theme.colors.background,
  },

  /* 상단 이미지 (풀블리드) */
  imageWrap: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[100],
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center" },

  /* 본문 패딩 */
  contentPad: {
    paddingHorizontal: theme.spacing["2xl"],
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing["2xl"],
  },

  /* 판매자 블록 */
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  sellerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.gray[200],
    marginRight: theme.spacing.md,
  },
  sellerName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight:
      theme.typography?.fontWeight?.semiBold ??
      theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
  },
  sellerMetaRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  sellerMetaText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },

  /* 텍스트들 */
  location: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  loctime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight:
      theme.typography?.fontWeight?.semiBold ??
      theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight:
      theme.typography?.fontWeight?.bold ?? theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.normal,
  },

  /* 반응 */
  reactionRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginTop: theme.spacing["2xl"],
  },
  reactionItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  reactionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  /* 섹션 공통 */
  sectionBox: { marginTop: theme.spacing["2xl"] },
  sectionTitle: {
    fontSize: theme.typography?.fontSize?.md ?? theme.typography.fontSize.md,
    fontWeight:
      theme.typography?.fontWeight?.semiBold ??
      theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },

  /* 비슷한 매물 카드 */
  similarCard: { width: 140 },
  similarImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: theme.colors.gray[100],
    marginBottom: 6,
  },
  similarPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  similarTitle: {
    fontSize: theme.typography?.fontSize?.sm ?? theme.typography.fontSize.sm,
    color: theme.colors.text,
    marginBottom: 2,
  },
  similarPrice: {
    fontSize: theme.typography?.fontSize?.md ?? theme.typography.fontSize.md,
    fontWeight:
      theme.typography?.fontWeight?.semiBold ??
      theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
  },

  /* 하단 고정 바 + 버튼 */
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_BAR_HEIGHT,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: BOTTOM_PAD_TOP,
    paddingBottom: BOTTOM_PAD_BOTTOM,
    backgroundColor: "rgba(255,255,255,0.98)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray[200],
    justifyContent: "center",
  },
  chatBtn: {
    height: CHAT_BUTTON_HEIGHT,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  chatBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  /* 스켈레톤 */
  skelImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[200],
  },
  skelCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.gray[200],
    marginRight: theme.spacing.md,
  },
  skelLine: {
    height: 12,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.sm,
  },
});
