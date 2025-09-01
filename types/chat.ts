// types/chat.ts

export interface ChatRoom {
  id: string;
  participant: {
    id: string;
    name: string;
    profileImage?: string;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  product?: {
    id: string;
    title: string;
    price: string;
    image?: string;
    status?: "available" | "reserved" | "sold";
  };
  unreadCount: number;
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "product" | "location" | "system";
  timestamp: Date;
  isRead: boolean;
  image?: string;
}
