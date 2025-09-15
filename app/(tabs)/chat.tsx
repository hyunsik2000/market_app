// app/(tabs)/chat.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Components
import ChatEmptyState from "@/components/Chat/ChatEmptyState";
import ChatRoomItem from "@/components/Chat/ChatRoomItem";
import Header from "@/components/Common/Header";

// Data & Types
import { mockChatRooms } from "@/mock/chatData";
import { ChatRoom } from "@/types/chat";

// Styles
import { theme } from "@/styles/theme";
import { router } from "expo-router";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function ChatScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread">("all");

  // 현재 열려 있는 Swipeable 저장
  const openedSwipeableRef = useRef<Swipeable | null>(null);

  // 외부 영역 터치 시 닫기
  const handleOutsidePress = () => {
    if (openedSwipeableRef.current) {
      openedSwipeableRef.current.close();
      openedSwipeableRef.current = null;
    }
    Keyboard.dismiss();
  };

  // 새로고침 핸들러
  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setChatRooms(mockChatRooms);
      setRefreshing(false);
    }, 1000);
  };

  // 채팅방 클릭 핸들러
  const handleChatPress = (chatRoom: ChatRoom) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chatRoom.id,
        title: chatRoom.participant.name, // 헤더 타이틀 용
      },
    });
  };
  // 필터 토글
  const toggleFilter = () => {
    setSelectedFilter((prev) => (prev === "all" ? "unread" : "all"));
  };

  // 필터링된 채팅 목록
  const filteredChatRooms =
    selectedFilter === "unread"
      ? chatRooms.filter((room) => room.unreadCount > 0)
      : chatRooms;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header title="채팅" showSearch={false} showNotification={false} />

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilter}
          activeOpacity={0.7}
        >
          <Text style={styles.filterText}>
            {selectedFilter === "all" ? "전체 대화" : "안읽은 대화"}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <TouchableWithoutFeedback
        onPress={() => {
          // 외부 클릭 시 열린 Swipeable 닫기
          if (openedSwipeableRef.current) {
            openedSwipeableRef.current.close();
            openedSwipeableRef.current = null;
          }
        }}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredChatRooms}
            renderItem={({ item }) => (
              <ChatRoomItem
                item={item}
                onPress={(chatRoom) => {
                  // 클릭 시 열린 Swipeable이 있으면 먼저 닫기
                  if (openedSwipeableRef.current) {
                    openedSwipeableRef.current.close();
                    openedSwipeableRef.current = null;
                  } else {
                    handleChatPress(chatRoom);
                  }
                }}
                onSwipeableOpen={(ref) => {
                  if (
                    openedSwipeableRef.current &&
                    openedSwipeableRef.current !== ref
                  ) {
                    openedSwipeableRef.current.close();
                  }
                  openedSwipeableRef.current = ref;
                }}
                onSwipeableClose={(ref) => {
                  if (openedSwipeableRef.current === ref) {
                    openedSwipeableRef.current = null;
                  }
                }}
                onDelete={(room) => {
                  console.log("삭제:", room.id);
                  // 삭제 로직
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={ChatEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  filterSection: {
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  filterText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.primary,
  },
  listContent: {
    flexGrow: 1,
  },
});
