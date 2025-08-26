// components/icons/TabChatIcon.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";

interface TabChatIconProps {
  size?: number;
  color?: string;
}

const TabChatIcon: React.FC<TabChatIconProps> = ({
  size = 24,
  color = "#484C52",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C10.22 23 8.467 22.569 6.892 21.741L2.174 22.97C1.85 23.05 1.5 22.85 1.35 22.55C1.2 22.25 1.3 21.9 1.55 21.7L3.8 19.8C2.7 18.2 2 16.2 2 12C2 5.925 6.925 1 12 1Z"
        fill={color}
      />
    </Svg>
  );
};

export default TabChatIcon;
