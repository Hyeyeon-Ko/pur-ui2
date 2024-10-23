"use client";

import React, { CSSProperties, useState } from "react";
import colors from "@/styles/colors";
import { useTheme } from "next-themes";

export type InputMode = "sm" | "xs" | "lg" | "md" | undefined;

interface InputProps {
  mode?: InputMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  accept?: string;
  name?: string;
  type?: string;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: (value: string) => { isValid: boolean; message: string };
}

const Input: React.FC<InputProps> = ({
  mode = "md",
  color,
  customStyle,
  disabled = false,
  readOnly = false,
  placeholder,
  value,
  accept,
  name,
  type = "text",
  onChange,
  validation,
}) => {
  const { theme } = useTheme(); // 현재 테마 가져오기
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null); // 유효성 검사 상태
  const [errorMessage, setErrorMessage] = useState<string>(""); // 메시지 상태

  const modeClasses = {
    sm: "text-sm px-3 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-4 py-2.5",
    lg: "text-lg px-5 py-3",
  };

  // 유효성 검사 로직
  const handleValidation = (value: string) => {
    if (validation) {
      const { isValid, message } = validation(value);
      setIsValid(isValid); // 유효성 검사 결과 저장
      setErrorMessage(message); // 메시지 저장
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (onChange) {
      onChange(e);
    }
    handleValidation(inputValue); // 입력 시 유효성 검사
  };

  const borderColor = disabled
    ? "#D1D5DB"
    : isFocused
    ? "#2563EB"
    : isValid === false
    ? "#EF4444"
    : isValid === true
    ? "#10B981"
    : color
    ? colors[color]
    : "#2563EB";

  const backgroundColor = disabled
    ? "#E5E7EB" // 다크 모드 비활성화 색상
    : theme === "dark"
    ? "transparent" // 다크 모드 배경색
    : "#FFFFFF"; // 라이트 모드 배경색

  const textColor = theme === "dark" ? "#FFFFFF" : "#000000"; // 텍스트 색상

  return (
    <div>
      <input
        className={`m-1 border rounded transition-all duration-150 ease-in-out focus:outline-none ${
          modeClasses[mode]
        } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
        style={{
          ...customStyle,
          borderColor,
          backgroundColor,
          color: textColor, // 텍스트 색상 적용
        }}
        name={name}
        accept={accept}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {/* 유효성 검사 메시지 표시 */}
      {errorMessage && (
        <label
          className={`text-xs ml-2 mt-1 mb-1 ${
            isValid === false ? "!text-red-500" : "!text-green-500"
          }`}
          style={{ display: "block" }}
        >
          {errorMessage}
        </label>
      )}
    </div>
  );
};

export default Input;
