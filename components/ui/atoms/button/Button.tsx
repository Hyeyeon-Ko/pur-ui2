import React, { CSSProperties } from "react";
import colors from "@/styles/colors";

/**
 * mode: 버튼 사이즈
 * color: 버튼 색상
 * disabled: 활성/ 비활성(초깃값 false)
 * variant: 버튼 형태 - 채워진 버튼 / 비어있는 버튼
 * onClick: 클릭이벤트
 */

export type ButtonMode = "sm" | "xs" | "lg" | "md" | undefined;
export type ButtonVariant = "inline" | "outline";

interface ButtonProps {
  mode?: ButtonMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  content?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  mode = "md",
  color,
  customStyle,
  disabled = false,
  content,
  variant = "inline",
  onClick,
}) => {
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
    : color
    ? colors[color]
    : "#2563EB";
  const textColor = disabled
    ? "lightgray"
    : variant === "outline"
    ? color
      ? colors[color]
      : "black"
    : "white";
  const border = disabled ? "lightgray" : color ? colors[color] : "transparent";

  return (
    // hover효과를 onMouseEnter, onMouseLeave로 구분하고 있음
    <button
      className={`m-1 transition-all duration-100 ease-in-out rounded ${
        modeClasses[mode]
      } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        ...customStyle,
        backgroundColor,
        color: textColor,
        border: `1px solid ${border}`,
        filter: disabled ? "saturate(0.5)" : "saturate(1)",
      }}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.filter = "saturate(0.7)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "saturate(1)";
      }}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
