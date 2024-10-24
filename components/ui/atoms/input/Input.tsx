"use client";

import React, { CSSProperties, useState } from "react";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";

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
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null); // 유효성 검사 상태
  const [errorMessage, setErrorMessage] = useState<string>(""); // 메시지 상태

  const { isDarkMode } = useDarkMode();

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

  const backgroundColor = isDarkMode ? colors["transparent"] : "white";
  const textColor = isDarkMode ? "white" : "black";
  const disabledColor = isDarkMode ? "#4B5563" : "#D1D5DB";
  const placeholderColor = isDarkMode ? "white" : "black";

  return (
    <div>
      <input
        className={`m-1 border rounded transition-all duration-150 ease-in-out focus:outline-none ${
          modeClasses[mode]
        } ${disabled ? `bg-${disabledColor} cursor-not-allowed` : ""}`}
        style={{
          ...customStyle,
          borderColor,
          backgroundColor,
          color: textColor,
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
        // placeholder 스타일 추가
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.style.setProperty("::placeholder", placeholderColor);
        }}
      />
      {/* 유효성 검사 메시지 표시 */}
      {errorMessage && (
        <label
          className={`text-xs ml-2 mt-1 mb-1 ${
            isValid === false ? "!text-red-500" : "!text-green-500"
          }`}
          style={{ display: "block", color: textColor }}
        >
          {errorMessage}
        </label>
      )}
    </div>
  );
};

export default Input;
