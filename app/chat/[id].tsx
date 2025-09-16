// app/chat/[id].tsx
import EmptyChatState from "@/components/Chat/EmptyChatState";
import { theme } from "@/styles/theme";
import {
  formatChatDate,
  formatDayChatTime,
  isSameDay,
} from "@/utils/formatTime";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/** ===== 팔레트(밝은 톤 + 가독성) ===== */
const CHAT_PALETTE = {
  bg: "#F7F8FA", // 화면 배경
  peerBg: "#FFFFFF", // 상대 버블
  peerBorder: "#E5E7EB",
  mineBg: "#EAF2FF", // 내 버블(연한 블루 틴트)
  text: "#111827", // 본문 텍스트
  time: "#9AA2B2", // 시간
};

/** ===== 타입 ===== */
type ChatMessage = {
  id: string;
  text: string;
  mine: boolean;
  createdAt: number;
  read?: boolean;
};

export default function ChatRoomScreen() {
  const { id, title, avatar, productTitle, productPrice, productThumb } =
    useLocalSearchParams<{
      id: string;
      title?: string;
      avatar?: string;
      productTitle?: string;
      productPrice?: string;
      productThumb?: string;
    }>();

  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);

  // 더미 메시지(연동 전)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      text: "안녕하세요",
      mine: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 10, // 어제
    },
    {
      id: "m2",
      text: "네 안녕하세요",
      mine: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 11,
    },
    {
      id: "m3",
      text: "현재 정리 중이신거 구매 가능할까요?",
      mine: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 2, // 오늘
    },
    {
      id: "m4",
      text: "네 가능합니다. 시간 되실 때 연락 주세요\n010 - xxxx - xxxx",
      mine: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 2 + 90 * 1000,
    },
  ]);

  // 스택 헤더 숨기고 커스텀 헤더 사용
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // 최신→과거 정렬 + inverted
  const data = useMemo(
    () => [...messages].sort((a, b) => b.createdAt - a.createdAt),
    [messages]
  );

  const handleSend = useCallback(() => {
    const v = input.trim();
    if (!v) return;
    setMessages((prev) => [
      { id: String(Date.now()), text: v, mine: true, createdAt: Date.now() },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  }, [input]);

  const handleFocusInput = () => inputRef.current?.focus();

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar(안드로이드 상단 겹침 방지 세팅과 함께 사용) */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={24} color={CHAT_PALETTE.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {title ?? "상대방"}
        </Text>

        <Image
          source={{
            uri: (avatar as string) || "https://i.pravatar.cc/100?img=12",
          }}
          style={styles.headerAvatar}
        />
      </View>

      {/* Product Float Card */}
      <View style={styles.productCardWrap}>
        <View style={styles.productCard}>
          <Image
            source={{
              uri:
                (productThumb as string) ||
                "https://via.placeholder.com/56x56.png?text=%20",
            }}
            style={styles.productThumb}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.productTitle} numberOfLines={1}>
              {productTitle ?? "게시판 PC 정리 합니다."}
            </Text>
            <Text style={styles.productPrice}>
              {productPrice ?? "12,340,000원"}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.colors.gray[400]}
          />
        </View>
      </View>

      {/* Chat List + Input */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {messages.length === 0 ? (
          <EmptyChatState
            onPress={handleFocusInput}
            productThumb={productThumb as string}
            productTitle={productTitle as string}
            productPrice={productPrice as string}
          />
        ) : (
          <FlatList
            data={data}
            inverted
            keyExtractor={(m) => m.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
              // inverted + 최신→과거 정렬이므로, index+1 = 더 오래된 메시지
              const prev = data[index + 1];
              const showDayChip =
                !prev || !isSameDay(item.createdAt, prev.createdAt);

              return (
                <View>
                  {/* 날짜 칩 (해당 날짜의 첫 메시지 위) */}
                  {showDayChip && (
                    <View style={styles.dayChipWrap}>
                      <View style={styles.dayChip}>
                        <Text style={styles.dayChipText}>
                          {formatChatDate(item.createdAt)}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* 버블 + 시간 (내: 시간 ← 버블 / 상대: 버블 → 시간) */}
                  <View
                    style={[
                      styles.bubbleRow,
                      item.mine ? styles.rowEnd : styles.rowStart,
                    ]}
                  >
                    {item.mine && (
                      <Text
                        numberOfLines={1}
                        style={[styles.timeText, styles.timeLeft]}
                      >
                        {formatDayChatTime(item.createdAt)}
                      </Text>
                    )}

                    <View
                      style={[
                        styles.bubble,
                        item.mine ? styles.bubbleMine : styles.bubblePeer,
                      ]}
                    >
                      <Text
                        style={[
                          styles.bubbleText,
                          item.mine && styles.bubbleTextMine,
                        ]}
                      >
                        {item.text}
                      </Text>
                    </View>

                    {!item.mine && (
                      <Text
                        numberOfLines={1}
                        style={[styles.timeText, styles.timeRight]}
                      >
                        {formatDayChatTime(item.createdAt)}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={CHAT_PALETTE.text}
            />
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            value={input}
            onChangeText={setInput}
            placeholder="메시지를 입력하세요"
            style={styles.input}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, { opacity: input.trim() ? 1 : 0.4 }]}
            onPress={handleSend}
            disabled={!input.trim()}
          >
            <Ionicons name="arrow-up" size={18} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** 컨테이너/헤더 */
  container: {
    flex: 1,
    backgroundColor: CHAT_PALETTE.bg,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray[200],
  },
  headerBack: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: theme.typography.fontSize.lg,
    color: CHAT_PALETTE.text,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: theme.spacing.sm,
    backgroundColor: theme.colors.gray[200],
  },

  /** 상품 카드 */
  productCardWrap: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray[200],
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
  },
  productThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[200],
  },
  productTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },

  /** 리스트/버블 */
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    backgroundColor: CHAT_PALETTE.bg,
  },
  dayChipWrap: {
    alignItems: "center",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  dayChip: {
    backgroundColor: "#EDEFF3",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dayChipText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "flex-end", // 하단 기준선 맞춤
    marginBottom: theme.spacing.lg,
  },
  rowStart: { justifyContent: "flex-start" }, // 상대
  rowEnd: { justifyContent: "flex-end" }, // 나

  timeText: {
    fontSize: theme.typography.fontSize.xs,
    color: CHAT_PALETTE.time,
    includeFontPadding: false,
    flexShrink: 0,
  },
  timeLeft: { marginRight: 6 }, // 내 메시지: 시간 ← 버블
  timeRight: { marginLeft: 6 }, // 상대 메시지: 버블 → 시간

  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  bubblePeer: {
    backgroundColor: CHAT_PALETTE.peerBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: CHAT_PALETTE.peerBorder,
    borderTopLeftRadius: 4,
  },
  bubbleMine: {
    backgroundColor: CHAT_PALETTE.mineBg,
    borderTopRightRadius: 4,
  },
  bubbleText: {
    fontSize: theme.typography.fontSize.md,
    color: CHAT_PALETTE.text,
  },
  bubbleTextMine: { color: CHAT_PALETTE.text },

  /** 입력바 */
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray[200],
  },
  iconBtn: { padding: 10 },
  input: {
    flex: 1,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: theme.colors.gray[50],
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 14,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
