import * as Location from "expo-location";

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const getInitialUserLocation = async (): Promise<ILocation> => {
  const defaultLocation: ILocation = {
    latitude: 37.5665,
    longitude: 126.978,
  };

  try {
    console.log("권한 요청 시작...");

    // 권한 요청
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("권한 상태:", status);

    if (status !== "granted") {
      console.log("권한 거부됨, 기본 위치 반환");
      return defaultLocation;
    }

    console.log("사용자 위치 가져오는 중...");

    // 현재 위치 가져오기
    let userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = userLocation.coords;
    console.log("사용자 위치 확인됨:", latitude, longitude);

    return { latitude, longitude };
  } catch (error) {
    console.log("위치 가져오기 실패:", error);
    console.log("기본 위치 반환");
    return defaultLocation;
  }
};

// 더 빠른 위치 가져오기 (낮은 정확도)
export const getQuickUserLocation = async (): Promise<ILocation> => {
  const defaultLocation: ILocation = {
    latitude: 37.5665,
    longitude: 126.978,
  };

  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return defaultLocation;
    }

    let userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low, // 빠른 위치
    });

    const { latitude, longitude } = userLocation.coords;
    console.log("빠른 사용자 위치:", latitude, longitude);

    return { latitude, longitude };
  } catch (error) {
    console.log("빠른 위치 가져오기 실패:", error);
    return defaultLocation;
  }
};
