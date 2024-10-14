import React, { CSSProperties } from "react";
import colors from "@/styles/colors";

export type ButtonMode = "sm" | "xs" | "lg" | "md" | undefined;

interface ButtonProps {
  mode?: ButtonMode;
  color?: keyof typeof colors;
  fontColor?: keyof typeof colors;
  borderColor?: keyof typeof colors;
  customStyle?: CSSProperties;
  content?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  mode = "md",
  color,
  fontColor = "white",
  borderColor,
  customStyle,
  content,
  onClick,
}) => {
  const modeClasses = {
    sm: "text-sm px-4 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const backgroundColor = color ? colors[color] : "#2563EB";
  const textColor = fontColor ? colors[fontColor] : "white";
  const border = borderColor ? colors[borderColor] : "white";

  return (
    <button
      className={`m-1 transition-all duration-100 ease-in-out cursor-pointer rounded ${modeClasses[mode]}`}
      style={{
        ...customStyle,
        backgroundColor,
        color: textColor,
        border: `1px solid ${border}`,
        filter: "saturate(1)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = "saturate(0.7)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "saturate(1)";
      }}
    >
      {content}
    </button>
  );
};

export default Button;
