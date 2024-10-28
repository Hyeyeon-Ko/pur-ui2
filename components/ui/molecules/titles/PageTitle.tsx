"use client";

import React, { CSSProperties } from "react";
import Label from "../../atoms/label/Label";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
// import { useDarkMode } from "@/context/DarkModeContext";

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
  const { isDarkMode } = useDarkMode();

  // 기본 텍스트 색상 설정
  const textColor = color ? colors[color] : colors.signature;
  const darkTextColor = color ? colors[color] : colors.white; // 다크 모드일 때의 기본 텍스트 색상

  return (
    <div
      className={`p-10 m-2 transition-colors duration-200`}
      style={{
        ...customStyle,
        color: customStyle?.color || (isDarkMode ? darkTextColor : textColor), // customStyle에 color가 있으면 우선 사용
      }}
    >
      <Label
        mode={mode}
        content={pageTitle}
        fontWeight={fontWeight}
        customStyle={{
          ...customStyle, // Label에도 customStyle 전달
          color: customStyle?.color || (isDarkMode ? darkTextColor : textColor), // 다크 모드에서도 커스텀 가능하도록 처리
        }}
      />
    </div>
  );
};

export default PageTitle;
