// mocks/chatData.ts
import { ChatRoom } from "@/types/chat";

export const mockChatRooms: ChatRoom[] = [
  {
    id: "1",
    participant: {
      id: "user1",
      name: "이준성",
      profileImage: "https://via.placeholder.com/50",
    },
    lastMessage: {
      content: "안녕하세요",
      timestamp: new Date("2024-01-15T21:28:00"),
      isRead: false,
      senderId: "user1",
    },
    unreadCount: 3,
  },
  {
    id: "2",
    participant: {
      id: "user2",
      name: "반갑준성",
      profileImage: "https://via.placeholder.com/50",
    },
    lastMessage: {
      content: "미안했다 애들아..",
      timestamp: new Date("2024-01-15T21:28:00"),
      isRead: false,
      senderId: "user2",
    },
    unreadCount: 1,
  },
  {
    id: "3",
    participant: {
      id: "user3",
      name: "김준성",
      profileImage: "https://via.placeholder.com/50",
    },
    lastMessage: {
      content: "그거 내 돈생이 하고 있었음",
      timestamp: new Date("2024-01-15T21:28:00"),
      isRead: true,
      senderId: "user3",
    },
    unreadCount: 0,
  },
  {
    id: "4",
    participant: {
      id: "user4",
      name: "송재용",
      profileImage: "https://via.placeholder.com/50",
    },
    lastMessage: {
      content: "많이 무레이..",
      timestamp: new Date("2024-01-15T21:28:00"),
      isRead: true,
      senderId: "user4",
    },
    unreadCount: 0,
  },
  {
    id: "5",
    participant: {
      id: "user5",
      name: "이재명",
      profileImage: "https://via.placeholder.com/50",
    },
    lastMessage: {
      content: "드럼통 20개 구매 가능합까요",
      timestamp: new Date("2024-01-15T21:28:00"),
      isRead: true,
      senderId: "user5",
    },
    unreadCount: 0,
  },
  {
    id: "6",
    participant: {
      id: "user6",
      name: "김민수",
      profileImage: "https://via.placeholder.com/50",
    },
    lastMessage: {
      content: "네고 가능한가요?",
      timestamp: new Date("2024-01-14T15:30:00"),
      isRead: true,
      senderId: "user6",
    },
    unreadCount: 0,
  },
  {
    id: "7",
    participant: {
      id: "user7",
      name: "박지훈",
      profileImage: "https://via.placeholder.com/50",
    },
    lastMessage: {
      content: "직거래 가능하신가요?",
      timestamp: new Date("2024-01-13T09:15:00"),
      isRead: true,
      senderId: "user7",
    },
    unreadCount: 0,
  },
];
