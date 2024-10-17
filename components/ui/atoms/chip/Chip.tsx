import colors from "@/styles/colors";
import React, { CSSProperties } from "react";

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
  color = "Button_Default",
  customStyle,
  disabled = false,
  content,
  variant = "outline",
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
    <button
      className={`transition-all duration-100 ease-in-out rounded-full p-2 ${
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
