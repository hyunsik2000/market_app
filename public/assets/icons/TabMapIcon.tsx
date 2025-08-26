// components/icons/MapIcon.tsx
import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface TabMapIconProps {
  size?: number;
  color?: string;
}

const TabMapIcon: React.FC<TabMapIconProps> = ({
  size = 24,
  color = "##484C52",
}) => {
  // 비율 조정 (원본: 18x24)
  const width = (size * 18) / 24;
  const height = size;

  return (
    <Svg width={width} height={height} viewBox="0 0 18 24" fill="none">
      <Path
        d="M18 9.02335C18 13.1309 12.5156 20.4435 10.1109 23.4607C9.53437 24.1798 8.46563 24.1798 7.88906 23.4607C5.44219 20.4435 0 13.1309 0 9.02335C0 4.03983 4.02937 0 9 0C13.9688 0 18 4.03983 18 9.02335Z"
        fill={color}
      />
      <Circle cx="9" cy="9" r="3" fill="white" />
    </Svg>
  );
};

export default TabMapIcon;
