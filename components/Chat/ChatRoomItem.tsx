// components/Chat/ChatRoomItem.tsx
import { theme } from "@/styles/theme";
import { ChatRoom } from "@/types/chat";
import { formatChatTime } from "@utils/formatTime";
import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface ChatRoomItemProps {
  item: ChatRoom;
  onPress: (chatRoom: ChatRoom) => void;
  onDelete?: (chatRoom: ChatRoom) => void;
  onSwipeableOpen?: (ref: Swipeable) => void; // 부모에게 ref 전달
  onSwipeableClose?: (ref: Swipeable) => void; // 닫힘 알림
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({
  item,
  onPress,
  onDelete,
  onSwipeableOpen,
  onSwipeableClose,
}) => {
  const swipeableRef = useRef<Swipeable>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 오른쪽 액션 버튼 (스와이프 시 노출)
  const renderRightActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete?.(item)}
        activeOpacity={0.8}
      >
        <Text style={styles.deleteText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (isOpen) {
          swipeableRef.current?.close(); // 외부 터치 시 닫기
          setIsOpen(false);
        }
      }}
    >
      <View>
        <Swipeable
          ref={swipeableRef}
          renderRightActions={renderRightActions}
          overshootFriction={8}
          friction={2}
          rightThreshold={40}
          onSwipeableOpen={() => {
            setIsOpen(true);
            if (swipeableRef.current) onSwipeableOpen?.(swipeableRef.current);
          }}
          onSwipeableClose={() => {
            setIsOpen(false);
            if (swipeableRef.current) onSwipeableClose?.(swipeableRef.current);
          }}
        >
          <TouchableOpacity
            style={styles.chatItem}
            activeOpacity={0.7}
            onPress={() => {
              if (isOpen) {
                // 열린 상태면 닫기만
                swipeableRef.current?.close();
                setIsOpen(false);
              } else {
                // 닫혀있으면 클릭 이벤트 실행
                onPress(item);
              }
            }}
          >
            {/* 왼쪽: 프로필 + 정보 */}
            <View style={styles.chatItemLeft}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: item.participant.profileImage }}
                  style={styles.profileImage}
                />
              </View>

              <View style={styles.chatInfo}>
                <Text style={styles.participantName}>
                  {item.participant.name}
                </Text>
                <Text
                  style={[
                    styles.lastMessage,
                    !item.lastMessage.isRead && styles.unreadMessage,
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage.content}
                </Text>
              </View>
            </View>

            {/* 오른쪽: 날짜 + 뱃지 */}
            <View style={styles.chatMeta}>
              <Text style={styles.timestamp}>
                {formatChatTime(item.lastMessage.timestamp)}
              </Text>
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>
                    {item.unreadCount > 99 ? "99+" : item.unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.white,
  },
  chatItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: theme.spacing.lg,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[200],
  },
  chatInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  lastMessage: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.normal,
  },
  unreadMessage: {
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },

  /** 오른쪽 메타 영역 */
  chatMeta: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: theme.spacing.md,
  },
  timestamp: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.sm,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    minWidth: 22,
    height: 22,
    paddingHorizontal: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
  },

  /** 삭제 버튼 */
  deleteButton: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  actions: {
    width: 80,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default ChatRoomItem;
