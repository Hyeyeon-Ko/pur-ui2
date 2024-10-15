import React, { CSSProperties } from "react";
import colors from "@/styles/colors";

export type CheckboxMode = "sm" | "xs" | "lg" | "md" | undefined;

interface CheckboxProps {
  mode?: CheckboxMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  mode = "md",
  color,
  customStyle,
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
  name,
  id,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    xs: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const borderColor = color ? colors[color] : "initial";
  const modeClass = sizeClasses[mode] || sizeClasses["md"];

  return (
    <div className="flex items-center">
      <label
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        className="flex items-center"
      >
        <input
          type="checkbox"
          className={`form-checkbox rounded ${modeClass} ${className}`}
          style={{
            ...customStyle,
            borderColor,
            accentColor: borderColor,
          }}
          checked={checked}
          name={name}
          onChange={onChange}
          disabled={disabled}
          id={id}
        />
        {label && (
          <span className={`ml-2 ${disabled ? "text-gray-400" : "text-black"}`}>
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
