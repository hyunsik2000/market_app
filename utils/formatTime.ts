// utils/formatTime.ts

/**
 * 채팅 시간을 포맷팅하는 함수
 * @param date - 포맷팅할 날짜
 * @returns 포맷팅된 시간 문자열
 */
export const formatChatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "방금";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export function formatDayChatTime(timestamp: number): string {
  const d = new Date(timestamp);

  // 24시간제 → 2자리수 맞추기
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");

  return `${hh}:${mm}`; // 예: 09:30, 21:05
}

/**
 * 상세 시간 포맷팅 (채팅 메시지용)
 * @param date - 포맷팅할 날짜
 * @returns 포맷팅된 시간 문자열
 */
export const formatMessageTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${period} ${displayHours}:${displayMinutes}`;
};

/**
 * 날짜 구분선용 포맷팅
 * @param date - 포맷팅할 날짜
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDateDivider = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) {
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return days[date.getDay()];
  }

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
