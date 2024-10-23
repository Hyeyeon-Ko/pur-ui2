import colors from "@/styles/colors";
import React, { CSSProperties } from "react";
import { useTheme } from "next-themes"; // useTheme 추가

export type ChipMode = "sm" | "xs" | "lg" | "md" | undefined;
export type ChipVariant = "inline" | "outline";

interface ChipProps {
  mode?: ChipMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  content?: string;
  disabled?: boolean;
  variant?: ChipVariant;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({
  mode = "md",
  color = "signature",
  customStyle,
  disabled = false,
  content,
  variant = "outline",
  onClick,
}) => {
  const { theme } = useTheme(); // 현재 테마 가져오기

  const modeClasses = {
    sm: "text-sm px-4 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const backgroundColor = disabled
    ? "gray"
    : variant === "outline"
    ? "transparent"
    : theme === "dark"
    ? colors.sub // 다크 모드일 때 colors.sub 사용
    : color
    ? colors[color]
    : "#2563EB";

  const textColor = disabled
    ? "lightgray"
    : variant === "outline"
    ? theme === "dark"
      ? colors.Button_Default // 다크 모드에서 outline일 때 폰트 색상
      : color
      ? colors[color]
      : "black"
    : "white"; // 일반 모드일 때 텍스트 색상

  const border = disabled
    ? "lightgray"
    : variant === "outline"
    ? theme === "dark"
      ? colors.Button_Default // 다크 모드에서 outline일 때 border 색상
      : color
      ? colors[color]
      : "transparent"
    : "transparent";

  return (
    <button
      className={`transition-all duration-100 ease-in-out rounded-full p-2 shadow-sm ${
        modeClasses[mode]
      } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        ...customStyle,
        backgroundColor,
        color: textColor,
        border: `1px solid ${border}`,
      }}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Chip;
