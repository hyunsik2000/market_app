// components/Common/Header.tsx
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  showNotification?: boolean;
  notificationCount?: number;
  showSearch?: boolean;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
  onBackPress?: () => void;
  showBackButton?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  iconColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showNotification = true,
  notificationCount = 0,
  showSearch = true,
  onNotificationPress,
  onSearchPress,
  onBackPress,
  showBackButton = false,
  backgroundColor = theme.colors.white,
  titleColor = theme.colors.text,
  iconColor = theme.colors.text,
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.headerLeft}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons
              name="arrow-back"
              size={theme.layout.iconSize.md}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
        <Text style={[styles.headerTitle, { color: titleColor }]}>{title}</Text>
      </View>

      <View style={styles.headerRight}>
        {/* 검색 버튼 */}
        {showSearch && (
          <TouchableOpacity style={styles.headerButton} onPress={onSearchPress}>
            <Ionicons
              name="search-outline"
              size={theme.layout.iconSize.xl}
              color={iconColor}
            />
          </TouchableOpacity>
        )}

        {/* 알림 버튼 */}
        {showNotification && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={onNotificationPress}
          >
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Text>
              </View>
            )}
            <Ionicons
              name="notifications-outline"
              size={theme.layout.iconSize.xl}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.layout.headerPaddingHorizontal,
    paddingVertical: theme.layout.headerPaddingVertical,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    marginLeft: theme.spacing.xl,
    position: "relative",
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
});

export default Header;
