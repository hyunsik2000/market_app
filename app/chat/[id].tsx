// app/chat/[id].tsx
import EmptyChatState from "@/components/Chat/EmptyChatState";
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { formatDayChatTime } from "@utils/formatTime";
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 헤더를 자체 구현(스택 헤더 숨김)
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
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
          // ▶ 첫 대화가 없는 경우
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
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bubbleRow,
                  { justifyContent: item.mine ? "flex-end" : "flex-start" },
                ]}
              >
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
                  <View style={styles.metaRow}>
                    <Text style={styles.timeText}>
                      {formatDayChatTime(item.createdAt)}
                    </Text>
                    {item.mine && (
                      <Ionicons
                        name={item.read ? "checkmark-done" : "checkmark"}
                        size={14}
                        color={
                          item.read
                            ? theme.colors.primary
                            : theme.colors.gray[400]
                        }
                        style={{ marginLeft: 6 }}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={theme.colors.text}
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

          <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
            <Ionicons
              name="camera-outline"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>

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
  // Header
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: theme.spacing.sm,
    backgroundColor: theme.colors.gray[200],
  },

  // Product float
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

  // List & Bubbles
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  bubbleRow: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  bubblePeer: {
    backgroundColor: theme.colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray[200],
  },
  bubbleMine: {
    backgroundColor: "#6D7CFF1A", // 연보라 느낌(투명)
    borderWidth: 0,
  },
  bubbleText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },
  bubbleTextMine: {
    color: theme.colors.text,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  timeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
  },

  // Input
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
  iconBtn: { padding: 6 },
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
