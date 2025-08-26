// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import TabChatIcon from "../../public/assets/icons/TabChatIcon";
import TabHomeIcon from "../../public/assets/icons/TabHomeIcon";
import TabMapIcon from "../../public/assets/icons/TabMapIcon";
import TabProfileIcon from "../../public/assets/icons/TabProfileIcon";
import { theme } from "../../styles/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabBar.active,
        tabBarInactiveTintColor: theme.colors.tabBar.inactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <TabHomeIcon size={theme.layout.iconSize.lg} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "지도",
          tabBarIcon: ({ color }) => (
            <TabMapIcon size={theme.layout.iconSize.lg} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: ({ color }) => (
            <TabChatIcon size={theme.layout.iconSize.lg} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "내정보",
          tabBarIcon: ({ color }) => (
            <TabProfileIcon size={theme.layout.iconSize.lg} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.tabBar.background,
    borderTopColor: theme.colors.tabBar.border,
    height: theme.layout.tabBarHeight,
    paddingTop: theme.layout.tabBarPaddingTop,
  },
  tabBarLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    paddingTop: theme.spacing.sm,
  },
});
