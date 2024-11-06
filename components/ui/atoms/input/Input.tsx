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
  id?: string;
  label?: string;
  type?: string;
  checked?: boolean;
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
  id,
  label,
  checked,
  type = "text",
  onChange,
  validation,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { isDarkMode } = useDarkMode();

  const modeClasses = {
    sm: "text-sm px-3 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-4 py-2.5",
    lg: "text-lg px-5 py-3",
  };

  const handleValidation = (value: string) => {
    if (validation) {
      const { isValid, message } = validation(value);
      setIsValid(isValid);
      setErrorMessage(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange?.(e);
    handleValidation(inputValue);
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
  const textColor = isDarkMode ? "Button_Default" : "black";
  const disabledColor = isDarkMode ? "#4B5563" : "#D1D5DB";
  const placeholderColor = isDarkMode ? "white" : "black";

  // input ID 생성
  const inputId = name || "input-" + Math.random().toString(36).substr(2, 9);

  return (
    <div className="flex items-center">
      {/* 라벨 추가 및 input과 연결 */}
      {label && type === "radio" && (
        <label htmlFor={inputId} className="mr-2">
          {label}
        </label>
      )}
      <input
        id={id} // 라벨과 연결될 ID
        className={`m-1 border rounded transition-all duration-150 ease-in-out focus:outline-0 ${
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
        checked={checked}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.style.setProperty("::placeholder", placeholderColor);
        }}
      />

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
