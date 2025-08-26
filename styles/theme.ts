// src/constants/theme.ts
import { Platform } from "react-native";

export const theme = {
  // 색상 팔레트
  colors: {
    primary: "#6366F1",
    primaryDark: "#4F46E5",
    primaryLight: "#818CF8",

    secondary: "#F59E0B",
    success: "#10B981",
    danger: "#EF4444",
    warning: "#F59E0B",
    heartRed: "#FF4757",

    // 그레이스케일
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },

    // 기본 색상
    white: "#FFFFFF",
    black: "#000000",
    background: "#FFFFFF",
    backgroundSecondary: "#F9FAFB",
    text: "#333333",
    textSecondary: "#666666",
    textTertiary: "#999999",
    border: "#E5E5EA",
    borderLight: "#F0F0F0",
    placeholder: "#DDDDDD",

    // 탭바 색상
    tabBar: {
      active: "#6366F1",
      inactive: "#484C52",
      background: "#FFFFFF",
      border: "#E5E5EA",
    },
  },

  // 타이포그래피
  typography: {
    // 폰트 사이즈
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 20,
      "2xl": 24,
      "3xl": 30,
      "4xl": 36,
    },

    // 폰트 웨이트
    fontWeight: {
      thin: "100" as "100",
      light: "300" as "300",
      regular: "400" as "400",
      medium: "500" as "500",
      semiBold: "600" as "600",
      bold: "700" as "700",
      extraBold: "800" as "800",
      black: "900" as "900",
    },

    // 라인 높이
    lineHeight: {
      tight: 16,
      normal: 20,
      relaxed: 24,
      loose: 28,
    },
  },

  // 간격
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    "3xl": 24,
    "4xl": 32,
    "5xl": 40,
    "6xl": 48,
  },

  // 테두리 반경
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    "3xl": 24,
    full: 9999,
  },

  // 그림자 (iOS/Android 모두 대응)
  shadows: {
    sm: Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    lg: Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
    xl: Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  // 레이아웃
  layout: {
    tabBarHeight: 90,
    tabBarPaddingTop: 2,
    headerHeight: 56,
    headerPaddingHorizontal: 20,
    headerPaddingVertical: 12,
    screenPadding: 16,
    contentPadding: 8,
    iconSize: {
      sm: 16,
      md: 24,
      lg: 30,
      xl: 32,
      xxl: 40,
    },
  },

  // 애니메이션
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
};

export type Theme = typeof theme;
