// app/_layout.tsx
import { CustomAlertProvider } from "@/hooks/useCustomAlert";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomAlertProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="chat/[id]"
            options={{
              title: "대화",
              headerBackTitle: "뒤로",
              // iOS large title 등 원한다면 여기서 추가
              // presentation: "card",
            }}
          />
        </Stack>
      </CustomAlertProvider>
    </GestureHandlerRootView>
  );
}
