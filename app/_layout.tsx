// app/_layout.tsx
import { CustomAlertProvider } from "@/hooks/useCustomAlert";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CustomAlertProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CustomAlertProvider>
  );
}
