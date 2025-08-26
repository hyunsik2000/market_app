// app/(tabs)/map.tsx
import { theme } from "@/styles/theme";
import { getInitialUserLocation, ILocation } from "@/utils/userCurrentPosition";
import { NaverMapView } from "@mj-studio/react-native-naver-map";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MapScreen() {
  const [initialLocation, setInitialLocation] = useState<ILocation>({
    latitude: 37.5665,
    longitude: 126.978,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    // 위치 서비스에서 초기 위치 가져오기
    const location = await getInitialUserLocation();

    setInitialLocation(location); //초기 사용자 위치 찾기
    setIsReady(true);
  };

  // 로딩 중
  if (!isReady || !initialLocation) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>사용자 위치 확인 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.debug}>
        <Text style={styles.debugText}>
          위도: {initialLocation.latitude.toFixed(6)}
        </Text>
        <Text style={styles.debugText}>
          경도: {initialLocation.longitude.toFixed(6)}
        </Text>
      </View>

      <NaverMapView
        style={styles.map}
        initialCamera={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          zoom: 16,
          bearing: 0,
          tilt: 0,
        }}
        isShowLocationButton={true}
        locale="ko"
        onInitialized={() => console.log("네이버 맵 초기화 완료")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  debug: {
    position: "absolute",
    top: theme.spacing["6xl"],
    left: theme.spacing["2xl"],
    right: theme.spacing["2xl"],
    backgroundColor: `${theme.colors.white}E6`, // rgba(255,255,255,0.9)
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    zIndex: 1000,
    ...theme.shadows.md,
  },
  debugText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
});
