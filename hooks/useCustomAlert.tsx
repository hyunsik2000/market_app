// hooks/useCustomAlert.tsx
import CustomAlert from "@/components/Common/CustomAlert";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive" | "primary";
}

interface AlertOptions {
  title?: string;
  message: string;
  buttons?: AlertButton[];
  closeOnBackdropPress?: boolean;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Provider 컴포넌트
export const CustomAlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    message: "",
  });

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertOptions(options);
    setAlertVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setAlertVisible(false);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <CustomAlert
        visible={alertVisible}
        title={alertOptions.title}
        message={alertOptions.message}
        buttons={alertOptions.buttons}
        onClose={hideAlert}
        closeOnBackdropPress={alertOptions.closeOnBackdropPress}
      />
    </AlertContext.Provider>
  );
};

// Hook
export const useCustomAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useCustomAlert must be used within CustomAlertProvider");
  }
  return context;
};

// 간편 사용을 위한 헬퍼 함수들
export const AlertHelper = {
  // 기본 알림
  show: (message: string, onPress?: () => void) => ({
    message,
    buttons: [{ text: "확인", onPress, style: "primary" as const }],
  }),

  // 확인/취소 알림
  confirm: (
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    title?: string
  ) => ({
    title,
    message,
    buttons: [
      { text: "아니오", onPress: onCancel, style: "cancel" as const },
      { text: "네", onPress: onConfirm, style: "primary" as const },
    ],
  }),

  // 삭제 확인 알림
  delete: (itemName: string, onDelete?: () => void, onCancel?: () => void) => ({
    title: "삭제하시겠습니까?",
    message: `${itemName}을(를) 삭제하면 복구할 수 없습니다.`,
    buttons: [
      { text: "취소", onPress: onCancel, style: "cancel" as const },
      { text: "삭제", onPress: onDelete, style: "destructive" as const },
    ],
  }),

  // 에러 알림
  error: (message: string, onPress?: () => void) => ({
    title: "오류",
    message,
    buttons: [{ text: "확인", onPress, style: "primary" as const }],
  }),

  // 성공 알림
  success: (message: string, onPress?: () => void) => ({
    title: "완료",
    message,
    buttons: [{ text: "확인", onPress, style: "primary" as const }],
  }),
};
