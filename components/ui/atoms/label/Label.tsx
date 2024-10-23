import React, { CSSProperties } from "react";
import colors from "@/styles/colors";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  const modeClasses = {
    sm: "text-sm",
    xs: "text-xs",
    md: "text-base",
    lg: "text-lg",
    xl: "text-3xl",
  };


  const textColor = color ? colors[color] : "black";

  const fontWeightClass =
    fontWeight === "bold"
      ? "font-bold"
      : fontWeight === "medium"
      ? "font-medium"
      : "font-normal";

  return (
    <label
      className={`${modeClasses[mode]} ${fontWeightClass} ${
        theme === "dark" ? "text-white" : `text-${textColor.replace("#", "")}`
      }`} 
      style={{
        ...customStyle,
      }}
    >
      {content}
    </label>
  );
};

export default Label;
