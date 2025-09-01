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
        </Stack>
      </CustomAlertProvider>
    </GestureHandlerRootView>
  );
}
