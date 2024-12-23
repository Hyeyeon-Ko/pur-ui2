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

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  mode?: ButtonMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  content?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  mode = "md",
  color,
  customStyle,
  disabled = false,
  content,
  variant = "inline",
  onClick,
  children,
}) => {
  const modeClasses = {
    sm: "text-sm px-4 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const backgroundColor = disabled
    ? "lightgray"
    : variant === "outline"
      ? "transparent"
      : color
        ? colors[color]
        : "#2563EB";

  const textColor = disabled
    ? "gray"
    : variant === "outline"
      ? color
        ? colors[color]
        : "black"
      : "#e1e1e1";

  const border = disabled
    ? "lightgray"
    : variant === "outline"
      ? color
        ? colors[color]
        : "black"
      : color
        ? colors[color]
        : "transparent";

  return (
    <button
      className={`m-1 rounded shadow transition-all duration-100 ease-in-out ${
        modeClasses[mode]
      } ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:opacity-80"
      } dark:bg-gray-dark dark:text-white`}
      style={{
        ...customStyle,
        backgroundColor,
        color: textColor,
        border: `1px solid ${border}`,
      }}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      type={type}
    >
      {content} {children}
    </button>
  );
};

export default Button;
