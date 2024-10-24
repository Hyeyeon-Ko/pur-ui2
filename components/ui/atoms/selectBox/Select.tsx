import React, { CSSProperties } from "react";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";

export type SelectMode = "sm" | "xs" | "lg" | "md" | undefined;

interface SelectProps {
  mode?: SelectMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
}

const SelectBox: React.FC<SelectProps> = ({
  mode = "md",
  customStyle,
  placeholder,
  value,
  name,
  onChange,
  options,
  disabled = false,
}) => {
  const { isDarkMode } = useDarkMode();

  const modeClasses = {
    sm: "text-sm px-3 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-4 py-2.5",
    lg: "text-lg px-5 py-3",
  };

  const borderColor = isDarkMode
    ? colors["transparent"]
    : colors["transparent"];
  const backgroundColor = isDarkMode ? colors["transparent"] : "white";
  const textColor = isDarkMode ? "#9CA3AF" : "black";
  const optionBackgroundColor = isDarkMode ? colors["sub"] : "white";
  const optionTextColor = isDarkMode ? "white" : "black";
  const disabledColor = "gray-200";

  return (
    <select
      className={`m-1 border rounded transition-all duration-150 ease-in-out focus:outline-none ${
        modeClasses[mode]
      } ${disabled ? `bg-${disabledColor} cursor-not-allowed` : ""}`}
      style={{
        ...customStyle,
        borderColor,
        backgroundColor,
        color: textColor,
      }}
      value={value}
      name={name}
      onChange={!disabled ? onChange : undefined}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          style={{
            backgroundColor: optionBackgroundColor,
            color: optionTextColor,
          }}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
