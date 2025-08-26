import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserProfile() {
  return (
    <View style={styles.profileSection}>
      <TouchableOpacity style={styles.profileCard} activeOpacity={0.9}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/80" }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>반갑준반갑다수</Text>
            <Text style={styles.profileSubtext}>경기도 화성시 분당구</Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={28}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius["2xl"],
    marginBottom: theme.spacing.lg,
    padding: theme.spacing["md"],
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
});
