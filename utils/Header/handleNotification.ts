import { Alert } from "react-native";

// 알림 관련 유틸리티
export const handleNotificationPress = () => {
  console.log("알림 버튼 클릭됨");

  // TODO: 실제로는 다음과 같은 로직들이 들어갈 수 있습니다:
  // - 알림 페이지로 네비게이션
  // - 알림 목록 모달 표시
  // - 알림 상태 업데이트

  // 임시로 Alert 표시 (실제 구현 시 제거)
  Alert.alert("알림", "알림 목록을 확인하시겠습니까?", [
    { text: "취소", style: "cancel" },
    { text: "확인", onPress: () => navigateToNotifications() },
  ]);
};

// 검색 관련 유틸리티
export const handleSearchPress = () => {
  console.log("검색 버튼 클릭됨");

  // TODO: 실제로는 다음과 같은 로직들이 들어갈 수 있습니다:
  // - 검색 페이지로 네비게이션
  // - 검색 모달 표시
  // - 검색 히스토리 로드

  // 임시로 Alert 표시 (실제 구현 시 제거)
  Alert.alert("검색", "검색 페이지로 이동하시겠습니까?", [
    { text: "취소", style: "cancel" },
    { text: "확인", onPress: () => navigateToSearch() },
  ]);
};

// 알림 페이지로 네비게이션 (구현 예정)
const navigateToNotifications = () => {
  console.log("알림 페이지로 이동");
  // TODO: React Navigation 사용
  // navigation.navigate('Notifications');
};

// 검색 페이지로 네비게이션 (구현 예정)
const navigateToSearch = () => {
  console.log("검색 페이지로 이동");
  // TODO: React Navigation 사용
  // navigation.navigate('Search');
};

// 알림 개수 포맷팅
export const formatNotificationCount = (count: number): string => {
  if (count <= 0) return "0";
  if (count > 99) return "99+";
  return count.toString();
};

// 알림 배지 표시 여부 결정
export const shouldShowNotificationBadge = (count: number): boolean => {
  return count > 0;
};
