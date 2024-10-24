import React, { CSSProperties } from "react";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";

export type LabelMode = "sm" | "xs" | "lg" | "md" | "xl" | undefined;

interface LabelProps {
  mode?: LabelMode;
  color?: keyof typeof colors;
  content: string;
  customStyle?: CSSProperties;
  fontWeight?: "normal" | "medium" | "bold";
}

const Label: React.FC<LabelProps> = ({
  mode = "md",
  content,
  customStyle,
  color,
  fontWeight = "normal",
}) => {
  const { isDarkMode } = useDarkMode(); // 다크 모드 상태 가져오기

  const modeClasses = {
    sm: "text-sm",
    xs: "text-xs",
    md: "text-base",
    lg: "text-lg",
    xl: "text-3xl",
  };

  // 기본 색상 설정 (커스텀 컬러가 없을 경우 다크 모드에 맞는 기본 색상)
  const defaultColor = isDarkMode ? "#9CA3AF" : "signature";

  // 최종 텍스트 색상: 사용자가 color를 지정하지 않으면 다크 모드에 따른 기본 색상 사용
  const textColor = color ? colors[color] : defaultColor;

  const fontWeightClass =
    fontWeight === "bold"
      ? "font-bold"
      : fontWeight === "medium"
      ? "font-medium"
      : "font-normal";

  return (
    <label
      className={`${modeClasses[mode]} ${fontWeightClass}`}
      style={{
        ...customStyle, // customStyle을 통해 전달된 스타일 적용
        color: customStyle?.color || textColor, // customStyle에 color가 있으면 덮어쓰기
      }}
    >
      {content}
    </label>
  );
};

export default Label;
