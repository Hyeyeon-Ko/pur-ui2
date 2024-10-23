import React, { CSSProperties } from "react";
import Label from "../../atoms/label/Label";
import colors from "@/styles/colors";
import { useTheme } from "next-themes"; // useTheme 추가

interface TitleProps {
  pageTitle: string;
  customStyle?: CSSProperties;
  color?: keyof typeof colors;
  mode?: "sm" | "md" | "lg" | "xl";
  fontWeight?: "normal" | "medium" | "bold";
}

const PageTitle: React.FC<TitleProps> = ({
  pageTitle,
  customStyle,
  color,
  mode = "xl",
  fontWeight = "normal",
}) => {
  const { theme } = useTheme(); // 현재 테마 가져오기
  const textColor =
    theme === "dark"
      ? colors["Grey_Lighten-2"]
      : color
      ? colors[color]
      : colors.signature;

  return (
    <div className="p-10 m-2" style={{ ...customStyle, color: textColor }}>
      <Label
        mode={mode}
        color={color}
        content={pageTitle}
        fontWeight={fontWeight}
      />
    </div>
  );
};

export default PageTitle;
