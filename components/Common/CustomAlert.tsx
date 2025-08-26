// components/common/CustomAlert.tsx
import { theme } from "@/styles/theme";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CustomAlertProps {
  visible: boolean;
  title?: string;
  message: string;
  buttons?: AlertButton[];
  onClose?: () => void;
  closeOnBackdropPress?: boolean;
}

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive" | "primary";
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons = [{ text: "확인", style: "primary" }],
  onClose,
  closeOnBackdropPress = false,
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // 애니메이션으로 나타나기
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // 애니메이션으로 사라지기
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleButtonPress = (button: AlertButton) => {
    if (button.onPress) {
      button.onPress();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleBackdropPress = () => {
    if (closeOnBackdropPress && onClose) {
      onClose();
    }
  };

  const getButtonStyle = (style?: string) => {
    switch (style) {
      case "primary":
        return styles.primaryButton;
      case "cancel":
        return styles.cancelButton;
      case "destructive":
        return styles.destructiveButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = (style?: string) => {
    switch (style) {
      case "primary":
        return styles.primaryButtonText;
      case "cancel":
        return styles.cancelButtonText;
      case "destructive":
        return styles.destructiveButtonText;
      default:
        return styles.defaultButtonText;
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.alertContainer,
                  {
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                  },
                ]}
              >
                {/* 타이틀 */}
                {title && <Text style={styles.title}>{title}</Text>}

                {/* 메시지 */}
                <Text style={[styles.message, !title && styles.messageOnly]}>
                  {message}
                </Text>

                {/* 버튼들 */}
                <View
                  style={[
                    styles.buttonContainer,
                    buttons.length === 2 && styles.buttonContainerRow,
                  ]}
                >
                  {buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        getButtonStyle(button.style),
                        buttons.length === 2 && styles.buttonHalf,
                        buttons.length === 2 &&
                          index === 0 &&
                          styles.buttonFirst,
                      ]}
                      onPress={() => handleButtonPress(button)}
                      activeOpacity={0.8}
                    >
                      <Text style={getButtonTextStyle(button.style)}>
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing["2xl"],
  },
  alertContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing["2xl"],
    width: SCREEN_WIDTH - theme.spacing["4xl"],
    maxWidth: 340,
    ...theme.shadows.xl,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  message: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing["2xl"],
  },
  messageOnly: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  buttonContainerRow: {
    flexDirection: "row",
    gap: 0,
  },
  button: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing["2xl"],
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHalf: {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
  },
  buttonFirst: {
    marginRight: theme.spacing.md,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  cancelButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  destructiveButton: {
    backgroundColor: theme.colors.danger,
  },
  defaultButton: {
    backgroundColor: theme.colors.gray[100],
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
  destructiveButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  defaultButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

export default CustomAlert;
