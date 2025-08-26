// types/profile.ts

export interface UserProfile {
  id: string;
  name: string;
  nickname?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  location: {
    city: string;
    district: string;
    dong?: string;
  };
  mannerTemperature: number; // 36.5 같은 매너온도
  responseRate?: number; // 응답률 (%)
  responseTime?: string; // 평균 응답시간
  joinDate: Date;
  verified: boolean;
  badges?: Badge[];
  stats: UserStats;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedDate: Date;
}

export interface UserStats {
  totalSales: number; // 총 판매 건수
  totalPurchases: number; // 총 구매 건수
  totalReviews: number; // 받은 리뷰 수
  averageRating: number; // 평균 평점
  followerCount?: number; // 팔로워 수
  followingCount?: number; // 팔로잉 수
}

export interface Transaction {
  id: string;
  type: "selling" | "buying";
  product: {
    id: string;
    title: string;
    price: number;
    image?: string;
  };
  status: "ongoing" | "reserved" | "completed" | "cancelled";
  counterparty?: {
    id: string;
    name: string;
    profileImage?: string;
  };
  createdAt: Date;
  completedAt?: Date;
}

export interface Review {
  id: string;
  reviewer: {
    id: string;
    name: string;
    profileImage?: string;
  };
  rating: number; // 1-5
  content: string;
  transaction: {
    id: string;
    productTitle: string;
  };
  createdAt: Date;
  helpful: number; // 도움이 됐어요 수
}
