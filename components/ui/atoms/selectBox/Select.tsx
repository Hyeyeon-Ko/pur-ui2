import React, { CSSProperties } from "react";
import colors from "@/styles/colors";

export type SelectMode = "sm" | "xs" | "lg" | "md" | undefined;

interface SelectProps {
  mode?: SelectMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
}

const SelectBox: React.FC<SelectProps> = ({
  mode = "md",
  color,
  customStyle,
  placeholder,
  value,
  onChange,
  options,
  disabled = false,
}) => {
  const modeClasses = {
    sm: "text-sm px-3 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-4 py-2.5",
    lg: "text-lg px-5 py-3",
  };

  const borderColor = color ? colors[color] : "#2563EB";

  return (
    <select
      className={`m-1 border rounded transition-all duration-150 ease-in-out focus:outline-none ${
        modeClasses[mode]
      } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
      style={{
        ...customStyle,
        borderColor,
      }}
      value={value}
      onChange={!disabled ? onChange : undefined}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
