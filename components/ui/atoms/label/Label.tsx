import React, { CSSProperties } from "react";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";

export type LabelMode = "sm" | "xs" | "lg" | "md" | "xl" | undefined;

interface LabelProps {
  mode?: LabelMode;
  color?: keyof typeof colors;
  content?: string;
  customStyle?: CSSProperties;
  fontWeight?: "normal" | "medium" | "bold";
  children?: React.ReactNode;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({
  mode = "md",
  content,
  customStyle,
  color,
  children,
  fontWeight = "normal",
  htmlFor,
}) => {
  const { isDarkMode } = useDarkMode();

  const modeClasses = {
    sm: "text-sm",
    xs: "text-xs",
    md: "text-base",
    lg: "text-lg",
    xl: "text-3xl",
  };

  const defaultColor = isDarkMode ? "#9CA3AF" : "signature";

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
        ...customStyle,
        color: customStyle?.color || textColor,
      }}
      htmlFor={htmlFor}
    >
      {content} {children}
    </label>
  );
};

export default Label;
