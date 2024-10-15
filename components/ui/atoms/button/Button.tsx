import React, { CSSProperties } from "react";
import colors from "@/styles/colors";

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

  const palette = () => {
    if (variant === "outline")
      return {
        backgroundColor: "transparent",
        color: color ? colors[color] : "black",
        border: `1px solid ${color ? colors[color] : "transparent"}`,
      };

    return {
      backgroundColor: "#2563EB",
      color: "white",
      border: "1px solid transparent",
    };
  };

  return (
    <button
      className={`m-1 transition-all duration-100 ease-in-out rounded ${
        modeClasses[mode]
      } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        ...customStyle,
        ...palette(),
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "0.7";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "1";
        }
      }}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
