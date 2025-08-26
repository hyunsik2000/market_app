// app/(tabs)/profile.tsx
import Header from "@/components/Common/Header";
import { theme } from "@/styles/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 메뉴 아이템 타입 정의
interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconFamily?: "ionicons" | "material-community";
  badge?: number;
  // onPress?: () => void;
}

export default function ProfileScreen() {
  // 프로필 섹션 메뉴
  const profileMenuItems: MenuItem[] = [
    {
      id: "selling",
      title: "판매내역",
      icon: "receipt-outline",
      // onPress: () => router.push("/profile/selling"),
    },
    {
      id: "buying",
      title: "구매내역",
      icon: "basket-outline",
      // onPress: () => router.push("/profile/buying"),
    },
    {
      id: "likes",
      title: "관심목록",
      icon: "heart-outline",
      badge: 3,
      // onPress: () => router.push("/profile/likes"),
    },
  ];

  // 거래 관련 메뉴
  const tradeMenuItems: MenuItem[] = [
    {
      id: "review",
      title: "받은 리뷰",
      icon: "star-outline",
      // onPress: () => router.push("/profile/reviews"),
    },
    {
      id: "manner",
      title: "매너온도",
      icon: "thermometer-outline",
      // onPress: () => router.push("/profile/manner"),
    },
    {
      id: "blocked",
      title: "차단 목록",
      icon: "ban-outline",
      // onPress: () => router.push("/profile/blocked"),
    },
  ];

  // 일반 설정 메뉴
  const settingMenuItems: MenuItem[] = [
    {
      id: "notice",
      title: "공지사항",
      icon: "megaphone-outline",
      badge: 1,
      // onPress: () => router.push("/notice"),
    },
    {
      id: "customer",
      title: "고객센터",
      icon: "chatbubbles-outline",
      // onPress: () => router.push("/customer-service"),
    },
    {
      id: "settings",
      title: "설정",
      icon: "settings-outline",
      // onPress: () => router.push("/settings"),
    },
  ];

  const handleNotificationPress = () => {
    // router.push("/notifications");
  };

  const handleEditProfile = () => {
    // router.push("/profile/edit");
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      // onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        {item.iconFamily === "material-community" ? (
          <MaterialCommunityIcons
            name={item.icon as any}
            size={24}
            color={theme.colors.text}
          />
        ) : (
          <Ionicons
            name={item.icon as any}
            size={24}
            color={theme.colors.text}
          />
        )}
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {item.badge && item.badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.gray[400]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <Header
        title="내 정보"
        showSearch={false}
        showNotification={true}
        notificationCount={0}
        backgroundColor={styles.appInfo.backgroundColor}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileCard}
            onPress={handleEditProfile}
            activeOpacity={0.9}
          >
            <View style={styles.profileInfo}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: "https://via.placeholder.com/80" }}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>반갑준성반갑다수</Text>
                <Text style={styles.profileSubtext}>경기도 화성시 분당구</Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.gray[400]}
            />
          </TouchableOpacity>
        </View>

        {/* 나의 거래 섹션 */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>나의 거래</Text>
          <View style={styles.menuContainer}>
            {profileMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* 거래 정보 섹션 */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>거래 정보</Text>
          <View style={styles.menuContainer}>
            {tradeMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* 기타 섹션 */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>기타</Text>
          <View style={styles.menuContainer}>
            {settingMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* 앱 정보 */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>앱 버전 1.0.0</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 여백 */}
        <View style={{ height: 10 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100], // 카드 대비용 배경색 (연회색)
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg, // 좌우 여백 추가
  },
  profileSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius["2xl"],
    marginBottom: theme.spacing.lg,
    padding: theme.spacing["lg"],
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    marginRight: theme.spacing.xl,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[200],
  },
  profileTextContainer: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  profileSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  menuSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  menuContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius["2xl"],
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing.xl,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.xl,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.md,
    minWidth: 20,
    alignItems: "center",
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  appInfo: {
    backgroundColor: theme.colors.gray[100],
    paddingVertical: theme.spacing["2xl"],
    marginBottom: theme.spacing.lg,
    alignItems: "center",
  },
  appInfoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.md,
  },
  logoutButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing["2xl"],
  },
  logoutText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    textDecorationLine: "underline",
  },
});
